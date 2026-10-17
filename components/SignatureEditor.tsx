"use client";

// Placement de la signature sur l'aperçu (mode « signer »). Même modèle
// d'interaction que MaskEditor, copié plutôt que généralisé : la boîte se
// fait glisser, son coin bas-droit la redimensionne (rapport verrouillé), ×
// la retire ; au clavier, Tab jusqu'à la boîte, flèches pour la déplacer
// (Maj : ×5), + et − pour la redimensionner, Suppr pour la retirer. Toucher
// un endroit libre de la page y pose la signature.
//
// Coordonnées de la page (0–1), jamais inversées en arabe ou en persan : la
// poignée reste en bas à droite, comme sur le papier. Seuls la boîte et sa
// poignée bloquent le défilement tactile ; le reste de l'aperçu défile.
//
// Un geste n'est confié au moteur qu'au lâcher (un seul re-rendu) ; le
// clavier, à chaque pas (la file attend 500 ms avant de rendre).

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { CloseIcon, ZoomIcon } from "@/components/icons";
import {
  clampToPage,
  DEFAULT_SIGNATURE_WIDTH,
  defaultPlacement,
  moveRect,
  overlayTooSmall,
  resizeKeepingRatio,
  type OverlayRect,
} from "@/lib/overlays";

const KEY_STEP = 0.01;

type Gesture = { kind: "move" | "resize"; x: number; y: number; start: OverlayRect; pointer: number; moved: boolean };

const pct = (r: OverlayRect) => ({
  left: `${r.x * 100}%`,
  top: `${r.y * 100}%`,
  width: `${r.w * 100}%`,
  height: `${r.h * 100}%`,
});

/** Rectangle de largeur `w` centré sur (cx, cy), rapport de l'image conservé sur cette page. */
function centeredAt(cx: number, cy: number, w: number, pageAspect: number, sigAspect: number): OverlayRect {
  const h = (w * pageAspect) / (sigAspect > 0 ? sigAspect : 3);
  return clampToPage({ x: cx - w / 2, y: cy - h / 2, w, h });
}

