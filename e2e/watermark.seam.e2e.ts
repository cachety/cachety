// Harnais « couture navigateur » du moteur de filigrane : on exerce le VRAI
// pipeline de lib/watermark.ts (pdf.js → canvas → pdf-lib) dans un vrai
// navigateur, sans passer par l'interface. Le module est bundlé tel quel au
// lancement (bun build --target=browser), servi à côté de l'export statique
// (les assets /pdfjs/* — worker, polices — sont requis par le pipeline),
// puis importé dans la page où l'on appelle watermarkFile directement.
//
// Fichier nommé *.e2e.ts : ignoré par `bun test` (unitaires) ; lancé
// explicitement par `bun run test:e2e`.

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PDFDocument } from "pdf-lib";
import type { Browser, Page } from "playwright-core";
import { launchBrowser, MAP_UPSERT_POLYFILL } from "./helpers/browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./helpers/server";
import {
  ENCRYPTED_PDF_B64,
  ENCRYPTED_PDF_PASSWORD,
  HEIC_320x240_B64,
  makeBluePdf,
  makeNoisePdf,
  makeNoisePng,
  fromBase64,
  makeHostilePdf,
  makePdf,
  makeRotatedPdf,
  scanPdfForLeaks,
  SECRET,
  toBase64,
  withExif,
} from "./helpers/fixtures";

const ROOT = join(import.meta.dir, "..");
const OUT_DIR = join(ROOT, "out");
const WATERMARK_TEXT = "CONFIDENTIEL — TEST E2E";
// Doit refléter PREVIEW_MAX_PAGES de lib/watermark.ts.
const PREVIEW_MAX_PAGES = 12;

let tmp: string;
let server: E2eServer;
let browser: Browser;
let page: Page;

type PageResult =
  | {
      ok: true;
      pageCount: number;
      previewCount: number;
      previews: string[];
      extension: string;
      blobType: string;
      outB64: string;
      size: number;
      overBudget?: boolean;
    }
  | { ok: false; error: string };

/** Construit un File dans la page et appelle watermarkFile du bundle réel. */
function runWatermark(input: {
  b64: string;
  name: string;
  type: string;
  text: string;
  password?: string;
  options?: unknown;
  /** Apparence ; par défaut celle de l'outil (réglage « Léger »). */
  style?: unknown;
}) {
  return page.evaluate(async (arg) => {
    const mod = (window as any).__wm;
    const bin = Uint8Array.from(atob(arg.b64), (c) => c.charCodeAt(0));
    const file = new File([bin], arg.name, { type: arg.type });
    try {
      const res = await mod.watermarkFile(
        file,
        arg.text,
        undefined,
        arg.password,
        undefined,
        arg.style,
        arg.options
      );
      const bytes = new Uint8Array(await res.blob.arrayBuffer());
      let out = "";
      for (let i = 0; i < bytes.length; i += 0x8000) {
        out += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      }
      return {
        ok: true,
        pageCount: res.pageCount,
        previewCount: res.previews.length,
        previews: res.previews,
        extension: res.extension,
        blobType: res.blob.type,
        outB64: btoa(out),
        size: res.blob.size,
        overBudget: res.overBudget,
      };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }, input) as Promise<PageResult>;
}

/** Compte, dans une image (URL ou blob), les pixels « rouge filigrane ». */
function countRedPixels(url: string) {
  return page.evaluate(async (src) => {
    const blob = await (await fetch(src)).blob();
    const bmp = await createImageBitmap(blob);
    const c = document.createElement("canvas");
    c.width = bmp.width;
    c.height = bmp.height;
    const ctx = c.getContext("2d");
    if (!ctx) throw new Error("canvas indisponible");
    ctx.drawImage(bmp, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let red = 0;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > d[i + 1] + 30 && d[i] > d[i + 2] + 30) red++;
    }
    return { red, width: c.width, height: c.height };
  }, url);
}

