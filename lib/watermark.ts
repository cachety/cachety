import { PDFDocument } from "pdf-lib";
// Importé avant pdfjs-dist : installe les polyfills que pdf.js 6 suppose
// présents (Map.getOrInsertComputed…) et fournit l'URL de worker adaptée.
import { pdfjsWorkerSrc } from "@/lib/compat";
import { decodeHeic, isHeic } from "@/lib/heic";
import { imageSize, tooManyPixels } from "@/lib/image-size";
import { paintMasks, type PageMasks } from "@/lib/masks";
import { ENCODE_LADDER, pageBudget } from "@/lib/size-budget";
import { fileKind } from "@/lib/files";
import {
  fillRgba,
  fontCss,
  haloRgba,
  normalizeStyle,
  type WatermarkStyle,
} from "@/lib/watermark-style";

export type WatermarkResult = {
  blob: Blob;
  url: string;
  /** jpg : image réencodée pour tenir sous une taille cible (le PNG dépassait). */
  extension: "pdf" | "png" | "jpg";
  previews: string[];
  pageCount: number;
  /** Taille cible demandée mais non atteinte, même à la compression maximale. */
  overBudget?: boolean;
};

export type RenderOptions = {
  /** Zones à noircir avant le filigrane, par page (index 0). */
  masks?: PageMasks;
  /** Taille maximale du fichier produit, en octets. */
  maxBytes?: number;
  /** Graine de variation du pavage ; absente : tirée au hasard à chaque rendu. */
  layoutSeed?: number;
};

const randomSeed = () => crypto.getRandomValues(new Uint32Array(1))[0];

export function releaseResult(result: WatermarkResult) {
  URL.revokeObjectURL(result.url);
  result.previews.forEach(URL.revokeObjectURL);
}

type ProgressFn = (done: number, total: number) => void;

const RENDER_SCALE = 2;
const JPEG_QUALITY = 0.85;
const PREVIEW_MAX_PAGES = 12;
const MIN_IMAGE_SIDE = 800;
export const MAX_CANVAS_AREA = 16_777_216;
const MAX_CANVAS_SIDE = 8192;
// Plafonds d'entrée : un fichier démesuré (ou forgé pour l'être) ne doit pas
// saturer la mémoire ni bloquer l'onglet pendant des heures. Couvre tous les
// points d'entrée (page, kiosque), puisque tout passe par watermarkFile.
export const MAX_FILE_BYTES = 200 * 1024 * 1024;
export const MAX_PDF_PAGES = 500;

export function fitScale(width: number, height: number, scale: number) {
  const byArea = Math.sqrt(MAX_CANVAS_AREA / (width * height * scale * scale));
  const bySide = MAX_CANVAS_SIDE / (Math.max(width, height) * scale);
  return scale * Math.min(1, byArea, bySide);
}

export async function watermarkFile(
  file: File,
  text: string,
  onProgress?: ProgressFn,
  password?: string,
  signal?: AbortSignal,
  style?: WatermarkStyle,
  options: RenderOptions = {}
): Promise<WatermarkResult> {
  const look = normalizeStyle(style);
  if (file.size > MAX_FILE_BYTES) throw new Error("file_too_large");
  const kind = fileKind(file);
  if (kind === "pdf") return watermarkPdf(file, text, look, onProgress, password, signal, options);
  if (kind === "image") return watermarkImage(file, text, look, signal, options);
  throw new Error("unsupported");
}

