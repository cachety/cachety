// Variation aléatoire du filigrane, rangée par rangée et occurrence par
// occurrence : teinte, ombre, lignes d'accent, phase de l'onde, inclinaison.
//
// But : qu'aucune partie du filigrane ne soit un motif répété à l'identique.
// Une occurrence identique à toutes les autres s'apprend comme un gabarit
// (une seule à détourer, puis recherche du même motif dans la page) ; une
// couleur unique s'efface en la sélectionnant. Tout est tiré d'une graine :
// une même graine redonne le même dessin (tests, aperçus stables).
//
// Pur et sans canvas : testé dans lib/watermark-variation.test.ts.

/** mulberry32 : générateur rapide, suffisant ici (aucun secret en jeu, la graine vient de crypto). */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rand = () => number;
export type Rgb = { r: number; g: number; b: number };
export type Hsl = { h: number; s: number; l: number };

const between = (rand: Rand, min: number, max: number) => min + rand() * (max - min);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function hexToHsl(hex: string): Hsl {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const c = max - min;
  if (!c) return { h: 0, s: 0, l };
  const s = c / (1 - Math.abs(2 * l - 1));
  const h = max === r ? ((g - b) / c + 6) % 6 : max === g ? (b - r) / c + 2 : (r - g) / c + 4;
  return { h: h * 60, s, l };
}

export function hslToRgb({ h, s, l }: Hsl): Rgb {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const [r1, g1, b1] =
    hp < 1 ? [c, x, 0] : hp < 2 ? [x, c, 0] : hp < 3 ? [0, c, x] : hp < 4 ? [0, x, c] : hp < 5 ? [x, 0, c] : [c, 0, x];
  const m = l - c / 2;
  const to = (v: number) => Math.round(clamp01(v + m) * 255);
  return { r: to(r1), g: to(g1), b: to(b1) };
}

/** Écart circulaire entre deux teintes, en degrés (0–180). */
export const hueDistance = (a: number, b: number) => {
  const d = Math.abs((((a - b) % 360) + 360) % 360);
  return d > 180 ? 360 - d : d;
};

/** Luminance relative approchée (même formule que le halo, lib/watermark-style.ts). */
const luminance = ({ r, g, b }: Rgb) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

export const rgba = ({ r, g, b }: Rgb, alpha: number) => `rgba(${r}, ${g}, ${b}, ${Math.round(alpha * 1000) / 1000})`;

/**
 * Écart d'une rangée à la couleur choisie : la couleur reste reconnaissable,
 * mais aucun pixel n'a exactement la même valeur d'une rangée à l'autre
 * (la baguette magique à tolérance serrée n'en prend qu'une).
 */
export const SHADE_SPREAD = { hue: 10, saturation: 0.12, lightness: 0.08 } as const;

/** Sous ce seuil, la couleur est un gris (noir, blanc…) : elle reste neutre. */
const NEUTRAL_SATURATION = 0.05;

export function rowShade(color: string, rand: Rand): Rgb {
  const base = hexToHsl(color);
  const neutral = base.s < NEUTRAL_SATURATION;
  return hslToRgb({
    h: base.h + between(rand, -SHADE_SPREAD.hue, SHADE_SPREAD.hue),
    s: neutral ? base.s : clamp01(base.s + between(rand, -SHADE_SPREAD.saturation, SHADE_SPREAD.saturation)),
    l: clamp01(base.l + between(rand, -SHADE_SPREAD.lightness, SHADE_SPREAD.lightness)),
  });
}

/**
 * Teintes d'accent possibles : rouge, brun, orange, vert, sarcelle, bleu,
 * violet, magenta. Une couleur choisie saturée reçoit des accents à 90° au
 * moins de sa teinte : une sélection « par couleur » de l'encre les manque.
 * Une couleur neutre (noir, blanc, gris) reçoit des accents chauds.
 */
export const ACCENT_HUES = [0, 22, 35, 140, 175, 200, 225, 285, 320] as const;
const WARM_HUES = [0, 22, 35] as const;
export const ACCENT_MIN_HUE_DISTANCE = 90;
/** Saturation sous laquelle la couleur choisie n'a pas de teinte qui compte. */
const CHROMATIC = 0.15;

