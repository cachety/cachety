import { describe, expect, test } from "bun:test";
import {
  docStamp,
  isFresh,
  isPlaced,
  moveTo,
  needsAttention,
  needsPlacement,
  outName,
  placeSignature,
  refitOverlays,
  signaturePage,
  slotToIndex,
  type Doc,
} from "./doc";
import { STRINGS } from "./i18n";
import type { PageOverlays } from "./overlays";

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

const doc = (extra: Partial<Doc> = {}): Doc => ({
  id: "a",
  file: new File(["x"], "bail.pdf", { type: "application/pdf" }),
  status: "ready",
  ...extra,
});
const sig = (x: number, y: number, w: number, h: number) => ({ rect: { x, y, w, h }, image: "signature" as const });

describe("mode « signer » : placement par document", () => {
  test("docStamp : inchangé sans signature, change quand elle bouge", () => {
    expect(docStamp(doc(), "s")).toBe("s");
    // Retirée (×) ≠ jamais placée : sinon le rendu sans signature fait après ×
    // passerait pour à jour quand « remettre à sa place » revient à undefined.
    expect(docStamp(doc({ overlays: {} }), "s")).not.toBe("s");
    expect(docStamp(doc({ overlays: {} }), "s")).not.toBe(docStamp(doc({ overlays: { 0: [sig(0, 0, 0.1, 0.1)] } }), "s"));
    const a = docStamp(doc({ overlays: { 2: [sig(0.5, 0.8, 0.28, 0.1)] } }), "s");
    const b = docStamp(doc({ overlays: { 2: [sig(0.51, 0.8, 0.28, 0.1)] } }), "s");
    expect(a).not.toBe("s");
    expect(a).not.toBe(b);
    // Masques et signature se cumulent.
    const both = docStamp(
      doc({ masks: { 0: [{ x: 0, y: 0, w: 0.1, h: 0.1 }] }, overlays: { 2: [sig(0.5, 0.8, 0.28, 0.1)] } }),
      "s"
    );
    expect(both).not.toBe(a);
  });

  test("signaturePage et needsPlacement : jamais placée ≠ retirée", () => {
    expect(signaturePage(undefined)).toBeNull();
    expect(signaturePage({ 3: [sig(0, 0, 0.1, 0.1)] })).toBe(3);
    expect(signaturePage({ 0: [{ rect: { x: 0, y: 0, w: 0.1, h: 0.1 }, image: "initials" }] })).toBeNull();
    expect(needsPlacement(doc())).toBe(false);
    expect(needsPlacement(doc({ overlays: {} }))).toBe(true);
    expect(needsPlacement(doc({ overlays: { 1: [sig(0, 0, 0.1, 0.1)] } }))).toBe(false);
    expect(needsAttention(doc({ overlays: {} }))).toBe(false);
    expect(needsAttention(doc({ overlays: {} }), true)).toBe(true);
  });

  test("isPlaced et isFresh : un rendu sans signature n'est jamais prêt à signer", () => {
    expect(isPlaced(doc())).toBe(false);
    expect(isPlaced(doc({ overlays: {} }))).toBe(false);
    expect(isPlaced(doc({ overlays: { 1: [sig(0, 0, 0.1, 0.1)] } }))).toBe(true);
    // × puis rendu (overlays {}), puis « remettre à sa place » (undefined) :
    // l'ancien résultat, sans signature, n'est plus à jour.
    const result = { blob: new Blob([]), extension: "pdf", pageCount: 1 } as unknown as Doc["result"];
    const removed = doc({ overlays: {}, result });
    const stampedWith = docStamp(removed, "s");
    expect(isFresh({ ...removed, stampedWith }, "s")).toBe(true);
    expect(isFresh({ ...removed, stampedWith, overlays: undefined }, "s")).toBe(false);
  });

  test("placeSignature : une seule signature, déplacée d'une page à l'autre ou retirée", () => {
    const start: PageOverlays = { 4: [sig(0.6, 0.8, 0.28, 0.1)] };
    const moved = placeSignature(start, 1, { x: 0.1, y: 0.2, w: 0.3, h: 0.1 });
    expect(Object.keys(moved)).toEqual(["1"]);
    expect(moved[1][0].rect).toEqual({ x: 0.1, y: 0.2, w: 0.3, h: 0.1 });
    expect(placeSignature(moved, 1, null)).toEqual({});
    // Hors de la page : recalée.
    const r = placeSignature({}, 0, { x: 0.9, y: 0.95, w: 0.3, h: 0.1 })[0][0].rect;
    expect(r.x).toBeCloseTo(0.7);
    expect(r.y).toBeCloseTo(0.9);
    expect(start[4]).toHaveLength(1);
  });

  test("refitOverlays : même largeur et même bord bas, hauteur selon le nouveau rapport", () => {
    const o: PageOverlays = { 0: [sig(0.6, 0.8, 0.3, 0.1)] };
    expect(refitOverlays(o, 3, 3)).toBe(o);
    expect(refitOverlays(undefined, 3, 2)).toBeUndefined();
    const r = refitOverlays(o, 3, 1.5)![0][0].rect;
    expect(r.w).toBeCloseTo(0.3);
    expect(r.h).toBeCloseTo(0.2);
    expect(r.y + r.h).toBeCloseTo(0.9);
    expect(r.x).toBeCloseTo(0.6);
  });

  test("outName : suffixe « signed » en mode « signer »", () => {
    const t = STRINGS.fr;
    expect(outName(doc(), t, "pdf", t.sign.suffix)).toBe("bail-signed.pdf");
    expect(outName(doc(), t, "pdf")).toBe(`bail-${t.suffix}.pdf`);
  });
});
