"use client";

// Masquage sur l'aperçu : on trace des rectangles sur la page affichée, puis
// « Appliquer » les envoie au moteur, qui les peint en noir AVANT le
// filigrane. Le contenu masqué n'existe plus dans le fichier produit.
//
// Les tracés restent en attente (local) jusqu'à « Appliquer » : un seul
// re-rendu pour plusieurs zones, au lieu d'un par rectangle.

import { useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { rectFromDrag, type MaskRect } from "@/lib/masks";

export function MaskEditor({
  src,
  alt,
  page,
  committed,
  maskable,
  onApply,
  onClearPage,
  children,
}: {
  src: string;
  alt: string;
  /** Index de la page affichée (0 = première). */
  page: number;
  /** Masques déjà appliqués à cette page (déjà noirs dans l'aperçu). */
  committed: number;
  /** Faux au-delà des pages prévisualisées : rien à tracer. */
  maskable: boolean;
  onApply: (rects: MaskRect[]) => void;
  onClearPage: () => void;
  /** Aperçu normal (zoom), affiché hors mode masquage. */
  children: React.ReactNode;
}) {
  const t = useT();
  const m = t.mask;
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useState<MaskRect[]>([]);
  const [draft, setDraft] = useState<MaskRect | null>(null);
  const surface = useRef<HTMLDivElement>(null);
  const origin = useRef<{ x: number; y: number; pointer: number } | null>(null);

  const point = (e: React.PointerEvent) => {
    const box = surface.current!.getBoundingClientRect();
    return { x: (e.clientX - box.left) / box.width, y: (e.clientY - box.top) / box.height };
  };
  const stop = () => {
    setEditing(false);
    setPending([]);
    setDraft(null);
    origin.current = null;
  };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-2">
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            disabled={!maskable}
            className="rounded-lg border border-trait px-3 py-1.5 text-sm text-encre-2 transition-colors hover:border-bleu hover:text-bleu disabled:opacity-40"
          >
            {m.start}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                onApply(pending);
                stop();
              }}
              disabled={!pending.length}
              className="rounded-lg bg-encre px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-encre/85 disabled:opacity-40"
            >
              {m.apply(pending.length)}
            </button>
            <button
              type="button"
              onClick={stop}
              className="rounded-lg border border-trait px-3 py-1.5 text-sm text-encre-2 transition-colors hover:border-bleu hover:text-bleu"
            >
              {m.cancel}
            </button>
          </>
        )}
        {committed > 0 && !editing && (
          <>
            <span className="text-sm text-encre-2">{m.onPage(committed)}</span>
            <button
              type="button"
              onClick={onClearPage}
              className="text-sm text-bleu underline underline-offset-2 hover:no-underline"
            >
              {m.clearPage}
            </button>
          </>
        )}
      </div>
      {editing && <p className="mt-2 text-sm text-encre-2">{m.hint}</p>}

      {editing ? (
        <div className="relative mx-auto mt-3 w-fit">
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="block max-h-[70vh] w-auto max-w-full select-none rounded-lg border border-trait"
          />
          <div
            ref={surface}
            role="application"
            aria-label={m.surface(page + 1)}
            className="absolute inset-0 cursor-crosshair touch-none"
            onPointerDown={(e) => {
              e.preventDefault();
              e.currentTarget.setPointerCapture(e.pointerId);
              const p = point(e);
              origin.current = { ...p, pointer: e.pointerId };
            }}
            onPointerMove={(e) => {
              const o = origin.current;
              if (!o || o.pointer !== e.pointerId) return;
              const p = point(e);
              setDraft(rectFromDrag(o.x, o.y, p.x, p.y));
            }}
            onPointerUp={(e) => {
              const o = origin.current;
              if (!o || o.pointer !== e.pointerId) return;
              const p = point(e);
              const rect = rectFromDrag(o.x, o.y, p.x, p.y);
              if (rect) setPending((list) => [...list, rect]);
              setDraft(null);
              origin.current = null;
            }}
            onPointerCancel={() => {
              setDraft(null);
              origin.current = null;
            }}
          >
            {[...pending, ...(draft ? [draft] : [])].map((r, i) => (
              <span
                key={i}
                className="pointer-events-none absolute border-2 border-sceau bg-encre/80"
                style={{
                  left: `${r.x * 100}%`,
                  top: `${r.y * 100}%`,
                  width: `${r.w * 100}%`,
                  height: `${r.h * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
