// Image de la signature (dessinée, tapée ou importée). Deux étages :
//
//  - traitement de pixels pur (fond retiré, encre recolorée, rognage),
//    testable sous Bun sans canvas : entrées de type ImageData (`Pixels`) ;
//  - passage au navigateur (décodage d'un fichier, rendu du nom tapé, PNG
//    final), via canvas / OffscreenCanvas.
//
// Rien n'est persisté : la signature n'existe qu'en mémoire, ni localStorage
// ni URL blob: (docs/prd-sign.md §4.4). Le PNG est décodé en ImageBitmap
// directement depuis ses octets.

import { fileKind } from "@/lib/files";
import { sha256Hex } from "@/lib/fingerprint";
import { decodeHeic, isHeic } from "@/lib/heic";
import { imageSize, tooManyPixels } from "@/lib/image-size";
import { fontFace } from "@/lib/watermark-style";

/** Sous-ensemble d'ImageData : suffisant pour les fonctions pures, constructible sous Bun. */
export type Pixels = { data: Uint8ClampedArray; width: number; height: number };

export type SignatureImage = {
  /** PNG transparent, rogné à l'encre. */
  png: Uint8Array;
  width: number;
  height: number;
};

export type InkBox = { x: number; y: number; w: number; h: number };

/** Largeur minimale du PNG : posé à 30 % d'une page A4 rendue à 2×, il reste net. */
export const SIGNATURE_MIN_WIDTH = 1200;
/** Au-delà, on réduit : une photo de 4000 px ne rend pas la signature plus nette. */
export const SIGNATURE_MAX_WIDTH = 2400;
/**
 * Plafond de hauteur : une encre haute et étroite (paraphe vertical, 50 × 400 px)
 * agrandie à SIGNATURE_MIN_WIDTH ferait près de 10 000 px de haut. Aucun côté
 * ne dépasse ce plafond, quitte à rester sous la largeur minimale.
 */
export const SIGNATURE_MAX_HEIGHT = 2400;
/** Marge autour de l'encre, en fraction du plus grand côté de la boîte. */
export const SIGNATURE_PAD = 0.06;
/** Alpha minimal d'un pixel compté comme de l'encre (ignore l'anticrénelage quasi invisible). */
export const INK_ALPHA_MIN = 16;
export const INK = { black: "#111111", blue: "#1b3a8a" } as const;
export type InkId = keyof typeof INK;

/** Curseur « retirer le fond » : luminance (0–255) au-dessus de laquelle un pixel disparaît. */
export const BACKGROUND_THRESHOLD = { min: 150, max: 240, step: 5, fallback: 200 } as const;
/**
 * Fondu sous le seuil : de `threshold − BACKGROUND_FEATHER` à `threshold`,
 * l'alpha décroît linéairement. Les bords du trait photographié restent
 * lissés au lieu de crénelés.
 */
export const BACKGROUND_FEATHER = 16;

/** Image importée : le plus grand côté est ramené à cette taille (aperçu du curseur fluide). */
export const UPLOAD_MAX_SIDE = 3000;
/** Un fichier de signature n'a aucune raison de peser plus. */
export const SIGNATURE_MAX_FILE_BYTES = 50 * 1024 * 1024;

/** Police du nom tapé : le serif du site, en italique (décision PRD 2b, pas de police nouvelle). */
export const TYPED_FONT_FAMILY = fontFace("serif").family;
const TYPED_FONT_PX = 160;

// ---------------------------------------------------------------------------
// Pixels purs

/** Luminance Rec. 601 (0–255), celle des outils de retouche courants. */
export const luma = (r: number, g: number, b: number) => 0.299 * r + 0.587 * g + 0.114 * b;

const copy = (p: Pixels): Pixels => ({ data: new Uint8ClampedArray(p.data), width: p.width, height: p.height });

