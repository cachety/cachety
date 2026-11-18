"use client";

// Mode « dossier », étape 2 : la grille de toutes les pages, dans l'ordre du
// fichier à produire. Chaque page se déplace (glisser, ou Alt + flèches), se
// tourne (R) et se retire (Suppr), avec « Annuler » pendant huit secondes.
// Avec des sections, un intertitre par section : ce qui suit jusqu'au
// prochain intertitre fera un fichier.
//
// Fenêtrage : seules les rangées visibles, plus un écran au-dessus et en
// dessous, sont dans le DOM (mille pages restent fluides). Pas de dépendance.
//
// Glisser par Pointer Events (souris, doigt, stylet). Au doigt, le glisser
// ne commence qu'après un appui de 250 ms : la grille défile normalement.
// Le sens suit la lecture : en arabe et en persan la grille se lit de droite
// à gauche, et les flèches suivent ce que l'on voit.

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLang, useT } from "@/lib/i18n";
import { dirOf } from "@/lib/site-meta";
import { CloseIcon, MoreIcon, RotateIcon } from "@/components/icons";
import PhotoFix from "@/components/PhotoFix";
import type { Dossier, GridPage } from "@/components/useDossier";

const GAP = 8;
const TILE_MIN = 120;
/** Hauteur de la légende sous la vignette. */
const CAPTION = 26;
const HEADER = 52;
const EMPTY_ROW = 44;
/** Appui avant qu'un glisser au doigt ne commence (ms), et tolérances de mouvement (px). */
const PRESS_MS = 250;
const TOUCH_SLOP = 10;
const MOUSE_SLOP = 6;
/** Bande près des bords où la grille défile toute seule pendant un glisser. */
const EDGE = 40;

type Row =
  | { kind: "header"; top: number; height: number; sectionIndex: number }
  | { kind: "empty"; top: number; height: number; sectionIndex: number }
  | { kind: "pages"; top: number; height: number; start: number; end: number; sectionIndex: number };

/** Une rangée avant qu'elle ait sa position (Omit appliqué à chaque membre de l'union). */
type RowInput = Row extends infer R ? (R extends Row ? Omit<R, "top"> : never) : never;
type PageRow = Extract<Row, { kind: "pages" }>;

type Target = { slot: number; section?: string };

