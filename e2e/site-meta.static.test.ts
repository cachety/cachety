// Métadonnées de l'export statique (out/) : titres et balises OG localisés,
// hreflang complets, et l'image de partage de la langue (public/og/<lang>.png).
// Source de vérité : lib/site-meta.ts — le test se dérègle avec elle, pas
// avec des chaînes recopiées.
//
// Aucun navigateur ici : simple lecture des fichiers HTML générés. Sans
// build (out/ absent), la suite se saute proprement pour que `bun test`
// reste vert sur un arbre fraîchement cloné.

import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  HREFLANG,
  LANG_CODES,
  LANGUAGE_ALTERNATES,
  RTL_LANGS,
  SIGN_ALTERNATES,
  SIGN_META,
  SITE_META,
  SITE_URL,
  type Lang,
} from "../lib/site-meta";

const OUT_DIR = join(import.meta.dir, "..", "out");
const built = existsSync(join(OUT_DIR, "index.html"));
if (!built) {
  console.warn(
    "[site-meta.static] out/ absent : tests de métadonnées sautés. Lancez `bun run build` (ou `bun run test:e2e`) pour les exercer."
  );
}

// La racine détecte la langue côté client mais son HTML expose les
// métadonnées anglaises (app/layout.tsx : racine internationale).
const PAGES: { file: string; lang: Lang }[] = [
  { file: "index.html", lang: "en" },
  { file: "fr.html", lang: "fr" },
  { file: "en.html", lang: "en" },
  { file: "ja.html", lang: "ja" },
  { file: "zh.html", lang: "zh" },
  { file: "es.html", lang: "es" },
  { file: "ar.html", lang: "ar" },
  { file: "fa.html", lang: "fa" },
  { file: "de.html", lang: "de" },
  { file: "pt.html", lang: "pt" },
  { file: "id.html", lang: "id" },
  { file: "nl.html", lang: "nl" },
];

const attr = (s: string) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");

