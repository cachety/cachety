"use client";

import { useEffect } from "react";
import { useLang, type Lang } from "@/lib/i18n";
import { SITE_COPY } from "@/lib/site-copy";
import { displayTitle } from "@/lib/typography";
import { SIGN_META } from "@/lib/site-meta";
import { GuideTeasers, ToolLink, type GuideTeaser } from "@/components/Landing";
import { ChevronIcon, ShieldIcon, WifiOffIcon } from "@/components/icons";

/**
 * Page /sign : l'adresse, l'onglet et la description suivent la langue
 * affichée, comme sur l'accueil (lib/i18n.tsx ne le fait que pour lui).
 * replaceState : changer de langue ne recharge pas la page, les documents
 * déposés et la signature restent là. « /sign » en anglais reste « /sign ».
 */
export function SignLangSync() {
  const { lang } = useLang();
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const target = `/${lang}/sign`;
    if (path !== target && !(path === "/sign" && lang === "en")) {
      window.history.replaceState(null, "", target + window.location.search + window.location.hash);
    }
    document.title = SIGN_META[lang].title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", SIGN_META[lang].description);
  }, [lang]);
  return null;
}

/**
 * Sous l'outil de signature : comment ça marche, le test du mode avion, ce
 * que vaut la signature (seul passage juridique du site, docs/prd-sign.md
 * §4.3), questions fréquentes, guides de signature, renvoi vers le filigrane.
 * Même structure et même style que Landing ; masqué sur téléphone pendant les
 * étapes 2 et 3 de l'outil (data-tool-aside, voir globals.css).
 */
export default function SignLanding({ teasers }: { teasers: Record<Lang, GuideTeaser[]> }) {
  const { lang } = useLang();
  const s = SITE_COPY[lang].sign;

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

      <section aria-labelledby="legal" className="mx-auto w-full max-w-3xl rounded-3xl border border-trait bg-feuille p-6 sm:p-10">
        <h2 id="legal" className="text-2xl font-bold tracking-tight sm:text-3xl">
          {displayTitle(lang, s.legal.title)}
        </h2>
        <div className="mt-5 flex flex-col gap-4 text-encre-2">
          <p className="text-pretty">{s.legal.p1}</p>
          <p className="text-pretty">{s.legal.p2}</p>
          <p className="text-pretty">{s.legal.p3}</p>
        </div>
        <p className="mt-6 border-s-2 border-sceau ps-3 text-sm font-medium text-encre">{s.legal.note}</p>
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

      <p className="-mt-6 flex justify-center">
        <a href={`/${lang}/compare#group-sign`} className="inline-flex items-center gap-1 font-medium text-bleu hover:underline">
          {SITE_COPY[lang].nav.compare}
          <ChevronIcon direction="right" className="h-4 w-4" />
        </a>
      </p>

      <ToolLink id="watermark-link" href={`/${lang}`} copy={s.watermarkLink} Icon={ShieldIcon} />

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
