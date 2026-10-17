import { describe, expect, test } from "bun:test";
import {
  clampToPage,
  DEFAULT_INITIALS_WIDTH,
  DEFAULT_SIGNATURE_WIDTH,
  defaultPlacement,
  EDGE_MARGIN,
  initialsPages,
  initialsRect,
  MIN_OVERLAY_PX,
  moveRect,
  overlayPixelRect,
  overlaysKey,
  overlaysOnPage,
  overlayTooSmall,
  paintOverlays,
  resizeKeepingRatio,
  type OverlayImages,
  type OverlayRect,
  type PageOverlays,
} from "./overlays";

const A4 = 595 / 842; // portrait, largeur / hauteur
const SIG = 1200 / 360; // signature large et basse

/** Rapport réel (en points) d'un rectangle normalisé posé sur une page de rapport `pageAspect`. */
const realAspect = (r: OverlayRect, pageAspect: number) => (r.w * pageAspect) / r.h;
const inside = (r: OverlayRect) =>
  r.x >= -1e-9 && r.y >= -1e-9 && r.x + r.w <= 1 + 1e-9 && r.y + r.h <= 1 + 1e-9 && r.w > 0 && r.h > 0;

describe("overlays", () => {
  test("placement par défaut en bas à droite avec marges (page portrait)", () => {
    const r = defaultPlacement(A4, SIG);
    expect(r.w).toBeCloseTo(DEFAULT_SIGNATURE_WIDTH);
    expect(1 - (r.x + r.w)).toBeCloseTo(EDGE_MARGIN);
    expect(1 - (r.y + r.h)).toBeCloseTo(EDGE_MARGIN);
    expect(realAspect(r, A4)).toBeCloseTo(SIG);
  });

  test("placement par défaut en bas à droite avec marges (page paysage)", () => {
    const landscape = 1 / A4;
    const r = defaultPlacement(landscape, SIG);
    expect(r.w).toBeCloseTo(DEFAULT_SIGNATURE_WIDTH);
    expect(1 - (r.x + r.w)).toBeCloseTo(EDGE_MARGIN);
    expect(1 - (r.y + r.h)).toBeCloseTo(EDGE_MARGIN);
    expect(realAspect(r, landscape)).toBeCloseTo(SIG);
    // Une image très haute sur une page paysage est réduite pour tenir entre les marges.
    const tall = defaultPlacement(landscape, 0.2);
    expect(inside(tall)).toBe(true);
    expect(tall.y).toBeCloseTo(EDGE_MARGIN);
    expect(realAspect(tall, landscape)).toBeCloseTo(0.2);
  });

  test("redimensionner conserve le rapport de l'image", () => {
    const r = defaultPlacement(A4, SIG);
    for (const anchor of ["corner", "center"] as const) {
      const smaller = resizeKeepingRatio(r, 0.15, anchor);
      expect(smaller.w).toBeCloseTo(0.15);
      expect(realAspect(smaller, A4)).toBeCloseTo(SIG);
    }
    // Coin : haut-gauche fixe, bornée par la place restante.
    const corner = resizeKeepingRatio(r, 0.9, "corner");
    expect(corner.x).toBe(r.x);
    expect(corner.y).toBe(r.y);
    expect(corner.x + corner.w).toBeCloseTo(1);
    expect(realAspect(corner, A4)).toBeCloseTo(SIG);
    // Centre : grandit autour du centre, recalée dans la page.
    const mid = { x: 0.4, y: 0.4, w: 0.2, h: 0.1 };
    const grown = resizeKeepingRatio(mid, 0.3, "center");
    expect(grown.x + grown.w / 2).toBeCloseTo(0.5);
    expect(grown.y + grown.h / 2).toBeCloseTo(0.45);
    expect(grown.h / grown.w).toBeCloseTo(0.5);
    const huge = resizeKeepingRatio(r, 5, "center");
    expect(inside(huge)).toBe(true);
    expect(realAspect(huge, A4)).toBeCloseTo(SIG);
  });

  test("le bornage ne fait jamais sortir la signature de la page", () => {
    const r = defaultPlacement(A4, SIG);
    for (const [dx, dy] of [
      [1, 1],
      [-2, -2],
      [0.5, -0.7],
      [Number.NaN, 0.1],
    ]) {
      const moved = moveRect(r, dx, dy);
      expect(inside(moved)).toBe(true);
      expect(moved.w).toBe(r.w);
      expect(moved.h).toBe(r.h);
    }
    const big = clampToPage({ x: -0.5, y: 0.8, w: 2, h: 0.5 });
    expect(inside(big)).toBe(true);
    expect(big.h / big.w).toBeCloseTo(0.25);
    expect(inside(clampToPage({ x: Number.NaN, y: 3, w: 0.2, h: 0.1 }))).toBe(true);
  });

  test("overlaysKey ne dépend pas de l'ordre des pages et reste stable après sérialisation", () => {
    const sig = { rect: { x: 0.66, y: 0.8, w: 0.28, h: 0.1 }, image: "signature" as const };
    const ini = { rect: { x: 0.78, y: 0.85, w: 0.16, h: 0.05 }, image: "initials" as const };
    const a: PageOverlays = { 0: [ini], 4: [sig] };
    const b: PageOverlays = { 4: [sig], 0: [ini] };
    expect(overlaysKey(a)).toBe(overlaysKey(b));
    expect(overlaysKey(JSON.parse(JSON.stringify(a)))).toBe(overlaysKey(a));
    // Page vide = page absente ; un déplacement ou un autre type d'image change la clé.
    expect(overlaysKey({ ...a, 2: [] })).toBe(overlaysKey(a));
    expect(overlaysKey({ 4: [{ ...sig, rect: { ...sig.rect, x: 0.5 } }], 0: [ini] })).not.toBe(overlaysKey(a));
    expect(overlaysKey({ 0: [ini], 4: [{ ...sig, image: "initials" }] })).not.toBe(overlaysKey(a));
    expect(overlaysKey(undefined)).toBe("");
    expect(overlaysKey({})).toBe("");
  });

  test("paraphes sur N pages : toutes sauf la page de la signature", () => {
    const sig = { rect: defaultPlacement(A4, SIG), image: "signature" as const };
    expect(initialsPages(5, { 4: [sig] })).toEqual([0, 1, 2, 3]);
    expect(initialsPages(3, { 1: [sig] })).toEqual([0, 2]);
    expect(initialsPages(2, undefined)).toEqual([0, 1]);

    const r = initialsRect(A4, SIG);
    expect(r.w).toBeCloseTo(DEFAULT_INITIALS_WIDTH);
    expect(1 - (r.x + r.w)).toBeCloseTo(EDGE_MARGIN);
    expect(realAspect(r, A4)).toBeCloseTo(SIG);

    // Le moteur l'applique page par page, avec le format réel de chaque page.
    const aspects = { pageAspect: 1 / A4, imageAspect: SIG };
    expect(overlaysOnPage({ 4: [sig] }, 4, aspects)).toEqual([sig]);
    const onFirst = overlaysOnPage({ 4: [sig] }, 0, aspects);
    expect(onFirst).toHaveLength(1);
    expect(onFirst[0].image).toBe("initials");
    expect(realAspect(onFirst[0].rect, 1 / A4)).toBeCloseTo(SIG);
    expect(overlaysOnPage({ 4: [sig] }, 0)).toEqual([]);
  });
});

