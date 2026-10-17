import { describe, expect, test } from "bun:test";
import {
  BACKGROUND_FEATHER,
  BACKGROUND_THRESHOLD,
  crop,
  exportSize,
  hasInk,
  inkBounds,
  type Pixels,
  parseHex,
  recolor,
  removeBackground,
  SIGNATURE_MAX_WIDTH,
  SIGNATURE_MIN_WIDTH,
  trim,
} from "./signature";

type Rgba = [number, number, number, number];

/** Image unie, puis pixels posés un à un. */
function image(width: number, height: number, fill: Rgba = [0, 0, 0, 0]): Pixels {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) data.set(fill, i);
  return { data, width, height };
}
const set = (p: Pixels, x: number, y: number, c: Rgba) => p.data.set(c, (y * p.width + x) * 4);
const at = (p: Pixels, x: number, y: number) => [...p.data.subarray((y * p.width + x) * 4, (y * p.width + x) * 4 + 4)];

describe("removeBackground", () => {
  test("à 200 : un pixel blanc devient transparent, un gris 80 reste opaque", () => {
    const p = image(2, 1, [255, 255, 255, 255]);
    set(p, 1, 0, [80, 80, 80, 255]);
    const out = removeBackground(p, 200);
    expect(at(out, 0, 0)[3]).toBe(0);
    expect(at(out, 1, 0)).toEqual([80, 80, 80, 255]);
  });

  test("au-dessus du seuil : transparent ; juste sous le seuil : fondu ; bien en dessous : intact", () => {
    const p = image(3, 1);
    set(p, 0, 0, [210, 210, 210, 255]);
    set(p, 1, 0, [200 - BACKGROUND_FEATHER / 2, 200 - BACKGROUND_FEATHER / 2, 200 - BACKGROUND_FEATHER / 2, 255]);
    set(p, 2, 0, [150, 150, 150, 255]);
    const out = removeBackground(p, 200);
    expect(at(out, 0, 0)[3]).toBe(0);
    const mid = at(out, 1, 0)[3];
    expect(mid).toBeGreaterThan(100);
    expect(mid).toBeLessThan(155);
    expect(at(out, 2, 0)[3]).toBe(255);
  });

  test("le seuil suit le curseur (150 retire plus de gris que 240)", () => {
    const p = image(1, 1, [190, 190, 190, 255]);
    expect(at(removeBackground(p, BACKGROUND_THRESHOLD.min), 0, 0)[3]).toBe(0);
    expect(at(removeBackground(p, BACKGROUND_THRESHOLD.max), 0, 0)[3]).toBe(255);
    expect(BACKGROUND_THRESHOLD.fallback).toBe(200);
  });

  test("luminance pondérée : un jaune vif est du fond, un bleu foncé de l'encre", () => {
    const p = image(2, 1);
    set(p, 0, 0, [255, 255, 0, 255]); // luma ≈ 226
    set(p, 1, 0, [0, 0, 255, 255]); // luma ≈ 29
    const out = removeBackground(p, 200);
    expect(at(out, 0, 0)[3]).toBe(0);
    expect(at(out, 1, 0)[3]).toBe(255);
  });

  test("ne modifie pas l'entrée", () => {
    const p = image(1, 1, [255, 255, 255, 255]);
    removeBackground(p, 200);
    expect(at(p, 0, 0)[3]).toBe(255);
  });
});

