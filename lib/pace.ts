// Travail long sur le fil principal, sans figer la page.
//
// Tout se passe dans le navigateur de l'utilisateur : dessiner un filigrane,
// redresser une photo ou détourer une signature, ce sont des millions de
// pixels à traiter là où tournent aussi la frappe, le défilement et
// l'affichage. La règle : ne jamais garder la main plus de quelques
// millisecondes d'affilée, et abandonner tout de suite un travail que
// l'utilisateur vient de rendre inutile (texte modifié, curseur déplacé).

/**
 * Rend la main à la boucle d'événements, le temps d'une tâche.
 * MessageChannel plutôt que setTimeout : pas de plancher de 4 ms (minuteries
 * imbriquées), ni de ralentissement dans un onglet en arrière-plan.
 */
export function nextTask(): Promise<void> {
  if (typeof MessageChannel === "undefined") return new Promise((resolve) => setTimeout(resolve, 0));
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port1.onmessage = () => {
      port1.close();
      resolve();
    };
    port2.postMessage(null);
  });
}

/** Durée d'une tranche de travail avant de rendre la main (une image à 60 Hz dure 16 ms). */
export const SLICE_MS = 8;

/** À appeler entre deux étapes : rend la main si la tranche est écoulée, lève « aborted » si le travail est abandonné. */
export type Pacer = () => Promise<void>;

/**
 * Cadence d'un travail découpé en étapes. `await pace()` ne coûte rien tant
 * que la tranche n'est pas écoulée ; ensuite il rend la main une fois, puis
 * vérifie que le travail est toujours voulu.
 */
export function makePacer(signal?: AbortSignal, sliceMs = SLICE_MS): Pacer {
  let since = performance.now();
  return async () => {
    if (signal?.aborted) throw new Error("aborted");
    if (performance.now() - since < sliceMs) return;
    await nextTask();
    if (signal?.aborted) throw new Error("aborted");
    since = performance.now();
  };
}

/** Lignes traitées d'un coup entre deux regards à l'horloge : assez peu pour une image de 3 000 px de large. */
const BAND_ROWS = 32;

/** Traite une image bande de lignes par bande de lignes, en rendant la main selon `pace`. */
export async function inBands(height: number, pace: Pacer, band: (from: number, to: number) => void, rows = BAND_ROWS) {
  for (let y = 0; y < height; y += rows) {
    band(y, Math.min(height, y + rows));
    await pace();
  }
}
