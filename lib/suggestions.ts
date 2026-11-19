// Suggestions de masquage d'un document : ce que Cachety a repéré dans sa
// couche texte (lib/sensitive.ts) et où (rectangles prêts à devenir des
// masques). Rien de React ici : des types et des fonctions pures.
//
// Une suggestion ne masque rien. Elle devient un masque ordinaire
// (lib/masks.ts) quand la personne l'accepte ; « masquée » se déduit donc des
// masques du document, sans état à part. Les suggestions n'entrent pas dans
// la clé du réglage (docStamp) : les afficher ne relance aucun rendu.
//
// docs/prd-suggested-areas.md §6.4.

import { addMask, setPageMasks, type MaskRect, type PageMasks } from "@/lib/masks";
import { findInLines, MAX_MATCHES, rectsFor, type Match } from "@/lib/sensitive";
import type { Line } from "@/lib/text-lines";

export type PageSuggestions = {
  /** Correspondances, triées par page puis par position. */
  matches: Match[];
  /** Par page (index 0), puis par correspondance de cette page dans l'ordre de `matches` : un rectangle par ligne. */
  rects: Record<number, MaskRect[][]>;
  /**
   * Lignes extraites du document, par page. Le texte de toutes est gardé ;
   * les boîtes, seulement pour les lignes qui portent une correspondance
   * (elles suffisent à recalculer les rectangles, par exemple après une
   * rotation de page, sans garder des millions de boîtes en mémoire).
   */
  lines: Line[][];
  /** Le document a une couche texte (faux : photo, PDF numérisé). */
  hasText: boolean;
  /** Lecture ou recherche arrêtée avant la fin du document (plafonds de lib/text-extract.ts). */
  incomplete: boolean;
};

/** Rectangles de chaque correspondance, au format de `PageSuggestions.rects`. Fonction pure des lignes. */
export function suggestionRects(matches: Match[], lines: Line[][]): Record<number, MaskRect[][]> {
  const rects: Record<number, MaskRect[][]> = {};
  for (const m of matches) (rects[m.page] ??= []).push(rectsFor(m, lines));
  return rects;
}

/**
 * Suggestions d'un document à partir de ses lignes de texte (`undefined` ou
 * vide : pas de couche texte). Les correspondances sans rectangle (boîtes
 * dégénérées) sont écartées : on ne propose que ce qui peut être masqué.
 */
export function buildSuggestions(lines: Line[][] | undefined, incomplete = false): PageSuggestions {
  const all = lines ?? [];
  const hasText = all.some((page) => page.some((l) => l.text.trim().length > 0));
  const found = hasText ? findInLines(all) : [];
  const matches = found.filter((m) => rectsFor(m, all).length > 0);
  // Boîtes gardées pour les seules lignes utiles.
  const useful = new Set<string>();
  for (const m of matches) {
    useful.add(`${m.page}:${m.line}`);
    for (const span of m.more ?? []) useful.add(`${m.page}:${span.line}`);
  }
  const kept = all.map((page, p) => page.map((l, i) => (useful.has(`${p}:${i}`) ? l : { text: l.text, boxes: [] })));
  return {
    matches,
    rects: suggestionRects(matches, all),
    lines: kept,
    hasText,
    incomplete: incomplete || found.length >= MAX_MATCHES,
  };
}

/** Rectangles de la correspondance `index`. */
export function rectsOf(s: PageSuggestions, index: number): MaskRect[] {
  const m = s.matches[index];
  if (!m) return [];
  // Rang de la correspondance parmi celles de sa page (les correspondances sont triées par page).
  let first = index;
  while (first > 0 && s.matches[first - 1].page === m.page) first--;
  return s.rects[m.page]?.[index - first] ?? [];
}

/** Deux rectangles égaux à l'arrondi de masksKey (4 décimales). */
const rectKey = (r: MaskRect) => [r.x, r.y, r.w, r.h].map((v) => v.toFixed(4)).join(",");

/** La correspondance est-elle masquée ? Oui si chacun de ses rectangles est un masque du document. */
export function isHidden(s: PageSuggestions, index: number, masks: PageMasks | undefined): boolean {
  const rects = rectsOf(s, index);
  if (!rects.length) return false;
  const keys = new Set((masks?.[s.matches[index].page] ?? []).map(rectKey));
  return rects.every((r) => keys.has(rectKey(r)));
}

