"use client";

import Link from "next/link";
import { exampleStamp, useT } from "@/lib/i18n";
import LangToggle from "@/components/LangToggle";
import { SpecimenCard, WatermarkLayer } from "@/components/SpecimenCard";
import { CheckIcon, ChevronIcon, CloseIcon, Flag } from "@/components/icons";

export default function About() {
  const t = useT();
  const a = t.about;
  return (
    <>
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3 py-5">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Flag className="h-5 w-7 shrink-0 rounded-sm border border-trait" />
          <span className="truncate text-lg font-bold tracking-tight">Filigrane Local</span>
        </Link>
        <div className="flex shrink-0 items-center gap-3">
          {/* Même pastille que dans l'en-tête de l'outil : la navigation entre
              les deux pages est un seul et même objet. */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full border border-trait bg-feuille px-3.5 py-1.5 text-sm font-medium text-bleu transition-colors hover:border-bleu focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
          >
            {a.navTool}
            <ChevronIcon direction="right" className="h-3.5 w-3.5" />
          </Link>
          <LangToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 pb-4">
        <h1 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {a.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-encre-2 text-pretty">{a.lead}</p>

        {/* Le cœur de la page : ce qu'une copie permet, avec et sans filigrane.
            Les étiquettes disent le risque mieux qu'un paragraphe. */}
        <section className="mt-12 grid gap-8 sm:grid-cols-2">
          <figure>
            <SpecimenCard title={a.specimenCard} specimen={a.specimen} />
            <figcaption className="mt-4">
              <span className="flex items-center gap-2 font-semibold">
                <span className="h-2 w-2 rounded-full bg-sceau" aria-hidden />
                {a.exBadLabel}
              </span>
              <span className="mt-1 block text-sm text-encre-2">{a.exBadBody}</span>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {a.misuse.map((m) => (
                  <li
                    key={m}
                    className="inline-flex items-center gap-1.5 rounded-full bg-sceau/10 px-2.5 py-1 text-sm text-sceau-fonce"
                  >
                    <CloseIcon className="h-3 w-3 shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>

          <figure>
            <SpecimenCard title={a.specimenCard} specimen={a.specimen}>
              <WatermarkLayer text={exampleStamp(t)} />
            </SpecimenCard>
            <figcaption className="mt-4">
              <span className="flex items-center gap-2 font-semibold">
                <span className="h-2 w-2 rounded-full bg-green-600" aria-hidden />
                {a.exGoodLabel}
              </span>
              <span className="mt-1 block text-sm text-encre-2">{a.exGoodBody}</span>
              <ul className="mt-3">
                <li className="inline-flex items-center gap-1.5 rounded-full bg-green-700/10 px-2.5 py-1 text-sm text-green-800">
                  <CheckIcon className="h-3 w-3 shrink-0" />
                  {a.onlyUse}
                </li>
              </ul>
            </figcaption>
          </figure>
        </section>

        {/* Anatomie du filigrane : chaque segment de l'exemple, décomposé. */}
        <section className="mt-16">
          <h2 className="text-xl font-bold tracking-tight">{a.whatTitle}</h2>
          <p className="mt-2 max-w-2xl text-encre-2 text-pretty">{a.whatLead}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-5">
            {a.what.map((w) => (
              <div key={w.title}>
                {/* Le segment tel qu'il apparaît sur le document : même police
                    à chasse fixe et même rouge que le filigrane réel. Un
                    troisième coloris n'apporterait rien : chaque segment est
                    déjà collé à son explication (et le vert veut dire « prêt »
                    ailleurs dans l'outil). */}
                <p className="font-mono text-sm uppercase tracking-wide text-encre">
                  {w.part}
                </p>
                <span className="mt-2 block h-0.5 w-full rounded-full bg-sceau/70" aria-hidden />
                <h3 className="mt-3 font-semibold">{w.title}</h3>
                <p className="mt-1 text-sm text-encre-2 text-pretty">{w.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-encre-2">{a.source}</p>
        </section>

        {/* Une seule action, à sa place : en fin de lecture. Pas de pavé ni de
            promesse (« ça prend dix secondes ») : le bouton dit ce qu'il fait. */}
        <div className="mt-14 flex flex-col items-start gap-3 border-t border-trait pt-8 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-sceau px-6 py-3 font-semibold text-white transition-colors hover:bg-sceau-fonce focus:outline-none focus-visible:ring-2 focus-visible:ring-sceau focus-visible:ring-offset-2"
          >
            {a.backToTool}
            <ChevronIcon direction="right" className="h-4 w-4 shrink-0" />
          </Link>
          <span className="text-sm text-encre-2">{a.ctaNote}</span>
        </div>
      </main>
    </>
  );
}
