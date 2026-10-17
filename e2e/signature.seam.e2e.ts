// Couture navigateur de lib/signature.ts et lib/sign-block.ts : le VRAI code
// (canvas, createImageBitmap, libheif) dans un vrai navigateur, sans
// l'interface. Les fonctions de pixels pures sont couvertes sous Bun
// (lib/signature.test.ts) ; ici, tout ce qui demande un canvas.
//
// Fichier *.e2e.ts : ignoré par `bun test` ; lancé par `bun run test:e2e`.

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { startEngine, type Engine } from "./helpers/engine";
import { HEIC_320x240_B64 } from "./helpers/fixtures";

let engine: Engine;

beforeAll(async () => {
  engine = await startEngine({ __sig: "lib/signature.ts", __blk: "lib/sign-block.ts" });
  // Outils de page partagés par les tests.
  await engine.page.evaluate(() => {
    const w = window as any;
    w.__px = async (png: Uint8Array<ArrayBuffer>) => {
      const bmp = await createImageBitmap(new Blob([png], { type: "image/png" }));
      const c = new OffscreenCanvas(bmp.width, bmp.height);
      const ctx = c.getContext("2d")!;
      ctx.drawImage(bmp, 0, 0);
      bmp.close();
      return ctx.getImageData(0, 0, c.width, c.height);
    };
    /** Proportion de pixels d'alpha ≥ 128, et alpha des quatre coins. */
    w.__stats = (img: ImageData) => {
      let opaque = 0;
      let transparent = 0;
      for (let i = 3; i < img.data.length; i += 4) {
        if (img.data[i] >= 128) opaque++;
        if (img.data[i] === 0) transparent++;
      }
      const n = img.width * img.height;
      const a = (x: number, y: number) => img.data[(y * img.width + x) * 4 + 3];
      const corners = [a(0, 0), a(img.width - 1, 0), a(0, img.height - 1), a(img.width - 1, img.height - 1)];
      return { width: img.width, height: img.height, opaque: opaque / n, transparent: transparent / n, corners };
    };
    /** Toile transparente avec un trait d'encre (comme le pavé « Dessiner »). */
    w.__drawn = (width: number, height: number, color = "#111111") => {
      const c = new OffscreenCanvas(width, height);
      const ctx = c.getContext("2d")!;
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(width * 0.3, height * 0.6);
      ctx.bezierCurveTo(width * 0.4, height * 0.1, width * 0.5, height * 0.9, width * 0.65, height * 0.4);
      ctx.stroke();
      return c;
    };
  });
});

afterAll(async () => {
  await engine?.stop();
});

describe("toPng", () => {
  test("le PNG se décode, garde les pixels transparents et l'encre opaque", async () => {
    const r = await engine.page.evaluate(async () => {
      const w = window as any;
      const data = new Uint8ClampedArray(40 * 20 * 4);
      for (let y = 5; y < 15; y++) for (let x = 10; x < 30; x++) data.set([17, 17, 17, 255], (y * 40 + x) * 4);
      const png: Uint8Array = await w.__sig.toPng({ data, width: 40, height: 20 });
      const img: ImageData = await w.__px(png);
      return {
        magic: Array.from(png.subarray(0, 8)),
        stats: w.__stats(img),
        ink: Array.from(img.data.subarray((10 * 40 + 20) * 4, (10 * 40 + 20) * 4 + 4)),
      };
    });
    expect(r.magic).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect([r.stats.width, r.stats.height]).toEqual([40, 20]);
    expect(r.stats.corners).toEqual([0, 0, 0, 0]);
    expect(r.stats.transparent).toBeCloseTo(0.75, 2);
    expect(r.ink).toEqual([17, 17, 17, 255]);
  });
});

