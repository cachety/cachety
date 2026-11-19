"use client";

// Mode « dossier » : redresser et recadrer la photo d'une feuille, puis la
// nettoyer. Quatre coins à poser sur les coins de la feuille, au doigt, à la
// souris ou au clavier (Tab d'un coin à l'autre, flèches, Maj pour aller plus
// vite). Une loupe suit le coin pendant qu'on le déplace : sous le doigt, on
// ne le verrait pas. Rien n'est appliqué avant « Appliquer » ; la photo
// d'origine n'est jamais modifiée (le moteur refait la page à partir d'elle).
//
// Coordonnées de l'image : les coins sont placés en pourcentages de la photo,
// de gauche à droite et de haut en bas, quelle que soit la langue.

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { CloseIcon } from "@/components/icons";
import { DEFAULT_QUAD, isUsableQuad, moveCorner, type Quad } from "@/lib/photo-fix";
import { loadPhoto } from "@/lib/photo-page";
import type { Dossier } from "@/components/useDossier";

/** Côté le plus long de l'image affichée dans l'éditeur (px). */
const DISPLAY_SIDE = 1400;
const LOUPE = 112;
const LOUPE_ZOOM = 3;
const STEP = 0.005;
const FAST_STEP = 0.02;

export default function PhotoFix({ d }: { d: Dossier }) {
  const t = useT();
  const p = t.dossier.photo;
  const target = d.fixingTarget;
  const dialog = useRef<HTMLDialogElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const loupe = useRef<HTMLCanvasElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const [quad, setQuad] = useState<Quad>(target?.ref.crop ?? DEFAULT_QUAD);
  const [whiten, setWhiten] = useState(target?.ref.clean?.whiten ?? false);
  // Photo pas encore nettoyée : « Noir et blanc » part du dernier choix appliqué (préférence d'affichage).
  const [gray, setGray] = useState(target?.ref.clean ? target.ref.clean.gray : d.grayDefault);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  /** Coin en cours de déplacement au pointeur : la loupe le suit. */
  const [dragging, setDragging] = useState<number | null>(null);
  const pointer = useRef<number | null>(null);

  useEffect(() => {
    const el = dialog.current;
    if (el && !el.open) el.showModal();
  }, []);

  // La photo d'origine, décodée une fois, dessinée à une taille d'écran.
  const file = target?.file;
  useEffect(() => {
    if (!file) return;
    let live = true;
    loadPhoto(file).then(
      (bitmap) => {
        const el = canvas.current;
        if (!live || !el) return bitmap.close();
        const scale = Math.min(1, DISPLAY_SIDE / Math.max(bitmap.width, bitmap.height));
        el.width = Math.max(1, Math.round(bitmap.width * scale));
        el.height = Math.max(1, Math.round(bitmap.height * scale));
        el.getContext("2d")?.drawImage(bitmap, 0, 0, el.width, el.height);
        bitmap.close();
        setReady(true);
      },
      () => live && setFailed(true)
    );
    return () => {
      live = false;
    };
  }, [file]);

  // Loupe : la zone autour du coin déplacé, agrandie, avec un repère au centre.
  useEffect(() => {
    const source = canvas.current;
    const out = loupe.current;
    if (dragging === null || !source || !out || !ready) return;
    const ctx = out.getContext("2d");
    if (!ctx) return;
    const corner = quad[dragging];
    const side = LOUPE / LOUPE_ZOOM;
    // À l'échelle de l'image affichée : un pixel d'écran vaut `ratio` pixels du canvas.
    const ratio = source.width / (surface.current?.clientWidth || source.width);
    ctx.fillStyle = "#1a1e33";
    ctx.fillRect(0, 0, LOUPE, LOUPE);
    ctx.drawImage(source, corner.x * source.width - (side * ratio) / 2, corner.y * source.height - (side * ratio) / 2, side * ratio, side * ratio, 0, 0, LOUPE, LOUPE);
    ctx.strokeStyle = "#c4262e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(LOUPE / 2, LOUPE / 2 - 12);
    ctx.lineTo(LOUPE / 2, LOUPE / 2 + 12);
    ctx.moveTo(LOUPE / 2 - 12, LOUPE / 2);
    ctx.lineTo(LOUPE / 2 + 12, LOUPE / 2);
    ctx.stroke();
  }, [dragging, quad, ready]);

  if (!target) return null;
  const close = () => d.setFixing(null);
  const usable = isUsableQuad(quad);

  const place = (index: number, e: React.PointerEvent) => {
    const box = surface.current?.getBoundingClientRect();
    if (!box) return;
    const x = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width));
    const y = Math.min(1, Math.max(0, (e.clientY - box.top) / box.height));
    setQuad((q) => q.map((c, i) => (i === index ? { x, y } : c)) as Quad);
  };

  return (
    <dialog
      ref={dialog}
      aria-labelledby="photo-fix-title"
      data-testid="photo-fix"
      onClose={close}
      onCancel={close}
      className="m-auto max-h-[96dvh] w-[min(44rem,calc(100vw-1rem))] overflow-y-auto rounded-2xl border border-trait bg-feuille p-4 text-encre backdrop:bg-encre/70"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 id="photo-fix-title" className="text-lg font-semibold">
            {p.fix}
          </h3>
          <p id="photo-fix-hint" className="mt-1 text-sm text-encre-2">
            {p.fixHint} <span className="max-lg:hidden">{p.keyboard}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label={t.done.close}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-encre-2 hover:bg-encre/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      {failed ? (
        <p role="alert" className="mt-4 rounded-xl border border-sceau/40 bg-sceau/5 px-4 py-3 text-sceau-fonce">
          {t.errors.image_unreadable}
        </p>
      ) : (
        <div className="mt-3 flex justify-center">
          {/* dir="ltr" : les pourcentages ci-dessous sont ceux de l'image, pas du sens de lecture. */}
          <div ref={surface} dir="ltr" data-testid="photo-fix-surface" className="relative w-fit touch-none select-none">
            <canvas ref={canvas} className={`block max-h-[60dvh] w-auto max-w-full rounded-lg border border-trait ${ready ? "" : "min-h-40 min-w-40"}`} />
            {ready && (
              <>
                <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
                  <polygon
                    points={quad.map((c) => `${c.x * 100},${c.y * 100}`).join(" ")}
                    fill="rgba(34,63,146,0.12)"
                    stroke={usable ? "#223f92" : "#c4262e"}
                    strokeWidth="0.6"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                {quad.map((corner, i) => (
                  <button
                    key={i}
                    type="button"
                    data-testid={`photo-corner-${i}`}
                    aria-label={p.corner(i + 1)}
                    aria-describedby="photo-fix-hint"
                    onPointerDown={(e) => {
                      e.preventDefault();
                      try {
                        e.currentTarget.setPointerCapture(e.pointerId);
                      } catch {
                        // Pointeur déjà relâché : les déplacements sur le coin lui-même suffisent.
                      }
                      e.currentTarget.focus();
                      pointer.current = e.pointerId;
                      setDragging(i);
                    }}
                    onPointerMove={(e) => {
                      if (pointer.current === e.pointerId) place(i, e);
                    }}
                    onPointerUp={(e) => {
                      if (pointer.current !== e.pointerId) return;
                      pointer.current = null;
                      setDragging(null);
                    }}
                    onPointerCancel={() => {
                      pointer.current = null;
                      setDragging(null);
                    }}
                    onKeyDown={(e) => {
                      const step = e.shiftKey ? FAST_STEP : STEP;
                      const moves: Record<string, [number, number]> = {
                        ArrowLeft: [-step, 0],
                        ArrowRight: [step, 0],
                        ArrowUp: [0, -step],
                        ArrowDown: [0, step],
                      };
                      if (!moves[e.key]) return;
                      e.preventDefault();
                      setQuad((q) => moveCorner(q, i, ...moves[e.key]));
                    }}
                    className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-move rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bleu"
                    style={{ left: `${corner.x * 100}%`, top: `${corner.y * 100}%` }}
                  >
                    <span className="pointer-events-none absolute inset-0 m-auto block h-5 w-5 rounded-full border-2 border-white bg-bleu shadow" />
                  </button>
                ))}
                {dragging !== null && (
                  <canvas
                    ref={loupe}
                    width={LOUPE}
                    height={LOUPE}
                    data-testid="photo-loupe"
                    aria-hidden
                    className="pointer-events-none absolute z-10 rounded-full border-2 border-white shadow-lg"
                    // Au-dessus du coin, ou en dessous s'il est trop près du haut : jamais sous le doigt.
                    style={{
                      width: LOUPE,
                      height: LOUPE,
                      left: `clamp(0px, calc(${quad[dragging].x * 100}% - ${LOUPE / 2}px), calc(100% - ${LOUPE}px))`,
                      top: quad[dragging].y < 0.3 ? `calc(${quad[dragging].y * 100}% + 36px)` : `calc(${quad[dragging].y * 100}% - ${LOUPE + 36}px)`,
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}

      <fieldset className="mt-4 flex flex-col gap-2 rounded-xl border border-trait p-3">
        <legend className="px-1 text-sm font-semibold">{p.cleanUp}</legend>
        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={whiten} onChange={(e) => setWhiten(e.target.checked)} className="h-5 w-5 shrink-0 accent-bleu" />
          <span>{p.whiten}</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={gray} onChange={(e) => setGray(e.target.checked)} className="h-5 w-5 shrink-0 accent-bleu" />
          <span>{p.gray}</span>
        </label>
        <button
          type="button"
          onClick={() => {
            d.cleanAllPhotos({ whiten, gray });
            d.setGrayDefault(gray);
          }}
          className="w-fit py-1 text-sm font-medium text-bleu underline underline-offset-2 hover:no-underline"
        >
          {p.applyAll}
        </button>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!usable || failed}
          onClick={() => {
            // Coins laissés à leur place par défaut : pas de recadrage, la photo entière.
            const moved = JSON.stringify(quad) !== JSON.stringify(DEFAULT_QUAD);
            d.setPhoto(target.ref, { crop: moved || target.ref.crop ? quad : null, clean: { whiten, gray } });
            d.setGrayDefault(gray);
            dialog.current?.close();
          }}
          className="rounded-xl bg-bleu px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bleu/90 disabled:opacity-40"
        >
          {p.apply}
        </button>
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="rounded-xl border border-trait bg-white px-4 py-2.5 text-sm text-encre-2 transition-colors hover:border-bleu hover:text-bleu"
        >
          {t.mask.cancel}
        </button>
        {target.ref.crop && (
          <button
            type="button"
            onClick={() => {
              d.setPhoto(target.ref, { crop: null, clean: { whiten, gray } });
              dialog.current?.close();
            }}
            className="ms-auto py-2 text-sm text-bleu underline underline-offset-2 hover:no-underline"
          >
            {p.reset}
          </button>
        )}
      </div>
    </dialog>
  );
}
