// Zones masquées (caviardage) : rectangles noirs peints sur la page rendue,
// AVANT le filigrane. La sortie étant entièrement rastérisée, ce qui est
// sous un masque n'existe plus dans le fichier produit : ni texte, ni pixel.
//
// Coordonnées en fractions de la page telle qu'affichée (0–1, rotation
// comprise) : indépendantes de la résolution de rendu et de l'aperçu.

export type MaskRect = { x: number; y: number; w: number; h: number };
/** Masques par page (index 0). */
export type PageMasks = Record<number, MaskRect[]>;

/** Plus petit côté retenu : un simple clic ne crée pas de masque invisible. */
export const MIN_MASK_SIDE = 0.01;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Rectangle tracé entre deux points (dans n'importe quel sens), borné à la page. */
export function rectFromDrag(x0: number, y0: number, x1: number, y1: number): MaskRect | null {
  const left = clamp01(Math.min(x0, x1));
  const top = clamp01(Math.min(y0, y1));
  const w = clamp01(Math.max(x0, x1)) - left;
  const h = clamp01(Math.max(y0, y1)) - top;
  if (![left, top, w, h].every(Number.isFinite)) return null;
  return w >= MIN_MASK_SIDE && h >= MIN_MASK_SIDE ? { x: left, y: top, w, h } : null;
}

export function addMask(masks: PageMasks | undefined, page: number, rect: MaskRect): PageMasks {
  return { ...masks, [page]: [...(masks?.[page] ?? []), rect] };
}

export function removeMask(masks: PageMasks | undefined, page: number, index: number): PageMasks {
  const rest = (masks?.[page] ?? []).filter((_, i) => i !== index);
  const next = { ...masks };
  if (rest.length) next[page] = rest;
  else delete next[page];
  return next;
}

export function clearPageMasks(masks: PageMasks | undefined, page: number): PageMasks {
  const next = { ...masks };
  delete next[page];
  return next;
}

export const maskCount = (masks: PageMasks | undefined) =>
  Object.values(masks ?? {}).reduce((n, list) => n + list.length, 0);

/** Clé stable : deux jeux de masques identiques donnent la même clé (ordre des pages compris). */
export function masksKey(masks: PageMasks | undefined) {
  if (!masks) return "";
  return Object.keys(masks)
    .map(Number)
    .sort((a, b) => a - b)
    .map((p) => `${p}:${masks[p].map((r) => [r.x, r.y, r.w, r.h].map((v) => v.toFixed(4)).join(",")).join(";")}`)
    .join("|");
}

/** Peint les masques d'une page sur un canvas de `width` × `height`. */
export function paintMasks(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  rects: MaskRect[] | undefined
) {
  if (!rects?.length) return;
  ctx.save();
  ctx.fillStyle = "#000000";
  // Arrondi vers l'extérieur : aucun liseré de pixels d'origine au bord.
  for (const r of rects) {
    const x0 = Math.floor(r.x * width);
    const y0 = Math.floor(r.y * height);
    const x1 = Math.ceil((r.x + r.w) * width);
    const y1 = Math.ceil((r.y + r.h) * height);
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  }
  ctx.restore();
}