async function watermarkPdf(
  file: File,
  text: string,
  style: WatermarkStyle,
  onProgress?: ProgressFn,
  password?: string,
  signal?: AbortSignal,
  { masks, maxBytes, layoutSeed }: RenderOptions = {}
): Promise<WatermarkResult> {
  const pdfjs = await import("pdfjs-dist");
  // Une graine par document : toutes ses pages varient, différemment d'un rendu à l'autre.
  const seed = layoutSeed ?? randomSeed();
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc();

  const loadingTask = pdfjs.getDocument({
    data: await file.arrayBuffer(),
    password,
    standardFontDataUrl: "/pdfjs/standard_fonts/",
    cMapUrl: "/pdfjs/cmaps/",
    wasmUrl: "/pdfjs/wasm/",
    iccUrl: "/pdfjs/iccs/",
    // Surface d'attaque minimale face à un PDF hostile : pas de moteur XFA
    // (formulaires XML dynamiques), même si pdf.js le désactive déjà par défaut.
    enableXfa: false,
  });

  let pdf;
  try {
    pdf = await loadingTask.promise;
  } catch (e) {
    await loadingTask.destroy();
    // pdf.js signale NEED_PASSWORD comme INCORRECT_PASSWORD par la même
    // exception ; « un mot de passe a été fourni » suffit à les distinguer.
    if ((e as { name?: string } | null)?.name === "PasswordException") {
      throw new Error(password ? "pdf_password_wrong" : "pdf_password");
    }
    throw new Error("pdf_unreadable");
  }

  const pageCount = pdf.numPages;
  if (pageCount === 0) {
    await loadingTask.destroy();
    throw new Error("pdf_empty");
  }
  if (pageCount > MAX_PDF_PAGES) {
    await loadingTask.destroy();
    throw new Error("pdf_too_many_pages");
  }

  await ensureFont(style, text);
  const out = await PDFDocument.create();
  const previews: string[] = [];

  try {
    for (let i = 1; i <= pageCount; i++) {
      // Un rendu remplacé (texte modifié, document retiré) s'arrête à la
      // page suivante au lieu de continuer pour rien : sans cela, deux
      // rendus complets du même PDF peuvent tourner en parallèle.
      if (signal?.aborted) throw new Error("aborted");
      const page = await pdf.getPage(i);
      const base = page.getViewport({ scale: 1 });
      const scale = fitScale(base.width, base.height, RENDER_SCALE);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas_unavailable");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvas, viewport }).promise;

      paintMasks(ctx, canvas.width, canvas.height, masks?.[i - 1]);
      drawWatermark(ctx, canvas.width, canvas.height, text, style, (seed + i) >>> 0);

      const pageBlob = maxBytes
        ? await encodeWithin(canvas, pageBudget(maxBytes, pageCount))
        : await canvasToBlob(canvas, "image/jpeg", JPEG_QUALITY);
      const jpeg = await out.embedJpg(await pageBlob.arrayBuffer());
      const outPage = out.addPage([base.width, base.height]);
      outPage.drawImage(jpeg, {
        x: 0,
        y: 0,
        width: outPage.getWidth(),
        height: outPage.getHeight(),
      });

      if (previews.length < PREVIEW_MAX_PAGES) {
        previews.push(URL.createObjectURL(pageBlob));
      }
      canvas.width = 0;
      onProgress?.(i, pageCount);
    }

    const bytes = await out.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    return {
      blob,
      url: URL.createObjectURL(blob),
      extension: "pdf",
      previews,
      pageCount,
      overBudget: !!maxBytes && blob.size > maxBytes,
    };
  } catch (e) {
    previews.forEach(URL.revokeObjectURL);
    throw e;
  } finally {
    await loadingTask.destroy();
  }
}

async function watermarkImage(
  file: File,
  text: string,
  style: WatermarkStyle,
  signal?: AbortSignal,
  { masks, maxBytes, layoutSeed }: RenderOptions = {}
): Promise<WatermarkResult> {
  if (signal?.aborted) throw new Error("aborted");
  let bitmap: ImageBitmap;
  try {
    if (isHeic(file)) {
      bitmap = await heicBitmap(file);
    } else {
      // Dimensions lues dans l'en-tête AVANT de décoder : une « bombe » de
      // quelques Ko annonçant des milliards de pixels saturerait la mémoire.
      const head = new Uint8Array(await file.slice(0, 512 * 1024).arrayBuffer());
      if (tooManyPixels(imageSize(head))) throw new Error("image_too_large");
      bitmap = await createImageBitmap(file);
    }
  } catch (e) {
    if (e instanceof Error && (e.message === "image_too_large" || e.message === "aborted")) throw e;
    throw new Error("image_unreadable");
  }

  const upscale = Math.max(1, MIN_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
  const scale = fitScale(bitmap.width, bitmap.height, upscale);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(bitmap.width * scale));
  canvas.height = Math.max(1, Math.floor(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("canvas_unavailable");
  }

  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  paintMasks(ctx, canvas.width, canvas.height, masks?.[0]);
  await ensureFont(style, text);
  drawWatermark(ctx, canvas.width, canvas.height, text, style, layoutSeed ?? randomSeed());

  // PNG par défaut (sans perte). Trop lourd pour la taille cible : JPEG,
  // avec la même échelle qualité puis résolution que les pages de PDF.
  let blob = await canvasToBlob(canvas, "image/png");
  let extension: WatermarkResult["extension"] = "png";
  if (maxBytes && blob.size > maxBytes) {
    blob = await encodeWithin(canvas, maxBytes);
    extension = "jpg";
  }
  return {
    blob,
    url: URL.createObjectURL(blob),
    extension,
    previews: [URL.createObjectURL(blob)],
    pageCount: 1,
    overBudget: !!maxBytes && blob.size > maxBytes,
  };
}

/** Safari décode le HEIC nativement ; sinon libheif (WebAssembly, chargé à la demande). */
async function heicBitmap(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file);
  } catch {
    const pixels = await decodeHeic(new Uint8Array(await file.arrayBuffer()));
    return createImageBitmap(pixels);
  }
}

