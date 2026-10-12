"use client";

// Masquage sur l'aperçu. En mode tracé, chaque zone de la page est éditable :
// tracer sur un espace libre en crée une, la faire glisser la déplace, son
// coin bas-droit la redimensionne, × la retire (au clavier : Tab jusqu'à la
// zone, flèches pour la déplacer, Suppr pour la retirer). Coordonnées de la
// page : la poignée reste en bas à droite, même en arabe ou en persan. Les zones déjà
// appliquées reviennent éditables quand on rouvre le mode tracé.
//
// Rien n'est envoyé au moteur avant « Terminé » : un seul re-rendu pour
// plusieurs changements. Les commandes sont sous l'aperçu, jamais au-dessus. Le moteur peint les zones en noir AVANT le
// filigrane ; le contenu masqué n'existe plus dans le fichier produit.

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { CloseIcon } from "@/components/icons";
import { moveRect, rectFromDrag, resizeRect, type MaskRect } from "@/lib/masks";

type Gesture =
  | { kind: "draw"; x: number; y: number; pointer: number }
  | { kind: "move" | "resize"; index: number; x: number; y: number; start: MaskRect; pointer: number };

const KEY_STEP = 0.01;

const pct = (r: MaskRect) => ({
  left: `${r.x * 100}%`,
  top: `${r.y * 100}%`,
  width: `${r.w * 100}%`,
  height: `${r.h * 100}%`,
});