function titleOf(html: string) {
  return attr(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
}

/** Contenu d'une balise <meta property="og:..."> (hors payload RSC échappé). */
function og(html: string, property: string) {
  const m = html.match(
    new RegExp(`<meta[^>]*property="${property}"[^>]*content="([^"]*)"`)
  );
  return m ? attr(m[1]) : undefined;
}

/** href du <link rel="alternate" hreflang=…> (React sérialise « hrefLang »). */
function hreflang(html: string, code: string) {
  const m = html.match(
    new RegExp(`<link[^>]*rel="alternate"[^>]*hreflang="${code}"[^>]*href="([^"]*)"`, "i")
  );
  return m ? attr(m[1]) : undefined;
}

describe.skipIf(!built)("métadonnées de l'export statique", () => {
  for (const { file, lang } of PAGES) {
    const meta = SITE_META[lang];

    describe(file, () => {
      const html = built ? readFileSync(join(OUT_DIR, file), "utf8") : "";

      test("titre et balises OG localisés", () => {
        expect(titleOf(html)).toBe(meta.title);
        expect(og(html, "og:title")).toBe(meta.ogTitle);
        expect(og(html, "og:description")).toBe(meta.description);
        expect(og(html, "og:locale")).toBe(meta.ogLocale);
      });

      test("liens hreflang de toutes les langues et x-default", () => {
        for (const [code, path] of Object.entries(LANGUAGE_ALTERNATES)) {
          const expected = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
          expect(hreflang(html, code)).toBe(expected);
        }
      });

      test("image de partage de la langue, 1200×630, présente dans l'export", () => {
        expect(og(html, "og:image")).toBe(`${SITE_URL}/og/${lang}.png`);
        expect(og(html, "og:image:width")).toBe("1200");
        expect(og(html, "og:image:height")).toBe("630");
        const png = readFileSync(join(OUT_DIR, "og", `${lang}.png`));
        // En-tête PNG (IHDR) : largeur et hauteur sur 4 octets, big-endian.
        expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
        expect(html).toContain('<meta name="twitter:card" content="summary_large_image"/>');
      });
    });
  }
});

// Outil Signer (docs/prd-sign.md §11.4) : /sign (x-default, anglais) et
// /<lang>/sign. Mêmes garanties que l'accueil, plus le plan du site et le
// précache du service worker (la page doit marcher en mode avion).
const SIGN_PAGES: { file: string; lang: Lang; path: string }[] = [
  { file: "sign.html", lang: "en", path: SIGN_ALTERNATES["x-default"] },
  ...LANG_CODES.map((lang) => ({ file: `${lang}/sign.html`, lang, path: SIGN_ALTERNATES[lang] })),
];

describe.skipIf(!built)("métadonnées de la page Signer", () => {
  test("une page par langue, plus /sign", () => {
    expect(SIGN_PAGES).toHaveLength(LANG_CODES.length + 1);
    for (const { file } of SIGN_PAGES) expect(existsSync(join(OUT_DIR, file)), file).toBe(true);
  });

  for (const { file, lang, path } of SIGN_PAGES) {
    describe(file, () => {
      const html = built ? readFileSync(join(OUT_DIR, file), "utf8") : "";
      const meta = SIGN_META[lang];

      test("titre, description et balises OG localisés", () => {
        expect(titleOf(html)).toBe(meta.title);
        expect(attr(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "")).toBe(meta.description);
        expect(og(html, "og:title")).toBe(meta.title);
        expect(og(html, "og:description")).toBe(meta.description);
        expect(og(html, "og:locale")).toBe(SITE_META[lang].ogLocale);
        expect(og(html, "og:url")).toBe(`${SITE_URL}${path}`);
      });

      test("<html lang> dès le HTML (et dir pour l'arabe et le persan)", () => {
        const tag = html.match(/<html[^>]*>/)?.[0] ?? "";
        expect(tag).toContain(`lang="${HREFLANG[lang]}"`);
        expect(tag.includes('dir="rtl"')).toBe(RTL_LANGS.includes(lang));
      });

      test("canonique, hreflang des 11 langues et x-default", () => {
        const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
        expect(canonical).toBe(`${SITE_URL}${path}`);
        expect(Object.keys(SIGN_ALTERNATES)).toHaveLength(LANG_CODES.length + 1);
        for (const [code, p] of Object.entries(SIGN_ALTERNATES)) {
          expect(hreflang(html, code), code).toBe(`${SITE_URL}${p}`);
        }
      });

      test("image de partage de la langue, 1200×630, présente dans l'export", () => {
        expect(og(html, "og:image")).toBe(`${SITE_URL}/og/${lang}.png`);
        expect(og(html, "og:image:width")).toBe("1200");
        expect(og(html, "og:image:height")).toBe("630");
        expect(existsSync(join(OUT_DIR, "og", `${lang}.png`))).toBe(true);
        expect(html).toContain('<meta name="twitter:card" content="summary_large_image"/>');
      });

      test("données structurées : application, page, fil d'Ariane et FAQ", () => {
        const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) =>
          JSON.parse(m[1])
        );
        const types = blocks.flatMap((b) => (b["@graph"] ?? [b]).map((n: { "@type": string }) => n["@type"]));
        for (const t of ["WebApplication", "WebPage", "BreadcrumbList", "FAQPage"]) expect(types).toContain(t);
      });
    });
  }

  test("plan du site : /sign et chaque /<lang>/sign, avec leurs hreflang", () => {
    const xml = built ? readFileSync(join(OUT_DIR, "sitemap.xml"), "utf8") : "";
    for (const { path } of SIGN_PAGES) {
      const entry = xml.split("<url>").find((u) => u.includes(`<loc>${SITE_URL}${path}</loc>`));
      expect(entry, path).toBeDefined();
      for (const [code, p] of Object.entries(SIGN_ALTERNATES)) {
        expect(entry!, `${path} ${code}`).toContain(`hreflang="${code}" href="${SITE_URL}${p}"`);
      }
    }
  });

  test("service worker : /sign et chaque /<lang>/sign précachés (hors ligne)", () => {
    const sw = built ? readFileSync(join(OUT_DIR, "sw.js"), "utf8") : "";
    const list = JSON.parse(sw.match(/const PRECACHE = (\[[^\]]*\]);/)?.[1] ?? "[]") as string[];
    for (const { path } of SIGN_PAGES) expect(list, path).toContain(path);
    expect(list.some((u) => u.endsWith(".html"))).toBe(false);
  });
});
