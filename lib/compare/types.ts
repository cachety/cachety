// Pages comparatives (« Cachety ou X ? ») : un fichier de données par langue,
// rendu statiquement par app/[lang]/compare/[slug]. Texte brut uniquement.
//
// Règle éditoriale (publicité comparative, directive 2006/114/CE) : chaque
// affirmation sur un autre outil est objective, vérifiable et sourcée (champ
// `sources`, pages publiques de l'éditeur), datée (`checked`), et la page dit
// honnêtement quand l'autre outil est le meilleur choix (`chooseOther`).

import type { GuideBlock } from "@/lib/guides";

export type CompareRow = {
  /** Critère, ex. « Où le fichier est traité ». */
  criterion: string;
  cachety: string;
  other: string;
  /** Avantage sur ce critère, s'il y en a un net. Absent : égalité ou affaire de goût. */
  edge?: "cachety" | "other";
};

export type Comparison = {
  /** Segment d'URL : ASCII, minuscules, tirets (ex. "cachety-vs-ilovepdf"). */
  slug: string;
  /**
   * Identifiant stable de l'outil comparé, commun à toutes les langues : deux
   * pages de même `competitor` sont liées par hreflang (ex. "ilovepdf").
   */
  competitor: string;
  competitorName: string;
  /** Page d'accueil de l'outil comparé (lien nofollow). */
  competitorUrl: string;
  /** Titre affiché (h1). */
  title: string;
  /** <title> : 60 caractères au plus (marque ajoutée automatiquement). */
  metaTitle: string;
  /** Meta description : 155 caractères au plus. */
  description: string;
  /** Chapeau : 1 à 3 phrases. */
  intro: string;
  /** L'essentiel en 2 à 4 phrases, juste sous le chapeau. */
  verdict: string;
  table: CompareRow[];
  body: GuideBlock[];
  /** Quand l'autre outil est le meilleur choix (au moins un point, honnêtement). */
  chooseOther: string[];
  /** Quand Cachety est le meilleur choix. */
  chooseCachety: string[];
  faq: { q: string; a: string }[];
  /** Pages publiques consultées pour les affirmations sur l'autre outil. */
  sources: { label: string; url: string }[];
  /** Date de vérification des faits, ISO (AAAA-MM-JJ). */
  checked: string;
  /** Date de dernière mise à jour du texte, ISO. */
  updated: string;
};
