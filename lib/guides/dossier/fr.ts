// Guides de l'outil Dossier (fr) : fusionner des PDF, passer de photos à un
// PDF, ranger et tourner les pages, retirer les données cachées. Chaque entrée
// porte tool: "dossier". Écrits pour un public en France. Texte brut
// uniquement : pas de lien, pas de balise, pas de markdown.
//
// Ces guides décrivent l'outil Dossier (docs/prd-dossier.md), périmètre « Must »
// seulement : pas de sections, pas de redressement des photos, pas de taille
// libre. À publier avec l'outil, pas avant, en revérifiant alors les étapes et
// le libellé cité (« Un seul PDF ») dans l'interface livrée.

import type { Guide } from "../types";

const UPDATED = "2026-11-18";

/** Adresse de l'outil, écrite sans schéma (les guides ne portent aucun lien). */
const TOOL = "cachety.com/fr/dossier";

const NOT_UPLOADED =
  "Cachety fonctionne dans votre navigateur. Il n’existe aucun serveur qui recevrait vos fichiers, et la page interdit à votre navigateur de contacter un autre site. Vérifiez-le vous-même : chargez la page, passez en mode avion, et tout continue de fonctionner. C’est gratuit, sans compte, et le code est open source.";

const PIXELS =
  "Pour retirer les données cachées, Cachety reconstruit chaque page en image. Dans le nouveau PDF, le texte ne peut donc plus être sélectionné et on ne peut plus y faire de recherche. Un PDF qui ne contenait que du texte peut aussi ressortir plus lourd que l’original. Vos fichiers d’origine ne sont pas modifiés : gardez-les.";

