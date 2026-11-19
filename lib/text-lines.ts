// Couche texte d'une page de PDF → lignes, avec une boîte par caractère.
// Sert aux suggestions de masquage (lib/sensitive.ts) : on y cherche les IBAN,
// numéros de carte ou de sécurité sociale, puis on retrouve où ils sont sur
// la page. Pur (aucune dépendance à pdf.js ni au DOM) : testable sous Bun.
//
// Coordonnées des boîtes : fractions de la page telle qu'affichée (0–1,
// rotation comprise), le même repère que les masques (lib/masks.ts).
//
// docs/prd-suggested-areas.md §6.2.

export type CharBox = { x: number; y: number; w: number; h: number };
/** `boxes[i]` est la boîte de `text[i]` (unités UTF-16). */
export type Line = { text: string; boxes: CharBox[] };

/** Ce que l'on lit d'un élément de texte de pdf.js (TextItem). */
export type TextItemLike = {
  str: string;
  /** Matrice de texte en espace utilisateur : [a, b, c, d, e, f]. */
  transform: number[];
  /** Largeur de l'élément, en unités de l'espace utilisateur. */
  width: number;
  fontName?: string;
  hasEOL?: boolean;
  /** « ltr », « rtl » ou « ttb ». */
  dir?: string;
};
/** Ce que l'on lit d'un PageViewport de pdf.js. */
export type ViewportLike = { width: number; height: number; transform: number[] };
export type TextStyleLike = { ascent?: number; descent?: number; vertical?: boolean; fontFamily?: string };

/** Une ligne plus longue (texte forgé) est coupée en plusieurs : le coût de la recherche reste borné. */
export const MAX_LINE_CHARS = 2000;

// Largeurs relatives des caractères ASCII 32 à 126 (Helvetica, pour mille).
// Le PDF ne donne que la largeur totale d'un élément : on la répartit entre
// ses caractères selon ces poids plutôt qu'à parts égales. Sur « IBAN : FR76… »
// d'un seul tenant, la boîte de l'IBAN tombe ainsi au bon endroit dans la
// plupart des polices (les proportions de Times ou d'Arial sont voisines) ;
// les marges de rectsFor absorbent le reste.
const ASCII_WIDTHS = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556,
  556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833,
  722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500, 556,
  556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334,
  260, 334, 584,
];

/** Poids (largeur relative) d'une unité UTF-16 dans une police à chasse variable. */
function charWeight(code: number): number {
  if (code >= 32 && code < 127) return ASCII_WIDTHS[code - 32];
  // Seconde moitié d'une paire, marques combinantes, liants : aucune largeur propre.
  if ((code >= 0xdc00 && code <= 0xdfff) || (code >= 0x0300 && code <= 0x036f) || code === 0x200c || code === 0x200d)
    return 0;
  if ((code >= 0x064b && code <= 0x065f) || code === 0x0670) return 0; // voyelles brèves arabes
  if (code === 0xa0 || code === 0x202f || code === 0x2009) return 278; // espaces insécables et fines
  if (code >= 0x0590 && code <= 0x08ff && !isDigitCode(code)) return 480; // hébreu, arabe
  // CJC, kana, hangul, formes pleine chasse : un cadratin.
  if ((code >= 0x2e80 && code <= 0x9fff) || (code >= 0xac00 && code <= 0xd7af) || (code >= 0xff00 && code <= 0xff60))
    return 1000;
  return 556; // latin accentué, chiffres arabes et persans, le reste
}

function isRtlLetter(code: number) {
  return (code >= 0x0590 && code <= 0x08ff && !isDigitCode(code)) || (code >= 0xfb1d && code <= 0xfefc);
}
function isAsciiLetter(code: number) {
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}
function isDigitCode(code: number) {
  return (code >= 48 && code <= 57) || (code >= 0x0660 && code <= 0x0669) || (code >= 0x06f0 && code <= 0x06f9);
}
/** Lettre d'une écriture de gauche à droite : latin (accents compris), grec, cyrillique, CJC… */
function isLtrLetter(code: number) {
  return isAsciiLetter(code) || (code >= 0xc0 && code <= 0x058f) || (code >= 0x2e80 && code < 0xfb1d);
}

