import { HEIC_TYPES } from "@/lib/heic";
import { zipSync } from "fflate";
import { PDFDocument } from "pdf-lib";

const DECODED_TYPES =
  "application/pdf,image/png,image/jpeg,image/webp,image/gif,image/bmp,image/avif";
// HEIC : types et extensions (iOS fournit parfois un type vide).
export const ACCEPT = `${DECODED_TYPES},${HEIC_TYPES.join(",")},.heic,.heif`;
const SUPPORTED = new Set([...DECODED_TYPES.split(","), ...HEIC_TYPES]);

// Un dépôt mixte (PDF + photos) laisse souvent le type vide ou octet-stream
// sur les images, alors que le PDF est bien typé. L'extension tranche alors.
const EXT_KIND: Record<string, "pdf" | "image"> = {
  pdf: "pdf",
  png: "image",
  jpg: "image",
  jpeg: "image",
  webp: "image",
  gif: "image",
  bmp: "image",
  avif: "image",
  heic: "image",
  heif: "image",
};

// Types historiques ou non standard encore émis par certains systèmes et
// navigateurs pour des formats que nous savons lire. Liste fermée : on ne
// se rabat pas sur l'extension pour un type explicitement différent (un
// SVG renommé en .png reste refusé).
const MIME_ALIASES: Record<string, "pdf" | "image"> = {
  "application/x-pdf": "pdf",
  "application/acrobat": "pdf",
  "image/jpg": "image",
  "image/pjpeg": "image",
  "image/x-png": "image",
  "image/x-ms-bmp": "image",
  "image/x-bmp": "image",
};

export function fileKind(file: { type: string; name: string }): "pdf" | "image" | "unsupported" {
  const type = file.type.toLowerCase().split(";")[0].trim();
  if (type === "application/pdf") return "pdf";
  if (MIME_ALIASES[type]) return MIME_ALIASES[type];
  if (type.startsWith("image/") && SUPPORTED.has(type)) return "image";
  if (type === "" || type === "application/octet-stream") {
    const base = file.name.split(/[/\\]/).pop() ?? "";
    // Pas de point (ou seulement en tête, « .pdf ») : pas d'extension. Sans
    // cette garde, un fichier nommé « pdf » passait pour un PDF.
    const dot = base.lastIndexOf(".");
    return dot > 0 ? (EXT_KIND[base.slice(dot + 1).toLowerCase()] ?? "unsupported") : "unsupported";
  }
  return "unsupported";
}

export const isSupported = (file: string | { type: string; name: string }) =>
  fileKind(typeof file === "string" ? { type: file, name: "" } : file) !== "unsupported";

const INVISIBLE = /[\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g;
export const hasVisibleText = (s: string) => s.replace(INVISIBLE, "").trim().length > 0;

export function outputName(fileName: string, extension: string, suffix: string) {
  const base = fileName.replace(/\.[^.]+$/, "");
  return `${base}-${suffix}.${extension}`;
}

export function uniqueName(name: string, used: Set<string>) {
  if (!used.has(name)) return used.add(name), name;
  const dot = name.lastIndexOf(".");
  const base = dot < 0 ? name : name.slice(0, dot);
  const ext = dot < 0 ? "" : name.slice(dot);
  let i = 2;
  while (used.has(`${base}-${i}${ext}`)) i++;
  const n = `${base}-${i}${ext}`;
  return used.add(n), n;
}

// Ne garde que le dernier segment du chemin : un nom hostile comme
// « ../evil.pdf » ne peut pas s'échapper du dossier à l'extraction
// (Zip-Slip). File.name est déjà un basename ; c'est une défense en
// profondeur au cas où un nom serait forgé en amont.
const basename = (name: string) => name.split(/[/\\]/).pop() || "document";

/**
 * Archive ZIP, à plat ou avec un dossier par destinataire. Le dossier est
 * lui aussi réduit à un seul segment : jamais de « ../ » dans un chemin.
 */
export function zipDocuments(files: { name: string; bytes: Uint8Array; folder?: string }[]): Uint8Array {
  const used = new Set<string>();
  const entries: Record<string, [Uint8Array, { level: 0 }]> = {};
  for (const f of files) {
    const folder = f.folder ? basename(f.folder).replace(/^\.+$/, "") : "";
    const path = folder ? `${folder}/${basename(f.name)}` : basename(f.name);
    entries[uniqueName(path, used)] = [f.bytes, { level: 0 }];
  }
  return zipSync(entries);
}

/**
 * PDF vide, sans les champs que pdf-lib ajoute par défaut (Producer, Creator,
 * dates de création et de modification). L'heure de création trahirait celle
 * de la signature ; aucun fichier produit ici n'en porte.
 */
export const newPdf = () => PDFDocument.create({ updateMetadata: false });

/**
 * Image (PNG ou JPEG déjà produite) en PDF d'une page, sans réencodage : la
 * page mesure en points ce que l'image mesure en pixels. Sert au PDF unique,
 * au verrouillage d'une image et au mode « signer » (sortie toujours PDF).
 */
export async function imageToPdf(bytes: Uint8Array, extension: "png" | "jpg") {
  const doc = await newPdf();
  const image = extension === "jpg" ? await doc.embedJpg(bytes) : await doc.embedPng(bytes);
  const page = doc.addPage([image.width, image.height]);
  page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  return doc.save();
}
