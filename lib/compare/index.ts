// Accès aux comparatifs par langue et liens hreflang entre équivalents.

import type { Lang } from "@/lib/site-meta";
import { LANG_CODES } from "@/lib/site-meta";
import type { Comparison } from "./types";
import { COMPARISONS_AR } from "./ar";
import { COMPARISONS_EN } from "./en";
import { COMPARISONS_ES } from "./es";
import { COMPARISONS_FA } from "./fa";
import { COMPARISONS_FR } from "./fr";
import { COMPARISONS_JA } from "./ja";
import { COMPARISONS_ZH } from "./zh";

export type { Comparison, CompareRow } from "./types";

export const COMPARISONS: Record<Lang, Comparison[]> = {
  fr: COMPARISONS_FR,
  en: COMPARISONS_EN,
  ja: COMPARISONS_JA,
  zh: COMPARISONS_ZH,
  es: COMPARISONS_ES,
  ar: COMPARISONS_AR,
  fa: COMPARISONS_FA,
};

export const comparePath = (lang: Lang, slug: string) => `/${lang}/compare/${slug}`;
export const compareIndexPath = (lang: Lang) => `/${lang}/compare`;

export function findComparison(lang: Lang, slug: string): Comparison | undefined {
  return COMPARISONS[lang].find((c) => c.slug === slug);
}

/** hreflang : le comparatif du même outil dans chaque autre langue, s'il existe. */
export function comparisonAlternates(lang: Lang, c: Comparison): Record<string, string> {
  const out: Record<string, string> = { [lang]: comparePath(lang, c.slug) };
  for (const other of LANG_CODES) {
    if (other === lang) continue;
    const twin = COMPARISONS[other].find((x) => x.competitor === c.competitor);
    if (twin) out[other] = comparePath(other, twin.slug);
  }
  return out;
}

/** Autres comparatifs de la même langue, pour le maillage interne. */
export function relatedComparisons(lang: Lang, c: Comparison, count = 3): Comparison[] {
  const all = COMPARISONS[lang];
  const start = all.findIndex((x) => x.slug === c.slug);
  return [...all.slice(start + 1), ...all.slice(0, start)].slice(0, count);
}
