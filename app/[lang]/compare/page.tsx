import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { ChevronIcon } from "@/components/icons";
import { BRAND } from "@/lib/brand";
import { compareIndexPath, comparePath, COMPARISONS } from "@/lib/compare";
import { guidesIndexPath } from "@/lib/guides";
import { SITE_COPY } from "@/lib/site-copy";
import { COMPARE_META, LANG_CODES, pageAlternates, SITE_META, SITE_URL, type Lang, ogImage } from "@/lib/site-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = COMPARE_META[lang];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: compareIndexPath(lang), languages: pageAlternates("/compare") },
    openGraph: {
      images: [ogImage(lang)],
      type: "website",
      siteName: BRAND,
      locale: SITE_META[lang].ogLocale,
      url: `${SITE_URL}${compareIndexPath(lang)}`,
      title: m.title,
      description: m.description,
    },
  };
}

export default async function CompareIndex({ params }: Props) {
  const { lang } = await params;
  const c = SITE_COPY[lang];
  const ui = c.compareUi;
  const links = Object.fromEntries(LANG_CODES.map((l) => [l, compareIndexPath(l)])) as Record<Lang, string>;
  return (
    <ContentPage lang={lang} current="compare" links={links}>
      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{ui.title}</h1>
      <p className="mt-4 text-pretty text-xl text-encre-2">{ui.lead}</p>
      <ul className="mt-10 grid gap-4">
        {COMPARISONS[lang].map((x) => (
          <li key={x.slug}>
            <Link
              href={comparePath(lang, x.slug)}
              className="group flex flex-col rounded-2xl border border-trait bg-feuille p-5 transition-colors hover:border-bleu focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu sm:p-6"
            >
              <span className="text-lg font-semibold text-pretty">{x.title}</span>
              <span className="mt-2 text-encre-2 text-pretty">{x.description}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-bleu">
                {ui.read}
                <ChevronIcon direction="right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-encre-2 text-pretty">{ui.disclosure}</p>
      <p className="mt-6">
        <Link href={guidesIndexPath(lang)} className="inline-flex items-center gap-1 font-medium text-bleu hover:underline">
          {c.guidesUi.title}
          <ChevronIcon direction="right" className="h-4 w-4" />
        </Link>
      </p>
    </ContentPage>
  );
}
