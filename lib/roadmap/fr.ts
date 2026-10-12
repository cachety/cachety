import type { RoadmapCopy, RoadmapId, Text } from "./types";

const ITEMS: Record<RoadmapId, Text> = {
  "per-recipient-password": {
    title: "Un mot de passe différent par destinataire",
    body: "La copie de chaque destinataire verrouillée avec son propre mot de passe, listé avec les codes après le téléchargement. Un mot de passe divulgué n'ouvre alors qu'une seule copie.",
  },
  "suggested-areas": {
    title: "Zones à masquer suggérées",
    body: "Cachety repère les numéros de compte, numéros de pièce d'identité et informations du même genre sur la page, et propose de les masquer. La détection se fait sur votre appareil, comme tout le reste.",
  },
  "more-languages": {
    title: "D'autres langues",
    body: "Italien, coréen et turc.",
  },
  "purpose-from-recipient": {
    title: "Un motif suggéré selon le destinataire",
    body: "Saisir le destinataire, par exemple une agence immobilière, pourrait suggérer le motif correspondant.",
  },
  "local-word-lists": {
    title: "Des mots de passe lisibles dans votre langue",
    body: "Des mots de passe composés de mots de votre langue, en lettres simples pour se taper de la même façon sur tous les claviers.",
  },
  "simpler-tool": {
    title: "Un outil plus simple",
    body: "Trois étapes en mots simples : votre document, son usage et son destinataire, puis l'aperçu et le téléchargement. Chaque option avancée reste à portée de main.",
  },
  "easy-passwords": {
    title: "Des mots de passe faciles à lire",
    body: "Verrouiller un fichier crée désormais un mot de passe de 12 mots aléatoires, aussi solide qu'une phrase de récupération de portefeuille crypto.",
  },
};

const COPY: RoadmapCopy = {
  nav: "Feuille de route",
  title: "Ce qui arrive",
  lead: "Ce sur quoi nous travaillons ensuite, et les idées à l'étude. Cachety reste gratuit, libre, et sur votre appareil.",
  next: "Prochainement",
  idea: "Idées à l'étude",
  shipped: "Ajouté récemment",
  suggest: "Proposer une idée",
  suggestBody: "Il vous manque quelque chose ? Ouvrez un ticket sur GitHub. Les idées sont bienvenues dans toutes les langues.",
  meta: {
    title: "Feuille de route : ce qui arrive sur Cachety",
    description: "Les prochaines fonctionnalités de Cachety, l'outil gratuit de filigrane qui garde vos documents sur votre appareil : à venir, idées, et nouveautés récentes.",
  },
};

export default { items: ITEMS, copy: COPY };