/**
 * Variation de mise en page propre à un rendu : angle, décalage du pavage et
 * espacement. Deux copies n'ont jamais le filigrane au même endroit, ce qui
 * prive l'attaque par estimation multi-copies (Dekel et al., CVPR 2017) de
 * motif commun à soustraire. Déterministe pour une graine donnée (tests).
 */
export function layoutVariation(seed: number) {
  // mulberry32 : générateur rapide, suffisant ici (aucun secret en jeu).
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    angle: -Math.PI / 4 + (next() - 0.5) * ((14 * Math.PI) / 180), // 45° ± 7°
    offsetX: next(), // fraction d'un pas horizontal
    offsetY: next(),
    spacing: 0.9 + next() * 0.25, // 0,9 à 1,15
  };
}

/**
 * Contour sombre et neutre autour de chaque lettre, comme un tampon encreur.
 * Un filigrane d'une seule couleur s'efface en sélectionnant cette couleur
 * (ou en blanchissant tout ce qui n'est pas sombre) ; le contour, lui, est
 * un trait fin et sombre comme le texte du document : l'effacer par couleur
 * ou par luminosité efface aussi le document. Et sans le remplissage, les
 * lettres restent lisibles, en creux. Mesuré par e2e/removal.e2e.ts.
 */
export function outlineRgba(style: WatermarkStyle) {
  const s = normalizeStyle(style);
  return `rgba(28, 28, 32, ${Math.min(0.9, Math.max(OUTLINE_MIN_ALPHA, Math.round(s.opacity * 1.6 * 1000) / 1000))})`;
}

/**
 * Plancher du contour (celui de l'ancien réglage par défaut, 45 %), quelle que soit
 * l'opacité choisie. Le contour est tracé autour des lettres (intérieur évidé,
 * voir drawWatermarkRun) : la couleur choisie reste visible. Sur fond blanc, un
 * contour moins dense passe au-dessus du seuil « sombre » (≈ 110 sur 255) et
 * disparaît avec les niveaux (blanchir tout sauf le sombre). Le réglage
 * « Léger » reste léger (remplissage pâle, petite taille) sans devenir
 * effaçable d'un geste.
 */
export const OUTLINE_MIN_ALPHA = 0.72;

export const outlineWidth = (fontSize: number) => Math.max(1.5, fontSize / 15);

/** Pas horizontal du pavage : la ligne entière, plus un écart variable (jamais de chevauchement). */
export const watermarkStepX = (lineWidth: number, fontSize: number, spacing = 1) =>
  lineWidth + fontSize * 2.5 * spacing;

