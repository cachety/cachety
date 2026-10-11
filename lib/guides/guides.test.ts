import { describe, expect, test } from "bun:test";
import { LANG_CODES } from "@/lib/site-meta";
import { GUIDES, guideAlternates } from "./index";

describe("guides (pages de contenu par pays)", () => {
  test("au moins six guides par langue, plus de vingt au total", () => {
    for (const lang of LANG_CODES) expect(GUIDES[lang].length).toBeGreaterThanOrEqual(6);
    const total = LANG_CODES.reduce((n, l) => n + GUIDES[l].length, 0);
    expect(total).toBeGreaterThanOrEqual(20);
  });

  for (const lang of LANG_CODES) {
    describe(lang, () => {
      const guides = GUIDES[lang];

      test("slugs ASCII, uniques ; un seul guide par sujet", () => {
        const slugs = guides.map((g) => g.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
        for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
        const topics = guides.map((g) => g.topic);
        expect(new Set(topics).size).toBe(topics.length);
      });

      test("métadonnées dans les limites des moteurs de recherche", () => {
        for (const g of guides) {
          expect(g.metaTitle.length, g.slug).toBeLessThanOrEqual(60);
          expect(g.description.length, g.slug).toBeLessThanOrEqual(160);
          expect(g.description.length, g.slug).toBeGreaterThanOrEqual(50);
          expect(g.title.trim().length, g.slug).toBeGreaterThan(0);
          expect(g.intro.trim().length, g.slug).toBeGreaterThan(0);
          expect(g.example.length, g.slug).toBeLessThanOrEqual(120);
          expect(g.updated, g.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        }
      });

      test("contenu substantiel : marche à suivre et FAQ", () => {
        for (const g of guides) {
          expect(g.body.length, g.slug).toBeGreaterThanOrEqual(6);
          expect(g.body.some((b) => b.type === "steps"), g.slug).toBe(true);
          expect(g.body.some((b) => b.type === "h2"), g.slug).toBe(true);
          expect(g.faq.length, g.slug).toBeGreaterThanOrEqual(3);
          for (const b of g.body) {
            if ("text" in b) expect(b.text.trim().length, g.slug).toBeGreaterThan(0);
            if ("items" in b) expect(b.items.length, g.slug).toBeGreaterThan(0);
          }
        }
      });

      test("aucun lien ni balise dans le texte (rendu en texte brut)", () => {
        const all = JSON.stringify(guides);
        expect(all).not.toMatch(/<[a-z/][^>]*>/i);
        expect(all).not.toMatch(/https?:\/\//);
      });

      test("hreflang : chaque alternative pointe vers un guide existant", () => {
        for (const g of guides) {
          for (const [code, path] of Object.entries(guideAlternates(lang, g))) {
            const slug = path.split("/").pop();
            expect(GUIDES[code as keyof typeof GUIDES].some((x) => x.slug === slug)).toBe(true);
          }
        }
      });
    });
  }
});
