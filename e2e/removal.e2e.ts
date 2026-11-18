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
//  - chroma   : toute couleur, quelle que soit sa teinte, remplacée par du
//               blanc (le pire cas « par couleur » sur un document noir et
//               blanc : les accents d'une autre teinte n'y échappent pas) ;
//  - niveaux  : tout ce qui n'est pas du texte sombre devient blanc ;
//  - médian   : filtre médian 5×5 (efface les traits fins) ;
//  - multi    : estimation du filigrane à partir de plusieurs documents
//               portant le même tampon (Dekel et al., CVPR 2017), puis
//               inversion du mélange alpha.
//
// Mesuré pour chaque contour (marqué, fin, aucun) : le choix « aucun »
// échange de la résistance contre de la lisibilité, la mesure dit combien.
//
// Fichier *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { startEngine, type Engine } from "./helpers/engine";
import { makePayslipPdf, toBase64 } from "./helpers/fixtures";

const TEXT = "Dossier location — Agence Martin · 10/10/2026 · réf. NFX37";
const INK = [0xc4, 0x26, 0x2e]; // couleur par défaut (rouge sceau)
const COPIES = 6;

let engine: Engine;
const MODES = ["strong", "thin", "none"] as const;
type Mode = (typeof MODES)[number];
let all: Record<Mode, Record<string, number>>;

