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

const precache = files
  .map((f) => "/" + relative(OUT, f).split("\\").join("/"))
  .filter(
    (u) =>
      !u.endsWith(".map") &&
      !u.endsWith("/sw.js") &&
      (u.startsWith("/_next/static/") ||
        u.startsWith("/pdfjs/") ||
        u === "/index.html" ||
        /^\/(fr|en|ja|about)\.html$/.test(u) ||
        /^\/(fr|en|ja)\/about\.html$/.test(u) ||
        u === "/manifest.webmanifest" ||
        u === "/favicon.ico" ||
        /^\/(icon-\d+|apple-touch-icon)\.png$/.test(u))
  )
  // Les URL servies n'ont pas d'extension : /fr.html est exposé comme /fr.
  .map((u) =>
    u === "/index.html"
      ? "/"
      : u.replace(/^\/(fr|en|ja|about)\.html$/, "/$1").replace(/^\/(fr|en|ja)\/about\.html$/, "/$1/about")
  )
  .sort();

const version = createHash("sha1").update(precache.join("\n")).digest("hex").slice(0, 8);

const swPath = join(OUT, "sw.js");
let sw = await readFile(swPath, "utf8");
sw = sw
  .replace("/*__VERSION__*/", version)
  .replace("/*__PRECACHE__*/", precache.map((u) => JSON.stringify(u)).join(","));
await writeFile(swPath, sw);

console.log(`sw.js: precached ${precache.length} files, cache filigrane-${version}`);

// L'export statique fige <html lang="fr"> (layout racine unique) ; les pages
// en/ja doivent porter leur vraie langue dès le HTML, pas après hydratation
// (lecteurs d'écran, sélection de glyphes CJK, SEO).
for (const [file, lang] of [
  ["en.html", "en"],
  ["ja.html", "ja"],
  ["en/about.html", "en"],
  ["ja/about.html", "ja"],
]) {
  const p = join(OUT, file);
  const html = await readFile(p, "utf8");
  await writeFile(p, html.replace('<html lang="fr"', `<html lang="${lang}"`));
}
console.log("lang: pages en/ja réétiquetées");

// CSP : remplace script-src 'unsafe-inline' par les hachages sha256 des
// scripts inline réellement émis par l'export (bootstrap Next). Calculé à
// chaque build : un script inline non listé serait bloqué par le navigateur.
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const hashes = new Set();
for (const f of htmlFiles) {
  const html = await readFile(f, "utf8");
  // Garde-fou : chaque <script> ouvert doit être vu par la regex, sinon un
  // script inline non haché serait bloqué en production (panne silencieuse).
  const opened = (html.match(/<script\b/gi) ?? []).length;
  let seen = 0;
  for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
    seen++;
    const attrs = m[1];
    if (/\ssrc\s*=/i.test(attrs)) continue; // script externe : couvert par 'self'
    // Seuls les scripts exécutables comptent (pas application/json etc.).
    const type = attrs.match(/\btype\s*=\s*"([^"]*)"/i)?.[1];
    if (type && type !== "module" && !/javascript/i.test(type)) continue;
    if (!m[2]) continue;
    hashes.add(`'sha256-${createHash("sha256").update(m[2]).digest("base64")}'`);
  }
  if (seen !== opened) {
    throw new Error(`${f} : ${opened} <script> ouverts mais ${seen} appariés — regex CSP à corriger`);
  }
}
if (hashes.size === 0) throw new Error("aucun script inline haché : sortie Next inattendue");
const headersPath = join(OUT, "_headers");
const headers = await readFile(headersPath, "utf8");
const hashed = headers.replace(
  /script-src 'self' 'unsafe-inline'/,
  `script-src 'self' ${[...hashes].sort().join(" ")}`
);
if (hashed === headers) throw new Error("_headers : motif script-src introuvable");
await writeFile(headersPath, hashed);
console.log(`_headers : 'unsafe-inline' remplacé par ${hashes.size} hachages sha256`);
