// Accès aux comparatifs par langue et liens hreflang entre équivalents.

import type { Lang } from "@/lib/site-meta";
import { LANG_CODES } from "@/lib/site-meta";
import type { Comparison } from "./types";
import { COMPARISONS_AR } from "./ar";
import { COMPARISONS_EN } from "./en";
import { COMPARISONS_ES } from "./es";
import { COMPARISONS_FA } from "./fa";
import { COMPARISONS_DE } from "./de";
import { COMPARISONS_PT } from "./pt";
import { COMPARISONS_ID } from "./id";
import { COMPARISONS_NL } from "./nl";
import { COMPARISONS_FR } from "./fr";
import { COMPARISONS_JA } from "./ja";
import { COMPARISONS_ZH } from "./zh";
import { SIGN_COMPARISONS_AR } from "./sign/ar";
import { SIGN_COMPARISONS_DE } from "./sign/de";
import { SIGN_COMPARISONS_EN } from "./sign/en";
import { SIGN_COMPARISONS_ES } from "./sign/es";
import { SIGN_COMPARISONS_FA } from "./sign/fa";
import { SIGN_COMPARISONS_FR } from "./sign/fr";
import { SIGN_COMPARISONS_ID } from "./sign/id";
import { SIGN_COMPARISONS_JA } from "./sign/ja";
import { SIGN_COMPARISONS_NL } from "./sign/nl";
import { SIGN_COMPARISONS_PT } from "./sign/pt";
import { SIGN_COMPARISONS_ZH } from "./sign/zh";

export type { Comparison, CompareRow } from "./types";

/** Filigrane d'abord, puis signature (chaque entrée de lib/compare/sign/* porte tool: "sign"). */
export const COMPARISONS: Record<Lang, Comparison[]> = {
  fr: [...COMPARISONS_FR, ...SIGN_COMPARISONS_FR],
  en: [...COMPARISONS_EN, ...SIGN_COMPARISONS_EN],
  ja: [...COMPARISONS_JA, ...SIGN_COMPARISONS_JA],
  zh: [...COMPARISONS_ZH, ...SIGN_COMPARISONS_ZH],
  es: [...COMPARISONS_ES, ...SIGN_COMPARISONS_ES],
  ar: [...COMPARISONS_AR, ...SIGN_COMPARISONS_AR],
  fa: [...COMPARISONS_FA, ...SIGN_COMPARISONS_FA],
  de: [...COMPARISONS_DE, ...SIGN_COMPARISONS_DE],
  pt: [...COMPARISONS_PT, ...SIGN_COMPARISONS_PT],
  id: [...COMPARISONS_ID, ...SIGN_COMPARISONS_ID],
  nl: [...COMPARISONS_NL, ...SIGN_COMPARISONS_NL],
};

export const compareTool = (c: Comparison) => c.tool ?? "watermark";

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

/** Autres comparatifs de la même langue et du même outil, pour le maillage interne. */
export function relatedComparisons(lang: Lang, c: Comparison, count = 3): Comparison[] {
  const all = COMPARISONS[lang].filter((x) => compareTool(x) === compareTool(c));
  const start = all.findIndex((x) => x.slug === c.slug);
  return [...all.slice(start + 1), ...all.slice(0, start)].slice(0, count);
}
