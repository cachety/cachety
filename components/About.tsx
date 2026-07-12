"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import LangToggle from "@/components/LangToggle";
import { SpecimenCard, WatermarkLayer } from "@/components/SpecimenCard";
import { Flag } from "@/components/icons";

export default function About() {
  const t = useT();
  const a = t.about;
  return (
    <>
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 py-5">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Flag className="h-5 w-7 shrink-0 rounded-sm border border-trait" />
          <span className="truncate text-lg font-bold tracking-tight">Filigrane Local</span>
        </Link>
        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/"
            className="text-sm text-bleu underline underline-offset-4 hover:no-underline"
          >
            {a.navTool}
          </Link>
          <LangToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl pb-4">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {a.title}
        </h1>
        <p className="mt-4 text-lg text-encre-2 text-pretty">{a.lead}</p>

        <section className="mt-8 border-l-2 border-sceau pl-5">
          <h2 className="font-semibold">{a.riskTitle}</h2>
          <p className="mt-1 text-encre-2 text-pretty">{a.riskBody}</p>
        </section>

        {/* Le cœur de la page : la démonstration remplace le discours. */}
        <section className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">{a.exampleTitle}</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <figure>
              <SpecimenCard title={a.specimenCard} specimen={a.specimen} />
              <figcaption className="mt-3">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="h-2 w-2 rounded-full bg-sceau" aria-hidden />
                  {a.exBadLabel}
                </span>
                <span className="mt-1 block text-sm text-encre-2">{a.exBadBody}</span>
              </figcaption>
            </figure>
            <figure>
              <SpecimenCard title={a.specimenCard} specimen={a.specimen}>
                <WatermarkLayer text={a.exStamp} />
              </SpecimenCard>
              <figcaption className="mt-3">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="h-2 w-2 rounded-full bg-green-600" aria-hidden />
                  {a.exGoodLabel}
                </span>
                <span className="mt-1 block text-sm text-encre-2">{a.exGoodBody}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* La seule chose que le lecteur doit retenir pour agir. */}
        <section className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">{a.whatTitle}</h2>
          <p className="mt-2 text-encre-2 text-pretty">{a.whatLead}</p>
          <dl className="mt-5 divide-y divide-trait border-y border-trait">
            {a.what.map((w) => (
              <div key={w.title} className="grid gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                <dt className="font-semibold">{w.title}</dt>
                <dd className="text-encre-2 text-pretty">{w.body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-encre-2">{a.source}</p>
        </section>

        <p className="mt-12">
          <Link
            href="/"
            className="text-bleu underline underline-offset-4 hover:no-underline"
          >
            {a.backToTool}
          </Link>
        </p>
      </main>
    </>
  );
}
