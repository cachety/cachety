// Lignes sous la signature (mention, lieu, date), dans la langue de la page.
// Dessinées dans la MÊME image que la signature : un seul geste pour placer
// le tout (docs/prd-sign.md §5, 2d).
//
// composeSignBlock et signDate sont purs (testés sous Bun) ;
// composeSignatureWithBlock dessine (navigateur).

import {
  canvas2d,
  ensureFont,
  finishSignature,
  type InkId,
  makeCanvas,
  type SignatureImage,
  signatureBitmap,
} from "@/lib/signature";
import { fontFace } from "@/lib/watermark-style";

export type SignBlockParts = { date?: string; place?: string; mention?: string };

/** Espaces et retours à la ligne ramenés à une seule espace (une ligne reste une ligne). */
const clean = (s: string | undefined) => (s ?? "").replace(/\s+/g, " ").trim();

/**
 * 0 à 2 lignes : la mention, puis « lieu, date ». Champs vides ignorés.
 * `joiner` sépare lieu et date (« , » par défaut ; « ، » en arabe, « 、 » en
 * japonais… au choix de l'appelant).
 */
export function composeSignBlock(parts: SignBlockParts, joiner = ", "): string[] {
  const mention = clean(parts.mention);
  const second = [clean(parts.place), clean(parts.date)].filter(Boolean).join(joiner);
  return [mention, second].filter(Boolean);
}

/** Date courte du jour dans la langue de la page (`t.locale`), comme `today()` de CoreProduct. */
export function signDate(locale: string, date: Date = new Date()): string {
  return date.toLocaleDateString(locale);
}

/** Gris foncé du texte, teinté comme l'encre pour rester assorti. */
export const BLOCK_COLOR: Record<InkId, string> = { black: "#4a4a4a", blue: "#3d4766" };
/** Taille du texte en fraction de la largeur de la signature (≈ 8–9 pt une fois posée à 28 % d'un A4). */
export const BLOCK_FONT_RATIO = 0.05;
/** Plancher quand une ligne longue doit tenir dans la largeur de la signature. */
export const BLOCK_FONT_MIN_RATIO = 0.04;
const LINE_HEIGHT = 1.35;
const GAP = 0.25;

/** Police sans-serif de l'interface, avec le relais de la langue (arabe, persan, japonais, chinois). */
function sansFamily(): string {
  if (typeof document !== "undefined") {
    const css = getComputedStyle(document.documentElement).getPropertyValue("--font-sans").trim();
    if (css) return css;
  }
  return fontFace("sans").family;
}

const blockFont = (px: number, family: string) => `500 ${px}px ${family}`;

/** Sens de la page (<html dir>) : en arabe et en persan, « lieu، date » se lit de droite à gauche. */
function pageDirection(): CanvasDirection {
  return typeof document !== "undefined" && document.documentElement.dir === "rtl" ? "rtl" : "ltr";
}

/**
 * Nouvelle signature : `lines` centrées sous l'image, en sans-serif gris
 * foncé, taille relative à la largeur de la signature. Toujours rognée et
 * transparente (même finition que finishSignature). Sans ligne : `sig` tel quel.
 */
export async function composeSignatureWithBlock(
  sig: SignatureImage,
  lines: string[],
  ink: InkId = "black",
  direction: CanvasDirection = pageDirection()
): Promise<SignatureImage> {
  const text = lines.map(clean).filter(Boolean);
  if (!text.length) return sig;
  const family = sansFamily();
  await ensureFont(blockFont(64, family), text.join(" "));

  const canvas = makeCanvas(1, 1);
  const ctx = canvas2d(canvas);

  // Taille : BLOCK_FONT_RATIO de la largeur, réduite jusqu'au plancher si une
  // ligne déborde ; au-delà, la toile s'élargit plutôt que de rendre illisible.
  let px = Math.round(sig.width * BLOCK_FONT_RATIO);
  ctx.font = blockFont(px, family);
  const widest = Math.max(...text.map((l) => ctx.measureText(l).width));
  if (widest > sig.width) px = Math.max(Math.round(sig.width * BLOCK_FONT_MIN_RATIO), Math.floor((px * sig.width) / widest));
  ctx.font = blockFont(px, family);
  const textWidth = Math.max(...text.map((l) => ctx.measureText(l).width));

  const lineHeight = Math.round(px * LINE_HEIGHT);
  const width = Math.ceil(Math.max(sig.width, textWidth + px));
  const height = sig.height + Math.round(px * GAP) + lineHeight * text.length + px;
  canvas.width = width;
  canvas.height = height;

  const bitmap = await signatureBitmap(sig);
  try {
    ctx.drawImage(bitmap, Math.round((width - sig.width) / 2), 0);
  } finally {
    bitmap.close();
  }
  ctx.font = blockFont(px, family);
  ctx.fillStyle = BLOCK_COLOR[ink] ?? BLOCK_COLOR.black;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  // Comme le nom tapé : sans cela, un nom de lieu latin dans une ligne arabe
  // ou persane (« Paris، ۱۴۰۵/۷/۲۵ ») s'afficherait dans le mauvais ordre.
  ctx.direction = direction;
  let y = sig.height + Math.round(px * GAP);
  for (const line of text) {
    ctx.fillText(line, width / 2, y);
    y += lineHeight;
  }
  try {
    return await finishSignature(ctx.getImageData(0, 0, width, height));
  } finally {
    canvas.width = 0;
    canvas.height = 0;
  }
}
