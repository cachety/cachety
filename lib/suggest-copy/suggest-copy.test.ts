import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SUGGEST_COPY } from ".";
import { STRINGS } from "../i18n";
import { SENSITIVE_KINDS } from "../sensitive";
import { LANG_CODES, type Lang } from "../site-meta";

/** Structure d'un objet : clés et fonctions, sans les valeurs. */
function shape(v: unknown): unknown {
  if (typeof v === "function") return "fn";
  if (v && typeof v === "object")
    return Object.fromEntries(Object.keys(v).sort().map((k) => [k, shape((v as Record<string, unknown>)[k])]));
  return typeof v;
}

describe("suggestions de masquage : textes (t.suggest) dans les 11 langues", () => {
  test("t.suggest est branché dans chaque langue de l'outil", () => {
    for (const l of LANG_CODES) expect(STRINGS[l].suggest, l).toBe(SUGGEST_COPY[l]);
  });

  test("mêmes clés partout, une catégorie par numéro détecté", () => {
    for (const l of LANG_CODES) {
      expect(shape(STRINGS[l].suggest), l).toEqual(shape(STRINGS.fr.suggest));
      expect(Object.keys(STRINGS[l].suggest.kinds).sort(), l).toEqual([...SENSITIVE_KINDS].sort());
    }
  });

  test("aucun texte vide ; texte brut, sans balise ni tiret cadratin", () => {
    const walk = (v: unknown, where: string): void => {
      if (typeof v === "string") {
        expect(v.trim().length, where).toBeGreaterThan(0);
        expect(v, where).not.toMatch(/[<>—]/);
      } else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, `${where}.${k}`);
    };
    for (const l of LANG_CODES) walk(STRINGS[l].suggest, l);
  });

  test("les fonctions reprennent leurs nombres et leurs libellés", () => {
    for (const l of LANG_CODES) {
      const c = STRINGS[l].suggest;
      expect(c.banner(3), l).toContain("3");
      expect(c.banner(1).length, l).toBeGreaterThan(10);
      expect(c.banner(1), l).not.toMatch(/[<>—]/);
      expect(c.onPage(14), l).toContain("14");
      for (const part of ["3", "1, 2, 14"]) expect(c.doneAll(3, "1, 2, 14", 3), l).toContain(part);
      expect(c.doneAll(1, "7", 1), l).toContain("7");
      expect(c.doneAll(2, "7", 1), l).toContain("2");
      for (const hidden of [true, false]) {
        const said = c.announce("IBAN", 2, hidden);
        expect(said, l).toContain("IBAN");
        expect(said, l).toContain("2");
      }
      expect(c.announce("IBAN", 2, true), l).not.toBe(c.announce("IBAN", 2, false));
      // Libellés distincts : deux catégories ne se confondent pas dans le panneau.
      expect(new Set(Object.values(c.kinds)).size, l).toBe(SENSITIVE_KINDS.length);
    }
  });

  // docs/security.md, T12 (« fausse impression d'exhaustivité ») : rien de
  // technique n'empêche qu'un numéro échappe à la détection. Seul contrôle :
  // le dire, toujours. Vérification = ce texte existe dans chaque langue, et
  // nomme les codes-barres et les QR codes.
  const QR: Record<Lang, RegExp> = {
    fr: /QR/, en: /QR/, es: /QR/, pt: /QR/, de: /QR/, nl: /QR/, id: /QR/, ar: /QR/, fa: /QR/, ja: /QR/,
    zh: /二维码/,
  };
  test("le pied du panneau dit, dans chaque langue, que les suggestions peuvent en oublier", () => {
    for (const l of LANG_CODES) {
      const footer = STRINGS[l].suggest.footer;
      // Trois phrases : peuvent en oublier ; vérifiez vous-même ; codes-barres et QR codes.
      expect(footer.split(/[.。]/).filter((p) => p.trim()).length, l).toBeGreaterThanOrEqual(3);
      expect(footer.length, l).toBeGreaterThan(30);
      expect(footer, l).toMatch(QR[l]);
    }
    expect(STRINGS.en.suggest.footer).toMatch(/can miss things/);
    expect(STRINGS.fr.suggest.footer).toMatch(/peuvent en oublier/);
  });

  test("français et anglais : les textes du PRD (§10), tels quels", () => {
    const prd = readFileSync(join(import.meta.dir, "..", "..", "docs", "prd-suggested-areas.md"), "utf8");
    const quoted = (c: (typeof STRINGS)["fr"]["suggest"]) => [
      c.review, c.title, c.hideAll, c.hideAllDocs, c.hidden, c.undo, c.dismiss, c.notShown, c.coverAll, c.none, c.noText,
      c.incomplete, c.footer, c.note.frTax, c.note.iban, c.banner(1),
      c.kinds.iban, c.kinds.card, c.kinds["fr-nir"], c.kinds["fr-tax"], c.kinds["fr-tax-ref"],
    ];
    for (const l of ["fr", "en"] as const) {
      for (const text of quoted(STRINGS[l].suggest)) expect(prd, `${l} : ${text}`).toContain(text);
    }
    for (const l of ["fr", "en"] as const) expect(STRINGS[l].suggest.onPage(4)).toBe("Page 4");
    expect(STRINGS.en.suggest.banner(3)).toBe("We found 3 numbers you may want to hide.");
    expect(STRINGS.fr.suggest.banner(3)).toBe("Nous avons trouvé 3 numéros que vous voudrez peut-être masquer.");
    expect(STRINGS.en.suggest.doneAll(3, "1, 2 and 14", 3)).toBe("3 areas hidden (pages 1, 2 and 14).");
    expect(STRINGS.fr.suggest.doneAll(3, "1, 2 et 14", 3)).toBe("3 zones masquées (pages 1, 2 et 14).");
  });

  test("les neuf traductions sont marquées « à relire » dans leur fichier", () => {
    for (const l of LANG_CODES) {
      const source = readFileSync(join(import.meta.dir, `${l}.ts`), "utf8");
      if (l === "fr" || l === "en") expect(source, l).not.toContain("awaiting native review");
      else expect(source, l).toContain("Draft translation from the English wording, awaiting native review");
    }
  });
});
