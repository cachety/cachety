// Couture navigateur des suggestions de masquage : le VRAI pipeline
// (pdf.js → lignes de texte → détection → rectangles → masques → sortie)
// dans un vrai navigateur, sans l'interface. Documents fabriqués avec pdf-lib,
// dont on connaît la position de chaque numéro.
//
// docs/prd-suggested-areas.md §11.2.
//
// Fichier nommé *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { PDFDocument } from "pdf-lib";
import { startEngine, type Engine } from "./helpers/engine";
import { ENCRYPTED_PDF_B64, ENCRYPTED_PDF_PASSWORD, makeNoisePng, pageJpeg, scanPdfForLeaks, toBase64 } from "./helpers/fixtures";
import { ARABIC_IBAN, ARABIC_PDF_B64 } from "./helpers/arabic-fixture";
import {
  coverage,
  IBAN,
  IBAN_PAGE_30,
  intersects,
  makeLongPdf,
  makeManyItemsPdf,
  makeSuggestPayslip,
  makeTextHeavyPdf,
  NIR,
  type Box,
} from "./helpers/suggest-fixtures";

let engine: Engine;

beforeAll(async () => {
  engine = await startEngine({ __wm: "lib/watermark.ts", __sug: "lib/suggestions.ts" });
}, 120_000);

afterAll(async () => {
  await engine?.stop();
});

type Found = {
  ok: true;
  pageCount: number;
  hasText: boolean;
  incomplete: boolean;
  matches: { kind: string; page: number; masked: string; text: string; rects: Box[] }[];
  /** Texte de chaque ligne, par page. */
  lines: string[][];
  /** Sortie (PDF ou image) en base64 ; avec `hide`, toutes les suggestions y sont masquées. */
  outB64: string;
  /** Le texte lu a-t-il été rendu par le moteur (option extractText) ? */
  hadLines: boolean;
};

/**
 * Rend un fichier avec extractText, calcule ses suggestions (lib/suggestions.ts)
 * et, avec `hide`, le rend une seconde fois en les masquant toutes. Sans texte
 * de filigrane : seuls les masques changent la page.
 */
