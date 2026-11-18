import { describe, expect, test } from "bun:test";
import { findInLines, rectsFor } from "./sensitive";
import {
  lineNeighbours,
  linesFromItems,
  MAX_LINE_CHARS,
  visualOrder,
  type Line,
  type TextItemLike,
  type TextStyleLike,
  type ViewportLike,
} from "./text-lines";

// Éléments de synthèse, tels que pdf.js les rend (getTextContent) : texte,
// matrice [a, b, c, d, e, f] en points PDF (origine en bas à gauche), largeur.

/** Page A4 rendue à l'échelle 2, comme lib/watermark.ts. */
const A4: ViewportLike = { width: 1190, height: 1684, transform: [2, 0, 0, -2, 0, 1684] };
/** La même page avec /Rotate 90 : affichée en paysage. */
const A4_ROTATED: ViewportLike = { width: 1684, height: 1190, transform: [0, 2, 2, 0, 0, 0] };

const STYLES: Record<string, TextStyleLike> = {
  sans: { ascent: 0.718, descent: -0.207, fontFamily: "sans-serif" },
  mono: { ascent: 0.629, descent: -0.157, fontFamily: "monospace" },
  vertical: { ascent: 0.8, descent: -0.2, vertical: true },
};

/** Élément horizontal : `width` par défaut à 0,5 × la taille par caractère. */
function item(str: string, x: number, y: number, more: Partial<TextItemLike> & { size?: number } = {}): TextItemLike {
  const { size = 10, ...rest } = more;
  return { str, transform: [size, 0, 0, size, x, y], width: str.length * size * 0.5, fontName: "mono", dir: "ltr", ...rest };
}

const texts = (lines: Line[]) => lines.map((l) => l.text);
const lines = (items: TextItemLike[], viewport = A4) => linesFromItems(items, viewport, STYLES);

