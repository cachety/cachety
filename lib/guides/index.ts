// Accès aux guides par langue et liens hreflang entre équivalents locaux.

import type { Lang } from "@/lib/site-meta";
import { LANG_CODES } from "@/lib/site-meta";
import type { Guide } from "./types";
import { GUIDES_EN } from "./en";
import { GUIDES_FR } from "./fr";
import { GUIDES_JA } from "./ja";
import { GUIDES_ZH } from "./zh";
import { GUIDES_ES } from "./es";
import { GUIDES_AR } from "./ar";
import { GUIDES_FA } from "./fa";
import { GUIDES_DE } from "./de";
import { GUIDES_PT } from "./pt";
import { GUIDES_ID } from "./id";
import { GUIDES_NL } from "./nl";

export type { Guide, GuideBlock, GuideTopic } from "./types";

export const GUIDES: Record<Lang, Guide[]> = {
  fr: GUIDES_FR,
  en: GUIDES_EN,
  ja: GUIDES_JA,
  zh: GUIDES_ZH,
  es: GUIDES_ES,
  ar: GUIDES_AR,
  fa: GUIDES_FA,
  de: GUIDES_DE,
  pt: GUIDES_PT,
  id: GUIDES_ID,
  nl: GUIDES_NL,
};

export const guidePath = (lang: Lang, slug: string) => `/${lang}/guides/${slug}`;
export const guidesIndexPath = (lang: Lang) => `/${lang}/guides`;

export function findGuide(lang: Lang, slug: string): Guide | undefined {
  return GUIDES[lang].find((g) => g.slug === slug);
}

/** hreflang : le guide de même sujet dans chaque autre langue, s'il existe. */
export function guideAlternates(lang: Lang, guide: Guide): Record<string, string> {
  const out: Record<string, string> = { [lang]: guidePath(lang, guide.slug) };
  for (const other of LANG_CODES) {
    if (other === lang) continue;
    const twin = GUIDES[other].find((g) => g.topic === guide.topic);
    if (twin) out[other] = guidePath(other, twin.slug);
  }
  return out;
}

/** Autres guides de la même langue, pour le maillage interne. */
export function relatedGuides(lang: Lang, guide: Guide, count = 3): Guide[] {
  const list = GUIDES[lang].filter((g) => g.slug !== guide.slug);
  // Rotation stable à partir du guide courant : chaque page pointe vers des
  // voisins différents, tous les guides reçoivent des liens.
  const start = GUIDES[lang].findIndex((g) => g.slug === guide.slug);
  return [...list.slice(start), ...list.slice(0, start)].slice(0, count);
}
