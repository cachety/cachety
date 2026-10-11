"use client";

// Glisser-déposer des lignes de document, par Pointer Events : un seul code
// pour la souris, le doigt et le stylet (l'API HTML5 drag-and-drop ne marche
// pas au toucher). La poignée porte `touch-action: none` pour que le doigt
// déplace la ligne au lieu de faire défiler la page.

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { slotToIndex } from "@/lib/doc";

export type DragState = { id: string; from: number; slot: number };

/** Bande (px) près des bords où la liste, ou la page, défile toute seule. */
const EDGE = 48;

export function useDragReorder(
  listRef: RefObject<HTMLElement | null>,
  onMoveTo: (id: string, to: number) => void
) {
  const [drag, setDrag] = useState<DragState | null>(null);
  const stop = useRef<(() => void) | null>(null);
  // Démonté en plein glisser (liste vidée) : on retire les écouteurs.
  useEffect(() => () => stop.current?.(), []);

  const start = useCallback(
    (id: string, from: number, e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      stop.current?.();

      let slot = from;
      let y = e.clientY;
      let frame = 0;
      setDrag({ id, from, slot });

      const locate = () => {
        const list = listRef.current;
        if (!list) return;
        const box = list.getBoundingClientRect();
        // Abscisse ramenée au centre de la liste : un doigt qui dérive sur le
        // côté continue de viser les lignes.
        const hit = document.elementFromPoint(box.left + box.width / 2, y);
        const row = hit?.closest<HTMLElement>("[data-doc-index]");
        if (!row || !list.contains(row)) return;
        const index = Number(row.dataset.docIndex);
        const r = row.getBoundingClientRect();
        const next = y < r.top + r.height / 2 ? index : index + 1;
        if (next !== slot) {
          slot = next;
          setDrag({ id, from, slot });
        }
      };

      const tick = () => {
        const list = listRef.current;
        if (list) {
          const box = list.getBoundingClientRect();
          if (y < box.top + EDGE) list.scrollTop -= Math.ceil((box.top + EDGE - y) / 4);
          else if (y > box.bottom - EDGE) list.scrollTop += Math.ceil((y - box.bottom + EDGE) / 4);
        }
        if (y < EDGE) window.scrollBy(0, -Math.ceil((EDGE - y) / 4));
        else if (y > window.innerHeight - EDGE)
          window.scrollBy(0, Math.ceil((y - window.innerHeight + EDGE) / 4));
        locate();
        frame = requestAnimationFrame(tick);
      };

      const onMove = (ev: PointerEvent) => {
        if (ev.pointerId === e.pointerId) y = ev.clientY;
      };
      const finish = (commit: boolean) => {
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onCancel);
        window.removeEventListener("keydown", onKey);
        stop.current = null;
        setDrag(null);
        if (commit) {
          const to = slotToIndex(from, slot);
          if (to !== from) onMoveTo(id, to);
        }
      };
      const onUp = (ev: PointerEvent) => ev.pointerId === e.pointerId && finish(true);
      const onCancel = (ev: PointerEvent) => ev.pointerId === e.pointerId && finish(false);
      const onKey = (ev: KeyboardEvent) => ev.key === "Escape" && finish(false);

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onCancel);
      window.addEventListener("keydown", onKey);
      stop.current = () => finish(false);
      frame = requestAnimationFrame(tick);
    },
    [listRef, onMoveTo]
  );

  return { drag, start };
}
