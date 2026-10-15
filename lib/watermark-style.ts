// Réglages d'apparence du filigrane : police, taille, couleur, opacité.
// Pur et sérialisable : l'interface, le dessin canvas et le localStorage
// partagent le même objet, validé à chaque entrée.

export const WATERMARK_FONTS = ["mono", "sans", "serif"] as const;
export type WatermarkFontId = (typeof WATERMARK_FONTS)[number];

export type WatermarkStyle = {
  font: WatermarkFontId;
  /** Multiplicateur de la taille automatique (1 = le rendu historique, 0,5 par défaut). */
  scale: number;
  /** #rrggbb */
  color: string;
  /** 0–1 */
  opacity: number;
  /** 0 = ligne droite, 1 = ondulation pleine. */
  wave: number;
};

export const SCALE_PERCENT = { min: 20, max: 220, step: 5 } as const;
export const OPACITY_PERCENT = { min: 5, max: 100, step: 5 } as const;
export const WAVE_PERCENT = { min: 0, max: 100, step: 5 } as const;

// Par défaut : le réglage « Léger » (taille 50 %, opacité 25 %).
const SCALE = { min: 0.2, max: 2.2, step: 0.05, fallback: 0.5 };
const OPACITY = { min: 0.05, max: 1, step: 0.05, fallback: 0.25 };
const WAVE = { min: 0, max: 1, step: 0.05, fallback: 0 };

export const COLOR_SWATCHES = [
  { id: "seal", color: "#c4262e" },
  { id: "ink", color: "#1a1e33" },
  { id: "blue", color: "#223f92" },
  { id: "black", color: "#000000" },
  { id: "white", color: "#ffffff" },
] as const;

export type SwatchId = (typeof COLOR_SWATCHES)[number]["id"];

const FACES: Record<WatermarkFontId, { weight: number; family: string }> = {
  // Poids 600 : le rendu monospace historique. Un trait épais résiste mieux
  // à la retouche qu'un trait fin, facile à effacer au pinceau.
  mono: { weight: 600, family: "ui-monospace, monospace" },
  sans: { weight: 600, family: '"Space Grotesk Variable", system-ui, sans-serif' },
  serif: { weight: 600, family: 'Georgia, "Times New Roman", serif' },
};

export const DEFAULT_WATERMARK_STYLE: WatermarkStyle = {
  font: "mono",
  scale: SCALE.fallback,
  color: COLOR_SWATCHES[0].color,
  opacity: OPACITY.fallback,
  wave: WAVE.fallback,
};

const STORAGE_KEY = "wmStyle";

export function fontFace(font: WatermarkFontId) {
  return FACES[font] ?? FACES.mono;
}

/** Écritures liées (arabe, persan, hébreu…). */
const JOINED_SCRIPT = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/;

/** Kana : du japonais à coup sûr. */
const KANA = /[\u3040-\u30FF\u31F0-\u31FF]/;
/** Idéogrammes (japonais ou chinois). */
const HAN = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;

/**
 * Police propre à l'écriture du texte, celle de l'interface dans cette langue
 * (app/globals.css) : Cairo (arabe), Vazirmatn (persan), Noto Sans JP ou SC.
 * Des idéogrammes sans kana sont lus comme du chinois, sauf sur une page en
 * japonais. Texte latin : aucune.
 */
function scriptFont(text: string, joined: boolean): string | null {
  if (joined) return PERSIAN_LETTERS.test(text) ? '"Vazirmatn Variable"' : '"Cairo Variable"';
  if (KANA.test(text)) return '"Noto Sans JP Variable"';
  if (!HAN.test(text)) return null;
  const pageLang = typeof document === "undefined" ? "" : document.documentElement.lang;
  return pageLang.startsWith("ja") ? '"Noto Sans JP Variable"' : '"Noto Sans SC Variable"';
}

/** Lettres propres au persan : پ چ ژ گ, et ی ک persans (ي ك arabes exclus). */
const PERSIAN_LETTERS = /[\u067E\u0686\u0698\u06AF\u06CC\u06A9]/;

