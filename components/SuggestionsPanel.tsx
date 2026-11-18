"use client";

// Suggestions de masquage : le bandeau au-dessus de l'aperçu (« Nous avons
// trouvé 3 numéros… ») et le panneau du mode « Masquer quelque chose ».
//
// Le panneau est le chemin accessible : une liste de boutons à bascule
// (aria-pressed), un par numéro repéré, groupés par page. Rien n'est masqué
// sans un geste de la personne, et le pied du panneau rappelle toujours que
// les suggestions peuvent en oublier (docs/security.md, T12).
//
// Seule la forme masquée du numéro (« FR76 •••• •••• 0189 ») est affichée.
//
// docs/prd-suggested-areas.md §5.

import { useT } from "@/lib/i18n";
import { CheckIcon, CloseIcon } from "@/components/icons";
import type { PageMasks } from "@/lib/masks";
import type { Match } from "@/lib/sensitive";
import { isHidden, openMatches, shownMatches, type PageSuggestions } from "@/lib/suggestions";

/** Au-delà, la liste défile dans une zone bornée et le navigateur ne dessine que les lignes visibles. */
const VIRTUALISE_FROM = 200;
/** Pages citées dans « 3 zones masquées (pages 1, 2 et 14) » ; au-delà, la liste est abrégée. */
const PAGES_LISTED = 8;

/** « 1, 2 et 14 », dans la langue de l'interface. */
export function formatPages(pages: number[], locale: string): string {
  const shown = pages.slice(0, PAGES_LISTED).map(String);
  if (pages.length > PAGES_LISTED) return `${shown.join(", ")}…`;
  try {
    return new Intl.ListFormat(locale, { style: "long", type: "conjunction" }).format(shown);
  } catch {
    return shown.join(", ");
  }
}

export function SuggestionsBanner({
  count,
  disabled,
  onReview,
}: {
  /** Suggestions encore à traiter sur ce document. */
  count: number;
  /** Nouveau rendu en cours : l'aperçu affiché n'est pas à jour. */
  disabled?: boolean;
  onReview: () => void;
}) {
  const c = useT().suggest;
  return (
    <div
      role="status"
      data-testid="suggestions-banner"
      className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl border border-bleu/30 bg-bleu/5 px-4 py-2.5 text-sm text-encre"
    >
      <span className="font-semibold">{c.banner(count)}</span>
      <button
        type="button"
        onClick={onReview}
        disabled={disabled}
        className="min-h-9 rounded-lg bg-bleu px-4 py-1.5 font-semibold text-white transition-colors hover:bg-bleu/90 disabled:opacity-50"
      >
        {c.review}
      </button>
    </div>
  );
}

export type BulkDone = {
  /** Suggestions masquées par le dernier « Tout masquer ». */
  count: number;
  /** Leurs pages (numérotées à partir de 1). */
  pages: number[];
};

