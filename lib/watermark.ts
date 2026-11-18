// Importé avant pdfjs-dist : installe les polyfills que pdf.js 6 suppose
// présents (Map.getOrInsertComputed…) et fournit l'URL de worker adaptée.
import { pdfjsWorkerSrc } from "@/lib/compat";
import { decodeHeic, isHeic } from "@/lib/heic";
import { imageSize, tooManyPixels } from "@/lib/image-size";
import { paintMasks, type PageMasks } from "@/lib/masks";
import { overlaysOnPage, paintOverlays, type OverlayImages, type PageOverlays } from "@/lib/overlays";
import { ENCODE_LADDER, pageBudget } from "@/lib/size-budget";
import { fileKind, imageToPdf, newPdf } from "@/lib/files";
import { fontCss, haloRgba, normalizeStyle, type WatermarkStyle } from "@/lib/watermark-style";
import {
  NO_TILE_VARIATION,
  planRows,
  rgba,
  rng,
  ROW_STREAM,
  TILE_STREAM,
  TILE_WAVE,
  tileVariation,
  type RowOffset,
  type RowPlan,
  type Shadow,
  type TileVariation,
} from "@/lib/watermark-variation";

export type WatermarkResult = {
  blob: Blob;
  url: string;
  /** jpg : image réencodée pour tenir sous une taille cible (le PNG dépassait). */
  extension: "pdf" | "png" | "jpg";
  previews: string[];
  /** Page (index 0) de chaque aperçu, dans le même ordre que `previews`. */
  previewPageIndexes: number[];
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
  /** Signatures à peindre après les masques, avant le filigrane, par page (index 0). */
  overlays?: PageOverlays;
  /** Images des signatures (jamais persistées) ; sans elles, rien n'est peint. */
  overlayImages?: OverlayImages;
  /** Paraphe sur chaque page sans signature, placé d'après le format réel de la page. */
  initialsEveryPage?: boolean;
  /** Image en entrée : sortie PDF d'une page plutôt que PNG/JPEG (mode « signer »). */
  forcePdf?: boolean;
  /** Pages (index 0) à prévisualiser ; par défaut les PREVIEW_MAX_PAGES premières. */
  previewPages?: (pageCount: number) => number[];
};

const randomSeed = () => crypto.getRandomValues(new Uint32Array(1))[0];

export function releaseResult(result: WatermarkResult) {
  URL.revokeObjectURL(result.url);
  result.previews.forEach(URL.revokeObjectURL);
}

type ProgressFn = (done: number, total: number) => void;

const RENDER_SCALE = 2;
const JPEG_QUALITY = 0.85;
export const PREVIEW_MAX_PAGES = 12;
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

const firstPages = (pageCount: number) =>
  Array.from({ length: Math.min(pageCount, PREVIEW_MAX_PAGES) }, (_, i) => i);

/**
 * Aperçus du mode « signer » : les 11 premières pages et la dernière, là où
 * l'on signe. Un document court est prévisualisé en entier.
 */
export function signPreviewPages(pageCount: number): number[] {
  if (pageCount <= PREVIEW_MAX_PAGES) return firstPages(pageCount);
  return [...firstPages(PREVIEW_MAX_PAGES - 1), pageCount - 1];
}

/** Pages réellement prévisualisées : entiers dans le document, sans doublon, dans l'ordre. */
function previewSet(pageCount: number, pick?: (pageCount: number) => number[]) {
  const pages = (pick ?? firstPages)(pageCount);
  return new Set(pages.filter((p) => Number.isInteger(p) && p >= 0 && p < pageCount));
}

