import { describe, expect, test } from "bun:test";
import {
  addMask,
  clearPageMasks,
  maskCount,
  masksKey,
  MIN_MASK_SIDE,
  moveRect,
  rectFromDrag,
  removeMask,
  resizeRect,
  setPageMasks,
} from "./masks";

describe("rectFromDrag", () => {
  test("tracé dans n'importe quel sens, borné à la page", () => {
    expect(rectFromDrag(0.5, 0.6, 0.2, 0.1)).toEqual({ x: 0.2, y: 0.1, w: 0.3, h: 0.5 });
    const r = rectFromDrag(-0.2, 0.9, 0.3, 1.4)!;
    expect(r.x).toBe(0);
    expect(r.y).toBeCloseTo(0.9);
    expect(r.w).toBeCloseTo(0.3);
    expect(r.h).toBeCloseTo(0.1);
  });

  test("un clic (zone minuscule) ou des valeurs invalides ne créent rien", () => {
    expect(rectFromDrag(0.5, 0.5, 0.502, 0.6)).toBeNull();
    expect(rectFromDrag(Number.NaN, 0, 0.5, 0.5)).toBeNull();
  });
});

describe("jeu de masques", () => {
  const r = { x: 0.1, y: 0.1, w: 0.2, h: 0.2 };
  test("ajout, retrait, comptage ; une page vidée disparaît", () => {
    let m = addMask(undefined, 0, r);
    m = addMask(m, 2, r);
    m = addMask(m, 2, { ...r, x: 0.5 });
    expect(maskCount(m)).toBe(3);
    m = removeMask(m, 0, 0);
    expect(Object.keys(m)).toEqual(["2"]);
    expect(maskCount(removeMask(removeMask(m, 2, 0), 2, 0))).toBe(0);
    expect(clearPageMasks(m, 2)).toEqual({});
  });

  test("la clé change avec les masques et ignore l'ordre d'insertion des pages", () => {
    const a = addMask(addMask(undefined, 3, r), 1, r);
    const b = addMask(addMask(undefined, 1, r), 3, r);
    expect(masksKey(a)).toBe(masksKey(b));
    expect(masksKey(a)).not.toBe(masksKey(addMask(a, 1, r)));
    expect(masksKey(undefined)).toBe("");
  });
});

describe("édition des masques", () => {
  const r = { x: 0.2, y: 0.3, w: 0.4, h: 0.2 };

  test("déplacer garde la taille et reste dans la page", () => {
    const moved = moveRect(r, 0.1, -0.1);
    expect(moved.x).toBeCloseTo(0.3);
    expect(moved.y).toBeCloseTo(0.2);
    expect([moved.w, moved.h]).toEqual([0.4, 0.2]);
    const far = moveRect(r, 5, 5);
    expect(far.x + far.w).toBeCloseTo(1);
    expect(far.y + far.h).toBeCloseTo(1);
    expect(moveRect(r, -5, -5)).toEqual({ x: 0, y: 0, w: 0.4, h: 0.2 });
  });

  test("redimensionner par le coin : bornée à la page et à la taille minimale", () => {
    const big = resizeRect(r, 0.9, 0.9);
    expect([big.x, big.y]).toEqual([0.2, 0.3]);
    expect(big.w).toBeCloseTo(0.7);
    expect(big.h).toBeCloseTo(0.6);
    expect(resizeRect(r, 2, 2).w).toBeCloseTo(0.8);
    expect(resizeRect(r, 0, 0)).toEqual({ x: 0.2, y: 0.3, w: MIN_MASK_SIDE, h: MIN_MASK_SIDE });
  });

  test("remplacer les masques d'une page, ou les retirer tous", () => {
    expect(setPageMasks({ 0: [r], 1: [r] }, 0, [])).toEqual({ 1: [r] });
    expect(setPageMasks(undefined, 2, [r])).toEqual({ 2: [r] });
  });
});
