// Comparatifs en français (« Cachety ou X ? »), écrits pour un public en France.
// Texte brut uniquement. Chaque affirmation sur un autre outil s'appuie sur les
// pages listées dans `sources`, lues à la date `checked`.

import type { Comparison } from "./types";

const CHECKED = "2026-10-11";
const UPDATED = "2026-10-11";

// Formulations communes pour la colonne Cachety (fiche de faits du projet).
const CACHETY = {
  where: "Sur votre appareil, dans le navigateur. Rien n’est envoyé sur internet.",
  retention: "Aucune conservation : il n’existe pas de serveur qui reçoit vos fichiers.",
  account: "Aucun compte, aucune inscription.",
  price: "Gratuit, sans formule payante.",
  ads: "Ni publicité ni pisteur aujourd’hui, pas de mesure d’audience.",
  watermark: "Texte répété en diagonale sur toute la page, fondu dans l’image de chaque page.",
  logo: "Non : filigrane texte uniquement.",
  redact: "Oui : rectangles de masquage, le contenu caché est réellement retiré.",
  password: "Oui, en option (chiffrement AES-256 du PDF).",
  recipients: "Oui : jusqu’à 20 destinataires, une version marquée pour chacun.",
  offline: "Oui : une fois la page chargée, tout marche en mode avion.",
  openSource: "Oui, code public (licence AGPL-3.0).",
  otherTools: "Non : filigrane, masquage, mot de passe et fusion de documents seulement.",
};

const HOW_TO: GuideBlockList = [
  { type: "h2", text: "Faire la même chose avec Cachety" },
  {
    type: "steps",
    items: [
      "Ouvrez cachety.com dans votre navigateur, sur ordinateur ou sur téléphone.",
      "Déposez vos fichiers : PDF, photos JPG, PNG ou HEIC d’iPhone. Vous pouvez en mettre plusieurs à la fois.",
      "Tapez votre texte, par exemple « Dossier de location – Agence Martin – 12/10/2026 », ou partez d’un modèle prêt à l’emploi.",
      "Si besoin, masquez un numéro ou une photo, ajoutez un mot de passe ou indiquez plusieurs destinataires.",
      "Vérifiez l’aperçu, puis téléchargez. Le fichier ne quitte jamais votre appareil : pour le vérifier, coupez le wifi et les données mobiles une fois la page chargée. Tout continue de fonctionner.",
    ],
  },
];

type GuideBlockList = Comparison["body"];

