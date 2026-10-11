import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import GuideBody from "@/components/GuideBody";
import Prose from "@/components/Prose";
import { CheckIcon, ChevronIcon } from "@/components/icons";
import { BRAND } from "@/lib/brand";
import {
  compareIndexPath,
  comparePath,
  comparisonAlternates,
  COMPARISONS,
  findComparison,
  relatedComparisons,
  type CompareRow,
} from "@/lib/compare";
import { SITE_COPY } from "@/lib/site-copy";
import { LANG_CODES, SITE_META, SITE_URL, type Lang } from "@/lib/site-meta";

// Export statique : seuls les comparatifs déclarés dans lib/compare existent.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.flatMap((lang) => COMPARISONS[lang].map((c) => ({ lang, slug: c.slug })));
}

type Props = { params: Promise<{ lang: Lang; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = findComparison(lang, slug)!;
  const path = comparePath(lang, slug);
  return {
    title: `${c.metaTitle} | ${BRAND}`,
    description: c.description,
    alternates: { canonical: path, languages: comparisonAlternates(lang, c) },
    openGraph: {
      type: "article",
      siteName: BRAND,
      locale: SITE_META[lang].ogLocale,
      url: `${SITE_URL}${path}`,
      title: c.title,
      description: c.description,
      modifiedTime: c.updated,
    },
  };
}

const LOCALE: Record<Lang, string> = {
  fr: "fr-FR",
  en: "en-GB",
  ja: "ja-JP",
  zh: "zh-CN",
  es: "es-ES",
  ar: "ar-u-nu-latn",
  fa: "fa-IR",
};

const day = (iso: string, lang: Lang) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(LOCALE[lang], { dateStyle: "long" });

/** Cellule du tableau : sur téléphone, chaque ligne devient une carte à deux colonnes étiquetées. */
function Cell({ label, text, wins, winLabel }: { label: string; text: string; wins: boolean; winLabel: string }) {
  return (
    <td className={`block px-4 py-3 align-top sm:table-cell ${wins ? "bg-green-700/5" : ""}`}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-encre-2 sm:hidden">{label}</span>
      <span className="text-pretty">{text}</span>
      {wins && (
        <span className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-green-800">
          <CheckIcon className="h-3.5 w-3.5 shrink-0" />
          {winLabel}
        </span>
      )}
    </td>
  );
}

export default async function ComparePage({ params }: Props) {
  const { lang, slug } = await params;
  const c = findComparison(lang, slug)!;
  const copy = SITE_COPY[lang];
  const ui = copy.compareUi;
  const g = copy.guidesUi;
  const related = relatedComparisons(lang, c);
  const links = Object.fromEntries(
    LANG_CODES.map((l) => [l, comparisonAlternates(lang, c)[l] ?? compareIndexPath(l)])
  ) as Record<Lang, string>;

  return (
    <ContentPage lang={lang} current="compare" links={links}>
      <nav aria-label="Breadcrumb" className="text-sm text-encre-2">
        <Link href={compareIndexPath(lang)} className="inline-flex items-center gap-1 hover:text-encre">
          <ChevronIcon direction="left" className="h-3.5 w-3.5" />
          {ui.allComparisons}
        </Link>
      </nav>

      <article className="mt-4">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{c.title}</h1>
        <p className="mt-2 text-sm text-encre-2">{g.updated(day(c.updated, lang))}</p>
        <p className="mt-5 text-pretty text-xl text-encre-2">
          <Prose text={c.intro} />
        </p>

        <section aria-labelledby="verdict" className="mt-8 rounded-2xl border-2 border-bleu/25 bg-bleu/5 px-5 py-5 sm:px-6">
          <h2 id="verdict" className="text-sm font-semibold uppercase tracking-wide text-bleu">
            {ui.verdictTitle}
          </h2>
          <p className="mt-2 text-lg leading-relaxed text-pretty">
            <Prose text={c.verdict} />
          </p>
        </section>

        <section aria-labelledby="table" className="mt-12">
          <h2 id="table" className="text-2xl font-bold tracking-tight">
            {ui.tableTitle}
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-trait bg-feuille">
            <table className="w-full border-collapse text-start text-base">
              <thead className="hidden bg-encre/5 text-sm sm:table-header-group">
                <tr>
                  <th scope="col" className="w-1/4 px-4 py-3 text-start font-semibold">
                    {ui.criterion}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {BRAND}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {c.competitorName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.table.map((r: CompareRow) => (
                  <tr key={r.criterion} className="block border-t border-trait first:border-t-0 sm:table-row sm:first:border-t">
                    <th scope="row" className="block bg-encre/5 px-4 py-2.5 text-start font-semibold sm:table-cell sm:bg-transparent sm:align-top">
                      {r.criterion}
                    </th>
                    <Cell label={BRAND} text={r.cachety} wins={r.edge === "cachety"} winLabel={ui.edgeCachety} />
                    <Cell
                      label={c.competitorName}
                      text={r.other}
                      wins={r.edge === "other"}
                      winLabel={ui.edgeOther(c.competitorName)}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-12">
          <GuideBody blocks={c.body} />
        </div>

        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          {[
            { title: ui.chooseOther(c.competitorName), items: c.chooseOther, tone: "border-trait bg-feuille" },
            { title: ui.chooseCachety, items: c.chooseCachety, tone: "border-sceau/30 bg-sceau/5" },
          ].map((box) => (
            <div key={box.title} className={`rounded-2xl border p-5 ${box.tone}`}>
              <h2 className="text-lg font-bold text-balance">{box.title}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {box.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-pretty">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-encre-2" aria-hidden />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <aside className="mt-12 flex flex-col items-start gap-3 rounded-2xl bg-encre p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-pretty text-white/85">{g.ctaNote}</p>
          <Link
            href={`/${lang}`}
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-sceau px-6 py-3 font-semibold text-white transition-colors hover:bg-sceau-fonce focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {g.cta}
            <ChevronIcon direction="right" className="h-4 w-4" />
          </Link>
        </aside>

        <section aria-labelledby="faq" className="mt-14">
          <h2 id="faq" className="text-2xl font-bold tracking-tight">
            {g.faqTitle}
          </h2>
          <dl className="mt-6 flex flex-col gap-6">
            {c.faq.map((f) => (
              <div key={f.q}>
                <dt className="text-lg font-semibold text-pretty">{f.q}</dt>
                <dd className="mt-1.5 text-lg leading-relaxed text-encre-2 text-pretty">
                  <Prose text={f.a} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="sources" className="mt-14 border-t border-trait pt-8 text-sm text-encre-2">
          <h2 id="sources" className="text-base font-bold text-encre">
            {ui.sourcesTitle}
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            {c.sources.map((s) => (
              <li key={s.url} className="break-words">
                {/* nofollow : une source, pas une recommandation. */}
                <a href={s.url} target="_blank" rel="nofollow noopener noreferrer" className="text-bleu underline underline-offset-2 hover:no-underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-pretty">{ui.checked(day(c.checked, lang))}</p>
          <p className="mt-2 text-pretty">{ui.disclosure}</p>
        </section>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-16 border-t border-trait pt-10">
          <h2 id="related" className="text-xl font-bold tracking-tight">
            {ui.related}
          </h2>
          <ul className="mt-5 grid gap-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={comparePath(lang, r.slug)}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-trait bg-feuille px-5 py-4 transition-colors hover:border-bleu"
                >
                  <span className="font-medium text-pretty">{r.title}</span>
                  <ChevronIcon direction="right" className="h-4 w-4 shrink-0 text-encre-2" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </ContentPage>
  );
}
