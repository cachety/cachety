"use client";

import { useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { outName, size, type Doc } from "@/lib/doc";
import { ChevronIcon, CloseIcon, DownloadIcon } from "@/components/icons";

export function Kiosk({ doc }: { doc: Doc }) {
  const t = useT();
  const [page, setPage] = useState(0);
  const zoomRef = useRef<HTMLDialogElement>(null);
  const result = doc.result!;
  const shownPages = result.previews.length;

  return (
    <div className="rounded-2xl border border-trait bg-feuille p-4">
      <a
        href={result.url}
        download={outName(doc, t)}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-sceau px-6 py-3.5 font-semibold text-white transition-colors hover:bg-sceau-fonce focus:outline-none focus:ring-2 focus:ring-sceau focus:ring-offset-2"
      >
        <DownloadIcon className="h-5 w-5 shrink-0" />
        <span className="truncate">{outName(doc, t)}</span>
        <span className="shrink-0 font-normal opacity-80">
          ({size(result.blob.size, t)})
        </span>
      </a>

      {shownPages > 1 && (
        <nav
          aria-label={t.pagerNav}
          className="mt-4 flex items-center justify-center gap-4"
        >
          <PagerButton
            direction="prev"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          />
          <span className="text-sm text-encre-2 tabular-nums">
            {t.pageOf(page + 1, result.pageCount)}
          </span>
          <PagerButton
            direction="next"
            disabled={page === shownPages - 1}
            onClick={() => setPage(page + 1)}
          />
        </nav>
      )}

      <button
        onClick={() => zoomRef.current?.showModal()}
        className="mt-4 block w-full cursor-zoom-in rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu"
        aria-label={t.zoomOpen(page + 1)}
      >
        <img
          src={result.previews[page]}
          alt={t.previewAlt(doc.file.name, page + 1)}
          className="mx-auto max-h-[70vh] w-auto max-w-full rounded-lg border border-trait shadow-sm"
        />
      </button>

      <dialog
        ref={zoomRef}
        aria-label={t.zoomLabel(page + 1)}
        onClick={(e) => e.target === zoomRef.current && zoomRef.current.close()}
        className="m-auto max-h-[95dvh] max-w-[95vw] bg-transparent p-0 backdrop:bg-encre/85"
      >
        <div className="relative">
          <button
            onClick={() => zoomRef.current?.close()}
            aria-label={t.zoomClose}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-encre/70 text-white transition-colors hover:bg-encre focus:outline-none focus:ring-2 focus:ring-white"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <img
            src={result.previews[page]}
            alt={t.zoomAlt(doc.file.name, page + 1)}
            className="max-h-[95dvh] max-w-[95vw] rounded-xl object-contain"
          />
        </div>
      </dialog>

      {result.pageCount > shownPages && (
        <p className="mt-3 text-center text-sm text-encre-2">
          {t.previewLimit(shownPages, result.pageCount)}
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
