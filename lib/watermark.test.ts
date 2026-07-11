import { describe, expect, test } from "bun:test";
import { fitScale, MAX_CANVAS_AREA, watermarkMaxLineWidth } from "./watermark";

describe("watermarkMaxLineWidth (une occurrence entière tient toujours)", () => {
  test("une ligne à la largeur max reste dans le canvas une fois pivotée de -45deg", () => {
    const sizes = [
      [595, 842],
      [842, 595],
      [1080, 4000],
      [4000, 1080],
      [800, 800],
      [3370, 4768],
    ];
    for (const [w, h] of sizes) {
      const lineHeight = 40;
      const maxW = watermarkMaxLineWidth(w, h, lineHeight);
      expect(maxW).toBeGreaterThan(0);
      const rotatedExtent = (maxW + lineHeight) / Math.SQRT2;
      expect(rotatedExtent).toBeLessThanOrEqual(Math.min(w, h));
    }
  });
});

describe("fitScale (plafond de surface canvas)", () => {
  test("laisse l'échelle intacte sous la limite", () => {
    expect(fitScale(1000, 1000, 2)).toBe(2);
  });

  test("réduit l'échelle au-dessus de la limite, sans jamais dépasser MAX_CANVAS_AREA", () => {
    const s = fitScale(8000, 6000, 2);
    expect(s).toBeLessThan(2);
    expect(8000 * 6000 * s * s).toBeLessThanOrEqual(MAX_CANVAS_AREA + 1);
  });

  test("un PDF A0 (grand format) est ramené sous la limite", () => {
    const s = fitScale(3370, 4768, 2);
    expect(3370 * 4768 * s * s).toBeLessThanOrEqual(MAX_CANVAS_AREA + 1);
  });
});
