// Ce qui distingue les trois modes de l'outil (filigrane, signer, dossier)
// sans se lire dans le code : libellés des étapes, textes d'attente, réglages
// par défaut. CoreProduct le consulte au lieu d'ajouter un troisième bras à
// chaque condition (docs/prd-dossier.md §4.5, §6.5).

import type { Strings } from "@/lib/i18n";

export type Mode = "watermark" | "sign" | "dossier";

export type ModeConfig = {
  /** Étapes et champ de dépôt. */
  labels: { step1: string; step2: string; step3: string; stepShort: string[]; inputAria: string };
  /** Boutons du bas d'écran, sur téléphone : vers l'étape 2, puis vers l'étape 3. */
  next: [string, string];
  /**
   * Le filigrane n'est qu'une option à cocher (usage et un seul destinataire),
   * décochée par défaut : modes signer et dossier. Sinon, il est l'objet de l'outil.
   */
  optionalWatermark: boolean;
  /** Sans document, l'aperçu montre une simple invite (pas la carte « spécimen » filigranée). */
  plainEmpty: boolean;
  /** Empreinte SHA-256 de chaque fichier produit, après le téléchargement. */
  fingerprint: boolean;
  processingDoc: (name: string, progress?: [number, number]) => string;
  srProcessing: string;
  /** Textes de la visite guidée ; absents : ceux du filigrane. */
  tour?: Strings["tour"];
  /** Bouton « recommencer » du panneau de fin ; absent : celui du filigrane. */
  another?: string;
};

export function modeConfig(mode: Mode, t: Strings): ModeConfig {
  if (mode === "sign") {
    const s = t.sign;
    return {
      labels: s,
      next: [s.next.signature, s.next.place],
      optionalWatermark: true,
      plainEmpty: true,
      fingerprint: true,
      processingDoc: s.processingDoc,
      srProcessing: s.srProcessing,
      tour: s.tour,
      another: s.another,
    };
  }
  if (mode === "dossier") {
    const d = t.dossier;
    return {
      labels: d,
      next: [d.next.pages, d.next.check],
      optionalWatermark: true,
      plainEmpty: true,
      fingerprint: true,
      processingDoc: d.processingDoc,
      srProcessing: d.srProcessing,
      // Mêmes boutons que la visite du filigrane, étapes propres au dossier.
      tour: { ...t.tour, steps: d.tour },
      another: d.another,
    };
  }
  return {
    labels: t,
    next: [t.next.details, t.next.preview],
    optionalWatermark: false,
    plainEmpty: false,
    fingerprint: false,
    processingDoc: t.processingDoc,
    srProcessing: t.srProcessing,
  };
}
