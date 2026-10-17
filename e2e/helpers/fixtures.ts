// Fabrique de documents d'essai côté Node (pdf-lib est déjà une dépendance
// de l'application). Les octets transitent vers la page en base64.

import {
  decodePDFRawStream,
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFHexString,
  PDFName,
  PDFRawStream,
  PDFString,
  rgb,
  StandardFonts,
} from "pdf-lib";

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

/** Marqueur à chercher dans la sortie : il ne doit y survivre nulle part. */
export const SECRET = "SECRET-7f3a9c-NE-DOIT-PAS-FUIR";

/**
 * PDF hostile : tout ce qui peut fuir ou s'exécuter d'un document d'origine
 * — couche texte (visible et invisible), métadonnées (Info + XMP), pièce
 * jointe, JavaScript déclenché à l'ouverture, lien sortant.
 */
export async function makeHostilePdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(SECRET);
  doc.setAuthor(SECRET);
  doc.setSubject(SECRET);
  doc.setKeywords([SECRET]);
  const page = doc.addPage([300, 400]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  page.drawText(SECRET, { x: 20, y: 300, size: 10, font });
  // Texte blanc sur blanc : invisible au rendu, présent dans la couche texte.
  page.drawText(`hidden ${SECRET}`, { x: 20, y: 200, size: 10, font, color: rgb(1, 1, 1) });
  await doc.attach(new TextEncoder().encode(SECRET), "secret.txt", { mimeType: "text/plain" });
  const ctx = doc.context;
  doc.catalog.set(
    PDFName.of("OpenAction"),
    ctx.obj({ Type: "Action", S: "JavaScript", JS: PDFString.of(`app.alert("${SECRET}")`) })
  );
  const link = ctx.register(
    ctx.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [0, 0, 300, 400],
      A: { S: "URI", URI: PDFString.of(`https://example.invalid/${SECRET}`) },
    })
  );
  page.node.set(PDFName.of("Annots"), ctx.obj([link]));
  const xmp = ctx.flateStream(`<x:xmpmeta xmlns:x="adobe:ns:meta/">${SECRET}</x:xmpmeta>`, {
    Type: "Metadata",
    Subtype: "XML",
  });
  doc.catalog.set(PDFName.of("Metadata"), ctx.register(xmp));
  return doc.save();
}

/**
 * Inventaire de ce qu'un PDF de sortie contient de sensible : marqueur dans
 * une chaîne ou un flux décodé (images exclues : ce sont des pixels), et
 * clés porteuses de code, de liens, de pièces jointes ou de polices.
 */
export async function scanPdfForLeaks(bytes: Uint8Array) {
  const doc = await PDFDocument.load(bytes);
  const keys = new Set<string>();
  let markerHits = 0;
  const DANGEROUS = ["JS", "JavaScript", "OpenAction", "AA", "URI", "Launch", "EmbeddedFile",
    "EmbeddedFiles", "AcroForm", "XFA", "FontFile", "FontFile2", "FontFile3", "Metadata"];
  const seen = new Set<unknown>();
  const visit = (o: unknown) => {
    if (seen.has(o)) return;
    seen.add(o);
    if (o instanceof PDFString || o instanceof PDFHexString || o instanceof PDFName) {
      if (o.decodeText().includes(SECRET)) markerHits++;
    } else if (o instanceof PDFArray) {
      o.asArray().forEach(visit);
    } else if (o instanceof PDFDict) {
      for (const [k, v] of o.entries()) {
        const name = k.decodeText();
        if (DANGEROUS.includes(name)) keys.add(name);
        if (name === "Type" && v instanceof PDFName && v.decodeText() === "Font") keys.add("Font");
        visit(v);
      }
    }
  };
  for (const [, obj] of doc.context.enumerateIndirectObjects()) {
    if (obj instanceof PDFRawStream) {
      visit(obj.dict);
      const subtype = obj.dict.get(PDFName.of("Subtype"));
      if (subtype instanceof PDFName && subtype.decodeText() === "Image") continue;
      const text = new TextDecoder("latin1").decode(decodePDFRawStream(obj).decode());
      if (text.includes(SECRET)) markerHits++;
    } else {
      visit(obj);
    }
  }
  const info = doc.context.trailerInfo.Info;
  if (info) visit(doc.context.lookup(info));
  return { markerHits, keys: [...keys].sort() };
}

/**
 * Insère un segment APP1 « Exif » portant SECRET juste après le SOI d'un
 * JPEG valide : c'est là que vivent coordonnées GPS, modèle d'appareil, etc.
 */
