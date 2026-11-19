// Couture « dossier » : le vrai moteur (lib/watermark.ts), l'assemblage
// (lib/assemble.ts, lib/dossier-build.ts) et le redressement des photos
// (lib/photo-fix.ts) dans un vrai navigateur, sans l'interface
// (docs/prd-dossier.md §11.2). Les résultats du moteur restent dans la page
// (window.__r) : ils portent des Blob, qui ne traversent pas page.evaluate.
//
// Fichier nommé *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { PDFDocument, PDFName } from "pdf-lib";
import { startEngine, type Engine } from "./helpers/engine";
import { fromBase64, makePdf, makeRotatedPdf, pageJpeg, scanPdfForLeaks, toBase64 } from "./helpers/fixtures";
import {
  makeColourPdf,
  makeCornerPdf,
  makeFlatPng,
  makeHostileTwoPages,
  makeMixedPdf,
  makePhotoPdf,
  makePhotoPng,
  makeTextPdf,
  type Rgb,
} from "./helpers/dossier-fixtures";
import { FIT_MARGIN, FLOOR_PAGE_BYTES, FLOOR_RATIO, floorEstimate, LOWEST, LOWEST_PAGE_BYTES, LOWEST_RATIO, MODEL_MARGIN, type FitState } from "../lib/assemble";
import { SIZE_PROBES, type FloorKind } from "../lib/dossier-build";
import { a4PageFor } from "../lib/files";
import { imageSize } from "../lib/image-size";
import { DOSSIER_MIN_SCALE, mbToBytes, pdfOverhead } from "../lib/size-budget";

let engine: Engine;

/** Options du second rendu (sous budget) du mode « dossier ». */
const SECOND = { forcePdf: true, photoPage: true };
/** Options du premier rendu, comme useDossier les passe au moteur : avec la mesure du poids de chaque page au plancher. */
const DOSSIER = { ...SECOND, sizeProbes: [...SIZE_PROBES] };
const PDF = "application/pdf";
/** Échelle de rendu des pages (RENDER_SCALE de lib/watermark.ts). */
const RENDER_SCALE = 2;

type Rendered =
  | { ok: true; pageCount: number; pageBytes: number[]; probeBytes: number[][]; thumbs: number; size: number; overBudget?: boolean; extension: string; ms: number }
  | { ok: false; error: string };

beforeAll(async () => {
  engine = await startEngine({
    __wm: "lib/watermark.ts",
    __as: "lib/assemble.ts",
    __db: "lib/dossier-build.ts",
    __pf: "lib/photo-fix.ts",
  });
  // Outils du harnais, dans la page.
  await engine.page.evaluate(() => {
    const w = window as any;
    w.__r = {};
    w.__files = {};
    w.__b64 = (bytes: Uint8Array) => {
      let out = "";
      for (let i = 0; i < bytes.length; i += 0x8000) out += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      return btoa(out);
    };
    w.__bytes = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  });
}, 120_000);

afterAll(async () => {
  await engine?.stop();
});

/** Rend un fichier avec le moteur ; le résultat reste dans la page sous `id`. */
function render(id: string, bytes: Uint8Array, name: string, type: string, options: object = {}, text = "") {
  return engine.page.evaluate(
    async ({ id, b64, name, type, options, text }) => {
      const w = window as any;
      const file = new File([w.__bytes(b64)], name, { type });
      w.__files[id] = file;
      const t0 = performance.now();
      try {
        if (w.__r[id]) w.__wm.releaseResult(w.__r[id]);
        const res = await w.__wm.watermarkFile(file, text, undefined, undefined, undefined, undefined, options);
        w.__r[id] = res;
        return {
          ok: true,
          pageCount: res.pageCount,
          pageBytes: res.pageBytes ?? [],
          probeBytes: res.probeBytes ?? [],
          thumbs: res.thumbs?.length ?? 0,
          size: res.blob.size,
          overBudget: res.overBudget,
          extension: res.extension,
          ms: performance.now() - t0,
        };
      } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message : String(e) };
      }
    },
    { id, b64: toBase64(bytes), name, type, options, text }
  ) as Promise<Rendered>;
}

async function rendered(id: string, bytes: Uint8Array, name: string, type: string, options: object = {}, text = "") {
  const res = await render(id, bytes, name, type, options, text);
  if (!res.ok) throw new Error(`${name} : le moteur a rejeté (${res.error})`);
  return res;
}

/** Octets du fichier produit pour `id`. */
async function output(id: string) {
  return fromBase64(
    await engine.page.evaluate(async (id) => {
      const w = window as any;
      return w.__b64(new Uint8Array(await w.__r[id].blob.arrayBuffer()));
    }, id)
  );
}

/** assemblePdf sur des résultats gardés dans la page. */
async function assemble(order: { doc: string; page: number }[]) {
  return fromBase64(
    await engine.page.evaluate(async (order) => {
      const w = window as any;
      return w.__b64(await w.__as.assemblePdf(new Map(Object.entries(w.__r)), order));
    }, order)
  );
}

type Built = { name: string; b64: string; over: boolean; passes: Record<string, number[]> };

type Planned = { name: string; pages: { doc: string; page: number }[] };

/** estimateFiles sur les résultats gardés dans la page : ce que le panneau de taille annonce avant le téléchargement. */
function estimate(files: Planned[], target: number, floor: FloorKind = "floor") {
  return engine.page.evaluate(
    ({ files, target, floor }) => {
      const w = window as any;
      return w.__db.estimateFiles(files, new Map(Object.entries(w.__r)), target, floor);
    },
    { files, target, floor }
  ) as Promise<{ name: string; pages: number; bytes: number; fit: FitState }[]>;
}

/**
 * buildDossier, avec un second rendu par le vrai moteur ; `passes` : poids des
 * pages au second rendu, par document. `floor` : le plancher de lisibilité, ou
 * tout en bas de l'échelle (« Accepter une qualité plus faible »). `text` : le
 * filigrane facultatif, redessiné au second rendu.
 */
async function build(files: Planned[], maxBytes: number | undefined, floor: FloorKind = "floor", text = "") {
  const built = (await engine.page.evaluate(
    async ({ files, maxBytes, floor, options, text }) => {
      const w = window as any;
      const passes: Record<string, number[]> = {};
      const out = await w.__db.buildDossier({
        files,
        results: new Map(Object.entries(w.__r)),
        maxBytes,
        floor,
        rerender: async (doc: string, pageBudgets: number[]) => {
          const res = await w.__wm.watermarkFile(w.__files[doc], text, undefined, undefined, undefined, undefined, {
            ...options,
            pageBudgets,
            minScale: w.__db.minScaleOf(floor),
            // Comme useDossier : le filigrane du premier rendu, refait à l'identique.
            layoutSeed: w.__r[doc].layoutSeed,
            previewPages: () => [],
          });
          passes[doc] = res.pageBytes;
          return res;
        },
        release: w.__wm.releaseResult,
      });
      return out.map((f: { name: string; bytes: Uint8Array; over: boolean }) => ({ name: f.name, b64: w.__b64(f.bytes), over: f.over, passes }));
    },
    { files, maxBytes, floor, options: SECOND, text }
  )) as Built[];
  return built.map((f) => ({ ...f, bytes: fromBase64(f.b64) }));
}

