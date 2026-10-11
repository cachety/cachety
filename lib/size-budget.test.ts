import { describe, expect, test } from "bun:test";
import { ENCODE_LADDER, mbToBytes, pageBudget, shareOfBudget } from "./size-budget";

describe("budget de taille", () => {
  test("le budget par page laisse la place à la structure PDF", () => {
    const max = mbToBytes(2);
    const per = pageBudget(max, 10);
    expect(per * 10 + 4096 + 600 * 10).toBeLessThanOrEqual(max);
    expect(pageBudget(10_000, 500)).toBe(4096); // plancher : une page reste lisible
  });

  test("l'échelle de compression va du plus fidèle au plus compact", () => {
    expect(ENCODE_LADDER[0]).toEqual({ scale: 1, quality: 0.85 });
    const last = ENCODE_LADDER[ENCODE_LADDER.length - 1];
    expect(last.scale).toBeLessThan(0.5);
    for (let i = 1; i < ENCODE_LADDER.length; i++) {
      const [a, b] = [ENCODE_LADDER[i - 1], ENCODE_LADDER[i]];
      expect(a.scale > b.scale || (a.scale === b.scale && a.quality > b.quality)).toBe(true);
    }
  });

  test("part proportionnelle aux pages pour un PDF unique", () => {
    expect(shareOfBudget(1000, 3, 10)).toBe(300);
    expect(shareOfBudget(1000, 1, 0)).toBe(1000);
  });
});