export function withExif(jpeg: Uint8Array): Uint8Array {
  const payload = new TextEncoder().encode(`Exif\0\0GPS ${SECRET}`);
  const len = payload.length + 2;
  const segment = new Uint8Array([0xff, 0xe1, len >> 8, len & 0xff, ...payload]);
  const out = new Uint8Array(jpeg.length + segment.length);
  out.set(jpeg.subarray(0, 2));
  out.set(segment, 2);
  out.set(jpeg.subarray(2), 2 + segment.length);
  return out;
}

/**
 * HEIC 320 × 240 (moitié gauche bleue, moitié droite verte), encodé par
 * macOS (`sips -s format heic`) : vraie photo au format iPhone, 551 octets.
 */
export const HEIC_320x240_B64 =
  "AAAAJGZ0eXBoZWljAAAAAG1pZjFNaVBybWlhZk1pSEJoZWljAAABhG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAHBpY3QAAAAA" +
  "AAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAADnBpdG0AAAAAAAEAAAAjaWluZgAAAAAA" +
  "AQAAABVpbmZlAgAAAAABAABodmMxAAAAAORpcHJwAAAAw2lwY28AAAATY29scm5jbHgAAgACAAaAAAAADGNsbGkAywBAAAAA" +
  "FGlzcGUAAAAAAAABQAAAAPAAAAAJaXJvdAAAAAAQcGl4aQAAAAADCAgIAAAAb2h2Y0MBA3AAAACwAAAAAAA88AD8/fj4AAAL" +
  "A6AAAQAXQAEMAf//A3AAAAMAsAAAAwAAAwA8cCShAAEAIUIBAQNwAAADALAAAAMAAAMAPKAKCA8WIe5FlU3AgIGAIKIAAQAJ" +
  "RAHAY8shEU2QAAAAGWlwbWEAAAAAAAAAAQABBoECAwWGhAAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAG4AAAAbwAAAAFtZGF0" +
  "AAAAAAAAAH8AAABrKAGviDQlkkDjDfeF9P/8pteR7GCP8ySI2Fv2hWnGL+Uan/5qrX9gTgb3aXQuPms72WXp0yCkjVADUnFR" +
  "dxI3LALaAcvxRVYaAAO6A7dd0zOABJQFSADFZgELAAAF8AAmIAAAAwAAbFIAGJA=";

/** PNG de bruit aléatoire : le pire cas pour la compression (taille cible). */
export function makeNoisePng(width: number, height: number): Uint8Array {
  const { deflateSync } = require("node:zlib") as typeof import("node:zlib");
  const raw = new Uint8Array((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) {
    const row = y * (width * 3 + 1);
    raw[row] = 0; // filtre « None »
    crypto.getRandomValues(raw.subarray(row + 1, row + 1 + width * 3));
  }
  const chunk = (type: string, data: Uint8Array) => {
    const body = new Uint8Array([...new TextEncoder().encode(type), ...data]);
    const out = new Uint8Array(12 + data.length);
    const view = new DataView(out.buffer);
    view.setUint32(0, data.length);
    out.set(body, 4);
    view.setUint32(8 + data.length, Bun.hash.crc32(body));
    return out;
  };
  const ihdr = new Uint8Array(13);
  new DataView(ihdr.buffer).setUint32(0, width);
  new DataView(ihdr.buffer).setUint32(4, height);
  ihdr.set([8, 2, 0, 0, 0], 8); // 8 bits, RVB
  const parts = [
    Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", new Uint8Array(deflateSync(raw))),
    chunk("IEND", new Uint8Array(0)),
  ];
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) out.set(p, (o += p.length) - p.length);
  return out;
}

/** PDF d'une page A4 entièrement occupée par une image de bruit. */
export async function makeNoisePdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const image = await doc.embedPng(makeNoisePng(900, 1270));
  const page = doc.addPage([595, 842]);
  page.drawImage(image, { x: 0, y: 0, width: 595, height: 842 });
  return doc.save();
}

/**
 * Document à signer : `pages` pages A4 blanches portant du texte (couche
 * texte) et des métadonnées marquées SECRET, pour vérifier que la copie
 * signée n'en garde rien.
 */
export async function makeSignablePdf(pages: number): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setAuthor(SECRET);
  doc.setTitle(SECRET);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < pages; i++) {
    const page = doc.addPage([595, 842]);
    page.drawText(`Contrat — page ${i + 1} — ${SECRET}`, { x: 50, y: 790, size: 11, font, color: rgb(0.1, 0.1, 0.1) });
  }
  return doc.save();
}

