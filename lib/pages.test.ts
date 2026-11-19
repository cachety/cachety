import { describe, expect, test } from "bun:test";
import {
  addSection,
  dropPage,
  editsFor,
  editsKey,
  EMPTY_DOSSIER,
  initialPages,
  MAX_DOSSIER_PAGES,
  movePage,
  movePageToSection,
  presetSections,
  removePage,
  removeSection,
  renameSection,
  resetOrder,
  restoreDoc,
  rotatePage,
  rotationsInKey,
  safeFileName,
  sectionOf,
  splitBySection,
  stepPage,
  syncPages,
  updatePage,
  type DossierState,
  type Quad,
} from "./pages";

const A = { id: "a.pdf", pageCount: 3 };
const B = { id: "b.pdf", pageCount: 2 };
const C = { id: "c.jpg", pageCount: 1 };

/** « a0 a1 b0 » : document et page, pour lire un ordre d'un coup d'œil. */
const order = (s: DossierState) => s.pages.map((p) => `${p.doc[0]}${p.page}`).join(" ");
const state = (docs = [A, B, C]): DossierState => {
  const { over: _over, ...s } = syncPages(EMPTY_DOSSIER, docs);
  return s;
};
const groups = (s: DossierState) =>
  splitBySection(s).map((g) => `${g.section?.name ?? "-"}:${g.pages.map((p) => `${p.doc[0]}${p.page}`).join(",")}`);

describe("pages du dossier : ordre d'origine", () => {
  test("initialPages : les fichiers dans l'ordre, page après page", () => {
    const pages = initialPages([A, B, C]);
    expect(pages.map((p) => `${p.doc[0]}${p.page}`).join(" ")).toBe("a0 a1 a2 b0 b1 c0");
    expect(pages.every((p) => p.rotate === 0 && !p.crop && !p.clean)).toBe(true);
    expect(initialPages([])).toEqual([]);
  });

  test("MAX_DOSSIER_PAGES : un document qui ferait dépasser 1 000 pages reste de côté", () => {
    expect(MAX_DOSSIER_PAGES).toBe(1000);
    const big = { id: "big.pdf", pageCount: 500 };
    const big2 = { id: "big2.pdf", pageCount: 500 };
    const one = { id: "one.pdf", pageCount: 1 };
    expect(initialPages([big, big2, one])).toHaveLength(1000);
    const synced = syncPages(EMPTY_DOSSIER, [big, big2, one]);
    expect(synced.pages).toHaveLength(1000);
    expect(synced.over).toEqual(["one.pdf"]);
    // Un fichier retiré libère la place : le document en attente entre.
    const freed = syncPages(synced, [big, one]);
    expect(freed.over).toEqual([]);
    expect(freed.pages).toHaveLength(501);
  });
});

