import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { createHash } from "node:crypto";

const OUT = "out";

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if ((await stat(p)).isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(OUT);

// Une seule source de vérité pour les langues et les pages qu'elles génèrent.
// Doit suivre LANG_CODES et HREFLANG (lib/site-meta.ts).
const LANGS = ["fr", "en", "ja", "zh", "es", "ar", "fa", "de", "pt", "id", "nl"];
const HTML_LANG = { zh: "zh-CN" };
const RTL = new Set(["ar", "fa"]);
const LANG_ALT = LANGS.join("|");
const LANG_PAGE = new RegExp(`^/(${LANG_ALT}|about)\\.html$`); //   /fr.html       -> /fr
const LANG_ABOUT = new RegExp(`^/(${LANG_ALT})/about\\.html$`); //  /fr/about.html -> /fr/about

// Décodeur HEIC (libheif, ~2 Mo) : chargé à la demande, au premier fichier
// HEIC seulement. Le précacher l'imposerait à chaque visiteur ; le service
// worker le met en cache au premier usage (cache « à l'exécution »).
const lazyChunks = new Set();
for (const f of files) {
  if (!f.endsWith(".js") || (await stat(f)).size < 1_000_000) continue;
  if ((await readFile(f, "utf8")).includes("HeifDecoder")) lazyChunks.add(f);
}

const precache = files
  .filter((f) => !lazyChunks.has(f))
  .map((f) => "/" + relative(OUT, f).split("\\").join("/"))
  .filter(
    (u) =>
      !u.endsWith(".map") &&
      !u.endsWith("/sw.js") &&
      (u.startsWith("/_next/static/") ||
        u.startsWith("/pdfjs/") ||
        u === "/index.html" ||
        LANG_PAGE.test(u) ||
        LANG_ABOUT.test(u) ||
        u === "/manifest.webmanifest" ||
        u === "/favicon.ico" ||
        /^\/(icon-\d+|apple-touch-icon)\.png$/.test(u))
  )
  // Les URL servies n'ont pas d'extension : /fr.html est exposé comme /fr.
  .map((u) =>
    u === "/index.html" ? "/" : u.replace(LANG_PAGE, "/$1").replace(LANG_ABOUT, "/$1/about")
  )
  .sort();

const version = createHash("sha1").update(precache.join("\n")).digest("hex").slice(0, 8);

const swPath = join(OUT, "sw.js");
let sw = await readFile(swPath, "utf8");
sw = sw
  .replace("/*__VERSION__*/", version)
  .replace("/*__PRECACHE__*/", precache.map((u) => JSON.stringify(u)).join(","));
await writeFile(swPath, sw);

console.log(`sw.js: precached ${precache.length} files, cache cachety-${version}`);
console.log(`sw.js: ${lazyChunks.size} module(s) HEIC laissé(s) au chargement à la demande`);

// L'export statique fige <html lang="en"> (layout racine unique, racine
// internationale) ; chaque page /fr, /ja, /ar… (et tout ce qui est dessous :
// à propos, guides, confidentialité) doit porter sa vraie langue dès le HTML,
// pas après hydratation (lecteurs d'écran, glyphes CJK, SEO). L'arabe et le
// persan prennent aussi dir="rtl" : la mise en page s'inverse sans flash.
let retagged = 0;
for (const f of files.filter((f) => f.endsWith(".html"))) {
  const rel = relative(OUT, f).split("\\").join("/");
  const lang = LANGS.find((l) => rel === `${l}.html` || rel.startsWith(`${l}/`));
  if (!lang || lang === "en") continue;
  const html = await readFile(f, "utf8");
  if (!html.includes('<html lang="en"')) throw new Error(`${rel} : <html lang="en"> introuvable`);
  const dir = RTL.has(lang) ? ' dir="rtl"' : "";
  await writeFile(f, html.replace('<html lang="en"', `<html lang="${HTML_LANG[lang] ?? lang}"${dir}`));
  retagged++;
}
console.log(`lang: ${retagged} pages réétiquetées (hors anglais)`);

// CSP : remplace script-src 'unsafe-inline' par les hachages sha256 des
// scripts inline réellement émis par l'export (bootstrap Next). Calculé à
// chaque build : un script inline non listé serait bloqué par le navigateur.
//
// Une politique PAR PAGE, qui n'autorise que les scripts de cette page :
// chaque page porte sa charge RSC propre, et une politique commune listant
// tous les hachages dépasserait la limite Cloudflare de 2 000 caractères par
// ligne de _headers (règle ignorée = plus aucune CSP). Cloudflare joint par
// une virgule deux règles qui posent le même en-tête (deux politiques, toutes
// deux appliquées) : la CSP est donc retirée du bloc « /* » et posée par des
// règles exactes, une par page, plus une stricte pour les scripts et workers.
//
// Limite de 100 règles : les pages de contenu nombreuses (guides, comparatifs)
// partagent une règle par langue et par section (« /fr/guides/* ») qui réunit
// les hachages de ces seules pages. La <meta> de chaque page, elle, reste
// exacte (ses seuls hachages) : le navigateur applique les deux politiques,
// donc chaque page n'exécute que ses propres scripts.
const GROUPED = new RegExp(`^/(${LANG_ALT})/(guides|compare)/[^/]+$`);
const htmlFiles = files.filter((f) => f.endsWith(".html"));

/** Hachages des scripts inline exécutables d'une page. */
function inlineHashes(f, html) {
  const out = new Set();
  // Garde-fou : chaque <script> ouvert doit être vu par la regex, sinon un
  // script inline non haché serait bloqué en production (panne silencieuse).
  const opened = (html.match(/<script\b/gi) ?? []).length;
  let seen = 0;
  for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
    seen++;
    const attrs = m[1];
    if (/\ssrc\s*=/i.test(attrs)) continue; // script externe : couvert par 'self'
    // Seuls les scripts exécutables comptent (pas application/json, ld+json…).
    const type = attrs.match(/\btype\s*=\s*"([^"]*)"/i)?.[1];
    if (type && type !== "module" && !/javascript/i.test(type)) continue;
    if (!m[2]) continue;
    out.add(`'sha256-${createHash("sha256").update(m[2]).digest("base64")}'`);
  }
  if (seen !== opened) {
    throw new Error(`${f} : ${opened} <script> ouverts mais ${seen} appariés — regex CSP à corriger`);
  }
  return [...out].sort();
}

