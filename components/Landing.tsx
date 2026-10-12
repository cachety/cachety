"use client";

import Link from "next/link";
import { useLang, type Lang } from "@/lib/i18n";
import { SITE_COPY } from "@/lib/site-copy";
import { DONATE_URL, REPO_URL } from "@/lib/brand";
import AuthorLink from "@/components/AuthorLink";
import {
  ChevronIcon,
  CodeIcon,
  CpuIcon,
  Flag,
  HeartIcon,
  ShieldIcon,
  UserOffIcon,
  WifiOffIcon,
} from "@/components/icons";

export type GuideTeaser = { slug: string; title: string; description: string };

const TRUST_ICONS = [CpuIcon, ShieldIcon, UserOffIcon, CodeIcon];

/**
 * Sous l'outil : pourquoi c'est sûr (la première inquiétude), comment ça
 * marche, ce que ça sait faire, questions fréquentes, guides, d'où ça vient.
 * Écrit pour des gens qui n'y connaissent rien : une idée par bloc, aucune
 * notion technique. Sur téléphone, masqué pendant les étapes 2 et 3 de
 * l'outil (data-tool-aside, voir globals.css).
 */
export default function Landing({ teasers }: { teasers: Record<Lang, GuideTeaser[]> }) {
  const { lang } = useLang();
  const l = SITE_COPY[lang].landing;
  const guides = teasers[lang].slice(0, 6);

  return (
    <div data-tool-aside className="mx-auto mt-20 flex w-full max-w-7xl flex-col gap-20 sm:mt-28 sm:gap-28">
      <section aria-labelledby="trust" className="rounded-3xl bg-encre px-6 py-12 text-white sm:px-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="trust" className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            {l.trustTitle}
          </h2>
          <p className="mt-4 text-pretty text-lg text-white/80">{l.trustLead}</p>
        </div>
        <ul className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {l.trust.map((item, i) => {
            const Icon = TRUST_ICONS[i] ?? ShieldIcon;
            return (
              <li key={item.title}>
                <Icon className="h-7 w-7 text-green-400" />
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-white/75 text-pretty">{item.body}</p>
              </li>
            );
          })}
        </ul>
        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-4 rounded-2xl bg-white/10 p-5 sm:p-6">
          <WifiOffIcon className="mt-0.5 h-7 w-7 shrink-0 text-green-400" />
          <div>
            <h3 className="font-semibold">{l.airplaneTitle}</h3>
            <p className="mt-1 text-white/80 text-pretty">{l.airplaneBody}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="how">
        <h2 id="how" className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {l.howTitle}
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {l.how.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-trait bg-feuille p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sceau text-base font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-encre-2 text-pretty">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="features">
        <h2 id="features" className="text-center text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          {l.featuresTitle}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {l.features.map((f) => (
            <li key={f.title} className="rounded-2xl border border-trait bg-feuille p-5">
              <h3 className="flex items-center gap-2 font-semibold">
                <span className="h-2 w-2 shrink-0 rounded-full bg-sceau" aria-hidden />
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm text-encre-2 text-pretty">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq" className="mx-auto w-full max-w-3xl">
        <h2 id="faq" className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {l.faqTitle}
        </h2>
        <div className="mt-8 flex flex-col gap-3">
          {l.faq.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-trait bg-feuille px-5 py-4 open:pb-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronIcon direction="right" className="h-4 w-4 shrink-0 text-encre-2 transition-transform group-open:rotate-90 rtl:group-open:-rotate-90" />
              </summary>
              <p className="mt-3 text-encre-2 text-pretty">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {guides.length > 0 && (
        <section aria-labelledby="guides">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="guides" className="text-2xl font-bold tracking-tight sm:text-3xl">
                {l.guidesTitle}
              </h2>
              <p className="mt-2 text-encre-2">{l.guidesLead}</p>
            </div>
            <Link href={`/${lang}/guides`} className="inline-flex items-center gap-1 font-medium text-bleu hover:underline">
              {l.guidesAll}
              <ChevronIcon direction="right" className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/${lang}/guides/${g.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-trait bg-feuille p-5 transition-colors hover:border-bleu focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
                >
                  <span className="font-semibold text-encre text-pretty">{g.title}</span>
                  <span className="mt-2 line-clamp-3 text-sm text-encre-2">{g.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        aria-labelledby="origin"
        className="grid items-center gap-6 rounded-3xl border border-trait bg-feuille p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10 sm:p-10"
      >
        <Flag className="h-14 w-20 rounded-md border border-trait" />
        <div>
          <h2 id="origin" className="text-2xl font-bold tracking-tight">
            {l.originTitle}
          </h2>
          <p className="mt-3 text-encre-2 text-pretty">{l.originBody}</p>
          <p className="mt-3 text-encre">
            {l.originBy}{" "}
            <AuthorLink className="font-medium text-bleu underline underline-offset-2 hover:no-underline" />
            {" · "}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-bleu underline underline-offset-2 hover:no-underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </section>

      <section
        aria-labelledby="support"
        className="mx-auto flex w-full max-w-3xl flex-col items-center rounded-3xl border border-trait bg-feuille p-6 text-center sm:p-10"
      >
        <HeartIcon className="h-8 w-8 text-sceau" />
        <h2 id="support" className="mt-3 text-2xl font-bold tracking-tight">
          {l.supportTitle}
        </h2>
        <p className="mt-3 text-encre-2 text-pretty">{l.supportBody}</p>
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-sceau px-6 py-3 font-semibold text-sceau transition-colors hover:bg-sceau hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sceau focus-visible:ring-offset-2"
        >
          <HeartIcon className="h-4 w-4 shrink-0" />
          {l.supportCta}
        </a>
        <p className="mt-3 text-sm text-encre-2">{l.supportNote}</p>
      </section>

      <div className="flex justify-center">
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-xl bg-sceau px-6 py-3 font-semibold text-white transition-colors hover:bg-sceau-fonce focus:outline-none focus-visible:ring-2 focus-visible:ring-sceau focus-visible:ring-offset-2"
        >
          {l.backToTop}
          <ChevronIcon direction="right" className="h-4 w-4 -rotate-90 rtl:rotate-90" />
        </a>
      </div>
    </div>
  );
}