/**
 * Ordre d'affichage (de gauche à droite) des caractères d'un élément « rtl ».
 * pdf.js rend le texte dans l'ordre de lecture ; les glyphes, eux, sont posés
 * de gauche à droite sur la page. Version réduite de l'algorithme bidi : les
 * lettres de droite à gauche au niveau 1, les mots latins et les nombres au
 * niveau 2 (ils gardent leur sens). Rend, pour chaque position affichée,
 * l'index du caractère dans `str`.
 */
export function visualOrder(str: string): number[] {
  const n = str.length;
  // 1 : droite à gauche ; 2 : gauche à droite (latin, nombres) ; 0 : neutre.
  const level = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const c = str.charCodeAt(i);
    if (isRtlLetter(c)) level[i] = 1;
    else if (isLtrLetter(c) || isDigitCode(c)) level[i] = 2;
  }
  // Neutres : niveau 2 entre deux caractères de gauche à droite d'un même mot
  // ou d'un même nombre (« FR76 3000 », « 12.5 »), niveau 1 sinon. Un espace
  // entre deux groupes de chiffres sans lettre latine avant eux reste au
  // niveau 1, comme dans l'algorithme complet (les groupes s'y inversent).
  let latin = false;
  for (let i = 0; i < n; i++) {
    const c = str.charCodeAt(i);
    if (isRtlLetter(c)) latin = false;
    else if (isLtrLetter(c)) latin = true;
    if (level[i] !== 0) continue;
    let j = i;
    while (j < n && level[j] === 0) j++;
    const before = i > 0 ? level[i - 1] : 1;
    const after = j < n ? level[j] : 1;
    const single = j - i === 1 && ".,:/-+".includes(str[i]);
    const joins = before === 2 && after === 2 && (latin || single);
    for (let k = i; k < j; k++) level[k] = joins ? 2 : 1;
    i = j - 1;
  }
  const order: number[] = [];
  for (let i = n - 1; i >= 0; i--) {
    if (level[i] === 1) {
      order.push(i);
      continue;
    }
    let j = i;
    while (j >= 0 && level[j] === 2) j--;
    for (let k = j + 1; k <= i; k++) order.push(k);
    i = j + 1;
  }
  return order;
}

type Vec = [number, number];
/** Point transformé par une matrice [a, b, c, d, e, f]. */
const apply = (m: number[], x: number, y: number): Vec => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
/** Vecteur transformé (sans la translation). */
const applyVector = (m: number[], x: number, y: number): Vec => [m[0] * x + m[2] * y, m[1] * x + m[3] * y];

/** Un élément de texte placé sur la page affichée (pixels du viewport). */
type Placed = {
  str: string;
  /** Angle de la ligne de base, en degrés entiers (regroupe les éléments de même sens). */
  angle: number;
  /** Début et fin le long de la ligne de base, position en travers. */
  from: number;
  to: number;
  across: number;
  /** Hauteur de police et largeur moyenne d'un caractère, en pixels. */
  size: number;
  advance: number;
  /** Numéro de ligne d'après pdf.js : il change à chaque `hasEOL`. */
  segment: number;
  /** Sens du contenu : R (arabe, hébreu), L (latin, chiffres, CJC), N (ponctuation seule). */
  bidi: "L" | "R" | "N";
  boxes: CharBox[];
  /** Boîtes du caractère le plus à gauche et le plus à droite, tels qu'affichés. */
  leftBox: CharBox;
  rightBox: CharBox;
};

const finite = (...values: number[]) => values.every(Number.isFinite);

function bidiClass(str: string, dir: string | undefined): Placed["bidi"] {
  let strong = false;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (isRtlLetter(code)) return "R";
    if (isLtrLetter(code) || isDigitCode(code)) strong = true;
  }
  return dir === "rtl" ? "R" : strong ? "L" : "N";
}