describe("rendu en pixels", () => {
  test("taille minimale : agrandie autour du centre, dans le canvas", () => {
    const tiny = { x: 0.45, y: 0.475, w: 0.1, h: 0.05 }; // centre au milieu de la page
    const px = overlayPixelRect(tiny, 400, 600)!;
    expect(px.w).toBeCloseTo(MIN_OVERLAY_PX);
    expect(px.h / px.w).toBeCloseTo((0.05 * 600) / (0.1 * 400));
    expect(px.x + px.w / 2).toBeCloseTo(200);
    expect(px.y + px.h / 2).toBeCloseTo(300);
    // Au bord, l'agrandissement reste dans le canvas.
    const edge = overlayPixelRect({ x: 0.95, y: 0.97, w: 0.05, h: 0.03 }, 400, 600)!;
    expect(edge.x + edge.w).toBeLessThanOrEqual(400 + 1e-9);
    expect(edge.y + edge.h).toBeLessThanOrEqual(600 + 1e-9);
    // Canvas plus étroit que le minimum : jamais plus grand que lui.
    const receipt = overlayPixelRect({ x: 0, y: 0, w: 0.5, h: 0.1 }, 100, 300)!;
    expect(receipt.w).toBeLessThanOrEqual(100);
    // Assez grand : inchangé.
    expect(overlayPixelRect({ x: 0.5, y: 0.5, w: 0.3, h: 0.1 }, 1190, 1684)).toEqual({
      x: 595,
      y: 842,
      w: 0.3 * 1190,
      h: 0.1 * 1684,
    });
    expect(overlayPixelRect({ x: 0, y: 0, w: 0, h: 0.1 }, 100, 100)).toBeNull();
    expect(overlayTooSmall(tiny, 400)).toBe(true);
    expect(overlayTooSmall(defaultPlacement(A4, SIG), 1190)).toBe(false);
  });

  test("paintOverlays dessine chaque image à sa place, lissage soigné", () => {
    const calls: unknown[][] = [];
    const fake = {
      imageSmoothingEnabled: false,
      imageSmoothingQuality: "low",
      save() {},
      restore() {},
      drawImage(...args: unknown[]) {
        calls.push([...args, fake.imageSmoothingQuality]);
      },
    };
    const ctx = fake as unknown as CanvasRenderingContext2D;
    const signature = { width: 1200, height: 360 } as ImageBitmap;
    const images: OverlayImages = { signature };
    paintOverlays(
      ctx,
      1000,
      1000,
      [
        { rect: { x: 0.5, y: 0.5, w: 0.3, h: 0.09 }, image: "signature" },
        { rect: { x: 0.1, y: 0.1, w: 0.2, h: 0.06 }, image: "initials" },
      ],
      images
    );
    // Paraphe sans image dédiée : la signature réduite.
    expect(calls).toEqual([
      [signature, 500, 500, 300, 90, "high"],
      [signature, 100, 100, 200, 60, "high"],
    ]);
    calls.length = 0;
    paintOverlays(ctx, 1000, 1000, [{ rect: { x: 0, y: 0, w: 0.3, h: 0.1 }, image: "signature" }], undefined);
    paintOverlays(ctx, 1000, 1000, undefined, images);
    expect(calls).toEqual([]);
  });
});