/** Pixels plus clairs que `threshold` (luma 0..255) deviennent transparents. Nouvelle image. */
export function removeBackground(data: Pixels, threshold: number): Pixels {
  const out = copy(data);
  const d = out.data;
  const full = threshold;
  const start = threshold - BACKGROUND_FEATHER;
  for (let i = 0; i < d.length; i += 4) {
    const l = luma(d[i], d[i + 1], d[i + 2]);
    if (l > full) d[i + 3] = 0;
    else if (l > start) d[i + 3] = Math.round((d[i + 3] * (full - l)) / BACKGROUND_FEATHER);
  }
  return out;
}

/** #rgb ou #rrggbb → composantes ; null si invalide. */
export function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** Tous les pixels opaques prennent la couleur donnée ; l'alpha est conservé. Nouvelle image. */
export function recolor(data: Pixels, hex: string): Pixels {
  const rgb = parseHex(hex);
  if (!rgb) throw new Error(`couleur invalide : ${hex}`);
  const out = copy(data);
  const d = out.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] === 0) continue;
    d[i] = rgb.r;
    d[i + 1] = rgb.g;
    d[i + 2] = rgb.b;
  }
  return out;
}

/**
 * Boîte englobante des pixels d'alpha ≥ `alphaMin`, agrandie d'une marge de
 * `pad` × le plus grand côté de l'encre (même marge sur les quatre bords).
 * null si rien. La boîte peut déborder de l'image : `trim` complète en
 * transparent, pour que l'encre qui touche un bord ait sa marge elle aussi.
 */
export function inkBounds(data: Pixels, alphaMin = INK_ALPHA_MIN, pad = SIGNATURE_PAD): InkBox | null {
  const { data: d, width, height } = data;
  let x0 = width;
  let y0 = height;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < height; y++) {
    const row = y * width * 4;
    for (let x = 0; x < width; x++) {
      if (d[row + x * 4 + 3] < alphaMin) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      y1 = y;
    }
  }
  if (x1 < 0) return null;
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;
  const m = Math.round(Math.max(0, pad) * Math.max(w, h));
  return { x: x0 - m, y: y0 - m, w: w + 2 * m, h: h + 2 * m };
}

/** Une encre visible, au moins un pixel ? (Toile vide = pas de signature.) */
export const hasInk = (data: Pixels, alphaMin = INK_ALPHA_MIN) => inkBounds(data, alphaMin, 0) !== null;

/** Recadre une boîte (débordement rempli de transparent). */
export function crop(data: Pixels, box: InkBox): Pixels {
  const out = new Uint8ClampedArray(box.w * box.h * 4);
  const sx0 = Math.max(0, box.x);
  const sx1 = Math.min(data.width, box.x + box.w);
  if (sx1 > sx0) {
    for (let y = Math.max(0, box.y); y < Math.min(data.height, box.y + box.h); y++) {
      const src = (y * data.width + sx0) * 4;
      const dst = ((y - box.y) * box.w + (sx0 - box.x)) * 4;
      out.set(data.data.subarray(src, src + (sx1 - sx0) * 4), dst);
    }
  }
  return { data: out, width: box.w, height: box.h };
}

/** Rogné à l'encre plus la marge. Sans encre : copie inchangée (voir `hasInk`). */
export function trim(data: Pixels, pad = SIGNATURE_PAD): Pixels {
  const box = inkBounds(data, INK_ALPHA_MIN, pad);
  return box ? crop(data, box) : copy(data);
}

/**
 * Taille finale : largeur d'au moins SIGNATURE_MIN_WIDTH (agrandie), au plus
 * SIGNATURE_MAX_WIDTH ; hauteur bornée à SIGNATURE_MAX_HEIGHT (rapport conservé).
 */
export function exportSize(width: number, height: number): { width: number; height: number } {
  const target = Math.min(SIGNATURE_MAX_WIDTH, Math.max(SIGNATURE_MIN_WIDTH, width));
  const scale = Math.min(target / width, SIGNATURE_MAX_HEIGHT / height);
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
}

// ---------------------------------------------------------------------------
// Navigateur

