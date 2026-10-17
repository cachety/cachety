// Signature posée sur la page (mode « signer ») : image peinte sur la page
// rendue, APRÈS les masques et AVANT le filigrane. Comme pour les masques, la
// sortie est entièrement rastérisée : la signature fait partie des pixels de
// la page, on ne peut ni la déplacer ni la retirer en éditant le PDF.
//
// Coordonnées en fractions de la page telle qu'affichée (0–1, rotation
// comprise) : indépendantes de la résolution, et non inversées en RTL.
// `w` est une fraction de la largeur de page, `h` de sa hauteur : sur une page
// non carrée, un rectangle qui garde le rapport de l'image n'a donc pas w = h.
// Les rapports (« aspect ») sont toujours largeur / hauteur.

export type OverlayRect = { x: number; y: number; w: number; h: number };
export type Overlay = { rect: OverlayRect; image: "signature" | "initials" };
/** Signatures par page (index 0). */
export type PageOverlays = Record<number, Overlay[]>;
/** Paraphe absent : la signature elle-même, réduite (docs/prd-sign.md §13, question 3). */
export type OverlayImages = { signature: ImageBitmap; initials?: ImageBitmap };

export const DEFAULT_SIGNATURE_WIDTH = 0.28;
export const DEFAULT_INITIALS_WIDTH = 0.16;
export const EDGE_MARGIN = 0.06;
/** Plus petite largeur retenue en édition (fraction de page) : la poignée reste saisissable. */
export const MIN_OVERLAY_SIDE = 0.02;
/**
 * Largeur minimale peinte, en pixels du rendu (pages rendues à 2×) : en
 * dessous, une signature n'est plus qu'une tache. Le moteur l'agrandit
 * autour de son centre ; l'interface prévient avec overlayTooSmall.
 */
export const MIN_OVERLAY_PX = 120;

const finiteOr = (v: number, fallback: number) => (Number.isFinite(v) ? v : fallback);
const aspectOr1 = (v: number) => (Number.isFinite(v) && v > 0 ? v : 1);

/** Hauteur normalisée d'un rectangle de largeur `w` qui garde le rapport de l'image. */
const heightFor = (w: number, pageAspect: number, imageAspect: number) =>
  (w * aspectOr1(pageAspect)) / aspectOr1(imageAspect);

/**
 * Placement par défaut : en bas à droite, marges EDGE_MARGIN, rapport de
 * l'image conservé. Une image très haute sur une page paysage est réduite
 * pour tenir entre les marges plutôt que de déborder.
 */
export function defaultPlacement(
  pageAspect: number,
  imageAspect: number,
  width = DEFAULT_SIGNATURE_WIDTH
): OverlayRect {
  const room = 1 - 2 * EDGE_MARGIN;
  let w = Math.min(room, Math.max(MIN_OVERLAY_SIDE, finiteOr(width, DEFAULT_SIGNATURE_WIDTH)));
  let h = heightFor(w, pageAspect, imageAspect);
  if (h > room) {
    w *= room / h;
    h = room;
  }
  return { x: 1 - EDGE_MARGIN - w, y: 1 - EDGE_MARGIN - h, w, h };
}

/** Déplace un rectangle sans le faire sortir de la page (sa taille ne change pas). */
export function moveRect(r: OverlayRect, dx: number, dy: number): OverlayRect {
  return clampToPage({ ...r, x: r.x + finiteOr(dx, 0), y: r.y + finiteOr(dy, 0) });
}

/**
 * Nouvelle largeur `w`, rapport conservé. « corner » : coin haut-gauche fixe
 * (poignée bas-droite), bornée à la place restante. « center » : autour du
 * centre (touches + / −), recalée dans la page si elle touche un bord.
 */
export function resizeKeepingRatio(
  rect: OverlayRect,
  w: number,
  anchor: "corner" | "center" = "corner"
): OverlayRect {
  const r = clampToPage(rect);
  const ratio = r.w > 0 && r.h > 0 ? r.h / r.w : 1;
  const wanted = Math.max(MIN_OVERLAY_SIDE, finiteOr(w, r.w));
  if (anchor === "corner") {
    const max = Math.min(1 - r.x, (1 - r.y) / ratio);
    const next = Math.max(Math.min(MIN_OVERLAY_SIDE, max), Math.min(max, wanted));
    return { x: r.x, y: r.y, w: next, h: next * ratio };
  }
  const next = Math.min(wanted, 1, 1 / ratio);
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  return clampToPage({ x: cx - next / 2, y: cy - (next * ratio) / 2, w: next, h: next * ratio });
}

