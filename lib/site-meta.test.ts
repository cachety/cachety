import { describe, expect, test } from "bun:test";
import { LANG_CODES, LANGUAGE_ALTERNATES, SITE_META, isLang } from "./site-meta";

describe("site-meta (liens partageables par langue)", () => {
  test("chaque langue a son chemin /<code> et il figure dans les hreflang", () => {
    for (const code of LANG_CODES) {
      expect(SITE_META[code].path).toBe(`/${code}`);
      expect(LANGUAGE_ALTERNATES[code]).toBe(`/${code}`);
    }
    expect(LANGUAGE_ALTERNATES["x-default"]).toBe("/");
  });

  test("les locales OG correspondent à la langue", () => {
    expect(SITE_META.fr.ogLocale).toBe("fr_FR");
    expect(SITE_META.en.ogLocale).toBe("en_GB");
    expect(SITE_META.ja.ogLocale).toBe("ja_JP");
  });

  test("titre et description OG non vides pour chaque langue", () => {
    for (const code of LANG_CODES) {
      expect(SITE_META[code].ogTitle.length).toBeGreaterThan(0);
      expect(SITE_META[code].description.length).toBeGreaterThan(0);
    }
  });

  test("isLang ne reconnaît que fr, en, ja", () => {
    for (const code of LANG_CODES) expect(isLang(code)).toBe(true);
    expect(isLang("about")).toBe(false);
    expect(isLang("")).toBe(false);
  });
});
