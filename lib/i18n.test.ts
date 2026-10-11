import { describe, expect, test } from "bun:test";
import { detectLang, STRINGS } from "./i18n";
import { LANG_CODES } from "./site-meta";

const keys = (o: object) => Object.keys(o).sort();
const ALL = LANG_CODES.map((l) => STRINGS[l]);

describe("i18n (parité entre toutes les langues)", () => {
  test("toutes les langues ont exactement les mêmes clés", () => {
    for (const t of ALL) expect(keys(t)).toEqual(keys(STRINGS.fr));
  });

  test("les clés de messages d'erreur sont identiques", () => {
    for (const t of ALL) expect(keys(t.errors)).toEqual(keys(STRINGS.fr.errors));
  });

  test("chaque langue a les mêmes modèles, avec un libellé et un texte", () => {
    expect(STRINGS.fr.presets.length).toBeGreaterThanOrEqual(23);
    for (const t of ALL) {
      expect(t.presets).toHaveLength(STRINGS.fr.presets.length);
      const labels = t.presets.map((p) => p.label);
      expect(new Set(labels).size).toBe(labels.length);
      for (const p of t.presets) {
        expect(p.label.trim().length).toBeGreaterThan(0);
        expect(p.text.trim().length).toBeGreaterThan(0);
        expect(p.text.length).toBeLessThanOrEqual(80);
      }
      expect(typeof t.rejected("x.heic")).toBe("string");
      expect(t.downloadAll(2)).toContain("2");
      expect(t.downloadPdf(2)).toContain("2");
      expect(t.bundlePassword.length).toBeGreaterThan(0);
      expect(t.orderHint.length).toBeGreaterThan(0);
      expect(t.dragHandle("a.pdf")).toContain("a.pdf");
      expect(t.positionOf("a.pdf", 7)).toContain("7");
      // L'ordre des mots varie (« 7件中2番目 ») : on vérifie juste que tout y est.
      for (const part of ["a.pdf", "2", "7"]) expect(t.moved("a.pdf", 2, 7)).toContain(part);
      expect(t.bundleStale.length).toBeGreaterThan(0);
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
    expect(detectLang("zh", "fr-FR")).toBe("zh");
  });

  test("une valeur altérée (« xx ») retombe sur le navigateur, sans planter", () => {
    expect(detectLang("xx", "fr-FR")).toBe("fr");
    expect(detectLang("xx", "ja")).toBe("ja");
    expect(detectLang("xx", "zh-CN")).toBe("zh");
    expect(detectLang("", "it-IT")).toBe("en");
  });

  test("sans valeur stockée, détection navigateur puis anglais par défaut", () => {
    expect(detectLang(null, "fr-CA")).toBe("fr");
    expect(detectLang(null, "JA-JP")).toBe("ja");
    expect(detectLang(null, "zh-CN")).toBe("zh");
    expect(detectLang(null, "zh-Hans")).toBe("zh");
    expect(detectLang(null, "es-MX")).toBe("es");
    expect(detectLang(null, "ar-EG")).toBe("ar");
    expect(detectLang(null, "fa-IR")).toBe("fa");
    expect(detectLang(null, "de-DE")).toBe("de");
    expect(detectLang(null, "pt-BR")).toBe("pt");
    expect(detectLang(null, "id-ID")).toBe("id");
    expect(detectLang(null, "in-ID")).toBe("id");
    expect(detectLang(null, "nl-BE")).toBe("nl");
    expect(detectLang(null, "it-IT")).toBe("en");
  });
});
