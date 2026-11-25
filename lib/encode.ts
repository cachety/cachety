// Encoder un canevas en JPEG ou en PNG sans figer la page.
//
// Chromium et Firefox encodent en arrière-plan : `toBlob` rend la main tout
// de suite. WebKit (Safari) encode dans l'appel lui-même, sur le fil
// principal : un PNG de 3 000 × 2 250 px le bloquait 1,9 s (WebKit de
// Playwright, 2026-11-25), à chaque rendu d'une photo, donc à chaque pause
// dans la frappe du texte du filigrane.
//
// On ne devine pas le navigateur : on le mesure. Avant le premier encodage, un
// petit canevas d'essai est encodé : si l'appel retient le fil principal
// (quelques dizaines de millisecondes au plus, une seule fois), tous les
// encodages passent par un worker (le canevas y est copié en bitmap, puis
// encodé hors du fil principal). Un vrai encodage qui retient le fil
// principal fait basculer de la même façon. Le worker est créé depuis un blob : la CSP l'autorise
// (`worker-src 'self' blob:`), et aucun fichier n'est ajouté au site. Le
// moindre échec (worker refusé, API absente, erreur d'encodage) ramène
// définitivement à l'encodage ordinaire.

type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;

/** Au-delà, l'appel à `toBlob` a fait l'encodage lui-même. */
const BLOCKING_MS = 30;
/** Côté du canevas d'essai, et durée au-delà de laquelle son encodage s'est fait dans l'appel. */
const TRIAL_SIDE = 512;
const TRIAL_MS = 6;

const WORKER_SOURCE = `
self.onmessage = async (e) => {
  const { id, bitmap, type, quality } = e.data;
  try {
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d");
    // « copy » : les pixels du bitmap tels quels, transparence comprise.
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
    const blob = await canvas.convertToBlob({ type, quality });
    self.postMessage({ id, blob });
  } catch (err) {
    self.postMessage({ id, error: String(err) });
  }
};
`;

let blocking = false;
/** undefined : pas encore créé ; null : indisponible, pour toute la session. */
let worker: Worker | null | undefined;
let sequence = 0;
const waiting = new Map<number, { resolve: (blob: Blob) => void; reject: (reason: Error) => void }>();

function giveUp(reason: string) {
  worker?.terminate();
  worker = null;
  for (const job of waiting.values()) job.reject(new Error(reason));
  waiting.clear();
}

function encoder(): Worker | null {
  if (worker !== undefined) return worker;
  if (typeof Worker === "undefined" || typeof OffscreenCanvas === "undefined" || typeof createImageBitmap !== "function") {
    return (worker = null);
  }
  try {
    const url = URL.createObjectURL(new Blob([WORKER_SOURCE], { type: "text/javascript" }));
    const created = new Worker(url);
    URL.revokeObjectURL(url);
    created.onmessage = (e: MessageEvent<{ id: number; blob?: Blob; error?: string }>) => {
      const job = waiting.get(e.data.id);
      if (!job) return;
      waiting.delete(e.data.id);
      if (e.data.blob) job.resolve(e.data.blob);
      else job.reject(new Error(e.data.error ?? "export_failed"));
    };
    created.onerror = () => giveUp("encode_worker_failed");
    created.onmessageerror = () => giveUp("encode_worker_failed");
    return (worker = created);
  } catch {
    return (worker = null);
  }
}

async function inWorker(target: Worker, canvas: AnyCanvas, type: string, quality?: number): Promise<Blob> {
  const bitmap = await createImageBitmap(canvas);
  const id = ++sequence;
  return new Promise<Blob>((resolve, reject) => {
    waiting.set(id, { resolve, reject });
    try {
      target.postMessage({ id, bitmap, type, quality }, [bitmap]);
    } catch (e) {
      waiting.delete(id);
      bitmap.close();
      reject(e instanceof Error ? e : new Error(String(e)));
    }
  });
}

function onMainThread(canvas: AnyCanvas, type: string, quality?: number): Promise<Blob> {
  const started = performance.now();
  const result =
    "convertToBlob" in canvas
      ? canvas.convertToBlob({ type, quality })
      : new Promise<Blob>((resolve, reject) =>
          canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("export_failed"))), type, quality)
        );
  // L'appel vient de rendre la main : s'il a duré, c'est que l'encodage s'est fait dedans.
  if (performance.now() - started > BLOCKING_MS) blocking = true;
  return result;
}

let trial: Promise<void> | undefined;

/**
 * Essai, une fois par session : un PNG de 512 px rempli de bruit (rien à
 * comprimer, donc un encodage qui prend un temps mesurable). Un navigateur qui
 * encode en arrière-plan rend la main en moins d'une milliseconde.
 */
function tryOnce(): Promise<void> {
  return (trial ??= (async () => {
    if (typeof document === "undefined") return;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = TRIAL_SIDE;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const noise = ctx.createImageData(TRIAL_SIDE, TRIAL_SIDE);
      let x = 0x2545f491;
      for (let i = 0; i < noise.data.length; i++) {
        x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
        noise.data[i] = i % 4 === 3 ? 255 : x >>> 24;
      }
      ctx.putImageData(noise, 0, 0);
      const started = performance.now();
      const done = new Promise<void>((resolve) => canvas.toBlob(() => resolve(), "image/png"));
      if (performance.now() - started > TRIAL_MS) blocking = true;
      await done;
      canvas.width = 0;
    } catch {
      // Essai impossible : le premier vrai encodage tranchera.
    }
  })());
}

/**
 * Le canevas encodé en `type` (« image/jpeg », « image/png »). Même résultat
 * que `canvas.toBlob`, sans retenir le fil principal quand le navigateur
 * encode sur celui-ci.
 */
export async function encodeCanvas(canvas: AnyCanvas, type: string, quality?: number): Promise<Blob> {
  await tryOnce();
  if (blocking) {
    const target = encoder();
    if (target) {
      try {
        const blob = await inWorker(target, canvas, type, quality);
        // Type refusé par le worker (repli sur PNG) : on ne rend pas autre chose que demandé.
        if (blob.size > 0 && blob.type === type) return blob;
        giveUp("encode_worker_mismatch");
      } catch {
        if (worker) giveUp("encode_worker_failed");
      }
    }
  }
  return onMainThread(canvas, type, quality);
}

/** Pour les tests : l'encodage passe-t-il par le worker ? */
export const encodingOffThread = () => blocking && !!worker;
