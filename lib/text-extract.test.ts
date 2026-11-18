import { describe, expect, test } from "bun:test";
import { MAX_TEXT_CHARS, MAX_TEXT_ITEMS, textCollector, type TextPageLike } from "./text-extract";
import type { TextItemLike, ViewportLike } from "./text-lines";

const A4: ViewportLike = { width: 1190, height: 1684, transform: [2, 0, 0, -2, 0, 1684] };
const item = (str: string, y: number): TextItemLike => ({ str, transform: [10, 0, 0, 10, 50, y], width: str.length * 5 });

/** Page pdf.js factice : son texte arrive par morceaux, comme page.streamTextContent(). */
function fakePage(chunks: TextItemLike[][], watch?: { cancelled: boolean; pulled: number }): TextPageLike {
  return {
    streamTextContent() {
      let i = 0;
      return new ReadableStream({
        pull(controller) {
          if (watch) watch.pulled++;
          if (i < chunks.length) controller.enqueue({ items: chunks[i++], styles: {} });
          else controller.close();
        },
        cancel() {
          if (watch) watch.cancelled = true;
        },
      });
    },
  };
}

describe("lecture du texte d'un PDF (plafonds, pannes)", () => {
  test("une page : ses lignes ; les pages dans l'ordre", async () => {
    const c = textCollector();
    await c.add(fakePage([[item("IBAN DE89 3704 0044 0532 0130 00", 700)], [item("Net à payer", 650)]]), A4);
    await c.add(fakePage([]), A4);
    await c.add(fakePage([[item("page 3", 700)]]), A4);
    expect(c.lines.map((p) => p.map((l) => l.text))).toEqual([["IBAN DE89 3704 0044 0532 0130 00", "Net à payer"], [], ["page 3"]]);
    expect(c.incomplete).toBe(false);
  });

  test("plafonds annoncés : 200 000 éléments, 2 millions de caractères", () => {
    expect(MAX_TEXT_ITEMS).toBe(200_000);
    expect(MAX_TEXT_CHARS).toBe(2_000_000);
  });

  test("trop d'éléments : la lecture s'arrête, le flux est annulé, les pages suivantes ne sont pas lues", async () => {
    const c = textCollector(5, 1000);
    const watch = { cancelled: false, pulled: 0 };
    const chunks = Array.from({ length: 50 }, (_, i) => [item(`a${i}`, 800 - i * 12), item(`b${i}`, 794 - i * 12)]);
    await c.add(fakePage(chunks, watch), A4);
    expect(c.incomplete).toBe(true);
    expect(watch.cancelled).toBe(true);
    // Arrêt au troisième morceau : le reste de la page n'a pas été demandé.
    expect(watch.pulled).toBeLessThan(10);
    expect(c.lines[0].map((l) => l.text)).toEqual(["a0", "b0", "a1", "b1", "a2"]);
    const later = { cancelled: false, pulled: 0 };
    await c.add(fakePage([[item("jamais lu", 700)]], later), A4);
    expect(later.pulled).toBe(0);
    expect(c.lines).toHaveLength(2);
    expect(c.lines[1]).toEqual([]);
  });

  test("trop de caractères : même arrêt", async () => {
    const c = textCollector(1000, 50);
    await c.add(fakePage([[item("x".repeat(40), 700)], [item("y".repeat(40), 680)], [item("z", 660)]]), A4);
    expect(c.incomplete).toBe(true);
    expect(c.lines[0].map((l) => l.text)).toEqual(["x".repeat(40)]);
  });

  test("page illisible : comptée vide, signalée, sans exception ; les suivantes sont lues", async () => {
    const c = textCollector();
    const broken: TextPageLike = {
      streamTextContent() {
        return new ReadableStream({
          pull() {
            throw new Error("pdf.js : page abîmée");
          },
        });
      },
    };
    await c.add(broken, A4);
    await c.add({ streamTextContent: () => { throw new Error("pas de texte"); } }, A4);
    await c.add(fakePage([[item("page 3", 700)]]), A4);
    expect(c.lines.map((p) => p.length)).toEqual([0, 0, 1]);
    expect(c.incomplete).toBe(true);
  });

  test("morceaux forgés (ni chaîne ni tableau) : ignorés", async () => {
    const c = textCollector();
    const junk = [[null, 5, { str: 7 }, { type: "beginMarkedContent" }, item("ok", 700)]] as unknown as TextItemLike[][];
    await c.add(fakePage(junk), A4);
    expect(c.lines[0].map((l) => l.text)).toEqual(["ok"]);
    expect(c.incomplete).toBe(false);
  });
});
