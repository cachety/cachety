import { describe, expect, test } from "bun:test";
import { STRINGS } from "./i18n";

const keys = (o: object) => Object.keys(o).sort();

describe("i18n (parité FR/EN)", () => {
  test("les deux langues ont exactement les mêmes clés", () => {
    expect(keys(STRINGS.en)).toEqual(keys(STRINGS.fr));
  });

  test("les clés de messages d'erreur sont identiques", () => {
    expect(keys(STRINGS.en.errors)).toEqual(keys(STRINGS.fr.errors));
  });

  test("chaque langue a 3 presets et des fonctions qui rendent des strings", () => {
    for (const t of [STRINGS.fr, STRINGS.en]) {
      expect(t.presets).toHaveLength(3);
      expect(typeof t.rejected("x.heic")).toBe("string");
      expect(t.downloadAll(2)).toContain("2");
      expect(t.pageOf(1, 3)).toContain("3");
    }
  });

  test("les suffixes de nom de fichier sont sans accent", () => {
    expect(STRINGS.fr.suffix).not.toMatch(/[éèêà]/);
    expect(STRINGS.en.suffix).not.toMatch(/[éèêà]/);
  });
});
