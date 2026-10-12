"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { readPref, writePref } from "@/lib/storage";
import { CloseIcon, QuestionIcon } from "@/components/icons";

/**
 * Visite guidée de l'outil, en 3 étapes. Discrète par construction :
 *  - un bouton « Aide » fixe en bas, côté fin de lecture (droite, ou gauche
 *    en arabe et en persan) ;
 *  - si le visiteur semble perdu (aucun document après un moment, et des
 *    allers-retours de défilement, des clics dans le vide ou une longue
 *    inactivité en haut de page), une bulle propose la visite, une seule fois ;
 *  - la visite assombrit la page autour de la zone utile mais ne bloque
 *    rien : la page reste cliquable, Échap ferme.
 * Rien n'est mesuré ni envoyé : les signaux restent dans cette page, et seule
 * la préférence « bulle déjà proposée » est gardée dans le navigateur.
 */

/** Zones repérées par data-tour dans CoreProduct, dans l'ordre des étapes. */
const ANCHORS = ["drop", "details", "result"] as const;

const NUDGE_PREF = "tourNudged";
/** Rien ne se déclenche avant ce délai : le temps de lire l'en-tête. */
const MIN_DWELL_MS = 30_000;
/** Inactivité qui compte comme « bloqué », quand la page est encore en haut. */
const IDLE_MS = 20_000;
/** Délai au-delà duquel, toujours sans document et en haut de page, on propose. */
const STUCK_MS = 60_000;
const NUDGE_VISIBLE_MS = 20_000;

type Rect = { top: number; left: number; width: number; height: number };

const INTERACTIVE = "a,button,input,textarea,select,label,summary,[role='button'],[role='menuitem'],[role='menuitemradio']";

