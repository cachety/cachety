// Vocabulaire partagé entre la page (CoreProduct) et les composants de liste,
// de résumé et d'aperçu. Rien de React ici : que des types et des prédicats.

import { outputName } from "@/lib/files";
import type { ErrorKey, Strings } from "@/lib/i18n";
import { masksKey, type PageMasks } from "@/lib/masks";
import { clampToPage, overlaysKey, type OverlayRect, type PageOverlays } from "@/lib/overlays";
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
  /**
   * Mode « signer » : placement de la signature, propre à ce document.
   * Absent : jamais placée (la file la pose à sa place par défaut). Présent
   * mais sans signature : retirée par l'utilisateur, à replacer.
   */
  overlays?: PageOverlays;
};

export const docId = (f: File) => `${f.name}:${f.size}:${f.lastModified}`;

export const needsPassword = (d: Doc) =>
  d.error === "pdf_password" || d.error === "pdf_password_wrong";

/** Page (index 0) qui porte la signature, ou null. */
export function signaturePage(overlays: PageOverlays | undefined): number | null {
  for (const [page, list] of Object.entries(overlays ?? {})) {
    if (list?.some((o) => o.image === "signature")) return Number(page);
  }
  return null;
}

/** Mode « signer » : signature retirée de ce document, à replacer avant le téléchargement. */
export const needsPlacement = (d: Doc) => d.overlays !== undefined && signaturePage(d.overlays) === null;

/**
 * Mode « signer » : la signature est posée quelque part sur ce document.
 * Condition du téléchargement : ni « jamais placée » (la file ne l'a pas
 * encore posée), ni « retirée ».
 */
export const isPlaced = (d: Doc) => signaturePage(d.overlays) !== null;

/** Ce qui réclame une action de l'utilisateur : mot de passe, échec, ou (mode « signer ») signature à placer. */
export const needsAttention = (d: Doc, sign = false) =>
  needsPassword(d) || !!d.error || (sign && needsPlacement(d));

/** Une seule signature par document (v1) : la pose sur `page`, la retire des autres. */
export function placeSignature(overlays: PageOverlays | undefined, page: number, rect: OverlayRect | null): PageOverlays {
  const next: PageOverlays = {};
  for (const [p, list] of Object.entries(overlays ?? {})) {
    const kept = list.filter((o) => o.image !== "signature");
    if (kept.length) next[Number(p)] = kept;
  }
  if (rect) next[page] = [...(next[page] ?? []), { rect: clampToPage(rect), image: "signature" }];
  return next;
}

/**
 * Nouvelle signature, autre rapport largeur / hauteur : les placements gardent
 * leur largeur et leur bord bas (la ligne où l'on signe), la hauteur suit
 * l'image. Rapports en largeur / hauteur de l'image ; même objet si rien ne change.
 */
export function refitOverlays(overlays: PageOverlays | undefined, oldAspect: number, newAspect: number) {
  if (!overlays || !(oldAspect > 0) || !(newAspect > 0) || Math.abs(oldAspect - newAspect) < 1e-9) return overlays;
  const next: PageOverlays = {};
  for (const [p, list] of Object.entries(overlays)) {
    next[Number(p)] = list.map(({ rect, image }) => {
      const h = (rect.h * oldAspect) / newAspect;
      return { image, rect: clampToPage({ x: rect.x, y: rect.y + rect.h - h, w: rect.w, h }) };
    });
  }
  return next;
}

/**
 * Réglage effectif d'un document : réglage commun (texte, apparence, taille
 * cible) plus ses propres masques et signatures. Changer un masque ou
 * déplacer la signature ne refait que ce document.
 *
 * Mode « signer » : « retirée » (`{}`) et « jamais placée » (`undefined`)
 * donnent deux clés différentes. Sinon, un rendu sans signature (après ×)
 * passerait pour à jour une fois la signature remise à sa place par défaut,
 * et un PDF non signé serait téléchargeable.
 */
export const docStamp = (d: Doc, stamp: string) => {
  const masks = masksKey(d.masks);
  const own = masks ? `${stamp}\0${masks}` : stamp;
  return d.overlays === undefined ? own : `${own}\0sig:${overlaysKey(d.overlays)}`;
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

/** `suffix` : « signed » en mode « signer » (t.sign.suffix), sinon celui du filigrane. */
export const outName = (doc: Doc, t: Strings, extension?: string, suffix = t.suffix) =>
  outputName(doc.file.name, extension ?? doc.result?.extension ?? "pdf", suffix);

export const size = (bytes: number, t: Strings) =>
  `${Math.max(0.1, bytes / 1024 / 1024).toFixed(1)} ${t.sizeUnit}`;

/** Clé de l'essai courant : un document en échec n'est retenté que si elle change. */
export const attemptKey = (d: Doc, stamp: string) => `${stamp}\0${d.tries ?? 0}`;