describe("lignes : regroupement par ligne de base", () => {
  test("éléments qui se suivent sur la même ligne de base : une ligne ; autre ligne de base : une autre", () => {
    const out = lines([item("Bulletin", 50, 700), item(" de paie", 90, 700), item("Janvier 2026", 50, 680)]);
    expect(texts(out)).toEqual(["Bulletin de paie", "Janvier 2026"]);
    for (const l of out) expect(l.boxes).toHaveLength(l.text.length);
  });

  test("ordre de lecture : de haut en bas, quel que soit l'ordre dans le PDF", () => {
    const out = lines([item("bas", 50, 100), item("haut", 50, 800), item("milieu", 50, 400)]);
    expect(texts(out)).toEqual(["haut", "milieu", "bas"]);
  });

  test("ligne de base à peine décalée (moins de 0,3 × la hauteur) : même ligne ; indice plus bas : autre ligne", () => {
    expect(texts(lines([item("12", 50, 700), item("34", 60, 702)]))).toEqual(["1234"]);
    expect(texts(lines([item("12", 50, 700), item("34", 60, 695)]))).toEqual(["12", "34"]);
  });

  test("écart : espace insérée au-delà de 0,25 caractère, autre ligne au-delà de 1,5 (colonnes)", () => {
    // Caractères de 5 points de large.
    expect(texts(lines([item("FR14", 50, 700), item("2004", 71, 700)]))).toEqual(["FR142004"]); // 1 pt
    expect(texts(lines([item("FR14", 50, 700), item("2004", 73, 700)]))).toEqual(["FR14 2004"]); // 3 pt
    expect(texts(lines([item("FR14", 50, 700), item("2004", 78, 700)]))).toEqual(["FR14", "2004"]); // 8 pt
    const [joined] = lines([item("FR14", 50, 700), item("2004", 73, 700)]);
    expect(joined.boxes).toHaveLength(9);
    // La boîte de l'espace fait le pont entre ses deux voisines.
    expect(joined.boxes[4].x).toBeCloseTo(joined.boxes[3].x, 6);
    expect(joined.boxes[4].x + joined.boxes[4].w).toBeCloseTo(joined.boxes[5].x + joined.boxes[5].w, 6);
  });

  test("pas de double espace quand l'élément en porte déjà une", () => {
    expect(texts(lines([item("IBAN ", 50, 700), item("FR14", 77, 700)]))).toEqual(["IBAN FR14"]);
    expect(texts(lines([item("IBAN", 50, 700), item(" FR14", 72, 700)]))).toEqual(["IBAN FR14"]);
  });

  test("les « ponts » d'espaces de pdf.js ne relient pas deux colonnes", () => {
    // pdf.js pose un élément « espace » large de tout l'écart entre deux morceaux d'une même ligne.
    const out = lines([item("Numéro fiscal", 50, 600), item(" ", 115, 600, { width: 185 }), item("3012345678901", 300, 600)]);
    expect(texts(out)).toEqual(["Numéro fiscal", "3012345678901"]);
  });

  test("hasEOL termine la ligne, y compris porté par un élément vide", () => {
    expect(texts(lines([item("fin", 50, 700, { hasEOL: true }), item("début", 65, 700)]))).toEqual(["fin", "début"]);
    const empty: TextItemLike = { str: "", transform: [10, 0, 0, 10, 65, 700], width: 0, hasEOL: true };
    expect(texts(lines([item("fin", 50, 700), empty, item("début", 65, 700)]))).toEqual(["fin", "début"]);
    expect(texts(lines([item("fin", 50, 700), item("début", 65, 700)]))).toEqual(["findébut"]);
  });

  test("texte découpé caractère par caractère : recollé, et l'IBAN y est trouvé", () => {
    const iban = "DE89370400440532013000";
    const items = Array.from(iban, (ch, i) => item(ch, 50 + i * 5.2, 560));
    const out = lines(items);
    expect(texts(out)).toEqual([iban]);
    const [m] = findInLines([out]);
    expect(m).toMatchObject({ kind: "iban", start: 0, end: iban.length });
    const [r] = rectsFor(m, [out]);
    // Du premier au dernier caractère, marges comprises (une demi-largeur de caractère).
    expect(r.x * 595).toBeLessThan(50);
    expect(r.x * 595).toBeGreaterThan(50 - 4);
    expect((r.x + r.w) * 595).toBeGreaterThan(50 + 21 * 5.2 + 5);
    expect((r.x + r.w) * 595).toBeLessThan(50 + 21 * 5.2 + 5 + 4);
  });

  test("faux gras : le même texte dessiné deux fois au même endroit ne compte qu'une fois", () => {
    const out = lines([item("FR14 2004", 50, 700), item("FR14 2004", 50.3, 700)]);
    expect(texts(out)).toEqual(["FR14 2004"]);
  });

  test("ligne démesurée : coupée en morceaux de MAX_LINE_CHARS", () => {
    const long = "1".repeat(MAX_LINE_CHARS * 2 + 10);
    const out = lines([{ str: long, transform: [1, 0, 0, 1, 10, 700], width: 500, fontName: "mono" }]);
    expect(out.map((l) => l.text.length)).toEqual([MAX_LINE_CHARS, MAX_LINE_CHARS, 10]);
    for (const l of out) expect(l.boxes).toHaveLength(l.text.length);
  });
});

describe("lignes : ce qui est ignoré", () => {
  test("hors de la page, largeur nulle, vide, espaces seules, écriture verticale, matrice invalide", () => {
    const out = lines([
      item("dedans", 50, 700),
      item("à gauche", -200, 700),
      item("à droite", 700, 700),
      item("au-dessus", 50, 900),
      item("en dessous", 50, -50),
      item("sans largeur", 50, 650, { width: 0 }),
      item("", 50, 600),
      item("   ", 50, 550),
      item("vertical", 50, 500, { fontName: "vertical" }),
      item("ttb", 50, 450, { dir: "ttb" }),
      { str: "NaN", transform: [10, 0, 0, 10, Number.NaN, 400], width: 20 },
      { str: "court", transform: [10, 0], width: 20 },
      { str: "plat", transform: [0, 0, 0, 0, 50, 350], width: 20 },
    ]);
    expect(texts(out)).toEqual(["dedans"]);
  });

  test("entrées forgées : ni exception ni ligne", () => {
    const junk = [null, undefined, {}, { str: 5 }, { str: "x" }, { str: "x", transform: "abc", width: 3 }] as unknown as TextItemLike[];
    expect(linesFromItems(junk, A4, STYLES)).toEqual([]);
    expect(linesFromItems([item("x", 50, 700)], { width: 0, height: 0, transform: [1, 0, 0, 1, 0, 0] })).toEqual([]);
    expect(linesFromItems([], A4)).toEqual([]);
  });

  test("texte invisible (PDF passé à l'OCR) : gardé, ses positions sont celles de l'image", () => {
    // Rien dans un élément pdf.js ne dit le mode de rendu : le texte est lu comme les autres.
    expect(texts(lines([item("FR14 2004 1010 0505 0001 3M02 606", 50, 700)]))).toEqual(["FR14 2004 1010 0505 0001 3M02 606"]);
  });
});

