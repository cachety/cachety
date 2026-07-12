// Métadonnées de l'export statique (out/) : titres et balises OG localisés,
// hreflang complets, et surtout AUCUNE og:image (retirée volontairement).
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
// métadonnées françaises (app/layout.tsx).
const PAGES: { file: string; lang: Lang }[] = [
  { file: "index.html", lang: "fr" },
  { file: "fr.html", lang: "fr" },
  { file: "en.html", lang: "en" },
  { file: "ja.html", lang: "ja" },
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

      test("liens hreflang fr / en / ja / x-default", () => {
        for (const [code, path] of Object.entries(LANGUAGE_ALTERNATES)) {
          const expected = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
          expect(hreflang(html, code)).toBe(expected);
        }
      });

      test("aucune og:image (retirée volontairement)", () => {
        // Recherche brute : couvre aussi le payload RSC échappé.
        expect(html).not.toContain("og:image");
      });
    });
  }
});