describe("pages du dossier : déplacer, tourner, retirer", () => {
  test("movePage : une page passe d'un document à l'autre", () => {
    const s = movePage(state(), 5, 0);
    expect(order(s)).toBe("c0 a0 a1 a2 b0 b1");
    expect(order(movePage(s, 1, 4))).toBe("c0 a1 a2 b0 a0 b1");
    expect(s.custom).toBe(true);
  });

  test("movePage : hors limites, borné ; rien ne bouge, même objet", () => {
    const s = state();
    expect(movePage(s, 2, 2)).toBe(s);
    expect(movePage(s, -1, 2)).toBe(s);
    expect(movePage(s, 9, 2)).toBe(s);
    expect(movePage(s, 1.5, 2)).toBe(s);
    expect(order(movePage(s, 0, 99))).toBe("a1 a2 b0 b1 c0 a0");
    expect(order(movePage(s, 5, -3))).toBe("c0 a0 a1 a2 b0 b1");
  });

  test("dropPage : interstice (0 avant la première, n après la dernière)", () => {
    const s = state();
    expect(order(dropPage(s, 5, 0))).toBe("c0 a0 a1 a2 b0 b1");
    expect(order(dropPage(s, 0, 6))).toBe("a1 a2 b0 b1 c0 a0");
    expect(order(dropPage(s, 0, 3))).toBe("a1 a2 a0 b0 b1 c0");
    // Les deux interstices qui encadrent la page ne changent rien.
    expect(dropPage(s, 2, 2)).toBe(s);
    expect(dropPage(s, 2, 3)).toBe(s);
  });

  test("rotatePage : 0 → 90 → 180 → 270 → 0", () => {
    let s = state();
    const seen: number[] = [];
    for (let i = 0; i < 4; i++) {
      s = rotatePage(s, 1);
      seen.push(s.pages[1].rotate);
    }
    expect(seen).toEqual([90, 180, 270, 0]);
    expect(s.pages[0].rotate).toBe(0);
    expect(rotatePage(s, 99)).toBe(s);
  });

  test("removePage puis undo() : l'état d'avant, à l'identique", () => {
    const before = rotatePage(state(), 3);
    const { state: after, undo } = removePage(before, 3);
    expect(order(after)).toBe("a0 a1 a2 b1 c0");
    expect(undo()).toBe(before);
    expect(undo(after)).toBe(before);
  });

  test("undo(courant) : la page revient sans défaire ce qui a été fait entre-temps", () => {
    const { state: after, undo } = removePage(state(), 1);
    const later = rotatePage(movePage(after, 4, 0), 2); // c0 en tête, a2 tournée
    const back = undo(later);
    expect(order(back)).toBe("c0 a1 a0 a2 b0 b1");
    expect(back.pages.find((p) => p.doc === "a.pdf" && p.page === 2)!.rotate).toBe(90);
    // Une seconde annulation ne duplique pas la page.
    expect(undo(back)).toBe(back);
  });

  test("undo après le retrait du document : rien à remettre", () => {
    const { state: after, undo } = removePage(state(), 3);
    const { over: _over, ...withoutB } = syncPages(after, [A, C]);
    expect(order(undo(withoutB))).toBe("a0 a1 a2 c0");
  });

  test("restoreDoc : les pages retirées reviennent à la suite de celles qui restent", () => {
    let s = state();
    s = removePage(s, 0).state;
    s = removePage(s, 0).state; // reste a2
    expect(order(restoreDoc(s, A))).toBe("a2 a0 a1 b0 b1 c0");
    // Document entièrement retiré : il reste connu (pas ré-ajouté d'office), « Remettre » le ramène.
    let empty = state();
    for (let i = 0; i < 2; i++) empty = removePage(empty, 3).state;
    const { over: _o, ...synced } = syncPages(empty, [A, B, C]);
    expect(order(synced)).toBe("a0 a1 a2 c0");
    expect(order(restoreDoc(synced, B))).toBe("a0 a1 a2 c0 b0 b1");
    expect(restoreDoc(state(), A)).toEqual(state());
  });

  test("resetOrder : ordre des fichiers, page après page ; retraits et rotations gardés", () => {
    let s = rotatePage(movePage(state(), 5, 0), 2);
    s = removePage(s, 4).state; // b0
    const reset = resetOrder(s, [A, B, C]);
    expect(order(reset)).toBe("a0 a1 a2 b1 c0");
    expect(reset.pages[1].rotate).toBe(90);
    expect(reset.custom).toBe(false);
  });
});

