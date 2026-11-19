// Accès aux guides par langue et liens hreflang entre équivalents locaux.

import type { Lang } from "@/lib/site-meta";
import { LANG_CODES } from "@/lib/site-meta";
import type { Guide, GuideTopic } from "./types";
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
import { DOSSIER_GUIDES_EN } from "./dossier/en";
import { DOSSIER_GUIDES_FR } from "./dossier/fr";
import { DOSSIER_GUIDES_JA } from "./dossier/ja";
import { DOSSIER_GUIDES_ZH } from "./dossier/zh";
import { DOSSIER_GUIDES_ES } from "./dossier/es";
import { DOSSIER_GUIDES_AR } from "./dossier/ar";
import { DOSSIER_GUIDES_FA } from "./dossier/fa";
import { DOSSIER_GUIDES_DE } from "./dossier/de";
import { DOSSIER_GUIDES_PT } from "./dossier/pt";
import { DOSSIER_GUIDES_ID } from "./dossier/id";
import { DOSSIER_GUIDES_NL } from "./dossier/nl";
import { HIDE_GUIDES_EN } from "./hide/en";
import { HIDE_GUIDES_FR } from "./hide/fr";
import { HIDE_GUIDES_JA } from "./hide/ja";
import { HIDE_GUIDES_ZH } from "./hide/zh";
import { HIDE_GUIDES_ES } from "./hide/es";
import { HIDE_GUIDES_AR } from "./hide/ar";
import { HIDE_GUIDES_FA } from "./hide/fa";
import { HIDE_GUIDES_DE } from "./hide/de";
import { HIDE_GUIDES_PT } from "./hide/pt";
import { HIDE_GUIDES_ID } from "./hide/id";
import { HIDE_GUIDES_NL } from "./hide/nl";

export type { Guide, GuideBlock, GuideTool, GuideTopic } from "./types";

/** Guides généraux d'abord, puis ceux des zones suggérées (lib/guides/hide/*) et de l'outil Dossier (lib/guides/dossier/*). */
export const GUIDES: Record<Lang, Guide[]> = {
  fr: [...GUIDES_FR, ...HIDE_GUIDES_FR, ...DOSSIER_GUIDES_FR],
  en: [...GUIDES_EN, ...HIDE_GUIDES_EN, ...DOSSIER_GUIDES_EN],
  ja: [...GUIDES_JA, ...HIDE_GUIDES_JA, ...DOSSIER_GUIDES_JA],
  zh: [...GUIDES_ZH, ...HIDE_GUIDES_ZH, ...DOSSIER_GUIDES_ZH],
  es: [...GUIDES_ES, ...HIDE_GUIDES_ES, ...DOSSIER_GUIDES_ES],
  ar: [...GUIDES_AR, ...HIDE_GUIDES_AR, ...DOSSIER_GUIDES_AR],
  fa: [...GUIDES_FA, ...HIDE_GUIDES_FA, ...DOSSIER_GUIDES_FA],
  de: [...GUIDES_DE, ...HIDE_GUIDES_DE, ...DOSSIER_GUIDES_DE],
  pt: [...GUIDES_PT, ...HIDE_GUIDES_PT, ...DOSSIER_GUIDES_PT],
  id: [...GUIDES_ID, ...HIDE_GUIDES_ID, ...DOSSIER_GUIDES_ID],
  nl: [...GUIDES_NL, ...HIDE_GUIDES_NL, ...DOSSIER_GUIDES_NL],
};

export const guidePath = (lang: Lang, slug: string) => `/${lang}/guides/${slug}`;
export const guidesIndexPath = (lang: Lang) => `/${lang}/guides`;

/** Page de l'outil expliqué par le guide (cible du bouton d'appel). */
export const guideToolPath = (lang: Lang, guide: Guide) =>
  guide.tool === "sign" ? `/${lang}/sign` : guide.tool === "dossier" ? `/${lang}/dossier` : `/${lang}`;

export function findGuide(lang: Lang, slug: string): Guide | undefined {
  return GUIDES[lang].find((g) => g.slug === slug);
}

/** Sujets traités avec l'outil Signer : leurs guides doivent y mener. */
export const SIGN_TOPICS: readonly GuideTopic[] = ["sign", "sign-phone"];

/** Sujets autour des zones suggérées (« Masquer quelque chose ») : un guide par langue. */
export const HIDE_TOPICS: readonly GuideTopic[] = ["auto-redact", "iban", "bank-card"];

/** Sujets traités avec l'outil Dossier : leurs guides doivent y mener. */
export const DOSSIER_TOPICS: readonly GuideTopic[] = ["dossier", "size", "merge", "photo-to-pdf", "pdf-pages", "metadata"];

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