beforeAll(async () => {
  // 1. Bundle du module réel, tel qu'il est dans l'arbre de travail.
  tmp = mkdtempSync(join(tmpdir(), "filigrane-e2e-"));
  const build = await Bun.build({
    entrypoints: [join(ROOT, "lib/watermark.ts")],
    target: "browser",
    format: "esm",
    outdir: tmp,
    naming: "watermark.bundle.js",
    // Pas de splitting : l'import dynamique de pdfjs-dist est inliné,
    // un seul fichier à servir.
  });
  if (!build.success) throw new AggregateError(build.logs, "bun build a échoué");
  writeFileSync(
    join(tmp, "blank.html"),
    "<!doctype html><meta charset='utf-8'><title>harnais filigrane</title>"
  );

  // 2. Export statique (assets /pdfjs/*) + fichiers du harnais sur :4181.
  server = startServer(OUT_DIR, tmp);

  // 3. Navigateur : polyfill Map « upsert » (voir helpers/browser.ts) puis
  //    import du bundle dans la page.
  browser = await launchBrowser();
  const context = await browser.newContext();
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  page = await context.newPage();
  page.on("pageerror", (e) => console.error("[page]", e.message));
  await page.goto(`${E2E_ORIGIN}/__e2e__/blank.html`);
  // Chemin passé en argument : import(chaîne dynamique), hors de portée du
  // typage TS de Next (le module n'existe qu'au runtime, servi par :4181).
  await page.evaluate(async (bundleUrl) => {
    (window as any).__wm = await import(bundleUrl);
  }, "/__e2e__/watermark.bundle.js");
});

afterAll(async () => {
  await browser?.close();
  server?.stop();
  if (tmp) rmSync(tmp, { recursive: true, force: true });
});

