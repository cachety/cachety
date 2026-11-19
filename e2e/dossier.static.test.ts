// Pages de l'outil Dossier dans l'export statique (out/) : /dossier
// (x-default, anglais) et /<lang>/dossier. Mêmes garanties que la page
// Signer (docs/prd-dossier.md §11.4) : métadonnées localisées, hreflang des
// 11 langues, plan du site, précache du service worker, une seule CSP par
// page avec ses seuls scripts, limites de _headers.
//
// Aucun navigateur ici : simple lecture des fichiers générés. Sans build
// (out/ absent), la suite se saute proprement.

import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { headerRules, headersFor, parseCsp } from "../lib/http-headers";
import { DOSSIER_TOPICS, GUIDES, guidePath, guideToolPath } from "../lib/guides";
import {
  DOSSIER_ALTERNATES,
  DOSSIER_META,
  HREFLANG,
  LANG_CODES,
  RTL_LANGS,
  SITE_META,
  SITE_URL,
  type Lang,
} from "../lib/site-meta";

const OUT_DIR = join(import.meta.dir, "..", "out");
const built = existsSync(join(OUT_DIR, "dossier.html"));
if (!built) console.warn("[dossier.static] out/dossier.html absent : tests sautés. Lancez `bun run build`.");

const PAGES: { file: string; lang: Lang; path: string; route: string }[] = [
  { file: "dossier.html", lang: "en", path: DOSSIER_ALTERNATES["x-default"], route: "/dossier" },
  ...LANG_CODES.map((lang) => ({ file: `${lang}/dossier.html`, lang, path: DOSSIER_ALTERNATES[lang], route: `/${lang}/dossier` })),
];

const attr = (s: string) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
const titleOf = (html: string) => attr(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
const og = (html: string, property: string) =>
  attr(html.match(new RegExp(`<meta[^>]*property="${property}"[^>]*content="([^"]*)"`))?.[1] ?? "");
const hreflang = (html: string, code: string) =>
  html.match(new RegExp(`<link rel="alternate" hrefLang="${code}" href="([^"]*)"`, "i"))?.[1];
const sha = (s: string) => `'sha256-${createHash("sha256").update(s).digest("base64")}'`;

function inlineScriptHashes(html: string) {
  const out: string[] = [];
  for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\ssrc\s*=/i.test(m[1]) || !m[2]) continue;
    const type = m[1].match(/\btype\s*=\s*"([^"]*)"/i)?.[1];
    if (type && type !== "module" && !/javascript/i.test(type)) continue;
    out.push(sha(m[2]));
  }
  return out;
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe.skipIf(!built)("pages Dossier : métadonnées", () => {
  test("une page par langue, plus /dossier", () => {
    expect(PAGES).toHaveLength(LANG_CODES.length + 1);
    for (const { file } of PAGES) expect(existsSync(join(OUT_DIR, file)), file).toBe(true);
  });

  for (const { file, lang, path } of PAGES) {
    describe(file, () => {
      const html = built ? readFileSync(join(OUT_DIR, file), "utf8") : "";
      const meta = DOSSIER_META[lang];

      test("titre, description et balises OG localisés", () => {
        expect(titleOf(html)).toBe(meta.title);
        expect(attr(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "")).toBe(meta.description);
        expect(og(html, "og:title")).toBe(meta.title);
        expect(og(html, "og:description")).toBe(meta.description);
        expect(og(html, "og:locale")).toBe(SITE_META[lang].ogLocale);
        expect(og(html, "og:url")).toBe(`${SITE_URL}${path}`);
        expect(og(html, "og:image")).toBe(`${SITE_URL}/og/${lang}.png`);
      });

      test("<html lang> dès le HTML (et dir pour l'arabe et le persan)", () => {
        const tag = html.match(/<html[^>]*>/)?.[0] ?? "";
        expect(tag).toContain(`lang="${HREFLANG[lang]}"`);
        expect(tag.includes('dir="rtl"')).toBe(RTL_LANGS.includes(lang));
      });

      test("canonique, hreflang des 11 langues et x-default", () => {
        expect(html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]).toBe(`${SITE_URL}${path}`);
        expect(Object.keys(DOSSIER_ALTERNATES)).toHaveLength(LANG_CODES.length + 1);
        for (const [code, p] of Object.entries(DOSSIER_ALTERNATES)) {
          expect(hreflang(html, code === "zh" ? HREFLANG.zh : code) ?? hreflang(html, code), code).toBe(`${SITE_URL}${p}`);
        }
      });

      test("données structurées : application, page, fil d'Ariane et FAQ", () => {
        const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
        const types = blocks.flatMap((b) => (b["@graph"] ?? [b]).map((n: { "@type": string }) => n["@type"]));
        for (const t of ["WebApplication", "WebPage", "BreadcrumbList", "FAQPage"]) expect(types).toContain(t);
      });

      test("le nom du service de l'État n'apparaît nulle part sur la page", () => {
        expect(html).not.toMatch(/dossier\s?facile/i);
      });
    });
  }

  test("plan du site : /dossier et chaque /<lang>/dossier, avec leurs hreflang", () => {
    const xml = built ? readFileSync(join(OUT_DIR, "sitemap.xml"), "utf8") : "";
    for (const { path } of PAGES) {
      const entry = xml.split("<url>").find((u) => u.includes(`<loc>${SITE_URL}${path}</loc>`));
      expect(entry, path).toBeDefined();
      for (const [code, p] of Object.entries(DOSSIER_ALTERNATES)) {
        expect(entry!, `${path} ${code}`).toContain(`hreflang="${code}" href="${SITE_URL}${p}"`);
      }
    }
  });

  test("service worker : /dossier et chaque /<lang>/dossier précachés (l'outil marche hors ligne)", () => {
    const sw = built ? readFileSync(join(OUT_DIR, "sw.js"), "utf8") : "";
    const list = JSON.parse(sw.match(/const PRECACHE = (\[[^\]]*\]);/)?.[1] ?? "[]") as string[];
    for (const { path } of PAGES) expect(list, path).toContain(path);
    expect(list.some((u) => u.endsWith(".html"))).toBe(false);
  });

  test("les six guides de l'outil existent dans chaque langue et mènent à la page Dossier", () => {
    for (const lang of LANG_CODES) {
      const guides = GUIDES[lang].filter((g) => g.tool === "dossier");
      expect(guides.map((g) => g.topic).sort(), lang).toEqual([...DOSSIER_TOPICS].sort());
      for (const g of guides) {
        const file = join(OUT_DIR, `${guidePath(lang, g.slug).slice(1)}.html`);
        expect(existsSync(file), file).toBe(true);
        expect(readFileSync(file, "utf8"), g.slug).toContain(`href="${guideToolPath(lang, g)}"`);
      }
    }
  });
});

