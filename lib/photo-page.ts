// Mode « dossier » : une photo devient une page. Ici, la préparation du
// canvas, dans l'ordre fixé par docs/prd-dossier.md §6.3 : recadrage et
// redressement, rotation, nettoyage. Les masques, la signature et le
// filigrane sont ensuite peints par lib/watermark.ts, comme sur toute page.
//
// Les calculs sur les pixels sont dans lib/photo-fix.ts (purs, testés sans
// navigateur) ; ce fichier ne fait que les brancher sur un canvas.

import { a4PageFor } from "@/lib/files";
import type { PageEdit } from "@/lib/pages";
import { autoLevels, clampQuad, isUsableQuad, outputSize, toGray, warp } from "@/lib/photo-fix";

/** Largeur maximale d'une vignette (docs/prd-dossier.md §6.3). */
export const THUMB_MAX_WIDTH = 320;
const THUMB_QUALITY = 0.6;

/**
 * Côté le plus long de la photo telle qu'elle est lue avant redressement :
 * deux fois la page produite, assez pour un rééchantillonnage net, et un
 * redressement qui reste rapide même pour une photo de 12 mégapixels.
 */
const SOURCE_FACTOR = 2;

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext("2d", { willReadFrequently: false });
  if (!ctx) throw new Error("canvas_unavailable");
  return { canvas, ctx };
}

/**
 * Taille en pixels de la page d'une image de `width` × `height` : la page A4
 * qui la contient (a4PageFor), à l'échelle de rendu des pages de PDF, jamais
 * plus grande que l'image elle-même (agrandir n'ajouterait que du poids).
 */
export function pagePixels(width: number, height: number, renderScale: number) {
  const page = a4PageFor(width, height);
  const scale = Math.min(1, (page.width * renderScale) / width, (page.height * renderScale) / height);
  return { w: Math.max(1, Math.round(width * scale)), h: Math.max(1, Math.round(height * scale)) };
}

/**
 * Canvas de la page d'une photo, retouches comprises. `bitmap` n'est ni fermé
 * ni modifié. Tracé inutilisable (croisé, aplati) : la photo entière.
 */
export function photoCanvas(bitmap: ImageBitmap, edit: PageEdit | undefined, renderScale: number): HTMLCanvasElement {
  const quad = edit?.crop && isUsableQuad(clampQuad(edit.crop)) ? clampQuad(edit.crop) : null;
  let page: HTMLCanvasElement;
  if (quad) {
    // Photo lue à une taille bornée, puis chaque pixel de la page va chercher sa couleur dedans.
    const drawn = outputSize(quad, bitmap.width, bitmap.height, "auto");
    const target = pagePixels(drawn.w, drawn.h, renderScale);
    const longest = Math.max(target.w, target.h) * SOURCE_FACTOR;
    const shrink = Math.min(1, longest / Math.max(drawn.w, drawn.h));
    const source = makeCanvas(bitmap.width * shrink, bitmap.height * shrink);
    source.ctx.imageSmoothingQuality = "high";
    source.ctx.drawImage(bitmap, 0, 0, source.canvas.width, source.canvas.height);
    const pixels = source.ctx.getImageData(0, 0, source.canvas.width, source.canvas.height);
    source.canvas.width = 0;
    const straight = warp(pixels, quad, target.w, target.h);
    const out = makeCanvas(straight.width, straight.height);
    out.ctx.putImageData(new ImageData(straight.data as Uint8ClampedArray<ArrayBuffer>, straight.width, straight.height), 0, 0);
    page = out.canvas;
  } else {
    const target = pagePixels(bitmap.width, bitmap.height, renderScale);
    const out = makeCanvas(target.w, target.h);
    out.ctx.imageSmoothingQuality = "high";
    out.ctx.drawImage(bitmap, 0, 0, out.canvas.width, out.canvas.height);
    page = out.canvas;
  }

  if (edit?.rotate) {
    const quarter = edit.rotate === 90 || edit.rotate === 270;
    const out = makeCanvas(quarter ? page.height : page.width, quarter ? page.width : page.height);
    out.ctx.translate(out.canvas.width / 2, out.canvas.height / 2);
    out.ctx.rotate((edit.rotate * Math.PI) / 180);
    out.ctx.drawImage(page, -page.width / 2, -page.height / 2);
    // Repère remis d'aplomb : masques et filigrane se peignent ensuite sur la page telle qu'elle s'affiche.
    out.ctx.setTransform(1, 0, 0, 1, 0, 0);
    page.width = 0;
    page = out.canvas;
  }

  if (edit?.clean && (edit.clean.whiten || edit.clean.gray)) {
    const ctx = page.getContext("2d");
    if (!ctx) throw new Error("canvas_unavailable");
    let pixels: { data: Uint8ClampedArray; width: number; height: number } = ctx.getImageData(0, 0, page.width, page.height);
    // Blanchir d'abord, désaturer ensuite (docs/prd-dossier.md §5.7).
    if (edit.clean.whiten) pixels = autoLevels(pixels);
    if (edit.clean.gray) pixels = toGray(pixels);
    ctx.putImageData(new ImageData(pixels.data as Uint8ClampedArray<ArrayBuffer>, pixels.width, pixels.height), 0, 0);
  }
  return page;
}

/** Vignette JPEG d'une page rendue, depuis son canvas (avant qu'il soit libéré) : aucune seconde passe de rendu. */
export async function thumbnailOf(canvas: HTMLCanvasElement, width: number): Promise<string> {
  const w = Math.max(1, Math.min(THUMB_MAX_WIDTH, Math.round(width), canvas.width));
  const small = makeCanvas(w, (canvas.height * w) / canvas.width);
  small.ctx.imageSmoothingQuality = "high";
  small.ctx.drawImage(canvas, 0, 0, small.canvas.width, small.canvas.height);
  const blob = await new Promise<Blob>((resolve, reject) =>
    small.canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export_failed"))), "image/jpeg", THUMB_QUALITY)
  );
  small.canvas.width = 0;
  return URL.createObjectURL(blob);
}
