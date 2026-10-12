import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ROADMAP, ROADMAP_COPY } from ".";
import { LANG_CODES } from "../site-meta";

const ROADMAP_MD = readFileSync(join(import.meta.dir, "..", "..", "ROADMAP.md"), "utf8");

describe("feuille de route", () => {
  test("chaque élément de la page figure dans ROADMAP.md sous le même identifiant", () => {
    for (const item of ROADMAP) expect(ROADMAP_MD).toContain(`\`${item.id}\``);
  });

  test("un texte par élément et par langue, en texte brut", () => {
    for (const item of ROADMAP)
      for (const lang of LANG_CODES) {
        const t = item.text[lang];
        expect(t?.title.trim().length).toBeGreaterThan(0);
        expect(t?.body.trim().length).toBeGreaterThan(0);
        expect(`${t.title} ${t.body}`).not.toMatch(/[<>—]/);
      }
  });

  test("identifiants uniques, mois de livraison au bon format", () => {
    expect(new Set(ROADMAP.map((i) => i.id)).size).toBe(ROADMAP.length);
    for (const item of ROADMAP.filter((i) => i.status === "shipped")) expect(item.shipped).toMatch(/^\d{4}-\d{2}$/);
  });

  test("méta de page dans les limites (titre ≤ 60, description 50 à 160)", () => {
    for (const lang of LANG_CODES) {
      const m = ROADMAP_COPY[lang].meta;
      expect(m.title.length).toBeLessThanOrEqual(60);
      expect(m.description.length).toBeGreaterThanOrEqual(50);
      expect(m.description.length).toBeLessThanOrEqual(160);
    }
  });
});
