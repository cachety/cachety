import { describe, expect, test } from "bun:test";
import {
  autoLevels,
  clampQuad,
  DEFAULT_QUAD,
  homography,
  isUsableQuad,
  moveCorner,
  outputSize,
  project,
  toGray,
  warp,
  type ImageDataLike,
  type Quad,
} from "./photo-fix";

const UNIT: Quad = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
];

/** Une feuille vue de biais : aucun côté parallèle à un autre. */
const TILTED: Quad = [
  { x: 0.21, y: 0.12 },
  { x: 0.83, y: 0.19 },
  { x: 0.91, y: 0.86 },
  { x: 0.09, y: 0.78 },
];

function image(width: number, height: number, paint: (x: number, y: number) => [number, number, number]): ImageDataLike {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const [r, g, b] = paint(x, y);
      data.set([r, g, b, 255], (y * width + x) * 4);
    }
  return { data, width, height };
}
const pixel = (img: ImageDataLike, x: number, y: number) => Array.from(img.data.subarray((y * img.width + x) * 4, (y * img.width + x) * 4 + 3));

describe("homographie (redresser une photo)", () => {
  test("carré unité : l'identité", () => {
    const m = homography(UNIT);
    const identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    for (let i = 0; i < 9; i++) expect(m[i]).toBeCloseTo(identity[i], 12);
  });

  test("un quadrilatère connu : ses quatre coins, à 1e-9 près", () => {
    const m = homography(TILTED);
    const corners: [number, number][] = [[0, 0], [1, 0], [1, 1], [0, 1]];
    corners.forEach(([u, v], i) => {
      const p = project(m, u, v);
      expect(Math.abs(p.x - TILTED[i].x)).toBeLessThan(1e-9);
      expect(Math.abs(p.y - TILTED[i].y)).toBeLessThan(1e-9);
    });
  });

  test("les droites restent droites : le milieu d'un côté tombe sur ce côté", () => {
    const m = homography(TILTED);
    const mid = project(m, 0.5, 0);
    const [a, b] = TILTED;
    // Aligné avec les deux coins du haut (produit vectoriel nul), et entre eux.
    expect(Math.abs((b.x - a.x) * (mid.y - a.y) - (b.y - a.y) * (mid.x - a.x))).toBeLessThan(1e-12);
    expect(mid.x).toBeGreaterThan(a.x);
    expect(mid.x).toBeLessThan(b.x);
  });

  test("un parallélogramme : transformation affine (pas de perspective)", () => {
    const m = homography([
      { x: 0.1, y: 0.1 },
      { x: 0.7, y: 0.2 },
      { x: 0.8, y: 0.8 },
      { x: 0.2, y: 0.7 },
    ]);
    expect(m[6]).toBe(0);
    expect(m[7]).toBe(0);
  });

  test("tracé aplati : refusé plutôt qu'une division par zéro", () => {
    const flat: Quad = [
      { x: 0.1, y: 0.5 },
      { x: 0.9, y: 0.5 },
      { x: 0.5, y: 0.5 },
      { x: 0.3, y: 0.5 },
    ];
    expect(() => homography(flat)).toThrow("photo_quad_invalid");
    expect(isUsableQuad(flat)).toBe(false);
  });

  test("tracé utilisable : convexe, dans le sens horaire, assez grand", () => {
    expect(isUsableQuad(DEFAULT_QUAD)).toBe(true);
    expect(isUsableQuad(TILTED)).toBe(true);
    // Croisé (deux coins échangés), ou dans l'autre sens.
    expect(isUsableQuad([TILTED[1], TILTED[0], TILTED[2], TILTED[3]])).toBe(false);
    expect(isUsableQuad([TILTED[3], TILTED[2], TILTED[1], TILTED[0]])).toBe(false);
    // Minuscule.
    expect(isUsableQuad([{ x: 0.5, y: 0.5 }, { x: 0.52, y: 0.5 }, { x: 0.52, y: 0.52 }, { x: 0.5, y: 0.52 }])).toBe(false);
  });

  test("coins bornés à l'image ; valeurs illisibles : coin par défaut (4 % des bords)", () => {
    expect(DEFAULT_QUAD[0]).toEqual({ x: 0.04, y: 0.04 });
    expect(DEFAULT_QUAD[2]).toEqual({ x: 0.96, y: 0.96 });
    const q = clampQuad([{ x: -1, y: 2 }, { x: Number.NaN, y: 0.5 }, TILTED[2], TILTED[3]]);
    expect(q[0]).toEqual({ x: 0, y: 1 });
    expect(q[1]).toEqual({ x: 0.96, y: 0.5 });
    expect(moveCorner(DEFAULT_QUAD, 0, -0.5, 0.005)[0]).toEqual({ x: 0, y: 0.045 });
    expect(moveCorner(DEFAULT_QUAD, 0, 0.02, 0)[1]).toBe(DEFAULT_QUAD[1]);
  });
});