describe("moteur de filigrane (pipeline réel dans le navigateur)", () => {
  test(
    "PDF : pages et dimensions préservées, sortie PDF valide, filigrane visible",
    async () => {
      // Trois pages de formats différents (A4, letter, petit format).
      const sizes: [number, number][] = [
        [595.28, 841.89],
        [612, 792],
        [200, 300],
      ];
      const input = await makePdf(sizes);
      const res = await runWatermark({
        b64: toBase64(input),
        name: "test.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
      });

      if (!res.ok) throw new Error(`watermarkFile a rejeté : ${res.error}`);
      expect(res.extension).toBe("pdf");
      expect(res.blobType).toBe("application/pdf");
      expect(res.pageCount).toBe(sizes.length);
      expect(res.previewCount).toBe(sizes.length);

      // La sortie se recharge dans pdf-lib : PDF valide, mêmes pages.
      const out = await PDFDocument.load(fromBase64(res.outB64));
      expect(out.getPageCount()).toBe(sizes.length);
      out.getPages().forEach((p, i) => {
        expect(Math.abs(p.getWidth() - sizes[i][0])).toBeLessThan(0.6);
        expect(Math.abs(p.getHeight() - sizes[i][1])).toBeLessThan(0.6);
      });

      // Le filigrane est réellement peint : l'original étant blanc, l'aperçu
      // de la première page doit contenir des pixels rouges (texte à 45 %).
      const { red } = await countRedPixels(res.previews[0]);
      expect(red).toBeGreaterThan(200);
    },
    60_000
  );

  test(
    "PDF : les aperçus sont plafonnés à 12 pages, le fichier garde tout",
    async () => {
      const pageCount = PREVIEW_MAX_PAGES + 2;
      const input = await makePdf(Array.from({ length: pageCount }, () => [200, 300]));
      const res = await runWatermark({
        b64: toBase64(input),
        name: "long.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
      });

      if (!res.ok) throw new Error(`watermarkFile a rejeté : ${res.error}`);
      expect(res.pageCount).toBe(pageCount);
      expect(res.previewCount).toBe(PREVIEW_MAX_PAGES);
      const out = await PDFDocument.load(fromBase64(res.outB64));
      expect(out.getPageCount()).toBe(pageCount);
    },
    120_000
  );

  test(
    "image : sortie PNG, un seul aperçu, pixels du filigrane présents",
    async () => {
      // Tout se joue dans la page : on fabrique une image de référence,
      // on la filigrane, puis on compare pixel à pixel avec la référence
      // redessinée aux dimensions de sortie.
      const metrics = await page.evaluate(async (text) => {
        const mod = (window as any).__wm;
        const src = document.createElement("canvas");
        src.width = 300;
        src.height = 200;
        const sctx = src.getContext("2d");
        if (!sctx) throw new Error("canvas indisponible");
        sctx.fillStyle = "#ffffff";
        sctx.fillRect(0, 0, 300, 200);
        sctx.fillStyle = "#222222";
        sctx.fillRect(20, 20, 80, 40); // motif pour une image non uniforme
        const blob = await new Promise<Blob>((resolve, reject) =>
          src.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob"))), "image/png")
        );
        const file = new File([blob], "photo.png", { type: "image/png" });

        const res = await mod.watermarkFile(file, text);
        const outBmp = await createImageBitmap(res.blob);

        const draw = (
          w: number,
          h: number,
          paint: (ctx: CanvasRenderingContext2D) => void
        ) => {
          const c = document.createElement("canvas");
          c.width = w;
          c.height = h;
          const ctx = c.getContext("2d");
          if (!ctx) throw new Error("canvas indisponible");
          paint(ctx);
          return ctx.getImageData(0, 0, w, h).data;
        };
        const outPx = draw(outBmp.width, outBmp.height, (ctx) => ctx.drawImage(outBmp, 0, 0));
        // Référence : la même image, sans filigrane, aux mêmes dimensions.
        const basePx = draw(outBmp.width, outBmp.height, (ctx) =>
          ctx.drawImage(src, 0, 0, outBmp.width, outBmp.height)
        );

        let diff = 0;
        let red = 0;
        for (let i = 0; i < outPx.length; i += 4) {
          if (
            Math.abs(outPx[i] - basePx[i]) > 15 ||
            Math.abs(outPx[i + 1] - basePx[i + 1]) > 15 ||
            Math.abs(outPx[i + 2] - basePx[i + 2]) > 15
          )
            diff++;
          if (outPx[i] > outPx[i + 1] + 30 && outPx[i] > outPx[i + 2] + 30) red++;
        }
        return {
          extension: res.extension,
          blobType: res.blob.type,
          pageCount: res.pageCount,
          previewCount: res.previews.length,
          width: outBmp.width,
          height: outBmp.height,
          diff,
          red,
        };
      }, WATERMARK_TEXT);

      expect(metrics.extension).toBe("png");
      expect(metrics.blobType).toBe("image/png");
      expect(metrics.pageCount).toBe(1);
      expect(metrics.previewCount).toBe(1);
      // MIN_IMAGE_SIDE=800 : la petite image est agrandie.
      expect(Math.max(metrics.width, metrics.height)).toBeGreaterThanOrEqual(799);
      // Le résultat diffère de la référence non filigranée…
      expect(metrics.diff).toBeGreaterThan(500);
      // …et la différence est bien le texte rouge du filigrane.
      expect(metrics.red).toBeGreaterThan(200);
    },
    30_000
  );
});

