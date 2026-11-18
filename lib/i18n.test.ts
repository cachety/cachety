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
      expect(t.download.copies(2)).toContain("2");
      expect(t.done.titleMany(3)).toContain("3");
      for (const n of [1, 2, 5]) expect(t.summary.hidden(n)).toContain(String(n));
      expect(t.summary.docs(4, true)).toContain("4");
      expect(t.summary.under(5)).toContain("5");
      expect(t.recipients.limit(20)).toContain("20");
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
    for (const t of ALL) {
      expect(t.suffix).toMatch(/^[a-z-]+$/);
      expect(t.trace.listFile).toMatch(/^[a-z-]+$/);
      // outputName() ajoute lui-même le tiret : « bail-signed.pdf ».
      expect(t.sign.suffix).toBe("signed");
      expect(t.sign.zipName).toMatch(/^[a-z][a-z-]*[a-z]$/);
    }
  });

  test("mode signature : même arborescence de clés dans toutes les langues", () => {
    // Structure profonde (clés, longueurs de listes, fonctions), sans les valeurs.
    const shape = (v: unknown): unknown =>
      Array.isArray(v)
        ? v.map(shape)
        : typeof v === "function"
          ? "fn"
          : v && typeof v === "object"
            ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, shape((v as Record<string, unknown>)[k])]))
            : typeof v;
    for (const t of ALL) expect(shape(t.sign)).toEqual(shape(STRINGS.fr.sign));
  });

  test("mode signature : textes non vides, listes et fonctions complètes", () => {
    const walk = (v: unknown): void => {
      if (typeof v === "string") expect(v.trim().length).toBeGreaterThan(0);
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    for (const t of ALL) {
      const s = t.sign;
      walk(s);
      expect(s.stepShort).toHaveLength(3);
      expect(s.tour.steps).toHaveLength(3);
      expect(s.tour.stepOf(2, 3)).toContain("3");
      // Mentions toutes prêtes sous la signature (« Lu et approuvé »…).
      expect(s.block.mentions).toHaveLength(3);
      expect(new Set(s.block.mentions).size).toBe(3);
      for (const m of s.block.mentions) expect(m.length).toBeLessThanOrEqual(60);
      for (const part of ["12", "39"]) expect(s.place.gap(12, 39)).toContain(part);
      expect(s.place.boxLabel(7)).toContain("7");
      expect(s.processingDoc("a.pdf")).toContain("a.pdf");
      for (const part of ["a.pdf", "2", "5"]) expect(s.processingDoc("a.pdf", [2, 5])).toContain(part);
      expect(s.previewAlt("a.pdf", 4)).toContain("4");
      expect(s.fingerprint.copyAria("a.pdf")).toContain("a.pdf");
    }
  });

  // Mode « dossier » (docs/prd-dossier.md §6.7, §10).
  test("mode dossier : même arborescence de clés dans toutes les langues", () => {
    const shape = (v: unknown): unknown =>
      Array.isArray(v)
        ? v.map(shape)
        : typeof v === "function"
          ? "fn"
          : v && typeof v === "object"
            ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, shape((v as Record<string, unknown>)[k])]))
            : typeof v;
    for (const t of ALL) expect(shape(t.dossier)).toEqual(shape(STRINGS.fr.dossier));
  });

  test("mode dossier : nom de fichier par défaut en ASCII, sections utilisables comme noms de fichiers", () => {
    for (const t of ALL) {
      const d = t.dossier;
      // « dossier.pdf », « documents.pdf » : téléchargement sûr dans toutes les langues.
      expect(d.defaultName).toMatch(/^[a-z][a-z-]*[a-z]$/);
      expect(d.sections.presets).toHaveLength(5);
      expect(new Set(d.sections.presets).size).toBe(5);
      for (const name of d.sections.presets) {
        expect(name.length).toBeLessThanOrEqual(40);
        // Rien qu'un système de fichiers refuse, rien qui sorte du dossier.
        expect(name).not.toMatch(/[\\/:*?"<>|\u0000-\u001f]/);
        expect(name.trim()).toBe(name);
        expect(name.startsWith(".")).toBe(false);
      }
    }
  });

  test("mode dossier : textes non vides, listes et fonctions complètes", () => {
    const walk = (v: unknown): void => {
      if (typeof v === "string") expect(v.trim().length).toBeGreaterThan(0);
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    for (const t of ALL) {
      const d = t.dossier;
      walk(d);
      expect(d.stepShort).toHaveLength(3);
      expect(d.tour).toHaveLength(3);
      expect(d.size.exits).toHaveLength(3);
      for (const n of [1, 2, 23]) expect(d.grid.total(n)).toContain(String(n));
      expect(d.grid.removed(7)).toContain("7");
      expect(d.grid.rotated(7)).toContain("7");
      expect(d.grid.restored(7)).toContain("7");
      expect(d.grid.menu(7)).toContain("7");
      for (const part of ["7", "30"]) expect(d.grid.position(7, 30)).toContain(part);
      for (const part of ["4", "30"]) expect(d.grid.moved(4, 30)).toContain(part);
      for (const part of ["3", "a.pdf"]) expect(d.grid.pageOf(3, "a.pdf")).toContain(part);
      expect(d.photo.corner(2)).toContain("2");
      expect(d.sections.unnamed(3)).toContain("3");
      expect(d.sections.name(3)).toContain("3");
      for (const part of ["3.2 MB", "5 MB"]) expect(d.size.fits("3.2 MB", "5 MB")).toContain(part);
      expect(d.size.reduced("4.8 MB")).toContain("4.8 MB");
      expect(d.size.unreachable("1 MB")).toContain("1 MB");
      for (const part of ["Payslips", "2.1 MB"]) expect(d.size.section("Payslips", "2.1 MB")).toContain(part);
      expect(d.summaryOne(23)).toContain("23");
      for (const part of ["23", "4"]) expect(d.summaryMany(23, 4)).toContain(part);
      expect(d.processingDoc("a.pdf")).toContain("a.pdf");
      for (const part of ["a.pdf", "2", "5"]) expect(d.processingDoc("a.pdf", [2, 5])).toContain(part);
      // La limite (MAX_DOSSIER_PAGES) est dite en chiffres : « 1 000 », « 1,000 », « 1.000 », « ۱٬۰۰۰ »…
      const digits = t.errors.dossier_too_many_pages
        .replace(/[۰-۹]/g, (c) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(c)))
        .replace(/[٠-٩]/g, (c) => String("٠١٢٣٤٥٦٧٨٩".indexOf(c)))
        .replace(/[^0-9]/g, "");
      expect(digits).toContain("1000");
    }
  });

  test("mode dossier : jamais « DossierFacile » dans l'outil (aucun lien avec le service de l'État)", () => {
    for (const t of ALL) expect(JSON.stringify(t.dossier)).not.toMatch(/dossier\s?facile/i);
  });

  test("texte libre : trois mots distincts, entre accolades, cités dans l'aide", () => {
    for (const t of ALL) {
      const { recipient, date, code } = t.stampCard.tokens;
      for (const w of [recipient, date, code]) expect(w).toMatch(/^\{[^\s{}]+\}$/);
      expect(new Set([recipient, date, code]).size).toBe(3);
      for (const w of [recipient, date, code]) expect(t.stampCard.tokensHelp).toContain(w);
      for (const w of [recipient, code]) expect(t.stampCard.sameText).toContain(w);
      expect(t.stampSep.trim().length).toBeGreaterThan(0);
    }
  });

  test("barre d'étapes, visite guidée et limites de taille alignées sur l'outil", () => {
    for (const t of ALL) {
      expect(t.stepShort).toHaveLength(3);
      expect(t.tour.steps).toHaveLength(3);
      for (const mb of [1, 2, 5, 10]) expect(t.size.hints[mb]?.length).toBeGreaterThan(0);
      expect(t.size.keptUnder(2)).toContain("2");
    }
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

describe("i18n : libellés du panneau Apparence", () => {
  test("les choix de contour ne reprennent jamais un libellé d'intensité", () => {
    for (const lang of LANG_CODES) {
      const s = STRINGS[lang].style;
      const presets = new Set(Object.values(s.presets));
      for (const label of Object.values(s.outlines)) expect(presets.has(label)).toBe(false);
      expect(new Set(Object.values(s.outlines)).size).toBe(3);
    }
  });
});
