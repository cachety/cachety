// Banc d'essai « suppression du filigrane » : les attaques des outils publics
// de suppression, rejouées sur la VRAIE sortie du moteur (page de PDF, JPEG
// q85). Mesure ce qui survit du filigrane, pas seulement « est-ce visible ».
//
// survie = moyenne, sur les pixels touchés par le filigrane, de
//          |attaqué − original| / |filigrané − original|   (bornée à 1)
// 1 : intact ; 0 : retiré parfaitement.
//
// Attaques :
//  - teinte   : sélection de la couleur du filigrane, remplacée par du blanc
//               (« plage de couleurs », 3 lignes de code) ;
//  - niveaux  : tout ce qui n'est pas du texte sombre devient blanc ;
//  - médian   : filtre médian 5×5 (efface les traits fins) ;
//  - multi    : estimation du filigrane à partir de plusieurs documents
//               portant le même tampon (Dekel et al., CVPR 2017), puis
//               inversion du mélange alpha.
//
// Fichier *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { startEngine, type Engine } from "./helpers/engine";
import { makePayslipPdf, toBase64 } from "./helpers/fixtures";

const TEXT = "Dossier location — Agence Martin · 10/10/2026 · réf. NFX37";
const INK = [0xc4, 0x26, 0x2e]; // couleur par défaut (rouge sceau)
const COPIES = 6;

let engine: Engine;
let scores: Record<string, number>;

