import { Fragment } from "react";
import { AUTHOR } from "@/lib/brand";
import AuthorLink from "@/components/AuthorLink";

/**
 * Texte brut d'un guide ou d'une comparaison. React échappe tout ; seule
 * transformation : chaque mention du nom de l'auteur devient un lien vers
 * son site.
 */
export default function Prose({ text }: { text: string }) {
  const parts = text.split(AUTHOR.name);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <AuthorLink className="text-bleu underline underline-offset-2 hover:no-underline" />}
      {part}
    </Fragment>
  ));
}