/**
 * Police CSS du filigrane. Avec `text` en arabe ou en persan, « Mono » passe
 * en sans-serif : aucune police à chasse fixe courante n'a ces écritures, et
 * le repli (souvent Courier New) dessine des lettres détachées, illisibles.
 * Les écritures non latines sont dessinées dans la police de l'interface pour
 * leur langue (scriptFont), le latin restant dans la police choisie.
 */
export function fontCss(style: WatermarkStyle, px: number, text = "") {
  const font = normalizeStyle(style).font;
  const joined = JOINED_SCRIPT.test(text);
  const face = fontFace(font === "mono" && joined ? "sans" : font);
  const script = scriptFont(text, joined);
  if (!script) return `${face.weight} ${px}px ${face.family}`;
  // Après la police latine choisie, avant tout repli système (Times New Roman,
  // system-ui… ont souvent des glyphes arabes moins soignés).
  const [first, ...rest] = face.family.split(", ");
  const family = [first, script, ...rest].join(", ");
  return `${face.weight} ${px}px ${family}`;
}

export function fillRgba(style: WatermarkStyle) {
  const s = normalizeStyle(style);
  const { r, g, b } = hexRgb(s.color);
  return `rgba(${r}, ${g}, ${b}, ${s.opacity})`;
}

/** Halo clair sur une encre sombre, halo sombre sur une encre claire.
 *  À l'opacité par défaut (0,45) le halo blanc reste à 0,35, comme avant. */
export function haloRgba(style: WatermarkStyle) {
  const s = normalizeStyle(style);
  const { r, g, b } = hexRgb(s.color);
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const rgb = lum > 0.72 ? "0, 0, 0" : "255, 255, 255";
  const alpha = Math.min(0.5, Math.round(((s.opacity * 0.35) / 0.45) * 1000) / 1000);
  return `rgba(${rgb}, ${alpha})`;
}

/** Identifie un filigrane déjà produit : texte + apparence. */
export function stampKey(text: string, style: WatermarkStyle) {
  const s = normalizeStyle(style);
  return `${text}\0${s.font}\0${s.scale}\0${s.color}\0${s.opacity}\0${s.wave}`;
}

export function normalizeStyle(input: unknown): WatermarkStyle {
  const src = input && typeof input === "object" ? (input as Partial<WatermarkStyle>) : {};
  return {
    font: isFont(src.font) ? src.font : DEFAULT_WATERMARK_STYLE.font,
    scale: snap(src.scale, SCALE),
    color: normalizeHex(src.color, DEFAULT_WATERMARK_STYLE.color),
    opacity: snap(src.opacity, OPACITY),
    wave: snap(src.wave, WAVE),
  };
}

export function readStyle(raw: string | null): WatermarkStyle {
  if (!raw) return normalizeStyle(undefined);
  try {
    return normalizeStyle(JSON.parse(raw));
  } catch {
    return normalizeStyle(undefined);
  }
}

export function serializeStyle(style: WatermarkStyle) {
  return JSON.stringify(normalizeStyle(style));
}

export const styleStorageKey = STORAGE_KEY;

function isFont(value: unknown): value is WatermarkFontId {
  return typeof value === "string" && (WATERMARK_FONTS as readonly string[]).includes(value);
}

function snap(
  value: unknown,
  bounds: { min: number; max: number; step: number; fallback: number }
) {
  if (typeof value !== "number" || !Number.isFinite(value)) return bounds.fallback;
  const clamped = Math.min(bounds.max, Math.max(bounds.min, value));
  const snapped = bounds.min + Math.round((clamped - bounds.min) / bounds.step) * bounds.step;
  const rounded = Math.round(snapped * 1000) / 1000;
  return Math.min(bounds.max, Math.max(bounds.min, rounded));
}

function normalizeHex(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const match = value.trim().match(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i);
  if (!match) return fallback;
  let hex = match[1].toLowerCase();
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  return `#${hex}`;
}

function hexRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}
