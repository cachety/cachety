import { AUTHOR } from "@/lib/brand";

/**
 * Nom de l'auteur, lié à son site. Seule exception à « noreferrer » : le lien
 * transmet l'origine (« https://cachety.com », jamais un chemin ni une
 * requête), pour que le site de l'auteur voie d'où viennent ses visiteurs.
 * Aucune donnée d'utilisateur n'est jamais dans une URL de Cachety.
 */
export default function AuthorLink({ className }: { className?: string }) {
  return (
    <a href={AUTHOR.url} rel="author" referrerPolicy="origin" className={className}>
      {AUTHOR.name}
    </a>
  );
}
