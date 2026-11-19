"use client";

import { useEffect } from "react";
import { useLang, type Lang } from "@/lib/i18n";
import { SITE_COPY } from "@/lib/site-copy";
import { displayTitle } from "@/lib/typography";
import { DOSSIER_META } from "@/lib/site-meta";
import { GuideTeasers, ToolLink, type GuideTeaser } from "@/components/Landing";
import { ChevronIcon, PencilIcon, ShieldIcon, WifiOffIcon } from "@/components/icons";

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

/**
 * Sous l'outil Dossier : comment ça marche, le test du mode avion, pourquoi
 * le fichier peut être plus lourd que les originaux (docs/prd-dossier.md
 * §4.2), questions fréquentes, guides de l'outil, renvois vers le filigrane
 * et la signature. Même structure et même style que SignLanding ; masqué sur
 * téléphone pendant les étapes 2 et 3 de l'outil (data-tool-aside).
 */
export default function DossierLanding({ teasers }: { teasers: Record<Lang, GuideTeaser[]> }) {
  const { lang } = useLang();
  const c = SITE_COPY[lang];
  const s = c.dossier;

  return (
    <div data-tool-aside className="mx-auto mt-20 flex w-full max-w-7xl flex-col gap-20 sm:mt-28 sm:gap-28">
      <section aria-labelledby="how">
        <h2 id="how" className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {displayTitle(lang, s.howTitle)}
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {s.how.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-trait bg-feuille p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sceau text-base font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-encre-2 text-pretty">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="airplane" className="rounded-3xl bg-encre px-6 py-10 text-white sm:px-12 sm:py-14">
        <div className="mx-auto flex max-w-3xl items-start gap-4">
          <WifiOffIcon className="mt-0.5 h-8 w-8 shrink-0 text-green-400" />
          <div>
            <h2 id="airplane" className="text-balance text-xl font-bold tracking-tight sm:text-2xl">
              {displayTitle(lang, s.airplaneTitle)}
            </h2>
            <p className="mt-2 text-white/80 text-pretty sm:text-lg">{s.airplaneBody}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="bigger" className="mx-auto w-full max-w-3xl rounded-3xl border border-trait bg-feuille p-6 sm:p-10">
        <h2 id="bigger" className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          {displayTitle(lang, s.bigger.title)}
        </h2>
        <p className="mt-5 text-encre-2 text-pretty">{s.bigger.body}</p>
      </section>

      <section aria-labelledby="faq" className="mx-auto w-full max-w-3xl">
        <h2 id="faq" className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {displayTitle(lang, s.faqTitle)}
        </h2>
        <div className="mt-8 flex flex-col gap-3">
          {s.faq.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-trait bg-feuille px-5 py-4 open:pb-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {displayTitle(lang, item.q)}
                <ChevronIcon direction="right" className="h-4 w-4 shrink-0 text-encre-2 transition-transform group-open:rotate-90 rtl:group-open:-rotate-90" />
              </summary>
              <p className="mt-3 text-encre-2 text-pretty">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <GuideTeasers lang={lang} guides={teasers[lang]} />

      {/* Les deux autres outils : mêmes encarts que sur leurs pages (docs/prd-dossier.md §5.9). */}
      <ToolLink id="watermark-link" href={`/${lang}`} copy={c.sign.watermarkLink} Icon={ShieldIcon} />
      <ToolLink id="sign-link" href={`/${lang}/sign`} copy={c.landing.signLink} Icon={PencilIcon} />

      <div className="flex justify-center">
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-xl bg-sceau px-6 py-3 font-semibold text-white transition-colors hover:bg-sceau-fonce focus:outline-none focus-visible:ring-2 focus-visible:ring-sceau focus-visible:ring-offset-2"
        >
          {s.backToTop}
          <ChevronIcon direction="right" className="h-4 w-4 -rotate-90 rtl:rotate-90" />
        </a>
      </div>
    </div>
  );
}