describe("pages du dossier : suivre la liste des documents", () => {
  test("un nouveau document arrive à la fin, les retouches des autres ne bougent pas", () => {
    const s = rotatePage(movePage(state([A, B]), 4, 0), 1);
    const { over, ...next } = syncPages(s, [A, B, C]);
    expect(over).toEqual([]);
    expect(order(next)).toBe("b1 a0 a1 a2 b0 c0");
    expect(next.pages[1].rotate).toBe(90);
  });

  test("un document retiré emporte ses pages, pas celles des autres", () => {
    const s = rotatePage(movePage(state(), 5, 0), 4);
    const { over: _o, ...next } = syncPages(s, [B, C]);
    expect(order(next)).toBe("c0 b0 b1");
    expect(next.pages[1].rotate).toBe(90);
  });

  test("un PDF déverrouillé plus tard arrive à la place de son fichier", () => {
    const locked = { id: "b.pdf", pageCount: 0 };
    const first = syncPages(EMPTY_DOSSIER, [A, locked, C]);
    expect(order(first)).toBe("a0 a1 a2 c0");
    expect(order(syncPages(first, [A, B, C]))).toBe("a0 a1 a2 b0 b1 c0");
  });

  test("l'ordre de rendu ne décide pas de l'ordre des pages", () => {
    // Le dernier document est prêt avant les autres.
    const first = syncPages(EMPTY_DOSSIER, [{ ...A, pageCount: 0 }, { ...B, pageCount: 0 }, C]);
    const second = syncPages(first, [{ ...A, pageCount: 0 }, B, C]);
    expect(order(second)).toBe("b0 b1 c0");
    expect(order(syncPages(second, [A, B, C]))).toBe("a0 a1 a2 b0 b1 c0");
  });

  test("fichiers réordonnés : les pages suivent, tant qu'aucune n'a été déplacée à la main", () => {
    const s = state();
    expect(order(syncPages(s, [C, A, B]))).toBe("c0 a0 a1 a2 b0 b1");
    const custom = movePage(s, 0, 1);
    expect(order(syncPages(custom, [C, A, B]))).toBe("a1 a0 a2 b0 b1 c0");
  });

  test("rien à faire : mêmes pages, même liste", () => {
    const s = state();
    const again = syncPages(s, [A, B, C]);
    expect(again.pages).toBe(s.pages);
    expect(again.sections).toBe(s.sections);
  });

  test("un document en cours de nouveau rendu (pages inconnues un instant) garde ses pages", () => {
    const s = rotatePage(state(), 0);
    const next = syncPages(s, [{ ...A, pageCount: 0 }, B, C]);
    expect(order(next)).toBe("a0 a1 a2 b0 b1 c0");
    expect(next.pages[0].rotate).toBe(90);
  });
});

