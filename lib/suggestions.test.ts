import { describe, expect, test } from "bun:test";
import { docStamp, isFresh, type Doc } from "./doc";
import { addMask, maskCount, masksKey, type PageMasks } from "./masks";
import {
  buildSuggestions,
  hideAll,
  hideMatch,
  isHidden,
  openMatches,
  pagesOf,
  rectsOf,
  showAll,
  showMatch,
  shownMatches,
  suggestionRects,
  takeSuggestions,
  withExtraction,
} from "./suggestions";
import type { Line } from "./text-lines";
import type { RenderOptions } from "./watermark";

/** Ligne horizontale à chasse fixe. */
const line = (text: string, x = 0.1, y = 0.2, w = 0.01, h = 0.012): Line => ({
  text,
  boxes: Array.from(text, (_, i) => ({ x: x + i * w, y, w, h })),
});

// Trois pages : un NIR et un IBAN sur la première, rien sur la deuxième, un IBAN replié sur la troisième.
const LINES: Line[][] = [
  [line("Bulletin de paie"), line("N° SS : 2 69 05 49 588 157 80", 0.1, 0.3), line("Net : 2 345,67", 0.1, 0.4), line("IBAN DE89 3704 0044 0532 0130 00", 0.1, 0.5)],
  [line("Page sans numéro")],
  [line("FR14 2004 1010 0505", 0.7, 0.3), line("0001 3M02 606", 0.7, 0.32)],
];

