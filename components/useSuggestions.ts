"use client";

// Suggestions de masquage, côté page (CoreProduct) : ce que l'aperçu (Kiosk)
// ne peut pas faire seul parce que cela touche d'autres documents du lot ou
// l'état d'un document. Indépendant du mode de l'outil (filigrane, signature…) :
// tout ce qui affiche l'éditeur de masques peut s'en servir.
//
// docs/prd-suggested-areas.md §5.4.

import { useCallback, useMemo, type Dispatch, type SetStateAction } from "react";
import type { Doc } from "@/lib/doc";
import { hideAll, openMatches, showAll } from "@/lib/suggestions";

/** Ce que l'aperçu reçoit pour les suggestions du document affiché. */
export type KioskSuggest = {
  /** Autres documents du lot qui ont encore des suggestions à traiter. */
  others: number;
  /** Masque toutes les suggestions des autres documents ; rend de quoi l'annuler. */
  onHideOthers: () => () => void;
  /** Écarte une suggestion du document affiché (« Pas celui-ci »). Oublié à la fermeture de l'onglet. */
  onDismiss: (match: number) => void;
};

export function useSuggestions(
  docs: Doc[],
  setDocs: Dispatch<SetStateAction<Doc[]>>,
  shownId: string | undefined
): KioskSuggest {
  const others = useMemo(
    () => docs.filter((d) => d.id !== shownId && openMatches(d.suggestions, d.dismissed, d.masks).length > 0).length,
    [docs, shownId]
  );

  const onHideOthers = useCallback(() => {
    // Ce qui a été ajouté à chaque document, pour pouvoir le retirer tel quel.
    const added = new Map<string, number[]>();
    setDocs((prev) =>
      prev.map((d) => {
        if (d.id === shownId || !d.suggestions) return d;
        const all = hideAll(d.masks, d.suggestions, d.dismissed);
        if (!all.added.length) return d;
        added.set(d.id, all.added);
        return { ...d, masks: all.masks };
      })
    );
    return () =>
      setDocs((prev) =>
        prev.map((d) => {
          const mine = added.get(d.id);
          return mine && d.suggestions ? { ...d, masks: showAll(d.masks, d.suggestions, mine) } : d;
        })
      );
  }, [setDocs, shownId]);

  const onDismiss = useCallback(
    (match: number) =>
      setDocs((prev) => prev.map((d) => (d.id === shownId ? { ...d, dismissed: new Set(d.dismissed).add(match) } : d))),
    [setDocs, shownId]
  );

  return useMemo(() => ({ others, onHideOthers, onDismiss }), [others, onHideOthers, onDismiss]);
}