/** URL servie d'un fichier HTML (/fr.html → /fr, index.html → /), ou null pour 404.html. */
function routeOf(f) {
  const rel = relative(OUT, f).split("\\").join("/");
  if (rel === "404.html") return null; // servi pour toute URL inconnue : <meta> seule
  if (rel === "index.html") return "/";
  return "/" + rel.replace(/\.html$/, "");
}

const headersPath = join(OUT, "_headers");
const template = await readFile(headersPath, "utf8");
const CSP_LINE = /^\s*Content-Security-Policy:\s*(.+)$/m;
const templatePolicy = template.match(CSP_LINE)?.[1];
if (!templatePolicy?.includes("script-src 'self' 'unsafe-inline'")) {
  throw new Error("_headers : Content-Security-Policy avec script-src 'self' 'unsafe-inline' introuvable");
}
const policyWith = (hashes) =>
  templatePolicy.replace("script-src 'self' 'unsafe-inline'", ["script-src 'self'", ...hashes].join(" "));
const metaOf = (policy) =>
  policy
    .split(";")
    .map((d) => d.trim())
    .filter((d) => d && !d.startsWith("frame-ancestors"))
    .join("; ");

// Scripts, workers (pdf.js, service worker) et modules : aucune exception inline.
const rules = ["/_next/*", "/pdfjs/*", "/sw.js"].map((path) => [path, policyWith([])]);

// Même politique en <meta> dans chaque page : _headers n'est lu que par
// Cloudflare Pages ; un auto-hébergement (`bunx serve out`, Nginx, dossier
// local…) garde ainsi le verrou réseau. frame-ancestors est retiré : il est
// ignoré (avec avertissement) dans une balise <meta>.
const CHARSET = '<meta charSet="utf-8"/>';
let total = 0;
const groups = new Map();
for (const f of htmlFiles) {
  const html = await readFile(f, "utf8");
  const hashes = inlineHashes(f, html);
  if (hashes.length === 0) throw new Error(`${f} : aucun script inline haché, sortie Next inattendue`);
  total += hashes.length;
  const policy = policyWith(hashes);
  const route = routeOf(f);
  const group = route?.match(GROUPED);
  if (group) {
    const key = `/${group[1]}/${group[2]}/*`;
    groups.set(key, new Set([...(groups.get(key) ?? []), ...hashes]));
  } else if (route) rules.push([route, policy]);
  if (!html.includes(CHARSET)) throw new Error(`${f} : ${CHARSET} introuvable, <meta> CSP non injecté`);
  // Juste après le charset : avant tout <script>, sinon il échapperait à la politique.
  await writeFile(
    f,
    html.replace(CHARSET, `${CHARSET}<meta http-equiv="Content-Security-Policy" content="${metaOf(policy)}"/>`)
  );
}

for (const [key, hashes] of [...groups].sort()) rules.push([key, policyWith([...hashes].sort())]);

const generated = rules.map(([path, policy]) => `${path}\n  Content-Security-Policy: ${policy}`).join("\n");
const output =
  template.replace(/^\s*Content-Security-Policy:.*\n/m, "") +
  "\n# --- Généré par scripts/gen-sw.mjs : une CSP par page, ou par section de guides/comparatifs (hachages de leurs seuls scripts inline).\n" +
  generated +
  "\n";

// Limites Cloudflare Pages : 100 règles, 2 000 caractères par ligne. Au-delà,
// la règle serait ignorée sans bruit : on échoue au build plutôt.
const ruleCount = output.split("\n").filter((l) => l && !/^\s/.test(l) && !l.startsWith("#")).length;
if (ruleCount > 100) throw new Error(`_headers : ${ruleCount} règles (max. 100 sur Cloudflare Pages)`);
const longest = Math.max(...output.split("\n").map((l) => l.length));
if (longest > 2000) throw new Error(`_headers : ligne de ${longest} caractères (max. 2 000 sur Cloudflare Pages)`);
await writeFile(headersPath, output);
console.log(
  `_headers : ${rules.length} CSP par chemin (${total} hachages sha256), ${ruleCount} règles, ligne max. ${longest} car.`
);
console.log(`CSP <meta> injectée dans ${htmlFiles.length} pages HTML`);
