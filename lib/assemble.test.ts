import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PDFDict, PDFDocument, PDFName, PDFString, rgb, StandardFonts } from "pdf-lib";
import {
  assemblePdf,
  estimatePdfSize,
  FIT_MARGIN,
  FLOOR_PAGE_BYTES,
  FLOOR_RATIO,
  floorEstimate,
  LOWEST,
  LOWEST_PAGE_BYTES,
  LOWEST_RATIO,
  predictFit,
  weightedBudgets,
} from "./assemble";
import { newPdf } from "./files";
import { ENCODE_LADDER, DOSSIER_MIN_SCALE, ladderFrom, mbToBytes, pageBudget, pdfOverhead } from "./size-budget";
import type { WatermarkResult } from "./watermark";

const PNG_1x1 = Uint8Array.from(
  Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64")
);

/** Une sortie du moteur, telle qu'il la fabrique : une image par page, aucune métadonnée. */
async function rendered(sizes: [number, number][]): Promise<WatermarkResult> {
  const doc = await newPdf();
  const image = await doc.embedPng(PNG_1x1);
  for (const [w, h] of sizes) doc.addPage([w, h]).drawImage(image, { x: 0, y: 0, width: w, height: h });
  return asResult(await doc.save(), sizes.length);
}
function asResult(bytes: Uint8Array, pageCount: number): WatermarkResult {
  return {
    blob: new Blob([bytes as BlobPart], { type: "application/pdf" }),
    url: "",
    extension: "pdf",
    previews: [],
    previewPageIndexes: [],
    pageCount,
  };
}
const sizesOf = async (bytes: Uint8Array) =>
  (await PDFDocument.load(bytes, { updateMetadata: false })).getPages().map((p) => `${p.getWidth()}x${p.getHeight()}`);