describe("suggestions d'un document", () => {
  const s = buildSuggestions(LINES);

  test("correspondances triées par page, rectangles par page puis par correspondance", () => {
    expect(s.matches.map((m) => [m.kind, m.page])).toEqual([
      ["fr-nir", 0],
      ["iban", 0],
      ["iban", 2],
    ]);
    expect(s.hasText).toBe(true);
    expect(s.incomplete).toBe(false);
    expect(Object.keys(s.rects).map(Number)).toEqual([0, 2]);
    expect(s.rects[0]).toHaveLength(2);
    expect(s.rects[2]).toHaveLength(1);
    // Un rectangle par ligne : deux pour l'IBAN replié.
    expect(rectsOf(s, 0)).toHaveLength(1);
    expect(rectsOf(s, 1)).toHaveLength(1);
    expect(rectsOf(s, 2)).toHaveLength(2);
    expect(rectsOf(s, 0)[0]).toEqual(s.rects[0][0][0]);
    expect(rectsOf(s, 1)[0]).toEqual(s.rects[0][1][0]);
    expect(rectsOf(s, 7)).toEqual([]);
  });

  test("le texte de toutes les lignes est gardé ; les boîtes, seulement là où il y a une correspondance", () => {
    expect(s.lines.map((p) => p.map((l) => l.text))).toEqual(LINES.map((p) => p.map((l) => l.text)));
    expect(s.lines[0].map((l) => l.boxes.length > 0)).toEqual([false, true, false, true]);
    expect(s.lines[1][0].boxes).toEqual([]);
    expect(s.lines[2].map((l) => l.boxes.length > 0)).toEqual([true, true]);
    // Les rectangles se recalculent à partir des lignes gardées (page tournée, plus tard).
    expect(suggestionRects(s.matches, s.lines)).toEqual(s.rects);
  });

  test("sans couche texte (photo, PDF numérisé) : rien à suggérer, et on le sait", () => {
    for (const lines of [undefined, [], [[]], [[line("   ")]]] as (Line[][] | undefined)[]) {
      const none = buildSuggestions(lines);
      expect(none.matches).toEqual([]);
      expect(none.hasText).toBe(false);
    }
    const plain = buildSuggestions([[line("Bonjour")]]);
    expect(plain.hasText).toBe(true);
    expect(plain.matches).toEqual([]);
  });

  test("lecture arrêtée avant la fin : signalée", () => {
    expect(buildSuggestions(LINES, true).incomplete).toBe(true);
    // Document forgé : la recherche plafonne, les suggestions le disent.
    const many = [Array.from({ length: 2100 }, (_, i) => line("IBAN DE89 3704 0044 0532 0130 00", 0.1, (i % 70) * 0.014))];
    expect(buildSuggestions(many).incomplete).toBe(true);
  });

  test("accepter : les rectangles deviennent des masques ordinaires ; annuler : eux seuls sont retirés", () => {
    const mine: PageMasks = addMask(undefined, 0, { x: 0.5, y: 0.8, w: 0.2, h: 0.1 });
    expect(isHidden(s, 0, mine)).toBe(false);
    const hidden = hideMatch(mine, s, 0);
    expect(isHidden(s, 0, hidden)).toBe(true);
    expect(isHidden(s, 1, hidden)).toBe(false);
    expect(hidden[0]).toHaveLength(2);
    expect(hidden[0][1]).toEqual(rectsOf(s, 0)[0]);
    // Accepter deux fois n'ajoute pas de doublon.
    expect(masksKey(hideMatch(hidden, s, 0))).toBe(masksKey(hidden));
    // Annuler rend exactement l'état d'avant.
    expect(masksKey(showMatch(hidden, s, 0))).toBe(masksKey(mine));
    // Numéro replié : accepté et annulé d'un seul geste.
    const wrapped = hideMatch(undefined, s, 2);
    expect(wrapped[2]).toHaveLength(2);
    expect(isHidden(s, 2, wrapped)).toBe(true);
    expect(showMatch(wrapped, s, 2)).toEqual({});
    // Sans masque : rien à annuler.
    expect(showMatch(undefined, s, 1)).toEqual({});
  });

  test("un masque déplacé à la main n'est plus « la suggestion » : elle redevient à traiter", () => {
    const hidden = hideMatch(undefined, s, 1);
    const moved: PageMasks = { 0: [{ ...hidden[0][0], x: hidden[0][0].x + 0.05 }] };
    expect(isHidden(s, 1, moved)).toBe(false);
    // Annuler ne touche pas au masque déplacé.
    expect(showMatch(moved, s, 1)).toEqual(moved);
  });

  test("tout masquer : toutes les pages, sauf les suggestions écartées ; annulable", () => {
    const dismissed = new Set([1]);
    expect(shownMatches(s, dismissed)).toEqual([0, 2]);
    expect(openMatches(s, dismissed, undefined)).toEqual([0, 2]);
    const all = hideAll(undefined, s, dismissed);
    expect(all.added).toEqual([0, 2]);
    expect(maskCount(all.masks)).toBe(3);
    expect(Object.keys(all.masks).map(Number)).toEqual([0, 2]);
    expect(openMatches(s, dismissed, all.masks)).toEqual([]);
    expect(pagesOf(s, all.added)).toEqual([1, 3]);
    // Une suggestion déjà masquée n'est pas comptée deux fois.
    const second = hideAll(hideMatch(undefined, s, 0), s);
    expect(second.added).toEqual([1, 2]);
    expect(showAll(second.masks, s, second.added)).toEqual(hideMatch(undefined, s, 0));
    expect(showAll(all.masks, s, all.added)).toEqual({});
    expect(openMatches(undefined, undefined, undefined)).toEqual([]);
  });

  test("les suggestions n'entrent pas dans la clé du réglage : les afficher ne relance aucun rendu", () => {
    const base: Doc = { id: "a", file: new File(["x"], "a.pdf"), status: "ready", stampedWith: "stamp", result: {} as Doc["result"] };
    const withSuggestions: Doc = { ...base, suggestions: s, dismissed: new Set([0]) };
    expect(docStamp(withSuggestions, "stamp")).toBe(docStamp(base, "stamp"));
    expect(isFresh(withSuggestions, "stamp")).toBe(true);
    // Une suggestion acceptée, elle, est un masque : le document est à refaire.
    const accepted: Doc = { ...withSuggestions, masks: hideMatch(undefined, s, 0) };
    expect(isFresh(accepted, "stamp")).toBe(false);
  });
});

describe("file de rendu", () => {
  test("le texte n'est demandé qu'une fois par document", () => {
    const options: RenderOptions = { masks: {}, maxBytes: 5 };
    expect(withExtraction(options, {})).toEqual({ ...options, extractText: true });
    const known = { suggestions: buildSuggestions(LINES) };
    expect(withExtraction(options, known)).toBe(options);
  });

  test("après le rendu : suggestions calculées, lignes retirées du résultat", () => {
    const result = { lines: LINES, linesIncomplete: false };
    const patch = takeSuggestions({}, result);
    expect(patch.suggestions?.matches).toHaveLength(3);
    expect(result.lines).toBeUndefined();
    // Document qui a déjà ses suggestions : rien ne change.
    expect(takeSuggestions({ suggestions: patch.suggestions }, { lines: LINES })).toEqual({});
  });

  test("image ou PDF sans texte : « pas de texte », et la lecture n'est pas redemandée", () => {
    const patch = takeSuggestions({}, {});
    expect(patch.suggestions).toMatchObject({ matches: [], hasText: false, incomplete: false });
    expect(withExtraction({}, patch)).toEqual({});
    expect(takeSuggestions({}, { lines: [[]], linesIncomplete: true }).suggestions?.incomplete).toBe(true);
  });
});
