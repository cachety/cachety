"use client";

// Page intégrée (/embed/<langue>), affichée dans une iframe par les sites
// partenaires. L'outil complet, sans menu, accroche, sections ni pied de page,
// sous un bandeau qui renvoie toujours vers cachety.com.
//
// Ce qui traverse vers la page parente : la hauteur du cadre, un nombre, et
// rien d'autre (heightMessage). Elle n'est envoyée qu'aux origines autorisées
// (le site lui-même et les partenaires) : postMessage ne la remet que si
// l'origine du parent correspond, sinon elle est ignorée sans bruit.
//
// Outils : le filigrane par défaut, la signature seule, ou les deux avec un
// sélecteur (« #tools=watermark,sign », lib/partners.ts). Un seul outil est
// monté à la fois : changer d'outil retire les documents, après confirmation.

import { useCallback, useEffect, useRef, useState } from "react";
import CoreProduct from "@/components/CoreProduct";
import { Logo, ShieldIcon } from "@/components/icons";
import { LangProvider } from "@/lib/i18n";
import { PARTNERS_COPY } from "@/lib/partners-copy";
import { SITE_COPY } from "@/lib/site-copy";
import { darker, EMBED_PARENTS, heightMessage, readPrefill, type EmbedTool } from "@/lib/partners";
import { BRAND, SITE_URL } from "@/lib/brand";
import type { Lang } from "@/lib/site-meta";

export default function EmbedApp({ lang }: { lang: Lang }) {
  const c = PARTNERS_COPY[lang].embed;
  const site = SITE_COPY[lang];
  const root = useRef<HTMLDivElement>(null);
  // Lus dans le fragment après le montage : inconnus au build statique, d'où
  // rien d'affiché avant (plutôt qu'un outil remplacé aussitôt par l'autre).
  const [tools, setTools] = useState<EmbedTool[] | null>(null);
  const [active, setActive] = useState<EmbedTool>("watermark");
  const [hasDocs, setHasDocs] = useState(false);
  const [pending, setPending] = useState<EmbedTool | null>(null);
  const onHasDocs = useCallback((has: boolean) => setHasDocs(has), []);

  // Couleur des boutons choisie par le partenaire (déjà vérifiée : lisible en blanc).
  useEffect(() => {
    const prefill = readPrefill(window.location.hash);
    setTools(prefill.tools);
    setActive(prefill.tools[0]);
    if (!prefill.accent) return;
    const style = document.documentElement.style;
    style.setProperty("--color-sceau", prefill.accent);
    style.setProperty("--color-sceau-fonce", darker(prefill.accent));
  }, []);

  const choose = (tool: EmbedTool) => {
    if (tool === active) return setPending(null);
    if (hasDocs) return setPending(tool);
    setActive(tool);
  };
  const confirmSwitch = () => {
    if (!pending) return;
    setActive(pending);
    setHasDocs(false);
    setPending(null);
  };
  const sign = active === "sign";
  const toolLabel = (tool: EmbedTool) => (tool === "sign" ? site.nav.sign : site.nav.tool);

  // Hauteur automatique : seulement si la page est bien dans un cadre.
  useEffect(() => {
    const el = root.current;
    if (!el || window.parent === window) return;
    const parents = EMBED_PARENTS(window.location.origin);
    let last = 0;
    const send = (force = false) => {
      const height = Math.ceil(el.getBoundingClientRect().height) + 16;
      if (height === last && !force) return;
      last = height;
      for (const origin of parents) window.parent.postMessage(heightMessage(height), origin);
    };
    send();
    const observer = new ResizeObserver(() => send());
    observer.observe(el);
    // La page parente peut finir de charger après ce premier envoi (son script
    // d'écoute n'est pas encore là) : on renvoie la même hauteur quelques fois.
    const timers = [300, 1000, 2500, 5000].map((ms) => window.setTimeout(() => send(true), ms));
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <LangProvider forcedLang={lang}>
      <div ref={root} className="mx-auto w-full max-w-7xl">
        <h1 className="sr-only">{sign ? site.sign.hero.title : site.hero.title}</h1>
        <a
          href={`${SITE_URL}/${lang}${sign ? "/sign" : ""}`}
          target="_blank"
          rel="noopener noreferrer"
          className="my-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-trait bg-feuille px-3 py-2 text-sm text-encre-2 hover:border-bleu"
        >
          <span className="inline-flex items-center gap-2 font-semibold text-encre">
            <Logo className="h-5 w-5" />
            {BRAND}
          </span>
          <span>{c.runsOn}</span>
          <span className="inline-flex items-center gap-1.5 text-green-800">
            <ShieldIcon className="h-4 w-4" />
            {c.private}
          </span>
        </a>
        {tools && tools.length > 1 && (
          <div className="mb-3 flex flex-col gap-2">
            <div role="group" aria-label={c.switchLabel} className="inline-flex w-fit gap-1 rounded-xl border border-trait bg-feuille p-1">
              {tools.map((tool) => (
                <button
                  key={tool}
                  type="button"
                  aria-pressed={active === tool}
                  onClick={() => choose(tool)}
                  className={`min-h-11 rounded-lg px-4 text-sm font-semibold transition-colors ${
                    active === tool ? "bg-sceau text-white" : "text-encre-2 hover:text-encre"
                  }`}
                >
                  {toolLabel(tool)}
                </button>
              ))}
            </div>
            {pending && (
              <div role="alert" className="flex flex-wrap items-center gap-3 rounded-xl border border-sceau/40 bg-white px-3 py-2 text-sm">
                <span className="text-encre">{c.switchWarn}</span>
                <span className="flex gap-2">
                  <button
                    type="button"
                    onClick={confirmSwitch}
                    className="min-h-11 rounded-lg bg-sceau px-3 font-semibold text-white hover:bg-sceau-fonce"
                  >
                    {c.switchConfirm}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPending(null)}
                    className="min-h-11 rounded-lg border border-trait bg-white px-3 font-semibold text-encre hover:border-bleu"
                  >
                    {c.switchCancel}
                  </button>
                </span>
              </div>
            )}
          </div>
        )}
        {tools ? (
          <CoreProduct key={active} embed mode={active} onHasDocs={onHasDocs} />
        ) : (
          <div className="min-h-[640px]" />
        )}
      </div>
    </LangProvider>
  );
}