describe("finishSignature / signatureFromCanvas", () => {
  test("rognée à l'encre, agrandie à ≥ 1200 px, transparente autour", async () => {
    const r = await engine.page.evaluate(async () => {
      const w = window as any;
      const canvas = w.__drawn(600, 200);
      const box = w.__sig.inkBounds(canvas.getContext("2d").getImageData(0, 0, 600, 200));
      const sig = await w.__sig.signatureFromCanvas(canvas);
      const img = await w.__px(sig.png);
      return { box, sig: { width: sig.width, height: sig.height }, stats: w.__stats(img) };
    });
    expect(r.sig.width).toBeGreaterThanOrEqual(1200);
    expect(r.sig.width).toBe(r.stats.width);
    expect(r.sig.height).toBe(r.stats.height);
    // Rapport de la boîte d'encre (marge comprise) conservé.
    expect(r.sig.width / r.sig.height).toBeCloseTo(r.box.w / r.box.h, 1);
    // Rognée : la boîte est bien plus petite que la toile de 600 × 200.
    expect(r.box.w).toBeLessThan(600 * 0.5);
    expect(r.stats.corners).toEqual([0, 0, 0, 0]);
    expect(r.stats.opaque).toBeGreaterThan(0.005);
    expect(r.stats.transparent).toBeGreaterThan(0.5);
  });

  test("toile vide : « signature_empty »", async () => {
    const error = await engine.page.evaluate(async () => {
      const w = window as any;
      try {
        await w.__sig.signatureFromCanvas(new OffscreenCanvas(300, 100));
        return null;
      } catch (e) {
        return (e as Error).message;
      }
    });
    expect(error).toBe("signature_empty");
  });

  test("signatureKey : 16 caractères hex du SHA-256, stable, change avec le dessin", async () => {
    const r = await engine.page.evaluate(async () => {
      const w = window as any;
      const a = await w.__sig.signatureFromCanvas(w.__drawn(600, 200));
      const b = await w.__sig.signatureFromCanvas(w.__drawn(600, 200, "#1b3a8a"));
      const bmp: ImageBitmap = await w.__sig.signatureBitmap(a);
      const dims = [bmp.width, bmp.height, a.width, a.height];
      bmp.close();
      return { a1: await w.__sig.signatureKey(a), a2: await w.__sig.signatureKey(a), b: await w.__sig.signatureKey(b), dims };
    });
    expect(r.a1).toMatch(/^[0-9a-f]{16}$/);
    expect(r.a1).toBe(r.a2);
    expect(r.b).not.toBe(r.a1);
    expect(r.dims[0]).toBe(r.dims[2]);
    expect(r.dims[1]).toBe(r.dims[3]);
  });
});

describe("renderTypedSignature", () => {
  test("le nom tapé donne un PNG ≥ 1200 px, transparent, dans l'encre choisie", async () => {
    const r = await engine.page.evaluate(async () => {
      const w = window as any;
      const sig = await w.__sig.renderTypedSignature("Camille Dupont", "#1b3a8a");
      const img: ImageData = await w.__px(sig.png);
      // Couleur des pixels pleinement opaques : l'encre bleue.
      let blue = 0;
      let full = 0;
      for (let i = 0; i < img.data.length; i += 4) {
        if (img.data[i + 3] !== 255) continue;
        full++;
        // Tolérance : le rééchantillonnage arrondit d'une ou deux unités.
        const d = Math.abs(img.data[i] - 0x1b) + Math.abs(img.data[i + 1] - 0x3a) + Math.abs(img.data[i + 2] - 0x8a);
        if (d <= 12) blue++;
      }
      let empty: string | null = null;
      try {
        await w.__sig.renderTypedSignature("   ");
      } catch (e) {
        empty = (e as Error).message;
      }
      return { width: sig.width, height: sig.height, stats: w.__stats(img), blue: blue / Math.max(1, full), empty };
    });
    expect(r.width).toBeGreaterThanOrEqual(1200);
    expect(r.width / r.height).toBeGreaterThan(2);
    expect(r.stats.corners).toEqual([0, 0, 0, 0]);
    expect(r.stats.opaque).toBeGreaterThan(0.02);
    expect(r.blue).toBeGreaterThan(0.95);
    expect(r.empty).toBe("signature_empty");
  });
});

