// Guides pratiques (pages de contenu pour le référencement) : un fichier de
// données par langue, rendu statiquement par app/[lang]/guides/[slug].
// Texte brut uniquement : React échappe tout, aucun HTML n'est interprété.

import type { Lang } from "@/lib/site-meta";

/**
 * Sujet commun à plusieurs langues : deux guides de même sujet sont liés
 * par hreflang (ce sont des équivalents locaux, pas des traductions mot à mot).
 */
export type GuideTopic =
  | "rental"
  | "id-card"
  | "passport"
  | "tax-payslip"
  | "bank-statement"
  | "drivers-license"
  | "my-number"
  | "online-verification"
  | "job-application"
  | "redact"
  | "phone"
  | "identity-theft"
  | "password"
  /** Signer un bail ou un document de location (outil Signer). */
  | "sign"
  /** Signer un PDF sur téléphone (outil Signer). */
  | "sign-phone";

/** Outil vers lequel pointe le bouton d'appel du guide. */
export type GuideTool = "watermark" | "sign";

export type GuideBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  /** Liste numérotée : marche à suivre. */
  | { type: "steps"; items: string[] }
  /** Liste à puces. */
  | { type: "list"; items: string[] }
  /** Encadré conseil. */
  | { type: "tip"; text: string }
  /** Encadré mise en garde. */
  | { type: "warning"; text: string };

export type Guide = {
  /** Segment d'URL : ASCII, minuscules, tirets (ex. "watermark-passport-copy"). */
  slug: string;
  topic: GuideTopic;
  /**
   * Outil que le guide explique : le bouton d'appel mène à /<lang> pour
   * « watermark » (défaut, si absent) et à /<lang>/sign pour « sign ».
   */
  tool?: GuideTool;
  /** Titre affiché (h1). */
  title: string;
  /** <title> : 60 caractères au plus (marque ajoutée automatiquement). */
  metaTitle: string;
  /** Meta description : 155 caractères au plus. */
  description: string;
  /** Chapeau sous le titre : 1 à 3 phrases. */
  intro: string;
  /** Filigrane conseillé pour ce cas, affiché en exemple sur la page. */
  example: string;
  body: GuideBlock[];
  faq: { q: string; a: string }[];
  /** Date de dernière mise à jour, ISO (AAAA-MM-JJ). */
  updated: string;
};

export type GuideSet = { lang: Lang; guides: Guide[] };