export const COMPARISONS_FR: Comparison[] = [
  // ------------------------------------------------------------------
  {
    slug: "cachety-vs-filigranefacile",
    competitor: "filigranefacile",
    competitorName: "FiligraneFacile",
    competitorUrl: "https://filigrane.beta.gouv.fr/",
    title: "Cachety ou FiligraneFacile : quel outil pour filigraner vos papiers ?",
    metaTitle: "Alternative à FiligraneFacile : Cachety, sans envoi",
    description:
      "FiligraneFacile ou Cachety ? Deux outils gratuits pour filigraner une pièce d’identité. Avec Cachety, le fichier ne quitte jamais votre appareil.",
    intro:
      "FiligraneFacile est le service gratuit de l’État pour ajouter un filigrane à un document. C’est un bon réflexe, et il a beaucoup fait pour faire connaître la pratique. Voici en quoi il diffère de Cachety, point par point.",
    verdict:
      "Les deux outils sont gratuits, sans compte, et incrustent le filigrane dans l’image. La grande différence : FiligraneFacile envoie votre document sur ses serveurs pour le traiter, alors que Cachety fait tout dans votre navigateur. Cachety propose aussi le masquage, le mot de passe et une version par destinataire. FiligraneFacile a pour lui d’être un service public, porté par l’administration.",
    table: [
      {
        criterion: "Où le fichier est traité",
        cachety: CACHETY.where,
        other: "Sur les serveurs du service : le document est envoyé, filigrané à distance, puis renvoyé en PDF.",
        edge: "cachety",
      },
      {
        criterion: "Conservation des fichiers",
        cachety: CACHETY.retention,
        other: "Original effacé après la génération ; fichier filigrané effacé au premier téléchargement, ou au bout d’un jour (selon ses CGU).",
        edge: "cachety",
      },
      {
        criterion: "Qui l’édite",
        cachety: "Un projet personnel, fait en France, sans entreprise derrière.",
        other: "L’État : service de la Fabrique numérique du ministère de la Transition écologique, programme beta.gouv.fr.",
        edge: "other",
      },
      {
        criterion: "Prix et compte",
        cachety: "Gratuit, sans compte.",
        other: "Gratuit, sans limite d’utilisation, sans compte demandé.",
      },
      {
        criterion: "Formats acceptés",
        cachety: "PDF, JPG, PNG, HEIC, WebP, GIF, BMP, AVIF ; plusieurs fichiers à la fois.",
        other: "JPG, PNG, HEIC et PDF ; ses CGU précisent que l’ajout se fait fichier après fichier.",
        edge: "cachety",
      },
      {
        criterion: "Type de filigrane",
        cachety: "Texte en diagonale sur toute la page, réglable : police, taille, couleur, opacité, effet vague.",
        other: "Texte libre incrusté dans l’image. Les réglages d’apparence ne sont pas décrits dans ses CGU.",
      },
      {
        criterion: "Masquer une zone (numéro, photo)",
        cachety: CACHETY.redact,
        other: "Non proposé.",
        edge: "cachety",
      },
      {
        criterion: "Une copie par destinataire",
        cachety: CACHETY.recipients + " Date et référence unique en option.",
        other: "Non : un texte par opération, à refaire pour chaque destinataire.",
        edge: "cachety",
      },
      {
        criterion: "Mot de passe sur le PDF",
        cachety: CACHETY.password,
        other: "Non proposé.",
        edge: "cachety",
      },
      {
        criterion: "Hors connexion et code source",
        cachety: "Marche en mode avion ; code public (AGPL-3.0).",
        other: "Connexion nécessaire ; code source public sur GitHub.",
      },
    ],
    body: [
      { type: "h2", text: "FiligraneFacile, c’est quoi ?" },
      {
        type: "p",
        text: "FiligraneFacile est un service public lancé par l’équipe de DossierFacile, au sein du ministère de la Transition écologique. Le principe est simple : vous déposez un document, vous tapez le texte du filigrane, et vous récupérez un PDF marqué. C’est gratuit, sans compte et sans limite d’utilisation. Le code source est public. Le service a de vrais atouts : il est porté par l’administration, il est simple, et le filigrane est incrusté dans l’image, ce qui le rend plus difficile à effacer. Cachety suit d’ailleurs la même règle.",
      },
      { type: "h2", text: "La vraie différence : votre document voyage-t-il ?" },
      {
        type: "p",
        text: "Avec FiligraneFacile, la copie de votre pièce d’identité part sur internet jusqu’aux serveurs du service, qui ajoutent le filigrane puis vous renvoient le résultat. Selon ses conditions d’utilisation, l’original est effacé après la génération, et le fichier filigrané au premier téléchargement, ou au bout d’un jour si vous ne le téléchargez pas.",
      },
      {
        type: "p",
        text: "Ces engagements sont sérieux, et rien n’indique qu’ils ne soient pas respectés. Mais pendant ce temps, même court, votre document se trouve sur un ordinateur qui n’est pas le vôtre, sous la responsabilité de quelqu’un d’autre. Avec Cachety, cette étape n’existe pas : le filigrane est ajouté par votre navigateur, sur votre appareil. Il n’y a rien à effacer, puisque rien n’a été envoyé.",
      },
      { type: "h2", text: "Ce que FiligraneFacile ne fait pas, et que Cachety ajoute" },
      {
        type: "list",
        items: [
          "Masquer une partie du document, comme le numéro de la carte ou la photo, quand le destinataire n’en a pas besoin.",
          "Préparer en une fois une version par destinataire, chacune avec son propre texte, pour savoir d’où vient une fuite.",
          "Ajouter la date et une référence unique à chaque copie, et garder votre propre registre des envois.",
          "Protéger le PDF par un mot de passe.",
          "Traiter plusieurs fichiers d’un coup et les réunir dans un seul PDF.",
          "Retirer les données cachées : métadonnées, position GPS des photos, texte sélectionnable.",
          "Continuer à fonctionner sans connexion, une fois la page chargée.",
        ],
      },
      {
        type: "warning",
        text: "Comme le rappelle FiligraneFacile lui-même, certains organismes, comme les banques ou les services publics, peuvent demander un document vierge. C’est vrai aussi avec Cachety : en cas de doute, demandez avant d’envoyer.",
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous préférez un service édité par l’administration, avec une équipe publique derrière.",
      "Votre appareil est très ancien ou peu puissant : le travail est fait par le serveur, pas par votre téléphone.",
      "Un organisme vous demande expressément de passer par FiligraneFacile.",
    ],
    chooseCachety: [
      "Vous ne voulez pas que la copie de votre pièce d’identité soit envoyée où que ce soit, même brièvement.",
      "Vous devez masquer un numéro ou une photo avant l’envoi.",
      "Vous envoyez le même dossier à plusieurs agences et voulez une version marquée pour chacune.",
      "Vous voulez un mot de passe sur le PDF, ou traiter plusieurs fichiers d’un coup.",
    ],
    faq: [
      {
        q: "FiligraneFacile est-il sûr pour une carte d’identité ?",
        a: "C’est un service public sérieux, qui s’engage à effacer vos fichiers rapidement. Mais le document est bien envoyé sur ses serveurs pour être filigrané. Si vous préférez qu’il ne quitte jamais votre téléphone ou votre ordinateur, un outil qui travaille dans le navigateur, comme Cachety, évite cet envoi.",
      },
      {
        q: "FiligraneFacile garde-t-il mes documents ?",
        a: "Selon ses conditions d’utilisation, l’original est effacé dès que le fichier filigrané est créé, et ce dernier est effacé au premier téléchargement, ou au bout d’un jour s’il n’a pas été téléchargé.",
      },
      {
        q: "Quelle alternative à FiligraneFacile sans envoi en ligne ?",
        a: "Cachety fait le même travail directement dans votre navigateur : rien n’est envoyé. Vous pouvez le vérifier en passant en mode avion une fois la page chargée. C’est aussi gratuit et sans compte.",
      },
      {
        q: "Peut-on enlever un filigrane de FiligraneFacile ou de Cachety ?",
        a: "Dans les deux cas, le texte est incrusté dans l’image de la page : on ne peut pas le retirer en modifiant simplement le PDF. Cela reste une protection dissuasive, pas une garantie absolue.",
      },
    ],
    sources: [
      { label: "FiligraneFacile : conditions générales d’utilisation", url: "https://filigrane.beta.gouv.fr/conditions-generales-d-utilisation" },
      { label: "Fiche du service sur beta.gouv.fr", url: "https://beta.gouv.fr/startups/filigrane.html" },
      { label: "FiligraneFacile : mentions légales", url: "https://filigrane.beta.gouv.fr/mentions-legales" },
      { label: "Code source (GitHub, MTES-MCT)", url: "https://github.com/MTES-MCT/Dossier-Facile-Frontend" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "cachety-vs-dossierfacile",
    competitor: "dossierfacile",
    competitorName: "DossierFacile",
    competitorUrl: "https://www.dossierfacile.logement.gouv.fr/",
    title: "Cachety ou DossierFacile : protéger son dossier de location",
    metaTitle: "DossierFacile et filigrane : comparatif avec Cachety",
    description:
      "DossierFacile filigrane votre dossier de location sur ses serveurs. Cachety marque vos papiers sur votre appareil, avec le texte de votre choix.",
    intro:
      "DossierFacile est le dossier de location numérique de l’État : vous y déposez vos pièces, elles sont vérifiées et filigranées, puis vous les partagez par lien. Cachety ne fait qu’une chose : filigraner vos documents sur votre appareil. Ce ne sont pas les mêmes services, et ils peuvent se compléter.",
    verdict:
      "Si une agence accepte DossierFacile, c’est une solution solide : dossier vérifié, label reconnu, partage par lien que vous contrôlez. En échange, vos pièces sont stockées sur ses serveurs, avec un compte, et le filigrane est un texte fixe. Cachety convient quand vous envoyez vos papiers vous-même et voulez choisir le texte, sans rien confier à personne.",
    table: [
      {
        criterion: "À quoi ça sert",
        cachety: "Filigraner n’importe quel document, pour n’importe quelle démarche.",
        other: "Monter un dossier de location complet, vérifié, puis le partager aux bailleurs.",
      },
      {
        criterion: "Où sont vos documents",
        cachety: CACHETY.where,
        other: "Envoyés et stockés sur des serveurs hébergés par OVH et Outscale en France (selon ses CGU).",
        edge: "cachety",
      },
      {
        criterion: "Durée de conservation",
        cachety: CACHETY.retention,
        other: "Données d’identité : 1 an après le dernier contact ; autres pièces : 3 mois. Suppression possible à tout moment avec le compte.",
        edge: "cachety",
      },
      {
        criterion: "Compte",
        cachety: CACHETY.account,
        other: "Compte obligatoire, par e-mail ou FranceConnect.",
        edge: "cachety",
      },
      {
        criterion: "Texte du filigrane",
        cachety: "Celui que vous voulez : objet, destinataire, date, référence.",
        other: "Texte fixe : « Document exclusivement destiné à la location d’appartement ».",
        edge: "cachety",
      },
      {
        criterion: "Vérification du dossier",
        cachety: "Non : Cachety ne vérifie ni ne certifie rien.",
        other: "Oui : pièces contrôlées par les opérateurs de la plateforme, dossier « labellisé ».",
        edge: "other",
      },
      {
        criterion: "Partage",
        cachety: "Vous envoyez vous-même les fichiers, par le moyen de votre choix.",
        other: "Un lien par destinataire, avec date d’expiration, suivi des consultations et coupure de l’accès.",
        edge: "other",
      },
      {
        criterion: "Mesure d’audience",
        cachety: CACHETY.ads,
        other: "Matomo pour l’audience et Crisp pour la discussion en ligne, avec votre accord.",
      },
      {
        criterion: "Masquage et mot de passe",
        cachety: "Masquage de zones et mot de passe en option.",
        other: "Non proposés.",
        edge: "cachety",
      },
      {
        criterion: "Prix et code source",
        cachety: "Gratuit ; code public (AGPL-3.0).",
        other: "Gratuit ; code public (licence MIT).",
      },
    ],
    body: [
      { type: "h2", text: "Deux outils, deux métiers" },
      {
        type: "p",
        text: "DossierFacile est un service public complet pour la location. Vous créez un compte, vous déposez vos pièces, l’équipe les vérifie, et votre dossier reçoit un label. Vous le partagez ensuite par un lien, un par destinataire, que vous pouvez couper quand vous voulez. Les pièces sont filigranées automatiquement.",
      },
      {
        type: "p",
        text: "Cachety, lui, ne stocke rien et ne vérifie rien. Il ajoute un filigrane à vos documents, directement sur votre appareil, et vous les envoyez vous-même. C’est utile quand une agence ou un particulier demande les papiers en direct, ou pour toute autre démarche que la location.",
      },
      { type: "h2", text: "Ce que deviennent vos papiers" },
      {
        type: "p",
        text: "Avec DossierFacile, vos pièces sont envoyées sur internet et stockées sur des serveurs en France. Selon sa politique de confidentialité, les données d’identité sont conservées un an après votre dernier contact, les autres trois mois, et vous pouvez supprimer votre compte à tout moment. C’est encadré, mais c’est un stockage durable, chez quelqu’un d’autre. Ses conditions d’utilisation prévoient aussi que des données puissent être partagées avec des sous-traitants choisis pour des tests d’intelligence artificielle, strictement limités à ces tests. Avec Cachety, la question ne se pose pas : vos fichiers ne quittent pas votre appareil.",
      },
      { type: "h2", text: "Un filigrane fixe ou le vôtre" },
      {
        type: "p",
        text: "DossierFacile applique le même texte à toutes les pièces : « Document exclusivement destiné à la location d’appartement ». C’est efficace contre la réutilisation hors location. Avec Cachety, vous écrivez ce que vous voulez, par exemple le nom de l’agence et la date, et vous pouvez faire une version différente pour chaque destinataire. Si une copie circule, vous savez d’où elle vient.",
      },
      {
        type: "tip",
        text: "Les deux se complètent : DossierFacile quand l’agence l’accepte, Cachety pour les papiers envoyés par e-mail à un particulier, à une banque ou à un employeur.",
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous cherchez un logement et voulez un dossier vérifié, avec un label que les bailleurs reconnaissent.",
      "Vous voulez partager par un lien qui expire, voir qui l’a consulté et couper l’accès.",
      "Votre agence travaille déjà avec DossierFacile.",
    ],
    chooseCachety: [
      "Vous envoyez vos papiers vous-même, par e-mail ou par message, et ne voulez les stocker nulle part.",
      "Vous voulez choisir le texte du filigrane, avec le nom du destinataire et la date.",
      "La démarche n’a rien à voir avec la location : banque, employeur, inscription.",
      "Vous devez masquer un numéro ou protéger le PDF par un mot de passe.",
    ],
    faq: [
      {
        q: "DossierFacile met-il un filigrane sur mes documents ?",
        a: "Oui. Selon ses conditions d’utilisation, les documents sont recouverts du texte « Document exclusivement destiné à la location d’appartement ». Ce texte est le même pour tous et ne peut pas être personnalisé.",
      },
      {
        q: "Combien de temps DossierFacile garde-t-il mes papiers ?",
        a: "Sa politique de confidentialité indique un an après le dernier contact pour les données d’identité, et trois mois pour les autres catégories. Vous pouvez supprimer votre compte à tout moment, ce qui supprime vos données.",
      },
      {
        q: "Peut-on filigraner son dossier de location sans DossierFacile ?",
        a: "Oui. Avec Cachety, vous ajoutez votre propre filigrane, par exemple « Dossier de location – Agence Martin – 12/10/2026 », sur votre appareil, puis vous envoyez les fichiers vous-même. Rien n’est stocké en ligne.",
      },
    ],
    sources: [
      { label: "DossierFacile : conditions générales d’utilisation", url: "https://www.dossierfacile.logement.gouv.fr/cgu" },
      { label: "DossierFacile : politique de confidentialité", url: "https://www.dossierfacile.logement.gouv.fr/politique-de-confidentialite" },
      { label: "DossierFacile : page d’accueil", url: "https://www.dossierfacile.logement.gouv.fr/" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "cachety-vs-ilovepdf",
    competitor: "ilovepdf",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "Cachety ou iLovePDF : filigraner un document d’identité",
    metaTitle: "iLovePDF filigrane : l’alternative Cachety, sans envoi",
    description:
      "iLovePDF ou Cachety pour filigraner une pièce d’identité ? iLovePDF traite vos fichiers sur ses serveurs ; Cachety, sur votre appareil. Le comparatif.",
    intro:
      "iLovePDF est une boîte à outils PDF très complète, éditée en Espagne. Son outil de filigrane est souple et bien fait. Pour une pièce d’identité, la question est surtout de savoir où part votre fichier.",
    verdict:
      "iLovePDF est le meilleur choix pour un logo, une mise en page précise ou tout autre travail sur PDF. Mais ses outils en ligne envoient vos fichiers sur ses serveurs, où ils restent jusqu’à deux heures. Pour une pièce d’identité, Cachety évite cet envoi et ajoute masquage et versions par destinataire.",
    table: [
      {
        criterion: "Où le fichier est traité",
        cachety: CACHETY.where,
        other: "Sur ses serveurs, après envoi chiffré (HTTPS). Applications de bureau et mobiles aussi proposées.",
        edge: "cachety",
      },
      {
        criterion: "Conservation des fichiers",
        cachety: CACHETY.retention,
        other: "Supprimés dans les deux heures suivant le traitement, selon sa politique de confidentialité.",
        edge: "cachety",
      },
      {
        criterion: "Prix",
        cachety: CACHETY.price,
        other: "Version gratuite avec limites ; formule Premium payante.",
      },
      {
        criterion: "Publicité",
        cachety: CACHETY.ads,
        other: "La version sans publicité fait partie de l’offre Premium : la version gratuite en affiche.",
        edge: "cachety",
      },
      {
        criterion: "Type de filigrane",
        cachety: CACHETY.watermark,
        other: "Texte ou image, à une position ou en mosaïque, transparence, rotation, au-dessus ou en dessous du contenu.",
      },
      {
        criterion: "Filigrane avec logo",
        cachety: CACHETY.logo,
        other: "Oui, une image peut servir de filigrane.",
        edge: "other",
      },
      {
        criterion: "Filigrane fondu dans la page",
        cachety: "Oui : il ne s’enlève pas en modifiant le PDF.",
        other: "Non documenté.",
      },
      {
        criterion: "Masquage et mot de passe",
        cachety: "Masquage de zones et mot de passe, dans le même outil.",
        other: "Outils séparés « Censurer » et « Protéger ».",
      },
      {
        criterion: "Une copie par destinataire",
        cachety: CACHETY.recipients,
        other: "Non documenté.",
      },
      {
        criterion: "Autres outils PDF",
        cachety: CACHETY.otherTools,
        other: "Très nombreux : compresser, convertir, signer, modifier, OCR, etc.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "iLovePDF, un couteau suisse du PDF" },
      {
        type: "p",
        text: "iLovePDF, édité par une société de Barcelone, regroupe des dizaines d’outils PDF. Son filigrane accepte un texte ou une image, placé où vous voulez ou répété en mosaïque. La société indique être certifiée ISO 27001 et conforme au RGPD. Elle propose aussi des applications de bureau qui travaillent hors ligne.",
      },
      { type: "h2", text: "Où va votre pièce d’identité ?" },
      {
        type: "p",
        text: "Avec l’outil en ligne, votre fichier est envoyé sur les serveurs d’iLovePDF, traité là-bas, puis renvoyé. Sa politique de confidentialité prévoit une suppression dans les deux heures. C’est court et encadré, mais pendant ce temps, une copie de votre pièce d’identité est chez quelqu’un d’autre, sous ses règles à lui. Avec Cachety, il n’y a pas d’envoi : le filigrane est dessiné par votre navigateur, sur votre appareil. Vous pouvez le vérifier vous-même en passant en mode avion.",
      },
      { type: "h2", text: "Ce qui compte pour un document d’identité" },
      {
        type: "list",
        items: [
          "Un filigrane qui couvre toute la page, pour qu’on ne puisse pas recadrer autour.",
          "Un filigrane fondu dans l’image, qu’on ne peut pas retirer en éditant le PDF. iLovePDF ne précise pas si le sien l’est.",
          "La possibilité de masquer ce qui n’est pas nécessaire, comme le numéro du document.",
          "Une version par destinataire, pour savoir d’où vient une éventuelle fuite.",
        ],
      },
      {
        type: "p",
        text: "Pour être honnête, iLovePDF reste plus complet dès qu’il s’agit d’autre chose : signer, compresser, convertir un PDF, ou poser un logo d’entreprise sur un document commercial.",
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous voulez un filigrane avec votre logo ou une image.",
      "Vous avez besoin d’autres outils PDF : signer, convertir, compresser, modifier le texte.",
      "Vous voulez garder le texte du PDF sélectionnable après le filigrane.",
      "Vous préférez une application de bureau installée sur votre ordinateur.",
    ],
    chooseCachety: [
      "Vous filigranez une pièce d’identité ou un justificatif et ne voulez pas l’envoyer en ligne.",
      "Vous voulez un outil sans publicité et sans compte.",
      "Vous devez masquer une zone et faire une version par destinataire en une seule fois.",
    ],
    faq: [
      {
        q: "iLovePDF est-il sûr pour une carte d’identité ?",
        a: "iLovePDF chiffre les envois et dit supprimer les fichiers dans les deux heures. Mais votre carte est bien envoyée sur ses serveurs. Si vous préférez qu’elle ne quitte pas votre appareil, utilisez un outil qui travaille dans le navigateur, comme Cachety.",
      },
      {
        q: "Combien de temps iLovePDF garde-t-il mes fichiers ?",
        a: "Selon sa politique de confidentialité, les fichiers sont supprimés dans les deux heures suivant leur traitement.",
      },
      {
        q: "Quelle alternative à iLovePDF pour filigraner sans envoyer ses fichiers ?",
        a: "Cachety ajoute le filigrane directement dans votre navigateur, gratuitement et sans compte. Rien n’est envoyé sur internet, ce que vous pouvez vérifier en mode avion.",
      },
    ],
    sources: [
      { label: "iLovePDF : politique de confidentialité", url: "https://www.ilovepdf.com/help/privacy" },
      { label: "iLovePDF : sécurité", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF : tarifs", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF : guide du filigrane", url: "https://www.ilovepdf.com/blog/how-to-watermark-pages-in-a-pdf-document-online" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "cachety-vs-smallpdf",
    competitor: "smallpdf",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/fr",
    title: "Cachety ou Smallpdf : filigraner sans envoyer ses papiers",
    metaTitle: "Smallpdf filigrane : comparatif et alternative Cachety",
    description:
      "Smallpdf ou Cachety pour un filigrane ? Smallpdf envoie le fichier sur ses serveurs et le supprime après une heure ; Cachety ne l’envoie jamais.",
    intro:
      "Smallpdf, édité en Suisse, est l’un des outils PDF en ligne les plus connus. Son interface est soignée et son filigrane simple à utiliser. Mais derrière la promesse d’un travail dans le navigateur, vos fichiers sont bien envoyés sur ses serveurs.",
    verdict:
      "Smallpdf est agréable et complet, avec des applications et de nombreux outils PDF. Sa FAQ indique toutefois que les fichiers sont téléversés et supprimés de ses serveurs après une heure. Pour une pièce d’identité, Cachety garde tout sur votre appareil et ajoute masquage, mot de passe et versions par destinataire dans le même outil.",
    table: [
      {
        criterion: "Où le fichier est traité",
        cachety: CACHETY.where,
        other: "Sur ses serveurs, après un envoi chiffré (TLS). Serveurs hébergés chez Hetzner, dans l’Union européenne.",
        edge: "cachety",
      },
      {
        criterion: "Conservation des fichiers",
        cachety: CACHETY.retention,
        other: "Une heure selon la page de l’outil ; sa politique de confidentialité parle d’un « délai raisonnable » sans compte.",
        edge: "cachety",
      },
      {
        criterion: "Compte et limites",
        cachety: "Aucun compte ; limites liées à votre appareil (200 Mo par fichier).",
        other: "Pas de compte exigé pour le filigrane ; limite de téléchargements par jour en version gratuite.",
        edge: "cachety",
      },
      {
        criterion: "Pisteurs",
        cachety: CACHETY.ads,
        other: "Sa politique cite, avec consentement : Google Analytics, Hotjar, Google Ads, Facebook Pixel, LinkedIn Insight Tag.",
        edge: "cachety",
      },
      {
        criterion: "Type de filigrane",
        cachety: CACHETY.watermark,
        other: "Texte seulement dans cet outil : police, taille, couleur, opacité, appliqué à toutes les pages.",
      },
      {
        criterion: "Filigrane fondu dans la page",
        cachety: "Oui : il ne s’enlève pas en modifiant le PDF.",
        other: "Non documenté.",
      },
      {
        criterion: "Masquage et mot de passe",
        cachety: "Masquage et mot de passe dans le même outil.",
        other: "Outils séparés pour censurer et protéger un PDF.",
      },
      {
        criterion: "Une copie par destinataire",
        cachety: CACHETY.recipients,
        other: "Non documenté.",
      },
      {
        criterion: "Applications et autres outils",
        cachety: "Site web seulement (installable sur l’écran d’accueil) ; pas d’autres outils PDF.",
        other: "Applications de bureau et mobiles, nombreux outils PDF, stockage dans un compte.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "« Dans votre navigateur », mais sur ses serveurs" },
      {
        type: "p",
        text: "La page de Smallpdf parle d’un filigrane ajouté « directement dans votre navigateur ». C’est vrai pour l’interface, mais sa propre FAQ précise que les fichiers sont envoyés de façon chiffrée et supprimés de ses serveurs après une heure. Sa politique de confidentialité nomme Hetzner, un hébergeur allemand, pour traiter les fichiers dans l’Union européenne.",
      },
      {
        type: "p",
        text: "Autrement dit : pendant au moins une heure, une copie de votre document est stockée chez Smallpdf. Sa politique de confidentialité, sans compte, parle même d’une suppression « dans un délai raisonnable », prolongé à chaque réouverture du fichier. Avec Cachety, il n’y a pas d’envoi du tout.",
      },
      { type: "h2", text: "Les pisteurs, un autre point à regarder" },
      {
        type: "p",
        text: "Sa politique de confidentialité liste plusieurs outils de mesure et de publicité, activés avec votre accord : Google Analytics, Hotjar, Google Ads, le pixel Facebook ou LinkedIn. C’est courant pour un service commercial. Cachety n’en utilise aucun aujourd’hui.",
      },
      { type: "h2", text: "Ce que Smallpdf fait mieux" },
      {
        type: "list",
        items: [
          "Une vraie suite PDF : compresser, convertir, signer, modifier.",
          "Des applications pour ordinateur et téléphone.",
          "Un compte pour retrouver vos fichiers d’un appareil à l’autre.",
          "Un PDF dont le texte reste sélectionnable, ce que Cachety supprime volontairement.",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous cherchez une suite PDF complète, avec applications et stockage en ligne.",
      "Vous voulez retrouver vos fichiers dans un compte, sur plusieurs appareils.",
      "Votre document n’a rien de sensible et vous voulez garder le texte sélectionnable.",
    ],
    chooseCachety: [
      "Votre document contient des données personnelles et vous ne voulez pas l’envoyer en ligne.",
      "Vous voulez éviter les pisteurs publicitaires.",
      "Vous voulez masquer, protéger et faire une version par destinataire en une seule fois.",
    ],
    faq: [
      {
        q: "Smallpdf garde-t-il mes fichiers ?",
        a: "La page de l’outil indique une suppression automatique après une heure. Sa politique de confidentialité, pour un usage sans compte, parle d’un délai raisonnable après la dernière ouverture du fichier. Dans tous les cas, le fichier passe par ses serveurs.",
      },
      {
        q: "Smallpdf traite-t-il vraiment les fichiers dans le navigateur ?",
        a: "Non. L’interface fonctionne dans le navigateur, mais la FAQ de Smallpdf indique que les fichiers sont envoyés et supprimés de ses serveurs après une heure.",
      },
      {
        q: "Smallpdf est-il sûr pour une pièce d’identité ?",
        a: "Smallpdf chiffre les transferts et met en avant sa certification ISO. Mais la pièce est envoyée et stockée un temps sur ses serveurs. Pour éviter tout envoi, Cachety fait le travail sur votre appareil.",
      },
    ],
    sources: [
      { label: "Smallpdf : outil filigrane et FAQ", url: "https://smallpdf.com/watermark-pdf" },
      { label: "Smallpdf : politique de confidentialité", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf : tarifs", url: "https://smallpdf.com/pricing" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "cachety-vs-pdf24",
    competitor: "pdf24",
    competitorName: "PDF24",
    competitorUrl: "https://tools.pdf24.org/fr/",
    title: "Cachety ou PDF24 : quel outil pour filigraner un PDF ?",
    metaTitle: "PDF24 filigrane : comparatif avec Cachety",
    description:
      "PDF24 ou Cachety pour filigraner un PDF ? PDF24 traite vos fichiers sur ses serveurs en Allemagne ; Cachety, dans votre navigateur. Points forts de chacun.",
    intro:
      "PDF24, édité à Berlin, est gratuit, sans limite et très complet. Son outil de filigrane en ligne fait bien son travail. La différence avec Cachety tient surtout au chemin que prend votre fichier.",
    verdict:
      "PDF24 est un excellent outil gratuit, financé par la publicité, avec un logiciel Windows qui travaille hors ligne. Ses outils en ligne, en revanche, traitent vos fichiers sur ses serveurs, avec une suppression sous une heure. Pour une pièce d’identité, Cachety évite l’envoi, sans publicité.",
    table: [
      {
        criterion: "Où le fichier est traité",
        cachety: CACHETY.where,
        other: "En ligne : sur ses serveurs en Allemagne. Hors ligne : logiciel PDF24 Creator pour Windows.",
        edge: "cachety",
      },
      {
        criterion: "Conservation des fichiers",
        cachety: CACHETY.retention,
        other: "Supprimés automatiquement du serveur une heure après le traitement, ou à la main.",
        edge: "cachety",
      },
      {
        criterion: "Prix et compte",
        cachety: "Gratuit, sans compte.",
        other: "Gratuit, sans limite, sans compte, y compris pour les entreprises.",
      },
      {
        criterion: "Publicité et pisteurs",
        cachety: CACHETY.ads,
        other: "Financé par la publicité ; sa politique cite Google AdSense, Google Analytics et le remarketing Google.",
        edge: "cachety",
      },
      {
        criterion: "Type de filigrane",
        cachety: CACHETY.watermark,
        other: "Texte : police, taille, couleur, transparence, angle, 9 positions ou page entière.",
      },
      {
        criterion: "Filigrane fondu dans la page",
        cachety: "Oui : il ne s’enlève pas en modifiant le PDF.",
        other: "Non documenté.",
      },
      {
        criterion: "Masquage, mot de passe, métadonnées",
        cachety: "Tout dans le même outil, en une fois.",
        other: "Outils séparés : censurer, protéger, supprimer les métadonnées, aplatir.",
      },
      {
        criterion: "Une copie par destinataire",
        cachety: CACHETY.recipients,
        other: "Non documenté.",
      },
      {
        criterion: "Logiciel de bureau hors ligne",
        cachety: "Non : site web seulement (marche hors ligne une fois chargé).",
        other: "Oui : PDF24 Creator, gratuit, pour Windows ; les fichiers restent sur le PC.",
        edge: "other",
      },
      {
        criterion: "Autres outils PDF",
        cachety: CACHETY.otherTools,
        other: "Plusieurs dizaines d’outils gratuits.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "PDF24, gratuit et généreux" },
      {
        type: "p",
        text: "PDF24 propose gratuitement plusieurs dizaines d’outils PDF, sans compte et sans limite d’usage. Il se finance par la publicité. Son filigrane permet de choisir la police, la couleur, l’angle, la position ou de remplir toute la page.",
      },
      { type: "h2", text: "En ligne, vos fichiers passent par ses serveurs" },
      {
        type: "p",
        text: "PDF24 l’écrit clairement : avec les outils en ligne, le filigrane est ajouté sur ses serveurs, situés en Allemagne, et le fichier est supprimé une heure après le traitement. C’est transparent et encadré par le RGPD. Mais votre pièce d’identité fait tout de même le voyage, puis attend sur un serveur qui n’est pas le vôtre. Avec Cachety, il n’y a pas de voyage : le filigrane est ajouté par votre navigateur. Et il n’y a ni publicité ni pisteur aujourd’hui.",
      },
      { type: "h2", text: "PDF24 Creator, la bonne option sous Windows" },
      {
        type: "p",
        text: "Si vous êtes sous Windows et voulez un logiciel installé, PDF24 Creator est gratuit et garde vos fichiers sur votre PC, selon son éditeur. C’est une vraie alternative pour travailler hors ligne, avec beaucoup plus d’outils que Cachety.",
      },
      { type: "h2", text: "Ce que Cachety ajoute pour les papiers d’identité" },
      {
        type: "list",
        items: [
          "Masquage, mot de passe et retrait des données cachées dans le même écran que le filigrane.",
          "Une version par destinataire, avec date et référence unique en option.",
          "Le même fonctionnement sur iPhone, Android et ordinateur, sans rien installer.",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous êtes sous Windows et voulez un logiciel gratuit installé, qui travaille hors ligne.",
      "Vous avez besoin de nombreux autres outils PDF gratuits.",
      "Vous voulez choisir précisément la position du filigrane, par exemple en bas de page.",
    ],
    chooseCachety: [
      "Vous filigranez une pièce d’identité depuis un téléphone ou un Mac, sans rien installer ni rien envoyer.",
      "Vous voulez un outil sans publicité.",
      "Vous voulez masquer, protéger et faire une version par destinataire en une seule fois.",
    ],
    faq: [
      {
        q: "PDF24 envoie-t-il mes fichiers sur internet ?",
        a: "Avec les outils en ligne, oui : PDF24 indique que le traitement se fait sur ses serveurs en Allemagne et que les fichiers sont supprimés une heure après. Avec son logiciel Windows PDF24 Creator, les fichiers restent sur votre PC.",
      },
      {
        q: "PDF24 est-il gratuit ?",
        a: "Oui, sans limite et sans compte, y compris pour un usage professionnel. Le site est financé par la publicité.",
      },
      {
        q: "Quelle alternative à PDF24 pour filigraner sur téléphone sans envoi ?",
        a: "Cachety fonctionne dans le navigateur de l’iPhone ou d’Android et traite le fichier sur place. Rien n’est envoyé, ce que vous pouvez vérifier en mode avion.",
      },
    ],
    sources: [
      { label: "PDF24 : ajouter un filigrane", url: "https://tools.pdf24.org/fr/ajouter-filigrane-pdf" },
      { label: "PDF24 : FAQ", url: "https://tools.pdf24.org/fr/faq" },
      { label: "PDF24 : politique de confidentialité", url: "https://www.pdf24.org/en/privacy-policy" },
      { label: "PDF24 : liste des outils", url: "https://tools.pdf24.org/en/all-tools" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "cachety-vs-soda-pdf",
    competitor: "soda-pdf",
    competitorName: "Soda PDF",
    competitorUrl: "https://www.sodapdf.com/",
    title: "Cachety ou Soda PDF : quel filigrane pour vos documents ?",
    metaTitle: "Soda PDF filigrane : comparatif avec Cachety",
    description:
      "Soda PDF ou Cachety ? Le filigrane de Soda PDF peut être retiré et vos fichiers vont sur ses serveurs. Cachety le fond dans la page, sur votre appareil.",
    intro:
      "Soda PDF est un éditeur PDF complet, édité par le groupe Avanquest, dont l’entité responsable des données est basée en France. Il propose un outil de filigrane en ligne. Mais son objectif n’est pas le même que celui de Cachety.",
    verdict:
      "Soda PDF est fait pour éditer des PDF : son filigrane, texte ou image, reste modifiable et peut être retiré, ce que sa page présente comme un avantage. Pour une pièce d’identité, c’est l’inverse de ce qu’on cherche. Cachety fond le filigrane dans la page et garde le fichier sur votre appareil.",
    table: [
      {
        criterion: "Où le fichier est traité",
        cachety: CACHETY.where,
        other: "Sur ses serveurs pour l’outil en ligne ; logiciel de bureau aussi proposé.",
        edge: "cachety",
      },
      {
        criterion: "Conservation des fichiers",
        cachety: CACHETY.retention,
        other: "Supprimés de ses serveurs dans les 24 heures.",
        edge: "cachety",
      },
      {
        criterion: "Limites en ligne gratuites",
        cachety: "Pas de quota : 200 Mo par fichier, selon la mémoire de l’appareil.",
        other: "Fichiers de 3 Mo maximum, 2 fichiers par jour.",
        edge: "cachety",
      },
      {
        criterion: "Publicité et pisteurs",
        cachety: CACHETY.ads,
        other: "Sa politique cite Google Analytics, Google Ads, AdSense, Facebook et LinkedIn, avec consentement.",
        edge: "cachety",
      },
      {
        criterion: "Filigrane amovible ?",
        cachety: "Non : fondu dans l’image de la page, il ne s’enlève pas en modifiant le PDF.",
        other: "Oui : sa page indique que les filigranes « ne sont pas permanents » et peuvent être retirés.",
        edge: "cachety",
      },
      {
        criterion: "Type de filigrane",
        cachety: CACHETY.watermark,
        other: "Texte ou image : police, taille, rotation, opacité, position, devant ou derrière la page.",
      },
      {
        criterion: "Filigrane avec logo",
        cachety: CACHETY.logo,
        other: "Oui.",
        edge: "other",
      },
      {
        criterion: "Masquage et mot de passe",
        cachety: "Masquage de zones et mot de passe en option.",
        other: "Mot de passe via l’outil « Protéger » ; masquage en ligne non documenté.",
        edge: "cachety",
      },
      {
        criterion: "Édition de PDF",
        cachety: "Non.",
        other: "Oui : éditeur complet, en ligne et sur ordinateur.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Un filigrane modifiable, ou un filigrane fondu ?" },
      {
        type: "p",
        text: "Il existe deux façons d’ajouter un filigrane à un PDF. La première pose le texte comme un élément à part, par-dessus la page. On peut ensuite le déplacer, le modifier ou le supprimer. C’est pratique pour un document de travail, et c’est ce que met en avant Soda PDF : « Les filigranes PDF ne sont pas permanents ».",
      },
      {
        type: "p",
        text: "La seconde fond le texte dans l’image de la page. C’est ce que fait Cachety : chaque page est redessinée avec le filigrane, qui ne peut plus être retiré en éditant le PDF. Pour une pièce d’identité, c’est ce qu’il faut, sinon le destinataire, ou un fraudeur, pourrait enlever la mention.",
      },
      { type: "h2", text: "Où va votre fichier ?" },
      {
        type: "p",
        text: "L’outil en ligne de Soda PDF envoie votre document sur ses serveurs et indique le supprimer dans les 24 heures. Pendant ce temps, la copie de votre pièce d’identité est chez lui. Avec Cachety, elle ne quitte pas votre appareil.",
      },
      { type: "h2", text: "Là où Soda PDF est le bon choix" },
      {
        type: "list",
        items: [
          "Vous voulez mettre le logo de votre entreprise sur un devis ou une plaquette.",
          "Vous avez besoin de modifier, convertir ou signer des PDF.",
          "Vous voulez pouvoir changer ou retirer le filigrane plus tard.",
          "Vous préférez un logiciel installé sur votre ordinateur.",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous voulez un filigrane avec logo sur un document professionnel.",
      "Vous voulez pouvoir modifier ou retirer le filigrane plus tard.",
      "Vous cherchez un éditeur PDF complet, en ligne ou sur ordinateur.",
    ],
    chooseCachety: [
      "Vous protégez une pièce d’identité ou un justificatif, et le filigrane ne doit pas pouvoir être enlevé.",
      "Vous ne voulez pas envoyer le document en ligne.",
      "Vous avez plus de deux fichiers à traiter, ou des fichiers de plus de 3 Mo, sans payer.",
    ],
    faq: [
      {
        q: "Peut-on enlever un filigrane ajouté avec Soda PDF ?",
        a: "Oui. Soda PDF indique lui-même que ses filigranes ne sont pas permanents et qu’on peut les retirer. Avec Cachety, le texte est fondu dans l’image de la page et ne s’enlève pas en modifiant le PDF.",
      },
      {
        q: "Soda PDF garde-t-il mes fichiers ?",
        a: "Sa page indique que les fichiers sont supprimés de ses serveurs dans les 24 heures.",
      },
      {
        q: "Quelle alternative gratuite à Soda PDF pour filigraner une pièce d’identité ?",
        a: "Cachety est gratuit, sans compte et sans quota quotidien. Le filigrane est ajouté sur votre appareil et fondu dans la page.",
      },
    ],
    sources: [
      { label: "Soda PDF : ajouter un filigrane", url: "https://www.sodapdf.com/pdf-tools/add-watermark-to-pdf/" },
      { label: "Soda PDF : politique de confidentialité", url: "https://www.sodapdf.com/privacy-policy/" },
      { label: "Soda PDF : outils en ligne", url: "https://www.sodapdf.com/pdf-tools/" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
