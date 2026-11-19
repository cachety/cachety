"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { signaturePage, type Doc } from "@/lib/doc";
import { ChevronIcon, CloseIcon } from "@/components/icons";
import { MaskEditor } from "@/components/MaskEditor";
import { SignatureEditor } from "@/components/SignatureEditor";
import { masksKey, setPageMasks, type PageMasks } from "@/lib/masks";
import type { OverlayRect } from "@/lib/overlays";
import { SuggestionsBanner, SuggestionsPanel } from "@/components/SuggestionsPanel";
import type { KioskSuggest } from "@/components/useSuggestions";
import { hideAll, hideMatch, isHidden, openMatches, pagesOf, rectsOf, showAll, showMatch, shownMatches } from "@/lib/suggestions";

/** Mode « signer » : placement de la signature sur l'aperçu. */
export type KioskSigning = {
  /** Rapport largeur / hauteur de l'image de la signature. */
  sigAspect: number;
  bitmap: ImageBitmap | null;
  /** Signature posée sur `page` (index 0 dans le document), ou retirée (null). */
  onPlace: (page: number, rect: OverlayRect | null) => void;
  onReset: () => void;
};

export function Kiosk({
  doc,
  onMasks,
  maskEditing,
  onMaskEditing,
  updating = false,
  signing,
  children,
  suggest,
  kept,
  previewAlt,
}: {
  doc: Doc;
  onMasks: (masks: PageMasks) => void;
  /** Mode tracé des masques, piloté par le bouton « Masquer quelque chose ». */
  maskEditing: boolean;
  onMaskEditing: (on: boolean) => void;
  /** Nouveau rendu en cours : l'aperçu affiché est le précédent. */
  updating?: boolean;
  /** Mode « signer » : l'aperçu devient l'éditeur de placement. */
  signing?: KioskSigning;
  /** Outils sous l'aperçu (masquer, ajuster) et leurs panneaux. */
  children?: React.ReactNode;
  /** Suggestions de masquage : ce qui dépasse ce document (autres documents du lot, suggestion écartée). */
  suggest?: KioskSuggest;
  /**
   * Mode « dossier » : pages de ce document gardées dans le fichier (index
   * dans le document), dans l'ordre où elles y paraîtront. L'aperçu ne montre
   * qu'elles, dans cet ordre : une page retirée n'est pas dans le fichier.
   */
  kept?: readonly number[];
  /** Texte de remplacement de l'aperçu, quand ce n'est ni une page filigranée ni une page signée. */
  previewAlt?: (name: string, page: number) => string;
}) {
  const t = useT();
  const result = doc.result!;
  // Page du document de chaque aperçu rendu : en mode « signer », les 11
  // premières et la dernière (là où l'on signe), pas seulement les 12 premières.
  const renderedPage = (i: number) => result.previewPageIndexes?.[i] ?? i;
  // Aperçus affichés, dans l'ordre : tous, ou (mode « dossier ») ceux des pages gardées.
  const slots = useMemo(() => {
    const rendered = result.previews.map((_, i) => result.previewPageIndexes?.[i] ?? i);
    if (!kept) return rendered.map((_, i) => i);
    return kept.map((p) => rendered.indexOf(p)).filter((i) => i >= 0);
  }, [result.previews, result.previewPageIndexes, kept]);
  const shownPages = slots.length;
  const pageAt = (i: number) => renderedPage(slots[i]);
  const sigPage = signing ? signaturePage(doc.overlays) : null;
  const previewOf = (p: number | null) => {
    if (p === null) return -1;
    const i = (result.previewPageIndexes ?? []).indexOf(p);
    return i >= 0 ? slots.indexOf(i) : -1;
  };
  // Mode « signer » : on ouvre sur la page signée (la dernière, par défaut).
  const [page, setPage] = useState(() => {
    if (!signing) return 0;
    const i = previewOf(sigPage);
    return i >= 0 ? i : shownPages - 1;
  });
  // La signature change de page (« remettre à sa place ») : l'aperçu la suit.
  useEffect(() => {
    const i = previewOf(sigPage);
    if (i >= 0) setPage(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sigPage]);
  const current = Math.min(page, shownPages - 1);
  const pageIndex = pageAt(current);
  const src = result.previews[slots[current]];
  const zoomRef = useRef<HTMLDialogElement>(null);
  const alt = (p: number) => (previewAlt ?? (signing ? t.sign.previewAlt : t.previewAlt))(doc.file.name, p);

  // Pages non prévisualisées entre deux aperçus (mode « signer » : 12 à N−1).
  const gapAfter = (i: number) =>
    i + 1 < shownPages && pageAt(i + 1) - pageAt(i) > 1 ? t.sign.place.gap(pageAt(i) + 2, pageAt(i + 1)) : null;
  const gap = gapAfter(current) ?? (current > 0 ? gapAfter(current - 1) : null);
  const firstGap = Array.from({ length: shownPages }, (_, i) => gapAfter(i)).find(Boolean) ?? null;
  const isLast = !!signing && result.pageCount > 1 && pageIndex === result.pageCount - 1;

  // Suggestions de masquage (docs/prd-suggested-areas.md §5). En mode tracé,
  // les masques du document sont travaillés sur une copie (`pending`), toutes
  // pages confondues : accepter une suggestion l'y ajoute, « Terminé »
  // applique le tout en un seul re-rendu, « Annuler » n'applique rien.
  const s = doc.suggestions;
  // Une page retirée du dossier n'est pas dans le fichier : rien à y suggérer.
  const dismissed = useMemo(() => {
    if (!kept || !s) return doc.dismissed;
    const keptPages = new Set(kept);
    const gone = s.matches.flatMap((m, i) => (keptPages.has(m.page) ? [] : [i]));
    return gone.length ? new Set([...(doc.dismissed ?? []), ...gone]) : doc.dismissed;
  }, [kept, s, doc.dismissed]);
  const [pending, setPending] = useState<PageMasks | null>(null);
  const [bulk, setBulk] = useState<{ added: number[]; undoOthers?: () => void } | null>(null);
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    if (maskEditing) return;
    setPending(null);
    setBulk(null);
    setAnnouncement("");
  }, [maskEditing]);
  const staged = maskEditing ? (pending ?? doc.masks ?? {}) : doc.masks;
  const openCount = maskEditing ? 0 : openMatches(s, dismissed, doc.masks).length;
  const toggleSuggestion = (i: number) => {
    if (!s) return;
    const m = s.matches[i];
    const hidden = isHidden(s, i, staged);
    setPending(hidden ? showMatch(staged, s, i) : hideMatch(staged, s, i));
    setAnnouncement(t.suggest.announce(t.suggest.kinds[m.kind], m.page + 1, !hidden));
    // L'aperçu suit : on voit ce que l'on vient de masquer.
    const shownAt = previewOf(m.page);
    if (shownAt >= 0) setPage(shownAt);
  };
  const hideEverything = (everyDocument: boolean) => {
    if (!s) return;
    const all = hideAll(staged, s, dismissed);
    setPending(all.masks);
    setBulk({ added: all.added, undoOthers: everyDocument ? suggest?.onHideOthers() : undefined });
  };
  const undoBulk = () => {
    if (!s || !bulk) return;
    setPending(showAll(staged, s, bulk.added));
    bulk.undoOthers?.();
    setBulk(null);
  };
  const review = () => {
    // On ouvre sur la première page de l'aperçu qui porte une suggestion à traiter.
    const first = s ? openMatches(s, dismissed, doc.masks).map((i) => previewOf(s.matches[i].page)).find((i) => i >= 0) : undefined;
    if (first !== undefined) setPage(first);
    onMaskEditing(true);
  };
  // Contours sur la page affichée : les suggestions ni écartées ni déjà masquées.
  const outlines =
    s && maskEditing
      ? shownMatches(s, dismissed)
          .filter((i) => s.matches[i].page === pageIndex && !isHidden(s, i, staged))
          .flatMap((i) =>
            rectsOf(s, i).map((rect) => ({
              rect,
              label: t.suggest.kinds[s.matches[i].kind],
              onAccept: () => toggleSuggestion(i),
              onDismiss: () => suggest?.onDismiss(i),
            }))
          )
      : undefined;

  const sigRect =
    sigPage !== null && sigPage === pageIndex
      ? (doc.overlays?.[sigPage]?.find((o) => o.image === "signature")?.rect ?? null)
      : null;

  return (
    <div className="relative rounded-2xl border border-trait bg-feuille p-4" aria-busy={updating || undefined}>
      {updating && (
        <span className="absolute start-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-encre/85 px-3 py-1 text-xs font-medium text-white rtl:translate-x-1/2">
          {t.processingGeneric}
        </span>
      )}
      {openCount > 0 && <SuggestionsBanner count={openCount} disabled={updating} onReview={review} />}
      {shownPages > 1 && (
        <nav
          aria-label={t.pagerNav}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
        >
          <PagerButton
            direction="prev"
            disabled={current === 0}
            onClick={() => setPage(current - 1)}
          />
          <span className="text-sm text-encre-2 tabular-nums">
            {t.pageOf(pageIndex + 1, result.pageCount)}
            {isLast && <span className="ms-2 font-medium text-encre">· {t.sign.place.lastPage}</span>}
          </span>
          <PagerButton
            direction="next"
            disabled={current === shownPages - 1}
            onClick={() => setPage(current + 1)}
          />
          {signing && gap && (
            <span data-testid="preview-gap" className="w-full text-center text-xs text-encre-2">
              {gap}
            </span>
          )}
        </nav>
      )}

      <MaskEditor
        key={current}
        src={src}
        alt={alt(pageIndex + 1)}
        page={pageIndex}
        existing={doc.masks?.[pageIndex] ?? []}
        maskable={current < shownPages}
        onSave={(rects) => onMasks(setPageMasks(staged, pageIndex, rects))}
        editing={maskEditing}
        onEditing={onMaskEditing}
        staged={maskEditing ? (staged?.[pageIndex] ?? []) : undefined}
        onStaged={(rects) => setPending(setPageMasks(staged, pageIndex, rects))}
        pendingChanges={maskEditing ? masksKey(staged) !== masksKey(doc.masks) : undefined}
        suggestions={outlines}
        aside={
          s && (
            <SuggestionsPanel
              suggestions={s}
              dismissed={dismissed}
              masks={staged}
              previewPages={slots.map(renderedPage)}
              onToggle={toggleSuggestion}
              onDismiss={(i) => suggest?.onDismiss(i)}
              onHideAll={() => hideEverything(false)}
              onHideAllDocs={suggest && suggest.others > 0 ? () => hideEverything(true) : undefined}
              bulk={bulk && { count: bulk.added.length, pages: pagesOf(s, bulk.added) }}
              onUndoBulk={undoBulk}
              announcement={announcement}
            />
          )
        }
      >
        {signing ? (
          <SignatureEditor
            src={src}
            alt={alt(pageIndex + 1)}
            page={pageIndex}
            rect={sigRect}
            elsewhere={sigPage !== null && sigPage !== pageIndex ? sigPage : null}
            sigAspect={signing.sigAspect}
            bitmap={signing.bitmap}
            updating={updating}
            onPlace={(rect) => signing.onPlace(pageIndex, rect)}
            onReset={signing.onReset}
            onZoom={() => zoomRef.current?.showModal()}
          />
        ) : (
          <button
            onClick={() => zoomRef.current?.showModal()}
            className="block w-full cursor-zoom-in rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu"
            aria-label={t.zoomOpen(pageIndex + 1)}
          >
            <img
              src={src}
              alt={alt(pageIndex + 1)}
              className={`mx-auto max-h-[70vh] w-auto max-w-full rounded-lg border border-trait shadow-sm transition-opacity ${
                updating ? "opacity-60" : ""
              }`}
            />
          </button>
        )}
      </MaskEditor>

      <dialog
        ref={zoomRef}
        aria-label={t.zoomLabel(pageIndex + 1)}
        onClick={(e) => e.target === zoomRef.current && zoomRef.current.close()}
        className="m-auto max-h-[95dvh] max-w-[95vw] bg-transparent p-0 backdrop:bg-encre/85"
      >
        <div className="relative">
          <button
            onClick={() => zoomRef.current?.close()}
            aria-label={t.zoomClose}
            className="absolute end-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-encre/70 text-white transition-colors hover:bg-encre focus:outline-none focus:ring-2 focus:ring-white"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <img
            src={src}
            alt={t.zoomAlt(doc.file.name, pageIndex + 1)}
            className="max-h-[95dvh] max-w-[95vw] rounded-xl object-contain"
          />
        </div>
      </dialog>

      {children && <div className="mt-4 flex flex-col gap-3">{children}</div>}

      {(kept ? kept.length : result.pageCount) > shownPages && (
        <p className="mt-3 text-center text-sm text-encre-2">
          {signing && firstGap
            ? firstGap
            : `${t.previewLimit(result.previews.length, result.pageCount)} ${t.mask.limit(result.previews.length)}`}
          {s && s.matches.length > 0 && ` ${t.suggest.coverAll}`}
        </p>
      )}
    </div>
  );
}

function PagerButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const t = useT();
  return (
    // aria-disabled plutôt que disabled : un bouton désactivé sous le focus
    // rejette le focus vers <body> ; ici il reste focalisable et inerte.
    <button
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      aria-label={direction === "prev" ? t.pagerPrev : t.pagerNext}
      className={`flex h-11 w-11 items-center justify-center rounded-lg border border-trait text-encre transition-colors ${
        disabled ? "cursor-not-allowed opacity-30" : "hover:border-bleu hover:text-bleu"
      }`}
    >
      <ChevronIcon direction={direction === "prev" ? "left" : "right"} className="h-4 w-4" />
    </button>
  );
}
