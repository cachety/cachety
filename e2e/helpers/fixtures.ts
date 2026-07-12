// Fabrique de documents d'essai côté Node (pdf-lib est déjà une dépendance
// de l'application). Les octets transitent vers la page en base64.

import { PDFDocument, rgb } from "pdf-lib";

/** PDF blanc (fond vierge) avec les dimensions de page demandées. */
export async function makePdf(pageSizes: [number, number][]): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (const [w, h] of pageSizes) {
    const page = doc.addPage([w, h]);
    // Trait discret pour que la page ne soit pas strictement vide.
    page.drawRectangle({
      x: 4,
      y: 4,
      width: w - 8,
      height: h - 8,
      borderColor: rgb(0.2, 0.2, 0.25),
      borderWidth: 1,
    });
  }
  return doc.save();
}

/**
 * PDF valide dont une page porte /Rotate (90 par défaut). pdf-lib expose la
 * rotation via setRotation ; on l'utilise pour vérifier que le moteur aplatit
 * l'orientation correctement (cf. red team A5).
 */
export async function makeRotatedPdf(
  w: number,
  h: number,
  degrees = 90
): Promise<Uint8Array> {
  const { degrees: deg } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  const page = doc.addPage([w, h]);
  page.drawRectangle({
    x: 4,
    y: 4,
    width: w - 8,
    height: h - 8,
    borderColor: rgb(0.2, 0.2, 0.25),
    borderWidth: 1,
  });
  page.setRotation(deg(degrees));
  return doc.save();
}

export function toBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

export function fromBase64(b64: string): Uint8Array {
  return new Uint8Array(Buffer.from(b64, "base64"));
}