/** Octets JPEG de l'image qui couvre la page `index` d'une sortie Cachety (une image par page). */
export async function pageJpeg(bytes: Uint8Array, index: number): Promise<Uint8Array> {
  const doc = await PDFDocument.load(bytes);
  const page = doc.getPage(index);
  const resources = page.node.Resources();
  const xobjects = resources?.lookup(PDFName.of("XObject"), PDFDict);
  for (const [, ref] of xobjects?.entries() ?? []) {
    const stream = doc.context.lookup(ref);
    if (stream instanceof PDFRawStream) return stream.contents;
  }
  throw new Error(`page ${index} : aucune image`);
}

/** PDF d'une page entièrement bleue (#2040c0) : repère pour vérifier un masque. */
export async function makeBluePdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([400, 400]);
  page.drawRectangle({ x: 0, y: 0, width: 400, height: 400, color: rgb(0.125, 0.25, 0.75) });
  return doc.save();
}

/**
 * Bulletin de paie réaliste (A4) : en-tête, tableau à lignes alternées,
 * montants, IBAN, mentions en petit corps. `seed` fait varier les montants
 * et la mise en page : plusieurs « bulletins » d'une même personne, pour
 * l'attaque par estimation multi-copies.
 */
export async function makePayslipPdf(seed = 1): Promise<Uint8Array> {
  let state = seed * 9301 + 49297;
  const rand = () => ((state = (state * 9301 + 49297) % 233280) / 233280);
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.07, 0.07, 0.08);
  page.drawText("BULLETIN DE PAIE", { x: 40, y: 790, size: 17, font: bold, color: ink });
  page.drawText(`Période : ${String(1 + Math.floor(rand() * 12)).padStart(2, "0")}/2026`, { x: 40, y: 770, size: 9, font, color: ink });
  page.drawRectangle({ x: 340, y: 740, width: 215, height: 70, borderColor: ink, borderWidth: 1 });
  ["SARL Exemple Conseil", "12 rue des Lilas, 75011 Paris", "SIRET 812 345 678 00021"].forEach((l, i) =>
    page.drawText(l, { x: 350, y: 790 - i * 15, size: 8.5, font, color: ink })
  );
  page.drawRectangle({ x: 40, y: 680, width: 515, height: 45, color: rgb(0.93, 0.95, 0.97) });
  page.drawText("Salarié : Camille DURAND — Consultante", { x: 50, y: 705, size: 10, font: bold, color: ink });
  page.drawText("N° SS : 2 89 07 75 112 233 44", { x: 50, y: 690, size: 8.5, font, color: ink });
  const top = 650 - Math.floor(rand() * 20);
  page.drawRectangle({ x: 40, y: top, width: 515, height: 20, color: rgb(0.1, 0.12, 0.2) });
  ["Rubrique", "Base", "Taux", "Montant"].forEach((h, i) =>
    page.drawText(h, { x: [48, 280, 360, 430][i], y: top + 6, size: 9, font: bold, color: rgb(1, 1, 1) })
  );
  for (let i = 0; i < 20; i++) {
    const y = top - 22 - i * 22;
    if (i % 2) page.drawRectangle({ x: 40, y: y - 5, width: 515, height: 20, color: rgb(0.965, 0.97, 0.975) });
    page.drawText(`Rubrique de paie n° ${i + 1}`, { x: 48, y, size: 8.5, font, color: ink });
    page.drawText((80 + rand() * 4000).toFixed(2), { x: 280, y, size: 8.5, font, color: ink });
    page.drawText(`${(rand() * 12).toFixed(3)} %`, { x: 360, y, size: 8.5, font, color: ink });
    page.drawText(`${(5 + rand() * 3600).toFixed(2)} €`, { x: 430, y, size: 8.5, font, color: ink });
  }
  page.drawText(`NET PAYÉ : ${(1800 + rand() * 2000).toFixed(2)} €`, { x: 330, y: 150, size: 13, font: bold, color: ink });
  page.drawText("IBAN FR76 3000 4000 0312 3456 7890 143", { x: 40, y: 120, size: 8.5, font, color: ink });
  for (let i = 0; i < 4; i++)
    page.drawText("Conservez ce bulletin de paie sans limitation de durée. ".repeat(2), { x: 40, y: 80 - i * 11, size: 6.5, font, color: rgb(0.35, 0.35, 0.37) });
  return doc.save();
}

export function toBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

export function fromBase64(b64: string): Uint8Array {
  return new Uint8Array(Buffer.from(b64, "base64"));
}