function place(
  item: TextItemLike,
  viewport: ViewportLike,
  styles: Record<string, TextStyleLike> | undefined,
  segment: number
): Placed | null {
  const { str, transform: t, width } = item;
  // Les éléments faits d'espaces sont les « ponts » que pdf.js pose entre deux
  // morceaux d'une même ligne (parfois larges de toute une colonne) : c'est
  // l'écart mesuré entre les voisins qui décide, pas eux.
  if (!str || !str.trim() || !(width > 0) || !Array.isArray(t) || t.length < 6) return null;
  if (!finite(t[0], t[1], t[2], t[3], t[4], t[5], width)) return null;
  const style = (item.fontName && styles?.[item.fontName]) || undefined;
  // Écriture verticale (japonais, chinois) : hors périmètre de la v1.
  if (item.dir === "ttb" || style?.vertical) return null;

  const along = Math.hypot(t[0], t[1]);
  const fontSize = Math.hypot(t[2], t[3]);
  if (!(along > 0) || !(fontSize > 0)) return null;

  const v = viewport.transform;
  const origin = apply(v, t[4], t[5]);
  // Sens d'écriture et « haut » des glyphes, sur la page affichée.
  const dir = applyVector(v, t[0] / along, t[1] / along);
  const up = applyVector(v, t[2] / fontSize, t[3] / fontSize);
  const scale = Math.hypot(dir[0], dir[1]);
  const upScale = Math.hypot(up[0], up[1]);
  if (!(scale > 0) || !(upScale > 0) || !finite(origin[0], origin[1])) return null;
  const length = width * scale;
  const size = fontSize * upScale;
  const ux = dir[0] / scale;
  const uy = dir[1] / scale;
  const endX = origin[0] + ux * length;
  const endY = origin[1] + uy * length;

  // Hors de la page (certains PDF y rangent du texte) : ignoré.
  if (
    Math.max(origin[0], endX) < 0 ||
    Math.min(origin[0], endX) > viewport.width ||
    Math.max(origin[1], endY) < 0 ||
    Math.min(origin[1], endY) > viewport.height
  )
    return null;

  // Hauteur : taille de police × (ascendante − descendante) quand pdf.js les
  // connaît, sinon une fois la taille de police (0,8 au-dessus, 0,2 en dessous).
  const rawAscent = style?.ascent;
  const rawDescent = style?.descent;
  const ascent = Math.min(1.2, Math.max(0.5, rawAscent || (rawDescent ? 1 + rawDescent : 0.8)));
  const descent = Math.min(0, Math.max(-0.5, rawDescent || ascent - 1));

  // Part de la largeur de chaque caractère : égale en chasse fixe, pondérée sinon.
  const mono = style?.fontFamily === "monospace";
  const n = str.length;
  const weights = new Float64Array(n);
  let total = 0;
  for (let i = 0; i < n; i++) {
    const code = str.charCodeAt(i);
    const w = mono ? (code >= 0xdc00 && code <= 0xdfff ? 0 : 1) : charWeight(code);
    weights[i] = w;
    total += w;
  }
  if (!(total > 0)) return null;
  const order = item.dir === "rtl" ? visualOrder(str) : null;

  const nx = (up[0] / upScale) * size;
  const ny = (up[1] / upScale) * size;
  const boxes = new Array<CharBox>(n);
  let cursor = 0;
  for (let slot = 0; slot < n; slot++) {
    const i = order ? order[slot] : slot;
    const s0 = (cursor / total) * length;
    cursor += weights[i];
    const s1 = (cursor / total) * length;
    // Quadrilatère du caractère, puis sa boîte englobante droite.
    const x0 = origin[0] + ux * s0;
    const y0 = origin[1] + uy * s0;
    const x1 = origin[0] + ux * s1;
    const y1 = origin[1] + uy * s1;
    const left = Math.min(x0 + nx * ascent, x1 + nx * ascent, x0 + nx * descent, x1 + nx * descent);
    const right = Math.max(x0 + nx * ascent, x1 + nx * ascent, x0 + nx * descent, x1 + nx * descent);
    const top = Math.min(y0 + ny * ascent, y1 + ny * ascent, y0 + ny * descent, y1 + ny * descent);
    const bottom = Math.max(y0 + ny * ascent, y1 + ny * ascent, y0 + ny * descent, y1 + ny * descent);
    boxes[i] = {
      x: left / viewport.width,
      y: top / viewport.height,
      w: (right - left) / viewport.width,
      h: (bottom - top) / viewport.height,
    };
  }

  const angle = Math.round((Math.atan2(uy, ux) * 180) / Math.PI);
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const from = origin[0] * cos + origin[1] * sin;
  return {
    str,
    angle,
    from,
    to: from + length,
    across: -origin[0] * sin + origin[1] * cos,
    size,
    advance: length / n,
    segment,
    bidi: bidiClass(str, item.dir),
    boxes,
    leftBox: boxes[order ? order[0] : 0],
    rightBox: boxes[order ? order[n - 1] : n - 1],
  };
}