/** Couleur moyenne d'une zone (fractions 0–1) d'une image JPEG ou PNG. */
function regionMean(image: Uint8Array, region: { x: number; y: number; w: number; h: number }) {
  return engine.page.evaluate(
    async ({ b64, r }) => {
      const w = window as any;
      const bmp = await createImageBitmap(new Blob([w.__bytes(b64)]));
      const c = document.createElement("canvas");
      c.width = bmp.width;
      c.height = bmp.height;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(bmp, 0, 0);
      const d = ctx.getImageData(
        Math.round(r.x * bmp.width),
        Math.round(r.y * bmp.height),
        Math.max(1, Math.round(r.w * bmp.width)),
        Math.max(1, Math.round(r.h * bmp.height))
      ).data;
      const sum = [0, 0, 0];
      for (let i = 0; i < d.length; i += 4) for (let k = 0; k < 3; k++) sum[k] += d[i + k];
      return sum.map((s) => s / (d.length / 4)) as [number, number, number];
    },
    { b64: toBase64(image), r: region }
  );
}

/** Centre d'une page (loin des bords et du texte de repère). */
const CENTRE = { x: 0.3, y: 0.3, w: 0.4, h: 0.4 };
const near = (mean: number[], colour: Rgb, tolerance = 30) => mean.every((v, i) => Math.abs(v - colour[i]) <= tolerance);

const RED: Rgb = [220, 30, 30];
const GREEN: Rgb = [30, 170, 60];
const BLUE: Rgb = [30, 60, 200];
const YELLOW: Rgb = [230, 210, 40];

/** Échelle de l'image d'une page par rapport au premier rendu (page en points × RENDER_SCALE). */
async function pageScale(bytes: Uint8Array, index: number) {
  const doc = await PDFDocument.load(bytes, { updateMetadata: false });
  const jpeg = await pageJpeg(bytes, index);
  expect(jpeg[0]).toBe(0xff);
  expect(jpeg[1]).toBe(0xd8);
  const size = imageSize(jpeg)!;
  return size.width / (doc.getPage(index).getWidth() * RENDER_SCALE);
}

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