/** Paraphe demandé : rapport de la page rendue et de l'image du paraphe. */
function initialsFor(canvas: HTMLCanvasElement, { initialsEveryPage, overlayImages }: RenderOptions) {
  const image = overlayImages && (overlayImages.initials ?? overlayImages.signature);
  if (!initialsEveryPage || !image) return undefined;
  return { pageAspect: canvas.width / canvas.height, imageAspect: image.width / image.height };
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

/** Alias pour le mode « signer » : même moteur, nom qui dit l'intention. */
export const renderFile = watermarkFile;

async function watermarkPdf(
  file: File,
  text: string,
  style: WatermarkStyle,
  onProgress?: ProgressFn,
  password?: string,
  signal?: AbortSignal,
  options: RenderOptions = {}
): Promise<WatermarkResult> {
  const { masks, maxBytes, layoutSeed, overlays, overlayImages } = options;
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
  const out = await newPdf();
  const previews: string[] = [];
  const previewPageIndexes: number[] = [];
  const toPreview = previewSet(pageCount, options.previewPages);

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

      // Ordre voulu : les masques retirent, la signature ajoute, le filigrane
      // recouvre le tout (pas plus facile à effacer que la signature).
      paintMasks(ctx, canvas.width, canvas.height, masks?.[i - 1]);
      paintOverlays(
        ctx,
        canvas.width,
        canvas.height,
        overlaysOnPage(overlays, i - 1, initialsFor(canvas, options)),
        overlayImages
      );
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

      if (toPreview.has(i - 1)) {
        previews.push(URL.createObjectURL(pageBlob));
        previewPageIndexes.push(i - 1);
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
      previewPageIndexes,
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
  options: RenderOptions = {}
): Promise<WatermarkResult> {
  const { masks, maxBytes, layoutSeed, overlays, overlayImages, forcePdf } = options;
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
  paintOverlays(ctx, canvas.width, canvas.height, overlaysOnPage(overlays, 0, initialsFor(canvas, options)), overlayImages);
  await ensureFont(style, text);
  drawWatermark(ctx, canvas.width, canvas.height, text, style, layoutSeed ?? randomSeed());

  // PNG par défaut (sans perte). Trop lourd pour la taille cible : JPEG,
  // avec la même échelle qualité puis résolution que les pages de PDF.
  let image = await canvasToBlob(canvas, "image/png");
  let imageExtension: "png" | "jpg" = "png";
  if (maxBytes && image.size > maxBytes) {
    image = await encodeWithin(canvas, maxBytes);
    imageExtension = "jpg";
  }
  // Mode « signer » : toujours un PDF, une page aux proportions de l'image
  // qui tient dans un A4 ; l'aperçu reste l'image elle-même.
  const blob = forcePdf
    ? new Blob([(await imageToPdf(new Uint8Array(await image.arrayBuffer()), imageExtension, "a4")) as BlobPart], {
        type: "application/pdf",
      })
    : image;
  return {
    blob,
    url: URL.createObjectURL(blob),
    extension: forcePdf ? "pdf" : imageExtension,
    previews: [URL.createObjectURL(image)],
    previewPageIndexes: [0],
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
  const next = rng(seed);
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
 *
 * « thin » : rebord bien moins large mais plus dense, plus lisible ;
 * « none » : aucun contour (null), le plus lisible, le plus facile à retirer.
 */
export function outlineRgba(style: WatermarkStyle): string | null {
  const s = normalizeStyle(style);
  if (s.outline === "none") return null;
  const o = OUTLINES[s.outline];
  return `rgba(28, 28, 32, ${Math.min(o.cap, Math.max(o.floor, Math.round(s.opacity * o.gain * 1000) / 1000))})`;
}

/**
 * Plancher du contour marqué (celui de l'ancien réglage par défaut, 45 %), quelle que soit
 * l'opacité choisie. Le contour est tracé autour des lettres (intérieur évidé,
 * voir drawWatermarkRun) : la couleur choisie reste visible. Sur fond blanc, un
 * contour moins dense passe au-dessus du seuil « sombre » (≈ 110 sur 255) et
 * disparaît avec les niveaux (blanchir tout sauf le sombre). Le réglage
 * « Léger » reste léger (remplissage pâle, petite taille) sans devenir
 * effaçable d'un geste.
 */
export const OUTLINE_MIN_ALPHA = 0.72;
/**
 * Contour fin : rebord presque moitié moins large que le marqué, donc
 * plus lisible, mais plus dense pour compenser : un rebord fin s'éclaircit au
 * lissage et au JPEG, et passerait sinon au-dessus du seuil « sombre ».
 * Mesuré par e2e/removal.e2e.ts (niveaux : 0,45, contre 0,32 à 0,66 de plancher).
 */
export const THIN_OUTLINE_MIN_ALPHA = 0.8;

const OUTLINES = {
  strong: { floor: OUTLINE_MIN_ALPHA, gain: 1.6, cap: 0.9, stroke: 3 },
  thin: { floor: THIN_OUTLINE_MIN_ALPHA, gain: 1.6, cap: 0.9, stroke: 1.75 },
} as const;

/**
 * Suit la taille du texte : un petit filigrane garde un contour fin. Plancher
 * d'1 px (rebord extérieur de 1,5 px, voir drawWatermarkRun), en dessous
 * duquel le sous-échantillonnage JPEG le dissoudrait.
 */
export const outlineWidth = (fontSize: number) => Math.max(1, fontSize / 15);

/**
 * Largeur du trait de contour (le rebord visible en fait la moitié, l'intérieur
 * étant évidé). Fin : rebord d'au moins 1 px, pour survivre au JPEG.
 */
export function outlineStroke(style: WatermarkStyle, fontSize: number) {
  const s = normalizeStyle(style);
  if (s.outline === "none") return 0;
  const stroke = outlineWidth(fontSize) * OUTLINES[s.outline].stroke;
  return s.outline === "thin" ? Math.max(2, stroke) : stroke;
}

/** Pas horizontal du pavage : la ligne entière, plus un écart variable (jamais de chevauchement). */
export const watermarkStepX = (lineWidth: number, fontSize: number, spacing = 1) =>
  lineWidth + fontSize * 2.5 * spacing;

/**
 * Pas vertical : la hauteur du texte, l'écart variable, et deux crêtes d'onde
 * à leur amplitude maximale (TILE_WAVE.max), plus une marge. La marge libre
 * restante (`watermarkRoom`) borne le décalage et l'inclinaison propres à
 * chaque occurrence : deux rangées voisines ne se touchent jamais.
 */
export const watermarkStepY = (fontSize: number, spacing: number, amplitude: number) =>
  fontSize * (1 + 2.5 * spacing) + amplitude * 2.5;

export const watermarkRoom = (stepY: number, fontSize: number, amplitude: number) =>
  stepY - fontSize - 2 * TILE_WAVE.max * amplitude;

/** Graine des dessins sans graine (aperçus de l'interface) : variés, mais stables d'un dessin à l'autre. */
export const SAMPLE_SEED = 0x2f6b1c3d;

/**
 * Encre d'une rangée, pour drawWatermarkRun. Une rangée ordinaire porte une
 * nuance de la couleur choisie, le halo, le contour et une ombre. Une rangée
 * d'accent est « à plat » : couleur franche, sans halo ni ombre. L'accent en
 * couleur garde le contour choisi (niveaux : 0,56 contre 0,52 sans, en
 * marqué) ; l'accent presque noir n'en a pas besoin, il est déjà sombre.
 */
function rowInk(
  plan: RowPlan,
  halo: { color: string; width: number },
  outline: { color: string; width: number } | undefined
): RunInk {
  if (plan.accent?.kind === "deep") return { fill: rgba(plan.accent.rgb, plan.accent.opacity) };
  if (plan.accent) return { fill: rgba(plan.accent.rgb, plan.accent.opacity), outline };
  return { fill: plan.fill, halo, outline, shadow: plan.shadow };
}

export function drawWatermark(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  text: string,
  style?: WatermarkStyle,
  /** Graine de variation : absente, pavage fixe et variation stable (aperçus de l'interface). */
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
  ctx.lineJoin = "round";

  // Halo contrasté : invisible sur un fond proche de l'encre, il porte la
  // lisibilité quand l'encre se noie. Pas de lecture de pixel.
  const halo = { color: haloRgba(look), width: Math.max(1, fontSize / 10) };
  const outlineColor = outlineRgba(look);
  const outline = outlineColor ? { color: outlineColor, width: outlineStroke(look, fontSize) } : undefined;

  const vary = seed === undefined ? null : layoutVariation(seed);
  const angle = vary?.angle ?? -Math.PI / 4;
  const cx = width / 2;
  const cy = height / 2;
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.translate(-cx, -cy);

  // La variation porte sur les ÉCARTS, jamais sur la longueur du texte : un
  // pas réduit en proportion faisait chevaucher deux copies d'un texte long.
  const spacing = vary?.spacing ?? 1;
  const lineWidth = ctx.measureText(line).width;
  const stepX = watermarkStepX(lineWidth, fontSize, spacing);
  const amplitude = waveAmplitude(fontSize, look.wave);
  const stepY = watermarkStepY(fontSize, spacing, amplitude);
  const room = watermarkRoom(stepY, fontSize, amplitude);
  const shiftX = (vary?.offsetX ?? 0) * stepX;
  const shiftY = (vary?.offsetY ?? 0) * stepY;
  const radius = Math.hypot(width, height) / 2;
  const nx = Math.ceil((radius + stepX) / stepX) + 1;
  const ny = Math.ceil((radius + stepY) / stepY) + 1;

  // Toujours active : sans graine, une graine fixe (aperçu stable).
  const variationSeed = seed ?? SAMPLE_SEED;
  const rows: RowOffset[] = [];
  for (let j = -ny; j <= ny; j++) rows.push({ row: j, offset: j * stepY + shiftY });
  // Demi-étendue de la page le long de la normale aux rangées.
  const extent = (width * Math.abs(Math.sin(angle)) + height * Math.abs(Math.cos(angle))) / 2;
  const plans = planRows(rows, extent, fontSize, look.color, look.opacity, rng(variationSeed ^ ROW_STREAM));
  const tileRand = rng(variationSeed ^ TILE_STREAM);

  for (const { row, offset } of rows) {
    const ink = rowInk(plans.get(row)!, halo, outline);
    for (let i = -nx; i <= nx; i++) {
      const tile = tileVariation(tileRand, fontSize, room, lineWidth);
      drawWatermarkRun(ctx, line, cx + i * stepX + shiftX, cy + offset, fontSize, look.wave, ink, tile);
    }
  }

  page.drawImage(layer, 0, 0);
  layer.width = 0;
}

/**
 * Aperçu du réglage (panneau Apparence) : une rangée ordinaire et une rangée
 * d'accent, avec les mêmes règles que le rendu, tirées d'une graine fixe.
 * Dessine directement sur `ctx`, qui doit être transparent (contour évidé).
 */
export function drawWatermarkSample(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  text: string,
  style: WatermarkStyle,
  fontSize: number
) {
  const line = text.trim();
  if (!line) return;
  const look = normalizeStyle(style);
  ctx.font = fontCss(look, fontSize, line);
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.direction = RTL.test(line) ? "rtl" : "ltr";
  ctx.lineJoin = "round";
  const halo = { color: haloRgba(look), width: Math.max(1, fontSize / 10) };
  const outlineColor = outlineRgba(look);
  const outline = outlineColor ? { color: outlineColor, width: outlineStroke(look, fontSize) } : undefined;
  // Deux rangées bien visibles : la première ordinaire, la seconde d'accent.
  const rows: RowOffset[] = [
    { row: 0, offset: 0 },
    { row: 2, offset: 0 },
  ];
  const plans = planRows(rows, Infinity, fontSize, look.color, look.opacity, rng(SAMPLE_SEED ^ ROW_STREAM), [2]);
  const tileRand = rng(SAMPLE_SEED ^ TILE_STREAM);
  const lineWidth = ctx.measureText(line).width;
  rows.forEach(({ row }, k) => {
    const tile = { ...tileVariation(tileRand, fontSize, 0, lineWidth), dx: 0, dy: 0 };
    const y = height * (k === 0 ? 0.3 : 0.72);
    drawWatermarkRun(ctx, line, width / 2, y, fontSize, look.wave, rowInk(plans.get(row)!, halo, outline), tile);
  });
}

function makeLayer(width: number, height: number): HTMLCanvasElement | OffscreenCanvas {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(Math.max(1, width), Math.max(1, height));
  const c = document.createElement("canvas");
  c.width = Math.max(1, width);
  c.height = Math.max(1, height);
  return c;
}

/** Encre d'une occurrence (voir rowInk). */
export type RunInk = {
  /** Remplissage (rgba). */
  fill: string;
  /** Halo de lisibilité ; absent : aucun (accent « à plat »). */
  halo?: { color: string; width: number };
  /** Contour sombre (outlineRgba, outlineStroke) ; absent : aucun. Exige un canevas transparent (calque). */
  outline?: { color: string; width: number };
  /** Ombre portée du remplissage. */
  shadow?: Shadow;
};

/**
 * Une occurrence du texte, centrée en (x, y), décalée et inclinée selon
 * `tile`. Onde à 0 : texte droit. Sinon chaque glyphe suit une sinusoïde
 * (phase, longueur d'onde et amplitude propres à l'occurrence), tangent à la pente.
 */
export function drawWatermarkRun(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  wave: number,
  ink: RunInk,
  tile: TileVariation = NO_TILE_VARIATION
) {
  const paint = (s: string, px: number, py: number) => {
    if (ink.halo) {
      ctx.strokeStyle = ink.halo.color;
      ctx.lineWidth = ink.halo.width;
      ctx.strokeText(s, px, py); // halo de lisibilité
    }
    if (ink.outline) {
      // Contour sombre autour des lettres, jamais dessus : trait double
      // largeur, puis intérieur évidé. Il garde sa densité (résistance aux
      // niveaux et à la sélection de couleur), et l'intérieur montre la
      // couleur choisie au lieu d'un gris sombre aux petites tailles.
      ctx.strokeStyle = ink.outline.color;
      ctx.lineWidth = ink.outline.width;
      ctx.strokeText(s, px, py);
      const op = ctx.globalCompositeOperation;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "#000";
      ctx.fillText(s, px, py);
      ctx.globalCompositeOperation = op;
    }
    ctx.fillStyle = ink.fill;
    // L'ombre ne vaut que pour le remplissage : posée sur l'évidement
    // (destination-out), elle creuserait aussi la page autour des lettres.
    if (ink.shadow) {
      ctx.shadowColor = ink.shadow.color;
      ctx.shadowOffsetX = ink.shadow.dx;
      ctx.shadowOffsetY = ink.shadow.dy;
      ctx.shadowBlur = ink.shadow.blur;
    }
    ctx.fillText(s, px, py);
    if (ink.shadow) {
      ctx.shadowColor = "rgba(0, 0, 0, 0)";
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
    }
  };

  ctx.save();
  ctx.translate(x + tile.dx, y + tile.dy);
  ctx.rotate(tile.tilt);
  // Écriture de droite à gauche (arabe, hébreu…) : poser les lettres une à une
  // inverserait le sens et casserait les liaisons. Le texte reste alors droit
  // (décalage et inclinaison propres à l'occurrence conservés).
  if (!(wave > 0) || RTL.test(text)) {
    paint(text, 0, 0);
    ctx.restore();
    return;
  }

  const chars = graphemes(text);
  const widths = chars.map((ch) => Math.max(ctx.measureText(ch).width, fontSize * 0.15));
  const total = widths.reduce((sum, w) => sum + w, 0);
  ctx.textAlign = "center";
  let cursor = -total / 2;
  for (let i = 0; i < chars.length; i++) {
    const width = widths[i];
    const mid = cursor + width / 2;
    const { dy, angle } = waveDisplacement(mid + total / 2, fontSize, wave, tile);
    ctx.save();
    ctx.translate(mid, dy);
    ctx.rotate(angle);
    paint(chars[i], 0, 0);
    ctx.restore();
    cursor += width;
  }
  ctx.restore();
}

const RTL = /[֐-ࣿיִ-﷿ﹰ-﻿]/;

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

/**
 * Déplacement vertical et rotation d'un glyphe le long de l'onde. `along` part
 * du début de la ligne ; `tile` porte la phase et les facteurs propres à l'occurrence.
 */
export function waveDisplacement(
  along: number,
  fontSize: number,
  wave: number,
  tile: Pick<TileVariation, "phase" | "wavelength" | "amplitude"> = NO_TILE_VARIATION
) {
  if (!(wave > 0)) return { dy: 0, angle: 0 };
  const amplitude = waveAmplitude(fontSize, wave) * tile.amplitude;
  const wavelength = Math.max(fontSize * 5 * tile.wavelength, 1);
  const theta = (along / wavelength) * Math.PI * 2 + tile.phase;
  const slope = Math.cos(theta) * ((amplitude * Math.PI * 2) / wavelength);
  return { dy: Math.sin(theta) * amplitude, angle: Math.atan(slope) };
}

export function watermarkMaxLineWidth(width: number, height: number, lineHeight: number) {
  return Math.SQRT2 * Math.min(width, height) * 0.9 - lineHeight;
}

async function ensureFont(style: WatermarkStyle, text: string) {
  // Sans texte (mode « signer » sans filigrane), rien ne sera écrit : aucune police à charger.
  if (!text.trim() || typeof document === "undefined" || !document.fonts?.load) return;
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
