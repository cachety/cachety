"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { signaturePage, type Doc } from "@/lib/doc";
import { ChevronIcon, CloseIcon } from "@/components/icons";
import { MaskEditor } from "@/components/MaskEditor";
import { SignatureEditor } from "@/components/SignatureEditor";
import { setPageMasks, type PageMasks } from "@/lib/masks";
import type { OverlayRect } from "@/lib/overlays";

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
}) {
  const t = useT();
  const result = doc.result!;
  const shownPages = result.previews.length;
  // Page du document de chaque aperçu : en mode « signer », les 11 premières
  // et la dernière (là où l'on signe), pas seulement les 12 premières.
  const pageAt = (i: number) => result.previewPageIndexes?.[i] ?? i;
  const sigPage = signing ? signaturePage(doc.overlays) : null;
  const previewOf = (p: number | null) => {
    if (p === null) return -1;
    const i = (result.previewPageIndexes ?? []).indexOf(p);
    return i >= 0 ? i : -1;
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
  const zoomRef = useRef<HTMLDialogElement>(null);
  const alt = (p: number) => (signing ? t.sign.previewAlt(doc.file.name, p) : t.previewAlt(doc.file.name, p));

  // Pages non prévisualisées entre deux aperçus (mode « signer » : 12 à N−1).
  const gapAfter = (i: number) =>
    i + 1 < shownPages && pageAt(i + 1) - pageAt(i) > 1 ? t.sign.place.gap(pageAt(i) + 2, pageAt(i + 1)) : null;
  const gap = gapAfter(current) ?? (current > 0 ? gapAfter(current - 1) : null);
  const firstGap = Array.from({ length: shownPages }, (_, i) => gapAfter(i)).find(Boolean) ?? null;
  const isLast = !!signing && result.pageCount > 1 && pageIndex === result.pageCount - 1;

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
        src={result.previews[current]}
        alt={alt(pageIndex + 1)}
        page={pageIndex}
        existing={doc.masks?.[pageIndex] ?? []}
        maskable={current < shownPages}
        onSave={(rects) => onMasks(setPageMasks(doc.masks, pageIndex, rects))}
        editing={maskEditing}
        onEditing={onMaskEditing}
      >
        {signing ? (
          <SignatureEditor
            src={result.previews[current]}
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
              src={result.previews[current]}
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
            src={result.previews[current]}
            alt={t.zoomAlt(doc.file.name, pageIndex + 1)}
            className="max-h-[95dvh] max-w-[95vw] rounded-xl object-contain"
          />
        </div>
      </dialog>

      {children && <div className="mt-4 flex flex-col gap-3">{children}</div>}

      {result.pageCount > shownPages && (
        <p className="mt-3 text-center text-sm text-encre-2">
          {signing && firstGap ? firstGap : `${t.previewLimit(shownPages, result.pageCount)} ${t.mask.limit(shownPages)}`}
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