describe.skipIf(!built)("pages Dossier : sécurité de l'export", () => {
  const headersText = built ? readFileSync(join(OUT_DIR, "_headers"), "utf8") : "";
  const htmlFiles = built ? walk(OUT_DIR).filter((f) => f.endsWith(".html")) : [];

  for (const { file, route, lang } of PAGES) {
    test(`${route} : une seule CSP <meta>, script-src par hachages seulement`, () => {
      const html = readFileSync(join(OUT_DIR, file), "utf8");
      const metas = [...html.matchAll(/<meta http-equiv="Content-Security-Policy" content="([^"]*)"\/>/g)];
      expect(metas).toHaveLength(1);
      const csp = parseCsp(metas[0][1]);
      expect(csp["connect-src"]).toEqual(["'self'", "blob:", "data:"]);
      expect(csp["form-action"]).toEqual(["'none'"]);
      const scriptSrc = csp["script-src"] ?? [];
      expect(scriptSrc).not.toContain("'unsafe-inline'");
      expect(scriptSrc).not.toContain("'unsafe-eval'");
      const emitted = [...new Set(inlineScriptHashes(html))].sort();
      expect(emitted.length).toBeGreaterThan(0);
      expect(scriptSrc.filter((v) => v.startsWith("'sha256-")).sort()).toEqual(emitted);
      for (const m of html.matchAll(/<script\b[^>]*\bsrc="([^"]*)"/gi)) expect(m[1]).toMatch(/^\/(?!\/)/);
      // La politique précède tout script de la page.
      expect(metas[0].index!).toBeLessThan(html.search(/<script\b/i));
    });

    test(`${route} : en-tête CSP unique, scripts de la page et de sa langue seulement, pas de cadre`, () => {
      const html = readFileSync(join(OUT_DIR, file), "utf8");
      const h = headersFor(headersText, route);
      const csp = h["content-security-policy"] ?? "";
      expect(csp.length).toBeGreaterThan(0);
      expect(csp).not.toContain(", ");
      expect(parseCsp(csp)["frame-ancestors"]).toEqual(["'none'"]);
      expect(parseCsp(csp)["connect-src"]).toEqual(["'self'", "blob:", "data:"]);
      expect(h["x-frame-options"]).toBe("DENY");
      const allowed = (parseCsp(csp)["script-src"] ?? []).filter((v) => v.startsWith("'sha256-"));
      for (const hash of inlineScriptHashes(html)) expect(allowed).toContain(hash);
      if (route === "/dossier") {
        // Règle exacte : copie de la <meta>.
        expect(allowed.sort()).toEqual([...new Set(inlineScriptHashes(html))].sort());
        return;
      }
      const own = new Set(
        htmlFiles
          .filter((f) => relative(OUT_DIR, f).startsWith(`${lang}/`))
          .flatMap((f) => inlineScriptHashes(readFileSync(f, "utf8")))
      );
      for (const hash of allowed) expect(own.has(hash), hash).toBe(true);
    });
  }

  test("/dossier : la redirection vers la langue du visiteur est un script inline haché", () => {
    const html = readFileSync(join(OUT_DIR, "dossier.html"), "utf8");
    const redirect = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].find((m) => m[1].includes("location.replace"));
    expect(redirect).toBeDefined();
    expect(redirect![1]).toContain('"/dossier"+location.search+location.hash');
    const meta = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]*)"\/>/)![1];
    expect(parseCsp(meta)["script-src"]).toContain(sha(redirect![1]));
  });

  // docs/deploy.md : 100 règles et 2 000 caractères par ligne au plus ; les
  // pages directement sous une langue partagent une règle « /<lang>/:page »
  // qui ne recouvre jamais celle d'une section.
  test("_headers : dans les limites, et une page de guide ne reçoit pas la règle des pages directes", () => {
    const rules = headerRules(headersText);
    expect(rules.length).toBeLessThanOrEqual(100);
    for (const line of headersText.split("\n")) expect(line.length).toBeLessThanOrEqual(2000);
    for (const lang of LANG_CODES) {
      const guide = GUIDES[lang].find((g) => g.tool === "dossier")!;
      for (const route of [`/${lang}/dossier`, `/${lang}/sign`, `/${lang}/guides`, guidePath(lang, guide.slug)]) {
        const csp = headersFor(headersText, route)["content-security-policy"] ?? "";
        expect(csp.length, route).toBeGreaterThan(0);
        expect(csp, route).not.toContain(", ");
      }
    }
    // Aucune valeur d'en-tête ne contient le nom du paramètre : Cloudflare le remplacerait.
    for (const rule of rules) for (const [, value] of rule.headers) expect(value).not.toContain(":page");
  });
});
