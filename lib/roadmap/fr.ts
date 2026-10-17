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
  "remember-signature": {
    title: "Retenir ma signature sur cet appareil",
    body: "Un choix facultatif pour garder votre signature sur cet appareil, avec une phrase claire sur ce qui est conservé et un bouton pour l'effacer. Aujourd'hui, elle n'est jamais enregistrée.",
  },
  "keep-vector-pages": {
    title: "Garder le texte des PDF signés",
    body: "Une option pour signer sans reconstruire les pages à partir des pixels, afin que le texte reste sélectionnable. Elle aurait son propre nettoyage des données cachées.",
  },
  "sign-embed": {
    title: "La signature sur les sites partenaires",
    body: "Les sites approuvés pourraient afficher l'outil de signature dans leurs pages, avec le lieu et la mention déjà remplis. Les documents resteraient sur l'appareil du visiteur.",
  },
  "sign": {
    title: "Signer un document",
    body: "Dessinez, tapez ou importez votre signature, posez-la sur un PDF ou une photo, et téléchargez un PDF signé. Comme pour le filigrane, rien n'est envoyé.",
  },
  "simpler-tool": {
    title: "Un outil plus simple",
    body: "Trois étapes en mots simples : votre document, son usage et son destinataire, puis l'aperçu et le téléchargement. Chaque option avancée reste à portée de main.",
  },
  "easy-passwords": {
    title: "Des mots de passe faciles à lire",
    body: "Verrouiller un fichier crée désormais un mot de passe de 12 mots aléatoires, aussi solide qu'une phrase de récupération de portefeuille crypto.",
  },
  "partner-embed": {
    title: "Cachety sur des sites partenaires",
    body: "Les sites approuvés peuvent afficher l'outil dans leurs propres pages. Il fonctionne toujours sur cachety.com : les documents restent sur l'appareil du visiteur, hors de portée du site qui l'accueille.",
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
