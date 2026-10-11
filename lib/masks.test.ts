import { describe, expect, test } from "bun:test";
import { addMask, clearPageMasks, maskCount, masksKey, rectFromDrag, removeMask } from "./masks";

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