describe("boîtes des caractères", () => {
  test("page normalisée : position d'après la matrice, hauteur d'après l'ascendante et la descendante", () => {
    const [l] = lines([item("1234", 59.5, 842 - 84.2, { size: 10 })]);
    const [b0, , , b3] = l.boxes;
    expect(b0.x).toBeCloseTo(0.1, 6);
    expect(b0.w).toBeCloseTo(5 / 595, 6);
    expect(b3.x + b3.w).toBeCloseTo((59.5 + 20) / 595, 6);
    // Ligne de base à 10 % du haut ; 6,29 pt au-dessus, 1,57 pt en dessous.
    expect(b0.y).toBeCloseTo((84.2 - 6.29) / 842, 6);
    expect(b0.h).toBeCloseTo((6.29 + 1.57) / 842, 6);
  });

  test("police inconnue : hauteur d'une fois la taille de police", () => {
    const [l] = linesFromItems([item("1234", 50, 700, { fontName: "inconnue", size: 12 })], A4, STYLES);
    expect(l.boxes[0].h).toBeCloseTo(12 / 842, 6);
    expect(l.boxes[0].y).toBeCloseTo((842 - 700 - 0.8 * 12) / 842, 6);
  });

  test("chasse fixe : parts égales ; chasse variable : selon la largeur habituelle des caractères", () => {
    const [mono] = lines([item("il MW 11", 50, 700, { fontName: "mono" })]);
    for (const b of mono.boxes) expect(b.w).toBeCloseTo(mono.boxes[0].w, 9);
    const [sans] = lines([item("il MW 11", 50, 700, { fontName: "sans" })]);
    const w = sans.boxes.map((b) => b.w);
    expect(w[0]).toBeLessThan(w[3] / 2); // i bien plus étroit que M
    expect(w[6]).toBeCloseTo(w[7], 9); // les chiffres ont tous la même largeur
    // La somme des parts fait la largeur de l'élément.
    expect(w.reduce((a, b) => a + b, 0)).toBeCloseTo(40 / 595, 6);
    // Avec un libellé devant, le numéro n'est plus décalé par les lettres étroites.
    const label = "Illimité : ";
    const [line] = lines([item(`${label}12345678`, 50, 700, { fontName: "sans", width: 80 })]);
    const mean = 80 / (label.length + 8) / 595;
    expect(line.boxes[label.length].x).toBeLessThan(50 / 595 + label.length * mean);
  });

  test("texte tourné : boîtes droites qui englobent le caractère penché", () => {
    // Texte à 90° (lu vers le haut) sur une page droite.
    const [l] = lines([{ str: "1234", transform: [0, 10, -10, 0, 300, 400], width: 20, fontName: "mono" }]);
    expect(l.text).toBe("1234");
    for (const b of l.boxes) {
      expect(b.w).toBeGreaterThan(0);
      expect(b.h).toBeGreaterThan(0);
      expect(b.h * 842).toBeCloseTo(5, 6); // un caractère fait 5 pt le long du texte
      expect(b.w * 595).toBeCloseTo(7.86, 6); // et 7,86 pt en travers (ascendante + descendante)
    }
    // Lu vers le haut : le premier caractère est le plus bas.
    expect(l.boxes[0].y).toBeGreaterThan(l.boxes[3].y);
    // Texte à 30° : la boîte englobe le quadrilatère.
    const cos = Math.cos(Math.PI / 6) * 10;
    const sin = Math.sin(Math.PI / 6) * 10;
    const [tilted] = lines([{ str: "12", transform: [cos, sin, -sin, cos, 300, 400], width: 10, fontName: "mono" }]);
    expect(tilted.boxes[0].w * 595).toBeGreaterThan(5 * Math.cos(Math.PI / 6));
    expect(tilted.boxes[0].h * 842).toBeGreaterThan(7.86 * Math.cos(Math.PI / 6));
  });

  test("page avec /Rotate 90 : le texte se lit vers le bas sur la page affichée, boîtes dans ce repère", () => {
    const text = "NL91 ABNA 0417 1643 00";
    const out = lines([item(text, 50, 700, { size: 12, width: 132 })], A4_ROTATED);
    expect(texts(out)).toEqual([text]);
    const boxes = out[0].boxes;
    // Le point (50, 700) du PDF s'affiche à x = 700 / 842, y = 50 / 595.
    expect(boxes[0].y).toBeCloseTo(50 / 595, 6);
    expect(boxes[0].x + boxes[0].w).toBeCloseTo((700 + 0.629 * 12) / 842, 6);
    expect(boxes[21].y + boxes[21].h).toBeCloseTo((50 + 132) / 595, 6);
    for (const b of boxes) expect(b.x).toBeCloseTo(boxes[0].x, 9);
    const [m] = findInLines([out]);
    const [r] = rectsFor(m, [out]);
    // Rectangle vertical : haut et étroit.
    expect(r.h * 1190).toBeGreaterThan(r.w * 1684 * 5);
  });
});