describe("assemblePdf (pages déjà reconstruites, dans l'ordre demandé)", () => {
  test("ordre [B2, A1, B1] : pages de deux documents entremêlées, nombre de pages exact", async () => {
    const parts = new Map([
      ["a", await rendered([[100, 110], [120, 130]])],
      ["b", await rendered([[200, 210], [220, 230], [240, 250]])],
    ]);
    const bytes = await assemblePdf(parts, [
      { doc: "b", page: 1 },
      { doc: "a", page: 0 },
      { doc: "b", page: 0 },
    ]);
    expect(await sizesOf(bytes)).toEqual(["220x230", "100x110", "200x210"]);
  });

  test("une page retirée n'est pas dans le fichier ; un document sans page gardée n'est même pas lu", async () => {
    const parts = new Map([
      ["a", await rendered([[100, 110], [120, 130]])],
      // Jamais demandé : son contenu (illisible) ne doit pas compter.
      ["b", asResult(new Uint8Array([1, 2, 3]), 1)],
    ]);
    expect(await sizesOf(await assemblePdf(parts, [{ doc: "a", page: 1 }]))).toEqual(["120x130"]);
  });

  test("aucune métadonnée (ni Producer, ni Creator, ni dates), aucune annotation", async () => {
    const parts = new Map([["a", await rendered([[100, 110], [120, 130]])]]);
    const bytes = await assemblePdf(parts, [{ doc: "a", page: 0 }, { doc: "a", page: 1 }]);
    const doc = await PDFDocument.load(bytes, { updateMetadata: false });
    // Pas même un dictionnaire /Info (à lire AVANT les accesseurs, qui en créent un vide).
    expect(doc.context.trailerInfo.Info).toBeUndefined();
    expect(doc.getProducer()).toBeUndefined();
    expect(doc.getCreator()).toBeUndefined();
    expect(doc.getCreationDate()).toBeUndefined();
    expect(doc.getModificationDate()).toBeUndefined();
    expect(doc.getTitle()).toBeUndefined();
    for (const page of doc.getPages()) {
      // Même le tableau /Annots vide que pdf-lib pose sur chaque page est retiré.
      expect(page.node.get(PDFName.of("Annots"))).toBeUndefined();
      expect(page.node.keys().map((k) => k.decodeText()).sort()).toEqual(["Contents", "MediaBox", "Parent", "Resources", "Type"]);
      // Aucune police : le dictionnaire /Font, s'il existe, est vide (pas de texte possible).
      const fonts = page.node.Resources()!.lookup(PDFName.of("Font"));
      expect(fonts === undefined || (fonts instanceof PDFDict && fonts.keys().length === 0)).toBe(true);
    }
    expect(doc.catalog.keys().map((k) => k.decodeText()).sort()).toEqual(["Pages", "Type"]);
  });

  test("les pages recopiées gardent leur image, et les pages non demandées ne sont pas dans le fichier", async () => {
    const parts = new Map([["a", await rendered([[100, 110], [120, 130], [140, 150]])]]);
    const doc = await PDFDocument.load(await assemblePdf(parts, [{ doc: "a", page: 2 }]), { updateMetadata: false });
    expect(doc.getPageCount()).toBe(1);
    const xobjects = doc.getPage(0).node.Resources()!.lookup(PDFName.of("XObject"), PDFDict);
    expect(xobjects.entries()).toHaveLength(1);
  });

  test("page ou document inconnu : erreur nommée, jamais un fichier incomplet", async () => {
    const parts = new Map([["a", await rendered([[100, 110]])]]);
    await expect(assemblePdf(parts, [{ doc: "zz", page: 0 }])).rejects.toThrow("assemble_missing_part");
    await expect(assemblePdf(parts, [{ doc: "a", page: 1 }])).rejects.toThrow("assemble_missing_part");
    await expect(assemblePdf(parts, [{ doc: "a", page: -1 }])).rejects.toThrow("assemble_missing_part");
    // Une image seule (PNG, JPEG) n'est pas une partie : le mode dossier ne produit que des PDF.
    const png: WatermarkResult = { ...(await rendered([[10, 10]])), extension: "png" };
    await expect(assemblePdf(new Map([["a", png]]), [{ doc: "a", page: 0 }])).rejects.toThrow("assemble_missing_part");
  });

  // docs/prd-dossier.md §6.4 : jamais de pages recopiées depuis un PDF d'origine.
  describe("un PDF qui n'a pas la forme d'une sortie Cachety est refusé, pas recopié", () => {
    const refuse = async (bytes: Uint8Array) =>
      expect(assemblePdf(new Map([["x", asResult(bytes, 1)]]), [{ doc: "x", page: 0 }])).rejects.toThrow("assemble_foreign_page");

    test("texte (une police dans les ressources)", async () => {
      const doc = await newPdf();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      doc.addPage([200, 200]).drawText("IBAN FR76 3000", { x: 10, y: 100, size: 10, font });
      await refuse(await doc.save());
    });

    test("annotation (lien sortant) sur une page par ailleurs conforme", async () => {
      const doc = await newPdf();
      const image = await doc.embedPng(PNG_1x1);
      const page = doc.addPage([200, 200]);
      page.drawImage(image, { x: 0, y: 0, width: 200, height: 200 });
      const link = doc.context.register(
        doc.context.obj({ Type: "Annot", Subtype: "Link", Rect: [0, 0, 200, 200], A: { S: "URI", URI: PDFString.of("https://example.invalid/") } })
      );
      page.node.set(PDFName.of("Annots"), doc.context.obj([link]));
      await refuse(await doc.save());
    });

    test("métadonnées (titre, auteur)", async () => {
      const doc = await PDFDocument.create();
      const image = await doc.embedPng(PNG_1x1);
      doc.addPage([200, 200]).drawImage(image, { x: 0, y: 0, width: 200, height: 200 });
      doc.setTitle("Avis d'impôt 2026");
      await refuse(await doc.save());
    });

    test("pièce jointe, script à l'ouverture", async () => {
      const attached = await newPdf();
      const image = await attached.embedPng(PNG_1x1);
      attached.addPage([200, 200]).drawImage(image, { x: 0, y: 0, width: 200, height: 200 });
      await attached.attach(new TextEncoder().encode("secret"), "secret.txt", { mimeType: "text/plain" });
      await refuse(await attached.save());

      const scripted = await newPdf();
      const image2 = await scripted.embedPng(PNG_1x1);
      scripted.addPage([200, 200]).drawImage(image2, { x: 0, y: 0, width: 200, height: 200 });
      scripted.catalog.set(
        PDFName.of("OpenAction"),
        scripted.context.obj({ Type: "Action", S: "JavaScript", JS: PDFString.of("app.alert(1)") })
      );
      await refuse(await scripted.save());
    });

    test("page vide, ou dessin vectoriel sans image", async () => {
      const empty = await newPdf();
      empty.addPage([200, 200]);
      await refuse(await empty.save());
      const drawn = await newPdf();
      drawn.addPage([200, 200]).drawRectangle({ x: 10, y: 10, width: 50, height: 50, color: rgb(1, 0, 0) });
      await refuse(await drawn.save());
    });
  });

  test("garde-fou : assemblePdf n'est appelé qu'avec des résultats du moteur, et copyPages n'existe nulle part ailleurs pour le dossier", () => {
    const root = join(import.meta.dir, "..");
    // Sa signature prend des WatermarkResult : ni File, ni Blob, ni octets d'un fichier d'origine.
    const source = readFileSync(join(root, "lib", "assemble.ts"), "utf8");
    expect(source).toMatch(/parts: ReadonlyMap<string, WatermarkResult>/);
    expect(source).not.toMatch(/\bFile\b(?! d'origine)/);
    // Seul appelant : le module du mode dossier, avec les résultats de la file de rendu.
    const callers = ["components/useDossier.ts", "components/CoreProduct.tsx", "lib/dossier-build.ts"]
      .map((rel) => join(root, rel))
      .filter((p) => {
        try {
          return /assemblePdf\(/.test(readFileSync(p, "utf8"));
        } catch {
          return false;
        }
      });
    expect(callers.map((p) => p.slice(root.length + 1))).toEqual(["lib/dossier-build.ts"]);
    const build = readFileSync(join(root, "lib", "dossier-build.ts"), "utf8");
    expect(build).not.toMatch(/\.file\b|PDFDocument\.load/);
  });
});

describe("budget pondéré par le poids du premier rendu", () => {
  const photo = 400_000;
  const text = 60_000;
  const mixed = [photo, text, photo, text, photo, text, photo, text, photo, text];

  test("la somme, structure du PDF comprise, ne dépasse jamais la cible", () => {
    for (const max of [mbToBytes(0.5), mbToBytes(1), mbToBytes(2), mbToBytes(5)]) {
      const budgets = weightedBudgets(mixed, max);
      expect(budgets).toHaveLength(mixed.length);
      expect(budgets.reduce((a, b) => a + b, 0) + pdfOverhead(mixed.length)).toBeLessThanOrEqual(max);
    }
  });

  test("une page photo reçoit plus qu'une page de texte", () => {
    const budgets = weightedBudgets(mixed, mbToBytes(1));
    for (let i = 0; i < mixed.length; i += 2) expect(budgets[i]).toBeGreaterThan(budgets[i + 1] * 2);
    // Mêmes poids, mêmes budgets.
    expect(new Set(budgets.filter((_, i) => i % 2 === 0)).size).toBe(1);
  });

  test("aucune page sous le plancher (le tiers d'une part égale, par défaut)", () => {
    const max = mbToBytes(1);
    const sizes = [2_000_000, 2_000_000, 2_000_000, 30_000, 30_000];
    const floor = Math.floor(pageBudget(max, sizes.length) / 3);
    const budgets = weightedBudgets(sizes, max);
    for (const b of budgets) expect(b).toBeGreaterThanOrEqual(Math.min(floor, 30_000));
    // Les pages légères ne prennent pas plus que leur poids : le reste va aux photos.
    expect(budgets[3]).toBeLessThanOrEqual(30_000 + floor);
    expect(budgets[0]).toBeGreaterThan(250_000);
    // Plancher explicite.
    weightedBudgets(sizes, max, 50_000).forEach((b, i) => expect(b).toBeGreaterThanOrEqual(Math.min(50_000, sizes[i])));
  });

  test("tout tient déjà : chaque page garde son poids", () => {
    expect(weightedBudgets([100_000, 20_000], mbToBytes(5))).toEqual([100_000, 20_000]);
  });

  test("cible intenable (1 000 pages sous 1 Mo) : jamais de budget négatif, jamais au-delà de la cible", () => {
    const sizes = new Array(1000).fill(300_000);
    const max = mbToBytes(1);
    const budgets = weightedBudgets(sizes, max);
    for (const b of budgets) expect(b).toBeGreaterThanOrEqual(0);
    expect(budgets.reduce((a, b) => a + b, 0) + pdfOverhead(1000)).toBeLessThanOrEqual(max);
    expect(weightedBudgets([], max)).toEqual([]);
    expect(weightedBudgets([5, 5], 10)).toEqual([0, 0]);
  });
});

describe("prédiction : la cible tient-elle en restant lisible ?", () => {
  test("trois états, d'après les poids du premier rendu", () => {
    const pages = new Array(10).fill(500_000); // environ 5 Mo
    expect(predictFit(pages, mbToBytes(10))).toBe("fits");
    expect(predictFit(pages, mbToBytes(2))).toBe("reduced");
    expect(predictFit(pages, mbToBytes(0.5))).toBe("unreachable");
  });

  test("les seuils suivent FLOOR_RATIO, avec la marge de la mesure", () => {
    const pages = [1_000_000];
    const floor = 1_000_000 * FLOOR_RATIO * FIT_MARGIN + pdfOverhead(1);
    expect(predictFit(pages, Math.ceil(floor))).toBe("reduced");
    expect(predictFit(pages, Math.floor(floor) - 1)).toBe("unreachable");
    expect(predictFit(pages, estimatePdfSize(pages))).toBe("fits");
    expect(predictFit(pages, estimatePdfSize(pages) - 1)).toBe("reduced");
  });

  test("qualité plus faible acceptée : une cible plus basse devient tenable", () => {
    expect(LOWEST_RATIO).toBeLessThan(FLOOR_RATIO);
    const pages = [1_000_000];
    const target = Math.ceil(1_000_000 * LOWEST_RATIO * FIT_MARGIN + pdfOverhead(1));
    expect(predictFit(pages, target)).toBe("unreachable");
    expect(predictFit(pages, target, LOWEST)).toBe("reduced");
    expect(LOWEST_PAGE_BYTES).toBeLessThan(FLOOR_PAGE_BYTES);
  });

  test("pages de texte : jamais estimées sous le poids d'une page de texte au plancher", () => {
    // 30 bulletins de paie (160 Ko chacun) sous 1 Mo : le rapport seul dirait « tient », à tort.
    const text = new Array(30).fill(160_000);
    expect(text.length * 160_000 * FLOOR_RATIO * FIT_MARGIN + pdfOverhead(30)).toBeLessThan(mbToBytes(1));
    expect(floorEstimate(text)).toBe(30 * FLOOR_PAGE_BYTES);
    expect(predictFit(text, mbToBytes(1))).toBe("unreachable");
    expect(predictFit(text, mbToBytes(2))).toBe("reduced");
    // Une page déjà plus légère que ce plancher n'est pas comptée plus lourde qu'elle n'est.
    expect(floorEstimate([10_000, 5_000])).toBe(15_000);
    // Une page très lourde suit le rapport mesuré.
    expect(floorEstimate([2_000_000])).toBe(2_000_000 * FLOOR_RATIO);
    expect(floorEstimate([2_000_000], LOWEST)).toBe(2_000_000 * LOWEST_RATIO);
  });

  test("1 000 pages sous 1 Mo : intenable ; rien à produire ou pas de cible : rien à dire", () => {
    expect(predictFit(new Array(1000).fill(200_000), mbToBytes(1))).toBe("unreachable");
    expect(predictFit([], mbToBytes(1))).toBe("fits");
    expect(predictFit([1_000_000], 0)).toBe("fits");
    expect(estimatePdfSize([])).toBe(0);
  });
});

describe("plancher de lisibilité", () => {
  test("DOSSIER_MIN_SCALE est un barreau de l'échelle, et pas le dernier", () => {
    const scales = [...new Set(ENCODE_LADDER.map((r) => r.scale))];
    expect(scales).toContain(DOSSIER_MIN_SCALE);
    expect(Math.min(...scales)).toBeLessThan(DOSSIER_MIN_SCALE);
  });

  test("avec minScale, aucun essai sous le plancher ; sans, toute l'échelle", () => {
    const floored = ladderFrom(DOSSIER_MIN_SCALE);
    expect(floored.length).toBeGreaterThan(0);
    for (const rung of floored) expect(rung.scale).toBeGreaterThanOrEqual(DOSSIER_MIN_SCALE);
    expect(floored.at(-1)).toEqual({ scale: DOSSIER_MIN_SCALE, quality: 0.45 });
    expect(ladderFrom()).toEqual(ENCODE_LADDER);
    expect(ladderFrom(0)).toEqual(ENCODE_LADDER);
    // Plancher absurde : le barreau le plus fidèle, jamais une échelle vide.
    expect(ladderFrom(2)).toEqual([{ scale: 1, quality: 0.85 }]);
  });
});