/** Ramène un rectangle dans la page : réduit (rapport conservé) s'il est plus grand, puis recalé. */
export function clampToPage(r: OverlayRect): OverlayRect {
  let w = r.w > 0 ? finiteOr(r.w, MIN_OVERLAY_SIDE) : MIN_OVERLAY_SIDE;
  let h = r.h > 0 ? finiteOr(r.h, w) : w;
  const k = Math.min(1, 1 / w, 1 / h);
  w *= k;
  h *= k;
  return {
    x: Math.min(1 - w, Math.max(0, finiteOr(r.x, 0))),
    y: Math.min(1 - h, Math.max(0, finiteOr(r.y, 0))),
    w,
    h,
  };
}

/**
 * Clé stable : deux jeux identiques donnent la même clé, quel que soit
 * l'ordre des pages (ou leur passage par JSON). Une page vide compte comme
 * absente : elle ne change pas le rendu. Dans une page, l'ordre est gardé
 * (c'est l'ordre de peinture).
 */
export function overlaysKey(overlays: PageOverlays | undefined): string {
  if (!overlays) return "";
  return Object.keys(overlays)
    .map(Number)
    .filter((p) => overlays[p]?.length)
    .sort((a, b) => a - b)
    .map(
      (p) =>
        `${p}:${overlays[p]
          .map((o) => `${o.image}@${[o.rect.x, o.rect.y, o.rect.w, o.rect.h].map((v) => v.toFixed(4)).join(",")}`)
          .join(";")}`
    )
    .join("|");
}

const carriesSignature = (list: Overlay[] | undefined) => !!list?.some((o) => o.image === "signature");

/** Pages (index 0) qui reçoivent un paraphe : toutes, sauf celles qui portent la signature. */
export function initialsPages(pageCount: number, overlays: PageOverlays | undefined): number[] {
  const pages: number[] = [];
  for (let p = 0; p < pageCount; p++) if (!carriesSignature(overlays?.[p])) pages.push(p);
  return pages;
}

/** Paraphe : même coin que la signature, plus petit. Calculé page par page (formats mêlés). */
export const initialsRect = (pageAspect: number, imageAspect: number) =>
  defaultPlacement(pageAspect, imageAspect, DEFAULT_INITIALS_WIDTH);

/**
 * Ce qui est peint sur une page : ses propres placements, plus le paraphe
 * si `initials` est fourni (option « parapher chaque page ») et que la page
 * ne porte pas la signature. Le rapport de page est celui du rendu réel.
 */
export function overlaysOnPage(
  overlays: PageOverlays | undefined,
  page: number,
  initials?: { pageAspect: number; imageAspect: number }
): Overlay[] {
  const own = overlays?.[page] ?? [];
  if (!initials || carriesSignature(own)) return own;
  return [...own, { rect: initialsRect(initials.pageAspect, initials.imageAspect), image: "initials" }];
}

/** Vrai si la signature serait peinte sous MIN_OVERLAY_PX (page de `pageWidthPx` pixels au rendu). */
export const overlayTooSmall = (rect: OverlayRect, pageWidthPx: number) =>
  rect.w * pageWidthPx < MIN_OVERLAY_PX;

/**
 * Rectangle en pixels d'un canvas de `width` × `height`. Plus étroit que
 * MIN_OVERLAY_PX : agrandi autour de son centre (rapport conservé), sans
 * jamais dépasser le canvas ni en sortir. Null si le rectangle est vide.
 */
export function overlayPixelRect(rect: OverlayRect, width: number, height: number) {
  let w = rect.w * width;
  let h = rect.h * height;
  if (![rect.x, rect.y, w, h].every(Number.isFinite) || !(w > 0) || !(h > 0)) return null;
  const cx = (rect.x + rect.w / 2) * width;
  const cy = (rect.y + rect.h / 2) * height;
  const grow = Math.max(1, MIN_OVERLAY_PX / w);
  const fit = Math.min(width / (w * grow), height / (h * grow), 1);
  w *= grow * fit;
  h *= grow * fit;
  return {
    x: Math.min(width - w, Math.max(0, cx - w / 2)),
    y: Math.min(height - h, Math.max(0, cy - h / 2)),
    w,
    h,
  };
}

/** Peint les signatures d'une page sur un canvas de `width` × `height`. */
export function paintOverlays(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  overlays: Overlay[] | undefined,
  images: OverlayImages | undefined
): void {
  if (!overlays?.length || !images) return;
  ctx.save();
  // La signature est exportée à 1200 px au moins : le rendu réduit, il
  // n'agrandit presque jamais. Lissage soigné pour un trait net.
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  for (const o of overlays) {
    const bitmap = o.image === "initials" ? (images.initials ?? images.signature) : images.signature;
    const px = bitmap && overlayPixelRect(o.rect, width, height);
    if (px) ctx.drawImage(bitmap, px.x, px.y, px.w, px.h);
  }
  ctx.restore();
}