/** Page écrite surtout de droite à gauche (arabe, persan, hébreu) : les lignes se lisent depuis la droite. */
function mostlyRtl(texts: Iterable<string>): boolean {
  let rtl = 0;
  let ltr = 0;
  for (const text of texts) {
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (isRtlLetter(code)) rtl++;
      else if (isLtrLetter(code)) ltr++;
    }
  }
  return rtl > ltr;
}

function union(a: CharBox, b: CharBox): CharBox {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return { x, y, w: Math.max(a.x + a.w, b.x + b.w) - x, h: Math.max(a.y + a.h, b.y + b.h) - y };
}

/** Un élément, ou l'espace inséré entre deux éléments voisins (sa boîte fait le pont). */
type Unit = { item: Placed; space?: undefined } | { item?: undefined; space: CharBox };

/**
 * Ordre de lecture d'un segment de ligne sur une page de droite à gauche. Les
 * unités arrivent telles qu'affichées, de gauche à droite : on lit depuis la
 * droite, sauf les suites latines ou chiffrées (« GB29 NWBK 6016… »), qui
 * gardent leur sens.
 */
function readingOrderRtl(units: Unit[]): Unit[] {
  const n = units.length;
  const ltr = units.map((u) => u.item?.bidi === "L");
  const neutral = (u: Unit) => !u.item || u.item.bidi === "N";
  for (let i = 0; i < n; i++) {
    if (!neutral(units[i])) continue;
    // Neutres (espaces, ponctuation) : avec le latin s'ils en sont entourés.
    let j = i;
    while (j < n && neutral(units[j])) j++;
    const joins = i > 0 && j < n && ltr[i - 1] && ltr[j];
    for (let k = i; k < j; k++) ltr[k] = joins;
    i = j - 1;
  }
  const out: Unit[] = [];
  for (let i = n - 1; i >= 0; i--) {
    if (!ltr[i]) {
      out.push(units[i]);
      continue;
    }
    let j = i;
    while (j >= 0 && ltr[j]) j--;
    for (let k = j + 1; k <= i; k++) out.push(units[k]);
    i = j + 1;
  }
  return out;
}

/**
 * Regroupe les éléments de texte d'une page en lignes, d'après leur ligne de
 * base, puis estime une boîte par caractère.
 *
 * - Même ligne : lignes de base à moins de 0,3 × la hauteur de police, et
 *   éléments qui se touchent presque (écart < 1,5 × la largeur moyenne d'un
 *   caractère). Deux colonnes donnent donc deux lignes.
 * - Une espace est insérée quand l'écart dépasse 0,25 × cette largeur.
 * - `hasEOL` termine la ligne.
 * - Sont ignorés : les éléments vides, faits d'espaces ou de largeur nulle,
 *   hors de la page, en écriture verticale, et les doublons posés au même
 *   endroit (faux gras).
 * - Le texte invisible (mode de rendu 3 des PDF passés à l'OCR) est gardé.
 *
 * Les lignes sortent dans l'ordre de lecture : de haut en bas, puis de
 * gauche à droite (de droite à gauche sur une page arabe ou persane).
 */
