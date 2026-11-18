// Lecture de la couche texte d'un PDF pendant son rendu (lib/watermark.ts,
// option `extractText`) : page.streamTextContent() de pdf.js, le code déjà
// chargé pour dessiner la page. Aucun nouveau décodeur, aucune requête.
//
// Le texte lu ne sert qu'aux suggestions de masquage : il reste en mémoire,
// n'est ni enregistré ni envoyé (docs/security.md §1, §4.4 quinquies).
//
// docs/prd-suggested-areas.md §6.2 et §6.6.

import { linesFromItems, type Line, type TextItemLike, type TextStyleLike, type ViewportLike } from "@/lib/text-lines";

// Plafonds par document : un PDF forgé (des millions d'éléments de texte) ne
// doit ni saturer la mémoire ni bloquer l'onglet. Au-delà, la lecture
// s'arrête et les suggestions sont signalées comme incomplètes.
export const MAX_TEXT_ITEMS = 200_000;
export const MAX_TEXT_CHARS = 2_000_000;

type TextChunk = { items?: unknown[]; styles?: Record<string, TextStyleLike> };
/** Ce que l'on utilise d'une page pdf.js (PDFPageProxy). */
export type TextPageLike = { streamTextContent(): ReadableStream<TextChunk> };

export type TextCollector = {
  /** Lignes de chaque page lue, dans l'ordre des pages (index 0). */
  readonly lines: Line[][];
  /** Lecture arrêtée avant la fin (plafond atteint) ou page illisible. */
  readonly incomplete: boolean;
  /** Lit le texte d'une page. Ne rejette jamais : une page illisible compte pour vide. */
  add(page: TextPageLike, viewport: ViewportLike): Promise<void>;
};

export function textCollector(maxItems = MAX_TEXT_ITEMS, maxChars = MAX_TEXT_CHARS): TextCollector {
  const lines: Line[][] = [];
  let incomplete = false;
  let stopped = false;
  let itemCount = 0;
  let charCount = 0;

  return {
    lines,
    get incomplete() {
      return incomplete;
    },
    async add(page, viewport) {
      if (stopped) {
        lines.push([]);
        return;
      }
      const items: TextItemLike[] = [];
      const styles: Record<string, TextStyleLike> = {};
      try {
        // Par morceaux (une centaine d'éléments) plutôt que getTextContent() :
        // le plafond s'applique en cours de lecture, sans attendre la page entière.
        const reader = page.streamTextContent().getReader();
        try {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            Object.assign(styles, value?.styles);
            for (const item of value?.items ?? []) {
              const str = (item as TextItemLike | null)?.str;
              if (typeof str !== "string") continue;
              itemCount++;
              charCount += str.length;
              if (itemCount > maxItems || charCount > maxChars) {
                stopped = true;
                break;
              }
              items.push(item as TextItemLike);
            }
            if (stopped) break;
          }
        } finally {
          // Lecture interrompue : le worker cesse de produire le texte de la page.
          if (stopped) await reader.cancel().catch(() => {});
          else reader.releaseLock();
        }
      } catch {
        incomplete = true;
      }
      if (stopped) incomplete = true;
      let pageLines: Line[] = [];
      try {
        pageLines = linesFromItems(items, viewport, styles);
      } catch {
        incomplete = true;
      }
      lines.push(pageLines);
    },
  };
}
