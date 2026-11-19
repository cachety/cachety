import type { SensitiveKind } from "@/lib/sensitive";

/**
 * Textes des suggestions de masquage (`t.suggest`). Clés et textes français
 * et anglais : docs/prd-suggested-areas.md §10. Les libellés de détection
 * (« numéro fiscal », « NIK »…) sont des données de lib/sensitive.ts, pas des
 * textes d'interface.
 */
export type SuggestCopy = {
  /** Bandeau au-dessus de l'aperçu : « Nous avons trouvé 3 numéros… ». */
  banner: (n: number) => string;
  review: string;
  title: string;
  hideAll: string;
  hideAllDocs: string;
  /** Sur une suggestion pas encore masquée. */
  hide: string;
  hidden: string;
  undo: string;
  /** Écarter une suggestion (bouton ×). */
  dismiss: string;
  onPage: (p: number) => string;
  notShown: string;
  /** Seconde phrase du message « aperçu limité aux N premières pages ». */
  coverAll: string;
  /** Après « Tout masquer » : nombre de zones, liste des pages déjà mise en forme, nombre de pages. */
  doneAll: (n: number, pages: string, pageCount: number) => string;
  none: string;
  noText: string;
  incomplete: string;
  /** Toujours affiché avec les suggestions (docs/security.md, T12) : elles peuvent en oublier. */
  footer: string;
  note: { frTax: string; iban: string };
  kinds: Record<SensitiveKind, string>;
  /** Annonce aux lecteurs d'écran : « IBAN, page 2 : masqué ». */
  announce: (label: string, page: number, hidden: boolean) => string;
};