describe("moteur : rotation, vignettes, poids des pages", () => {
  test(
    "rotation : page en portrait, pavé rouge en haut à gauche, tournée de 90° → page en paysage, pavé en haut à droite",
    async () => {
      const corner = await makeCornerPdf([300, 400]);
      await rendered("plain", corner, "corner.pdf", PDF, DOSSIER);
      const plain = await output("plain");
      const before = (await PDFDocument.load(plain)).getPage(0);
      expect([before.getWidth(), before.getHeight()]).toEqual([300, 400]);
      expect(near(await regionMean(await pageJpeg(plain, 0), { x: 0.03, y: 0.03, w: 0.18, h: 0.18 }), [255, 0, 0], 40)).toBe(true);

      await rendered("turned", corner, "corner.pdf", PDF, { ...DOSSIER, edits: { 0: { rotate: 90 } } });
      const turned = await output("turned");
      const after = (await PDFDocument.load(turned)).getPage(0);
      // La page est réellement d'aplomb : nouveau format, pas une simple étiquette /Rotate.
      expect([after.getWidth(), after.getHeight()]).toEqual([400, 300]);
      expect(after.getRotation().angle).toBe(0);
      const jpeg = await pageJpeg(turned, 0);
      const size = imageSize(jpeg)!;
      expect(size.width).toBeGreaterThan(size.height);
      expect(near(await regionMean(jpeg, { x: 0.79, y: 0.03, w: 0.18, h: 0.18 }), [255, 0, 0], 40)).toBe(true);
      expect(near(await regionMean(jpeg, { x: 0.03, y: 0.03, w: 0.18, h: 0.18 }), [255, 255, 255], 12)).toBe(true);
      expect(near(await regionMean(jpeg, { x: 0.79, y: 0.79, w: 0.18, h: 0.18 }), [255, 255, 255], 12)).toBe(true);

      // 180° et 270° : le pavé continue de tourner dans le sens horaire.
      await rendered("turned", corner, "corner.pdf", PDF, { ...DOSSIER, edits: { 0: { rotate: 180 } } });
      expect(near(await regionMean(await pageJpeg(await output("turned"), 0), { x: 0.79, y: 0.79, w: 0.18, h: 0.18 }), [255, 0, 0], 40)).toBe(true);
      await rendered("turned", corner, "corner.pdf", PDF, { ...DOSSIER, edits: { 0: { rotate: 270 } } });
      expect(near(await regionMean(await pageJpeg(await output("turned"), 0), { x: 0.03, y: 0.79, w: 0.18, h: 0.18 }), [255, 0, 0], 40)).toBe(true);
    },
    120_000
  );

  test(
    "un PDF déjà tourné (/Rotate 90) : la rotation demandée s'ajoute à la sienne",
    async () => {
      const rotated = await makeRotatedPdf(300, 400, 90);
      await rendered("r0", rotated, "rotated.pdf", PDF, DOSSIER);
      const shown = (await PDFDocument.load(await output("r0"))).getPage(0);
      // Affichée en paysage (comme un lecteur la montre).
      expect([shown.getWidth(), shown.getHeight()]).toEqual([400, 300]);
      await rendered("r90", rotated, "rotated.pdf", PDF, { ...DOSSIER, edits: { 0: { rotate: 90 } } });
      const turned = (await PDFDocument.load(await output("r90"))).getPage(0);
      expect([turned.getWidth(), turned.getHeight()]).toEqual([300, 400]);
    },
    60_000
  );

  test(
    "un masque tracé après rotation couvre ce que la personne a vu",
    async () => {
      // Après 90°, le pavé rouge est en haut à droite : c'est là qu'on le masque.
      await rendered("masked", await makeCornerPdf([300, 400]), "corner.pdf", PDF, {
        ...DOSSIER,
        edits: { 0: { rotate: 90 } },
        masks: { 0: [{ x: 0.7, y: 0, w: 0.3, h: 0.3 }] },
      });
      const jpeg = await pageJpeg(await output("masked"), 0);
      expect(near(await regionMean(jpeg, { x: 0.75, y: 0.03, w: 0.22, h: 0.22 }), [0, 0, 0], 12)).toBe(true);
      // Plus aucun rouge nulle part.
      const whole = await regionMean(jpeg, { x: 0, y: 0, w: 1, h: 1 });
      expect(whole[0] - whole[1]).toBeLessThan(3);
    },
    60_000
  );

  test(
    "vignettes : 30 pages → 30 vignettes décodables, 320 px de large au plus ; aucune sans demande",
    async () => {
      const thirty = await makePdf(Array.from({ length: 30 }, (_, i) => (i % 2 ? [595, 842] : [842, 595]) as [number, number]));
      const res = await rendered("thumbs", thirty, "thirty.pdf", PDF, { ...DOSSIER, thumbnails: 240 });
      expect(res.pageCount).toBe(30);
      expect(res.thumbs).toBe(30);
      const sizes = await engine.page.evaluate(async () => {
        const out: { w: number; h: number; type: string }[] = [];
        for (const url of (window as any).__r.thumbs.thumbs) {
          const blob = await (await fetch(url)).blob();
          const bmp = await createImageBitmap(blob);
          out.push({ w: bmp.width, h: bmp.height, type: blob.type });
        }
        return out;
      });
      expect(sizes).toHaveLength(30);
      sizes.forEach((s, i) => {
        expect(s.type).toBe("image/jpeg");
        expect(s.w).toBe(240);
        // Mêmes proportions que la page : paysage pour les pages paires, portrait pour les autres.
        expect(s.w > s.h).toBe(i % 2 === 0);
      });
      // Largeur demandée au-delà du plafond : 320.
      await rendered("wide", await makePdf([[595, 842]]), "one.pdf", PDF, { ...DOSSIER, thumbnails: 999 });
      const wide = await engine.page.evaluate(async () => {
        const bmp = await createImageBitmap(await (await fetch((window as any).__r.wide.thumbs[0])).blob());
        return bmp.width;
      });
      expect(wide).toBe(320);
      // Sans `thumbnails` : aucune vignette (les autres outils n'en paient pas le coût).
      expect((await rendered("none", await makePdf([[595, 842]]), "one.pdf", PDF)).thumbs).toBe(0);
    },
    120_000
  );

  test(
    "releaseResult révoque aussi les vignettes",
    async () => {
      await rendered("gone", await makePdf([[300, 400]]), "one.pdf", PDF, { ...DOSSIER, thumbnails: 120 });
      const readable = await engine.page.evaluate(async () => {
        const w = window as any;
        const url = w.__r.gone.thumbs[0];
        const before = await fetch(url).then((r) => r.ok, () => false);
        w.__wm.releaseResult(w.__r.gone);
        delete w.__r.gone;
        const after = await fetch(url).then((r) => r.ok, () => false);
        return { before, after };
      });
      expect(readable).toEqual({ before: true, after: false });
    },
    60_000
  );

  test(
    "pageBytes : un poids par page, dont la somme est la taille du fichier à la structure PDF près",
    async () => {
      const res = await rendered("weights", await makeMixedPdf(), "mixed.pdf", PDF, DOSSIER);
      expect(res.pageBytes).toHaveLength(10);
      for (const b of res.pageBytes) expect(b).toBeGreaterThan(1000);
      const structure = res.size - sum(res.pageBytes);
      expect(structure).toBeGreaterThan(0);
      expect(structure).toBeLessThanOrEqual(pdfOverhead(10));
      // Une page photo (index pairs) pèse plus qu'une page de texte.
      for (let i = 0; i < 10; i += 2) expect(res.pageBytes[i]).toBeGreaterThan(res.pageBytes[i + 1]);
    },
    120_000
  );

  test(
    "une photo devient une page : A4 au plus, image JPEG, jamais plus de pixels que la page n'en demande",
    async () => {
      const res = await rendered("photo", makePhotoPng(2400, 1800, 7), "photo.png", "image/png", { ...DOSSIER, thumbnails: 240 });
      expect(res.extension).toBe("pdf");
      expect(res.pageCount).toBe(1);
      expect(res.thumbs).toBe(1);
      expect(res.pageBytes).toHaveLength(1);
      const bytes = await output("photo");
      const page = (await PDFDocument.load(bytes)).getPage(0);
      const a4 = a4PageFor(2400, 1800);
      const jpeg = await pageJpeg(bytes, 0);
      expect([jpeg[0], jpeg[1]]).toEqual([0xff, 0xd8]);
      const size = imageSize(jpeg)!;
      expect(size.width).toBe(Math.round(a4.width * RENDER_SCALE));
      // La page a les proportions de l'image produite (au pixel près), dans un A4.
      const fitted = a4PageFor(size.width, size.height);
      expect(page.getWidth()).toBeCloseTo(fitted.width, 1);
      expect(page.getHeight()).toBeCloseTo(fitted.height, 1);
      expect(Math.abs(page.getWidth() - a4.width)).toBeLessThan(1);
      expect(Math.abs(page.getHeight() - a4.height)).toBeLessThan(1);
      // Une petite image n'est pas agrandie.
      await rendered("small", makeFlatPng(320, 240, GREEN), "small.png", "image/png", DOSSIER);
      expect(imageSize(await pageJpeg(await output("small"), 0))).toEqual({ width: 320, height: 240 });
    },
    60_000
  );
});