function suggest(input: { b64: string; name?: string; type?: string; password?: string; hide?: boolean }) {
  return engine.page.evaluate(async (arg) => {
    const wm = (window as any).__wm;
    const sug = (window as any).__sug;
    const bytes = Uint8Array.from(atob(arg.b64), (c) => c.charCodeAt(0));
    const file = new File([bytes], arg.name ?? "document.pdf", { type: arg.type ?? "application/pdf" });
    try {
      const first = await wm.watermarkFile(file, "", undefined, arg.password, undefined, undefined, { extractText: true });
      const hadLines = Array.isArray(first.lines);
      const lines: string[][] = (first.lines ?? []).map((p: any[]) => p.map((l) => l.text));
      const s = sug.takeSuggestions({}, first).suggestions;
      let result = first;
      if (arg.hide) {
        wm.releaseResult(first);
        result = await wm.watermarkFile(file, "", undefined, arg.password, undefined, undefined, { masks: sug.hideAll(undefined, s).masks });
      }
      const out = new Uint8Array(await result.blob.arrayBuffer());
      let binary = "";
      for (let i = 0; i < out.length; i += 0x8000) binary += String.fromCharCode(...out.subarray(i, i + 0x8000));
      wm.releaseResult(result);
      return {
        ok: true,
        pageCount: result.pageCount,
        hasText: s.hasText,
        incomplete: s.incomplete,
        matches: s.matches.map((m: any, i: number) => ({
          kind: m.kind,
          page: m.page,
          masked: m.masked,
          text: s.lines[m.page][m.line].text.slice(m.start, m.end),
          rects: sug.rectsOf(s, i),
        })),
        lines,
        outB64: btoa(binary),
        hadLines,
      };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }, input) as Promise<Found | { ok: false; error: string }>;
}

async function found(input: Parameters<typeof suggest>[0]): Promise<Found> {
  const res = await suggest(input);
  if (!res.ok) throw new Error(`rendu rejeté : ${res.error}`);
  return res;
}

/** Luminance maximale et part de pixels clairs d'une zone (fractions de page) d'une image JPEG ou PNG. */
function brightness(bytes: Uint8Array, type: string, region: Box) {
  return engine.page.evaluate(
    async ({ b64, type, r }) => {
      const data = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const bmp = await createImageBitmap(new Blob([data], { type }));
      const c = document.createElement("canvas");
      c.width = bmp.width;
      c.height = bmp.height;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(bmp, 0, 0);
      const x0 = Math.ceil(r.x * bmp.width);
      const y0 = Math.ceil(r.y * bmp.height);
      const w = Math.max(1, Math.floor((r.x + r.w) * bmp.width) - x0);
      const h = Math.max(1, Math.floor((r.y + r.h) * bmp.height) - y0);
      const d = ctx.getImageData(x0, y0, w, h).data;
      let max = 0;
      let dark = 0;
      for (let i = 0; i < d.length; i += 4) {
        const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        if (lum > max) max = lum;
        if (lum < 128) dark++;
      }
      return { max, darkShare: dark / (d.length / 4), pixels: d.length / 4, width: bmp.width, height: bmp.height };
    },
    { b64: toBase64(bytes), type, r: region }
  );
}

/** Zone rétrécie d'une fraction de sa taille : loin des bords, que le JPEG adoucit. */
const inset = (r: Box, by = 0.12): Box => ({ x: r.x + r.w * by, y: r.y + r.h * by, w: r.w * (1 - 2 * by), h: r.h * (1 - 2 * by) });

describe("bulletin de paie : les numéros sont trouvés là où ils sont", () => {
  test(
    "NIR au milieu d'une ligne et IBAN en deux morceaux : deux suggestions, aux bons endroits ; rien sur les montants, dates et téléphones",
    async () => {
      const fixture = await makeSuggestPayslip();
      const res = await found({ b64: toBase64(fixture.bytes) });
      expect(res.hadLines).toBe(true);
      expect(res.hasText).toBe(true);
      expect(res.incomplete).toBe(false);
      expect(res.matches.map((m) => [m.kind, m.text])).toEqual([
        ["fr-nir", NIR],
        ["iban", IBAN],
      ]);
      // Seule la forme masquée sort de la détection.
      expect(res.matches[1].masked).toBe("FR14 •••• •••• 2606");
      // pdf.js a recollé les deux morceaux de l'IBAN sur une seule ligne.
      expect(res.lines[0]).toContain(`IBAN : ${IBAN}`);

      for (const [i, spot] of fixture.spots.entries()) {
        expect(res.matches[i].rects).toHaveLength(1);
        // Couvre le texte, sans dépasser les marges de plus de 1 % de la largeur de page.
        expect(coverage(res.matches[i].rects[0], spot, 595 / 842)).toEqual([]);
      }
      const rects = res.matches.flatMap((m) => m.rects);
      for (const decoy of fixture.decoys) expect(rects.some((r) => intersects(r, decoy))).toBe(false);
    },
    60_000
  );

  test(
    "la même page avec /Rotate 90 : mêmes suggestions, rectangles dans le repère de la page affichée",
    async () => {
      const fixture = await makeSuggestPayslip(90);
      const res = await found({ b64: toBase64(fixture.bytes) });
      expect(res.matches.map((m) => [m.kind, m.text])).toEqual([
        ["fr-nir", NIR],
        ["iban", IBAN],
      ]);
      for (const [i, spot] of fixture.spots.entries()) {
        const [rect] = res.matches[i].rects;
        // Page affichée en paysage (842 × 595), texte lu de haut en bas : rectangle étroit et haut.
        expect(coverage(rect, spot, 842 / 595, true)).toEqual([]);
        expect(rect.h * 595).toBeGreaterThan(rect.w * 842 * 4);
      }
      const rects = res.matches.flatMap((m) => m.rects);
      for (const decoy of fixture.decoys) expect(rects.some((r) => intersects(r, decoy))).toBe(false);
    },
    60_000
  );

  test(
    "tout accepter : la zone de chaque numéro est noire dans la sortie, qui n'a plus aucun texte",
    async () => {
      for (const rotate of [0, 90] as const) {
        const fixture = await makeSuggestPayslip(rotate);
        // Témoin : sans masque, de l'encre et du blanc dans la zone du numéro.
        const plain = await found({ b64: toBase64(fixture.bytes) });
        const hidden = await found({ b64: toBase64(fixture.bytes), hide: true });
        const before = await pageJpeg(Uint8Array.from(Buffer.from(plain.outB64, "base64")), 0);
        const after = await pageJpeg(Uint8Array.from(Buffer.from(hidden.outB64, "base64")), 0);
        for (const spot of fixture.spots) {
          const was = await brightness(before, "image/jpeg", spot.box);
          expect(was.max).toBeGreaterThan(200);
          expect(was.darkShare).toBeGreaterThan(0.05);
          // Sous le masque : tout est noir, jusqu'aux bords du texte (aucun chiffre ne dépasse).
          const now = await brightness(after, "image/jpeg", spot.box);
          expect(now.pixels).toBeGreaterThan(200);
          expect(now.max).toBeLessThan(40);
          expect(now.darkShare).toBe(1);
        }
        // Le reste de la page est intact : les montants sont toujours lisibles.
        for (const decoy of fixture.decoys) {
          const kept = await brightness(after, "image/jpeg", decoy);
          expect(kept.max).toBeGreaterThan(200);
          expect(kept.darkShare).toBeLessThan(0.6);
        }
        // La sortie n'a ni police ni couche texte : relue par le même pipeline, elle n'a rien à suggérer.
        const out = Uint8Array.from(Buffer.from(hidden.outB64, "base64"));
        expect((await scanPdfForLeaks(out)).keys).toEqual([]);
        const again = await found({ b64: hidden.outB64 });
        expect(again.hasText).toBe(false);
        expect(again.lines.flat()).toEqual([]);
        expect(again.matches).toEqual([]);
      }
    },
    120_000
  );
});

describe("toutes les pages, pas seulement celles de l'aperçu", () => {
  test(
    "40 pages, IBAN page 30 : suggéré, puis noir dans la page 30 de la sortie",
    async () => {
      const fixture = await makeLongPdf(40, 30);
      const res = await found({ b64: toBase64(fixture.bytes), hide: true });
      expect(res.pageCount).toBe(40);
      expect(res.lines).toHaveLength(40);
      expect(res.matches.map((m) => [m.kind, m.page, m.text])).toEqual([["iban", 29, IBAN_PAGE_30]]);
      expect(coverage(res.matches[0].rects[0], fixture.spot, 595 / 842)).toEqual([]);
      const out = Uint8Array.from(Buffer.from(res.outB64, "base64"));
      expect((await PDFDocument.load(out)).getPageCount()).toBe(40);
      const masked = await brightness(await pageJpeg(out, 29), "image/jpeg", fixture.spot.box);
      expect(masked.max).toBeLessThan(40);
      // Même endroit, page voisine : rien n'y est masqué.
      const neighbour = await brightness(await pageJpeg(out, 28), "image/jpeg", fixture.spot.box);
      expect(neighbour.darkShare).toBe(0);
    },
    180_000
  );
});

describe("page de droite à gauche (arabe, persan)", () => {
  test(
    "IBAN dans une ligne arabe : lu dans son sens, suggéré à sa place ; code national persan avec son libellé",
    async () => {
      const res = await found({ b64: ARABIC_PDF_B64 });
      expect(res.matches.map((m) => [m.kind, m.text])).toEqual([
        ["iban", ARABIC_IBAN],
        ["ir-melli", "۰۴۹۹۳۷۰۸۹۹"],
      ]);
      // La ligne se lit depuis la droite : le libellé arabe, puis l'IBAN.
      expect(res.lines[0][1].endsWith(`: ${ARABIC_IBAN}`)).toBe(true);
      // Sur la page, l'IBAN est à gauche de son libellé ; le rectangle est posé sur de l'encre…
      const [iban] = res.matches[0].rects;
      expect(iban.x + iban.w).toBeLessThan(0.8);
      const png = await pageJpeg(Uint8Array.from(Buffer.from(res.outB64, "base64")), 0);
      const ink = await brightness(png, "image/jpeg", iban);
      expect(ink.darkShare).toBeGreaterThan(0.03);
      // … et rien ne dépasse à sa gauche : la bande à gauche du rectangle est vide.
      const leftBand = await brightness(png, "image/jpeg", { x: 0, y: iban.y, w: iban.x, h: iban.h });
      expect(leftBand.darkShare).toBe(0);
      // Une fois masqué, tout le numéro est noir.
      const hidden = await found({ b64: ARABIC_PDF_B64, hide: true });
      const after = await pageJpeg(Uint8Array.from(Buffer.from(hidden.outB64, "base64")), 0);
      for (const m of res.matches) expect((await brightness(after, "image/jpeg", inset(m.rects[0], 0.02))).max).toBeLessThan(40);
    },
    60_000
  );
});

describe("sans texte, ou verrouillé", () => {
  test(
    "photo : aucune ligne, « pas de texte », rien à suggérer",
    async () => {
      const res = await found({ b64: toBase64(makeNoisePng(200, 150)), name: "photo.png", type: "image/png" });
      expect(res.hadLines).toBe(false);
      expect(res.hasText).toBe(false);
      expect(res.matches).toEqual([]);
    },
    60_000
  );

  test(
    "PDF chiffré : pas de suggestion sans mot de passe, les mêmes règles une fois déverrouillé",
    async () => {
      const locked = await suggest({ b64: ENCRYPTED_PDF_B64 });
      expect(locked).toEqual({ ok: false, error: "pdf_password" });
      const res = await found({ b64: ENCRYPTED_PDF_B64, password: ENCRYPTED_PDF_PASSWORD });
      expect(res.hadLines).toBe(true);
      expect(res.lines).toHaveLength(1);
      expect(res.matches).toEqual([]);
    },
    60_000
  );
});

describe("texte hostile : la lecture est bornée", () => {
  test(
    "plus d'éléments de texte que le plafond : la lecture s'arrête, le rendu aboutit quand même",
    async () => {
      // Le plafond réel est de 200 000 éléments par document ; on l'abaisse ici
      // pour ne pas fabriquer un PDF de cette taille (lib/text-extract.test.ts
      // couvre les valeurs par défaut).
      const pdf = await makeManyItemsPdf(3000);
      const res = await engine.page.evaluate(async (b64) => {
        const wm = (window as any).__wm;
        const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        const file = new File([bytes], "items.pdf", { type: "application/pdf" });
        const full = await wm.watermarkFile(file, "", undefined, undefined, undefined, undefined, { extractText: true });
        const chars = full.lines.flat().reduce((n: number, l: any) => n + l.text.replace(/ /g, "").length, 0);
        const out = { pageCount: full.pageCount, incomplete: full.linesIncomplete, chars, boxesMatch: full.lines.flat().every((l: any) => l.boxes.length === l.text.length) };
        wm.releaseResult(full);
        return out;
      }, toBase64(pdf));
      expect(res.pageCount).toBe(1);
      expect(res.incomplete).toBe(false);
      expect(res.chars).toBe(3000);
      expect(res.boxesMatch).toBe(true);
    },
    120_000
  );
});

describe("coût de la lecture du texte", () => {
  test(
    "500 pages de texte : le rendu avec extractText ne coûte pas plus de 10 % de plus",
    async () => {
      const pdf = await makeTextHeavyPdf(500);
      const times = await engine.page.evaluate(async (b64) => {
        const wm = (window as any).__wm;
        const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        const file = new File([bytes], "long.pdf", { type: "application/pdf" });
        const run = async (extractText: boolean) => {
          const t0 = performance.now();
          const r = await wm.watermarkFile(file, "COPIE", undefined, undefined, undefined, undefined, { extractText, layoutSeed: 1 });
          const ms = performance.now() - t0;
          const lines = r.lines ? r.lines.reduce((n: number, p: unknown[]) => n + p.length, 0) : 0;
          wm.releaseResult(r);
          return { ms, lines, pages: r.pageCount };
        };
        // Passes alternées, la première pour chauffer (polices, compilation) ;
        // le meilleur temps de chaque sorte écarte le bruit de la machine.
        await run(false);
        const without: number[] = [];
        const withText: number[] = [];
        let lines = 0;
        for (let i = 0; i < 2; i++) {
          without.push((await run(false)).ms);
          const r = await run(true);
          withText.push(r.ms);
          lines = r.lines;
        }
        return { without: Math.min(...without), withText: Math.min(...withText), lines };
      }, toBase64(pdf));
      const ratio = times.withText / times.without;
      console.log(
        `[suggest.seam] 500 pages : ${Math.round(times.without)} ms sans texte, ${Math.round(times.withText)} ms avec (× ${ratio.toFixed(3)}), ${times.lines} lignes lues`
      );
      expect(times.lines).toBe(500 * 30);
      expect(ratio).toBeLessThanOrEqual(1.1);
    },
    600_000
  );
});
