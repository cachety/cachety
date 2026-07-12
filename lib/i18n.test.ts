import { describe, expect, test } from "bun:test";
import { detectLang, STRINGS } from "./i18n";

const keys = (o: object) => Object.keys(o).sort();
const ALL = [STRINGS.fr, STRINGS.en, STRINGS.ja];

describe("i18n (parité FR/EN/JA)", () => {
  test("toutes les langues ont exactement les mêmes clés", () => {
    for (const t of ALL) expect(keys(t)).toEqual(keys(STRINGS.fr));
  });

  test("les clés de messages d'erreur sont identiques", () => {
    for (const t of ALL) expect(keys(t.errors)).toEqual(keys(STRINGS.fr.errors));
  });

  test("chaque langue a 3 presets et des fonctions qui rendent des strings", () => {
    for (const t of ALL) {
      expect(t.presets).toHaveLength(3);
      expect(typeof t.rejected("x.heic")).toBe("string");
      expect(t.downloadAll(2)).toContain("2");
      expect(t.pageOf(1, 3)).toContain("3");
    }
  });

  test("les suffixes de nom de fichier restent en ASCII (téléchargement sûr)", () => {
    for (const t of ALL) expect(t.suffix).toMatch(/^[a-z-]+$/);
  });
});

describe("détection de langue (localStorage falsifiable)", () => {
  test("une valeur stockée valide l'emporte", () => {
    expect(detectLang("ja", "fr-FR")).toBe("ja");
    expect(detectLang("en", "fr-FR")).toBe("en");
  });

  test("une valeur altérée (« xx ») retombe sur le navigateur, sans planter", () => {
    expect(detectLang("xx", "fr-FR")).toBe("fr");
    expect(detectLang("xx", "ja")).toBe("ja");
    expect(detectLang("", "de-DE")).toBe("en");
  });

  test("sans valeur stockée, détection navigateur puis anglais par défaut", () => {
    expect(detectLang(null, "fr-CA")).toBe("fr");
    expect(detectLang(null, "JA-JP")).toBe("ja");
    expect(detectLang(null, "de-DE")).toBe("en");
  });
});