describe("pages du dossier : sections", () => {
  const split = () => addSection(addSection(state(), 0, "ID"), 3, "Payslips");

  test("la première section prend tout ; « Nouvelle section ici » coupe à la page", () => {
    const one = addSection(state(), 0, "ID");
    expect(groups(one)).toEqual(["ID:a0,a1,a2,b0,b1,c0"]);
    expect(groups(split())).toEqual(["ID:a0,a1,a2", "Payslips:b0,b1,c0"]);
    // Créée d'emblée au milieu : ce qui précède devient la première section.
    expect(groups(addSection(state(), 3, "Payslips", "ID"))).toEqual(["ID:a0,a1,a2", "Payslips:b0,b1,c0"]);
  });

  test("splitBySection : section vide et dernière section", () => {
    const s = addSection(addSection(split(), 3, "Empty"), 5, "Last");
    // Deux sections au même début : la première des deux est vide.
    expect(groups(s)).toEqual(["ID:a0,a1,a2", "Payslips:", "Empty:b0,b1", "Last:c0"]);
    expect(splitBySection(state())).toEqual([{ pages: state().pages }]);
    expect(sectionOf(s, 0)?.name).toBe("ID");
    expect(sectionOf(s, 3)?.name).toBe("Empty");
    expect(sectionOf(s, 5)?.name).toBe("Last");
    expect(sectionOf(s, 6)).toBeUndefined();
    expect(sectionOf(state(), 2)).toBeUndefined();
  });

  test("movePage : la page rejoint la section de la page dont elle prend la place", () => {
    expect(groups(movePage(split(), 0, 4))).toEqual(["ID:a1,a2", "Payslips:b0,b1,a0,c0"]);
    expect(groups(movePage(split(), 5, 1))).toEqual(["ID:a0,c0,a1,a2", "Payslips:b0,b1"]);
  });

  test("dropPage à une frontière : fin de l'une ou début de l'autre, selon la section visée", () => {
    const s = split();
    const [id, pay] = s.sections;
    expect(groups(dropPage(s, 0, 3, id.id))).toEqual(["ID:a1,a2,a0", "Payslips:b0,b1,c0"]);
    expect(groups(dropPage(s, 0, 3, pay.id))).toEqual(["ID:a1,a2", "Payslips:a0,b0,b1,c0"]);
    expect(groups(dropPage(s, 5, 3, id.id))).toEqual(["ID:a0,a1,a2,c0", "Payslips:b0,b1"]);
    // Section vide : on peut y déposer une page.
    const withEmpty = addSection(s, 6, "Other");
    const other = withEmpty.sections[2];
    expect(groups(dropPage(withEmpty, 0, 6, other.id))).toEqual(["ID:a1,a2", "Payslips:b0,b1,c0", "Other:a0"]);
  });

  test("stepPage : au bout d'une section, la page franchit l'intertitre sans échanger sa place", () => {
    const s = split();
    const down = stepPage(s, 2, 1);
    expect(groups(down.state)).toEqual(["ID:a0,a1", "Payslips:a2,b0,b1,c0"]);
    expect(down.index).toBe(2);
    const up = stepPage(down.state, 2, -1);
    expect(groups(up.state)).toEqual(["ID:a0,a1,a2", "Payslips:b0,b1,c0"]);
    // Au milieu d'une section : un échange ordinaire.
    const mid = stepPage(s, 0, 1);
    expect(groups(mid.state)).toEqual(["ID:a1,a0,a2", "Payslips:b0,b1,c0"]);
    expect(mid.index).toBe(1);
    // Aux deux bouts du dossier : rien.
    expect(stepPage(s, 0, -1).state).toBe(s);
    expect(stepPage(s, 5, 1).state).toBe(s);
    // Sans section.
    expect(order(stepPage(state(), 0, 1).state)).toBe("a1 a0 a2 b0 b1 c0");
  });

  test("movePageToSection : à la fin de la section choisie", () => {
    const s = split();
    const moved = movePageToSection(s, 0, s.sections[1].id);
    expect(groups(moved.state)).toEqual(["ID:a1,a2", "Payslips:b0,b1,c0,a0"]);
    expect(moved.index).toBe(5);
    expect(movePageToSection(s, 0, s.sections[0].id).state).toBe(s);
  });

  test("retirer une page ou une section, renommer", () => {
    const s = split();
    expect(groups(removePage(s, 0).state)).toEqual(["ID:a1,a2", "Payslips:b0,b1,c0"]);
    expect(groups(removeSection(s, s.sections[1].id))).toEqual(["ID:a0,a1,a2,b0,b1,c0"]);
    // La première section retirée : la suivante commence à 0.
    expect(groups(removeSection(s, s.sections[0].id))).toEqual(["Payslips:a0,a1,a2,b0,b1,c0"]);
    expect(groups(renameSection(s, s.sections[0].id, "Passport"))[0]).toBe("Passport:a0,a1,a2");
    expect(renameSection(s, s.sections[0].id, "ID")).toBe(s);
  });

  test("undo d'un retrait : la page revient dans sa section, même en bout de section", () => {
    const s = split();
    const last = removePage(s, 2);
    expect(groups(last.undo(rotatePage(last.state, 0)))).toEqual(["ID:a0,a1,a2", "Payslips:b0,b1,c0"]);
    const first = removePage(s, 3);
    expect(groups(first.undo(rotatePage(first.state, 0)))).toEqual(["ID:a0,a1,a2", "Payslips:b0,b1,c0"]);
  });

  test("sections nommées avant tout document : les pages arrivent dans la première", () => {
    const empty = presetSections(EMPTY_DOSSIER, ["ID", "Payslips", "Tax notice"]);
    const { over: _o, ...s } = syncPages(empty, [A, B]);
    expect(groups(s)).toEqual(["ID:a0,a1,a2,b0,b1", "Payslips:", "Tax notice:"]);
  });

  test("un document retiré : les sections suivantes remontent", () => {
    const { over: _o, ...s } = syncPages(split(), [B, C]);
    expect(groups(s)).toEqual(["ID:", "Payslips:b0,b1,c0"]);
  });
});

