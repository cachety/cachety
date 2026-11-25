// La page ne se fige pas pendant qu'elle travaille.
//
// Tout le traitement a lieu sur le fil principal du navigateur, là où tournent
// aussi la frappe et l'affichage. Un rendu ne doit donc jamais garder la main
// longtemps, et un rendu devenu inutile (texte modifié) doit s'arrêter tout de
// suite. Régression visée : sous Firefox, l'ombre floutée du canevas coûtait
// 0,3 s de blocage par page, et plus de 20 s par page en mode ondulé ; la page
// se figeait à chaque frappe. Sous WebKit, l'encodage PNG d'une photo bloquait
// près de 2 s. (lib/watermark.ts, lib/pace.ts, lib/encode.ts.)
//
// Mesure : un battement toutes les 4 ms dans la page ; le plus long silence
// est le plus long blocage. Seuils larges : ils séparent « fluide » (quelques
// dizaines de ms) de « figé » (des centaines de ms, des secondes), pas plus.
//
// Fichier nommé *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { startEngine, type Engine } from "./helpers/engine";
import { makePhotoPng, makeTextPdf } from "./helpers/dossier-fixtures";

/** Plus long blocage toléré pendant un rendu (une page sans découpage en coûtait 300 à 20 000). */
const MAX_FREEZE_MS = 200;
const TEXT = "Rental application, Martin Lettings, 25/11/2026";
const WAVE = { font: "sans", scale: 0.5, color: "#c4262e", opacity: 0.4, wave: 0.5, outline: "strong" };

let engine: Engine;
const toBase64 = (bytes: Uint8Array) => Buffer.from(bytes).toString("base64");

type Run = { ok: boolean; error?: string; total: number; freeze: number; afterAbort?: number };

/** Rend un fichier dans la page en mesurant le plus long blocage ; `abortAfter` : abandonne en cours de route. */
function run(input: { b64: string; name: string; type: string; text: string; style?: unknown; options?: object; abortAfter?: number }) {
  return engine.page.evaluate(async (arg) => {
    const w = window as any;
    const bytes = Uint8Array.from(atob(arg.b64), (c) => c.charCodeAt(0));
    const file = new File([bytes], arg.name, { type: arg.type });
    let last = performance.now();
    let freeze = 0;
    const beat = setInterval(() => {
      const now = performance.now();
      if (now - last > freeze) freeze = now - last;
      last = now;
    }, 4);
    await new Promise((r) => setTimeout(r, 60));
    freeze = 0;
    last = performance.now();
    const stale = new AbortController();
    let abortedAt = 0;
    if (arg.abortAfter !== undefined)
      setTimeout(() => {
        abortedAt = performance.now();
        stale.abort();
      }, arg.abortAfter);
    const started = performance.now();
    let ok = true;
    let error: string | undefined;
    try {
      const res = await w.__wm.watermarkFile(file, arg.text, undefined, undefined, stale.signal, arg.style, arg.options ?? {});
      w.__wm.releaseResult(res);
    } catch (e) {
      ok = false;
      error = e instanceof Error ? e.message : String(e);
    }
    const ended = performance.now();
    await new Promise((r) => setTimeout(r, 40));
    clearInterval(beat);
    return { ok, error, total: ended - started, freeze, afterAbort: abortedAt ? ended - abortedAt : undefined };
  }, input) as Promise<Run>;
}

beforeAll(async () => {
  engine = await startEngine();
  // Mise en route (chargement de pdf.js, des polices, essai de l'encodeur) hors mesure.
  await run({ b64: toBase64(await makeTextPdf(1, 70)), name: "warm.pdf", type: "application/pdf", text: TEXT });
}, 120_000);

afterAll(async () => {
  await engine?.stop();
});

describe("un rendu ne fige pas la page", () => {
  test(
    "PDF de texte de 5 pages, apparence par défaut puis ondulée : aucun blocage long",
    async () => {
      const b64 = toBase64(await makeTextPdf(5, 70));
      for (const style of [undefined, WAVE]) {
        const r = await run({ b64, name: "bulletins.pdf", type: "application/pdf", text: TEXT, style });
        expect(r.ok, r.error).toBe(true);
        expect(r.freeze, `style ${style ? "ondulé" : "par défaut"} : ${Math.round(r.freeze)} ms`).toBeLessThan(MAX_FREEZE_MS);
        // Le mode ondulé prenait plus de 100 s sous Firefox pour ces cinq pages.
        expect(r.total).toBeLessThan(20_000);
      }
    },
    180_000
  );

  test(
    "photo de 2 400 × 1 800 px, filigranée puis en page de dossier : aucun blocage long",
    async () => {
      const b64 = toBase64(makePhotoPng(2400, 1800));
      // Deux fois : le second rendu profite de ce que le premier a appris de l'encodeur.
      for (let i = 0; i < 2; i++) {
        const r = await run({ b64, name: "photo.png", type: "image/png", text: TEXT });
        expect(r.ok, r.error).toBe(true);
        // Décoder et copier une photo entière reste une opération d'un seul tenant du navigateur.
        expect(r.freeze, `rendu ${i + 1} : ${Math.round(r.freeze)} ms`).toBeLessThan(500);
      }
      const page = await run({
        b64,
        name: "photo.png",
        type: "image/png",
        text: "",
        options: { forcePdf: true, photoPage: true, thumbnails: 320, edits: { 0: { clean: { whiten: true, gray: true } } } },
      });
      expect(page.ok, page.error).toBe(true);
      expect(page.freeze, `page de dossier : ${Math.round(page.freeze)} ms`).toBeLessThan(500);
    },
    180_000
  );

  test(
    "un rendu abandonné en cours de route s'arrête tout de suite",
    async () => {
      const b64 = toBase64(await makeTextPdf(30, 70));
      const r = await run({ b64, name: "long.pdf", type: "application/pdf", text: TEXT, style: WAVE, abortAfter: 150 });
      expect(r.ok).toBe(false);
      expect(r.error).toBe("aborted");
      // Sans découpage, il fallait attendre la fin de la page en cours.
      expect(r.afterAbort!, `arrêt en ${Math.round(r.afterAbort!)} ms`).toBeLessThan(150);
      expect(r.freeze).toBeLessThan(MAX_FREEZE_MS);
    },
    120_000
  );
});
