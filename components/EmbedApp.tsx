"use client";

// Page intégrée (/embed/<langue>), affichée dans une iframe par les sites
// partenaires. L'outil complet, sans menu, accroche, sections ni pied de page,
// sous un bandeau qui renvoie toujours vers cachety.com.
//
// Ce qui traverse vers la page parente : la hauteur du cadre, un nombre, et
// rien d'autre (heightMessage). Elle n'est envoyée qu'aux origines autorisées
// (le site lui-même et les partenaires) : postMessage ne la remet que si
// l'origine du parent correspond, sinon elle est ignorée sans bruit.

import { useEffect, useRef } from "react";
import CoreProduct from "@/components/CoreProduct";
import { Logo, ShieldIcon } from "@/components/icons";
import { LangProvider } from "@/lib/i18n";
import { PARTNERS_COPY } from "@/lib/partners-copy";
import { SITE_COPY } from "@/lib/site-copy";
import { darker, EMBED_PARENTS, heightMessage, readPrefill } from "@/lib/partners";
import { BRAND, SITE_URL } from "@/lib/brand";
import type { Lang } from "@/lib/site-meta";

export default function EmbedApp({ lang }: { lang: Lang }) {
  const c = PARTNERS_COPY[lang].embed;
  const root = useRef<HTMLDivElement>(null);

  // Couleur des boutons choisie par le partenaire (déjà vérifiée : lisible en blanc).
  useEffect(() => {
    const { accent } = readPrefill(window.location.hash);
    if (!accent) return;
    const style = document.documentElement.style;
    style.setProperty("--color-sceau", accent);
    style.setProperty("--color-sceau-fonce", darker(accent));
  }, []);

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
        <h1 className="sr-only">{SITE_COPY[lang].hero.title}</h1>
        <a
          href={`${SITE_URL}/${lang}`}
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
        <CoreProduct embed />
      </div>
    </LangProvider>
  );
}