/** Accepte une suggestion : ses rectangles deviennent des masques ordinaires (sans doublon). */
export function hideMatch(masks: PageMasks | undefined, s: PageSuggestions, index: number): PageMasks {
  const m = s.matches[index];
  let next: PageMasks = masks ?? {};
  if (!m) return next;
  for (const rect of rectsOf(s, index)) {
    if ((next[m.page] ?? []).some((r) => rectKey(r) === rectKey(rect))) continue;
    next = addMask(next, m.page, rect);
  }
  return next;
}

/** Annule : retire exactement les rectangles de la suggestion, pas les autres masques. */
export function showMatch(masks: PageMasks | undefined, s: PageSuggestions, index: number): PageMasks {
  const m = s.matches[index];
  if (!m) return masks ?? {};
  const drop = rectsOf(s, index).map(rectKey);
  const rest = (masks?.[m.page] ?? []).filter((r) => {
    const at = drop.indexOf(rectKey(r));
    if (at < 0) return true;
    drop.splice(at, 1);
    return false;
  });
  return setPageMasks(masks, m.page, rest);
}

/** Suggestions affichées : toutes sauf celles écartées (« Pas celui-ci »). */
export function shownMatches(s: PageSuggestions | undefined, dismissed?: ReadonlySet<number>): number[] {
  return (s?.matches ?? []).map((_, i) => i).filter((i) => !dismissed?.has(i));
}

/** Suggestions encore à traiter : ni écartées, ni déjà masquées. */
export function openMatches(s: PageSuggestions | undefined, dismissed: ReadonlySet<number> | undefined, masks: PageMasks | undefined): number[] {
  return s ? shownMatches(s, dismissed).filter((i) => !isHidden(s, i, masks)) : [];
}

/** « Tout masquer » : accepte chaque suggestion encore à traiter. `added` : celles qui viennent d'être masquées. */
export function hideAll(
  masks: PageMasks | undefined,
  s: PageSuggestions,
  dismissed?: ReadonlySet<number>
): { masks: PageMasks; added: number[] } {
  const added = openMatches(s, dismissed, masks);
  let next: PageMasks = masks ?? {};
  for (const i of added) next = hideMatch(next, s, i);
  return { masks: next, added };
}

/** Annule un « Tout masquer » : retire les suggestions de `added`. */
export function showAll(masks: PageMasks | undefined, s: PageSuggestions, added: readonly number[]): PageMasks {
  let next: PageMasks = masks ?? {};
  for (const i of added) next = showMatch(next, s, i);
  return next;
}

/** Pages (numérotées à partir de 1, sans doublon, croissantes) des suggestions données. */
export function pagesOf(s: PageSuggestions, indexes: readonly number[]): number[] {
  return [...new Set(indexes.map((i) => s.matches[i].page + 1))].sort((a, b) => a - b);
}

// ───────────────────────── File de rendu ─────────────────────────

/**
 * Options du moteur pour le rendu d'un document : lire aussi son texte tant
 * que ses suggestions ne sont pas connues. Le texte ne dépend pas du
 * filigrane : il n'est lu qu'une fois par document.
 */
export function withExtraction<T extends { extractText?: boolean }>(options: T, doc: { suggestions?: PageSuggestions }): T {
  return doc.suggestions === undefined ? { ...options, extractText: true } : options;
}

/**
 * Après le rendu d'un document qui n'avait pas encore de suggestions : les
 * calcule à partir des lignes lues (aucune ligne : photo ou PDF sans texte).
 * Les lignes sont retirées du résultat : seules restent celles, élaguées, des
 * suggestions.
 */
export function takeSuggestions(
  doc: { suggestions?: PageSuggestions },
  result: { lines?: Line[][]; linesIncomplete?: boolean }
): { suggestions?: PageSuggestions } {
  if (doc.suggestions !== undefined) return {};
  const lines = result.lines;
  result.lines = undefined;
  return { suggestions: buildSuggestions(lines, !!result.linesIncomplete) };
}