describe("contrat d'erreurs du moteur", () => {
  test(
    "un PDF corrompu rejette avec « pdf_unreadable »",
    async () => {
      const garbage = new Uint8Array(512);
      crypto.getRandomValues(garbage);
      const res = await runWatermark({
        b64: toBase64(garbage),
        name: "corrompu.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
      });
      expect(res.ok).toBe(false);
      if (!res.ok) expect(res.error).toBe("pdf_unreadable");
    },
    30_000
  );

  test(
    "un PDF de plus de 500 pages rejette avec « pdf_too_many_pages » (pas de rendu interminable)",
    async () => {
      const res = await runWatermark({
        b64: toBase64(await makePdf(Array.from({ length: 501 }, () => [50, 50] as [number, number]))),
        name: "annuaire.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
      });
      expect(res.ok).toBe(false);
      if (!res.ok) expect(res.error).toBe("pdf_too_many_pages");
    },
    30_000
  );

  test("un fichier de plus de 200 Mo rejette avec « file_too_large », sans être lu", async () => {
    const error = await page.evaluate(async () => {
      const mb = new Uint8Array(1024 * 1024);
      const file = new File(Array.from({ length: 201 }, () => mb), "enorme.pdf", {
        type: "application/pdf",
      });
      try {
        await (window as any).__wm.watermarkFile(file, "x");
        return "accepté";
      } catch (e) {
        return e instanceof Error ? e.message : String(e);
      }
    });
    expect(error).toBe("file_too_large");
  }, 30_000);

  test("un type non géré rejette avec « unsupported »", async () => {
    const res = await runWatermark({
      b64: toBase64(new TextEncoder().encode("bonjour")),
      name: "notes.txt",
      type: "text/plain",
      text: WATERMARK_TEXT,
    });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toBe("unsupported");
  }, 15_000);

  test(
    "un PDF chiffré sans mot de passe rejette avec « pdf_password »",
    async () => {
      const res = await runWatermark({
        b64: ENCRYPTED_PDF_B64,
        name: "verrouille.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
      });
      expect(res.ok).toBe(false);
      if (!res.ok) expect(res.error).toBe("pdf_password");
    },
    30_000
  );

  test(
    "un PDF chiffré avec un mauvais mot de passe rejette avec « pdf_password_wrong »",
    async () => {
      const res = await runWatermark({
        b64: ENCRYPTED_PDF_B64,
        name: "verrouille.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
        password: "pas-le-bon",
      });
      expect(res.ok).toBe(false);
      if (!res.ok) expect(res.error).toBe("pdf_password_wrong");
    },
    30_000
  );

  test(
    "un PDF chiffré avec le bon mot de passe ressort filigrané et valide",
    async () => {
      const res = await runWatermark({
        b64: ENCRYPTED_PDF_B64,
        name: "verrouille.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
        password: ENCRYPTED_PDF_PASSWORD,
        // Page du fichier de test minuscule : au réglage « Léger » (texte à 50 %),
        // le contour sombre recouvre presque tout le remplissage rouge compté ici.
        style: { font: "mono", scale: 1, color: "#c4262e", opacity: 0.45, wave: 0 },
      });
      if (!res.ok) throw new Error(`watermarkFile a rejeté : ${res.error}`);
      expect(res.pageCount).toBe(1);
      // La sortie n'est plus chiffrée : elle se recharge sans mot de passe.
      const out = await PDFDocument.load(fromBase64(res.outB64));
      expect(out.getPageCount()).toBe(1);
      const { red } = await countRedPixels(res.previews[0]);
      expect(red).toBeGreaterThan(200);
    },
    60_000
  );

  test("une image illisible rejette avec « image_unreadable »", async () => {
    const garbage = new Uint8Array(256);
    crypto.getRandomValues(garbage);
    const res = await runWatermark({
      b64: toBase64(garbage),
      name: "cassee.png",
      type: "image/png",
      text: WATERMARK_TEXT,
    });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toBe("image_unreadable");
  }, 15_000);
});

// Régressions issues de la campagne red team : entrées hostiles pour
// lesquelles la défense a tenu. On les fige ici pour qu'elles le restent.
describe("corpus adversarial (défenses vérifiées)", () => {
  test("un fichier de 0 octet rejette proprement (pas de plantage)", async () => {
    const res = await runWatermark({
      b64: "",
      name: "vide.pdf",
      type: "application/pdf",
      text: WATERMARK_TEXT,
    });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toBe("pdf_unreadable");
  }, 15_000);

  test(
    "une page pivotée (/Rotate 90) ressort filigranée et valide",
    async () => {
      const res = await runWatermark({
        b64: toBase64(await makeRotatedPdf(595.28, 841.89, 90)),
        name: "pivotee.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
      });
      if (!res.ok) throw new Error(`watermarkFile a rejeté : ${res.error}`);
      expect(res.pageCount).toBe(1);
      const out = await PDFDocument.load(fromBase64(res.outB64));
      expect(out.getPageCount()).toBe(1);
      const { red } = await countRedPixels(res.previews[0]);
      expect(red).toBeGreaterThan(200);
    },
    60_000
  );

  test(
    "une page démesurée (200 pouces) est plafonnée sans planter, sortie valide",
    async () => {
      const huge = 200 * 72; // 200 pouces en points
      const res = await runWatermark({
        b64: toBase64(await makePdf([[huge, huge]])),
        name: "geante.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
      });
      if (!res.ok) throw new Error(`watermarkFile a rejeté : ${res.error}`);
      expect(res.pageCount).toBe(1);
      const out = await PDFDocument.load(fromBase64(res.outB64));
      // La page de sortie garde les dimensions logiques d'origine…
      expect(Math.abs(out.getPage(0).getWidth() - huge)).toBeLessThan(1);
      // …même si le canvas de rendu a été plafonné par fitScale.
      const { red } = await countRedPixels(res.previews[0]);
      expect(red).toBeGreaterThan(50);
    },
    60_000
  );
});

