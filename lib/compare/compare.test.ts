import { describe, expect, test } from "bun:test";
import { LANG_CODES } from "@/lib/site-meta";
import { comparisonAlternates, COMPARISONS } from "./index";
import type { Comparison } from "./types";

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const texts = (c: Comparison) => [
  c.title,
  c.intro,
  c.verdict,
  ...c.table.flatMap((r) => [r.criterion, r.cachety, r.other]),
  ...c.body.flatMap((b) => ("text" in b ? [b.text] : b.items)),
  ...c.chooseOther,
  ...c.chooseCachety,
  ...c.faq.flatMap((f) => [f.q, f.a]),
];

describe("comparatifs (pages « Cachety ou X ? »)", () => {
  test("au moins cinq comparatifs par langue", () => {
    for (const lang of LANG_CODES) expect(COMPARISONS[lang].length, lang).toBeGreaterThanOrEqual(5);
  });

  for (const lang of LANG_CODES) {
    describe(lang, () => {
      const list = COMPARISONS[lang];

      test("slugs ASCII uniques ; un seul comparatif par outil", () => {
        const slugs = list.map((c) => c.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
        for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
        const tools = list.map((c) => c.competitor);
        expect(new Set(tools).size).toBe(tools.length);
        for (const t of tools) expect(t).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      });

      test("métadonnées dans les limites des moteurs de recherche", () => {
        for (const c of list) {
          expect(c.metaTitle.length, c.slug).toBeLessThanOrEqual(60);
          expect(c.description.length, c.slug).toBeLessThanOrEqual(160);
          expect(c.description.length, c.slug).toBeGreaterThanOrEqual(50);
        }
      });

      test("factuel et équitable : sources https, date de vérification, cas où l'autre outil est meilleur", () => {
        for (const c of list) {
          expect(c.checked, c.slug).toMatch(ISO);
          expect(c.updated, c.slug).toMatch(ISO);
          expect(c.competitorUrl, c.slug).toMatch(/^https:\/\//);
          expect(c.sources.length, c.slug).toBeGreaterThanOrEqual(2);
          for (const s of c.sources) {
            expect(s.url, c.slug).toMatch(/^https:\/\//);
            expect(s.label.trim().length, c.slug).toBeGreaterThan(0);
          }
          expect(c.chooseOther.length, c.slug).toBeGreaterThanOrEqual(1);
          expect(c.chooseCachety.length, c.slug).toBeGreaterThanOrEqual(1);
          expect(c.table.length, c.slug).toBeGreaterThanOrEqual(6);
          expect(c.faq.length, c.slug).toBeGreaterThanOrEqual(3);
        }
      });

      test("texte brut, rien de vide", () => {
        for (const c of list) {
          for (const t of texts(c)) {
            expect(t.trim().length, c.slug).toBeGreaterThan(0);
            expect(t, c.slug).not.toMatch(/<[a-z!/]|\]\(http|\*\*/i);
          }
        }
      });
    });
  }

  test("hreflang : les comparatifs d'un même outil se citent mutuellement", () => {
    for (const lang of LANG_CODES) {
      for (const c of COMPARISONS[lang]) {
        for (const [other, path] of Object.entries(comparisonAlternates(lang, c))) {
          if (other === lang) continue;
          const twin = COMPARISONS[other as typeof lang].find((x) => path.endsWith(`/${x.slug}`))!;
          expect(comparisonAlternates(other as typeof lang, twin)[lang]).toBe(path.replace(`/${other}/`, `/${lang}/`).replace(twin.slug, c.slug));
        }
      }
    }
  });
});
