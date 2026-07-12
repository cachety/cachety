// Vocabulaire partagé entre la page (CoreProduct) et les composants de liste,
// de résumé et d'aperçu. Rien de React ici : que des types et des prédicats.

import { outputName } from "@/lib/files";
import type { ErrorKey, Strings } from "@/lib/i18n";
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
};

export const docId = (f: File) => `${f.name}:${f.size}:${f.lastModified}`;

export const needsPassword = (d: Doc) =>
  d.error === "pdf_password" || d.error === "pdf_password_wrong";

/** Ce qui réclame une action de l'utilisateur : mot de passe ou échec. */
export const needsAttention = (d: Doc) => needsPassword(d) || !!d.error;

/** Prêt ET filigrané avec le texte courant (un texte modifié périme le résultat). */
export const isFresh = (d: Doc, active: string) =>
  d.status === "ready" && !!d.result && d.stampedWith === active;

export const outName = (doc: Doc, t: Strings) =>
  outputName(doc.file.name, doc.result?.extension ?? "pdf", t.suffix);

export const size = (bytes: number, t: Strings) =>
  `${Math.max(0.1, bytes / 1024 / 1024).toFixed(1)} ${t.sizeUnit}`;