export function drawWatermark(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  text: string,
  style?: WatermarkStyle,
  /** Graine de variation de mise en page : absente, pavage fixe (aperçus de l'interface). */
  seed?: number
) {
  const line = text.trim();
  if (!line) return;

  const look = normalizeStyle(style);
  // Calque transparent : le contour est évidé à l'intérieur des lettres
  // (destination-out, voir drawWatermarkRun), ce qui effacerait la page
  // si l'on dessinait directement dessus.
  const layer = makeLayer(width, height);
  const page = ctx;
  ctx = layer.getContext("2d") as CanvasRenderingContext2D;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Sens de base pour l'algorithme bidi : un texte arabe ou persan qui contient
  // une date ou un nom latin garde ses segments dans le bon ordre.
  ctx.direction = RTL.test(line) ? "rtl" : "ltr";

  const font = (px: number) => fontCss(look, px, line);
  // La taille automatique reste le plancher historique ; le curseur la multiplie.
  const automatic = Math.max(12, Math.round(Math.min(width, height) / 14));
  let fontSize = Math.max(6, Math.round(automatic * look.scale));
  ctx.font = font(fontSize);

  const measured = ctx.measureText(line).width;
  const maxWidth = watermarkMaxLineWidth(width, height, fontSize);
  if (measured > maxWidth) {
    fontSize = Math.max(6, Math.floor((fontSize * maxWidth) / measured));
    ctx.font = font(fontSize);
  }

  ctx.fillStyle = fillRgba(look);
  // Halo contrasté : invisible sur un fond proche de l'encre, il porte la
  // lisibilité quand l'encre se noie. Pas de lecture de pixel.
  ctx.strokeStyle = haloRgba(look);
  ctx.lineWidth = Math.max(1, fontSize / 10);
  ctx.lineJoin = "round";

  const outline = outlineRgba(look);
  const vary = seed === undefined ? null : layoutVariation(seed);
  const cx = width / 2;
  const cy = height / 2;
  ctx.translate(cx, cy);
  ctx.rotate(vary?.angle ?? -Math.PI / 4);
  ctx.translate(-cx, -cy);

  // La variation porte sur les ÉCARTS, jamais sur la longueur du texte : un
  // pas réduit en proportion faisait chevaucher deux copies d'un texte long.
  const spacing = vary?.spacing ?? 1;
  const stepX = watermarkStepX(ctx.measureText(line).width, fontSize, spacing);
  // L'amplitude s'ajoute à l'écart vertical, sinon les crêtes se touchent.
  const stepY = fontSize * (1 + 2.5 * spacing) + waveAmplitude(fontSize, look.wave) * 2.2;
  const shiftX = (vary?.offsetX ?? 0) * stepX;
  const shiftY = (vary?.offsetY ?? 0) * stepY;
  const radius = Math.hypot(width, height) / 2;
  const nx = Math.ceil((radius + stepX) / stepX) + 1;
  const ny = Math.ceil((radius + stepY) / stepY) + 1;
  for (let i = -nx; i <= nx; i++) {
    for (let j = -ny; j <= ny; j++) {
      const x = cx + i * stepX + shiftX;
      const y = cy + j * stepY + shiftY;
      drawWatermarkRun(ctx, line, x, y, fontSize, look.wave, outline);
    }
  }

  page.drawImage(layer, 0, 0);
  layer.width = 0;
}

function makeLayer(width: number, height: number): HTMLCanvasElement | OffscreenCanvas {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(Math.max(1, width), Math.max(1, height));
  const c = document.createElement("canvas");
  c.width = Math.max(1, width);
  c.height = Math.max(1, height);
  return c;
}