describe("fromFile", () => {
  test("JPG « signature sur papier blanc » + removeBackground : fond transparent, encre opaque", async () => {
    const r = await engine.page.evaluate(async () => {
      const w = window as any;
      // Photo simulée : papier blanc cassé avec grain, trait d'encre sombre.
      const c = new OffscreenCanvas(800, 400);
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#f2efe8";
      ctx.fillRect(0, 0, 800, 400);
      const grain = ctx.getImageData(0, 0, 800, 400);
      let seed = 7;
      for (let i = 0; i < grain.data.length; i += 4) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        const n = (seed % 15) - 7;
        for (let k = 0; k < 3; k++) grain.data[i + k] += n;
      }
      ctx.putImageData(grain, 0, 0);
      ctx.strokeStyle = "#1c2140";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(150, 260);
      ctx.bezierCurveTo(250, 60, 380, 340, 650, 150);
      ctx.stroke();
      const jpg = await c.convertToBlob({ type: "image/jpeg", quality: 0.85 });
      const file = new File([jpg], "signature.jpg", { type: "image/jpeg" });

      const pixels = await w.__sig.fromFile(file);
      const cut = w.__sig.removeBackground(pixels, w.__sig.BACKGROUND_THRESHOLD.fallback);
      const at = (x: number, y: number) => cut.data[(y * cut.width + x) * 4 + 3];
      const sig = await w.__sig.finishSignature(cut);
      const img = await w.__px(sig.png);
      return {
        size: [pixels.width, pixels.height],
        paper: [at(20, 20), at(780, 380), at(400, 30)],
        // Point sur le trait : départ de la courbe.
        ink: at(150, 260),
        sig: { width: sig.width, height: sig.height },
        stats: w.__stats(img),
      };
    });
    expect(r.size).toEqual([800, 400]);
    expect(r.paper).toEqual([0, 0, 0]);
    expect(r.ink).toBe(255);
    expect(r.sig.width).toBeGreaterThanOrEqual(1200);
    expect(r.stats.corners).toEqual([0, 0, 0, 0]);
    expect(r.stats.transparent).toBeGreaterThan(0.6);
    expect(r.stats.opaque).toBeGreaterThan(0.01);
  });

  test("PNG transparent importé (« garder le fond ») : alpha d'origine conservé", async () => {
    const r = await engine.page.evaluate(async () => {
      const w = window as any;
      const png = await w.__sig.signatureFromCanvas(w.__drawn(600, 200));
      const file = new File([png.png], "sig.png", { type: "image/png" });
      const pixels = await w.__sig.fromFile(file);
      return { size: [pixels.width, pixels.height], expected: [png.width, png.height], corner: pixels.data[3] };
    });
    expect(r.size).toEqual(r.expected);
    expect(r.corner).toBe(0);
  });

  test("HEIC (photo d'iPhone) : décodé localement par libheif", async () => {
    const r = await engine.page.evaluate(async (b64) => {
      const w = window as any;
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const pixels = await w.__sig.fromFile(new File([bytes], "IMG_0001.HEIC", { type: "image/heic" }));
      const px = (x: number, y: number): number[] => Array.from(pixels.data.subarray((y * pixels.width + x) * 4, (y * pixels.width + x) * 4 + 4));
      return { size: [pixels.width, pixels.height], left: px(40, 120), right: px(280, 120) };
    }, HEIC_320x240_B64);
    expect(r.size).toEqual([320, 240]);
    // Moitié gauche bleue, moitié droite verte, opaques.
    expect(r.left[2]).toBeGreaterThan(r.left[1] + 50);
    expect(r.right[1]).toBeGreaterThan(r.right[2] + 50);
    expect([r.left[3], r.right[3]]).toEqual([255, 255]);
  });

  test("en-tête annonçant 40 000 × 40 000 px : « image_too_large » sans décoder", async () => {
    const error = await engine.page.evaluate(async () => {
      const w = window as any;
      // Signature PNG + IHDR seuls : de quoi lire les dimensions, rien à décoder.
      const head = new Uint8Array(33);
      head.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13, 0x49, 0x48, 0x44, 0x52]);
      new DataView(head.buffer).setUint32(16, 40000);
      new DataView(head.buffer).setUint32(20, 40000);
      head.set([8, 6, 0, 0, 0], 24);
      try {
        await w.__sig.fromFile(new File([head], "bombe.png", { type: "image/png" }));
        return null;
      } catch (e) {
        return (e as Error).message;
      }
    });
    expect(error).toBe("image_too_large");
  });

  test("octets illisibles : « image_unreadable » ; autre type : « unsupported »", async () => {
    const r = await engine.page.evaluate(async () => {
      const w = window as any;
      const fail = async (file: File) => {
        try {
          await w.__sig.fromFile(file);
          return null;
        } catch (e) {
          return (e as Error).message;
        }
      };
      return {
        junk: await fail(new File([new Uint8Array([1, 2, 3, 4])], "x.png", { type: "image/png" })),
        pdf: await fail(new File(["%PDF-1.7"], "x.pdf", { type: "application/pdf" })),
      };
    });
    expect(r.junk).toBe("image_unreadable");
    expect(r.pdf).toBe("unsupported");
  });
});

describe("composeSignatureWithBlock", () => {
  test("lignes ajoutées sous la signature : image plus haute, toujours transparente", async () => {
    const r = await engine.page.evaluate(async () => {
      const w = window as any;
      const sig = await w.__sig.signatureFromCanvas(w.__drawn(600, 200));
      const lines = w.__blk.composeSignBlock({ mention: "Lu et approuvé", place: "Fait à Paris", date: "17/10/2026" });
      const withBlock = await w.__blk.composeSignatureWithBlock(sig, lines, "black");
      const same = await w.__blk.composeSignatureWithBlock(sig, [], "black");
      const img: ImageData = await w.__px(withBlock.png);
      // Encre dans le tiers bas : le texte du bloc.
      let lowInk = 0;
      for (let y = Math.floor(img.height * 0.7); y < img.height; y++)
        for (let x = 0; x < img.width; x++) if (img.data[(y * img.width + x) * 4 + 3] >= 128) lowInk++;
      return {
        lines,
        before: [sig.width, sig.height],
        after: [withBlock.width, withBlock.height],
        stats: w.__stats(img),
        lowInk,
        unchanged: same === sig,
      };
    });
    expect(r.lines).toEqual(["Lu et approuvé", "Fait à Paris, 17/10/2026"]);
    expect(r.after[0]).toBeGreaterThanOrEqual(1200);
    // Plus haute en proportion : le rapport largeur/hauteur baisse nettement.
    expect(r.after[0] / r.after[1]).toBeLessThan((r.before[0] / r.before[1]) * 0.85);
    expect(r.stats.corners).toEqual([0, 0, 0, 0]);
    expect(r.stats.transparent).toBeGreaterThan(0.5);
    expect(r.lowInk).toBeGreaterThan(100);
    expect(r.unchanged).toBe(true);
  });
});
