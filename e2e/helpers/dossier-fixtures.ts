// Documents d'essai du mode « dossier » : pages repérables par leur couleur
// (ordre, rotation), pages « photo » et pages de texte (budget de taille).
// Fabriqués côté Node, comme ceux de fixtures.ts.

import { deflateSync } from "node:zlib";
import { PDFDocument, PDFName, PDFString, rgb, StandardFonts } from "pdf-lib";
import { makePayslipPdf, SECRET } from "./fixtures";

export type Rgb = [number, number, number];

/** PNG RVB 8 bits à partir de pixels bruts (largeur × hauteur × 3 octets). */
export function encodePng(width: number, height: number, pixels: Uint8Array): Uint8Array {
  const raw = new Uint8Array((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) {
    const row = y * (width * 3 + 1);
    raw[row] = 0; // filtre « None »
    raw.set(pixels.subarray(y * width * 3, (y + 1) * width * 3), row + 1);
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
  ihdr.set([8, 2, 0, 0, 0], 8);
  const parts = [
    Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", new Uint8Array(deflateSync(raw, { level: 1 }))),
    chunk("IEND", new Uint8Array(0)),
  ];
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) out.set(p, (o += p.length) - p.length);
  return out;
}

/** Générateur déterministe (mulberry32) : mêmes fixtures d'une exécution à l'autre. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Image qui se comprime comme une photo : fond en dégradés doux, formes
 * floues, quelques contours nets et un léger bruit de capteur. Ni un aplat
 * (trop facile) ni du bruit pur (impossible à comprimer).
 */
export function makePhotoPng(width: number, height: number, seed = 1): Uint8Array {
  const rand = rng(seed);
  const blobs = Array.from({ length: 14 }, () => ({
    x: rand() * width,
    y: rand() * height,
    r: (0.08 + rand() * 0.25) * Math.min(width, height),
    c: [rand() * 255, rand() * 255, rand() * 255] as Rgb,
  }));
  const stripes = Array.from({ length: 6 }, () => ({ y: rand() * height, h: 2 + rand() * 6, v: rand() * 80 }));
  const pixels = new Uint8Array(width * height * 3);
  for (let y = 0; y < height; y++) {
    const stripe = stripes.find((s) => y >= s.y && y < s.y + s.h);
    for (let x = 0; x < width; x++) {
      let r = 90 + (120 * x) / width;
      let g = 110 + (90 * y) / height;
      let b = 140 - (60 * x) / width;
      for (const blob of blobs) {
        const d = Math.hypot(x - blob.x, y - blob.y) / blob.r;
        if (d >= 1) continue;
        const w = (1 - d) * (1 - d);
        r += (blob.c[0] - r) * w;
        g += (blob.c[1] - g) * w;
        b += (blob.c[2] - b) * w;
      }
      if (stripe) {
        r = stripe.v;
        g = stripe.v;
        b = stripe.v;
      }
      const noise = (rand() - 0.5) * 14;
      const i = (y * width + x) * 3;
      pixels[i] = Math.max(0, Math.min(255, r + noise));
      pixels[i + 1] = Math.max(0, Math.min(255, g + noise));
      pixels[i + 2] = Math.max(0, Math.min(255, b + noise));
    }
  }
  return encodePng(width, height, pixels);
}

/** PNG d'une seule couleur, avec un pavé d'une autre couleur en haut à gauche si demandé. */
export function makeFlatPng(width: number, height: number, colour: Rgb, corner?: Rgb): Uint8Array {
  const pixels = new Uint8Array(width * height * 3);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const c = corner && x < width / 4 && y < height / 4 ? corner : colour;
      pixels.set(c, (y * width + x) * 3);
    }
  return encodePng(width, height, pixels);
}

const A4: [number, number] = [595, 842];

/**
 * Une page par couleur (aplat sur toute la page), en portrait 300 × 400 par
 * défaut : l'ordre des pages d'une sortie se lit à leur couleur. Chaque page
 * porte aussi du texte et des métadonnées marqués SECRET.
 */
export async function makeColourPdf(colours: Rgb[], size: [number, number] = [300, 400]): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(SECRET);
  doc.setAuthor(SECRET);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (const [r, g, b] of colours) {
    const page = doc.addPage(size);
    page.drawRectangle({ x: 0, y: 0, width: size[0], height: size[1], color: rgb(r / 255, g / 255, b / 255) });
    page.drawText(SECRET, { x: 20, y: 20, size: 8, font, color: rgb(r / 255, g / 255, b / 255) });
  }
  return doc.save();
}

/** Page blanche en portrait avec un pavé rouge dans le coin haut gauche (un quart de la largeur et de la hauteur). */
export async function makeCornerPdf(size: [number, number] = [300, 400]): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage(size);
  const [w, h] = size;
  page.drawRectangle({ x: 0, y: h - h / 4, width: w / 4, height: h / 4, color: rgb(1, 0, 0) });
  return doc.save();
}

/** `pages` pages A4 entièrement couvertes par une « photo » (trois images différentes, reprises tour à tour). */
export async function makePhotoPdf(pages: number, seed = 1): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const images = await Promise.all([0, 1, 2].map((i) => doc.embedPng(makePhotoPng(700, 990, seed + i))));
  for (let i = 0; i < pages; i++) {
    doc.addPage(A4).drawImage(images[i % images.length], { x: 0, y: 0, width: A4[0], height: A4[1] });
  }
  return doc.save();
}

/** `pages` bulletins de paie (texte vectoriel), tous différents. */
export async function makeTextPdf(pages: number, seed = 1): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) {
    const src = await PDFDocument.load(await makePayslipPdf(seed + i));
    const [page] = await doc.copyPages(src, [0]);
    doc.addPage(page);
  }
  return doc.save();
}

/** Dossier mixte de 10 pages : 5 pages photo (index pairs) et 5 pages de texte (index impairs). */
export async function makeMixedPdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const images = await Promise.all([0, 1, 2].map((i) => doc.embedPng(makePhotoPng(700, 990, 40 + i))));
  for (let i = 0; i < 5; i++) {
    doc.addPage(A4).drawImage(images[i % images.length], { x: 0, y: 0, width: A4[0], height: A4[1] });
    const src = await PDFDocument.load(await makePayslipPdf(20 + i));
    const [page] = await doc.copyPages(src, [0]);
    doc.addPage(page);
  }
  return doc.save();
}

/**
 * Document hostile de deux pages pour le mode « dossier » : texte, métadonnées,
 * pièce jointe, JavaScript, lien, comme makeHostilePdf, sur deux pages.
 */
export async function makeHostileTwoPages(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(SECRET);
  doc.setAuthor(SECRET);
  doc.setSubject(SECRET);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < 2; i++) {
    const page = doc.addPage([300, 400]);
    page.drawText(SECRET, { x: 20, y: 300, size: 10, font });
    page.drawText(`hidden ${SECRET}`, { x: 20, y: 200, size: 10, font, color: rgb(1, 1, 1) });
    const link = doc.context.register(
      doc.context.obj({
        Type: "Annot",
        Subtype: "Link",
        Rect: [0, 0, 300, 400],
        A: { S: "URI", URI: PDFString.of(`https://example.invalid/${SECRET}`) },
      })
    );
    page.node.set(PDFName.of("Annots"), doc.context.obj([link]));
  }
  await doc.attach(new TextEncoder().encode(SECRET), "secret.txt", { mimeType: "text/plain" });
  doc.catalog.set(
    PDFName.of("OpenAction"),
    doc.context.obj({ Type: "Action", S: "JavaScript", JS: PDFString.of(`app.alert("${SECRET}")`) })
  );
  return doc.save();
}
