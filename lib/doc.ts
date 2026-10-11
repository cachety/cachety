// Vocabulaire partagé entre la page (CoreProduct) et les composants de liste,
// de résumé et d'aperçu. Rien de React ici : que des types et des prédicats.

import { outputName } from "@/lib/files";
import type { ErrorKey, Strings } from "@/lib/i18n";
import { masksKey, type PageMasks } from "@/lib/masks";
import type { WatermarkResult } from "@/lib/watermark";

export type Status = "pending" | "processing" | "ready" | "error";
export type Filter = "all" | "attention" | "ready";

export type Doc = {
  id: string;
  file: File;
  status: Status;
  result?: WatermarkResult;
  stampedWith?: string;
  error?: ErrorKey | "generic";
  progress?: [number, number];
  // Mot de passe du PDF, gardé en mémoire de composant seulement.
  // `tries` change à chaque soumission : c'est lui qui relance le
  // traitement, même si l'utilisateur ressaisit le même mot de passe.
  password?: string;
  tries?: number;
  // Réglage (stamp) et essai (tries) de l'échec : tant qu'ils n'ont pas changé,
  // la file ne retente pas ce document (un fichier corrompu ou trop gros
  // échouerait à l'identique à chaque déverrouillage d'un autre document).
  failedWith?: string;
  /** Zones à noircir avant le filigrane (caviardage), propres à ce document. */
  masks?: PageMasks;
};

export const docId = (f: File) => `${f.name}:${f.size}:${f.lastModified}`;

export const needsPassword = (d: Doc) =>
  d.error === "pdf_password" || d.error === "pdf_password_wrong";

/** Ce qui réclame une action de l'utilisateur : mot de passe ou échec. */
export const needsAttention = (d: Doc) => needsPassword(d) || !!d.error;

/**
 * Réglage effectif d'un document : réglage commun (texte, apparence, taille
 * cible) plus ses propres masques. Changer un masque ne refait que ce document.
 */
export const docStamp = (d: Doc, stamp: string) => {
  const masks = masksKey(d.masks);
  return masks ? `${stamp}\0${masks}` : stamp;
};

/** Prêt ET filigrané avec le réglage courant (texte, apparence ou masques modifiés : résultat périmé). */
export const isFresh = (d: Doc, stamp: string) =>
  d.status === "ready" && !!d.result && d.stampedWith === docStamp(d, stamp);

/**
 * Déplace l'élément `from` à la position `to` (bornée à la liste). Même
 * tableau si rien ne bouge : setState ne re-rend alors pas.
 */
export function moveTo<T>(items: T[], from: number, to: number): T[];
export function moveTo<T>(items: readonly T[], from: number, to: number): readonly T[];
export function moveTo<T>(items: readonly T[], from: number, to: number): readonly T[] {
  if (from < 0 || from >= items.length || !Number.isInteger(to)) return items;
  const target = Math.min(items.length - 1, Math.max(0, to));
  if (target === from) return items;
  const next = items.slice();
  const [item] = next.splice(from, 1);
  next.splice(target, 0, item);
  return next;
}

/**
 * Glisser-déposer : une ligne lâchée dans l'interstice `slot` (0 = avant la
 * première, n = après la dernière) arrive à cet index. Les interstices qui
 * encadrent la ligne déplacée ne changent rien.
 */
export const slotToIndex = (from: number, slot: number) => (slot > from ? slot - 1 : slot);

export const outName = (doc: Doc, t: Strings, extension?: string) =>
  outputName(doc.file.name, extension ?? doc.result?.extension ?? "pdf", t.suffix);

export const size = (bytes: number, t: Strings) =>
  `${Math.max(0.1, bytes / 1024 / 1024).toFixed(1)} ${t.sizeUnit}`;

/** Clé de l'essai courant : un document en échec n'est retenté que si elle change. */
export const attemptKey = (d: Doc, stamp: string) => `${stamp}\0${d.tries ?? 0}`;
