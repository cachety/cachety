import { describe, expect, test } from "bun:test";
import { inBands, makePacer, nextTask } from "./pace";
import { applyTables, autoLevels, grayInto, levelTables, toGray, warp, warpJob, type Quad } from "./photo-fix";
import { prepareUpload, recolor, removeBackground, type Pixels } from "./signature";
import { shadowPasses } from "./watermark";

/** Image d'essai : dégradés, un peu de tout dans chaque canal, alpha varié. */
function sample(width: number, height: number): Pixels {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let p = 0, i = 0; p < width * height; p++, i += 4) {
    data[i] = (p * 7) % 256;
    data[i + 1] = (p * 13 + 40) % 256;
    data[i + 2] = (p * 3 + 90) % 256;
    data[i + 3] = p % 5 === 0 ? 0 : 255 - (p % 60);
  }
  return { data, width, height };
}

describe("cadence (lib/pace.ts)", () => {
  test("nextTask rend la main : une tâche déjà en attente passe avant la suite", async () => {
    const order: string[] = [];
    setTimeout(() => order.push("minuterie"), 0);
    await new Promise((r) => setTimeout(r, 5));
    await nextTask();
    order.push("suite");
    expect(order).toEqual(["minuterie", "suite"]);
  });

  test("makePacer : ne rend pas la main avant la fin de la tranche, puis une fois", async () => {
    let yields = 0;
    const channel = globalThis.MessageChannel;
    // Compte les passages de main : chaque nextTask crée un MessageChannel.
    globalThis.MessageChannel = class extends channel {
      constructor() {
        super();
        yields++;
      }
    } as typeof MessageChannel;
    try {
      const pace = makePacer(undefined, 20);
      for (let i = 0; i < 50; i++) await pace();
      expect(yields).toBe(0);
      const until = performance.now() + 25;
      while (performance.now() < until);
      await pace();
      expect(yields).toBe(1);
      await pace();
      expect(yields).toBe(1);
    } finally {
      globalThis.MessageChannel = channel;
    }
  });

  test("makePacer : un travail abandonné lève « aborted » à l'étape suivante", async () => {
    const stale = new AbortController();
    const pace = makePacer(stale.signal);
    await pace();
    stale.abort();
    await expect(pace()).rejects.toThrow("aborted");
  });

  test("inBands : toutes les lignes, une seule fois, dans l'ordre", async () => {
    const seen: number[] = [];
    await inBands(101, makePacer(), (from, to) => {
      for (let y = from; y < to; y++) seen.push(y);
    });
    expect(seen).toEqual(Array.from({ length: 101 }, (_, i) => i));
  });
});

describe("travail par bandes : même résultat que d'un seul coup", () => {
  test("signature importée : fond retiré puis recolorée", async () => {
    const px = sample(97, 41);
    const whole = recolor(removeBackground(px, 128), "#1a1e33");
    const banded = await prepareUpload(px, 128, "#1a1e33", makePacer());
    expect(banded.data).toEqual(whole.data);
    // Chaque réglage seul, et aucun : l'image d'origine n'est jamais modifiée.
    expect((await prepareUpload(px, 128, null, makePacer())).data).toEqual(removeBackground(px, 128).data);
    expect((await prepareUpload(px, null, "#c4262e", makePacer())).data).toEqual(recolor(px, "#c4262e").data);
    expect(await prepareUpload(px, null, null, makePacer())).toBe(px);
    expect(px.data).toEqual(sample(97, 41).data);
  });

  test("photo : redressement ligne par ligne", async () => {
    const src = sample(120, 90);
    const quad: Quad = [
      { x: 0.08, y: 0.05 },
      { x: 0.93, y: 0.1 },
      { x: 0.9, y: 0.94 },
      { x: 0.04, y: 0.88 },
    ];
    const job = warpJob(src, quad, 80, 60);
    await inBands(job.out.height, makePacer(), job.rows, 7);
    expect(job.out.data).toEqual(warp(src, quad, 80, 60).data);
  });

  test("photo : blanchir puis noir et blanc, sur place", async () => {
    const src = sample(64, 48);
    const whole = toGray(autoLevels(src));
    const data = new Uint8ClampedArray(src.data);
    const row = src.width * 4;
    const tables = levelTables(src)!;
    expect(tables).not.toBeNull();
    await inBands(src.height, makePacer(), (from, to) => applyTables(data, data, tables, from * row, to * row), 5);
    await inBands(src.height, makePacer(), (from, to) => grayInto(data, data, from * row, to * row), 5);
    expect(Array.from(data)).toEqual(Array.from(whole.data));
  });
});

describe("ombre portée sans l'ombre du canevas (shadowPasses)", () => {
  const alphaOf = (fill: string) => Number(/, ([\d.]+)\)$/.exec(fill)![1]);

  test("ombre nette : une passe, au décalage demandé, densité = ombre × encre", () => {
    const passes = shadowPasses({ dx: 2, dy: -1, blur: 0, color: "rgba(20, 20, 24, 0.4)" }, "rgba(196, 38, 46, 0.25)");
    expect(passes).toHaveLength(1);
    expect(passes[0]).toMatchObject({ dx: 2, dy: -1 });
    expect(alphaOf(passes[0].fill)).toBeCloseTo(0.4 * 0.25, 4);
    expect(passes[0].fill.startsWith("rgba(20, 20, 24,")).toBe(true);
  });

  test("ombre floue : quatre passes en croix, même écart-type que le flou, même densité au total", () => {
    const blur = 2;
    const passes = shadowPasses({ dx: 3, dy: 1, blur, color: "rgba(20, 20, 24, 0.5)" }, "rgba(0, 0, 0, 0.6)");
    expect(passes).toHaveLength(4);
    // Centre de la croix : le décalage de l'ombre.
    expect(passes.reduce((s, p) => s + p.dx, 0) / 4).toBeCloseTo(3, 9);
    expect(passes.reduce((s, p) => s + p.dy, 0) / 4).toBeCloseTo(1, 9);
    // Écart-type par axe : σ = flou / 2, celui de l'ombre du canevas.
    const variance = passes.reduce((s, p) => s + (p.dx - 3) ** 2, 0) / 4;
    expect(Math.sqrt(variance)).toBeCloseTo(blur / 2, 9);
    // Quatre passes superposées retrouvent la densité voulue.
    const each = alphaOf(passes[0].fill);
    expect(1 - (1 - each) ** 4).toBeCloseTo(0.5 * 0.6, 2);
  });

  // Firefox dessine une ombre floutée cent fois plus lentement que les autres
  // moteurs : la page se figeait à chaque frappe. Elle ne doit pas revenir.
  test("aucun dessin n'utilise l'ombre du canevas", async () => {
    for (const file of ["watermark.ts", "signature.ts", "sign-block.ts", "overlays.ts", "masks.ts", "photo-page.ts"]) {
      const source = await Bun.file(new URL(`./${file}`, import.meta.url)).text();
      const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
      expect(code, file).not.toMatch(/\.shadow(Blur|Color|OffsetX|OffsetY)\s*=/);
    }
  });

  test("ombre invisible ou couleur illisible : aucune passe", () => {
    expect(shadowPasses({ dx: 1, dy: 1, blur: 0, color: "rgba(20, 20, 24, 0)" }, "rgba(0, 0, 0, 1)")).toEqual([]);
    expect(shadowPasses({ dx: 1, dy: 1, blur: 0, color: "pas une couleur" }, "rgba(0, 0, 0, 1)")).toEqual([]);
  });
});