describe("retouches par document (clé du rendu)", () => {
  const quad: Quad = [
    { x: 0.1, y: 0.1 },
    { x: 0.9, y: 0.12 },
    { x: 0.88, y: 0.9 },
    { x: 0.12, y: 0.92 },
  ];

  test("editsFor : seulement les pages gardées et retouchées de ce document", () => {
    let s = rotatePage(rotatePage(state(), 1), 4);
    s = updatePage(s, 5, { crop: quad, clean: { whiten: true, gray: false } });
    expect(editsFor(s, "a.pdf")).toEqual({ 1: { rotate: 90 } });
    expect(editsFor(s, "b.pdf")).toEqual({ 1: { rotate: 90 } });
    expect(editsFor(s, "c.jpg")).toEqual({ 0: { crop: quad, clean: { whiten: true, gray: false } } });
    expect(editsFor(state(), "a.pdf")).toEqual({});
  });

  test("editsKey : stable, indépendante de l'ordre des pages, vide sans retouche", () => {
    const s = rotatePage(rotatePage(state(), 0), 2);
    const moved = movePage(s, 0, 2);
    expect(editsKey(editsFor(s, "a.pdf"))).toBe(editsKey(editsFor(moved, "a.pdf")));
    expect(editsKey(editsFor(s, "a.pdf"))).toBe("0:r90|2:r90");
    expect(editsKey({ 2: { rotate: 90 }, 0: { rotate: 90 } })).toBe("0:r90|2:r90");
    expect(editsKey(undefined)).toBe("");
    expect(editsKey({})).toBe("");
    expect(editsKey({ 0: {} })).toBe("");
    // Déplacer ou retirer une page non retouchée ne change pas la clé : pas de nouveau rendu.
    expect(editsKey(editsFor(removePage(s, 1).state, "a.pdf"))).toBe(editsKey(editsFor(s, "a.pdf")));
  });

  test("editsKey : rotation, recadrage et nettoyage changent la clé", () => {
    const keys = new Set([
      editsKey({ 0: { rotate: 90 } }),
      editsKey({ 0: { rotate: 180 } }),
      editsKey({ 1: { rotate: 90 } }),
      editsKey({ 0: { crop: quad } }),
      editsKey({ 0: { crop: [{ x: 0.2, y: 0.1 }, quad[1], quad[2], quad[3]] } }),
      editsKey({ 0: { clean: { whiten: true, gray: false } } }),
      editsKey({ 0: { clean: { whiten: true, gray: true } } }),
      editsKey({ 0: { clean: { whiten: false, gray: true } } }),
    ]);
    expect(keys.size).toBe(8);
    expect(editsKey({ 0: { clean: { whiten: false, gray: false } } })).toBe("");
  });

  test("rotationsInKey : ce que montre une vignette déjà rendue", () => {
    expect(rotationsInKey("0:r90|2:r270c0.1000,0.1000,0.9,0.1,0.9,0.9,0.1,0.9w")).toEqual({ 0: 90, 2: 270 });
    expect(rotationsInKey("")).toEqual({});
    expect(rotationsInKey("3:wg")).toEqual({});
  });

  test("updatePage : un nettoyage sans effet ou un recadrage retiré ne laisse pas de trace", () => {
    const s = updatePage(state(), 5, { crop: quad, clean: { whiten: false, gray: false } });
    expect(s.pages[5].clean).toBeUndefined();
    expect(updatePage(s, 5, { crop: undefined }).pages[5].crop).toBeUndefined();
  });
});

describe("noms de fichiers tirés d'un texte saisi", () => {
  test("séparateurs de chemin et caractères interdits retirés (Zip-Slip)", () => {
    expect(safeFileName("../../etc/passwd", "section")).toBe("etc passwd");
    expect(safeFileName("..\\evil", "section")).toBe("evil");
    expect(safeFileName('a<b>c:d"e|f?g*h', "section")).toBe("a b c d e f g h");
    expect(safeFileName("..", "section")).toBe("section");
    expect(safeFileName(".hidden", "section")).toBe("hidden");
    expect(safeFileName("  ", "Section 2")).toBe("Section 2");
    expect(safeFileName("nom\u0000\n avec\tcontrôles", "x")).toBe("nom avec contrôles");
  });

  test("accents, autres écritures et émojis gardés ; 60 caractères entiers au plus", () => {
    expect(safeFileName("Pièce d'identité", "x")).toBe("Pièce d'identité");
    expect(safeFileName("身份证件", "x")).toBe("身份证件");
    expect(safeFileName("Fiches de paie.", "x")).toBe("Fiches de paie");
    const long = safeFileName(`${"x".repeat(59)}😀😀`, "x");
    expect(Array.from(long)).toHaveLength(60);
    expect(long.isWellFormed()).toBe(true);
  });
});