export function SignatureEditor({
  src,
  alt,
  page,
  rect,
  elsewhere,
  sigAspect,
  bitmap,
  updating,
  onPlace,
  onReset,
  onZoom,
}: {
  src: string;
  alt: string;
  /** Page affichée (index 0 dans le document). */
  page: number;
  /** Signature posée sur cette page, ou null. */
  rect: OverlayRect | null;
  /** Page (index 0) où la signature se trouve, quand ce n'est pas celle-ci. */
  elsewhere: number | null;
  /** Rapport largeur / hauteur de l'image de la signature. */
  sigAspect: number;
  /** Image de la signature, dessinée dans la boîte (jamais persistée). */
  bitmap: ImageBitmap | null;
  /** L'aperçu affiché est le rendu précédent (nouveau rendu en cours). */
  updating: boolean;
  /** Nouveau placement sur cette page (null : signature retirée). */
  onPlace: (rect: OverlayRect | null) => void;
  /** Remet la signature à sa place par défaut (dernière page, en bas à droite). */
  onReset: () => void;
  onZoom: () => void;
}) {
  const t = useT();
  const p = t.sign.place;
  const surface = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  // Le lâcher d'un glisser produit aussi un « click » sur la surface (capture
  // du pointeur) : il ne doit pas reposer la signature au point de lâcher.
  const quietUntil = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const hereRef = useRef<HTMLButtonElement>(null);
  const inkRef = useRef<HTMLCanvasElement>(null);
  const [draft, setDraft] = useState<OverlayRect | null>(null);
  // Dimensions réelles du rendu : rapport de la page, et largeur en pixels
  // (pour l'avertissement « trop petite »).
  // Lues pour une page donnée : une autre page (format peut-être différent)
  // attend son propre chargement. Un nouveau rendu de la même page les garde.
  const [natural, setNatural] = useState<{ w: number; h: number; page: number } | null>(null);
  // Rapport inconnu tant que l'image de cette page n'est pas chargée : on ne
  // pose rien avant (un A4 supposé donnerait une boîte à la mauvaise hauteur).
  const pageAspect = natural?.page === page ? natural.w / natural.h : null;
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // Image déjà chargée avant que le gestionnaire ne soit posé.
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth) setNatural({ w: img.naturalWidth, h: img.naturalHeight, page });
  }, [src, page]);
  const shown = draft ?? rect;

  // La signature dans la boîte : elle suit le geste avant que le moteur ait
  // rendu la page (le rendu précédent reste dessous, estompé).
  useEffect(() => {
    const canvas = inkRef.current;
    if (!canvas || !bitmap) return;
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    try {
      canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
    } catch {
      // Image remplacée entre-temps (fermée) : le prochain rendu la redessine.
    }
  }, [bitmap, !!shown]);

  const point = (e: { clientX: number; clientY: number }) => {
    const box = surface.current!.getBoundingClientRect();
    return { x: (e.clientX - box.left) / box.width, y: (e.clientY - box.top) / box.height };
  };

  const begin = (e: React.PointerEvent, kind: Gesture["kind"]) => {
    if (!rect || e.button > 0) return;
    e.preventDefault();
    e.stopPropagation();
    surface.current?.setPointerCapture(e.pointerId);
    gesture.current = { kind, ...point(e), start: rect, pointer: e.pointerId, moved: false };
  };

  const placeAt = (cx: number, cy: number) =>
    pageAspect && onPlace(centeredAt(cx, cy, rect?.w ?? lastWidth.current, pageAspect, sigAspect));
  // Largeur de la signature quand elle était ailleurs : on la garde en la déplaçant.
  const lastWidth = useRef(DEFAULT_SIGNATURE_WIDTH);
  if (rect) lastWidth.current = rect.w;

  const small = !!shown && !!pageAspect && overlayTooSmall(shown, natural!.w);

  return (
    <div className="mt-3">
      <div className="relative mx-auto w-fit">
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          draggable={false}
          onLoad={(e) => setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight, page })}
          className={`block max-h-[70vh] w-auto max-w-full select-none rounded-lg border border-trait shadow-sm transition-opacity ${
            updating ? "opacity-60" : ""
          }`}
        />
        <div
          ref={surface}
          data-testid="signature-surface"
          className="absolute inset-0 cursor-copy"
          onClick={(e) => {
            // Un toucher (pas un défilement) sur une zone libre : la signature y va.
            if (e.target !== e.currentTarget || performance.now() < quietUntil.current) return;
            const q = point(e);
            placeAt(q.x, q.y);
          }}
          onPointerMove={(e) => {
            const g = gesture.current;
            if (!g || g.pointer !== e.pointerId) return;
            const q = point(e);
            g.moved = true;
            setDraft(
              g.kind === "move"
                ? moveRect(g.start, q.x - g.x, q.y - g.y)
                : resizeKeepingRatio(g.start, g.start.w + (q.x - g.x), "corner")
            );
          }}
          onPointerUp={(e) => {
            const g = gesture.current;
            if (!g || g.pointer !== e.pointerId) return;
            gesture.current = null;
            quietUntil.current = performance.now() + 400;
            if (g.moved && draft) onPlace(draft);
            setDraft(null);
          }}
          onPointerCancel={() => {
            gesture.current = null;
            setDraft(null);
          }}
        >
          {shown && (
            // Cadre sans rôle : la boîte (role="button") et × sont frères, pas
            // un bouton dans un bouton (les touches pressées sur × ne déplacent
            // ni ne retirent la boîte par bouillonnement).
            <div className="absolute" style={pct(shown)}>
            <div
              ref={boxRef}
              role="button"
              tabIndex={0}
              aria-label={p.boxLabel(page + 1)}
              aria-describedby="sign-place-hint"
              data-testid="signature-box"
              onPointerDown={(e) => begin(e, "move")}
              onKeyDown={(e) => {
                if (!rect || e.target !== e.currentTarget) return;
                const step = e.shiftKey ? KEY_STEP * 5 : KEY_STEP;
                const moves: Record<string, [number, number]> = {
                  ArrowLeft: [-step, 0],
                  ArrowRight: [step, 0],
                  ArrowUp: [0, -step],
                  ArrowDown: [0, step],
                };
                if (moves[e.key]) {
                  e.preventDefault();
                  onPlace(moveRect(rect, ...moves[e.key]));
                } else if (e.key === "+" || e.key === "=" || e.key === "-" || e.key === "_") {
                  e.preventDefault();
                  // « + » demande souvent Maj : le pas de taille ne dépend donc pas de Maj.
                  const grow = (e.key === "+" || e.key === "=" ? 1 : -1) * KEY_STEP * 2;
                  onPlace(resizeKeepingRatio(rect, rect.w + grow, "center"));
                } else if (e.key === "Delete" || e.key === "Backspace") {
                  e.preventDefault();
                  onPlace(null);
                  requestAnimationFrame(() => hereRef.current?.focus());
                }
              }}
              className="absolute inset-0 cursor-move touch-none rounded-sm border-2 border-dashed border-bleu bg-bleu/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-offset-1"
            >
              <canvas ref={inkRef} aria-hidden className="pointer-events-none block h-full w-full" />
              {/* Poignée : zone de prise de 32 px autour d'un carré visible de 16 px. */}
              <span
                aria-hidden
                data-testid="signature-handle"
                onPointerDown={(e) => begin(e, "resize")}
                className="absolute -right-4 -bottom-4 flex h-8 w-8 cursor-nwse-resize touch-none items-center justify-center"
              >
                <span className="h-4 w-4 rounded-sm border-2 border-white bg-bleu shadow" />
              </span>
            </div>
            {/* Côté physique (right) voulu : coordonnées de la page, pas du texte. */}
            <button
              type="button"
              aria-label={p.remove}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onPlace(null);
                requestAnimationFrame(() => hereRef.current?.focus());
              }}
              className="absolute -top-3.5 -right-3.5 flex h-7 w-7 items-center justify-center rounded-full border border-white bg-sceau text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onZoom}
          aria-label={t.zoomOpen(page + 1)}
          className="absolute start-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-encre/70 text-white transition-colors hover:bg-encre focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ZoomIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 rounded-xl border border-bleu/30 bg-bleu/5 p-3 text-sm">
        <p id="sign-place-hint" className="text-encre">
          {rect ? `${p.hint} ${p.keyboard}` : elsewhere !== null ? p.isOn(elsewhere + 1) : p.missing}
        </p>
        {small && (
          <p role="status" className="mt-2 text-amber-900">
            {p.tooSmall}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {!rect && (
            <button
              ref={hereRef}
              type="button"
              // Pas de disabled : le focus y est posé après × et serait perdu.
              onClick={() => pageAspect && onPlace(defaultPlacement(pageAspect, sigAspect, lastWidth.current))}
              className="rounded-xl bg-bleu px-4 py-2 font-semibold text-white transition-colors hover:bg-bleu/90"
            >
              {p.here}
            </button>
          )}
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-trait bg-white px-3 py-2 text-encre-2 transition-colors hover:border-bleu hover:text-bleu"
          >
            {p.reset}
          </button>
        </div>
      </div>
    </div>
  );
}
