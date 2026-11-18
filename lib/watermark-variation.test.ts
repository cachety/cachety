import { describe, expect, test } from "bun:test";
import {
  ACCENT_MIN_HUE_DISTANCE,
  ACCENT_MIN_OPACITY,
  accentCount,
  accentHues,
  accentInk,
  hexToHsl,
  hslToRgb,
  hueDistance,
  pickAccentRows,
  planRows,
  rng,
  rowShade,
  rowShadow,
  SHADE_SPREAD,
  tileVariation,
  type RowOffset,
} from "./watermark-variation";

const SEAL = "#c4262e";
const BLUE = "#223f92";
const hex = ({ r, g, b }: { r: number; g: number; b: number }) =>
  `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
const blendOnWhite = (v: number, alpha: number) => 255 * (1 - alpha) + v * alpha;

describe("couleurs", () => {
  test("hex → hsl → rgb revient à la couleur de départ", () => {
    for (const c of [SEAL, BLUE, "#1a1e33", "#000000", "#ffffff", "#7f7f7f"]) {
      expect(hex(hslToRgb(hexToHsl(c)))).toBe(c);
    }
  });

  test("écart de teinte circulaire", () => {
    expect(hueDistance(350, 10)).toBe(20);
    expect(hueDistance(0, 180)).toBe(180);
    expect(hueDistance(90, 90)).toBe(0);
  });
});

describe("nuance par rangée", () => {
  test("proche de la couleur choisie, jamais identique d'une rangée à l'autre", () => {
    const rand = rng(1);
    const base = hexToHsl(SEAL);
    const seen = new Set<string>();
    for (let k = 0; k < 200; k++) {
      const shade = hexToHsl(hex(rowShade(SEAL, rand)));
      expect(hueDistance(shade.h, base.h)).toBeLessThanOrEqual(SHADE_SPREAD.hue + 1);
      expect(Math.abs(shade.l - base.l)).toBeLessThanOrEqual(SHADE_SPREAD.lightness + 0.01);
      seen.add(hex(rowShade(SEAL, rand)));
    }
    expect(seen.size).toBeGreaterThan(100);
  });

  test("une couleur neutre reste neutre (noir, blanc)", () => {
    const rand = rng(2);
    for (let k = 0; k < 50; k++) {
      for (const c of ["#000000", "#ffffff"]) {
        const { r, g, b } = rowShade(c, rand);
        expect(Math.max(r, g, b) - Math.min(r, g, b)).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe("lignes d'accent", () => {
  test("teintes à 90° au moins d'une encre saturée ; chaudes pour une encre neutre", () => {
    for (const c of [SEAL, BLUE, "#2e8b57", "#ff8800"]) {
      const { h } = hexToHsl(c);
      const hues = accentHues(c);
      expect(hues.length).toBeGreaterThanOrEqual(2);
      for (const a of hues) expect(hueDistance(a, h)).toBeGreaterThanOrEqual(ACCENT_MIN_HUE_DISTANCE);
    }
    expect(accentHues("#000000")).toEqual([0, 22, 35]);
    expect(accentHues("#ffffff")).toEqual([0, 22, 35]);
  });

  test("un quart des rangées visibles, au moins deux, jamais toutes", () => {
    expect(accentCount(0)).toBe(0);
    expect(accentCount(1)).toBe(0);
    expect(accentCount(2)).toBe(1);
    expect(accentCount(3)).toBe(2);
    expect(accentCount(8)).toBe(2);
    expect(accentCount(20)).toBe(5);
    expect(accentCount(40)).toBe(10);
  });

  test("espacées : jamais deux rangées voisines quand le choix le permet", () => {
    const rows = Array.from({ length: 20 }, (_, i) => i - 10);
    for (let seed = 0; seed < 100; seed++) {
      const picked = pickAccentRows(rows, 5, rng(seed)).sort((a, b) => a - b);
      expect(new Set(picked).size).toBe(5);
      for (let i = 1; i < picked.length; i++) expect(picked[i] - picked[i - 1]).toBeGreaterThan(1);
    }
    // Trois rangées, deux accents : voisines inévitables, mais bien deux.
    expect(pickAccentRows([0, 1, 2], 2, rng(3))).toHaveLength(2);
  });

  test("l'accent « deep » survit à la sélection par couleur et aux niveaux", () => {
    const rand = rng(4);
    for (let k = 0; k < 100; k++) {
      for (const c of [SEAL, BLUE, "#000000"]) {
        const deep = accentInk(c, 0.25, "deep", rand);
        expect(deep.opacity).toBeGreaterThanOrEqual(ACCENT_MIN_OPACITY.deep);
        const { r, g, b } = deep.rgb;
        // Mêmes seuils que e2e/removal.e2e.ts : chroma ≤ 20 et minimum < 110, une fois mélangé au blanc.
        const mixed = [r, g, b].map((v) => blendOnWhite(v, deep.opacity));
        expect(Math.max(...mixed) - Math.min(...mixed)).toBeLessThanOrEqual(20);
        expect(Math.min(...mixed)).toBeLessThan(110);
      }
    }
  });

  test("l'accent en couleur reste visible même au réglage Léger", () => {
    const accent = accentInk(SEAL, 0.25, "color", rng(5));
    expect(accent.opacity).toBe(ACCENT_MIN_OPACITY.color);
    expect(accentInk(SEAL, 0.9, "color", rng(5)).opacity).toBe(0.9);
  });

  test("encre blanche : accents clairs, lisibles sur une photo sombre", () => {
    const rand = rng(6);
    for (let k = 0; k < 50; k++) {
      expect(hexToHsl(hex(accentInk("#ffffff", 0.5, "deep", rand).rgb)).l).toBeGreaterThan(0.8);
      expect(hexToHsl(hex(accentInk("#ffffff", 0.5, "color", rand).rgb)).l).toBeGreaterThan(0.55);
    }
  });
});

describe("plan des rangées", () => {
  const rows: RowOffset[] = Array.from({ length: 41 }, (_, i) => ({ row: i - 20, offset: (i - 20) * 100 }));

  test("accents parmi les rangées visibles uniquement, le premier « deep »", () => {
    for (let seed = 0; seed < 50; seed++) {
      const plans = planRows(rows, 1000, 40, SEAL, 0.25, rng(seed));
      const accents = [...plans].filter(([, p]) => p.accent);
      // 19 rangées visibles (|offset| < 980) → 5 accents, dans le cœur de la page.
      expect(accents).toHaveLength(5);
      for (const [row] of accents) expect(Math.abs(row * 100)).toBeLessThan(700);
      expect(accents.filter(([, p]) => p.accent!.kind === "deep")).toHaveLength(1);
    }
  });

  test("petite page : au moins deux accents dès trois rangées visibles", () => {
    const plans = planRows(rows, 250, 40, SEAL, 0.25, rng(9)); // rangées -2…2 visibles
    expect([...plans.values()].filter((p) => p.accent)).toHaveLength(2);
  });

  test("déterministe pour une graine, différent d'une graine à l'autre", () => {
    const a = planRows(rows, 1000, 40, SEAL, 0.25, rng(11));
    expect(planRows(rows, 1000, 40, SEAL, 0.25, rng(11))).toEqual(a);
    expect(planRows(rows, 1000, 40, SEAL, 0.25, rng(12))).not.toEqual(a);
  });

  test("ombres bornées : courtes, légères, jamais plus denses que 0,75", () => {
    const rand = rng(13);
    for (let k = 0; k < 200; k++) {
      const s = rowShadow(40, 1, rand);
      const distance = Math.hypot(s.dx, s.dy);
      expect(distance).toBeGreaterThanOrEqual(1);
      expect(distance).toBeLessThanOrEqual(40 * 0.07 + 1e-9);
      expect(s.blur).toBeLessThanOrEqual(40 * 0.05);
      expect(Number(s.color.match(/, ([\d.]+)\)$/)![1])).toBeLessThanOrEqual(0.75);
    }
  });
});

describe("variation par occurrence", () => {
  test("phase, onde et inclinaison bornées ; l'inclinaison suit la place disponible", () => {
    const rand = rng(14);
    for (let k = 0; k < 200; k++) {
      const t = tileVariation(rand, 40, 100, 600);
      expect(t.phase).toBeGreaterThanOrEqual(0);
      expect(t.phase).toBeLessThan(Math.PI * 2);
      expect(t.wavelength).toBeGreaterThanOrEqual(0.85);
      expect(t.amplitude).toBeLessThanOrEqual(1.15);
      expect(Math.abs(t.tilt)).toBeLessThanOrEqual((2 * Math.PI) / 180);
      expect(Math.abs(t.dx)).toBeLessThanOrEqual(12);
    }
    // Aucune place : ni décalage vertical ni inclinaison.
    const none = tileVariation(rng(15), 40, 0, 600);
    expect(none.tilt).toBe(0);
    expect(none.dy).toBe(0);
  });
});