beforeAll(async () => {
  engine = await startEngine();
  const docs = await Promise.all(Array.from({ length: COPIES }, (_, i) => makePayslipPdf(i + 1)));
  scores = await engine.page.evaluate(
    async ({ docs, text, ink, copies }) => {
      const wm = (window as any).__wm;
      type Px = { w: number; h: number; d: Uint8ClampedArray };
      const pixels = async (url: string): Promise<Px> => {
        const bmp = await createImageBitmap(await (await fetch(url)).blob());
        const c = new OffscreenCanvas(bmp.width, bmp.height);
        const ctx = c.getContext("2d")!;
        ctx.drawImage(bmp, 0, 0);
        return { w: bmp.width, h: bmp.height, d: ctx.getImageData(0, 0, bmp.width, bmp.height).data };
      };
      const render = async (b64: string, t: string) => {
        const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        const res = await wm.watermarkFile(new File([bin], "p.pdf", { type: "application/pdf" }), t);
        const px = await pixels(res.previews[0]);
        wm.releaseResult(res);
        return px;
      };
      // L'original : même rendu, sans filigrane (texte vide → rien n'est dessiné).
      const clean = await render(docs[0], " ");
      const marked = await Promise.all(docs.map((b) => render(b, text)));
      const target = marked[0];

      const survival = (att: Uint8ClampedArray) => {
        let sum = 0;
        let n = 0;
        for (let i = 0; i < att.length; i += 4) {
          const d0 =
            Math.abs(target.d[i] - clean.d[i]) + Math.abs(target.d[i + 1] - clean.d[i + 1]) + Math.abs(target.d[i + 2] - clean.d[i + 2]);
          if (d0 < 40) continue;
          const d1 = Math.abs(att[i] - clean.d[i]) + Math.abs(att[i + 1] - clean.d[i + 1]) + Math.abs(att[i + 2] - clean.d[i + 2]);
          sum += Math.min(1, d1 / d0);
          n++;
        }
        return sum / n;
      };
      // Texte du document détruit par l'attaque (dommage collatéral pour l'attaquant).
      const textLoss = (att: Uint8ClampedArray) => {
        let dark = 0;
        let lost = 0;
        for (let i = 0; i < att.length; i += 4) {
          if (Math.min(clean.d[i], clean.d[i + 1], clean.d[i + 2]) > 90) continue;
          dark++;
          if (Math.min(att[i], att[i + 1], att[i + 2]) > 160) lost++;
        }
        return lost / dark;
      };
      const hueOf = (r: number, g: number, b: number) => {
        const max = Math.max(r, g, b);
        const c = max - Math.min(r, g, b);
        if (!c) return 0;
        const h = max === r ? ((g - b) / c) % 6 : max === g ? (b - r) / c + 2 : (r - g) / c + 4;
        return (h * 60 + 360) % 360;
      };

      // 1. Teinte : l'attaquant connaît la couleur du filigrane.
      const inkHue = hueOf(ink[0], ink[1], ink[2]);
      const hue = new Uint8ClampedArray(target.d);
      for (let i = 0; i < hue.length; i += 4) {
        const [r, g, b] = [hue[i], hue[i + 1], hue[i + 2]];
        const chroma = Math.max(r, g, b) - Math.min(r, g, b);
        const dh = Math.abs(((hueOf(r, g, b) - inkHue + 540) % 360) - 180);
        if ((chroma > 20 && dh < 35) || Math.min(r, g, b) > 200) hue[i] = hue[i + 1] = hue[i + 2] = 255;
      }
      // 2. Niveaux : seul le sombre survit.
      const levels = new Uint8ClampedArray(target.d);
      for (let i = 0; i < levels.length; i += 4)
        if (Math.min(levels[i], levels[i + 1], levels[i + 2]) > 110) levels[i] = levels[i + 1] = levels[i + 2] = 255;
      // 3. Médian 5×5, par canal.
      const median = new Uint8ClampedArray(target.d);
      const { w, h } = target;
      const win = new Uint8Array(25);
      for (let y = 2; y < h - 2; y++)
        for (let x = 2; x < w - 2; x++)
          for (let c = 0; c < 3; c++) {
            let k = 0;
            for (let dy = -2; dy <= 2; dy++)
              for (let dx = -2; dx <= 2; dx++) win[k++] = target.d[((y + dy) * w + x + dx) * 4 + c];
            win.sort();
            median[(y * w + x) * 4 + c] = win[12];
          }
      // 4. Multi-copies : médiane des documents = estimation du filigrane sur
      //    fond blanc, puis inversion du mélange alpha sur le document visé.
      const multi = new Uint8ClampedArray(target.d);
      const stack = new Uint8Array(copies);
      for (let i = 0; i < multi.length; i += 4) {
        let alpha = 0;
        for (let c = 0; c < 3; c++) {
          for (let k = 0; k < copies; k++) stack[k] = marked[k].d[i + c];
          stack.sort();
          const est = stack[copies >> 1];
          if (255 - ink[c] > 60) alpha = Math.max(alpha, (255 - est) / (255 - ink[c]));
        }
        alpha = Math.min(0.95, alpha);
        if (alpha < 0.03) continue;
        for (let c = 0; c < 3; c++) multi[i + c] = (target.d[i + c] - alpha * ink[c]) / (1 - alpha);
      }

      return {
        hue: survival(hue),
        hueTextLoss: textLoss(hue),
        levels: survival(levels),
        levelsTextLoss: textLoss(levels),
        median: survival(median),
        multi: survival(multi),
        identity: survival(target.d),
      };
    },
    { docs: docs.map(toBase64), text: TEXT, ink: INK, copies: COPIES }
  );
  console.log("[suppression] survie du filigrane :", JSON.stringify(scores, (_, v) => (typeof v === "number" ? +v.toFixed(3) : v)));
}, 300_000);

afterAll(async () => {
  await engine?.stop();
});

// Seuils : mesures du 10/10/2026 avec une marge. Avant le contour sombre et
// la variation par copie, la teinte et les niveaux laissaient 0,16, et
// l'estimation multi-copies 0,20 : le filigrane disparaissait.
describe("banc d'essai : suppression du filigrane", () => {
  test("la mesure est calibrée (sans attaque, survie = 1)", () => {
    expect(scores.identity).toBeCloseTo(1, 5);
  });

  test("sélection de la couleur : le contour sombre survit (lettres lisibles en creux)", () => {
    expect(scores.hue).toBeGreaterThan(0.33);
  });

  test("niveaux (blanchir tout sauf le sombre) : le contour survit", () => {
    expect(scores.levels).toBeGreaterThan(0.42);
  });

  test("filtre médian 5×5 : le filigrane survit", () => {
    expect(scores.median).toBeGreaterThan(0.7);
  });

  test("estimation multi-copies : aucun motif commun à soustraire", () => {
    expect(scores.multi).toBeGreaterThan(0.9);
  });
});
