// Encoder un canevas en JPEG ou en PNG : le seul point de passage.
//
// Chromium et Firefox encodent en arrière-plan : `toBlob` rend la main tout
// de suite. WebKit (Safari) encode dans l'appel lui-même, sur le fil
// principal : un PNG de 3 000 × 2 250 px le bloquait 1,9 s (WebKit de
// Playwright sous Linux, 2026-11-25).
//
// NE PAS déplacer l'encodage dans un worker (OffscreenCanvas +
// `convertToBlob`). Essayé le 2026-11-25 (v1.2.1, jamais mis en ligne) : sous
// WebKit, la page se bloquait pour de bon dans le scénario « six PDF à signer,
// signature retapée pendant le lot » : deux séries d'essais arrêtées par un
// blocage, l'une avant le 40e essai, l'autre au 16e. Dernier
// appel de la page avant le blocage : une page copiée en bitmap et postée au
// worker d'encodage, pendant que le worker de pdf.js travaillait. Ensuite le
// fil principal ne répondait plus du tout (ni frappe, ni minuterie) : aucune
// garde côté page ne peut rattraper cela. Un blocage de 2 s vaut mieux qu'un
// onglet perdu. Sans le worker : 0 blocage sur 100 dans le même scénario.

type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;

/** Le canevas encodé en `type` (« image/jpeg », « image/png »). */
export function encodeCanvas(canvas: AnyCanvas, type: string, quality?: number): Promise<Blob> {
  return "convertToBlob" in canvas
    ? canvas.convertToBlob({ type, quality })
    : new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("export_failed"))), type, quality)
      );
}