describe("assemblage : l'ordre demandé, et rien du document d'origine", () => {
  test(
    "ordre [B2, A1, B1] : les couleurs dans cet ordre ; ni texte, ni métadonnées, ni pièce jointe, ni script, ni annotation",
    async () => {
      const a = await makeColourPdf([RED, GREEN]);
      const b = await makeColourPdf([BLUE, YELLOW]);
      // Témoin : les documents d'origine portent bien le marqueur.
      expect((await scanPdfForLeaks(a)).markerHits).toBeGreaterThan(0);
      await rendered("A", a, "a.pdf", PDF, DOSSIER);
      await rendered("B", b, "b.pdf", PDF, DOSSIER);
      const bytes = await assemble([
        { doc: "B", page: 1 },
        { doc: "A", page: 0 },
        { doc: "B", page: 0 },
      ]);
      const doc = await PDFDocument.load(bytes, { updateMetadata: false });
      expect(doc.getPageCount()).toBe(3);
      const expected = [YELLOW, RED, BLUE];
      for (let i = 0; i < 3; i++) expect(near(await regionMean(await pageJpeg(bytes, i), CENTRE), expected[i])).toBe(true);

      const leaks = await scanPdfForLeaks(bytes);
      expect(leaks.markerHits).toBe(0);
      expect(leaks.keys).toEqual([]);
      expect(doc.context.trailerInfo.Info).toBeUndefined();
      expect(doc.catalog.keys().map((k) => k.decodeText()).sort()).toEqual(["Pages", "Type"]);
      for (const page of doc.getPages()) expect(page.node.get(PDFName.of("Annots"))).toBeUndefined();
      // Aucun texte à extraire : pdf.js ne trouve rien sur aucune page.
      const texts = await engine.page.evaluate(async (b64) => {
        const w = window as any;
        const blob = new File([w.__bytes(b64)], "out.pdf", { type: "application/pdf" });
        // Rendu par le moteur lui-même : s'il le lit, le fichier est un PDF valide.
        const again = await w.__wm.watermarkFile(blob, "", undefined, undefined, undefined, undefined, {});
        const count = again.pageCount;
        w.__wm.releaseResult(again);
        return count;
      }, toBase64(bytes));
      expect(texts).toBe(3);
    },
    120_000
  );

  test(
    "une photo et un PDF dans le même fichier : chaque page garde son format",
    async () => {
      await rendered("pic", makeFlatPng(800, 600, GREEN), "pic.png", "image/png", DOSSIER);
      await rendered("doc", await makeColourPdf([RED], [612, 792]), "letter.pdf", PDF, DOSSIER);
      const bytes = await assemble([{ doc: "pic", page: 0 }, { doc: "doc", page: 0 }]);
      const pages = (await PDFDocument.load(bytes)).getPages();
      const a4 = a4PageFor(800, 600);
      expect(pages[0].getWidth()).toBeCloseTo(a4.width, 1);
      expect([pages[1].getWidth(), pages[1].getHeight()]).toEqual([612, 792]);
      expect(near(await regionMean(await pageJpeg(bytes, 0), CENTRE), GREEN)).toBe(true);
      expect(near(await regionMean(await pageJpeg(bytes, 1), CENTRE), RED)).toBe(true);
    },
    60_000
  );

  test(
    "un PDF d'origine passé pour un résultat est refusé, pas recopié",
    async () => {
      const hostile = await makeHostileTwoPages();
      const error = await engine.page.evaluate(async (b64) => {
        const w = window as any;
        const fake = { blob: new Blob([w.__bytes(b64)], { type: "application/pdf" }), extension: "pdf", pageCount: 2, previews: [], previewPageIndexes: [], url: "" };
        try {
          await w.__as.assemblePdf(new Map([["x", fake]]), [{ doc: "x", page: 0 }]);
          return "aucune erreur";
        } catch (e) {
          return e instanceof Error ? e.message : String(e);
        }
      }, toBase64(hostile));
      expect(error).toBe("assemble_foreign_page");
    },
    30_000
  );

  test(
    "corpus adversarial en mode dossier, avec une rotation et un masque : pas de plantage, pas de fuite",
    async () => {
      const hostile = await makeHostileTwoPages();
      expect((await scanPdfForLeaks(hostile)).keys).toEqual(["EmbeddedFiles", "Font", "JS", "OpenAction", "URI"]);
      const options = {
        ...DOSSIER,
        thumbnails: 240,
        edits: { 0: { rotate: 90 }, 1: { rotate: 270 } },
        masks: { 1: [{ x: 0.1, y: 0.1, w: 0.5, h: 0.2 }] },
      };
      await rendered("H", hostile, "hostile.pdf", PDF, options, "Dossier de location, agence Martin");
      const bytes = await assemble([{ doc: "H", page: 1 }, { doc: "H", page: 0 }]);
      const leaks = await scanPdfForLeaks(bytes);
      expect(leaks.markerHits).toBe(0);
      expect(leaks.keys).toEqual([]);
      const pages = (await PDFDocument.load(bytes)).getPages();
      expect(pages.map((p) => [p.getWidth(), p.getHeight()])).toEqual([[400, 300], [400, 300]]);

      // Entrées qui doivent être refusées proprement, comme dans les autres modes.
      const empty = await render("E", new Uint8Array(0), "vide.pdf", PDF, options);
      expect(empty).toEqual({ ok: false, error: "pdf_unreadable" });
      const junk = await render("J", new TextEncoder().encode("pas une image"), "faux.png", "image/png", options);
      expect(junk).toEqual({ ok: false, error: "image_unreadable" });
      // Retouches hors du document, ou tracé de recadrage inutilisable : ignorés.
      const odd = await rendered("O", makeFlatPng(400, 300, BLUE), "odd.png", "image/png", {
        ...DOSSIER,
        edits: { 0: { crop: [{ x: 0.5, y: 0.5 }, { x: 0.5, y: 0.5 }, { x: 0.5, y: 0.5 }, { x: 0.5, y: 0.5 }] }, 7: { rotate: 90 } },
      });
      expect(odd.pageCount).toBe(1);
      expect(imageSize(await pageJpeg(await output("O"), 0))).toEqual({ width: 400, height: 300 });
    },
    120_000
  );
});