describe("pages de droite à gauche (arabe, persan)", () => {
  /** Un élément par glyphe arabe, de gauche à droite sur la page (PDF produits par Chrome). */
  const glyphs = (word: string, x: number, y: number) =>
    // `word` est dans l'ordre de lecture : son premier caractère est le plus à droite.
    Array.from(word, (ch, i) => item(ch, x + (word.length - 1 - i) * 5, y, { dir: "rtl" })).reverse();

  test("ligne arabe avec un IBAN : lue depuis la droite, l'IBAN gardant son sens et sa place", () => {
    const items = [
      // Tel qu'affiché, de gauche à droite : l'IBAN (plusieurs morceaux), « : », puis le libellé.
      item("GB", 100, 700),
      item("29", 110, 700),
      item("NWBK", 123, 700),
      item("6016 1331 9268 19", 146, 700),
      item(":", 236, 700),
      ...glyphs("الحساب", 241, 700),
      ...glyphs("رقم", 274, 700),
    ];
    const out = lines(items);
    expect(texts(out)).toEqual(["رقم الحساب: GB29 NWBK 6016 1331 9268 19"]);
    const [m] = findInLines([out]);
    expect(m.kind).toBe("iban");
    const [r] = rectsFor(m, [out]);
    expect(r.x * 595).toBeCloseTo(100 - 2.5, 0);
    expect((r.x + r.w) * 595).toBeCloseTo(146 + 85 + 2.5, 0);
  });

  test("hasEOL posé par pdf.js au milieu d'une ligne arabe ne la coupe pas en deux segments du même numéro", () => {
    // pdf.js émet un élément vide « fin de ligne » au début de chaque ligne affichée.
    const eol: TextItemLike = { str: "", transform: [10, 0, 0, 10, 100, 700], width: 0, hasEOL: true };
    const out = lines([...glyphs("سطر", 300, 720), eol, item("4111 1111 1111 1111", 100, 700), ...glyphs("بطاقة", 200, 700)]);
    expect(texts(out)).toEqual(["سطر", "بطاقة 4111 1111 1111 1111"]);
  });

  test("élément « rtl » d'un seul tenant (ordre de lecture) : chaque caractère à sa place affichée", () => {
    // « کد ملی: 0499370899 » : le libellé à droite, le nombre à gauche.
    const str = "کد ملی: 0499370899";
    const [l] = lines([item(str, 100, 700, { dir: "rtl" })]);
    expect(l.text).toBe(str);
    const digits = l.boxes.slice(8);
    // Les chiffres se suivent de gauche à droite, à gauche du libellé.
    for (let i = 1; i < digits.length; i++) expect(digits[i].x).toBeGreaterThan(digits[i - 1].x);
    expect(digits[0].x * 595).toBeCloseTo(100, 6);
    expect(l.boxes[0].x).toBeGreaterThan(digits[digits.length - 1].x);
    expect(findInLines([[l]]).map((m) => m.kind)).toEqual(["ir-melli"]);
  });

  test("ordre d'affichage d'un élément « rtl » : lettres depuis la droite, mots latins et nombres dans leur sens", () => {
    expect(visualOrder("ابج")).toEqual([2, 1, 0]);
    expect(visualOrder("اب 12")).toEqual([3, 4, 2, 1, 0]);
    // « اب FR76 3000 » : l'IBAN reste d'un seul tenant, à gauche.
    expect(visualOrder("اب FR76 3000")).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 2, 1, 0]);
    // Deux groupes de chiffres sans lettre latine : ils s'affichent inversés (algorithme bidi).
    expect(visualOrder("اب 12 34")).toEqual([6, 7, 5, 3, 4, 2, 1, 0]);
    expect(visualOrder("12.5")).toEqual([0, 1, 2, 3]);
    for (const s of ["", "a", "اب FR76 3000 جد 12/05", "۱۲۳ ابج 4-5"]) {
      expect([...visualOrder(s)].sort((a, b) => a - b)).toEqual(Array.from(s, (_, i) => i));
    }
  });
});