/** 0 laisse le texte droit. Sinon chaque glyphe suit une sinusoïde, tangent à la pente. */
export function drawWatermarkRun(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  wave: number,
  /** Couleur du contour sombre (outlineRgba) ; absent : pas de contour. Exige un canevas transparent (calque). */
  outline?: string
) {
  const ink = (s: string, px: number, py: number) => {
    ctx.strokeText(s, px, py); // halo de lisibilité
    if (outline) {
      // Contour sombre autour des lettres, jamais dessus : trait double
      // largeur, puis intérieur évidé. Il garde sa densité (résistance aux
      // niveaux et à la sélection de couleur), et l'intérieur montre la
      // couleur choisie au lieu d'un gris sombre aux petites tailles.
      const [style, width, fill, op] = [ctx.strokeStyle, ctx.lineWidth, ctx.fillStyle, ctx.globalCompositeOperation];
      ctx.strokeStyle = outline;
      ctx.lineWidth = outlineWidth(fontSize) * 3;
      ctx.strokeText(s, px, py);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "#000";
      ctx.fillText(s, px, py);
      ctx.globalCompositeOperation = op;
      ctx.strokeStyle = style;
      ctx.lineWidth = width;
      ctx.fillStyle = fill;
    }
    ctx.fillText(s, px, py);
  };
  // Écriture de droite à gauche (arabe, hébreu…) : poser les lettres une à une
  // inverserait le sens et casserait les liaisons. Le texte reste alors droit.
  if (!(wave > 0) || RTL.test(text)) {
    ink(text, x, y);
    return;
  }

  const chars = graphemes(text);
  const widths = chars.map((ch) => Math.max(ctx.measureText(ch).width, fontSize * 0.15));
  const total = widths.reduce((sum, w) => sum + w, 0);
  const align = ctx.textAlign;
  ctx.textAlign = "center";
  let cursor = x - total / 2;
  for (let i = 0; i < chars.length; i++) {
    const width = widths[i];
    const mid = cursor + width / 2;
    const { dy, angle } = waveDisplacement(mid - (x - total / 2), fontSize, wave);
    ctx.save();
    ctx.translate(mid, y + dy);
    ctx.rotate(angle);
    ink(chars[i], 0, 0);
    ctx.restore();
    cursor += width;
  }
  ctx.textAlign = align;
}

const RTL = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/;

/**
 * Caractères tels que lus : « é » décomposé, émoji composés (ZWJ) et
 * drapeaux restent entiers. Array.from les découpait en points de code,
 * dessinés séparément le long de l'onde.
 */
export function graphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(text), (s) => s.segment);
  }
  return Array.from(text.normalize("NFC"));
}

export function waveAmplitude(fontSize: number, wave: number) {
  return wave > 0 ? fontSize * wave * 0.85 : 0;
}

/** Déplacement vertical et rotation d'un glyphe le long de l'onde. `along` part du début de la ligne. */
export function waveDisplacement(along: number, fontSize: number, wave: number) {
  if (!(wave > 0)) return { dy: 0, angle: 0 };
  const amplitude = waveAmplitude(fontSize, wave);
  const wavelength = Math.max(fontSize * 5, 1);
  const theta = (along / wavelength) * Math.PI * 2;
  const slope = Math.cos(theta) * ((amplitude * Math.PI * 2) / wavelength);
  return { dy: Math.sin(theta) * amplitude, angle: Math.atan(slope) };
}

export function watermarkMaxLineWidth(width: number, height: number, lineHeight: number) {
  return Math.SQRT2 * Math.min(width, height) * 0.9 - lineHeight;
}

async function ensureFont(style: WatermarkStyle, text: string) {
  if (typeof document === "undefined" || !document.fonts?.load) return;
  try {
    // Avec le texte : seuls les sous-ensembles utiles (arabe, latin…) sont chargés.
    await document.fonts.load(fontCss(style, 64, text), text || " ");
  } catch {
    // Le stack de repli (system-ui, Georgia, monospace) dessine quand même.
  }
}

/**
 * JPEG sous `budget` octets : qualité dégressive, puis résolution réduite.
 * Rend le plus petit essai si aucun ne tient (le résultat le signale).
 */
async function encodeWithin(canvas: HTMLCanvasElement, budget: number): Promise<Blob> {
  let best: Blob | null = null;
  for (const { scale, quality } of ENCODE_LADDER) {
    const source = scale === 1 ? canvas : downscale(canvas, scale);
    const blob = await canvasToBlob(source, "image/jpeg", quality);
    if (source !== canvas) source.width = 0;
    if (!best || blob.size < best.size) best = blob;
    if (blob.size <= budget) return blob;
  }
  return best!;
}

function downscale(canvas: HTMLCanvasElement, scale: number) {
  const small = document.createElement("canvas");
  small.width = Math.max(1, Math.round(canvas.width * scale));
  small.height = Math.max(1, Math.round(canvas.height * scale));
  const ctx = small.getContext("2d");
  if (!ctx) throw new Error("canvas_unavailable");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(canvas, 0, 0, small.width, small.height);
  return small;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("export_failed"))),
      type,
      quality
    );
  });
}
