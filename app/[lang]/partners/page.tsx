import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { EmbedBuilder } from "@/components/EmbedBuilder";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { HeartIcon, ShieldIcon } from "@/components/icons";
import { BRAND, DONATE_URL, REPO_URL } from "@/lib/brand";
import { PARTNERS_COPY } from "@/lib/partners-copy";
import { LANG_CODES, ogImage, pageAlternates, pageTitle, SITE_META, SITE_URL, type Lang } from "@/lib/site-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = PARTNERS_COPY[lang].meta;
  return {
    title: pageTitle(m.title),
    description: m.description,
    alternates: { canonical: `/${lang}/partners`, languages: pageAlternates("/partners") },
    openGraph: {
      images: [ogImage(lang)],
      type: "website",
      siteName: BRAND,
      locale: SITE_META[lang].ogLocale,
      url: `${SITE_URL}/${lang}/partners`,
      title: m.title,
      description: m.description,
    },
  };
}

export default async function PartnersPage({ params }: Props) {
  const { lang } = await params;
  const c = PARTNERS_COPY[lang];
  const links = Object.fromEntries(LANG_CODES.map((l) => [l, `/${l}/partners`])) as Record<Lang, string>;
  return (
    <ContentPage lang={lang} links={links}>
      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{c.title}</h1>
      <p className="mt-5 text-pretty text-xl text-encre-2">{c.lead}</p>

      <section aria-labelledby="partners-privacy" className="mt-10 rounded-2xl border border-green-700/25 bg-green-700/5 p-6">
        <h2 id="partners-privacy" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <ShieldIcon className="h-6 w-6 text-green-700" />
          {c.privacyTitle}
        </h2>
        <ul className="mt-4 flex flex-col gap-2.5">
          {c.privacy.map((t) => (
            <li key={t} className="flex gap-3 text-lg leading-relaxed">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" aria-hidden />
              <span className="text-pretty">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="partners-code" className="mt-12">
        <h2 id="partners-code" className="text-2xl font-bold tracking-tight">
          {c.codeTitle}
        </h2>
        <p className="mt-2 mb-6 text-encre-2">{c.codeLead}</p>
        <EmbedBuilder lang={lang} />
      </section>

      <section aria-labelledby="partners-wording" className="mt-12">
        <h2 id="partners-wording" className="text-2xl font-bold tracking-tight">
          {c.wordingTitle}
        </h2>
        <p className="mt-2 text-encre-2">{c.wordingLead}</p>
        <blockquote className="mt-3 rounded-2xl border border-trait bg-feuille p-4 text-lg">{c.wording}</blockquote>
      </section>

      <section aria-labelledby="partners-join" className="mt-12">
        <h2 id="partners-join" className="text-2xl font-bold tracking-tight">
          {c.joinTitle}
        </h2>
        <ol className="mt-4 flex flex-col gap-3">
          {c.join.map((t, i) => (
            <li key={t} className="flex gap-3 text-lg">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-encre/10 text-sm font-bold">
                {i + 1}
              </span>
              <span className="text-pretty">{t}</span>
            </li>
          ))}
        </ol>
        <a
          href={`${REPO_URL}/issues/new?template=partner.yml`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-xl bg-sceau px-6 py-3 font-semibold text-white transition-colors hover:bg-sceau-fonce"
        >
          {c.joinCta}
        </a>
      </section>

      <section aria-labelledby="partners-free" className="mt-12 rounded-2xl border border-trait bg-feuille p-6">
        <h2 id="partners-free" className="text-xl font-bold tracking-tight">
          {c.freeTitle}
        </h2>
        <p className="mt-2 text-pretty text-encre-2">{c.free}</p>
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-sceau/40 px-4 py-2 font-medium text-sceau hover:bg-sceau/5"
        >
          <HeartIcon className="h-4 w-4" />
          {c.donateCta}
        </a>
      </section>

      <PartnerMarquee label={c.usedBy} />
    </ContentPage>
  );
}