describe("voisinage des lignes (recherche des libellés)", () => {
  const line = (text: string, x: number, y: number, w = 0.01, h = 0.012): Line => ({
    text,
    boxes: Array.from(text, (_, i) => ({ x: x + i * w, y, w, h })),
  });

  test("même rangée avant, rangée du dessus qui surplombe, ligne suivante en dessous", () => {
    const page = [
      line("Libellé A", 0.1, 0.2), // 0
      line("Libellé B", 0.6, 0.2), // 1
      line("valeur a", 0.1, 0.22), // 2
      line("valeur b", 0.6, 0.22), // 3
      line("loin", 0.1, 0.6), // 4
    ];
    const near = lineNeighbours(page);
    expect(near[1].before).toEqual([0]);
    expect(near[0].before).toEqual([]);
    expect(near[2].above).toEqual([0]);
    expect(near[3].above).toEqual([1]);
    expect(near[3].before).toEqual([2]);
    expect(near[0].next).toBe(2);
    expect(near[1].next).toBe(3);
    expect(near[4]).toEqual({ before: [], above: [] });
  });

  test("page de droite à gauche : « avant » est à droite", () => {
    const page = [line("123456", 0.1, 0.2), line("رقم الحساب", 0.5, 0.2)];
    const near = lineNeighbours(page);
    expect(near[0].before).toEqual([1]);
    expect(near[1].before).toEqual([]);
  });

  test("page tournée : le voisinage suit le sens du texte", () => {
    const vertical = (text: string, x: number, y: number): Line => ({
      text,
      boxes: Array.from(text, (_, i) => ({ x, y: y + i * 0.01, w: 0.012, h: 0.01 })),
    });
    // Texte lu vers le bas : la ligne « du dessus » est à droite.
    const page = [vertical("Numéro fiscal", 0.8, 0.1), vertical("3012345678901", 0.78, 0.1)];
    const near = lineNeighbours(page);
    expect(near[1].above).toEqual([0]);
    expect(near[0].next).toBe(1);
    expect(findInLines([page]).map((m) => m.kind)).toEqual(["fr-tax"]);
  });

  test("lignes sans boîtes : aucune voisine, aucune erreur", () => {
    expect(lineNeighbours([{ text: "abc", boxes: [] }, { text: "", boxes: [] }])).toEqual([
      { before: [], above: [] },
      { before: [], above: [] },
    ]);
  });

  test("page forgée (des milliers de lignes) : coût borné", () => {
    const page = Array.from({ length: 20_000 }, (_, i) => line("1234 5678", (i % 50) * 0.02, Math.floor(i / 50) * 0.002, 0.001, 0.0015));
    const t0 = performance.now();
    lineNeighbours(page);
    expect(performance.now() - t0).toBeLessThan(1500);
  });
});