export const DOSSIER_GUIDES_FR: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "fusionner-pdf-sans-les-envoyer",
    topic: "merge",
    tool: "dossier",
    title: "Fusionner plusieurs PDF en un seul, sans les envoyer en ligne",
    metaTitle: "Fusionner des PDF sans les envoyer en ligne, gratuit",
    description:
      "Réunissez PDF et photos en un seul PDF, dans votre navigateur. Rangez les pages, restez sous la taille maximale : rien n’est envoyé. Gratuit, sans compte.",
    intro:
      "« Merci d’envoyer le tout en un seul PDF. » La plupart des outils gratuits qui fusionnent des PDF commencent par envoyer vos fichiers sur leurs serveurs. Quand il s’agit de votre pièce d’identité, de vos fiches de paie et de vos relevés de compte, il y a une autre solution : le faire sur votre propre appareil.",
    example: "Dossier de location – Agence Roussel – 18/11/2026",
    body: [
      { type: "h2", text: "Fusionner en ligne n’est pas anodin" },
      {
        type: "p",
        text: "Les documents qu’on fusionne sont rarement des photos de vacances. Ce sont les papiers demandés par une agence, une banque, un employeur ou une administration : pièce d’identité, justificatifs de revenus, justificatif de domicile. Les envoyer d’un bloc à un site dont on sait peu de chose, juste pour les mettre bout à bout, est un risque dont vous pouvez vous passer.",
      },
      { type: "h2", text: "Fusionner vos fichiers avec Cachety" },
      {
        type: "steps",
        items: [
          `Ouvrez ${TOOL} dans votre navigateur, sur ordinateur ou sur téléphone. Rien à installer, aucun compte à créer.`,
          "Ajoutez vos fichiers : PDF et photos ensemble (JPG, PNG, HEIC d’iPhone…). Une photo devient une page.",
          "Passez aux pages. Chaque page de chaque fichier s’affiche en miniature. Faites glisser une page pour la déplacer, même d’un document à l’autre. Tournez celles qui sont de travers et retirez celles dont vous ne voulez pas.",
          "Choisissez « Un seul PDF ». Si le site auquel vous destinez le fichier limite sa taille, choisissez la taille maximale : 1, 2, 5 ou 10 Mo. Cachety vous dit avant le téléchargement si le fichier tiendra dessous en restant lisible.",
          "Vérifiez l’aperçu, donnez un nom au fichier et téléchargez-le.",
        ],
      },
      {
        type: "tip",
        text: "Avant de télécharger, vous pouvez masquer un numéro de compte ou toute autre information dont le destinataire n’a pas besoin. La zone masquée est retirée du fichier, pas seulement recouverte.",
      },
      { type: "h2", text: "Ce que deviennent vos fichiers" },
      { type: "p", text: NOT_UPLOADED },
      { type: "h2", text: "À quoi ressemble le nouveau PDF" },
      { type: "p", text: PIXELS },
      {
        type: "p",
        text: "Le bon côté, c’est que le nouveau fichier en contient moins que les originaux : pas de nom d’auteur, pas de texte caché, pas de pièces jointes, pas de position GPS de vos photos. Ce que voit le destinataire, c’est tout ce qu’il y a.",
      },
      {
        type: "warning",
        text: "Si le texte du PDF fusionné doit rester sélectionnable et permettre la recherche, pour un rapport ou un mémoire par exemple, Cachety n’est pas le bon outil. Utilisez une application installée sur votre ordinateur, qui assemble les pages d’origine telles quelles, comme Aperçu sur Mac.",
      },
      { type: "h2", text: "Quelques limites à connaître" },
      {
        type: "list",
        items: [
          "Jusqu’à 200 Mo par fichier, 500 pages par PDF et 1 000 pages au total.",
          "Les fichiers Word et Excel ne sont pas acceptés : enregistrez-les d’abord en PDF (Imprimer, puis Enregistrer en PDF).",
          "Un PDF protégé par un mot de passe peut être ajouté : Cachety vous demande le mot de passe, sur votre appareil.",
        ],
      },
    ],
    faq: [
      {
        q: "Mes PDF sont-ils envoyés en ligne pour être fusionnés ?",
        a: "Non. La fusion se fait dans votre navigateur, sur votre appareil. Cachety n’a aucun serveur qui pourrait recevoir vos fichiers.",
      },
      {
        q: "Peut-on fusionner des PDF et des photos ?",
        a: "Oui. Ajoutez PDF et photos, en les mélangeant comme vous voulez. Chaque photo devient une page, et vous rangez toutes les pages dans l’ordre qui vous convient.",
      },
      {
        q: "Le texte reste-t-il sélectionnable après la fusion ?",
        a: "Non. Chaque page est reconstruite en image, ce qui retire les données cachées. Si vous avez besoin de texte sélectionnable, utilisez sur votre ordinateur une application qui garde les pages d’origine.",
      },
      {
        q: "Pourquoi le fichier fusionné est-il parfois plus lourd que mes fichiers ?",
        a: "Un PDF qui ne contenait que du texte est très léger, et une image de la même page pèse plus lourd. Choisissez une taille maximale : Cachety réduit les pages pour tenir dedans.",
      },
      {
        q: "Ça marche sur téléphone ?",
        a: "Oui, sur iPhone et Android, dans le navigateur. Vous déplacez les pages avec le doigt.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "photos-en-pdf-sur-telephone",
    topic: "photo-to-pdf",
    tool: "dossier",
    title: "Transformer des photos de documents papier en un seul PDF, sur téléphone",
    metaTitle: "Photos en un seul PDF sur téléphone, sans application",
    description:
      "Photographiez vos papiers et réunissez les photos en un seul PDF, dans le navigateur du téléphone. Sans application, sans envoi, assez léger pour un formulaire.",
    intro:
      "Un site veut un PDF et vous n’avez que du papier. Ou il refuse la photo de votre iPhone à cause de son format. Pas besoin de scanner ni d’application de scan : l’appareil photo de votre téléphone et son navigateur suffisent.",
    example: "Inscription à la crèche – Crèche des Lilas – 18/11/2026",
    body: [
      { type: "h2", text: "Prendre des photos bien lisibles" },
      {
        type: "list",
        items: [
          "Posez la feuille à plat sur une surface unie et sombre, près d’une fenêtre. Évitez le flash, qui laisse une tache blanche.",
          "Tenez le téléphone bien au-dessus de la feuille, pour que les bords paraissent parallèles, et remplissez le cadre avec la page.",
          "Prenez une photo par page. Vérifiez que les petits caractères sont nets avant de passer à la suivante.",
        ],
      },
      { type: "h2", text: "Des photos à un seul PDF" },
      {
        type: "steps",
        items: [
          `Ouvrez ${TOOL} dans le navigateur de votre téléphone. Aucune application à installer.`,
          "Touchez la zone de dépôt et choisissez vos photos. Les photos HEIC de l’iPhone passent telles quelles.",
          "Passez aux pages. Chaque photo est devenue une page. Tournez celles qui sont de travers et faites-les glisser dans le bon ordre.",
          "Choisissez « Un seul PDF » et, si le formulaire limite la taille, choisissez 1, 2, 5 ou 10 Mo.",
          "Vérifiez l’aperçu et téléchargez le PDF. Il est enregistré sur votre téléphone, prêt à être joint.",
        ],
      },
      {
        type: "tip",
        text: "Vous pouvez mélanger les photos avec des PDF que vous avez déjà, comme une fiche de paie téléchargée. Tout se retrouve dans un seul fichier, dans l’ordre que vous choisissez.",
      },
      { type: "h2", text: "Pourquoi le formulaire a refusé votre photo" },
      {
        type: "p",
        text: "Les formulaires en ligne n’acceptent souvent que le PDF, le JPG ou le PNG, et limitent la taille à quelques mégaoctets. Une photo prise avec un téléphone récent peut peser davantage, et les iPhone enregistrent les photos en HEIC, un format que beaucoup de sites ne lisent pas. Réunir les photos en un seul PDF, avec une taille maximale, règle les deux problèmes d’un coup.",
      },
      { type: "h2", text: "Vos photos restent sur votre téléphone" },
      { type: "p", text: NOT_UPLOADED },
      {
        type: "p",
        text: "Une photo garde aussi en mémoire où et quand elle a été prise, et avec quel téléphone. Cachety reconstruit chaque page en une nouvelle image : ces informations cachées, position GPS comprise, ne sont pas dans le PDF que vous envoyez.",
      },
      {
        type: "warning",
        text: "Une taille maximale très petite et beaucoup de pages en photo ne font pas toujours bon ménage. Si le fichier ne peut pas tenir dessous en restant lisible, Cachety le dit avant le téléchargement : retirez des pages, ou envoyez deux fichiers.",
      },
    ],
    faq: [
      {
        q: "Faut-il une application de scan ?",
        a: "Non. Prenez les photos avec l’appareil photo du téléphone et ouvrez Cachety dans le navigateur. Rien n’est installé.",
      },
      {
        q: "Les photos d’iPhone (HEIC) fonctionnent-elles ?",
        a: "Oui. Les photos HEIC sont lues sur votre appareil et deviennent des pages du PDF, comme n’importe quelle autre photo.",
      },
      {
        q: "Mes photos sont-elles envoyées en ligne ?",
        a: "Non. Tout se passe dans le navigateur de votre téléphone. Aucun serveur ne reçoit vos photos.",
      },
      {
        q: "Peut-on rechercher ou copier le texte du PDF ?",
        a: "Non. Les pages sont des images : Cachety ne lit pas le texte d’une photo. Pour un formulaire qui demande un PDF, c’est rarement un problème.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "tourner-reorganiser-supprimer-pages-pdf",
    topic: "pdf-pages",
    tool: "dossier",
    title: "Tourner, réorganiser ou supprimer des pages d’un PDF, sans l’envoyer en ligne",
    metaTitle: "Tourner, déplacer ou supprimer des pages PDF, sans envoi",
    description:
      "Tournez une page de travers, changez l’ordre des pages ou retirez-en d’un PDF, dans votre navigateur. Gratuit, sans compte : le fichier reste chez vous.",
    intro:
      "Un scan sorti à l’envers, une page blanche au milieu, un contrat dont il ne vous faut que les pages 1 et 7 : de petites retouches, mais la plupart des outils gratuits veulent d’abord que vous leur envoyiez tout le document. Voici comment le faire sur votre propre appareil.",
    example: "Dossier de prêt immobilier – Banque Durand – 18/11/2026",
    body: [
      { type: "h2", text: "Corriger les pages avec Cachety" },
      {
        type: "steps",
        items: [
          `Ouvrez ${TOOL} dans votre navigateur, sur ordinateur ou sur téléphone.`,
          "Ajoutez votre PDF. Vous pouvez ajouter plusieurs fichiers, et aussi des photos.",
          "Passez aux pages. Chaque page s’affiche en miniature, dans l’ordre du fichier final.",
          "Faites glisser une page pour la déplacer. Le bouton pour tourner la fait pivoter d’un quart de tour à chaque fois. Le bouton pour retirer l’enlève du fichier. Si vous retirez la mauvaise page, annulez : elle revient.",
          "Choisissez « Un seul PDF », vérifiez l’aperçu et téléchargez.",
        ],
      },
      {
        type: "tip",
        text: "Sur ordinateur, tout peut se faire au clavier : Alt et les flèches déplacent la page sélectionnée, R la tourne et Suppr la retire.",
      },
      { type: "h2", text: "Une vraie rotation, pas un réglage d’affichage" },
      {
        type: "p",
        text: "Beaucoup d’outils se contentent d’ajouter au PDF une note qui dit « afficher cette page tournée ». Certains lecteurs n’en tiennent pas compte, et la page se retrouve de travers chez la personne qui la reçoit. Cachety reconstruit la page dans le bon sens : elle s’affiche de la même façon partout.",
      },
      { type: "h2", text: "Les pages retirées ont vraiment disparu" },
      {
        type: "p",
        text: "Quand vous retirez une page, elle n’est plus du tout dans le nouveau fichier. Il en va de même pour ce qu’on ne voit pas dans un PDF : texte caché, pièces jointes, nom de l’auteur. Le nouveau fichier est fabriqué à partir de ce qui est affiché sur chaque page, et de rien d’autre.",
      },
      { type: "h2", text: "À quoi vous attendre" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Si vous devez garder du texte sélectionnable, des signets ou des champs de formulaire, utilisez une application installée sur votre ordinateur, qui modifie les pages d’origine, comme Aperçu sur Mac.",
      },
      { type: "h2", text: "Rien n’est envoyé en ligne" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "Peut-on tourner une seule page d’un PDF ?",
        a: "Oui. Chaque page a son propre bouton pour la tourner. Les autres pages ne changent pas.",
      },
      {
        q: "Peut-on déplacer une page d’un PDF vers un autre ?",
        a: "Oui. Ajoutez les deux fichiers : toutes leurs pages s’affichent ensemble, se déplacent librement, puis s’enregistrent en un seul PDF.",
      },
      {
        q: "Peut-on récupérer une page retirée ?",
        a: "Oui, tant que l’onglet reste ouvert : annulez juste après l’avoir retirée, ou rétablissez l’ordre d’origine. Votre fichier d’origine n’est jamais modifié.",
      },
      {
        q: "Mon PDF est-il envoyé en ligne ?",
        a: "Non. Les pages sont affichées et reconstruites dans votre navigateur. Aucun serveur ne reçoit votre fichier.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "supprimer-metadonnees-pdf-photo",
    topic: "metadata",
    tool: "dossier",
    title: "Supprimer les métadonnées et les données cachées d’un PDF ou d’une photo avant de l’envoyer",
    metaTitle: "Supprimer les métadonnées d’un PDF ou d’une photo",
    description:
      "Un PDF ou une photo en disent plus qu’ils ne montrent : auteur, dates, texte caché, position GPS. Retirez tout avant l’envoi, dans votre navigateur.",
    intro:
      "Le fichier que vous envoyez en dit plus que ce que montre la page. Un PDF peut donner le nom de son auteur et le logiciel qui l’a créé, et garder un texte que vous pensiez effacé. Une photo peut dire précisément où elle a été prise. Voici ce qui se cache dans un fichier, et comment envoyer une copie propre.",
    example: "Déclaration de sinistre – Assurances Mercier – 18/11/2026",
    body: [
      { type: "h2", text: "Ce qu’un fichier transporte sans vous le dire" },
      {
        type: "list",
        items: [
          "Dans un PDF : le nom de l’auteur, le titre, le logiciel utilisé, les dates de création et de modification.",
          "Toujours dans un PDF : une couche de texte sélectionnable, des commentaires, des liens, des pièces jointes, des données de formulaire, et parfois un texte resté sous un rectangle noir.",
          "Dans une photo : la date, la marque du téléphone et, très souvent, la position GPS du lieu où elle a été prise.",
        ],
      },
      {
        type: "p",
        text: "Rien de tout cela ne se voit quand on regarde la page. Tout peut être lu en quelques clics par la personne qui reçoit le fichier, ou par toute personne à qui il est transféré.",
      },
      { type: "h2", text: "Faire une copie propre avec Cachety" },
      {
        type: "steps",
        items: [
          `Ouvrez ${TOOL} dans votre navigateur. Aucun compte n’est nécessaire.`,
          "Ajoutez votre PDF ou vos photos.",
          "Passez aux pages et vérifiez qu’elles sont dans le bon ordre. Retirez celles que vous ne voulez pas envoyer.",
          "Choisissez « Un seul PDF » et téléchargez-le.",
          "Envoyez le nouveau fichier, pas l’original.",
        ],
      },
      { type: "h2", text: "Comment se fait le nettoyage" },
      {
        type: "p",
        text: "Cachety ne cherche pas à trouver et à supprimer chaque donnée cachée, une par une. Il reconstruit chaque page en une image de ce que vous voyez, et fabrique un nouveau PDF à partir de ces images. Ce qui n’était pas visible sur la page n’est pas dans le nouveau fichier : ni auteur, ni texte caché, ni pièce jointe, ni script, ni lien, ni position GPS.",
      },
      {
        type: "tip",
        text: "Pour vérifier un fichier, ouvrez ses propriétés dans votre lecteur de PDF et essayez de sélectionner le texte d’une page. Dans une copie faite par Cachety, les propriétés sont vides et rien ne peut être sélectionné.",
      },
      { type: "h2", text: "Le prix à payer" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Nettoyer un fichier retire ce qui est caché, pas ce qui est imprimé sur la page. Un nom, un numéro de compte ou un code-barres visibles sont toujours là. Masquez-les avant de télécharger : la zone masquée est vraiment retirée du fichier.",
      },
      { type: "h2", text: "Votre fichier n’est pas envoyé en ligne pour être nettoyé" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "La position GPS de mes photos est-elle retirée ?",
        a: "Oui. La page est reconstruite en une nouvelle image, dans un PDF, et les informations cachées de la photo, position comprise, ne sont pas reprises.",
      },
      {
        q: "Le nom de l’auteur d’un PDF est-il retiré ?",
        a: "Oui. Le nouveau PDF est fait d’images des pages et ne reprend pas les propriétés du fichier d’origine.",
      },
      {
        q: "Peut-on garder le texte sélectionnable et retirer seulement les métadonnées ?",
        a: "Pas avec Cachety. Il retire toutes les données cachées en reconstruisant les pages en images. Pour garder le texte sélectionnable, utilisez la fonction de suppression des informations masquées d’un éditeur de PDF installé sur votre ordinateur.",
      },
      {
        q: "Le résultat est-il un PDF ou une photo ?",
        a: "Un PDF. Une photo devient une page du PDF.",
      },
    ],
    updated: UPDATED,
  },
];
