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

/**
 * PDF d'une page (200×300) chiffré AES-256, mot de passe « e2e-secret ».
 * Figé en base64 : pdf-lib ne sait pas chiffrer, et exiger qpdf en CI serait
 * une dépendance de plus. Regénération si besoin :
 *   bun -e '<makePdf>' puis qpdf --encrypt e2e-secret e2e-secret 256 -- in out
 */
export const ENCRYPTED_PDF_PASSWORD = "e2e-secret";
export const ENCRYPTED_PDF_B64 =
  "JVBERi0xLjcKJb/3ov4KMSAwIG9iago8PCAvRXh0ZW5zaW9ucyA8PCAvQURCRSA8PCAvQmFzZVZlcnNpb24gLzEuNyAvRXh0" +
  "ZW5zaW9uTGV2ZWwgOCA+PiA+PiAvUGFnZXMgMyAwIFIgL1R5cGUgL0NhdGFsb2cgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5" +
  "cGUgL09ialN0bSAvTGVuZ3RoIDMwNCAvRmlsdGVyIC9GbGF0ZURlY29kZSAvTiAzIC9GaXJzdCAxNSA+PgpzdHJlYW0Kefjd" +
  "GwVpkHTXNTjsZ+3qKxWG8GkAIAisRy/NZ5p3J0uOazYTBmLpBSnn/O8WBnVjUKzH8TIl01Gh6iyUKfe8MDmxRizvQpgxAVmF" +
  "No8wJ3HmIWdbXMUbRl2o62eru2SsDcv+UHQ4kwZes1a450PV6vgKwzkPJTdLQj5tYzEZGqAYUbFJFtyQtUj1vZnO1lytbOc7" +
  "d2Qkwo5X/m2H7UHLa7ZA70uXHaDlHPXo744LvUciMAY9EfSuaQlz/QJuQR9JJVyoaE9ZczNVSLsfGIf+svW6jYt66ggdS30c" +
  "VLNNFCdCmoTzZnUmMqiKwKKAJe7Q1pNiwwpaEv/SPJ1NCy7ydDxcG7LQw0YdV2IKCypLqHUqBhbu6GI/peZ3aqs62ajg2y3L" +
  "AdlltT4NKcFJ8CXhA2VuZHN0cmVhbQplbmRvYmoKNiAwIG9iago8PCAvRmlsdGVyIC9GbGF0ZURlY29kZSAvTGVuZ3RoIDk2" +
  "ID4+CnN0cmVhbQr3zPkxWctaXucojeOXd0BPkIUScpYrgLePV0ppKBTIP8Ao79JfaOi6h+stGdRNFpKSy/HnyRW3mIJmVm74" +
  "6Sm2lQLKCz6o4eBnAihXnE+N8jacheS7/Cl/RBGjO/idHxhlbmRzdHJlYW0KZW5kb2JqCjcgMCBvYmoKPDwgL0NGIDw8IC9T" +
  "dGRDRiA8PCAvQXV0aEV2ZW50IC9Eb2NPcGVuIC9DRk0gL0FFU1YzIC9MZW5ndGggMzIgPj4gPj4gL0ZpbHRlciAvU3RhbmRh" +
  "cmQgL0xlbmd0aCAyNTYgL08gPDExMjIxOTEyZmMwODYwYmI4NDkwMzVmNTQ1YTk2MWRjNzg4MjM4ZjNjMGVhMTc2ZmRiMzc2" +
  "ZjNjNzZiMmZhOTliODlhZTNhOTgwMzEwN2U2NmViYTNmMjhiNDJjYmQ0Nj4gL09FIDwzMjZkNmY2YzE3MGI0ODNkNjA1ZDc4" +
  "NTNkNGZiY2MyNmQwZTc0ODdjNTlkNDdmNTA0YmJkZDBjY2E1Mjk4NDI5PiAvUCAtNCAvUGVybXMgPGI0ODlkMjM1NTFlY2Rm" +
  "ZTI1N2U5NzhkNDYxMzRhMjM1PiAvUiA2IC9TdG1GIC9TdGRDRiAvU3RyRiAvU3RkQ0YgL1UgPDEzYjY3OTQ3Y2Q3MTQ2YTdl" +
  "NjZkNDMxNDExODZiNzI5NWRmZTg5MjI1MDAwNTk5YWZkODgwY2I5YTZhZGFhNjNlOWU0OTMzZjBlZDY0YjRmYjM0NjdkM2Zk" +
  "Y2NmMmNkZT4gL1VFIDxjNDVlZTY5MDBjNDc1ZWZjYmM2NGE4MGRmYWJjMDJmZTIzMTFhMGRjOGUwMDg2YmUzMWM2YTZmYTlk" +
  "OTM3OGZhPiAvViA1ID4+CmVuZG9iago4IDAgb2JqCjw8IC9UeXBlIC9YUmVmIC9MZW5ndGggNDAgL0ZpbHRlciAvRmxhdGVE" +
  "ZWNvZGUgL0RlY29kZVBhcm1zIDw8IC9Db2x1bW5zIDQgL1ByZWRpY3RvciAxMiA+PiAvVyBbIDEgMiAxIF0gL0luZm8gNCAw" +
  "IFIgL1Jvb3QgMSAwIFIgL1NpemUgOSAvSUQgWzxkNjQ2MThlNzJhMmU2OTBmMTUxZjdiZjRhMDRmZDViNT48ZDY0NjE4ZTcy" +
  "YTJlNjkwZjE1MWY3YmY0YTA0ZmQ1YjU+XSAvRW5jcnlwdCA3IDAgUiA+PgpzdHJlYW0KeJxjYgACJkYGfgYmBoZiEKsBxGJg" +
  "hBD/mUT+AVnLgGJMygwAPx8D9wplbmRzdHJlYW0KZW5kb2JqCnN0YXJ0eHJlZgoxMjQ3CiUlRU9GCg==";

export function toBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

export function fromBase64(b64: string): Uint8Array {
  return new Uint8Array(Buffer.from(b64, "base64"));
}
