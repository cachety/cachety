import { describe, expect, test } from "bun:test";
import { fitScale, graphemes, layoutVariation, watermarkStepX, watermarkStepY, watermarkRoom, outlineRgba, outlineStroke, outlineWidth, THIN_OUTLINE_MIN_ALPHA, MAX_CANVAS_AREA, PREVIEW_MAX_PAGES, signPreviewPages, watermarkMaxLineWidth, waveAmplitude, waveDisplacement } from "./watermark";
import { rng, TILE_WAVE, tileVariation } from "./watermark-variation";

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
  test("la phase propre à une occurrence décale l'onde", () => {
    const straight = waveDisplacement(0, 20, 1);
    const shifted = waveDisplacement(0, 20, 1, { phase: Math.PI / 2, wavelength: 1, amplitude: 1 });
    expect(straight.dy).toBeCloseTo(0, 6);
    expect(shifted.dy).toBeCloseTo(waveAmplitude(20, 1), 6);
  });

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
    const base = { font: "mono", scale: 1, color: "#c4262e", opacity: 0.45, wave: 0, outline: "strong" } as const;
    expect(outlineRgba(base)).toBe("rgba(28, 28, 32, 0.72)");
    expect(outlineRgba({ ...base, color: "#223f92" })).toBe(outlineRgba(base));
    expect(outlineRgba({ ...base, opacity: 1 })).toBe("rgba(28, 28, 32, 0.9)");
    // Réglage « Léger » (25 %) : le contour garde son plancher, sinon les niveaux l'effacent.
    expect(outlineRgba({ ...base, opacity: 0.25 })).toBe("rgba(28, 28, 32, 0.72)");
  });

  test("fin : plus dense que le plancher marqué (rebord étroit) ; aucun : pas de contour", () => {
    const base = { font: "mono", scale: 1, color: "#c4262e", opacity: 0.25, wave: 0, outline: "thin" } as const;
    expect(outlineRgba(base)).toBe(`rgba(28, 28, 32, ${THIN_OUTLINE_MIN_ALPHA})`);
    // Sur du blanc, le contour fin reste plus sombre que le seuil des niveaux (110).
    expect(255 - THIN_OUTLINE_MIN_ALPHA * (255 - 28)).toBeLessThan(110);
    expect(outlineRgba({ ...base, opacity: 1 })).toBe("rgba(28, 28, 32, 0.9)");
    expect(outlineRgba({ ...base, outline: "none" })).toBeNull();
    expect(outlineStroke({ ...base, outline: "none" }, 60)).toBe(0);
  });

  test("le contour fin est bien moins large, avec un rebord d'au moins 1 px", () => {
    const strong = { font: "mono", scale: 1, color: "#c4262e", opacity: 0.25, wave: 0, outline: "strong" } as const;
    const thin = { ...strong, outline: "thin" } as const;
    expect(outlineStroke(strong, 60)).toBe(12);
    expect(outlineStroke(thin, 60)).toBe(7);
    expect(outlineStroke(thin, 10)).toBe(2); // plancher : rebord visible de 1 px
  });

  test("assez épais pour garder un cœur neutre après le sous-échantillonnage JPEG", () => {
    expect(outlineWidth(60)).toBe(4);
    expect(outlineWidth(30)).toBe(2); // suit la taille
    expect(outlineWidth(10)).toBe(1);
  });
});

describe("pavage", () => {
  test("deux rangées voisines ne se touchent pas, même décalées et inclinées à l'opposé", () => {
    const rand = rng(7);
    for (const [fontSize, wave, line] of [
      [40, 0, 600],
      [40, 1, 600],
      [6, 1, 1600], // texte long rétréci : l'inclinaison est bridée
      [120, 0.5, 900],
    ] as const) {
      const amplitude = waveAmplitude(fontSize, wave);
      const stepY = watermarkStepY(fontSize, 0.9, amplitude);
      const room = watermarkRoom(stepY, fontSize, amplitude);
      for (let k = 0; k < 200; k++) {
        const t = tileVariation(rand, fontSize, room, line);
        // Écart maximal d'une occurrence : décalage + inclinaison au bout de la ligne + crête.
        const reach = Math.abs(t.dy) + (line / 2) * Math.abs(Math.sin(t.tilt)) + amplitude * TILE_WAVE.max + fontSize / 2;
        expect(2 * reach).toBeLessThan(stepY);
      }
    }
  });

  test("deux copies d'un texte long ne se chevauchent jamais, quel que soit l'espacement tiré", () => {
    for (let seed = 0; seed < 200; seed++) {
      const { spacing } = layoutVariation(seed);
      const line = 2000; // texte très long : plus de 20 fois la taille de police
      expect(watermarkStepX(line, 80, spacing) - line).toBeGreaterThanOrEqual(80 * 2);
    }
  });
});

describe("aperçus du mode « signer » (les 11 premières pages et la dernière)", () => {
  test("document long : 12 aperçus, le dernier est la dernière page", () => {
    const pages = signPreviewPages(40);
    expect(pages).toHaveLength(PREVIEW_MAX_PAGES);
    expect(pages.slice(0, 11)).toEqual(Array.from({ length: 11 }, (_, i) => i));
    expect(pages[11]).toBe(39);
  });

  test("document court : toutes les pages, sans doublon", () => {
    expect(signPreviewPages(1)).toEqual([0]);
    expect(signPreviewPages(12)).toEqual(Array.from({ length: 12 }, (_, i) => i));
    expect(signPreviewPages(13)).toEqual([...Array.from({ length: 11 }, (_, i) => i), 12]);
  });
});