export function accentHues(color: string): readonly number[] {
  const { h, s } = hexToHsl(color);
  if (s < CHROMATIC) return WARM_HUES;
  return ACCENT_HUES.filter((a) => hueDistance(a, h) >= ACCENT_MIN_HUE_DISTANCE);
}

export type Accent = {
  /**
   * « deep » : presque noir et presque neutre, comme le texte du document.
   * Il survit à la sélection par couleur (trop peu saturé) et aux niveaux
   * (assez sombre une fois mélangé au blanc). « color » : franc, d'une
   * teinte éloignée de l'encre.
   */
  kind: "deep" | "color";
  rgb: Rgb;
  opacity: number;
};

/** Opacité plancher des accents : à 25 %, un orange disparaît sur du blanc. */
export const ACCENT_MIN_OPACITY = { color: 0.6, deep: 0.78 } as const;

/** Encre claire (blanc sur photo sombre) : accents clairs, sinon invisibles sur le fond. */
const LIGHT_INK = 0.72;

export function accentInk(color: string, opacity: number, kind: Accent["kind"], rand: Rand): Accent {
  const hues = accentHues(color);
  const hue = hues[Math.floor(rand() * hues.length)] + between(rand, -6, 6);
  const light = luminance(hslToRgb(hexToHsl(color))) > LIGHT_INK;
  const hsl: Hsl =
    kind === "deep"
      ? light
        ? { h: hue, s: between(rand, 0.1, 0.2), l: between(rand, 0.86, 0.92) }
        : { h: hue, s: between(rand, 0.2, 0.35), l: between(rand, 0.09, 0.13) }
      : light
        ? { h: hue, s: between(rand, 0.55, 0.8), l: between(rand, 0.62, 0.72) }
        : { h: hue, s: between(rand, 0.55, 0.8), l: between(rand, 0.3, 0.42) };
  return { kind, rgb: hslToRgb(hsl), opacity: Math.max(opacity, ACCENT_MIN_OPACITY[kind]) };
}

/**
 * Nombre de rangées d'accent parmi `visible` rangées : un quart, au moins
 * deux, jamais toutes (la couleur choisie doit rester majoritaire).
 */
export function accentCount(visible: number) {
  if (visible <= 1) return 0;
  if (visible === 2) return 1;
  return Math.min(visible - 1, Math.max(2, Math.round(visible * 0.25)));
}

/**
 * Rangées d'accent tirées parmi `rows` (indices entiers), espacées : deux
 * rangées voisines ne sont accentuées que s'il n'y a pas d'autre choix.
 */
export function pickAccentRows(rows: readonly number[], count: number, rand: Rand): number[] {
  const pool = [...rows];
  for (let i = pool.length - 1; i > 0; i--) {
    const k = Math.floor(rand() * (i + 1));
    [pool[i], pool[k]] = [pool[k], pool[i]];
  }
  const picked: number[] = [];
  for (const row of pool) {
    if (picked.length >= count) break;
    if (picked.every((p) => Math.abs(p - row) > 1)) picked.push(row);
  }
  for (const row of pool) {
    if (picked.length >= count) break;
    if (!picked.includes(row)) picked.push(row);
  }
  return picked;
}

export type Shadow = { dx: number; dy: number; blur: number; color: string };

/**
 * Ombre portée d'une rangée : direction, distance, flou et densité tirés au
 * hasard, dans des bornes qui gardent le texte net. Sombre et neutre : elle
 * se comporte comme un contour d'un seul côté, que ni la sélection par
 * couleur ni les niveaux ne séparent du texte du document.
 */
export function rowShadow(fontSize: number, opacity: number, rand: Rand): Shadow {
  const angle = rand() * Math.PI * 2;
  const distance = Math.max(1, fontSize * between(rand, 0.03, 0.07));
  // Flou une fois sur deux, et léger : un flou large salit la page, grossit
  // le JPEG et coûte cher à dessiner (une ombre par glyphe en mode ondulé).
  const blur = rand() < 0.5 ? 0 : fontSize * between(rand, 0.01, 0.05);
  const alpha = Math.min(0.75, between(rand, 0.25, 0.4) + opacity * 0.35);
  return {
    dx: Math.cos(angle) * distance,
    dy: Math.sin(angle) * distance,
    blur,
    color: `rgba(20, 20, 24, ${Math.round(alpha * 1000) / 1000})`,
  };
}