describe("recolor", () => {
  test("garde l'alpha et fixe le RVB", () => {
    const p = image(3, 1);
    set(p, 0, 0, [200, 10, 10, 255]);
    set(p, 1, 0, [10, 200, 10, 90]);
    const out = recolor(p, "#1b3a8a");
    expect(at(out, 0, 0)).toEqual([0x1b, 0x3a, 0x8a, 255]);
    expect(at(out, 1, 0)).toEqual([0x1b, 0x3a, 0x8a, 90]);
    expect(at(out, 2, 0)[3]).toBe(0);
    expect(at(p, 0, 0)).toEqual([200, 10, 10, 255]);
  });

  test("couleurs courtes et invalides", () => {
    expect(parseHex("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseHex("111111")).toEqual({ r: 17, g: 17, b: 17 });
    expect(parseHex("bleu")).toBeNull();
    expect(() => recolor(image(1, 1), "bleu")).toThrow();
  });
});

describe("inkBounds", () => {
  test("null sur une image entièrement transparente", () => {
    expect(inkBounds(image(50, 20))).toBeNull();
    expect(hasInk(image(50, 20))).toBe(false);
  });

  test("ignore l'anticrénelage quasi invisible (alpha sous le minimum)", () => {
    const p = image(10, 10);
    set(p, 5, 5, [0, 0, 0, 4]);
    expect(inkBounds(p)).toBeNull();
    expect(inkBounds(p, 1, 0)).toEqual({ x: 5, y: 5, w: 1, h: 1 });
  });

  test("boîte serrée sans marge, puis marge de 6 % du plus grand côté sur les quatre bords", () => {
    const p = image(400, 200);
    for (let x = 100; x < 300; x++) for (let y = 80; y < 120; y++) set(p, x, y, [0, 0, 0, 255]);
    expect(inkBounds(p, 16, 0)).toEqual({ x: 100, y: 80, w: 200, h: 40 });
    // 6 % de 200 = 12 px.
    expect(inkBounds(p)).toEqual({ x: 88, y: 68, w: 224, h: 64 });
    expect(hasInk(p)).toBe(true);
  });

  test("la marge peut déborder de l'image (encre au bord)", () => {
    const p = image(100, 50);
    for (let x = 0; x < 100; x++) set(p, x, 0, [0, 0, 0, 255]);
    expect(inkBounds(p, 16, 0.1)).toEqual({ x: -10, y: -10, w: 120, h: 21 });
  });
});

describe("trim", () => {
  test("dimensions de la sortie et encre conservée", () => {
    const p = image(400, 200);
    for (let x = 100; x < 300; x++) for (let y = 80; y < 120; y++) set(p, x, y, [17, 17, 17, 255]);
    const out = trim(p);
    expect(out.width).toBe(224);
    expect(out.height).toBe(64);
    expect(out.data.length).toBe(224 * 64 * 4);
    expect(at(out, 12, 12)).toEqual([17, 17, 17, 255]);
    expect(at(out, 11, 12)[3]).toBe(0);
    expect(at(out, 0, 0)[3]).toBe(0);
  });

  test("sans marge : exactement la boîte de l'encre", () => {
    const p = image(10, 10);
    set(p, 3, 4, [0, 0, 0, 255]);
    set(p, 6, 7, [0, 0, 0, 255]);
    const out = trim(p, 0);
    expect([out.width, out.height]).toEqual([4, 4]);
    expect(at(out, 0, 0)[3]).toBe(255);
    expect(at(out, 3, 3)[3]).toBe(255);
  });

  test("débordement rempli de transparent", () => {
    const p = image(4, 4, [0, 0, 0, 255]);
    const out = crop(p, { x: -2, y: -1, w: 8, h: 6 });
    expect([out.width, out.height]).toEqual([8, 6]);
    expect(at(out, 0, 0)[3]).toBe(0);
    expect(at(out, 2, 1)[3]).toBe(255);
    expect(at(out, 5, 4)[3]).toBe(255);
    expect(at(out, 6, 4)[3]).toBe(0);
  });

  test("image sans encre : copie inchangée", () => {
    const out = trim(image(7, 3));
    expect([out.width, out.height]).toEqual([7, 3]);
  });
});

describe("exportSize", () => {
  test("agrandie jusqu'à la largeur minimale, rapport conservé", () => {
    expect(exportSize(300, 100)).toEqual({ width: SIGNATURE_MIN_WIDTH, height: 400 });
  });
  test("réduite au-delà de la largeur maximale ; entre les deux, inchangée", () => {
    expect(exportSize(4800, 1200)).toEqual({ width: SIGNATURE_MAX_WIDTH, height: 600 });
    expect(exportSize(1500, 500)).toEqual({ width: 1500, height: 500 });
  });
});
