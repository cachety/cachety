import { describe, expect, test } from "bun:test";
import {
  ABOUT_META,
  COMPARE_META,
  GUIDES_META,
  LANG_CODES,
  LANGUAGE_ALTERNATES,
  PRIVACY_META,
  SIGN_ALTERNATES,
  SIGN_META,
  SITE_META,
  isLang,
} from "./site-meta";

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
    expect(SITE_META.zh.ogLocale).toBe("zh_CN");
  });

  test("titre et description OG non vides pour chaque langue", () => {
    for (const code of LANG_CODES) {
      expect(SITE_META[code].ogTitle.length).toBeGreaterThan(0);
      expect(SITE_META[code].description.length).toBeGreaterThan(0);
    }
  });

  test("page Signer : /sign détecte la langue, /<code>/sign l'impose", () => {
    expect(SIGN_ALTERNATES["x-default"]).toBe("/sign");
    for (const code of LANG_CODES) expect(SIGN_ALTERNATES[code]).toBe(`/${code}/sign`);
    expect(Object.keys(SIGN_ALTERNATES)).toHaveLength(LANG_CODES.length + 1);
  });

  test("titres et descriptions des pages : non vides, longueurs lisibles par les moteurs", () => {
    const pages = { ABOUT_META, PRIVACY_META, GUIDES_META, COMPARE_META, SIGN_META };
    for (const [name, meta] of Object.entries(pages)) {
      const titles = LANG_CODES.map((code) => meta[code].title);
      expect(new Set(titles).size, name).toBe(LANG_CODES.length);
      for (const code of LANG_CODES) {
        const { title, description } = meta[code];
        expect(title.trim().length, `${name}.${code}`).toBeGreaterThan(0);
        expect(title.length, `${name}.${code}`).toBeLessThanOrEqual(60);
        expect(description.length, `${name}.${code}`).toBeGreaterThanOrEqual(40);
        expect(description.length, `${name}.${code}`).toBeLessThanOrEqual(160);
      }
    }
  });

  test("page Signer : jamais de promesse de signature qualifiée ou de certificat", () => {
    for (const code of LANG_CODES) {
      const { title, description } = SIGN_META[code];
      expect(`${title} ${description}`, code).not.toMatch(/qualif|certif|eIDAS/i);
    }
  });

  test("isLang ne reconnaît que fr, en, ja, zh", () => {
    for (const code of LANG_CODES) expect(isLang(code)).toBe(true);
    expect(isLang("about")).toBe(false);
    expect(isLang("")).toBe(false);
  });
});
