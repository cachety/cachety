import { describe, expect, test } from "bun:test";
import { LANG_CODES } from "@/lib/site-meta";
import { comparisonAlternates, COMPARISONS, compareTool, compareToolPath, relatedComparisons } from "./index";
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

  test("signature : les mêmes cinq outils comparés dans chaque langue, liés entre eux seulement", () => {
    const SIGN_TOOLS = ["adobe-fill-sign", "docusign", "ilovepdf-sign", "smallpdf-sign", "yousign"];
    for (const lang of LANG_CODES) {
      const sign = COMPARISONS[lang].filter((c) => compareTool(c) === "sign");
      expect(sign.map((c) => c.competitor).sort(), lang).toEqual(SIGN_TOOLS);
      for (const c of sign) {
        expect(c.slug, lang).toBe(`cachety-vs-${c.competitor}`);
        for (const r of relatedComparisons(lang, c)) expect(compareTool(r), c.slug).toBe("sign");
      }
    }
  });

  test("dossier : les mêmes cinq outils comparés dans chaque langue, liés entre eux seulement", () => {
    const DOSSIER_TOOLS = ["adobe-merge", "ilovepdf-merge", "pdf24-merge", "sejda-merge", "smallpdf-merge"];
    for (const lang of LANG_CODES) {
      const dossier = COMPARISONS[lang].filter((c) => compareTool(c) === "dossier");
      expect(dossier.map((c) => c.competitor).sort(), lang).toEqual(DOSSIER_TOOLS);
      for (const c of dossier) {
        expect(c.slug, lang).toBe(`cachety-vs-${c.competitor}`);
        expect(compareToolPath(lang, c), lang).toBe(`/${lang}/dossier`);
        for (const r of relatedComparisons(lang, c)) expect(compareTool(r), c.slug).toBe("dossier");
      }
    }
  });

  // Publicité comparative : une langue ne doit pas en dire plus, ni moins,
  // qu'une autre sur un concurrent. Le texte est localisé, mais la structure
  // des faits est la même partout : mêmes lignes du tableau, même avantage
  // accordé ligne par ligne, mêmes sources, même date de vérification.
  describe("dossier : même tableau, mêmes avantages, mêmes sources et même date que l'anglais", () => {
    const hosts = (c: Comparison) => [...new Set(c.sources.map((s) => new URL(s.url).host.replace(/^www\./, "")))].sort();
    const en = COMPARISONS.en.filter((c) => compareTool(c) === "dossier");
    // Un test par langue : une langue en retard ne masque pas les autres.
    for (const lang of LANG_CODES) {
      test(lang, () => {
        for (const ref of en) {
          const c = COMPARISONS[lang].find((x) => x.competitor === ref.competitor)!;
          const at = `${lang} ${ref.competitor}`;
          expect(c.table.length, at).toBe(ref.table.length);
          expect(c.table.map((r) => r.edge ?? "none"), at).toEqual(ref.table.map((r) => r.edge ?? "none"));
          expect(c.faq.length, at).toBe(ref.faq.length);
          expect(c.chooseOther.length, at).toBe(ref.chooseOther.length);
          expect(c.chooseCachety.length, at).toBe(ref.chooseCachety.length);
          expect(c.sources.length, at).toBe(ref.sources.length);
          expect(hosts(c), at).toEqual(hosts(ref));
          expect(c.checked, at).toBe(ref.checked);
        }
      });
    }
  });

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