export function linesFromItems(
  items: TextItemLike[],
  viewport: ViewportLike,
  styles?: Record<string, TextStyleLike>
): Line[] {
  if (!(viewport.width > 0) || !(viewport.height > 0)) return [];
  const placed: Placed[] = [];
  let segment = 0;
  for (const item of items) {
    if (!item || typeof item.str !== "string") continue;
    const p = place(item, viewport, styles, segment);
    if (item.hasEOL) segment++;
    if (p) placed.push(p);
  }
  if (!placed.length) return [];

  const rtl = mostlyRtl(placed.map((p) => p.str));
  const byAngle = new Map<number, Placed[]>();
  for (const p of placed) {
    const list = byAngle.get(p.angle);
    if (list) list.push(p);
    else byAngle.set(p.angle, [p]);
  }

  const lines: Line[] = [];
  const emit = (units: Unit[]) => {
    let text = "";
    const boxes: CharBox[] = [];
    for (const u of rtl ? readingOrderRtl(units) : units) {
      if (u.item) {
        text += u.item.str;
        for (const b of u.item.boxes) boxes.push(b);
      } else {
        text += " ";
        boxes.push(u.space);
      }
    }
    for (let i = 0; i < text.length; i += MAX_LINE_CHARS) {
      lines.push({ text: text.slice(i, i + MAX_LINE_CHARS), boxes: boxes.slice(i, i + MAX_LINE_CHARS) });
    }
  };

  const angles = [...byAngle.keys()].sort((a, b) => Math.abs(a) - Math.abs(b) || a - b);
  for (const angle of angles) {
    const group = byAngle.get(angle)!;
    group.sort((a, b) => a.across - b.across || a.from - b.from);
    // Rangées : éléments de même ligne de base (comparée au premier de la rangée).
    let row: Placed[] = [];
    const flush = () => {
      if (!row.length) return;
      // Tels qu'affichés, de gauche à droite ; coupés là où l'écart est trop
      // grand (autre colonne), où pdf.js a vu une fin de ligne, ou quand deux
      // éléments se recouvrent largement.
      row.sort((a, b) => a.from - b.from);
      const segments: Unit[][] = [];
      let units: Unit[] = [];
      let prev: Placed | null = null;
      for (const p of row) {
        // Faux gras : le même texte dessiné deux fois, à peine décalé.
        if (prev && p.str === prev.str && p.from - prev.from < 0.25 * p.size) continue;
        if (prev) {
          const gap = p.from - prev.to;
          const advance = (prev.advance + p.advance) / 2;
          if (p.segment !== prev.segment || gap >= 1.5 * advance || gap < -1.5 * advance) {
            segments.push(units);
            units = [];
          } else if (
            gap > 0.25 * advance &&
            !(prev.bidi === "L" && prev.str.endsWith(" ")) &&
            !(p.bidi === "L" && p.str.startsWith(" "))
          ) {
            units.push({ space: union(prev.rightBox, p.leftBox) });
          }
        }
        units.push({ item: p });
        prev = p;
      }
      segments.push(units);
      if (rtl) segments.reverse();
      segments.forEach(emit);
      row = [];
    };
    for (const p of group) {
      if (row.length && Math.abs(p.across - row[0].across) > 0.3 * Math.min(p.size, row[0].size)) flush();
      row.push(p);
    }
    flush();
  }
  return lines;
}

/** Voisinage d'une ligne sur la page, pour la recherche des libellés (lib/sensitive.ts). */
export type LineNeighbours = {
  /** Segments de la même rangée, juste avant dans le sens de lecture (autre colonne), du plus proche au plus loin. */
  before: number[];
  /** Lignes de la rangée du dessus qui surplombent celle-ci. */
  above: number[];
  /** Ligne qui continue celle-ci juste en dessous (IBAN coupé en fin de colonne). */
  next?: number;
};

type Span = { index: number; from: number; to: number; top: number; bottom: number; turn: number };