export default function PageGrid({ d, hasDocs }: { d: Dossier; hasDocs: boolean }) {
  const t = useT();
  const td = t.dossier;
  const { lang } = useLang();
  const rtl = dirOf(lang) === "rtl";
  const { grid, state } = d;
  const total = grid.length;

  const scroller = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [view, setView] = useState({ top: 0, height: 600 });
  /** Page qui porte le focus clavier (tabindex itinérant). */
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState<number | null>(null);
  const [drag, setDrag] = useState<{ from: number; target: Target | null } | null>(null);
  /** Page à mettre sous le focus après un déplacement (elle a pu changer de rangée). */
  const focusAfter = useRef<number | null>(null);

  // Largeur disponible et hauteur visible.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const measure = () => {
      setWidth(el.clientWidth - 16);
      setNarrow(window.innerWidth < 640);
      setView({ top: el.scrollTop, height: el.clientHeight || 600 });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [hasDocs, total > 0]);

  const cols = narrow ? 2 : Math.max(2, Math.floor((Math.max(width, 0) + GAP) / (TILE_MIN + GAP)));
  const tileW = width > 0 ? Math.floor((width - GAP * (cols - 1)) / cols) : TILE_MIN;
  const tileH = Math.round(tileW * Math.SQRT2) + CAPTION;

  // Rangées : un intertitre par section, puis ses pages, `cols` par rangée.
  const { rows, height } = useMemo(() => {
    const out: Row[] = [];
    let top = 0;
    const push = (row: RowInput) => {
      out.push({ ...row, top } as Row);
      top += row.height + GAP;
    };
    const groups = state.sections.length
      ? state.sections.map((s, i) => ({ from: Math.min(total, s.start), to: i + 1 < state.sections.length ? Math.min(total, state.sections[i + 1].start) : total, i }))
      : [{ from: 0, to: total, i: -1 }];
    for (const g of groups) {
      if (g.i >= 0) push({ kind: "header", height: HEADER, sectionIndex: g.i });
      if (g.i >= 0 && g.to === g.from) push({ kind: "empty", height: EMPTY_ROW, sectionIndex: g.i });
      for (let start = g.from; start < g.to; start += cols) {
        push({ kind: "pages", height: tileH, start, end: Math.min(g.to, start + cols), sectionIndex: g.i });
      }
    }
    return { rows: out, height: Math.max(0, top - GAP) };
  }, [state.sections, total, cols, tileH]);

  const rowOf = useCallback(
    (index: number) => rows.find((r): r is PageRow => r.kind === "pages" && index >= r.start && index < r.end),
    [rows]
  );

  // Fenêtre : un écran au-dessus, un en dessous. La rangée de la page active
  // reste montée (sinon le focus clavier tomberait sur <body>).
  const visible = useMemo(() => {
    const from = view.top - view.height;
    const to = view.top + 2 * view.height;
    const keep = rowOf(Math.min(active, total - 1));
    return rows.filter((r) => r === keep || (r.top + r.height >= from && r.top <= to));
  }, [rows, view, active, total, rowOf]);

  const onScroll = () => {
    const el = scroller.current;
    if (el) setView((v) => (Math.abs(v.top - el.scrollTop) > 24 || v.height !== el.clientHeight ? { top: el.scrollTop, height: el.clientHeight } : v));
  };

  /** Amène la page à l'écran, puis lui donne le focus (une fois sa rangée montée). */
  const focusPage = useCallback(
    (index: number) => {
      const next = Math.min(total - 1, Math.max(0, index));
      if (next < 0) return;
      setActive(next);
      focusAfter.current = next;
      const row = rowOf(next);
      const el = scroller.current;
      if (row && el) {
        if (row.top < el.scrollTop) el.scrollTop = Math.max(0, row.top - GAP);
        else if (row.top + row.height > el.scrollTop + el.clientHeight) el.scrollTop = row.top + row.height - el.clientHeight + GAP;
      }
    },
    [total, rowOf]
  );
  useEffect(() => {
    const index = focusAfter.current;
    if (index === null) return;
    const el = scroller.current?.querySelector<HTMLElement>(`[data-page-index="${index}"] [data-tile]`);
    if (el) {
      focusAfter.current = null;
      el.focus({ preventScroll: true });
    }
  });
  useEffect(() => {
    if (active > total - 1) setActive(Math.max(0, total - 1));
  }, [active, total]);

  // --- Glisser-déposer -----------------------------------------------------
  const stopDrag = useRef<(() => void) | null>(null);
  useEffect(() => () => stopDrag.current?.(), []);
  /** Un clic suit toujours la fin d'un glisser à la souris : il ne doit pas ouvrir de menu. */
  const dragged = useRef(false);

  const targetAt = useCallback(
    (x: number, y: number): Target | null => {
      const hit = document.elementFromPoint(x, y);
      const tile = hit?.closest<HTMLElement>("[data-page-index]");
      if (tile && scroller.current?.contains(tile)) {
        const index = Number(tile.dataset.pageIndex);
        const box = tile.getBoundingClientRect();
        const firstHalf = rtl ? x > box.left + box.width / 2 : x < box.left + box.width / 2;
        return { slot: firstHalf ? index : index + 1, section: tile.dataset.section || undefined };
      }
      const zone = hit?.closest<HTMLElement>("[data-section-drop]");
      if (zone && scroller.current?.contains(zone)) {
        return { slot: Number(zone.dataset.slot), section: zone.dataset.sectionDrop };
      }
      return null;
    },
    [rtl]
  );

  const startPress = (index: number, e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragged.current = false;
    // Les boutons de la vignette (tourner, retirer, menu) ne lancent pas de glisser.
    if ((e.target as HTMLElement).closest("[data-tile-action]")) return;
    stopDrag.current?.();
    const touch = e.pointerType === "touch";
    const id = e.pointerId;
    const origin = { x: e.clientX, y: e.clientY };
    let point = origin;
    let on = false;
    let frame = 0;
    let target: Target | null = null;
    dragged.current = false;

    const begin = () => {
      on = true;
      dragged.current = true;
      setDrag({ from: index, target: null });
      frame = requestAnimationFrame(tick);
    };
    const timer = touch ? window.setTimeout(begin, PRESS_MS) : 0;

    const tick = () => {
      const el = scroller.current;
      if (el) {
        const box = el.getBoundingClientRect();
        if (point.y < box.top + EDGE) el.scrollTop -= Math.ceil((box.top + EDGE - point.y) / 3);
        else if (point.y > box.bottom - EDGE) el.scrollTop += Math.ceil((point.y - box.bottom + EDGE) / 3);
      }
      const next = targetAt(point.x, point.y);
      if (next && (next.slot !== target?.slot || next.section !== target?.section)) {
        target = next;
        setDrag({ from: index, target });
      }
      frame = requestAnimationFrame(tick);
    };

    const onMove = (ev: PointerEvent) => {
      if (ev.pointerId !== id) return;
      point = { x: ev.clientX, y: ev.clientY };
      if (on) return;
      const moved = Math.hypot(point.x - origin.x, point.y - origin.y);
      // Au doigt, bouger avant la fin de l'appui : c'est un défilement.
      if (touch && moved > TOUCH_SLOP) finish(false);
      else if (!touch && moved > MOUSE_SLOP) begin();
    };
    // Une fois le glisser lancé, le doigt ne fait plus défiler la page.
    const onTouchMove = (ev: TouchEvent) => {
      if (on) ev.preventDefault();
    };
    const finish = (commit: boolean) => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchmove", onTouchMove);
      stopDrag.current = null;
      if (!on) return;
      setDrag(null);
      // Le clic qui suit le lâcher est ignoré (voir `dragged`), pas les suivants.
      window.setTimeout(() => (dragged.current = false), 0);
      const last = targetAt(point.x, point.y) ?? target;
      if (commit && last) d.drop(index, last.slot, last.section);
    };
    const onUp = (ev: PointerEvent) => ev.pointerId === id && finish(true);
    const onCancel = (ev: PointerEvent) => ev.pointerId === id && finish(false);
    const onKey = (ev: KeyboardEvent) => ev.key === "Escape" && finish(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    stopDrag.current = () => finish(false);
  };

  // --- Clavier -------------------------------------------------------------
  const onKey = (index: number, e: React.KeyboardEvent) => {
    const back = rtl ? "ArrowRight" : "ArrowLeft";
    const forward = rtl ? "ArrowLeft" : "ArrowRight";
    if (e.altKey && (e.key === back || e.key === forward)) {
      e.preventDefault();
      focusPage(d.step(index, e.key === back ? -1 : 1));
      return;
    }
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const moves: Record<string, number> = {
      [back]: index - 1,
      [forward]: index + 1,
      ArrowUp: index - cols,
      ArrowDown: index + cols,
      Home: 0,
      End: total - 1,
    };
    if (e.key in moves) {
      e.preventDefault();
      const to = moves[e.key];
      if (to >= 0 && to < total) focusPage(to);
    } else if (e.key === "r" || e.key === "R") {
      e.preventDefault();
      d.rotate(index);
    } else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      d.remove(index);
      focusPage(Math.min(index, total - 2));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setMenu(index);
    }
  };

  const insertion = (index: number): "before" | "after" | null => {
    const slot = drag?.target?.slot;
    if (slot === undefined || !drag) return null;
    // Les deux interstices qui encadrent la page glissée ne changent rien, sauf vers une autre section.
    const sameSection = (drag.target?.section ?? "") === (d.sectionOf(drag.from)?.id ?? "");
    if (sameSection && (slot === drag.from || slot === drag.from + 1)) return null;
    const row = rowOf(index);
    if (slot === index && (drag.target?.section ?? "") === (d.sectionOf(index)?.id ?? "")) return "before";
    if (row && slot === index + 1 && index === row.end - 1 && (drag.target?.section ?? "") === (d.sectionOf(index)?.id ?? "")) return "after";
    return null;
  };

  if (!hasDocs) return <p className="rounded-2xl border border-trait bg-feuille px-4 py-6 text-center text-encre-2">{t.needDoc}</p>;

  return (
    <div data-testid="page-grid-panel" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p data-testid="page-total" className="font-semibold tabular-nums">
          {td.grid.total(total)}
        </p>
        {d.custom && total > 1 && (
          <button type="button" onClick={d.reset} className="text-sm font-medium text-bleu underline underline-offset-2 hover:no-underline">
            {td.grid.reset}
          </button>
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={d.split}
          onChange={(e) => d.setSplit(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-bleu"
        />
        <span className="font-medium">{td.sections.split}</span>
      </label>

      {total > 0 && (
        <p id="page-grid-hint" className="text-sm text-encre-2">
          {td.grid.hint} <span className="max-lg:hidden">{td.grid.keyboard}</span>
        </p>
      )}

      <p aria-live="polite" role="status" className="sr-only">
        {d.announcement}
      </p>

      {d.notice && (
        <p role="status" className="flex items-start justify-between gap-3 rounded-xl border border-amber-600/40 bg-amber-500/10 px-4 py-2 text-sm text-amber-900">
          <span>{d.notice}</span>
          <button type="button" onClick={d.clearNotice} aria-label={t.done.close} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:bg-amber-500/20">
            <CloseIcon className="h-4 w-4" />
          </button>
        </p>
      )}

      {total === 0 && !state.sections.length ? (
        <p className="rounded-2xl border border-trait bg-feuille px-4 py-6 text-center text-encre-2">{td.grid.waiting}</p>
      ) : (
        <div
          ref={scroller}
          onScroll={onScroll}
          data-testid="page-grid"
          data-columns={cols}
          className={`relative max-h-[70vh] overflow-y-auto overscroll-contain rounded-2xl border border-trait bg-papier p-2 lg:max-h-[34rem] ${
            drag ? "cursor-grabbing select-none" : ""
          }`}
        >
          <div role="list" aria-label={td.grid.label} aria-describedby="page-grid-hint" className="relative" style={{ height }}>
            {visible.map((row) => {
              const section = row.sectionIndex >= 0 ? state.sections[row.sectionIndex] : undefined;
              if (row.kind === "header" && section) {
                return (
                  <SectionHeader
                    key={`h-${section.id}`}
                    top={row.top}
                    n={row.sectionIndex + 1}
                    name={section.name}
                    slot={section.start}
                    id={section.id}
                    names={d.sectionNames}
                    highlighted={!!drag && drag.target?.section === section.id && drag.target.slot === section.start}
                    onRename={(name) => d.rename(section.id, name)}
                    onRemove={() => d.dropSection(section.id)}
                  />
                );
              }
              if (row.kind === "empty" && section) {
                return (
                  <div
                    key={`e-${section.id}`}
                    data-section-drop={section.id}
                    data-slot={section.start}
                    className={`absolute inset-x-0 flex items-center justify-center rounded-xl border border-dashed px-3 text-center text-sm text-encre-2 ${
                      drag?.target?.section === section.id ? "border-bleu bg-bleu/5" : "border-trait"
                    }`}
                    style={{ top: row.top, height: row.height }}
                  >
                    {td.sections.empty}
                  </div>
                );
              }
              if (row.kind !== "pages") return null;
              return (
                <div key={`r-${row.start}-${row.sectionIndex}`} className="absolute inset-x-0 flex" style={{ top: row.top, height: row.height, gap: GAP }}>
                  {grid.slice(row.start, row.end).map((page, offset) => {
                    const index = row.start + offset;
                    return (
                      <Tile
                        key={`${page.ref.doc}#${page.ref.page}`}
                        page={page}
                        index={index}
                        total={total}
                        width={tileW}
                        section={section?.id}
                        tabbable={index === Math.min(active, total - 1)}
                        dragging={drag?.from === index}
                        insertion={insertion(index)}
                        onPress={startPress}
                        onKey={onKey}
                        onFocus={setActive}
                        onRotate={d.rotate}
                        onRemove={(i) => {
                          d.remove(i);
                          if (total > 1) setActive(Math.min(i, total - 2));
                        }}
                        onMenu={(i) => {
                          if (!dragged.current) setMenu(i);
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {d.undo && (
        <p role="status" data-testid="page-undo" className="flex items-center justify-between gap-3 rounded-xl border border-trait bg-encre px-4 py-2 text-sm text-white">
          <span>{d.undo.label}</span>
          <button type="button" onClick={d.undoLast} className="rounded-lg bg-white px-3 py-1.5 font-semibold text-encre hover:bg-white/90">
            {td.grid.undo}
          </button>
        </p>
      )}

      {menu !== null && grid[menu] && (
        <PageMenu
          d={d}
          index={menu}
          page={grid[menu]}
          total={total}
          onClose={(focus) => {
            setMenu(null);
            if (focus !== null) focusPage(focus);
          }}
        />
      )}

      {d.fixing && <PhotoFix d={d} />}
    </div>
  );
}

function SectionHeader({
  top,
  n,
  name,
  id,
  slot,
  names,
  highlighted,
  onRename,
  onRemove,
}: {
  top: number;
  n: number;
  name: string;
  id: string;
  slot: number;
  names: readonly string[];
  highlighted: boolean;
  onRename: (name: string) => void;
  onRemove: () => void;
}) {
  const t = useT();
  const s = t.dossier.sections;
  return (
    <div
      data-section-drop={id}
      data-slot={slot}
      data-testid="section-header"
      className={`absolute inset-x-0 flex items-center gap-2 rounded-xl border px-2 ${highlighted ? "border-bleu bg-bleu/5" : "border-trait bg-feuille"}`}
      style={{ top, height: HEADER }}
    >
      <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-encre/10 px-1.5 text-xs font-bold text-encre-2">{n}</span>
      <input
        type="text"
        value={name}
        maxLength={60}
        list={`sections-${id}`}
        onChange={(e) => onRename(e.target.value)}
        placeholder={s.unnamed(n)}
        aria-label={s.name(n)}
        // text-base : sous 16 px, iOS Safari zoome la page au focus.
        className="min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-base font-semibold hover:border-trait focus:border-bleu focus:bg-white focus:outline-none focus:ring-2 focus:ring-bleu sm:text-sm"
      />
      <datalist id={`sections-${id}`}>
        {names.map((preset) => (
          <option key={preset} value={preset} />
        ))}
      </datalist>
      <button
        type="button"
        onClick={onRemove}
        aria-label={s.remove}
        title={s.remove}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-encre-2 hover:bg-sceau/10 hover:text-sceau focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

function Tile({
  page,
  index,
  total,
  width,
  section,
  tabbable,
  dragging,
  insertion,
  onPress,
  onKey,
  onFocus,
  onRotate,
  onRemove,
  onMenu,
}: {
  page: GridPage;
  index: number;
  total: number;
  width: number;
  section?: string;
  tabbable: boolean;
  dragging: boolean;
  insertion: "before" | "after" | null;
  onPress: (index: number, e: React.PointerEvent) => void;
  onKey: (index: number, e: React.KeyboardEvent) => void;
  onFocus: (index: number) => void;
  onRotate: (index: number) => void;
  onRemove: (index: number) => void;
  onMenu: (index: number) => void;
}) {
  const t = useT();
  const g = t.dossier.grid;
  const origin = g.pageOf(page.ref.page + 1, page.name);
  const quarter = page.turn === 90 || page.turn === 270;
  const action =
    "flex h-8 w-8 items-center justify-center rounded-full bg-encre/75 text-white shadow transition-colors hover:bg-encre focus:outline-none focus-visible:ring-2 focus-visible:ring-white";
  return (
    <div
      role="listitem"
      data-page-index={index}
      data-section={section ?? ""}
      data-doc={page.ref.doc}
      data-source-page={page.ref.page}
      data-rotate={page.ref.rotate}
      data-busy={page.busy || undefined}
      onPointerDown={(e) => onPress(index, e)}
      onContextMenu={(e) => e.preventDefault()}
      className={`group relative shrink-0 select-none [-webkit-touch-callout:none] ${dragging ? "opacity-40" : ""}`}
      style={{ width }}
    >
      {insertion && (
        <span
          aria-hidden
          data-testid="page-insertion"
          className={`pointer-events-none absolute inset-y-0 z-10 w-1 rounded-full bg-bleu ${insertion === "before" ? "-start-[6px]" : "-end-[6px]"}`}
        />
      )}
      <button
        type="button"
        data-tile
        tabIndex={tabbable ? 0 : -1}
        aria-label={`${t.pageOf(index + 1, total)}. ${origin}`}
        aria-describedby="page-grid-hint"
        title={origin}
        onKeyDown={(e) => onKey(index, e)}
        onFocus={() => onFocus(index)}
        onClick={() => onMenu(index)}
        className="block w-full cursor-grab rounded-lg text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-offset-2 active:cursor-grabbing"
      >
        <span
          className={`relative block overflow-hidden rounded-lg border bg-white ${page.blocked ? "border-sceau/40 opacity-50" : "border-trait"}`}
          style={{ aspectRatio: "1 / 1.4142" }}
        >
          {page.thumb ? (
            <img
              src={page.thumb}
              alt=""
              draggable={false}
              className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition-transform ${page.busy ? "opacity-60" : ""}`}
              style={page.turn ? { transform: `rotate(${page.turn}deg) scale(${quarter ? 0.7071 : 1})` } : undefined}
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-xs text-encre-2">{page.blocked ? "!" : "…"}</span>
          )}
          <span className="absolute start-1 top-1 rounded-full bg-encre/75 px-1.5 py-0.5 text-[11px] font-bold tabular-nums text-white">{index + 1}</span>
        </span>
        <span className="mt-1 block truncate text-xs text-encre-2" style={{ height: CAPTION - 8 }}>
          <bdi>{page.name}</bdi>
        </span>
      </button>
      <button
        type="button"
        data-tile-action
        tabIndex={-1}
        aria-label={`${g.remove} ${index + 1}`}
        title={g.remove}
        onClick={() => onRemove(index)}
        className={`absolute end-1 top-1 ${action}`}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        data-tile-action
        tabIndex={-1}
        aria-label={`${g.rotate} ${index + 1}`}
        title={g.rotate}
        onClick={() => onRotate(index)}
        className={`absolute start-1 ${action}`}
        style={{ bottom: CAPTION + 4 }}
      >
        <RotateIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        data-tile-action
        tabIndex={-1}
        aria-label={g.menu(index + 1)}
        title={g.menu(index + 1)}
        onClick={() => onMenu(index)}
        className={`absolute end-1 ${action}`}
        style={{ bottom: CAPTION + 4 }}
      >
        <MoreIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Menu d'une page : tout ce que le glisser et le clavier permettent, pour qui ne glisse pas. */
function PageMenu({
  d,
  index,
  page,
  total,
  onClose,
}: {
  d: Dossier;
  index: number;
  page: GridPage;
  total: number;
  /** `focus` : page à remettre sous le focus (null : aucune, elle a été retirée). */
  onClose: (focus: number | null) => void;
}) {
  const t = useT();
  const td = t.dossier;
  const ref = useRef<HTMLDialogElement>(null);
  const [position, setPosition] = useState(String(index + 1));
  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);
  const section = d.sectionOf(index);
  const others = d.state.sections.filter((s) => s.id !== section?.id);
  const item =
    "flex min-h-11 w-full items-center gap-3 rounded-xl border border-trait bg-white px-3 text-start text-sm font-medium text-encre transition-colors hover:border-bleu focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu";
  const commitPosition = () => {
    const n = Number.parseInt(position, 10);
    if (!Number.isInteger(n)) return;
    const to = Math.min(total, Math.max(1, n)) - 1;
    if (to !== index) d.move(index, to);
    onClose(to);
  };
  return (
    <dialog
      ref={ref}
      aria-label={td.grid.menu(index + 1)}
      onClose={() => onClose(index)}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      className="m-auto w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-trait bg-feuille p-4 text-encre backdrop:bg-encre/50 max-sm:mb-4"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 font-semibold">
          {t.pageOf(index + 1, total)}
          <span className="block truncate text-sm font-normal text-encre-2">{td.grid.pageOf(page.ref.page + 1, page.name)}</span>
        </p>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={t.done.close}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-encre-2 hover:bg-encre/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <button type="button" className={item} onClick={() => d.rotate(index)}>
          <RotateIcon className="h-4 w-4 shrink-0" />
          {td.grid.rotate}
        </button>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            commitPosition();
          }}
        >
          <label className="flex min-w-0 flex-1 items-center gap-2 text-sm font-medium">
            <span className="min-w-0 flex-1">{td.grid.moveTo}</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={position}
              onChange={(e) => setPosition(e.target.value.replace(/\D/g, "").slice(0, 4))}
              onFocus={(e) => e.target.select()}
              aria-label={td.grid.position(index + 1, total)}
              // text-base : sous 16 px, iOS Safari zoome la page au focus.
              className="h-11 w-16 rounded-xl border border-trait bg-white text-center text-base tabular-nums focus:outline-none focus:ring-2 focus:ring-bleu"
            />
          </label>
          <button type="submit" className="min-h-11 rounded-xl bg-bleu px-4 text-sm font-semibold text-white hover:bg-bleu/90">
            {t.size.done}
          </button>
        </form>
        {page.photo && (
          <button
            type="button"
            className={item}
            onClick={() => {
              d.setFixing({ doc: page.ref.doc, page: page.ref.page });
              ref.current?.close();
            }}
          >
            {td.photo.fix}
          </button>
        )}
        <button
          type="button"
          className={item}
          onClick={() => {
            d.startSection(index);
            ref.current?.close();
          }}
        >
          {td.sections.add}
        </button>
        {others.length > 0 && (
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            {td.sections.moveTo}
            <select
              value=""
              onChange={(e) => {
                if (!e.target.value) return;
                const to = d.toSection(index, e.target.value);
                onClose(to);
              }}
              className="h-11 rounded-xl border border-trait bg-white px-3 text-base sm:text-sm"
            >
              <option value="" />
              {others.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name || td.sections.unnamed(d.state.sections.indexOf(s) + 1)}
                </option>
              ))}
            </select>
          </label>
        )}
        <button
          type="button"
          className={`${item} text-sceau-fonce hover:border-sceau`}
          onClick={() => {
            d.remove(index);
            onClose(total > 1 ? Math.min(index, total - 2) : null);
          }}
        >
          <CloseIcon className="h-4 w-4 shrink-0" />
          {td.grid.remove}
        </button>
      </div>
    </dialog>
  );
}
