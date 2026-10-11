import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import Prose from "@/components/Prose";
import GuideBody from "@/components/GuideBody";
import { ChevronIcon } from "@/components/icons";
import { BRAND } from "@/lib/brand";
import { findGuide, GUIDES, guideAlternates, guidePath, relatedGuides } from "@/lib/guides";
import { SITE_COPY } from "@/lib/site-copy";
import { LANG_CODES, SITE_META, SITE_URL, type Lang, ogImage } from "@/lib/site-meta";

// Export statique : seuls les guides déclarés dans lib/guides existent.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.flatMap((lang) => GUIDES[lang].map((g) => ({ lang, slug: g.slug })));
}

type Props = { params: Promise<{ lang: Lang; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const g = findGuide(lang, slug)!;
  const path = guidePath(lang, slug);
  return {
    title: `${g.metaTitle} | ${BRAND}`,
    description: g.description,
    alternates: { canonical: path, languages: guideAlternates(lang, g) },
    openGraph: {
      images: [ogImage(lang)],
      type: "article",
      siteName: BRAND,
      locale: SITE_META[lang].ogLocale,
      url: `${SITE_URL}${path}`,
      title: g.title,
      description: g.description,
      modifiedTime: g.updated,
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

export default async function GuidePage({ params }: Props) {
  const { lang, slug } = await params;
  const g = findGuide(lang, slug)!;
  const ui = SITE_COPY[lang].guidesUi;
  const updated = new Date(`${g.updated}T12:00:00Z`).toLocaleDateString(LOCALE[lang], { dateStyle: "long" });
  const related = relatedGuides(lang, g);
  // Changer de langue : le guide équivalent s'il existe, sinon la liste des guides.
  const links = Object.fromEntries(
    LANG_CODES.map((l) => [l, guideAlternates(lang, g)[l] ?? `/${l}/guides`])
  ) as Record<Lang, string>;

  return (
    <ContentPage lang={lang} current="guides" links={links}>
      <nav aria-label="Breadcrumb" className="text-sm text-encre-2">
        <Link href={`/${lang}/guides`} className="inline-flex items-center gap-1 hover:text-encre">
          <ChevronIcon direction="left" className="h-3.5 w-3.5" />
          {ui.allGuides}
        </Link>
      </nav>

      <article className="mt-4">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{g.title}</h1>
        <p className="mt-2 text-sm text-encre-2">{ui.updated(updated)}</p>
        <p className="mt-5 text-pretty text-xl text-encre-2"><Prose text={g.intro} /></p>

        <figure className="motif-filigrane mt-8 rounded-2xl border-2 border-dashed border-sceau/40 bg-feuille px-5 py-6 text-center">
          <figcaption className="text-xs font-semibold uppercase tracking-wider text-encre-2">{ui.example}</figcaption>
          <p className="mt-2 break-words font-mono text-lg rtl:font-sans font-semibold text-sceau-fonce">{g.example}</p>
        </figure>

        <div className="mt-10">
          <GuideBody blocks={g.body} />
        </div>

        <aside className="mt-12 flex flex-col items-start gap-3 rounded-2xl bg-encre p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-pretty text-white/85">{ui.ctaNote}</p>
          <Link
            href={`/${lang}`}
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-sceau px-6 py-3 font-semibold text-white transition-colors hover:bg-sceau-fonce focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {ui.cta}
            <ChevronIcon direction="right" className="h-4 w-4" />
          </Link>
        </aside>

        <section aria-labelledby="faq" className="mt-14">
          <h2 id="faq" className="text-2xl font-bold tracking-tight">
            {ui.faqTitle}
          </h2>
          <dl className="mt-6 flex flex-col gap-6">
            {g.faq.map((f) => (
              <div key={f.q}>
                <dt className="text-lg font-semibold text-pretty">{f.q}</dt>
                <dd className="mt-1.5 text-lg leading-relaxed text-encre-2 text-pretty"><Prose text={f.a} /></dd>
              </div>
            ))}
          </dl>
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
                  href={guidePath(lang, r.slug)}
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