// Le document produit est destiné à être transmis : rien du fichier
// d'origine ne doit y survivre hormis ses pixels. C'est la propriété de
// sécurité centrale (docs/security.md, « Assainissement des sorties »).
describe("assainissement : rien ne fuit du document d'origine", () => {
  test(
    "PDF hostile → ni texte, ni métadonnées, ni pièce jointe, ni JavaScript, ni lien, ni police",
    async () => {
      const hostile = await makeHostilePdf();
      // Témoin : le scanner voit bien tout ce qui a été planté.
      const before = await scanPdfForLeaks(hostile);
      expect(before.markerHits).toBeGreaterThan(0);
      expect(before.keys).toEqual(["EmbeddedFiles", "Font", "JS", "Metadata", "OpenAction", "URI"]);

      const res = await runWatermark({
        b64: toBase64(hostile),
        name: "hostile.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
      });
      if (!res.ok) throw new Error(`watermarkFile a rejeté : ${res.error}`);
      const after = await scanPdfForLeaks(fromBase64(res.outB64));
      expect(after.markerHits).toBe(0);
      expect(after.keys).toEqual([]);
      // Chaque page de sortie n'est qu'une image : la couche texte a disparu.
      const out = await PDFDocument.load(fromBase64(res.outB64));
      expect(out.getPageCount()).toBe(1);
    },
    60_000
  );

  test(
    "image JPEG avec EXIF (GPS…) → PNG ré-encodé sans aucune métadonnée d'origine",
    async () => {
      const jpegB64 = await page.evaluate(async () => {
        const c = document.createElement("canvas");
        c.width = 320;
        c.height = 240;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#88aacc";
        ctx.fillRect(0, 0, c.width, c.height);
        const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), "image/jpeg", 0.9));
        const bytes = new Uint8Array(await blob.arrayBuffer());
        return btoa(String.fromCharCode(...bytes));
      });
      const jpeg = withExif(fromBase64(jpegB64));
      expect(new TextDecoder("latin1").decode(jpeg)).toContain(SECRET);

      const res = await runWatermark({
        b64: toBase64(jpeg),
        name: "photo.jpg",
        type: "image/jpeg",
        text: WATERMARK_TEXT,
      });
      if (!res.ok) throw new Error(`watermarkFile a rejeté : ${res.error}`);
      expect(res.extension).toBe("png");
      const out = new TextDecoder("latin1").decode(fromBase64(res.outB64));
      expect(out).not.toContain(SECRET);
      expect(out).not.toContain("Exif");
    },
    30_000
  );
});

describe("HEIC (photos d'iPhone)", () => {
  test(
    "un HEIC est décodé localement (libheif) puis filigrané, couleurs d'origine préservées",
    async () => {
      const res = await runWatermark({
        b64: HEIC_320x240_B64,
        name: "IMG_0001.HEIC",
        type: "image/heic",
        text: WATERMARK_TEXT,
      });
      if (!res.ok) throw new Error(`watermarkFile a rejeté : ${res.error}`);
      expect(res.extension).toBe("png");
      // Agrandie à 800 px de large au minimum (MIN_IMAGE_SIDE), proportions gardées.
      const colors = await page.evaluate(async (src) => {
        const bmp = await createImageBitmap(await (await fetch(src)).blob());
        const c = document.createElement("canvas");
        c.width = bmp.width;
        c.height = bmp.height;
        const ctx = c.getContext("2d")!;
        ctx.drawImage(bmp, 0, 0);
        const at = (x: number, y: number) => Array.from(ctx.getImageData(x, y, 1, 1).data.slice(0, 3));
        return { w: bmp.width, h: bmp.height, left: at(8, 8), right: at(bmp.width - 8, 8) };
      }, res.previews[0]);
      expect(colors.w).toBe(800);
      expect(colors.h).toBe(600);
      // Bleu à gauche, vert à droite (coin : loin du filigrane centré).
      expect(colors.left[2]).toBeGreaterThan(colors.left[1]);
      expect(colors.right[1]).toBeGreaterThan(colors.right[2]);
    },
    60_000
  );

  test("un faux HEIC (octets quelconques) rejette avec « image_unreadable »", async () => {
    const res = await runWatermark({
      b64: toBase64(new TextEncoder().encode("ftypheic mais pas vraiment")),
      name: "faux.heic",
      type: "image/heic",
      text: WATERMARK_TEXT,
    });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toBe("image_unreadable");
  }, 30_000);
});