beforeAll(async () => {
  engine = await startEngine();
  const docs = await Promise.all(Array.from({ length: COPIES }, (_, i) => makePayslipPdf(i + 1)));
  all = (await engine.page.evaluate(
    async ({ docs, text, ink, copies, modes }) => {
      const wm = (window as any).__wm;
      type Px = { w: number; h: number; d: Uint8ClampedArray };
      const pixels = async (url: string): Promise<Px> => {
        const bmp = await createImageBitmap(await (await fetch(url)).blob());
        const c = new OffscreenCanvas(bmp.width, bmp.height);
        const ctx = c.getContext("2d")!;
        ctx.drawImage(bmp, 0, 0);
        return { w: bmp.width, h: bmp.height, d: ctx.getImageData(0, 0, bmp.width, bmp.height).data };
      };
      // Graine fixe par copie : chaque copie diffère (multi-copies), mais la
      // mesure est reproductible (accents tirés au même endroit à chaque passe).
      const render = async (b64: string, t: string, outline = "strong", seed = 1) => {
        const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        const file = new File([bin], "p.pdf", { type: "application/pdf" });
        const res = await wm.watermarkFile(file, t, undefined, undefined, undefined, { outline }, { layoutSeed: seed });
        const px = await pixels(res.previews[0]);
        wm.releaseResult(res);
        return px;
      };
      // L'original : même rendu, sans filigrane (texte vide → rien n'est dessiné).
      const clean = await render(docs[0], " ");
      const out: Record<string, Record<string, number>> = {};
      for (const mode of modes) {
      const marked = await Promise.all(docs.map((b, k) => render(b, text, mode, 0x5eed + k * 7919)));
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
      // 1 bis. Chroma : toute couleur, quelle que soit sa teinte.
      const chromaAll = new Uint8ClampedArray(target.d);
      for (let i = 0; i < chromaAll.length; i += 4) {
        const [r, g, b] = [chromaAll[i], chromaAll[i + 1], chromaAll[i + 2]];
        if (Math.max(r, g, b) - Math.min(r, g, b) > 20 || Math.min(r, g, b) > 200)
          chromaAll[i] = chromaAll[i + 1] = chromaAll[i + 2] = 255;
      }
      // Couleur visible : part des pixels du filigrane dans la teinte choisie
      // (un contour posé sur les lettres les rendait gris aux petites tailles).
      let touched = 0;
      let inked = 0;
      for (let i = 0; i < target.d.length; i += 4) {
        const d0 =
          Math.abs(target.d[i] - clean.d[i]) + Math.abs(target.d[i + 1] - clean.d[i + 1]) + Math.abs(target.d[i + 2] - clean.d[i + 2]);
        if (d0 < 40) continue;
        touched++;
        const [r, g, b] = [target.d[i], target.d[i + 1], target.d[i + 2]];
        if (Math.max(r, g, b) - Math.min(r, g, b) > 20 && Math.abs(((hueOf(r, g, b) - inkHue + 540) % 360) - 180) < 35) inked++;
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

      out[mode] = {
        hue: survival(hue),
        hueTextLoss: textLoss(hue),
        chroma: survival(chromaAll),
        chromaTextLoss: textLoss(chromaAll),
        levels: survival(levels),
        levelsTextLoss: textLoss(levels),
        median: survival(median),
        multi: survival(multi),
        identity: survival(target.d),
        inkShare: inked / touched,
      };
      }
      return out;
    },
    { docs: docs.map(toBase64), text: TEXT, ink: INK, copies: COPIES, modes: MODES }
  )) as Record<Mode, Record<string, number>>;
  for (const mode of MODES)
    console.log(
      `[suppression] survie du filigrane (${mode}) :`,
      JSON.stringify(all[mode], (_, v) => (typeof v === "number" ? +v.toFixed(3) : v))
    );
}, 300_000);

afterAll(async () => {
  await engine?.stop();
});

// Seuils : mesures avec une marge. Avant le contour sombre et la variation
// par copie (10/10/2026), la teinte et les niveaux laissaient 0,16, et
// l'estimation multi-copies 0,20 : le filigrane disparaissait.
//
// Mesures du 18/11/2026 (nuances, ombres et accents par rangée, graines
// fixes ci-dessus), en survie :
//
//              teinte  chroma  niveaux  médian  multi
//   marqué      0,71    0,62    0,56     0,96    0,97
//   fin         0,63    0,52    0,45     0,86    0,97
//   aucun       0,33    0,20    0,18     0,92    0,96
//
// Sur des graines au hasard, « aucun » varie de ±0,04 selon la place de
// l'accent presque noir. Il reste au-dessus de l'ancien 0,16 grâce à cet
// accent, aux accents d'une autre teinte et aux ombres, mais c'est le choix
// le plus facile à retirer : l'interface le dit (style.outlineHints).
const FLOORS: Record<Mode, { hue: number; chroma: number; levels: number; median: number }> = {
  strong: { hue: 0.6, chroma: 0.52, levels: 0.48, median: 0.85 },
  thin: { hue: 0.53, chroma: 0.44, levels: 0.38, median: 0.75 },
  none: { hue: 0.27, chroma: 0.16, levels: 0.14, median: 0.8 },
};

describe("banc d'essai : suppression du filigrane", () => {
  test("la mesure est calibrée (sans attaque, survie = 1)", () => {
    for (const mode of MODES) expect(all[mode].identity).toBeCloseTo(1, 5);
  });

  test("la couleur choisie se voit : le contour entoure les lettres sans les recouvrir", () => {
    // 0,25 quand le contour était posé dessus, sans accents. Les accents (autre
    // teinte) et les ombres prennent désormais une part des pixels, par conception.
    expect(all.strong.inkShare).toBeGreaterThan(0.26);
    // Sans contour, la couleur choisie domine.
    expect(all.none.inkShare).toBeGreaterThan(all.strong.inkShare);
  });

  for (const mode of MODES) {
    describe(`contour ${mode}`, () => {
      const floor = FLOORS[mode];

      test("sélection de la teinte de l'encre : le filigrane survit", () => {
        expect(all[mode].hue).toBeGreaterThan(floor.hue);
      });

      test("toute couleur blanchie : l'accent presque noir et le contour survivent", () => {
        expect(all[mode].chroma).toBeGreaterThan(floor.chroma);
      });

      test("niveaux (blanchir tout sauf le sombre) : le filigrane survit", () => {
        expect(all[mode].levels).toBeGreaterThan(floor.levels);
      });

      test("filtre médian 5×5 : le filigrane survit", () => {
        expect(all[mode].median).toBeGreaterThan(floor.median);
      });

      test("estimation multi-copies : aucun motif commun à soustraire", () => {
        expect(all[mode].multi).toBeGreaterThan(0.9);
      });
    });
  }

  test("le contour coûte en lisibilité ce qu'il rapporte en résistance : marqué > fin > aucun", () => {
    expect(all.strong.levels).toBeGreaterThan(all.thin.levels);
    expect(all.thin.levels).toBeGreaterThan(all.none.levels);
  });
});