export function MaskEditor({
  src,
  alt,
  page,
  existing,
  maskable,
  onSave,
  editing,
  onEditing,
  children,
}: {
  src: string;
  alt: string;
  /** Index de la page affichée (0 = première). */
  page: number;
  /** Masques déjà appliqués à cette page (déjà noirs dans l'aperçu). */
  existing: MaskRect[];
  /** Faux au-delà des pages prévisualisées : rien à tracer. */
  maskable: boolean;
  /** Nouveau jeu complet de masques pour cette page. */
  onSave: (rects: MaskRect[]) => void;
  /** Mode tracé, ouvert par le bouton « Masquer quelque chose » de l'aperçu. */
  editing: boolean;
  onEditing: (on: boolean) => void;
  /** Aperçu normal (zoom), affiché hors mode masquage. */
  children: React.ReactNode;
}) {
  const t = useT();
  const m = t.mask;
  const [rects, setRects] = useState<MaskRect[]>(existing);
  const [draft, setDraft] = useState<MaskRect | null>(null);
  const surface = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);

  // À l'ouverture du mode tracé : les zones appliquées redeviennent éditables.
  useEffect(() => {
    if (editing) setRects(existing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const key = (list: MaskRect[]) => list.map((r) => [r.x, r.y, r.w, r.h].map((v) => v.toFixed(4)).join(",")).join(";");
  const dirty = key(rects) !== key(existing);
  // Zones appliquées retirées : encore noires dans l'aperçu jusqu'à « Terminé ».
  const removed = existing.filter((e) => !rects.some((r) => key([r]) === key([e])));

  const point = (e: React.PointerEvent) => {
    const box = surface.current!.getBoundingClientRect();
    return { x: (e.clientX - box.left) / box.width, y: (e.clientY - box.top) / box.height };
  };
  const stop = () => {
    onEditing(false);
    setDraft(null);
    gesture.current = null;
  };
  const update = (i: number, r: MaskRect) => setRects((list) => list.map((x, j) => (j === i ? r : x)));
  const remove = (i: number) => setRects((list) => list.filter((_, j) => j !== i));

  const begin = (e: React.PointerEvent, g: Gesture) => {
    e.preventDefault();
    e.stopPropagation();
    surface.current?.setPointerCapture(e.pointerId);
    gesture.current = g;
  };

  return (
    <div className="mt-3">
      {editing && maskable ? (
        <div className="relative mx-auto w-fit">
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
              const p = point(e);
              begin(e, { kind: "draw", ...p, pointer: e.pointerId });
            }}
            onPointerMove={(e) => {
              const g = gesture.current;
              if (!g || g.pointer !== e.pointerId) return;
              const p = point(e);
              if (g.kind === "draw") setDraft(rectFromDrag(g.x, g.y, p.x, p.y));
              else if (g.kind === "move") update(g.index, moveRect(g.start, p.x - g.x, p.y - g.y));
              else update(g.index, resizeRect(g.start, p.x, p.y));
            }}
            onPointerUp={(e) => {
              const g = gesture.current;
              if (!g || g.pointer !== e.pointerId) return;
              if (g.kind === "draw") {
                const p = point(e);
                const rect = rectFromDrag(g.x, g.y, p.x, p.y);
                if (rect) setRects((list) => [...list, rect]);
                setDraft(null);
              }
              gesture.current = null;
            }}
            onPointerCancel={() => {
              setDraft(null);
              gesture.current = null;
            }}
          >
            {removed.map((r, i) => (
              <span
                key={`removed-${i}`}
                aria-hidden
                className="pointer-events-none absolute border-2 border-dashed border-bleu bg-white/60"
                style={pct(r)}
              />
            ))}
            {rects.map((r, i) => (
              <div
                key={i}
                role="button"
                tabIndex={0}
                aria-label={m.area(i + 1)}
                aria-describedby="mask-edit-hint"
                onPointerDown={(e) => begin(e, { kind: "move", index: i, ...point(e), start: r, pointer: e.pointerId })}
                onKeyDown={(e) => {
                  const step = e.shiftKey ? KEY_STEP * 5 : KEY_STEP;
                  const moves: Record<string, [number, number]> = {
                    ArrowLeft: [-step, 0],
                    ArrowRight: [step, 0],
                    ArrowUp: [0, -step],
                    ArrowDown: [0, step],
                  };
                  if (moves[e.key]) {
                    e.preventDefault();
                    update(i, moveRect(r, ...moves[e.key]));
                  } else if (e.key === "Delete" || e.key === "Backspace") {
                    e.preventDefault();
                    remove(i);
                  }
                }}
                className="absolute cursor-move border-2 border-sceau bg-encre/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-offset-1"
                style={pct(r)}
              >
                <button
                  type="button"
                  aria-label={m.remove(i + 1)}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => remove(i)}
                  className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full border border-white bg-sceau text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
                <span
                  aria-hidden
                  onPointerDown={(e) =>
                    begin(e, { kind: "resize", index: i, ...point(e), start: r, pointer: e.pointerId })
                  }
                  className="absolute -right-2 -bottom-2 h-5 w-5 cursor-nwse-resize rounded-sm border-2 border-white bg-sceau"
                />
              </div>
            ))}
            {draft && (
              <span className="pointer-events-none absolute border-2 border-sceau bg-encre/80" style={pct(draft)} />
            )}
          </div>
        </div>
      ) : (
        children
      )}

      {/* Une seule barre, juste sous l'aperçu : consigne, Terminé, Annuler. */}
      {editing && (
        <div className="mt-3 rounded-xl border border-bleu/30 bg-bleu/5 p-3">
          <p id="mask-edit-hint" className="text-sm text-encre">
            {m.hint} {rects.length > 0 && m.editHint}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (dirty) onSave(rects);
                stop();
              }}
              className="rounded-xl bg-bleu px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bleu/90"
            >
              {m.done}
            </button>
            <button
              type="button"
              onClick={stop}
              className="rounded-xl border border-trait bg-white px-4 py-2.5 text-sm text-encre-2 transition-colors hover:border-bleu hover:text-bleu"
            >
              {m.cancel}
            </button>
            {rects.length > 0 && (
              <button
                type="button"
                onClick={() => setRects([])}
                className="ms-auto py-2 text-sm text-bleu underline underline-offset-2 hover:no-underline"
              >
                {m.clearPage}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