export default function HelpTour({
  hasDocs,
  lifted,
  reveal,
  revealed,
  hideOnPhone,
}: {
  hasDocs: boolean;
  lifted: boolean;
  /** Sur téléphone, l'outil n'affiche qu'une étape : affiche celle de la zone i. */
  reveal?: (i: number) => void;
  /** Étape affichée par l'outil : relance le repérage quand elle change. */
  revealed?: number;
  /** Sur téléphone, le bouton Aide masquerait les commandes de l'étape : caché. */
  hideOnPhone?: boolean;
}) {
  const t = useT().tour;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [nudge, setNudge] = useState(false);
  const [rect, setRect] = useState<Rect | null>(null);
  const [cardH, setCardH] = useState(180);
  const [wide, setWide] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const start = useCallback(() => {
    setNudge(false);
    writePref(NUDGE_PREF, "1");
    setStep(hasDocs ? 1 : 0);
    setOpen(true);
  }, [hasDocs]);

  const close = useCallback(() => {
    setOpen(false);
    setRect(null);
    buttonRef.current?.focus();
  }, []);

  // --- Détection d'un visiteur perdu (seulement tant qu'aucun document) ---
  useEffect(() => {
    if (hasDocs || open || readPref(NUDGE_PREF)) return;
    const t0 = Date.now();
    let lastActive = t0;
    let engaged = false;
    let reversals = 0;
    let deadClicks = 0;
    let lastY = window.scrollY;
    let anchorY = lastY;
    let dir = 0;

    const active = () => (lastActive = Date.now());
    const onScroll = () => {
      active();
      const y = window.scrollY;
      const d = Math.sign(y - lastY);
      lastY = y;
      // Un changement de sens ne compte qu'après 80 px dans le sens précédent.
      if (d !== 0 && d !== dir) {
        if (dir !== 0 && Math.abs(y - anchorY) > 80) reversals++;
        dir = d;
        anchorY = y;
      }
    };
    // « click » et non « pointerdown » : un geste de défilement au doigt ne
    // déclenche pas de clic, il ne doit pas compter comme un clic dans le vide.
    const onClick = (e: MouseEvent) => {
      active();
      const target = e.target as Element | null;
      if (!target?.closest(INTERACTIVE)) deadClicks++;
      // Utiliser l'outil lui-même (texte, modèle, option) : le visiteur sait
      // ce qu'il fait. Les boutons de navigation ne comptent pas.
      else if (target.closest("[data-tour]")) engaged = true;
    };
    const onType = (e: Event) => {
      active();
      if ((e.target as Element | null)?.closest("[data-tour]")) engaged = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", active);
    window.addEventListener("input", onType);
    window.addEventListener("pointermove", active, { passive: true });

    const timer = window.setInterval(() => {
      const now = Date.now();
      const elapsed = now - t0;
      if (engaged || elapsed < MIN_DWELL_MS || document.hidden) return;
      const nearTop = window.scrollY < window.innerHeight * 1.5;
      const lost =
        reversals >= 4 ||
        deadClicks >= 3 ||
        (nearTop && now - lastActive > IDLE_MS) ||
        (nearTop && elapsed > STUCK_MS);
      if (!lost) return;
      writePref(NUDGE_PREF, "1");
      setNudge(true);
      window.clearInterval(timer);
    }, 2000);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", active);
      window.removeEventListener("input", onType);
      window.removeEventListener("pointermove", active);
    };
  }, [hasDocs, open]);

  // La bulle s'efface d'elle-même, et dès qu'un document arrive.
  useEffect(() => {
    if (!nudge) return;
    if (hasDocs) {
      setNudge(false);
      return;
    }
    const id = window.setTimeout(() => setNudge(false), NUDGE_VISIBLE_MS);
    return () => window.clearTimeout(id);
  }, [nudge, hasDocs]);

  // Document ajouté pendant l'étape 1 : on passe à la suite.
  useEffect(() => {
    if (open && step === 0 && hasDocs) setStep(1);
  }, [open, step, hasDocs]);

  // --- Suivi de la zone mise en lumière ---
  useEffect(() => {
    if (!open) return;
    const el = document.querySelector<HTMLElement>(`[data-tour="${ANCHORS[step]}"]`);
    if (!el) return;
    // Zone masquée (étape non affichée sur téléphone) : l'outil l'affiche,
    // et le changement de `revealed` relance ce repérage.
    if (!el.getClientRects().length) {
      reveal?.(step);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
        setWide(window.innerWidth >= 640);
      });
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    ro?.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
    // `reveal` change à chaque rendu de l'outil : seul `revealed` compte.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step, revealed]);

  useLayoutEffect(() => {
    if (open && cardRef.current) setCardH(cardRef.current.offsetHeight);
  }, [open, step, rect, wide]);

  useEffect(() => {
    if (!open) return;
    cardRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, step, close]);

  const last = step === ANCHORS.length - 1;
  const s = t.steps[step];
  const pad = 8;

  // Carte : sous la zone s'il y a la place, sinon au-dessus, sinon en bas
  // d'écran. Sur téléphone, toujours en bas (feuille), le pouce y est.
  let cardPos: React.CSSProperties | undefined;
  if (open && rect && wide) {
    const w = 340;
    const below = rect.top + rect.height + pad + 12;
    const above = rect.top - pad - 12 - cardH;
    const left = Math.min(Math.max(rect.left, 16), window.innerWidth - w - 16);
    if (below + cardH < window.innerHeight - 16) cardPos = { top: below, left, width: w };
    else if (above > 16) cardPos = { top: above, left, width: w };
    else cardPos = { bottom: 24, left, width: w };
  }

  return (
    <>
      {open && rect && (
        // Purement visuel : la page reste utilisable pendant la visite.
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
          <div
            className="absolute rounded-2xl shadow-[0_0_0_9999px_rgba(15,23,42,0.5)] ring-2 ring-white transition-all duration-300 motion-reduce:transition-none"
            style={{
              top: rect.top - pad,
              left: rect.left - pad,
              width: rect.width + pad * 2,
              height: rect.height + pad * 2,
            }}
          />
        </div>
      )}

      {open && (
        <div
          ref={cardRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="tour-title"
          aria-describedby="tour-body"
          tabIndex={-1}
          style={cardPos}
          className={`fixed z-[61] rounded-2xl border border-trait bg-feuille p-5 text-encre shadow-2xl focus:outline-none ${
            cardPos ? "" : "inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))]"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-sceau">{t.stepOf(step + 1, ANCHORS.length)}</p>
            <button
              type="button"
              onClick={close}
              aria-label={t.close}
              className="-m-1.5 rounded-full p-1.5 text-encre-2 transition-colors hover:bg-encre/5 hover:text-encre"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
          <h2 id="tour-title" className="mt-1 text-lg font-bold">
            {s.title}
          </h2>
          <p id="tour-body" className="mt-1.5 text-pretty text-encre-2">
            {s.body}
          </p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex gap-1.5" aria-hidden>
              {ANCHORS.map((a, i) => (
                <span key={a} className={`h-1.5 w-1.5 rounded-full ${i === step ? "bg-sceau" : "bg-trait"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-encre-2 transition-colors hover:bg-encre/5 hover:text-encre"
                >
                  {t.back}
                </button>
              )}
              <button
                type="button"
                onClick={() => (last ? close() : setStep(step + 1))}
                className="rounded-xl bg-sceau px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sceau-fonce focus:outline-none focus-visible:ring-2 focus-visible:ring-sceau focus-visible:ring-offset-2"
              >
                {last ? t.done : t.next}
              </button>
            </div>
          </div>
        </div>
      )}

      {!open && (
        <div
          className={`fixed end-4 z-40 flex flex-col items-end gap-3 transition-[bottom] ${
            lifted ? "bottom-32 lg:bottom-5" : "bottom-[max(1.25rem,env(safe-area-inset-bottom))]"
          } ${hideOnPhone && !open ? "max-lg:hidden" : ""
          }`}
        >
          {nudge && (
            <div
              role="status"
              className="w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-trait bg-feuille p-4 text-sm text-encre shadow-xl"
            >
              <p className="text-pretty">{t.nudge}</p>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNudge(false)}
                  className="rounded-lg px-3 py-1.5 font-medium text-encre-2 transition-colors hover:bg-encre/5 hover:text-encre"
                >
                  {t.nudgeNo}
                </button>
                <button
                  type="button"
                  onClick={start}
                  className="rounded-lg bg-sceau px-3 py-1.5 font-semibold text-white transition-colors hover:bg-sceau-fonce"
                >
                  {t.nudgeYes}
                </button>
              </div>
            </div>
          )}
          <button
            ref={buttonRef}
            type="button"
            onClick={start}
            aria-label={t.openAria}
            title={t.openAria}
            className="flex h-12 items-center gap-2 rounded-full bg-encre px-4 font-semibold text-white shadow-lg shadow-encre/25 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sceau focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <QuestionIcon className="h-5 w-5 shrink-0" />
            <span className="text-sm">{t.open}</span>
          </button>
        </div>
      )}
    </>
  );
}