/** Boîte d'une ligne dans un repère où elle se lit à l'horizontale (pages tournées comprises). */
function spanOf(line: Line, index: number): Span | null {
  const boxes = line.boxes.filter((b) => b && b.w > 0 && b.h > 0);
  if (!boxes.length) return null;
  const box = boxes.reduce(union);
  const first = boxes[0];
  const lastBox = boxes[boxes.length - 1];
  const dx = lastBox.x + lastBox.w / 2 - (first.x + first.w / 2);
  const dy = lastBox.y + lastBox.h / 2 - (first.y + first.h / 2);
  // Quart de tour de la ligne : 0 (horizontale), 1 (lue vers le bas), 3 (lue vers le haut).
  const vertical = boxes.length > 1 ? Math.abs(dy) > Math.abs(dx) : box.h > box.w * 4;
  if (!vertical) return { index, from: box.x, to: box.x + box.w, top: box.y, bottom: box.y + box.h, turn: 0 };
  return dy >= 0
    ? { index, from: box.y, to: box.y + box.h, top: 1 - box.x - box.w, bottom: 1 - box.x, turn: 1 }
    : { index, from: 1 - box.y - box.h, to: 1 - box.y, top: box.x, bottom: box.x + box.w, turn: 3 };
}

/** Nombre de lignes voisines examinées au plus de chaque côté : borne le coût sur une page forgée. */
const NEIGHBOUR_SCAN = 48;

/**
 * Pour chaque ligne : les segments qui la précèdent sur la même rangée, les
 * lignes juste au-dessus, et celle qui la continue en dessous. Fonction pure
 * des boîtes ; une ligne sans boîte (élaguée) n'a pas de voisine.
 */
export function lineNeighbours(lines: Line[]): LineNeighbours[] {
  const out: LineNeighbours[] = lines.map(() => ({ before: [], above: [] }));
  const rtl = mostlyRtl(lines.map((l) => l.text));
  const spans = lines.map(spanOf).filter((s): s is Span => !!s);
  for (const turn of [0, 1, 3]) {
    const sorted = spans.filter((s) => s.turn === turn).sort((a, b) => a.top - b.top || a.from - b.from);
    for (let i = 0; i < sorted.length; i++) {
      const s = sorted[i];
      const height = s.bottom - s.top;
      const middle = (s.top + s.bottom) / 2;
      const sameRow = (o: Span) => Math.abs((o.top + o.bottom) / 2 - middle) < 0.5 * Math.min(height, o.bottom - o.top);
      const overlaps = (o: Span) => Math.min(o.to, s.to) - Math.max(o.from, s.from) > 0;
      const isBefore = (o: Span) => (rtl ? o.from >= s.to - 0.01 : o.to <= s.from + 0.01);
      const before: Span[] = [];
      const aboveRow: Span[] = [];
      for (let j = i - 1; j >= 0 && i - j <= NEIGHBOUR_SCAN; j--) {
        const o = sorted[j];
        if (sameRow(o)) {
          if (isBefore(o)) before.push(o);
          continue;
        }
        if (s.top - o.bottom > 2.5 * height) break;
        if (o.bottom > middle || !overlaps(o)) continue;
        // Seule la rangée la plus proche compte.
        if (aboveRow.length && Math.abs(o.top - aboveRow[0].top) > 0.5 * height) break;
        aboveRow.push(o);
      }
      for (let j = i + 1; j < sorted.length && j - i <= NEIGHBOUR_SCAN; j++) {
        const o = sorted[j];
        if (sameRow(o)) {
          if (isBefore(o)) before.push(o);
          continue;
        }
        if (o.top - s.bottom > 1.6 * height) break;
        if (o.top < middle || !overlaps(o)) continue;
        out[s.index].next = o.index;
        break;
      }
      before.sort((a, b) => (rtl ? a.from - b.from : b.to - a.to));
      aboveRow.sort((a, b) => a.from - b.from);
      out[s.index].before = before.slice(0, 2).map((o) => o.index);
      out[s.index].above = aboveRow.slice(0, 3).map((o) => o.index);
    }
  }
  return out;
}
