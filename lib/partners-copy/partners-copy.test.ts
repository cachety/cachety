import { describe, expect, test } from "bun:test";
import { PARTNERS_COPY } from ".";
import { LANG_CODES } from "../site-meta";

describe("page partenaires", () => {
  test("méta dans les limites (titre ≤ 60, description 50 à 160)", () => {
    for (const lang of LANG_CODES) {
      const m = PARTNERS_COPY[lang].meta;
      expect(m.title.length, lang).toBeLessThanOrEqual(60);
      expect(m.description.length, lang).toBeGreaterThanOrEqual(50);
      expect(m.description.length, lang).toBeLessThanOrEqual(160);
    }
  });

  test("trois raisons, trois étapes, texte brut sans tiret cadratin", () => {
    for (const lang of LANG_CODES) {
      const c = PARTNERS_COPY[lang];
      expect(c.privacy, lang).toHaveLength(3);
      expect(c.join, lang).toHaveLength(3);
      expect(JSON.stringify(c), lang).not.toMatch(/[<>—]/);
    }
  });

  test("le texte à reprendre nomme cachety.com dans chaque langue", () => {
    for (const lang of LANG_CODES) expect(PARTNERS_COPY[lang].wording, lang).toContain("cachety.com");
  });
});