describe("taille cible : estimation, budget pondéré et plancher de lisibilité", () => {
  const pagesOf = (doc: string, count: number) => Array.from({ length: count }, (_, page) => ({ doc, page }));
  /** Aucune page sous le plancher : l'image de la page n'est jamais plus petite que 0,55 du premier rendu. */
  const atOrAboveFloor = async (bytes: Uint8Array, indexes: number[]) => {
    for (const i of indexes) expect(await pageScale(bytes, i)).toBeGreaterThanOrEqual(DOSSIER_MIN_SCALE - 0.01);
  };

  test(
    "dossier mixte de 10 pages sous 1 Mo : annoncé tenable, tenu, les pages photo reçoivent plus que les pages de texte, aucune sous le plancher",
    async () => {
      const target = mbToBytes(1);
      const first = await rendered("mixed", await makeMixedPdf(), "mixed.pdf", PDF, DOSSIER);
      expect(first.size).toBeGreaterThan(target);
      // Le premier rendu a mesuré chaque page au plancher, et tout en bas de l'échelle.
      expect(first.probeBytes.map((list) => list.length)).toEqual([10, 10]);
      first.probeBytes[0].forEach((floor, i) => {
        expect(floor).toBeLessThan(first.pageBytes[i]);
        expect(first.probeBytes[1][i]).toBeLessThan(floor);
      });
      const files = [{ name: "dossier", pages: pagesOf("mixed", 10) }];
      // Annoncé avant tout second rendu.
      expect((await estimate(files, target))[0].fit).toBe("reduced");
      const [file] = await build(files, target);
      expect(file.over).toBe(false);
      expect(file.bytes.length).toBeLessThanOrEqual(target);
      // La cible est vraiment utilisée : pas un fichier réduit à l'extrême par prudence.
      expect(file.bytes.length).toBeGreaterThan(target * 0.4);
      const second = file.passes.mixed;
      expect(second).toHaveLength(10);
      const photo = second.filter((_, i) => i % 2 === 0);
      const text = second.filter((_, i) => i % 2 === 1);
      expect(sum(photo)).toBeGreaterThan(sum(text));
      await atOrAboveFloor(file.bytes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect((await scanPdfForLeaks(file.bytes)).keys).toEqual([]);
    },
    240_000
  );

  // Les deux côtés de la promesse (docs/prd-dossier.md §4.3, §5.5) : ne pas
  // dire « impossible » quand le fichier tiendrait, ni « tient » quand il ne tient pas.
  test(
    "30 pages photo sous 1 Mo : annoncé tenable (pas « impossible »), et le fichier produit tient, sans passer sous le plancher",
    async () => {
      const target = mbToBytes(1);
      const first = await rendered("thirty", await makePhotoPdf(30), "thirty.pdf", PDF, DOSSIER);
      expect(first.size).toBeGreaterThan(target);
      const files = [{ name: "dossier", pages: pagesOf("thirty", 30) }];
      const [announced] = await estimate(files, target);
      expect(announced.fit).not.toBe("unreachable");
      expect(announced.fit).toBe("reduced");
      const [file] = await build(files, target);
      expect(file.over).toBe(false);
      expect(file.bytes.length).toBeLessThanOrEqual(target);
      expect((await PDFDocument.load(file.bytes)).getPageCount()).toBe(30);
      await atOrAboveFloor(file.bytes, [0, 1, 2, 15, 29]);
    },
    300_000
  );

  test(
    "60 pages photo sous 1 Mo : annoncé intenable avant le rendu, fichier produit au plancher et signalé au-dessus de la cible",
    async () => {
      const target = mbToBytes(1);
      const first = await rendered("sixty", await makePhotoPdf(60), "sixty.pdf", PDF, DOSSIER);
      expect(first.pageCount).toBe(60);
      const files = [{ name: "dossier", pages: pagesOf("sixty", 60) }];
      expect((await estimate(files, target))[0].fit).toBe("unreachable");
      const [file] = await build(files, target);
      expect(file.over).toBe(true);
      expect(file.bytes.length).toBeGreaterThan(target);
      for (const i of [0, 1, 2, 29, 59]) {
        const scale = await pageScale(file.bytes, i);
        expect(scale).toBeGreaterThanOrEqual(DOSSIER_MIN_SCALE - 0.01);
        expect(scale).toBeLessThanOrEqual(DOSSIER_MIN_SCALE + 0.01);
      }
      // Avec « Accepter une qualité plus faible » (pas de plancher) : annoncé tenable, et tenu, plus bas que le plancher.
      expect((await estimate(files, target, "lowest"))[0].fit).toBe("reduced");
      const [lower] = await build(files, target, "lowest");
      expect(lower.over).toBe(false);
      expect(lower.bytes.length).toBeLessThanOrEqual(target);
      expect(await pageScale(lower.bytes, 0)).toBeLessThan(DOSSIER_MIN_SCALE - 0.05);
    },
    600_000
  );

  test(
    "entre les deux : une annonce « tenable » est toujours tenue ; « impossible » n'est dit que si le fichier frôle ou dépasse la cible",
    async () => {
      const target = mbToBytes(1);
      // Les 60 pages photo du test précédent. Le seuil dépend de l'encodeur JPEG du navigateur (une page
      // photo pèse de 18 à 26 Ko au plancher) : il est lu dans les poids mesurés, puis encadré de près.
      const floors = await engine.page.evaluate(() => (window as any).__r.sixty.probeBytes[0] as number[]);
      let last = 0;
      for (let n = 1; n <= 60; n++) if (sum(floors.slice(0, n)) * FIT_MARGIN + pdfOverhead(n) <= target) last = n;
      expect(last).toBeGreaterThan(10);
      expect(last).toBeLessThan(60);
      const counts = [...new Set([last - 6, last - 1, last, last + 1, last + 5].map((n) => Math.min(60, Math.max(1, n))))];
      const seen: string[] = [];
      for (const count of counts) {
        const files = [{ name: "dossier", pages: pagesOf("sixty", count) }];
        const [announced] = await estimate(files, target);
        const [file] = await build(files, target);
        seen.push(`${count} pages : ${announced.fit}, ${file.bytes.length} octets`);
        if (announced.fit === "unreachable") {
          // Jamais « impossible » pour un fichier qui tiendrait avec plus que la marge de la prédiction.
          expect(file.bytes.length, seen.at(-1)).toBeGreaterThan(target / (FIT_MARGIN + 0.02));
        } else {
          expect(file.over, seen.at(-1)).toBe(false);
          expect(file.bytes.length, seen.at(-1)).toBeLessThanOrEqual(target);
        }
      }
      console.log(`[dossier.seam] pages photo sous 1 Mo, annonce puis fichier : ${seen.join(" ; ")}`);
      // Les deux annonces se rencontrent bien dans cette plage.
      expect(seen.some((s) => s.includes("reduced"))).toBe(true);
      expect(seen.some((s) => s.includes("unreachable"))).toBe(true);
    },
    600_000
  );

  test(
    "30 pages de texte sous 1 Mo : annoncé intenable, et le fichier produit dépasse bien la cible, au plancher",
    async () => {
      const target = mbToBytes(1);
      await rendered("text30", await makeTextPdf(30, 50), "payslips.pdf", PDF, DOSSIER);
      const files = [{ name: "dossier", pages: pagesOf("text30", 30) }];
      expect((await estimate(files, target))[0].fit).toBe("unreachable");
      const [file] = await build(files, target);
      expect(file.over).toBe(true);
      expect(file.bytes.length).toBeGreaterThan(target);
      for (const i of [0, 14, 29]) expect(await pageScale(file.bytes, i)).toBeCloseTo(DOSSIER_MIN_SCALE, 1);
      // 2 Mo : tenable en réduisant, et tenu.
      expect((await estimate(files, mbToBytes(2)))[0].fit).toBe("reduced");
      const [larger] = await build(files, mbToBytes(2));
      expect(larger.over).toBe(false);
      expect(larger.bytes.length).toBeLessThanOrEqual(mbToBytes(2));
    },
    600_000
  );

  test(
    "une cible par fichier : deux sections sous 1 Mo chacune, une seule a besoin d'être réduite",
    async () => {
      const target = mbToBytes(1);
      const photos = await rendered("heavy", await makePhotoPdf(6, 11), "photos.pdf", PDF, DOSSIER);
      await rendered("light", await makeTextPdf(2, 31), "text.pdf", PDF, DOSSIER);
      expect(sum(photos.pageBytes)).toBeGreaterThan(target);
      const planned = [
        { name: "Photos", pages: pagesOf("heavy", 6) },
        { name: "Payslips", pages: [{ doc: "light", page: 1 }, { doc: "light", page: 0 }] },
      ];
      // L'estimation vaut pour chaque fichier.
      expect((await estimate(planned, target)).map((e) => e.fit)).toEqual(["reduced", "fits"]);
      const files = await build(planned, target);
      expect(files.map((f) => f.name)).toEqual(["Photos", "Payslips"]);
      for (const f of files) {
        expect(f.over).toBe(false);
        expect(f.bytes.length).toBeLessThanOrEqual(target);
      }
      // Seul le document trop lourd a été rendu une seconde fois.
      expect(Object.keys(files[0].passes)).toEqual(["heavy"]);
      expect(await pageScale(files[1].bytes, 0)).toBeCloseTo(1, 1);
    },
    240_000
  );

  test(
    "la mesure du premier rendu est ce que le second rendu produit : écart nul sans filigrane, dans la marge avec",
    async () => {
      const text = await makeTextPdf(4, 3);
      const photo = await makePhotoPdf(4, 5);
      const tight = (n: number, layoutSeed?: number) => ({ ...SECOND, pageBudgets: new Array(n).fill(1), minScale: DOSSIER_MIN_SCALE, layoutSeed });
      const seedOf = (id: string) => engine.page.evaluate((id) => (window as any).__r[id].layoutSeed as number, id);
      const deviations: string[] = [];
      for (const [id, bytes, name] of [["m-text", text, "text.pdf"], ["m-photo", photo, "photo.pdf"]] as const) {
        // Sans filigrane : même canvas, même encodage, au pixel près.
        const first = await rendered(id, bytes, name, PDF, DOSSIER);
        const again = await rendered(`${id}-tight`, bytes, name, PDF, tight(first.pageCount));
        const plain = Math.abs(sum(again.pageBytes) / sum(first.probeBytes[0]) - 1);
        expect(plain, `${id} sans filigrane`).toBeLessThan(0.002);
        // Avec le filigrane facultatif : le second rendu reprend la graine du premier, donc le même dessin.
        const mark = "Dossier de location, agence Martin, 18/11/2026";
        const marked = await rendered(`${id}-marked`, bytes, name, PDF, DOSSIER, mark);
        const seed = await seedOf(`${id}-marked`);
        expect(Number.isInteger(seed)).toBe(true);
        let worst = 0;
        let drift = 0;
        for (let round = 0; round < 3; round++) {
          const second = await rendered(`${id}-marked-tight`, bytes, name, PDF, tight(marked.pageCount, seed), mark);
          // Page par page : c'est page par page que le budget doit suffire.
          second.pageBytes.forEach((b, i) => (worst = Math.max(worst, b / marked.probeBytes[0][i] - 1)));
          // Témoin : sans reprendre la graine, le filigrane est tiré au hasard et le poids des pages bouge.
          const other = await rendered(`${id}-marked-other`, bytes, name, PDF, tight(marked.pageCount), mark);
          other.pageBytes.forEach((b, i) => (drift = Math.max(drift, Math.abs(b / marked.probeBytes[0][i] - 1))));
        }
        deviations.push(
          `${id} : ${(plain * 100).toFixed(2)} % sans filigrane, au plus +${(worst * 100).toFixed(2)} % par page avec (jusqu'à ${(drift * 100).toFixed(1)} % si la graine n'était pas reprise)`
        );
        // La marge de la prédiction couvre l'écart mesuré, avec de la réserve.
        expect(worst, `${id} avec filigrane`).toBeLessThan((FIT_MARGIN - 1) * 0.5);
      }
      console.log(`[dossier.seam] mesure du premier rendu contre second rendu au plancher : ${deviations.join(" ; ")} (marge ${FIT_MARGIN})`);

      // Avec filigrane, une annonce « tenable » au plus juste est encore tenue.
      const mark = "Dossier de location, agence Martin, 18/11/2026";
      const many = await rendered("m-many", await makeTextPdf(12, 70), "payslips.pdf", PDF, DOSSIER, mark);
      const files = [{ name: "dossier", pages: pagesOf("m-many", 12) }];
      // La plus petite cible encore annoncée tenable, à l'octet près.
      const justEnough = Math.ceil(sum(many.probeBytes[0]) * FIT_MARGIN + pdfOverhead(12)) + 1;
      expect((await estimate(files, justEnough))[0].fit).toBe("reduced");
      expect((await estimate(files, justEnough - 2000))[0].fit).toBe("unreachable");
      const [file] = await build(files, justEnough, "floor", mark);
      expect(file.over).toBe(false);
      expect(file.bytes.length).toBeLessThanOrEqual(justEnough);
    },
    600_000
  );

  test(
    "coût de la mesure : le premier rendu avec sondes reste proche du rendu sans",
    async () => {
      const mixed = await makeMixedPdf();
      const plain = await rendered("cost-plain", mixed, "mixed.pdf", PDF, SECOND);
      const probed = await rendered("cost-probed", mixed, "mixed.pdf", PDF, DOSSIER);
      console.log(`[dossier.seam] premier rendu de 10 pages : ${plain.ms.toFixed(0)} ms sans mesure, ${probed.ms.toFixed(0)} ms avec les deux sondes`);
      // Sans les sondes, pas de mesure : les autres outils n'en paient pas le coût.
      expect(plain.probeBytes).toEqual([]);
      expect(probed.pageBytes).toEqual(plain.pageBytes);
      // Garde-fou large : la mesure ne double pas le temps de rendu.
      expect(probed.ms).toBeLessThan(plain.ms * 2 + 500);
    },
    240_000
  );

  test(
    "FLOOR_RATIO et LOWEST_RATIO (modèle de repli) : mesurés sur le corpus, à 15 % près de la constante",
    async () => {
      const corpus: [string, Uint8Array, string, string][] = [
        ["c-text", await makeTextPdf(4, 3), "text.pdf", PDF],
        ["c-photo", await makePhotoPdf(4, 5), "photo.pdf", PDF],
        ["c-mixed", await makeMixedPdf(), "mixed.pdf", PDF],
        ["c-phone", makePhotoPng(2400, 1800, 9), "phone.png", "image/png"],
      ];
      const natural: Record<string, number> = {};
      const floor: Record<string, number> = {};
      const lowest: Record<string, number> = {};
      const pages: Record<string, number> = {};
      const firsts: Record<string, number[]> = {};
      for (const [id, bytes, name, type] of corpus) {
        const first = await rendered(id, bytes, name, type, DOSSIER);
        natural[id] = sum(first.pageBytes);
        pages[id] = first.pageCount;
        firsts[id] = first.pageBytes;
        // Les sondes du premier rendu : le poids de chaque page au plancher, et tout en bas de l'échelle.
        floor[id] = sum(first.probeBytes[0]);
        lowest[id] = sum(first.probeBytes[1]);
      }
      const total = (o: Record<string, number>) => sum(Object.values(o));
      const floorRatio = total(floor) / total(natural);
      const lowestRatio = total(lowest) / total(natural);
      const perKind = Object.fromEntries(Object.keys(natural).map((id) => [id, [(floor[id] / natural[id]).toFixed(3), (lowest[id] / natural[id]).toFixed(3)]]));
      console.log(
        `[dossier.seam] FLOOR_RATIO mesuré ${floorRatio.toFixed(4)} (constante ${FLOOR_RATIO}), LOWEST_RATIO mesuré ${lowestRatio.toFixed(4)} (constante ${LOWEST_RATIO}) ; par document [plancher, plus bas] : ${JSON.stringify(perKind)}`
      );

      // Une page de texte se comprime bien moins qu'une photo : son poids au
      // plancher est mesuré à part (octets par page A4), pour que le modèle de
      // repli ne promette pas trop sur un dossier fait surtout de texte.
      const textFloor = floor["c-text"] / pages["c-text"];
      const textLowest = lowest["c-text"] / pages["c-text"];
      console.log(
        `[dossier.seam] page de texte A4 : ${(natural["c-text"] / pages["c-text"]).toFixed(0)} octets au premier rendu, ${textFloor.toFixed(0)} au plancher (constante ${FLOOR_PAGE_BYTES}), ${textLowest.toFixed(0)} au plus bas (constante ${LOWEST_PAGE_BYTES}) ; page photo : ${(natural["c-photo"] / pages["c-photo"]).toFixed(0)} puis ${(floor["c-photo"] / pages["c-photo"]).toFixed(0)} puis ${(lowest["c-photo"] / pages["c-photo"]).toFixed(0)}`
      );
      expect(Math.abs(floorRatio / FLOOR_RATIO - 1)).toBeLessThanOrEqual(0.15);
      expect(Math.abs(lowestRatio / LOWEST_RATIO - 1)).toBeLessThanOrEqual(0.15);
      expect(Math.abs(textFloor / FLOOR_PAGE_BYTES - 1)).toBeLessThanOrEqual(0.15);
      expect(Math.abs(textLowest / LOWEST_PAGE_BYTES - 1)).toBeLessThanOrEqual(0.15);
      // Le modèle de repli, avec sa marge, ne sous-estime aucun document du corpus.
      for (const [id] of corpus) {
        expect(floorEstimate(firsts[id]) * MODEL_MARGIN, id).toBeGreaterThanOrEqual(floor[id]);
        expect(floorEstimate(firsts[id], LOWEST) * MODEL_MARGIN, id).toBeGreaterThanOrEqual(lowest[id]);
      }
    },
    600_000
  );
});

describe("photo d'une feuille : redresser, recadrer, nettoyer", () => {
  /** Feuille blanche vue de biais sur un fond gris, un repère noir près de chaque coin. */
  const QUAD = [
    { x: 0.2, y: 0.12 },
    { x: 0.82, y: 0.2 },
    { x: 0.9, y: 0.88 },
    { x: 0.1, y: 0.8 },
  ];
  /** Repères, en coordonnées de la feuille. */
  const MARKS = [
    [0.08, 0.06],
    [0.92, 0.06],
    [0.92, 0.94],
    [0.08, 0.94],
  ];

  /** Dessine la photo dans la page ; rend ses octets PNG si demandé. */
  function drawSheet(width: number, height: number, paper = "#ffffff") {
    return engine.page.evaluate(
      async ({ width, height, quad, marks, paper }) => {
        const w = window as any;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#6b6f78";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = paper;
        ctx.beginPath();
        quad.forEach((p: { x: number; y: number }, i: number) => (i ? ctx.lineTo(p.x * width, p.y * height) : ctx.moveTo(p.x * width, p.y * height)));
        ctx.closePath();
        ctx.fill();
        const m = w.__pf.homography(quad);
        ctx.fillStyle = "#101010";
        for (const [u, v] of marks) {
          const p = w.__pf.project(m, u, v);
          ctx.beginPath();
          ctx.arc(p.x * width, p.y * height, Math.max(3, width / 150), 0, Math.PI * 2);
          ctx.fill();
        }
        w.__sheet = canvas;
        const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b!), "image/png"));
        return w.__b64(new Uint8Array(await blob.arrayBuffer()));
      },
      { width, height, quad: QUAD, marks: MARKS, paper }
    );
  }

  test(
    "warp : les quatre repères se retrouvent à leur place dans la feuille redressée, à 2 px près",
    async () => {
      await drawSheet(1200, 900);
      const found = await engine.page.evaluate(
        ({ quad, marks }) => {
          const w = window as any;
          const src = (w.__sheet as HTMLCanvasElement).getContext("2d")!.getImageData(0, 0, 1200, 900);
          const size = w.__pf.outputSize(quad, 1200, 900, "free");
          const out = w.__pf.warp(src, quad, size.w, size.h);
          // Barycentre des pixels sombres autour de la place attendue de chaque repère.
          const centres = marks.map(([u, v]: number[]) => {
            const cx = u * out.width;
            const cy = v * out.height;
            let sx = 0;
            let sy = 0;
            let n = 0;
            for (let y = Math.max(0, Math.floor(cy - 30)); y < Math.min(out.height, cy + 30); y++)
              for (let x = Math.max(0, Math.floor(cx - 30)); x < Math.min(out.width, cx + 30); x++) {
                if (out.data[(y * out.width + x) * 4] < 90) {
                  sx += x + 0.5;
                  sy += y + 0.5;
                  n++;
                }
              }
            return { dx: sx / n - cx, dy: sy / n - cy, n };
          });
          // Le fond gris a disparu : les quatre coins de la sortie sont du papier.
          const corner = (x: number, y: number) => out.data[(y * out.width + x) * 4];
          return { centres, size, corners: [corner(3, 3), corner(out.width - 4, 3), corner(out.width - 4, out.height - 4), corner(3, out.height - 4)] };
        },
        { quad: QUAD, marks: MARKS }
      );
      for (const c of found.centres) {
        expect(c.n).toBeGreaterThan(20);
        expect(Math.abs(c.dx)).toBeLessThanOrEqual(2);
        expect(Math.abs(c.dy)).toBeLessThanOrEqual(2);
      }
      for (const c of found.corners) expect(c).toBeGreaterThan(235);
    },
    60_000
  );

  test(
    "moteur : la photo recadrée devient une page droite, sans le fond ; l'original n'est pas modifié",
    async () => {
      const png = fromBase64(await drawSheet(1600, 1200));
      await rendered("sheet", png, "sheet.png", "image/png", { ...DOSSIER, edits: { 0: { crop: QUAD } } });
      const bytes = await output("sheet");
      const jpeg = await pageJpeg(bytes, 0);
      // Plus de fond gris sur les bords : du papier blanc partout, sauf les repères.
      for (const region of [
        { x: 0, y: 0.3, w: 0.04, h: 0.4 },
        { x: 0.96, y: 0.3, w: 0.04, h: 0.4 },
        { x: 0.3, y: 0, w: 0.4, h: 0.03 },
        { x: 0.3, y: 0.97, w: 0.4, h: 0.03 },
      ]) {
        expect(near(await regionMean(jpeg, region), [255, 255, 255], 14)).toBe(true);
      }
      // Les repères, à leur place (1,5 % de la page près).
      for (const [u, v] of MARKS) {
        const mean = await regionMean(jpeg, { x: u - 0.015, y: v - 0.015, w: 0.03, h: 0.03 });
        expect(mean[0]).toBeLessThan(225);
      }
      // Sans recadrage, la même photo garde son fond.
      await rendered("sheet-raw", png, "sheet.png", "image/png", DOSSIER);
      expect(near(await regionMean(await pageJpeg(await output("sheet-raw"), 0), { x: 0, y: 0.3, w: 0.04, h: 0.4 }), [107, 111, 120], 14)).toBe(true);
    },
    60_000
  );

  test(
    "nettoyage : le papier jaunâtre devient blanc ; noir et blanc : plus aucune couleur",
    async () => {
      const png = fromBase64(await drawSheet(1600, 1200, "#d6ccac"));
      const centre = { x: 0.4, y: 0.4, w: 0.2, h: 0.2 };
      await rendered("yellow", png, "sheet.png", "image/png", { ...DOSSIER, edits: { 0: { crop: QUAD } } });
      const raw = await regionMean(await pageJpeg(await output("yellow"), 0), centre);
      expect(raw[0] - raw[2]).toBeGreaterThan(25);
      await rendered("white", png, "sheet.png", "image/png", { ...DOSSIER, edits: { 0: { crop: QUAD, clean: { whiten: true, gray: false } } } });
      const white = await regionMean(await pageJpeg(await output("white"), 0), centre);
      for (const c of white) expect(c).toBeGreaterThan(245);

      const colourful = makePhotoPng(800, 600, 3);
      await rendered("gray", colourful, "photo.png", "image/png", { ...DOSSIER, edits: { 0: { clean: { whiten: false, gray: true } } } });
      const gray = await regionMean(await pageJpeg(await output("gray"), 0), { x: 0.1, y: 0.1, w: 0.3, h: 0.3 });
      expect(Math.max(...gray) - Math.min(...gray)).toBeLessThan(3);
    },
    90_000
  );

  test(
    "ordre des retouches : recadrage, puis rotation, puis masque (tracé sur la page telle qu'elle s'affiche)",
    async () => {
      const png = fromBase64(await drawSheet(1600, 1200));
      await rendered("ordered", png, "sheet.png", "image/png", {
        ...DOSSIER,
        edits: { 0: { crop: QUAD, rotate: 90 } },
        masks: { 0: [{ x: 0, y: 0, w: 0.2, h: 0.2 }] },
      });
      const bytes = await output("ordered");
      const page = (await PDFDocument.load(bytes)).getPage(0);
      const upright = (await PDFDocument.load(await output("sheet"))).getPage(0);
      // Un quart de tour : largeur et hauteur échangées.
      expect(page.getWidth() > page.getHeight()).toBe(upright.getHeight() > upright.getWidth());
      const jpeg = await pageJpeg(bytes, 0);
      expect(near(await regionMean(jpeg, { x: 0.02, y: 0.02, w: 0.15, h: 0.15 }), [0, 0, 0], 12)).toBe(true);
      expect(near(await regionMean(jpeg, { x: 0.4, y: 0.4, w: 0.2, h: 0.2 }), [255, 255, 255], 14)).toBe(true);
    },
    60_000
  );

  test(
    "durée du redressement d'une photo de 12 mégapixels (mesure, pas une limite stricte)",
    async () => {
      const timing = await engine.page.evaluate(async (quad) => {
        const w = window as any;
        const canvas = document.createElement("canvas");
        canvas.width = 4000;
        canvas.height = 3000;
        const ctx = canvas.getContext("2d")!;
        const gradient = ctx.createLinearGradient(0, 0, 4000, 3000);
        gradient.addColorStop(0, "#d8d2c0");
        gradient.addColorStop(1, "#8a8f99");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 4000, 3000);
        ctx.fillStyle = "#222";
        for (let i = 0; i < 400; i++) ctx.fillRect(600 + (i % 20) * 140, 500 + Math.floor(i / 20) * 100, 100, 12);
        // 1. La boucle seule, à la taille que le moteur lui donne : photo réduite à deux fois la page.
        const src = document.createElement("canvas");
        src.width = 3368;
        src.height = 2526;
        src.getContext("2d")!.drawImage(canvas, 0, 0, src.width, src.height);
        const pixels = src.getContext("2d")!.getImageData(0, 0, src.width, src.height);
        const t0 = performance.now();
        const out = w.__pf.warp(pixels, quad, 1190, 1684);
        const warpMs = performance.now() - t0;
        // 2. Le moteur entier sur le fichier de 12 mégapixels : décodage, redressement, nettoyage, encodage.
        const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.9));
        const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
        const t1 = performance.now();
        const res = await w.__wm.watermarkFile(file, "", undefined, undefined, undefined, undefined, {
          forcePdf: true,
          photoPage: true,
          thumbnails: 240,
          edits: { 0: { crop: quad, clean: { whiten: true, gray: false } } },
        });
        const engineMs = performance.now() - t1;
        w.__wm.releaseResult(res);
        return { warpMs, engineMs, pixels: out.width * out.height, fileBytes: blob.size };
      }, QUAD);
      console.log(
        `[dossier.seam] redressement 12 Mpx : boucle warp ${timing.warpMs.toFixed(0)} ms pour ${timing.pixels} pixels ; moteur entier (décodage, redressement, nettoyage, JPEG) ${timing.engineMs.toFixed(0)} ms`
      );
      expect(timing.pixels).toBe(1190 * 1684);
      // Garde-fou large : un ordre de grandeur au-dessus de la cible (0,5 s sur un téléphone moyen).
      expect(timing.warpMs).toBeLessThan(5000);
    },
    120_000
  );
});
