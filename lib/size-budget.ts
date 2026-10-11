// Taille cible des fichiers produits : beaucoup de portails refusent au-delà
// de 2, 5 ou 10 Mo. Le moteur réduit d'abord la qualité JPEG, puis la
// résolution, jusqu'à tenir dans le budget de chaque page.

export const SIZE_TARGETS_MB = [0, 1, 2, 5, 10] as const;
export type SizeTargetMb = (typeof SIZE_TARGETS_MB)[number];

export const mbToBytes = (mb: number) => Math.round(mb * 1024 * 1024);

// Structure PDF : en-tête, catalogue, xref, et ~600 octets par page (objets
// page, image, flux de contenu). Mesuré sur des sorties pdf-lib, arrondi haut.
const PDF_BASE_OVERHEAD = 4096;
const PDF_PAGE_OVERHEAD = 600;

/** Octets disponibles pour l'image JPEG de chaque page d'un PDF de `pages` pages. */
export function pageBudget(maxBytes: number, pages: number) {
  return Math.max(4096, Math.floor((maxBytes - PDF_BASE_OVERHEAD) / Math.max(1, pages) - PDF_PAGE_OVERHEAD));
}

/** Échelle (de la résolution de rendu) puis qualité JPEG, du plus fidèle au plus compact. */
export const ENCODE_LADDER: readonly { scale: number; quality: number }[] = [1, 0.75, 0.55, 0.4].flatMap(
  (scale) => [0.85, 0.65, 0.45].map((quality) => ({ scale, quality }))
);

/**
 * Part d'un budget global revenant à un document, proportionnelle à son
 * nombre de pages (PDF unique assemblé sous une taille cible).
 */
export function shareOfBudget(maxBytes: number, pages: number, totalPages: number) {
  return Math.floor((maxBytes * pages) / Math.max(1, totalPages));
}
