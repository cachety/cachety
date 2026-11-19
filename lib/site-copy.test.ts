import { describe, expect, test } from "bun:test";
import { SITE_COPY } from "./site-copy";
import { LANG_CODES, type Lang } from "./site-meta";

/** Structure d'un objet : clés et longueurs de listes, sans les valeurs. */
function shape(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(shape);
  if (typeof v === "function") return "fn";
  if (v && typeof v === "object")
    return Object.fromEntries(Object.keys(v).sort().map((k) => [k, shape((v as Record<string, unknown>)[k])]));
  return typeof v;
}

describe("textes du site (parité entre toutes les langues)", () => {
  test("même structure dans les quatre langues", () => {
    for (const l of LANG_CODES) expect(shape(SITE_COPY[l])).toEqual(shape(SITE_COPY.fr));
  });

  test("aucun texte vide", () => {
    const walk = (v: unknown): void => {
      if (typeof v === "string") expect(v.trim().length).toBeGreaterThan(0);
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    for (const l of LANG_CODES) walk(SITE_COPY[l]);
  });
});

// docs/security.md T11 (docs/prd-sign.md §6.7) : la réutilisation d'une
// signature découpée dans la copie signée n'est pas empêchée techniquement.
// Seul contrôle : le dire. Vérification = ce texte existe dans chaque langue.
// Mots « découper » et « coller », tels qu'écrits dans chaque langue.
const CUT_PASTE: Record<Lang, [RegExp, RegExp]> = {
  fr: [/découper/, /coller/],
  en: [/cut it out/, /paste/],
  ja: [/切り取/, /貼り付け/],
  zh: [/剪下/, /粘贴/],
  es: [/recortar/, /pegar/],
  ar: [/قصّه|قصه/, /لصق/],
  fa: [/ببُرد|ببرد/, /بچسباند/],
  de: [/ausschneiden/, /einfügen/],
  pt: [/recortá/, /colar/],
  id: [/memotong/, /menempel/],
  nl: [/uitknippen/, /plakken/],
};

describe("page Signer : honnêteté (T11, valeur juridique)", () => {
  const signText = (l: Lang) => {
    const s = SITE_COPY[l].sign;
    return [s.legal.p1, s.legal.p2, s.legal.p3, s.legal.note, ...s.faq.map((f) => `${f.q} ${f.a}`)].join("\n");
  };

  test("la FAQ dit, dans chaque langue, qu'une signature peut être découpée et réutilisée", () => {
    for (const l of LANG_CODES) {
      const [cut, paste] = CUT_PASTE[l];
      expect(signText(l), l).toMatch(cut);
      expect(signText(l), l).toMatch(paste);
      // … dans une réponse de la FAQ (celle qui propose filigrane et paraphe).
      const remove = SITE_COPY[l].sign.faq.find((f) => cut.test(f.a));
      expect(remove, l).toBeDefined();
    }
  });

  test("valeur juridique : mêmes repères partout (eIDAS art. 25, Code civil art. 1367)", () => {
    for (const l of LANG_CODES) {
      const { p1 } = SITE_COPY[l].sign.legal;
      expect(p1, l).toContain("eIDAS");
      // Les chiffres persans (۲۵, ۱۳۶۷) comptent aussi.
      const digits = p1.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
      expect(digits, l).toContain("25");
      expect(digits, l).toContain("1367");
    }
  });

  test("FAQ en 5 questions, page en 3 étapes, comme l'outil", () => {
    for (const l of LANG_CODES) {
      expect(SITE_COPY[l].sign.faq).toHaveLength(5);
      expect(SITE_COPY[l].sign.how).toHaveLength(3);
    }
  });
});

// docs/prd-dossier.md §4.2, §4.6 et §10 : la page Dossier dit que les pages
// deviennent des images (le fichier peut grossir, le texte n'est plus
// sélectionnable), et ne laisse jamais croire à un lien avec DossierFacile.
describe("page Dossier : honnêteté", () => {
  test("FAQ en 5 questions, page en 3 étapes, quatre pastilles sous le titre", () => {
    for (const l of LANG_CODES) {
      const d = SITE_COPY[l].dossier;
      expect(d.faq, l).toHaveLength(5);
      expect(d.how, l).toHaveLength(3);
      expect(d.hero.pills, l).toHaveLength(4);
      expect(new Set(d.faq.map((f) => f.q)).size, l).toBe(5);
    }
  });

  test("« DossierFacile » n'apparaît ni sur la page ni dans la navigation", () => {
    for (const l of LANG_CODES) {
      expect(JSON.stringify(SITE_COPY[l].dossier), l).not.toMatch(/dossier\s?facile/i);
      expect(SITE_COPY[l].nav.dossier, l).not.toMatch(/facile/i);
    }
  });

  test("français et anglais : le texte du cahier des charges, mot pour mot", () => {
    expect(SITE_COPY.fr.dossier.hero.title).toBe("Un seul fichier à envoyer, sans rien mettre en ligne");
    expect(SITE_COPY.en.dossier.hero.title).toBe("One file to send, without uploading anything");
    expect(SITE_COPY.fr.dossier.faq[2]).toEqual({
      q: "Le texte reste-t-il sélectionnable ?",
      a: "Non, les pages sont des images. Vos originaux restent intacts sur votre appareil.",
    });
    expect(SITE_COPY.en.dossier.faq[2]).toEqual({
      q: "Is the text still selectable?",
      a: "No, the pages are images. Your originals stay untouched on your device.",
    });
    expect(SITE_COPY.fr.nav.dossier).toBe("Dossier");
    expect(SITE_COPY.en.nav.dossier).toBe("Dossier");
  });
});
