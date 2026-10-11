import { describe, expect, test } from "bun:test";
import { fitScale, graphemes, layoutVariation, watermarkStepX, outlineRgba, outlineWidth, MAX_CANVAS_AREA, watermarkMaxLineWidth, waveDisplacement } from "./watermark";

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

describe("ondulation", () => {
  test("à zéro, le glyphe ne bouge pas", () => {
    expect(waveDisplacement(40, 20, 0)).toEqual({ dy: 0, angle: 0 });
  });

  test("au quart de longueur d'onde, le glyphe est au sommet et à plat", () => {
    const fontSize = 20;
    const quarter = (fontSize * 5) / 4;
    const { dy, angle } = waveDisplacement(quarter, fontSize, 1);
    expect(dy).toBeCloseTo(fontSize * 0.85, 5);
    expect(angle).toBeCloseTo(0, 5);
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

describe("graphemes (texte ondulé)", () => {
  test("accent décomposé, émoji composé et drapeau restent d'un seul tenant", () => {
    expect(graphemes("cafe\u0301")).toEqual(["c", "a", "f", "e\u0301"]);
    expect(graphemes("👩‍💻!")).toEqual(["👩‍💻", "!"]);
    expect(graphemes("🇫🇷")).toEqual(["🇫🇷"]);
  });
});

describe("layoutVariation (une mise en page par copie)", () => {
  test("bornée : angle 45° ± 7°, décalage dans un pas, espacement 0,9–1,15", () => {
    for (let seed = 0; seed < 500; seed++) {
      const v = layoutVariation(seed);
      expect(Math.abs(v.angle + Math.PI / 4)).toBeLessThanOrEqual((7 * Math.PI) / 180 + 1e-9);
      expect(v.offsetX).toBeGreaterThanOrEqual(0);
      expect(v.offsetX).toBeLessThan(1);
      expect(v.spacing).toBeGreaterThanOrEqual(0.9);
      expect(v.spacing).toBeLessThanOrEqual(1.15);
    }
  });

  test("déterministe pour une graine, différente d'une graine à l'autre", () => {
    expect(layoutVariation(42)).toEqual(layoutVariation(42));
    expect(layoutVariation(42)).not.toEqual(layoutVariation(43));
  });
});

describe("contour sombre (résistance à la sélection par couleur)", () => {
  test("neutre quelle que soit l'encre, plus opaque que le remplissage, borné", () => {
    const base = { font: "mono", scale: 1, color: "#c4262e", opacity: 0.45, wave: 0 } as const;
    expect(outlineRgba(base)).toBe("rgba(28, 28, 32, 0.72)");
    expect(outlineRgba({ ...base, color: "#223f92" })).toBe(outlineRgba(base));
    expect(outlineRgba({ ...base, opacity: 1 })).toBe("rgba(28, 28, 32, 0.9)");
  });

  test("assez épais pour garder un cœur neutre après le sous-échantillonnage JPEG", () => {
    expect(outlineWidth(60)).toBe(4);
    expect(outlineWidth(10)).toBe(1.5);
  });
});

describe("pavage", () => {
  test("deux copies d'un texte long ne se chevauchent jamais, quel que soit l'espacement tiré", () => {
    for (let seed = 0; seed < 200; seed++) {
      const { spacing } = layoutVariation(seed);
      const line = 2000; // texte très long : plus de 20 fois la taille de police
      expect(watermarkStepX(line, 80, spacing) - line).toBeGreaterThanOrEqual(80 * 2);
    }
  });
});