describe("redressement des pixels (warp)", () => {
  test("carré unité, même taille : l'image, inchangée", () => {
    const src = image(8, 6, (x, y) => [x * 30, y * 40, (x + y) * 10]);
    const out = warp(src, UNIT, 8, 6);
    expect(Array.from(out.data)).toEqual(Array.from(src.data));
  });

  test("un damier vu de biais redevient un damier aux lignes droites", () => {
    // Photo 200 × 200 : le damier 8 × 8 n'existe qu'à l'intérieur du tracé.
    const m = homography(TILTED);
    // Projection inverse pour peindre la photo : on cherche (u, v) par balayage du quadrillage.
    const size = 200;
    const src = image(size, size, () => [128, 128, 128]);
    for (let j = 0; j < 400; j++)
      for (let i = 0; i < 400; i++) {
        const u = (i + 0.5) / 400;
        const v = (j + 0.5) / 400;
        const p = project(m, u, v);
        const x = Math.min(size - 1, Math.floor(p.x * size));
        const y = Math.min(size - 1, Math.floor(p.y * size));
        const dark = (Math.floor(u * 8) + Math.floor(v * 8)) % 2 === 0;
        src.data.set(dark ? [0, 0, 0, 255] : [255, 255, 255, 255], (y * size + x) * 4);
      }
    const out = warp(src, TILTED, 160, 160);
    // Au centre de chaque case (20 px de côté), la bonne couleur : les frontières sont donc droites.
    let wrong = 0;
    for (let cy = 0; cy < 8; cy++)
      for (let cx = 0; cx < 8; cx++) {
        const [r] = pixel(out, cx * 20 + 10, cy * 20 + 10);
        const dark = (cx + cy) % 2 === 0;
        if (dark ? r > 80 : r < 175) wrong++;
      }
    expect(wrong).toBe(0);
    // Le long d'une frontière horizontale (v = 1/8), la couleur bascule au même endroit sur toute la largeur d'une case.
    for (const x of [4, 10, 16]) {
      expect(pixel(out, x, 14)[0]).toBeLessThan(90);
      expect(pixel(out, x, 26)[0]).toBeGreaterThan(165);
    }
  });

  test("la sortie a la taille demandée, opaque", () => {
    const out = warp(image(10, 10, () => [10, 20, 30]), TILTED, 7.9, 3.2);
    expect([out.width, out.height]).toEqual([7, 3]);
    expect(out.data.length).toBe(7 * 3 * 4);
    for (let i = 3; i < out.data.length; i += 4) expect(out.data[i]).toBe(255);
  });
});

describe("taille de la page redressée", () => {
  const rect = (w: number, h: number): Quad => [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: h },
    { x: 0, y: h },
  ];

  test("tel que tracé : le plus long de chaque paire de côtés", () => {
    expect(outputSize(rect(0.5, 0.25), 1000, 1000, "free")).toEqual({ w: 500, h: 250 });
    const trapezoid: Quad = [{ x: 0.2, y: 0 }, { x: 0.8, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];
    const size = outputSize(trapezoid, 1000, 500, "free");
    expect(size.w).toBe(1000);
    expect(size.h).toBe(Math.round(Math.hypot(200, 500)));
  });

  test("auto : A4 si le tracé en est à moins de 6 %, en portrait comme en paysage", () => {
    // 700 × 1000 : rapport 0,70, à 1 % de l'A4 (0,7071).
    const portrait = outputSize(rect(0.7, 1), 1000, 1000);
    expect(portrait.w / portrait.h).toBeCloseTo(210 / 297, 2);
    expect(portrait.h).toBeGreaterThan(portrait.w);
    const landscape = outputSize(rect(1, 0.7), 1000, 1000);
    expect(landscape.h / landscape.w).toBeCloseTo(210 / 297, 2);
    // À 5 % : encore A4. À 7 % : tel que tracé.
    const five = outputSize(rect(0.7071 * 1.05, 1), 2000, 2000);
    expect(five.w / five.h).toBeCloseTo(210 / 297, 3);
    const seven = outputSize(rect(0.7071 * 0.93, 1), 2000, 2000);
    expect(seven).toEqual({ w: Math.round(0.7071 * 0.93 * 2000), h: 2000 });
  });

  test("auto : Letter reconnue de près, un ticket de caisse reste tel que tracé", () => {
    const letter = outputSize(rect(0.77, 1), 1000, 1000);
    expect(letter.w / letter.h).toBeCloseTo(8.5 / 11, 2);
    expect(outputSize(rect(0.3, 1), 1000, 1000)).toEqual({ w: 300, h: 1000 });
  });

  test("format imposé : mêmes proportions que la feuille, à surface égale", () => {
    const a4 = outputSize(rect(0.5, 1), 1000, 1000, "a4");
    expect(a4.w / a4.h).toBeCloseTo(210 / 297, 2);
    expect(Math.abs(a4.w * a4.h - 500_000) / 500_000).toBeLessThan(0.01);
    const letter = outputSize(rect(1, 0.5), 1000, 1000, "letter");
    expect(letter.h / letter.w).toBeCloseTo(8.5 / 11, 2);
  });
});

