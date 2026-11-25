// Photo d'une feuille de papier (mode « dossier ») : redresser et recadrer la
// feuille désignée par ses quatre coins, puis la nettoyer (fond blanchi, noir
// et blanc). Des fonctions pures sur des tableaux de pixels : testables sans
// navigateur (lib/photo-fix.test.ts), comme lib/signature.ts. Aucune
// dépendance, aucun réseau : tout se passe sur l'appareil.

import type { Point, Quad } from "@/lib/pages";

export type { Point, Quad };

/** Ce qu'il faut d'un ImageData : pixels RVBA, 4 octets par pixel. */
export type ImageDataLike = { data: Uint8ClampedArray; width: number; height: number };

/** Format de la page redressée : imposé, tel que tracé, ou choisi d'après le tracé. */
export type Paper = "a4" | "letter" | "free" | "auto";

/** Coins par défaut : à 4 % des bords de la photo (docs/prd-dossier.md §5.6). */
export const DEFAULT_QUAD: Quad = [
  { x: 0.04, y: 0.04 },
  { x: 0.96, y: 0.04 },
  { x: 0.96, y: 0.96 },
  { x: 0.04, y: 0.96 },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Coins bornés à l'image, valeurs illisibles remplacées par le coin par défaut. */
export function clampQuad(quad: Quad): Quad {
  return quad.map((p, i) => ({
    x: Number.isFinite(p?.x) ? clamp01(p.x) : DEFAULT_QUAD[i].x,
    y: Number.isFinite(p?.y) ? clamp01(p.y) : DEFAULT_QUAD[i].y,
  })) as Quad;
}

/**
 * Le tracé est-il un quadrilatère utilisable (convexe, coins dans le sens
 * horaire, assez grand) ? Un tracé croisé ou aplati donnerait une page
 * retournée ou une division par zéro.
 */
export function isUsableQuad(quad: Quad): boolean {
  let area = 0;
  for (let i = 0; i < 4; i++) {
    const a = quad[i];
    const b = quad[(i + 1) % 4];
    const c = quad[(i + 2) % 4];
    const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
    // Repère de l'image (y vers le bas) : sens horaire = produit vectoriel positif.
    if (!(cross > 1e-6)) return false;
    area += a.x * b.y - b.x * a.y;
  }
  return Math.abs(area) / 2 >= 0.01;
}

/**
 * Homographie 3×3 (par lignes) qui envoie le carré unité sur `quad` :
 * (0,0) → coin haut-gauche, (1,0) → haut-droit, (1,1) → bas-droit, (0,1) →
 * bas-gauche. C'est la solution du système 8×8 des quatre correspondances,
 * écrite en forme close (Heckbert, 1989). Le dernier coefficient vaut 1.
 */
export function homography(quad: Quad): Float64Array {
  const [p0, p1, p2, p3] = quad;
  const sx = p0.x - p1.x + p2.x - p3.x;
  const sy = p0.y - p1.y + p2.y - p3.y;
  let g = 0;
  let h = 0;
  if (Math.abs(sx) > 1e-12 || Math.abs(sy) > 1e-12) {
    const dx1 = p1.x - p2.x;
    const dx2 = p3.x - p2.x;
    const dy1 = p1.y - p2.y;
    const dy2 = p3.y - p2.y;
    const den = dx1 * dy2 - dx2 * dy1;
    if (Math.abs(den) < 1e-12) throw new Error("photo_quad_invalid");
    g = (sx * dy2 - dx2 * sy) / den;
    h = (dx1 * sy - sx * dy1) / den;
  }
  return Float64Array.of(
    p1.x - p0.x + g * p1.x,
    p3.x - p0.x + h * p3.x,
    p0.x,
    p1.y - p0.y + g * p1.y,
    p3.y - p0.y + h * p3.y,
    p0.y,
    g,
    h,
    1
  );
}

/** Image du point (u, v) du carré unité par l'homographie `m`. */
export function project(m: Float64Array, u: number, v: number): Point {
  const w = m[6] * u + m[7] * v + m[8];
  return { x: (m[0] * u + m[1] * v + m[2]) / w, y: (m[3] * u + m[4] * v + m[5]) / w };
}

/** Petit côté sur grand côté. */
const A4_RATIO = 210 / 297;
const LETTER_RATIO = 8.5 / 11;
/** Écart toléré pour reconnaître un A4 (6 %) ou une Letter (3 % : au-delà, les deux se confondraient). */
export const A4_TOLERANCE = 0.06;
export const LETTER_TOLERANCE = 0.03;

/**
 * Taille (en pixels de la photo) de la page redressée. « free » : telle que
 * tracée (le plus long de chaque paire de côtés opposés). « a4 », « letter » :
 * mêmes proportions que la feuille, en portrait ou en paysage selon le tracé,
 * à surface égale. « auto » : A4 si le tracé en est à moins de 6 %, Letter à
 * moins de 3 %, sinon tel que tracé.
 */
export function outputSize(quad: Quad, imgW: number, imgH: number, paper: Paper = "auto"): { w: number; h: number } {
  const side = (a: Point, b: Point) => Math.hypot((b.x - a.x) * imgW, (b.y - a.y) * imgH);
  const w = Math.max(side(quad[0], quad[1]), side(quad[3], quad[2]), 1);
  const h = Math.max(side(quad[0], quad[3]), side(quad[1], quad[2]), 1);
  const ratio = Math.min(w, h) / Math.max(w, h);
  const near = (target: number, tolerance: number) => Math.abs(ratio / target - 1) <= tolerance;
  const target =
    paper === "a4" || (paper === "auto" && near(A4_RATIO, A4_TOLERANCE))
      ? A4_RATIO
      : paper === "letter" || (paper === "auto" && near(LETTER_RATIO, LETTER_TOLERANCE))
        ? LETTER_RATIO
        : null;
  if (target === null) return { w: Math.max(1, Math.round(w)), h: Math.max(1, Math.round(h)) };
  // Même surface, proportions de la feuille : ni l'un ni l'autre côté n'est favorisé.
  const long = Math.sqrt((w * h) / target);
  const short = long * target;
  return w > h
    ? { w: Math.max(1, Math.round(long)), h: Math.max(1, Math.round(short)) }
    : { w: Math.max(1, Math.round(short)), h: Math.max(1, Math.round(long)) };
}

/**
 * Redresse le quadrilatère `quad` de `src` en un rectangle de `w` × `h` :
 * chaque pixel de sortie va chercher sa couleur dans la photo (projection
 * inverse), par interpolation bilinéaire. La photo d'origine n'est pas modifiée.
 */
export function warp(src: ImageDataLike, quad: Quad, w: number, h: number): ImageDataLike {
  const job = warpJob(src, quad, w, h);
  job.rows(0, job.out.height);
  return job.out;
}

/**
 * Le même redressement, ligne par ligne : `rows(from, to)` remplit les lignes
 * demandées de `out`. Pour traiter une grande photo sans figer la page
 * (lib/pace.ts) ; `warp` fait tout d'un coup.
 */
export function warpJob(src: ImageDataLike, quad: Quad, w: number, h: number): { out: ImageDataLike; rows: (from: number, to: number) => void } {
  const width = Math.max(1, Math.floor(w));
  const height = Math.max(1, Math.floor(h));
  const m = homography(quad);
  const out = new Uint8ClampedArray(width * height * 4);
  const s = src.data;
  const sw = src.width;
  const sh = src.height;
  const maxX = sw - 1;
  const maxY = sh - 1;
  // Le long d'une ligne, numérateurs et dénominateur sont linéaires en u : un pas constant.
  const du = 1 / width;
  const ax = m[0] * du * sw;
  const ay = m[3] * du * sh;
  const aw = m[6] * du;
  const rows = (from: number, to: number) => {
  let o = from * width * 4;
  for (let j = from; j < to; j++) {
    const v = (j + 0.5) / height;
    const u0 = 0.5 / width;
    let nx = (m[0] * u0 + m[1] * v + m[2]) * sw;
    let ny = (m[3] * u0 + m[4] * v + m[5]) * sh;
    let nw = m[6] * u0 + m[7] * v + m[8];
    for (let i = 0; i < width; i++) {
      // Centre du pixel : −0,5 ramène aux coordonnées des échantillons.
      let x = nx / nw - 0.5;
      let y = ny / nw - 0.5;
      nx += ax;
      ny += ay;
      nw += aw;
      if (x < 0) x = 0;
      else if (x > maxX) x = maxX;
      if (y < 0) y = 0;
      else if (y > maxY) y = maxY;
      const x0 = x | 0;
      const y0 = y | 0;
      const x1 = x0 < maxX ? x0 + 1 : x0;
      const y1 = y0 < maxY ? y0 + 1 : y0;
      const fx = x - x0;
      const fy = y - y0;
      const w00 = (1 - fx) * (1 - fy);
      const w10 = fx * (1 - fy);
      const w01 = (1 - fx) * fy;
      const w11 = fx * fy;
      const i00 = (y0 * sw + x0) * 4;
      const i10 = (y0 * sw + x1) * 4;
      const i01 = (y1 * sw + x0) * 4;
      const i11 = (y1 * sw + x1) * 4;
      out[o] = s[i00] * w00 + s[i10] * w10 + s[i01] * w01 + s[i11] * w11;
      out[o + 1] = s[i00 + 1] * w00 + s[i10 + 1] * w10 + s[i01 + 1] * w01 + s[i11 + 1] * w11;
      out[o + 2] = s[i00 + 2] * w00 + s[i10 + 2] * w10 + s[i01 + 2] * w01 + s[i11 + 2] * w11;
      out[o + 3] = 255;
      o += 4;
    }
  }
  };
  return { out: { data: out, width, height }, rows };
}

/** Luminance perçue (Rec. 601), comme le reste du projet. */
const luma = (r: number, g: number, b: number) => 0.299 * r + 0.587 * g + 0.114 * b;

/**
 * Niveaux automatiques : le point noir est la luminance du 2e centile (l'encre),
 * le point blanc celle du 98e (le papier), mesuré canal par canal sur les
 * pixels de cette luminance, ce qui retire la dominante de l'éclairage. Puis
 * une courbe douce (en S) : le papier devient blanc, l'encre reste sombre.
 * Une image presque noire est rendue telle quelle.
 */
export function autoLevels(img: ImageDataLike, low = 2, high = 98): ImageDataLike {
  const { data, width, height } = img;
  const out = new Uint8ClampedArray(data.length);
  const tables = levelTables(img, low, high);
  if (!tables) out.set(data);
  else applyTables(data, out, tables, 0, data.length);
  return { data: out, width, height };
}

/** Courbes de `autoLevels`, une par canal ; null : image presque noire, rien à blanchir. */
export type LevelTables = [Uint8ClampedArray, Uint8ClampedArray, Uint8ClampedArray];

/** Applique les courbes aux octets `from`..`to` (multiples de 4) de `data`, dans `out`. */
export function applyTables(data: ArrayLike<number>, out: Uint8ClampedArray, tables: LevelTables, from: number, to: number) {
  const [r, g, b] = tables;
  for (let i = from; i < to; i += 4) {
    out[i] = r[data[i]];
    out[i + 1] = g[data[i + 1]];
    out[i + 2] = b[data[i + 2]];
    out[i + 3] = data[i + 3];
  }
}

/** Mesure de `autoLevels` : points noir et blanc, puis la courbe de chaque canal. */
export function levelTables(img: ImageDataLike, low = 2, high = 98): LevelTables | null {
  const { data, width, height } = img;
  const count = width * height;
  const hist = new Uint32Array(256);
  const lum = new Uint8Array(count);
  for (let p = 0, i = 0; p < count; p++, i += 4) {
    const l = Math.round(luma(data[i], data[i + 1], data[i + 2]));
    lum[p] = l;
    hist[l]++;
  }
  const at = (percent: number) => {
    const rank = Math.min(count - 1, Math.max(0, Math.ceil((percent / 100) * count) - 1));
    let seen = 0;
    for (let l = 0; l < 256; l++) {
      seen += hist[l];
      if (seen > rank) return l;
    }
    return 255;
  };
  const whiteLum = at(high);
  // Feuille presque vide (moins de 2 % d'encre) : le 2e centile est déjà du
  // papier. Le point noir ne monte donc jamais au-dessus de la moitié du
  // point blanc : le papier blanchit quand même, l'encre reste sombre.
  const black = Math.min(at(low), Math.floor(whiteLum / 2));
  // Image presque noire : rien à blanchir.
  if (!count || whiteLum < 16) return null;
  // Point blanc de chaque canal : moyenne des pixels dont la luminance est celle du 98e centile.
  const sum = [0, 0, 0];
  for (let p = 0, i = 0; p < count; p++, i += 4) {
    if (lum[p] !== whiteLum) continue;
    sum[0] += data[i];
    sum[1] += data[i + 1];
    sum[2] += data[i + 2];
  }
  const n = hist[whiteLum];
  const luts = sum.map((total) => {
    // Jamais sous le point noir (canal absent d'une encre de couleur…).
    const white = Math.max(black + 8, total / n);
    const lut = new Uint8ClampedArray(256);
    for (let v = 0; v < 256; v++) {
      const t = clamp01((v - black) / (white - black));
      lut[v] = Math.round(255 * t * t * (3 - 2 * t));
    }
    return lut;
  });
  return luts as LevelTables;
}

/**
 * Noir et blanc : chaque pixel prend sa luminance. Pas un seuil à 1 bit, qui
 * abîmerait la photo d'une pièce d'identité.
 */
export function toGray(img: ImageDataLike): ImageDataLike {
  const { data, width, height } = img;
  const out = new Uint8ClampedArray(data.length);
  grayInto(data, out, 0, data.length);
  return { data: out, width, height };
}

/** `toGray` sur les octets `from`..`to` (multiples de 4) de `data`, dans `out` (qui peut être `data`). */
export function grayInto(data: ArrayLike<number>, out: Uint8ClampedArray, from: number, to: number) {
  for (let i = from; i < to; i += 4) {
    const l = Math.round(luma(data[i], data[i + 1], data[i + 2]));
    out[i] = l;
    out[i + 1] = l;
    out[i + 2] = l;
    out[i + 3] = data[i + 3];
  }
}

/** Coin déplacé de (dx, dy), borné à l'image ; les autres coins ne bougent pas. */
export function moveCorner(quad: Quad, index: number, dx: number, dy: number): Quad {
  return quad.map((p, i) => (i === index ? { x: clamp01(p.x + dx), y: clamp01(p.y + dy) } : p)) as Quad;
}
