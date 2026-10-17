import { describe, expect, test } from "bun:test";
import { STRINGS } from "./i18n";
import { LANG_CODES } from "./site-meta";
import { composeSignBlock, signDate } from "./sign-block";

describe("composeSignBlock", () => {
  test("zéro, une et deux lignes", () => {
    expect(composeSignBlock({})).toEqual([]);
    expect(composeSignBlock({ mention: "  ", place: "", date: undefined })).toEqual([]);
    expect(composeSignBlock({ mention: "Lu et approuvé" })).toEqual(["Lu et approuvé"]);
    expect(composeSignBlock({ date: "17/10/2026" })).toEqual(["17/10/2026"]);
    expect(composeSignBlock({ place: "Fait à Paris" })).toEqual(["Fait à Paris"]);
    expect(composeSignBlock({ place: "Fait à Paris", date: "17/10/2026" })).toEqual(["Fait à Paris, 17/10/2026"]);
    expect(composeSignBlock({ mention: "Bon pour accord", place: "Fait à Paris", date: "17/10/2026" })).toEqual([
      "Bon pour accord",
      "Fait à Paris, 17/10/2026",
    ]);
  });

  test("espaces rognés, retours à la ligne aplatis", () => {
    expect(composeSignBlock({ mention: "  Lu   et\napprouvé ", place: " Lyon ", date: " 1/2/2026" })).toEqual([
      "Lu et approuvé",
      "Lyon, 1/2/2026",
    ]);
  });

  test("séparateur au choix de l'appelant", () => {
    expect(composeSignBlock({ place: "القاهرة", date: "17/10/2026" }, "، ")).toEqual(["القاهرة، 17/10/2026"]);
  });
});

describe("signDate", () => {
  const day = new Date(2026, 9, 17); // 17 octobre 2026, heure locale

  test("date au format de chaque langue", () => {
    expect(signDate(STRINGS.fr.locale, day)).toBe("17/10/2026");
    expect(signDate(STRINGS.en.locale, day)).toBe("17/10/2026");
    expect(signDate(STRINGS.de.locale, day)).toBe("17.10.2026");
    expect(signDate(STRINGS.nl.locale, day)).toBe("17-10-2026");
    expect(signDate(STRINGS.ja.locale, day)).toBe("2026/10/17");
    expect(signDate(STRINGS.zh.locale, day)).toBe("2026/10/17");
    // Arabe : chiffres latins imposés par la locale (-u-nu-latn).
    expect(signDate(STRINGS.ar.locale, day)).toMatch(/17.*10.*2026/);
  });

  test("toutes les langues donnent une date non vide contenant l'année", () => {
    for (const t of Object.values(STRINGS)) {
      const s = signDate(t.locale, day);
      expect(s.length).toBeGreaterThan(5);
      // Persan : calendrier et chiffres propres (۱۴۰۵) ; ailleurs l'année grégorienne.
      if (!t.locale.startsWith("fa")) expect(s).toContain("2026");
    }
  });

  // Même modèle que le test des préréglages de lib/i18n.test.ts.
  test("mentions prédéfinies présentes dans les 11 langues", () => {
    const count = STRINGS.fr.sign.block.mentions.length;
    expect(count).toBe(3);
    for (const lang of LANG_CODES) {
      const mentions = STRINGS[lang].sign.block.mentions;
      expect(mentions).toHaveLength(count);
      expect(new Set(mentions).size).toBe(count);
      for (const m of mentions) {
        expect(m.trim()).toBe(m);
        expect(m.length).toBeGreaterThan(1);
        // Une ligne sous la signature : au-delà, le texte devient minuscule.
        expect(m.length).toBeLessThanOrEqual(60);
        expect(composeSignBlock({ mention: m })).toEqual([m]);
      }
    }
  });
});
