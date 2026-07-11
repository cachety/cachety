"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import LangToggle from "@/components/LangToggle";
import { SpecimenCard, WatermarkLayer } from "@/components/SpecimenCard";
import { CheckIcon, Flag, ShieldIcon } from "@/components/icons";

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
            className="text-sm text-encre-2 underline-offset-4 transition-colors hover:text-encre hover:underline"
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

        <section className="mt-10 rounded-xl border-l-4 border-sceau bg-feuille p-5">
          <h2 className="text-lg font-semibold">{a.riskTitle}</h2>
          <p className="mt-2 text-encre-2 text-pretty">{a.riskBody}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">{a.exampleTitle}</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <figure>
              <SpecimenCard specimen={a.specimen} />
              <figcaption className="mt-3">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="h-2 w-2 rounded-full bg-sceau" aria-hidden />
                  {a.exBadLabel}
                </span>
                <span className="mt-1 block text-sm text-encre-2">{a.exBadBody}</span>
              </figcaption>
            </figure>
            <figure>
              <SpecimenCard specimen={a.specimen}>
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

        <section className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">{a.howTitle}</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {a.how.map((h) => (
              <li key={h.title} className="rounded-xl border border-trait bg-feuille p-4">
                <CheckIcon className="h-5 w-5 text-green-600" />
                <h3 className="mt-2 font-semibold">{h.title}</h3>
                <p className="mt-1 text-sm text-encre-2 text-pretty">{h.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 flex items-start gap-2.5 text-sm text-encre-2 text-pretty">
          <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />
          {a.note}
        </p>

        <section className="mt-12 rounded-2xl border border-trait bg-feuille p-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">{a.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-encre-2 text-pretty">{a.ctaBody}</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-sceau px-6 py-3 font-semibold text-white transition-colors hover:bg-sceau-fonce"
          >
            {a.ctaButton}
          </Link>
        </section>
      </main>
    </>
  );
}
