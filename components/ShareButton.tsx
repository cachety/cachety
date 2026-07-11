"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { SITE_META } from "@/lib/site-meta";
import { CheckIcon, ShareIcon } from "@/components/icons";

// Partage l'accueil dans la langue affichée : l'URL /fr, /en ou /ja
// impose la langue de l'interface et de l'aperçu du lien (bannière OG).
export default function ShareButton() {
  const { lang, t } = useLang();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const share = async () => {
    const meta = SITE_META[lang];
    const url = `${window.location.origin}${meta.path}`;
    // Sur mobile (pointeur tactile), vrai partage natif : feuille de
    // partage du système. Sur desktop, copie du lien — prévisible.
    const mobile = window.matchMedia("(pointer: coarse)").matches;
    if (mobile && navigator.share) {
      try {
        await navigator.share({ title: meta.ogTitle, text: meta.description, url });
        return;
      } catch (e) {
        if ((e as DOMException).name === "AbortError") return;
        // Partage indisponible malgré l'API : on retombe sur la copie.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={share}
      aria-label={t.share}
      title={t.share}
      className="flex items-center gap-1.5 rounded-full border border-trait bg-feuille px-2 py-1 text-sm text-encre-2 transition-colors hover:border-encre-2 hover:text-encre sm:px-3"
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 shrink-0 text-green-700" />
      ) : (
        <ShareIcon className="h-3.5 w-3.5 shrink-0" />
      )}
      <span className="hidden whitespace-nowrap sm:inline">
        {copied ? t.shareCopied : t.share}
      </span>
    </button>
  );
}
