"use client";

import { useEffect } from "react";
import { useLang, type Lang } from "@/lib/i18n";
import { DOSSIER_META } from "@/lib/site-meta";
import type { GuideTeaser } from "@/components/Landing";

/**
 * Page /dossier : l'adresse, l'onglet et la description suivent la langue
 * affichée, comme sur l'accueil et sur /sign. replaceState : changer de langue
 * ne recharge pas la page, les documents déposés restent là. « /dossier » en
 * anglais reste « /dossier ».
 */
export function DossierLangSync() {
  const { lang } = useLang();
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const target = `/${lang}/dossier`;
    if (path !== target && !(path === "/dossier" && lang === "en")) {
      window.history.replaceState(null, "", target + window.location.search + window.location.hash);
    }
    document.title = DOSSIER_META[lang].title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", DOSSIER_META[lang].description);
  }, [lang]);
  return null;
}

/** Sous l'outil Dossier (contenu : WP6). */
export default function DossierLanding({ teasers }: { teasers: Record<Lang, GuideTeaser[]> }) {
  const { lang } = useLang();
  return <div data-tool-aside data-guides={teasers[lang].length} />;
}
