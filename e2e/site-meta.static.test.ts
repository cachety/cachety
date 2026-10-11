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
  LANGUAGE_ALTERNATES,
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
