import { describe, expect, test } from "bun:test";
import {
  DEFAULT_WATERMARK_STYLE,
  fillRgba,
  fontCss,
  haloRgba,
  normalizeStyle,
  readStyle,
  serializeStyle,
  stampKey,
} from "./watermark-style";

describe("apparence du filigrane", () => {
  // Valeurs de lib/watermark.ts avant le panneau d'apparence (600, 0,45, halo 0,35) :
  // un utilisateur qui n'ouvre jamais le panneau ne doit voir aucun changement.
  test("le défaut reproduit le rendu historique : mono 600, rouge sceau à 45 %", () => {
    expect(fontCss(DEFAULT_WATERMARK_STYLE, 40)).toBe("600 40px ui-monospace, monospace");
    expect(fillRgba(DEFAULT_WATERMARK_STYLE)).toBe("rgba(196, 38, 46, 0.45)");
    expect(haloRgba(DEFAULT_WATERMARK_STYLE)).toBe("rgba(255, 255, 255, 0.35)");
  });

  test("arabe ou persan : « Mono » passe en sans-serif (lettres liées), le latin reste mono", () => {
    expect(fontCss(DEFAULT_WATERMARK_STYLE, 40, "Rental application")).toBe("600 40px ui-monospace, monospace");
    expect(fontCss(DEFAULT_WATERMARK_STYLE, 40, "طلب استئجار")).toContain("sans-serif");
    expect(fontCss(DEFAULT_WATERMARK_STYLE, 40, "کپی برای اجاره")).toContain("sans-serif");
    expect(fontCss({ ...DEFAULT_WATERMARK_STYLE, font: "serif" }, 40, "طلب")).toContain("Georgia");
  });

  test("lettres arabes : Cairo ; persanes : Vazirmatn, juste après la police latine", () => {
    expect(fontCss(DEFAULT_WATERMARK_STYLE, 40, "طلب استئجار")).toBe(
      '600 40px "Space Grotesk Variable", "Cairo Variable", system-ui, sans-serif'
    );
    expect(fontCss(DEFAULT_WATERMARK_STYLE, 40, "کپی برای اجاره")).toContain('"Space Grotesk Variable", "Vazirmatn Variable"');
    expect(fontCss({ ...DEFAULT_WATERMARK_STYLE, font: "serif" }, 40, "طلب")).toBe(
      '600 40px Georgia, "Cairo Variable", "Times New Roman", serif'
    );
    expect(fontCss(DEFAULT_WATERMARK_STYLE, 40, "Copie")).toBe("600 40px ui-monospace, monospace");
  });

  test("japonais (kana) : Noto Sans JP ; idéogrammes seuls : Noto Sans SC", () => {
    expect(fontCss(DEFAULT_WATERMARK_STYLE, 40, "賃貸の申込み用")).toBe(
      '600 40px ui-monospace, "Noto Sans JP Variable", monospace'
    );
    expect(fontCss({ ...DEFAULT_WATERMARK_STYLE, font: "sans" }, 40, "租房申请专用")).toBe(
      '600 40px "Space Grotesk Variable", "Noto Sans SC Variable", system-ui, sans-serif'
    );
  });

  test("une encre claire reçoit un halo sombre, une encre sombre un halo clair", () => {
    const white = { ...DEFAULT_WATERMARK_STYLE, color: "#ffffff", opacity: 1 };
    expect(haloRgba(white)).toBe("rgba(0, 0, 0, 0.5)");
    expect(haloRgba({ ...DEFAULT_WATERMARK_STYLE, color: "#000000" })).toContain("255, 255, 255");
  });

  test("une valeur hors limites ou illisible retombe sur le défaut, puis se cale sur le pas", () => {
    expect(normalizeStyle(null)).toEqual(DEFAULT_WATERMARK_STYLE);
    expect(normalizeStyle({ font: "comic", scale: 9, color: "rouge", opacity: 0, wave: 9 })).toEqual({
      font: "mono",
      scale: 2.2,
      color: "#c4262e",
      opacity: 0.05,
      wave: 1,
    });
    expect(normalizeStyle({ font: "serif", color: "#ABC" }).color).toBe("#aabbcc");
    expect(normalizeStyle({ color: "  #C4262E " }).color).toBe("#c4262e");
  });

  test("la clé de cache change dès qu'un réglage change", () => {
    const base = stampKey("Dossier", DEFAULT_WATERMARK_STYLE);
    expect(stampKey("Autre", DEFAULT_WATERMARK_STYLE)).not.toBe(base);
    expect(stampKey("Dossier", { ...DEFAULT_WATERMARK_STYLE, font: "sans" })).not.toBe(base);
    expect(stampKey("Dossier", { ...DEFAULT_WATERMARK_STYLE, scale: 1.5 })).not.toBe(base);
    expect(stampKey("Dossier", { ...DEFAULT_WATERMARK_STYLE, color: "#223f92" })).not.toBe(base);
    expect(stampKey("Dossier", { ...DEFAULT_WATERMARK_STYLE, opacity: 0.8 })).not.toBe(base);
    expect(stampKey("Dossier", { ...DEFAULT_WATERMARK_STYLE, wave: 0.5 })).not.toBe(base);
  });

  test("le JSON stocké est relu, et un JSON cassé redonne le défaut", () => {
    const saved = serializeStyle({
      font: "sans",
      scale: 1.25,
      color: "#223f92",
      opacity: 0.8,
      wave: 0.4,
    });
    expect(readStyle(saved)).toEqual({
      font: "sans",
      scale: 1.25,
      color: "#223f92",
      opacity: 0.8,
      wave: 0.4,
    });
    expect(
      readStyle(JSON.stringify({ font: "sans", scale: 1.25, color: "#223f92", opacity: 0.8 }))
    ).toMatchObject({ wave: 0 });
    expect(readStyle("{")).toEqual(DEFAULT_WATERMARK_STYLE);
    expect(readStyle(null)).toEqual(DEFAULT_WATERMARK_STYLE);
  });

  test("les polices sans et serif portent leur graisse et leur famille", () => {
    expect(fontCss({ ...DEFAULT_WATERMARK_STYLE, font: "sans" }, 16)).toBe(
      '600 16px "Space Grotesk Variable", system-ui, sans-serif'
    );
    expect(fontCss({ ...DEFAULT_WATERMARK_STYLE, font: "serif" }, 16)).toContain("Georgia");
  });
});