export function SuggestionsPanel({
  suggestions: s,
  dismissed,
  masks,
  previewPages,
  onToggle,
  onDismiss,
  onHideAll,
  onHideAllDocs,
  bulk,
  onUndoBulk,
  announcement,
}: {
  suggestions: PageSuggestions;
  dismissed?: ReadonlySet<number>;
  /** Masques en cours (ceux du mode tracé, pas encore appliqués, compris). */
  masks: PageMasks | undefined;
  /** Pages (index 0) visibles dans l'aperçu ; les autres vont sous « Pages non affichées ». */
  previewPages: readonly number[];
  onToggle: (match: number) => void;
  onDismiss: (match: number) => void;
  onHideAll: () => void;
  /** Présent quand d'autres documents du lot ont aussi des suggestions. */
  onHideAllDocs?: () => void;
  bulk?: BulkDone | null;
  onUndoBulk: () => void;
  /** Dernière bascule, pour les lecteurs d'écran (« IBAN, page 2 : masqué »). */
  announcement: string;
}) {
  const t = useT();
  const c = t.suggest;
  const shown = shownMatches(s, dismissed);
  const open = openMatches(s, dismissed, masks);
  const previewed = new Set(previewPages);

  // Groupes : une page de l'aperçu par groupe, puis toutes les autres pages ensemble.
  const groups: { key: string; title: string; items: number[]; beyond: boolean }[] = [];
  const beyond: number[] = [];
  for (const i of shown) {
    const page = s.matches[i].page;
    if (!previewed.has(page)) {
      beyond.push(i);
      continue;
    }
    const last = groups[groups.length - 1];
    if (last && last.key === `p${page}`) last.items.push(i);
    else groups.push({ key: `p${page}`, title: c.onPage(page + 1), items: [i], beyond: false });
  }
  if (beyond.length) groups.push({ key: "beyond", title: c.notShown, items: beyond, beyond: true });

  const note = (m: Match) =>
    m.kind === "iban" ? c.note.iban : m.kind === "fr-tax" || m.kind === "fr-tax-ref" ? c.note.frTax : null;
  const long = shown.length > VIRTUALISE_FROM;

  return (
    <section
      aria-labelledby="suggestions-title"
      data-testid="suggestions-panel"
      className="mt-3 rounded-xl border border-trait bg-white p-3 text-sm text-encre xl:mt-0"
    >
      <h3 id="suggestions-title" className="font-semibold">
        {c.title}
      </h3>

      {!s.hasText ? (
        <p className="mt-2 text-encre-2">{c.noText}</p>
      ) : shown.length === 0 ? (
        <p className="mt-2 text-encre-2">{c.none}</p>
      ) : (
        <>
          <div className="mt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={onHideAll}
              disabled={open.length === 0}
              className="min-h-10 rounded-lg bg-encre px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-encre/90 disabled:opacity-40"
            >
              {c.hideAll}
            </button>
            {onHideAllDocs && (
              <button
                type="button"
                onClick={onHideAllDocs}
                className="min-h-10 rounded-lg border border-trait bg-white px-3 py-2 text-sm font-semibold text-encre transition-colors hover:border-bleu hover:text-bleu"
              >
                {c.hideAllDocs}
              </button>
            )}
          </div>
          {bulk && bulk.count > 0 && (
            <p role="status" data-testid="suggestions-done" className="mt-2 rounded-lg bg-green-700/10 px-3 py-2 text-green-900">
              {c.doneAll(bulk.count, formatPages(bulk.pages, t.locale), bulk.pages.length)}{" "}
              <button type="button" onClick={onUndoBulk} className="font-semibold underline underline-offset-2 hover:no-underline">
                {c.undo}
              </button>
            </p>
          )}

          <div className={`mt-3 flex flex-col gap-3 ${long ? "max-h-[60vh] overflow-y-auto overscroll-contain pe-1" : ""}`}>
            {groups.map((group) => (
              <div key={group.key} role="group" aria-label={group.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-encre-2">{group.title}</h4>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {group.items.map((i) => {
                    const m = s.matches[i];
                    const label = c.kinds[m.kind];
                    const hidden = isHidden(s, i, masks);
                    const hint = note(m);
                    return (
                      <li
                        key={i}
                        className={`flex items-stretch gap-1 ${long ? "[contain-intrinsic-size:auto_4.5rem] [content-visibility:auto]" : ""}`}
                      >
                        <button
                          type="button"
                          aria-pressed={hidden}
                          onClick={() => onToggle(i)}
                          className={`min-w-0 flex-1 rounded-lg border px-3 py-2 text-start transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu ${
                            hidden ? "border-encre bg-encre/5" : "border-trait bg-feuille hover:border-bleu"
                          }`}
                        >
                          <span className="block font-medium">{label}</span>
                          <span className="block text-xs text-encre-2">
                            {group.beyond && <span>{c.onPage(m.page + 1)} · </span>}
                            {/* Numéro partiellement masqué : toujours écrit de gauche à droite. */}
                            <span dir="ltr" className="inline-block font-mono">
                              {m.masked}
                            </span>
                          </span>
                          {hint && <span className="mt-1 block text-xs text-encre-2">{hint}</span>}
                          <span className="mt-1 flex flex-wrap items-center gap-x-2 text-xs font-semibold">
                            {hidden ? (
                              <>
                                <span className="inline-flex items-center gap-1 text-green-800">
                                  {c.hidden}
                                  <CheckIcon className="h-3.5 w-3.5" />
                                </span>
                                <span className="text-bleu underline underline-offset-2">{c.undo}</span>
                              </>
                            ) : (
                              <span className="text-bleu">{c.hide}</span>
                            )}
                          </span>
                        </button>
                        {!hidden && (
                          <button
                            type="button"
                            title={c.dismiss}
                            aria-label={`${c.dismiss} (${label}, ${m.masked})`}
                            onClick={() => onDismiss(i)}
                            className="flex w-9 shrink-0 items-center justify-center rounded-lg border border-trait bg-white text-encre-2 transition-colors hover:border-sceau hover:text-sceau focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
                          >
                            <CloseIcon className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}

      {s.incomplete && <p className="mt-3 rounded-lg bg-amber-500/10 px-3 py-2 text-amber-900">{c.incomplete}</p>}
      {/* Toujours là dès que le texte a été lu : ne rien trouver ne veut pas dire qu'il n'y a rien. */}
      {s.hasText && (
        <p data-testid="suggestions-footer" className="mt-3 border-t border-trait pt-2 text-xs text-encre-2">
          {c.footer}
        </p>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
