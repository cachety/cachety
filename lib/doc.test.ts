import { describe, expect, test } from "bun:test";
import { moveTo, slotToIndex } from "./doc";

describe("moveTo (réordonner les documents)", () => {
  test("déplace vers le haut, vers le bas, au début, à la fin", () => {
    expect(moveTo(["a", "b", "c", "d"], 3, 0)).toEqual(["d", "a", "b", "c"]);
    expect(moveTo(["a", "b", "c", "d"], 0, 3)).toEqual(["b", "c", "d", "a"]);
    expect(moveTo(["a", "b", "c", "d"], 1, 2)).toEqual(["a", "c", "b", "d"]);
  });

  test("une position saisie hors limites est bornée à la liste", () => {
    expect(moveTo(["a", "b", "c"], 0, 99)).toEqual(["b", "c", "a"]);
    expect(moveTo(["a", "b", "c"], 2, -5)).toEqual(["c", "a", "b"]);
  });

  test("rien ne bouge : même tableau (pas de re-rendu)", () => {
    const same = ["a", "b", "c"];
    expect(moveTo(same, 1, 1)).toBe(same);
    expect(moveTo(same, -1, 0)).toBe(same);
    expect(moveTo(same, 3, 0)).toBe(same);
    expect(moveTo(same, 0, Number.NaN)).toBe(same);
    expect(moveTo(same, 0, 1.5)).toBe(same);
  });

  test("n'altère jamais le tableau d'origine", () => {
    const src = ["a", "b", "c"];
    moveTo(src, 0, 2);
    expect(src).toEqual(["a", "b", "c"]);
  });
});

describe("slotToIndex (glisser-déposer)", () => {
  test("interstice avant ou après soi-même : aucun déplacement", () => {
    expect(slotToIndex(2, 2)).toBe(2);
    expect(slotToIndex(2, 3)).toBe(2);
  });

  test("lâché plus haut ou plus bas : index final correct", () => {
    expect(slotToIndex(3, 0)).toBe(0); // avant la première ligne
    expect(slotToIndex(0, 4)).toBe(3); // après la dernière de 4
    expect(slotToIndex(0, 2)).toBe(1);
    expect(moveTo(["a", "b", "c", "d"], 0, slotToIndex(0, 2))).toEqual(["b", "a", "c", "d"]);
  });
});