/** Variation propre à une occurrence du texte. */
export type TileVariation = {
  /** Phase de l'onde, en radians. */
  phase: number;
  /** Facteurs de longueur d'onde et d'amplitude. */
  wavelength: number;
  amplitude: number;
  /** Inclinaison propre, en radians, autour du centre de l'occurrence. */
  tilt: number;
  /** Décalages, en pixels, dans le repère de la rangée. */
  dx: number;
  dy: number;
};

export const NO_TILE_VARIATION: TileVariation = { phase: 0, wavelength: 1, amplitude: 1, tilt: 0, dx: 0, dy: 0 };

/** Bornes des facteurs d'onde : l'écart vertical du pavage prévoit l'amplitude maximale. */
export const TILE_WAVE = { min: 0.85, max: 1.15 } as const;
const MAX_TILT = (2 * Math.PI) / 180;

/**
 * `room` : marge verticale libre entre deux rangées, crêtes d'onde comprises
 * (lib/watermark.ts). Une occurrence s'en écarte au plus de 30 % (décalage et
 * inclinaison cumulés) : deux voisines, même opposées, ne se touchent pas.
 */
export function tileVariation(rand: Rand, fontSize: number, room: number, lineWidth: number): TileVariation {
  const budget = Math.max(0, room) * 0.3;
  const dyMax = budget * 0.4;
  const tiltMax = Math.min(MAX_TILT, Math.asin(Math.min(1, (budget * 0.6) / Math.max(1, lineWidth / 2))));
  return {
    phase: rand() * Math.PI * 2,
    wavelength: between(rand, TILE_WAVE.min, TILE_WAVE.max),
    amplitude: between(rand, TILE_WAVE.min, TILE_WAVE.max),
    tilt: between(rand, -tiltMax, tiltMax),
    dx: between(rand, -0.3, 0.3) * fontSize,
    dy: between(rand, -dyMax, dyMax),
  };
}

/** Flux indépendants d'une même graine (rangées, occurrences), pour que l'un ne décale pas l'autre. */
export const ROW_STREAM = 0x51ed2701;
export const TILE_STREAM = 0xa3c59ac3;

/** Une rangée du pavage : son indice et sa distance au centre de la page, le long de la normale. */
export type RowOffset = { row: number; offset: number };

/** Encre d'une rangée : nuance et ombre, ou accent « à plat ». */
export type RowPlan = { fill: string; shadow: Shadow; accent: Accent | null };

/** Part de la demi-étendue où une rangée traverse assez la page pour qu'un accent s'y voie. */
const ACCENT_CORE = 0.7;

/**
 * Plan de toutes les rangées. `extent` : demi-étendue de la page le long de
 * la normale aux rangées ; seules les rangées visibles comptent pour les
 * accents (une rangée hors page ne protège rien), de préférence celles qui
 * traversent le cœur de la page plutôt qu'un coin. La première rangée
 * d'accent est « deep » (presque noire, presque neutre), les autres en couleur.
 * `forced` : rangées d'accent imposées (aperçu de l'interface).
 */
export function planRows(
  rows: readonly RowOffset[],
  extent: number,
  fontSize: number,
  color: string,
  opacity: number,
  rand: Rand,
  forced?: readonly number[]
): Map<number, RowPlan> {
  let accents: number[];
  if (forced) {
    accents = [...forced];
  } else {
    const visible = rows.filter((r) => Math.abs(r.offset) < extent - fontSize / 2);
    const core = visible.filter((r) => Math.abs(r.offset) < extent * ACCENT_CORE);
    const count = accentCount(visible.length);
    const pool = core.length >= count ? core : visible;
    accents = pickAccentRows(pool.map((r) => r.row), count, rand);
  }
  const plans = new Map<number, RowPlan>();
  for (const { row } of rows) {
    const order = accents.indexOf(row);
    const fill = rgba(rowShade(color, rand), opacity);
    const shadow = rowShadow(fontSize, opacity, rand);
    const kind = order === 0 && !forced ? "deep" : "color";
    const accent = order < 0 ? null : accentInk(color, opacity, kind, rand);
    plans.set(row, { fill, shadow, accent });
  }
  return plans;
}