describe("masquage (caviardage)", () => {
  test(
    "la zone masquée ne contient plus aucun pixel d'origine ; le reste est intact",
    async () => {
      const res = await runWatermark({
        b64: toBase64(await makeBluePdf()),
        name: "bleu.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
        options: { masks: { 0: [{ x: 0, y: 0, w: 0.5, h: 0.5 }] } },
      });
      if (!res.ok) throw new Error(`watermarkFile a rejeté : ${res.error}`);
      const blue = await page.evaluate(async (src) => {
        const bmp = await createImageBitmap(await (await fetch(src)).blob());
        const c = document.createElement("canvas");
        c.width = bmp.width;
        c.height = bmp.height;
        const ctx = c.getContext("2d")!;
        ctx.drawImage(bmp, 0, 0);
        const count = (x0: number, y0: number, w: number, h: number) => {
          const d = ctx.getImageData(x0, y0, w, h).data;
          let n = 0;
          for (let i = 0; i < d.length; i += 4) if (d[i + 2] > 120 && d[i + 2] > d[i] + 40) n++;
          return n;
        };
        const hw = Math.floor(bmp.width / 2) - 2;
        const hh = Math.floor(bmp.height / 2) - 2;
        return { masked: count(0, 0, hw, hh), open: count(bmp.width - hw, bmp.height - hh, hw, hh) };
      }, res.previews[0]);
      expect(blue.masked).toBe(0);
      expect(blue.open).toBeGreaterThan(10_000);
    },
    60_000
  );
});

describe("taille cible", () => {
  test(
    "image de bruit (PNG de plusieurs Mo) → JPEG sous 300 Ko",
    async () => {
      const noise = makeNoisePng(1200, 1200);
      expect(noise.length).toBeGreaterThan(3_000_000);
      const res = await runWatermark({
        b64: toBase64(noise),
        name: "bruit.png",
        type: "image/png",
        text: WATERMARK_TEXT,
        options: { maxBytes: 300 * 1024 },
      });
      if (!res.ok) throw new Error(`watermarkFile a rejeté : ${res.error}`);
      expect(res.extension).toBe("jpg");
      expect(res.size).toBeLessThanOrEqual(300 * 1024);
      expect(res.overBudget).toBe(false);
    },
    60_000
  );

  test(
    "PDF de bruit → sous 250 Ko ; sans taille cible, nettement plus lourd",
    async () => {
      const b64 = toBase64(await makeNoisePdf());
      const free = await runWatermark({ b64, name: "bruit.pdf", type: "application/pdf", text: WATERMARK_TEXT });
      const capped = await runWatermark({
        b64,
        name: "bruit.pdf",
        type: "application/pdf",
        text: WATERMARK_TEXT,
        options: { maxBytes: 250 * 1024 },
      });
      if (!free.ok || !capped.ok) throw new Error("watermarkFile a rejeté");
      expect(free.size).toBeGreaterThan(250 * 1024);
      expect(capped.size).toBeLessThanOrEqual(250 * 1024);
      expect(capped.overBudget).toBe(false);
      expect((await PDFDocument.load(fromBase64(capped.outB64))).getPageCount()).toBe(1);
    },
    90_000
  );
});