describe("nettoyage d'une photo", () => {
  /** Dégradé de gris : 256 colonnes, une par niveau. */
  const ramp = image(256, 4, (x) => [x, x, x]);

  test("niveaux automatiques : le 2e centile devient noir, le 98e blanc", () => {
    const out = autoLevels(ramp);
    // 2 % de 256 niveaux : colonne 5 ; 98 % : colonne 250.
    expect(pixel(out, 5, 0)).toEqual([0, 0, 0]);
    expect(pixel(out, 250, 0)).toEqual([255, 255, 255]);
    expect(pixel(out, 0, 0)).toEqual([0, 0, 0]);
    expect(pixel(out, 255, 0)).toEqual([255, 255, 255]);
    // Entre les deux : croissant, et le milieu reste au milieu.
    expect(pixel(out, 128, 0)[0]).toBeGreaterThan(120);
    expect(pixel(out, 128, 0)[0]).toBeLessThan(136);
    for (let x = 6; x < 250; x++) expect(pixel(out, x, 0)[0]).toBeGreaterThanOrEqual(pixel(out, x - 1, 0)[0]);
  });

  test("le papier devient blanc, l'encre reste sombre, la dominante jaune disparaît", () => {
    // Feuille photographiée sous une lampe : papier jaunâtre, encre gris foncé (10 % des pixels).
    const photo = image(100, 100, (x, y) => (y % 10 === 0 ? [45, 42, 40] : [214, 204, 172]));
    const out = autoLevels(photo);
    const paper = pixel(out, 50, 55);
    for (const c of paper) expect(c).toBeGreaterThanOrEqual(250);
    const ink = pixel(out, 50, 50);
    for (const c of ink) expect(c).toBeLessThan(40);
  });

  test("feuille presque vide (moins de 2 % d'encre) : le papier blanchit quand même", () => {
    // Une seule ligne d'encre sur 200 : le 2e centile est déjà du papier.
    const sheet = image(100, 200, (x, y) => (y === 100 ? [40, 40, 44] : [214, 204, 172]));
    const out = autoLevels(sheet);
    for (const c of pixel(out, 50, 20)) expect(c).toBe(255);
    for (const c of pixel(out, 50, 100)) expect(c).toBe(0);
    // Feuille entièrement vide : blanche.
    const blank = autoLevels(image(10, 10, () => [120, 121, 119]));
    expect(pixel(blank, 5, 5)).toEqual([255, 255, 255]);
  });

  test("image presque noire : rendue telle quelle ; l'original n'est jamais modifié", () => {
    const flat = image(10, 10, () => [6, 7, 5]);
    const out = autoLevels(flat);
    expect(Array.from(out.data)).toEqual(Array.from(flat.data));
    expect(out.data).not.toBe(flat.data);
    const before = Array.from(ramp.data);
    autoLevels(ramp);
    toGray(ramp);
    expect(Array.from(ramp.data)).toEqual(before);
  });

  test("noir et blanc : chaque pixel garde sa luminance, en nuances de gris (pas un seuil)", () => {
    const colours = image(4, 1, (x) => [[200, 30, 30], [30, 200, 30], [30, 30, 200], [128, 128, 128]][x] as [number, number, number]);
    const out = toGray(colours);
    for (let x = 0; x < 4; x++) {
      const [r, g, b] = pixel(colours, x, 0);
      const l = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      expect(pixel(out, x, 0)).toEqual([l, l, l]);
    }
    // Des gris intermédiaires subsistent : ce n'est pas du noir ou blanc pur.
    expect(new Set(Array.from({ length: 4 }, (_, x) => pixel(out, x, 0)[0])).size).toBe(4);
    expect(out.data[3]).toBe(255);
  });
});
