// Protège le fichier téléchargé, pas l'aperçu. AES-256 / PDF 2.0 (révision 6) :
// c'est le chiffrement symétrique encore solide face à un ordinateur quantique
// (Grover le ramène à 128 bits, le seuil retenu), et celui que les lecteurs
// récents savent ouvrir. Un schéma post-quantique à clé publique ne s'ouvre
// dans aucun lecteur PDF.

import { PDFDocument } from "pdf-lib";
import { imageToPdf, newPdf } from "@/lib/files";

const PDF_PASSWORD_MAX_BYTES = 127;

/** 32 octets aléatoires, soit 256 bits, encodés pour tenir dans la limite PDF (127 octets). */
export function generateFilePassword() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

export function passwordUtf8Length(password: string) {
  return new TextEncoder().encode(password).length;
}

/** Estimation basse : classes de caractères réellement présentes. */
export function passwordEntropyBits(password: string) {
  if (!password) return 0;
  let alphabet = 0;
  if (/[a-z]/.test(password)) alphabet += 26;
  if (/[A-Z]/.test(password)) alphabet += 26;
  if (/[0-9]/.test(password)) alphabet += 10;
  if (/[^A-Za-z0-9]/.test(password)) alphabet += 32;
  return Math.floor(password.length * Math.log2(Math.max(1, alphabet)));
}

export const passwordIsShort = (password: string) =>
  password.length > 0 && (password.length < 12 || passwordEntropyBits(password) < 80);

export const passwordIsStrong = (password: string) => passwordEntropyBits(password) >= 200;

/** Le standard PDF ignore au-delà de 127 octets UTF-8. On coupe sur une frontière de caractère. */
export function clampPassword(password: string) {
  const bytes = new TextEncoder().encode(password);
  if (bytes.length <= PDF_PASSWORD_MAX_BYTES) return password;
  let end = PDF_PASSWORD_MAX_BYTES;
  while (end > 0 && (bytes[end] & 0xc0) === 0x80) end--;
  return new TextDecoder().decode(bytes.subarray(0, end));
}

export async function encryptPdf(bytes: Uint8Array, password: string) {
  const pdfLib = await import("pdf-lib");
  const { configure, lock } = await import("pdf-lib-encrypt");
  configure(pdfLib);
  // Jamais RC4 : la bibliothèque ne bascule pas toute seule, et on ne le demande pas.
  // NFKC : la norme (SASLprep) le demande et Acrobat l'applique à la saisie ; la
  // bibliothèque l'omet. Sans cela, « é » tapé décomposé (fréquent sur macOS)
  // produirait un fichier que son propre auteur ne peut plus ouvrir.
  return lock(bytes, password.normalize("NFKC"));
}

/** Réunit des PDF et des images filigranés en un seul PDF, dans l'ordre donné. */
export async function combineAsPdf(
  parts: { bytes: Uint8Array; extension: "pdf" | "png" | "jpg" }[]
): Promise<Uint8Array> {
  const out = await newPdf();
  for (const part of parts) {
    const srcBytes = part.extension === "pdf" ? part.bytes : await imageToPdf(part.bytes, part.extension);
    const src = await PDFDocument.load(srcBytes);
    const copied = await out.copyPages(src, src.getPageIndices());
    for (const page of copied) out.addPage(page);
  }
  return out.save();
}

/** Sans mot de passe, le fichier part tel quel. Une image protégée devient un PDF chiffré. */
export async function protectFile(
  blob: Blob,
  extension: "pdf" | "png" | "jpg",
  password: string
): Promise<{ bytes: Uint8Array; extension: "pdf" | "png" | "jpg" }> {
  const raw = new Uint8Array(await blob.arrayBuffer());
  if (!password) return { bytes: raw, extension };
  const pdf = extension === "pdf" ? raw : await imageToPdf(raw, extension);
  return { bytes: await encryptPdf(pdf, password), extension: "pdf" };
}