export type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
export type AnyContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export function makeCanvas(width: number, height: number): AnyCanvas {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  // Canvas du document d'abord : il dessine à coup sûr avec les polices web
  // chargées (Safari a longtemps ignoré document.fonts dans OffscreenCanvas).
  if (typeof document === "undefined") return new OffscreenCanvas(w, h);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

/** Contexte 2D (lecture fréquente par défaut : getImageData suit presque toujours). */
export function canvas2d(canvas: AnyCanvas, readBack = true): AnyContext {
  const ctx = canvas.getContext("2d", { willReadFrequently: readBack }) as AnyContext | null;
  if (!ctx) throw new Error("canvas_unavailable");
  return ctx;
}

const toImageData = (p: Pixels) =>
  p instanceof ImageData ? p : new ImageData(p.data as Uint8ClampedArray<ArrayBuffer>, p.width, p.height);

function pixelsCanvas(p: Pixels): AnyCanvas {
  const canvas = makeCanvas(p.width, p.height);
  canvas2d(canvas).putImageData(toImageData(p), 0, 0);
  return canvas;
}

async function canvasPng(canvas: AnyCanvas): Promise<Uint8Array> {
  let blob: Blob | null;
  if ("convertToBlob" in canvas) blob = await canvas.convertToBlob({ type: "image/png" });
  else blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("export_failed");
  return new Uint8Array(await blob.arrayBuffer());
}

/** Libère la mémoire du canvas sans attendre le ramasse-miettes. */
const release = (canvas: AnyCanvas) => {
  canvas.width = 0;
  canvas.height = 0;
};

/** PNG des pixels, alpha conservé. */
export async function toPng(pixels: Pixels): Promise<Uint8Array> {
  const canvas = pixelsCanvas(pixels);
  try {
    return await canvasPng(canvas);
  } finally {
    release(canvas);
  }
}

/** Pixels d'une image décodée (bitmap, canvas), réduits à `maxSide` si besoin. */
function drawToPixels(source: CanvasImageSource, width: number, height: number, maxSide = Infinity): Pixels {
  const scale = Math.min(1, maxSide / Math.max(width, height));
  const canvas = makeCanvas(width * scale, height * scale);
  try {
    const ctx = canvas2d(canvas);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  } finally {
    release(canvas);
  }
}

/**
 * Image importée (PNG, JPG, WebP, HEIC…) en pixels RGBA, plus grand côté
 * ramené à UPLOAD_MAX_SIDE. Même garde que le moteur de filigrane : les
 * dimensions sont lues dans l'en-tête AVANT décodage (bombes de
 * décompression). Lève `unsupported`, `file_too_large`, `image_too_large`
 * ou `image_unreadable`.
 */
export async function fromFile(file: File): Promise<Pixels> {
  // Mêmes formats que le moteur (fileKind) : un SVG (document vectoriel, pas
  // une photo) est refusé, même renommé en .png.
  if (fileKind(file) !== "image") throw new Error("unsupported");
  if (file.size > SIGNATURE_MAX_FILE_BYTES) throw new Error("file_too_large");
  let bitmap: ImageBitmap | null = null;
  try {
    if (isHeic(file)) {
      // Safari décode le HEIC nativement ; sinon libheif (WebAssembly, chargé à la demande).
      try {
        bitmap = await createImageBitmap(file);
      } catch {
        const data = await decodeHeic(new Uint8Array(await file.arrayBuffer()));
        if (Math.max(data.width, data.height) <= UPLOAD_MAX_SIDE) return data;
        const canvas = pixelsCanvas(data);
        try {
          return drawToPixels(canvas, data.width, data.height, UPLOAD_MAX_SIDE);
        } finally {
          release(canvas);
        }
      }
    } else {
      const head = new Uint8Array(await file.slice(0, 512 * 1024).arrayBuffer());
      if (tooManyPixels(imageSize(head))) throw new Error("image_too_large");
      bitmap = await createImageBitmap(file);
    }
    return drawToPixels(bitmap, bitmap.width, bitmap.height, UPLOAD_MAX_SIDE);
  } catch (e) {
    if (e instanceof Error && (e.message === "image_too_large" || e.message === "canvas_unavailable")) throw e;
    throw new Error("image_unreadable");
  } finally {
    bitmap?.close();
  }
}

/**
 * Signature finale : rognée à l'encre + SIGNATURE_PAD, mise à l'échelle
 * (SIGNATURE_MIN_WIDTH ≤ largeur ≤ SIGNATURE_MAX_WIDTH), PNG transparent.
 * Lève `signature_empty` sans encre.
 */
export async function finishSignature(pixels: Pixels, pad = SIGNATURE_PAD): Promise<SignatureImage> {
  const box = inkBounds(pixels, INK_ALPHA_MIN, pad);
  if (!box) throw new Error("signature_empty");
  const source = pixelsCanvas(crop(pixels, box));
  const size = exportSize(box.w, box.h);
  const out = makeCanvas(size.width, size.height);
  try {
    const ctx = canvas2d(out, false);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(source, 0, 0, size.width, size.height);
    return { png: await canvasPng(out), width: size.width, height: size.height };
  } finally {
    release(source);
    release(out);
  }
}

/**
 * Toile du pavé « Dessiner » → signature. La toile doit être transparente :
 * fond blanc et ligne de base restent en CSS, sinon ils seraient rognés avec
 * l'encre.
 */
export async function signatureFromCanvas(canvas: AnyCanvas): Promise<SignatureImage> {
  const ctx = canvas2d(canvas);
  return finishSignature(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

/** Police chargée avant de dessiner (sinon le canvas dessine le repli). Échec : on dessine quand même. */
export async function ensureFont(font: string, text: string) {
  if (typeof document === "undefined" || !document.fonts?.load) return;
  try {
    await document.fonts.load(font, text || " ");
  } catch {
    // Le repli (Georgia, serif…) dessine quand même.
  }
}

/** Hébreu, arabe, persan : base de droite à gauche pour l'ordre des mots. */
const RTL_SCRIPT = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/;

export const typedFont = (px: number, fontFamily = TYPED_FONT_FAMILY) => `italic 400 ${px}px ${fontFamily}`;

/** Onglet « Taper » : le nom en serif italique, grand, dans l'encre choisie. Lève `signature_empty`. */
export async function renderTypedSignature(
  name: string,
  inkHex: string = INK.black,
  fontFamily = TYPED_FONT_FAMILY
): Promise<SignatureImage> {
  const text = name.replace(/\s+/g, " ").trim();
  if (!text) throw new Error("signature_empty");
  const font = typedFont(TYPED_FONT_PX, fontFamily);
  await ensureFont(font, text);
  const probe = canvas2d(makeCanvas(1, 1));
  probe.font = font;
  const width = probe.measureText(text).width;
  // Marges larges : l'italique et les jambages débordent de la boîte mesurée ;
  // le rognage final les ramène à SIGNATURE_PAD.
  const margin = TYPED_FONT_PX;
  const canvas = makeCanvas(Math.ceil(width) + 2 * margin, TYPED_FONT_PX * 3);
  try {
    const ctx = canvas2d(canvas);
    ctx.font = font;
    ctx.fillStyle = inkHex;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.direction = RTL_SCRIPT.test(text) ? "rtl" : "ltr";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    return await finishSignature(ctx.getImageData(0, 0, canvas.width, canvas.height));
  } finally {
    release(canvas);
  }
}

/** Identifiant court de la signature (16 premiers caractères hex du SHA-256 du PNG), pour la clé du tampon. */
export async function signatureKey(sig: SignatureImage): Promise<string> {
  return (await sha256Hex(sig.png)).slice(0, 16);
}

/** ImageBitmap pour le moteur, décodé depuis les octets (pas d'URL blob:). À `.close()` au remplacement. */
export function signatureBitmap(sig: SignatureImage): Promise<ImageBitmap> {
  return createImageBitmap(new Blob([sig.png as Uint8Array<ArrayBuffer>], { type: "image/png" }));
}

/** Pixels d'une signature (recomposition, tests). */
export async function signaturePixels(sig: SignatureImage): Promise<Pixels> {
  const bitmap = await signatureBitmap(sig);
  try {
    return drawToPixels(bitmap, bitmap.width, bitmap.height);
  } finally {
    bitmap.close();
  }
}
