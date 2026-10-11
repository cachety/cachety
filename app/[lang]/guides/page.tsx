import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { ChevronIcon } from "@/components/icons";
import { BRAND } from "@/lib/brand";
import { GUIDES, guidePath, guidesIndexPath } from "@/lib/guides";
import { SITE_COPY } from "@/lib/site-copy";
import { GUIDES_META, LANG_CODES, pageAlternates, SITE_META, SITE_URL, type Lang } from "@/lib/site-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = GUIDES_META[lang];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: guidesIndexPath(lang), languages: pageAlternates("/guides") },
    openGraph: {
      type: "website",
      siteName: BRAND,
      locale: SITE_META[lang].ogLocale,
      url: `${SITE_URL}${guidesIndexPath(lang)}`,
      title: m.title,
      description: m.description,
    },
  };
}

export default async function GuidesIndex({ params }: Props) {
  const { lang } = await params;
  const ui = SITE_COPY[lang].guidesUi;
  const links = Object.fromEntries(LANG_CODES.map((l) => [l, guidesIndexPath(l)])) as Record<Lang, string>;
  return (
    <ContentPage lang={lang} current="guides" links={links}>
      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{ui.title}</h1>
      <p className="mt-4 text-pretty text-xl text-encre-2">{ui.lead}</p>
      <ul className="mt-10 grid gap-4">
        {GUIDES[lang].map((g) => (
          <li key={g.slug}>
            <Link
              href={guidePath(lang, g.slug)}
              className="group flex flex-col rounded-2xl border border-trait bg-feuille p-5 transition-colors hover:border-bleu focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu sm:p-6"
            >
              <span className="text-lg font-semibold text-pretty">{g.title}</span>
              <span className="mt-2 text-encre-2 text-pretty">{g.description}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-bleu">
                {ui.read}
                <ChevronIcon direction="right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10">
        <Link href={`/${lang}/compare`} className="inline-flex items-center gap-1 font-medium text-bleu hover:underline">
          {SITE_COPY[lang].compareUi.title}
          <ChevronIcon direction="right" className="h-4 w-4" />
        </Link>
      </p>
    </ContentPage>
  );
}
