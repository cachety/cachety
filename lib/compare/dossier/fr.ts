import type { Comparison } from "../types";

// Comparatifs de l'outil Dossier (fr) : réunir PDF et photos en un seul
// fichier et le faire passer sous une taille maximale. Même règle éditoriale
// que les autres comparatifs (lib/compare/types.ts) ; chaque entrée porte
// tool: "dossier". Écrits pour un public en France. Texte brut uniquement.
// Chaque affirmation sur un autre outil s'appuie sur une page listée dans
// `sources`, lue à la date `checked`. Aucun prix : ils changent trop souvent.
//
// La colonne Cachety décrit l'outil Dossier tel qu'il est livré (sections,
// redressement des photos et taille libre compris) : limites de
// lib/watermark.ts et lib/pages.ts, tailles de lib/size-budget.ts et du bloc
// `dossier` de lib/i18n.tsx, dont viennent aussi les libellés cités (« Un seul
// PDF », « Autre… »), vérifiés le 2026-11-19. À garder en accord avec eux.
// Les affirmations sur les autres outils sont celles du comparatif anglais
// (lib/compare/dossier/en.ts), ni plus ni moins.

const CHECKED = "2026-11-19";
const UPDATED = "2026-11-19";

/** Adresse de l'outil, écrite sans schéma. */
const TOOL = "cachety.com/fr/dossier";

// Formulations communes pour la colonne Cachety.
const CACHETY = {
  where: "Dans votre navigateur, sur votre appareil. Rien n’est envoyé en ligne.",
  kept: "Rien n’est conservé : aucun serveur ne reçoit vos fichiers.",
  free: "Gratuit, sans compte, sans formule payante et sans limite par jour. Jusqu’à 200 Mo par fichier, 500 pages par PDF et 1 000 pages au total.",
  pages: "Toutes les pages de tous les fichiers dans une même grille : déplacez une page, même d’un fichier à l’autre, tournez-la ou retirez-la. Un seul PDF, ou un PDF par section que vous nommez.",
  size: "Vous choisissez une taille maximale : 1, 2, 5 ou 10 Mo, ou toute taille de 0,5 à 50 Mo. Cachety dit avant le téléchargement si le fichier tiendra dessous en restant lisible.",
  output:
    "Chaque page est reconstruite en image. On ne peut plus sélectionner le texte ni y faire de recherche, et un PDF qui ne contenait que du texte peut ressortir plus lourd.",
  hidden: "Retirés de chaque fichier : texte caché, auteur et autres propriétés, pièces jointes, liens, position GPS des photos.",
  inputs: "PDF et photos ensemble, photos HEIC d’iPhone comprises. La photo d’une feuille peut être redressée, recadrée et blanchie. Pas de fichiers Word, Excel ou PowerPoint.",
  offline: "Rien à installer. La page continue de fonctionner en mode avion une fois chargée, sur téléphone comme sur ordinateur.",
  ads: "Ni publicité ni pisteur. Le code est open source.",
};

/** Ligne « Options de fusion » du tableau, pour les outils qui ont signets et table des matières. */
const MERGE_OPTIONS = "L’ordre des pages, et un PDF par section si vous voulez plusieurs fichiers. Ni signets, ni table des matières.";

const PIXELS: Comparison["body"] = [
  { type: "h2", text: "À quoi ressemble un fichier fait par Cachety" },
  {
    type: "p",
    text: "Cachety n’assemble pas vos pages d’origine. Il reconstruit chaque page en image et fabrique un nouveau PDF à partir de ces images. C’est ainsi qu’il retire ce qu’on ne voit pas : texte caché, nom de l’auteur, pièces jointes, liens et position GPS des photos. Le prix à payer est réel : dans le nouveau fichier, on ne peut plus sélectionner le texte ni y faire de recherche, et un PDF qui ne contenait que du texte peut ressortir plus lourd que l’original, sauf si vous choisissez une taille maximale.",
  },
  {
    type: "warning",
    text: "Cachety n’est pas le bon outil quand le texte doit rester sélectionnable ou permettre la recherche, quand il faut conserver des signets ou des champs de formulaire, quand vous voulez ajouter des fichiers Word ou Excel, ou quand il vous faut la reconnaissance de texte (OCR) sur un scan.",
  },
];

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "Faire un seul PDF avec Cachety" },
  {
    type: "steps",
    items: [
      `Ouvrez ${TOOL} dans votre navigateur, sur ordinateur ou sur téléphone. Rien à installer, aucun compte à créer.`,
      "Ajoutez vos PDF et vos photos. Une photo devient une page.",
      "Passez aux pages : rangez-les en les faisant glisser, tournez celles qui sont de travers et retirez celles dont vous ne voulez pas.",
      "Choisissez « Un seul PDF » et, si on vous a fixé une taille maximale, choisissez 1, 2, 5 ou 10 Mo, ou « Autre… » pour une autre taille.",
      "Vérifiez l’aperçu, masquez toute information dont le destinataire n’a pas besoin, puis téléchargez le fichier.",
    ],
  },
];

const FAQ_UPLOADED = (other: string, answer: string) => ({
  q: `Mes fichiers sont-ils envoyés en ligne avec Cachety ou ${other} ?`,
  a: `Avec Cachety, non : tout se fait dans votre navigateur et aucun serveur ne reçoit vos fichiers. ${answer}`,
});

const FAQ_TEXT = {
  q: "Le texte reste-t-il sélectionnable après une fusion avec Cachety ?",
  a: "Non. Cachety reconstruit chaque page en image, ce qui retire les données cachées mais aussi le texte sélectionnable. Si vous avez besoin du texte, utilisez un outil qui assemble les pages d’origine.",
};

export const DOSSIER_COMPARISONS_FR: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-ilovepdf-merge",
    competitor: "ilovepdf-merge",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "Cachety ou iLovePDF : fusionner et compresser des PDF sans les envoyer en ligne",
    metaTitle: "Alternative à iLovePDF : fusionner des PDF sans envoi",
    description:
      "iLovePDF fusionne et compresse les PDF sur ses serveurs. Cachety le fait dans votre navigateur : rien n’est envoyé, et les données cachées sont retirées.",
    intro:
      "iLovePDF est l’un des ensembles d’outils PDF en ligne les plus utilisés, conçu à Barcelone. Ses outils de fusion et de compression traitent vos fichiers sur ses serveurs. Cachety fait un travail plus limité, sur votre propre appareil : il réunit PDF et photos en un seul fichier, sous une taille maximale, sans les envoyer en ligne.",
    verdict:
      "iLovePDF en fait plus : fichiers Office, reconnaissance de texte, nombreux fichiers à la fois, et une application de bureau payante qui fonctionne hors ligne. Pour tout cela, c’est le meilleur choix. Cachety est le meilleur choix quand il s’agit de documents personnels que vous préférez ne pas envoyer en ligne, quand photos et PDF doivent aller dans le même fichier, ou quand un formulaire fixe une taille maximale en mégaoctets.",
    table: [
      {
        criterion: "Où les fichiers sont traités",
        cachety: CACHETY.where,
        other: "Sur les serveurs d’iLovePDF pour le site. L’application de bureau, avec une formule payante, traite les fichiers sur votre ordinateur.",
        edge: "cachety",
      },
      {
        criterion: "Durée de conservation des fichiers",
        cachety: CACHETY.kept,
        other: "Supprimés automatiquement dans les deux heures suivant leur traitement. Un bouton sur l’écran de téléchargement les supprime plus tôt.",
        edge: "cachety",
      },
      {
        criterion: "Compte, usage gratuit et limites",
        cachety: CACHETY.free,
        other: "Gratuit sans inscription, pour un nombre limité de documents. Fusion gratuite : jusqu’à 100 fichiers et 300 Mo par tâche. Compression gratuite : 5 fichiers par tâche. Une formule payante relève ces limites.",
      },
      {
        criterion: "Ranger les pages",
        cachety: CACHETY.pages,
        other: "La fusion réordonne des fichiers entiers. Un autre outil, consacré à l’organisation des pages (Organize PDF), trie, supprime et tourne les pages une à une ; il permet aussi d’ajouter d’autres fichiers et de les fusionner (gratuit : 5 fichiers, 100 Mo).",
      },
      {
        criterion: "Passer sous une taille maximale",
        cachety: CACHETY.size,
        other: "Trois niveaux : compression extrême, recommandée ou moindre. Pas de taille en mégaoctets à viser.",
        edge: "cachety",
      },
      {
        criterion: "Photos et PDF ensemble",
        cachety: CACHETY.inputs,
        other: "En deux temps sur le site : convertir d’abord les images en PDF, puis fusionner. Les fichiers Word, Excel et PowerPoint ont leurs propres convertisseurs.",
      },
      {
        criterion: "À quoi ressemble le nouveau PDF",
        cachety: CACHETY.output,
        other: "Non décrit sur la page de l’outil de fusion. Un outil séparé reconnaît le texte (OCR) pour qu’on puisse faire des recherches dans un scan.",
      },
      {
        criterion: "Données cachées",
        cachety: CACHETY.hidden,
        other: "Non documenté pour les outils du site. L’application de bureau peut modifier ou effacer les métadonnées d’un PDF.",
      },
      {
        criterion: "Applications et usage hors ligne",
        cachety: CACHETY.offline,
        other: "Une application de bureau pour Windows et Mac, qui fonctionne hors ligne : sa version gratuite est un lecteur de PDF, et les outils demandent une formule payante. Applications pour iOS et Android.",
      },
      {
        criterion: "Publicité et pisteurs",
        cachety: CACHETY.ads,
        other: "La formule gratuite affiche de la publicité ; la formule payante la retire.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Une grande boîte à outils en ligne, et un outil qui reste sur votre appareil" },
      {
        type: "p",
        text: "Sur le site d’iLovePDF, vos fichiers sont envoyés sur ses serveurs, traités là-bas, puis supprimés automatiquement dans les deux heures. Vous pouvez les supprimer plus tôt depuis l’écran de téléchargement. iLovePDF indique détenir la certification ISO/IEC 27001 et transférer les fichiers par une connexion chiffrée. Le site est disponible en 26 langues.",
      },
      {
        type: "p",
        text: "Cachety ne fait que préparer un fichier à envoyer : les PDF et les photos qu’on vous a demandés, dans l’ordre, en un seul PDF de la bonne taille. Tout se passe dans votre navigateur. Rien n’est envoyé en ligne, donc il n’y a rien à supprimer ensuite.",
      },
      { type: "h2", text: "Là où iLovePDF fait mieux" },
      {
        type: "list",
        items: [
          "Il convertit les fichiers Word, Excel et PowerPoint en PDF.",
          "Il reconnaît le texte des scans (OCR) : on peut alors faire des recherches dans un PDF scanné.",
          "Il accepte les gros travaux : jusqu’à 100 fichiers dans une fusion gratuite.",
          "Son application de bureau payante traite les fichiers sur votre ordinateur, avec la plupart des outils du site.",
        ],
      },
      { type: "h2", text: "Là où Cachety fait mieux" },
      {
        type: "list",
        items: [
          "Vos fichiers ne sont jamais envoyés en ligne, gratuitement, sur téléphone comme sur ordinateur.",
          "Photos et PDF vont dans le même fichier en une seule étape, et chaque page peut être déplacée, tournée ou retirée au même endroit.",
          "Vous choisissez une taille en mégaoctets, comme les formulaires en ligne expriment leurs limites, et vous êtes prévenu avant le téléchargement si elle ne peut pas être atteinte en restant lisible.",
          "Les données cachées sont retirées de chaque fichier, et il n’y a pas de publicité.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous devez convertir des fichiers Word, Excel ou PowerPoint, ou reconnaître le texte d’un scan.",
      "Vous avez beaucoup de fichiers ou de très gros PDF à traiter en une fois.",
      "Vous payez iLovePDF et utilisez son application de bureau, qui travaille sur votre ordinateur.",
    ],
    chooseCachety: [
      "Ce sont des pièces d’identité, des fiches de paie ou des relevés de compte, et vous préférez ne pas les envoyer en ligne.",
      "Il vous faut photos et PDF dans le même fichier, avec les pages dans votre ordre.",
      "Un formulaire demande un seul fichier, ou un fichier par type de document, sous une taille maximale donnée en mégaoctets.",
    ],
    faq: [
      FAQ_UPLOADED(
        "iLovePDF",
        "Avec le site d’iLovePDF, oui : les fichiers sont traités sur ses serveurs et supprimés dans les deux heures. Son application de bureau traite les fichiers sur votre ordinateur, avec une formule payante."
      ),
      {
        q: "iLovePDF peut-il compresser un PDF à une taille précise ?",
        a: "Non. Il propose trois niveaux de compression, et son propre guide indique qu’aucun outil ne peut promettre une taille de sortie exacte. Avec Cachety, vous choisissez une taille maximale en mégaoctets, et vous êtes prévenu avant le téléchargement si le fichier ne peut pas tenir dessous en restant lisible.",
      },
      {
        q: "iLovePDF fonctionne-t-il hors ligne ?",
        a: "Son application de bureau pour Windows et Mac, oui, mais les outils qu’elle contient demandent une formule payante. Cachety est une page web qui continue de fonctionner en mode avion une fois chargée, gratuitement.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "iLovePDF : fusionner des PDF", url: "https://www.ilovepdf.com/merge_pdf" },
      { label: "iLovePDF : compresser un PDF", url: "https://www.ilovepdf.com/compress_pdf" },
      { label: "iLovePDF : tarifs et limites par outil", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF : sécurité", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF : questions et réponses", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF Desktop", url: "https://www.ilovepdf.com/desktop" },
      { label: "Blog d’iLovePDF : web, bureau ou mobile", url: "https://www.ilovepdf.com/blog/pdf-web-or-desktop" },
      { label: "Blog d’iLovePDF : organiser les pages d’un PDF", url: "https://www.ilovepdf.com/blog/organize-pdf-pages" },
      { label: "Blog d’iLovePDF : fusionner des fichiers PDF et JPG", url: "https://www.ilovepdf.com/blog/merge-pdf-and-jpg-files-online" },
      { label: "Blog d’iLovePDF : compresser un PDF à une taille précise", url: "https://www.ilovepdf.com/blog/compress-pdf-to-specific-size" },
      {
        label: "Blog d’iLovePDF : modifier ou supprimer les métadonnées d’un PDF",
        url: "https://www.ilovepdf.com/blog/edit-or-remove-pdf-metadata-windows-mac",
      },
      { label: "Blog d’iLovePDF : les 15 ans d’iLovePDF", url: "https://www.ilovepdf.com/blog/ilovepdf-15-years-anniversary-milestones" },
      { label: "À propos d’iLovePDF", url: "https://www.ilovepdf.com/help/about" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-smallpdf-merge",
    competitor: "smallpdf-merge",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/",
    title: "Cachety ou Smallpdf : fusionner et compresser des PDF sans les envoyer en ligne",
    metaTitle: "Alternative à Smallpdf : fusionner des PDF sans envoi",
    description:
      "Smallpdf fusionne et compresse les PDF dans le cloud, avec une limite gratuite par jour. Cachety le fait dans votre navigateur, gratuitement et sans envoi.",
    intro:
      "Smallpdf est un ensemble d’outils PDF en ligne bien connu, venu de Suisse, avec des applications pour téléphone et pour Windows. Ses outils de fusion et de compression travaillent dans le cloud. Cachety fait un travail plus limité, sur votre propre appareil : il réunit PDF et photos en un seul fichier, sous une taille maximale, sans les envoyer en ligne.",
    verdict:
      "Smallpdf en fait plus : il accepte les fichiers Word, Excel et PowerPoint, reconnaît le texte des scans et propose une application Windows qui fonctionne hors ligne. Pour tout cela, c’est le meilleur choix. Cachety est le meilleur choix quand il s’agit de documents personnels que vous préférez ne pas envoyer en ligne, quand la limite par jour de la formule gratuite ne vous suffit pas, ou quand un formulaire fixe une taille maximale en mégaoctets.",
    table: [
      {
        criterion: "Où les fichiers sont traités",
        cachety: CACHETY.where,
        other: "Dans le cloud. Les fichiers sont envoyés sur des serveurs situés dans l’Union européenne. L’application de bureau pour Windows traite les fichiers hors ligne.",
        edge: "cachety",
      },
      {
        criterion: "Durée de conservation des fichiers",
        cachety: CACHETY.kept,
        other: "D’après les pages produit de Smallpdf, supprimés des serveurs au bout d’une heure, sauf si vous les enregistrez dans votre compte.",
        edge: "cachety",
      },
      {
        criterion: "Compte, usage gratuit et limites",
        cachety: CACHETY.free,
        other: "Aucune inscription nécessaire. L’usage gratuit a une limite de téléchargements par jour et une limite de taille de fichier ; une formule payante les supprime.",
        edge: "cachety",
      },
      {
        criterion: "Ranger les pages",
        cachety: CACHETY.pages,
        other: "La fusion peut afficher les pages de tous les fichiers pour les réorganiser, les tourner ou les supprimer ; la page des tarifs de Smallpdf range cette vue par pages dans la formule payante. L’outil d’organisation (Organize) réordonne, tourne, supprime et ajoute des pages, et peut combiner plusieurs documents.",
      },
      {
        criterion: "Passer sous une taille maximale",
        cachety: CACHETY.size,
        other: "Des niveaux de compression, pas une taille en mégaoctets. La compression de base est gratuite ; les niveaux plus forts font partie de la formule payante.",
        edge: "cachety",
      },
      {
        criterion: "Types de fichiers acceptés",
        cachety: CACHETY.inputs,
        other: "PDF, Word, Excel, PowerPoint, JPG et PNG dans la fusion : les autres fichiers sont d’abord convertis en PDF. Photos HEIC dans l’outil qui convertit les JPG en PDF.",
        edge: "other",
      },
      {
        criterion: "À quoi ressemble le nouveau PDF",
        cachety: CACHETY.output,
        other: "Non décrit sur la page de l’outil de fusion. La reconnaissance de texte (OCR) est proposée dans un outil séparé.",
      },
      {
        criterion: "Données cachées",
        cachety: CACHETY.hidden,
        other: "Non décrit pour la fusion. Le blog de Smallpdf indique que ses outils de compression et d’aplatissement (Compress, Flatten) retirent les métadonnées, dans une étape séparée.",
      },
      {
        criterion: "Applications et usage hors ligne",
        cachety: CACHETY.offline,
        other: "Applications pour iOS et Android, et une application de bureau pour Windows qui fonctionne hors ligne. L’application de bureau pour Mac n’est plus prise en charge.",
      },
    ],
    body: [
      { type: "h2", text: "Une boîte à outils dans le cloud, et un outil qui reste sur votre appareil" },
      {
        type: "p",
        text: "Smallpdf présente ses outils de fusion et de compression comme des outils dans le cloud : vos fichiers sont envoyés, traités sur ses serveurs, puis supprimés au bout d’une heure, sauf si vous les enregistrez dans votre compte. Smallpdf indique être certifié ISO/IEC 27001 et utiliser le chiffrement TLS pendant le transfert des fichiers. Ses outils sont disponibles en 24 langues.",
      },
      {
        type: "p",
        text: "Cachety n’a ici qu’une tâche : faire, avec les PDF et les photos qu’on vous a demandés, un seul fichier propre et de la bonne taille. Tout se passe dans votre navigateur. Rien n’est envoyé en ligne, donc il n’y a rien à supprimer ensuite.",
      },
      { type: "h2", text: "Là où Smallpdf fait mieux" },
      {
        type: "list",
        items: [
          "Il convertit les fichiers Word, Excel et PowerPoint en PDF et les fusionne en une seule fois.",
          "Il propose la reconnaissance de texte (OCR) : on peut alors faire des recherches dans un scan.",
          "Il a des applications pour téléphone avec un scanner, et une application Windows qui traite les fichiers hors ligne.",
          "Un compte permet de garder vos documents en ligne et de les retrouver sur un autre appareil.",
        ],
      },
      { type: "h2", text: "Là où Cachety fait mieux" },
      {
        type: "list",
        items: [
          "Vos fichiers ne sont jamais envoyés en ligne, sur téléphone comme sur ordinateur, sans rien installer.",
          "Il n’y a ni limite par jour ni formule payante.",
          "Vous choisissez une taille en mégaoctets, comme les formulaires en ligne expriment leurs limites, et vous êtes prévenu avant le téléchargement si elle ne peut pas être atteinte en restant lisible.",
          "Les données cachées sont retirées de chaque fichier, sans étape supplémentaire.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous devez ajouter des fichiers Word, Excel ou PowerPoint au PDF fusionné.",
      "Il vous faut la reconnaissance du texte d’un scan (OCR).",
      "Vous êtes sous Windows et voulez une application installée qui fonctionne hors ligne.",
      "Vous voulez garder vos documents dans un compte en ligne.",
    ],
    chooseCachety: [
      "Ce sont des pièces d’identité, des fiches de paie ou des relevés de compte, et vous préférez ne pas les envoyer en ligne.",
      "Un formulaire demande un seul fichier, ou un fichier par type de document, sous une taille maximale donnée en mégaoctets.",
      "Vous êtes sur téléphone et ne voulez ni installer d’application ni créer de compte.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Smallpdf",
        "Avec les outils en ligne de Smallpdf, oui : les fichiers sont envoyés sur ses serveurs et, d’après ses pages produit, supprimés au bout d’une heure, sauf si vous les enregistrez dans votre compte. Son application de bureau pour Windows traite les fichiers hors ligne."
      ),
      {
        q: "Smallpdf peut-il compresser un PDF à une taille précise ?",
        a: "Non. Smallpdf propose des niveaux de compression, et son propre blog indique que l’outil ne permet pas de saisir une taille exacte. Avec Cachety, vous choisissez une taille maximale en mégaoctets, et le fichier est gardé dessous quand c’est possible en restant lisible.",
      },
      {
        q: "Smallpdf est-il gratuit ?",
        a: "En partie. La fusion et la compression de base sont gratuites, avec une limite de téléchargements par jour ; la compression plus forte et l’usage illimité font partie de la formule payante. Cachety est gratuit, sans limite par jour et sans formule payante.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Smallpdf : fusionner des PDF", url: "https://smallpdf.com/merge-pdf" },
      { label: "Smallpdf : compresser un PDF", url: "https://smallpdf.com/compress-pdf" },
      { label: "Smallpdf : organiser un PDF", url: "https://smallpdf.com/organize-pdf" },
      { label: "Smallpdf : JPG en PDF", url: "https://smallpdf.com/jpg-to-pdf" },
      { label: "Smallpdf : tarifs et comparaison des formules", url: "https://smallpdf.com/pricing" },
      { label: "Smallpdf : avis de confidentialité", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf : Trust Center", url: "https://smallpdf.com/trust-center" },
      { label: "Smallpdf : applications et extensions", url: "https://smallpdf.com/download" },
      { label: "Blog de Smallpdf : compresser un PDF à une taille choisie", url: "https://smallpdf.com/blog/compress-pdf-to-chosen-size" },
      { label: "Blog de Smallpdf : supprimer les métadonnées d’un PDF", url: "https://smallpdf.com/blog/ways-to-remove-pdf-metadata" },
      { label: "À propos de Smallpdf", url: "https://smallpdf.com/about" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────────── Adobe Acrobat ───────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-adobe-merge",
    competitor: "adobe-merge",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat/online.html",
    title: "Cachety ou Adobe Acrobat en ligne : fusionner et compresser des PDF",
    metaTitle: "Alternative à Adobe Acrobat pour fusionner sans envoi",
    description:
      "Les outils en ligne gratuits d’Adobe fusionnent et compressent les PDF sur ses serveurs. Cachety le fait dans votre navigateur, sans envoi ni compte.",
    intro:
      "Adobe a inventé le PDF, et ses outils Acrobat en ligne gratuits fusionnent et compressent les PDF dans n’importe quel navigateur. Les fichiers sont traités sur les serveurs d’Adobe. Cachety fait un travail plus limité, sur votre propre appareil : il réunit PDF et photos en un seul fichier, sous une taille maximale, sans les envoyer en ligne.",
    verdict:
      "Pour des PDF dont le texte doit rester tel quel, la fusion d’Adobe est le meilleur choix : elle combine les fichiers sans réduire la qualité des images, du texte ou de la mise en forme, et accepte jusqu’à 100 fichiers. Son application de bureau payante en fait bien plus que Cachety. Cachety est le meilleur choix pour des documents personnels que vous préférez ne pas envoyer en ligne, pour mélanger photos et PDF en une seule étape, et pour respecter une taille maximale donnée en mégaoctets.",
    table: [
      {
        criterion: "Où les fichiers sont traités",
        cachety: CACHETY.where,
        other: "Sur les serveurs d’Adobe pour les outils en ligne. L’application de bureau Acrobat compresse les fichiers en local, sur votre appareil.",
        edge: "cachety",
      },
      {
        criterion: "Durée de conservation des fichiers",
        cachety: CACHETY.kept,
        other: "Supprimés des serveurs d’Adobe, sauf si vous vous connectez pour les enregistrer dans votre compte. Vous pouvez supprimer vous-même un fichier après l’avoir téléchargé.",
        edge: "cachety",
      },
      {
        criterion: "Compte, usage gratuit et limites",
        cachety: CACHETY.free,
        other: "Fusion : jusqu’à 100 fichiers de 500 pages chacun et 1 500 pages dans le fichier fusionné, sans filigrane. Compression : gratuite avec un usage limité ; l’usage illimité demande une formule payante.",
      },
      {
        criterion: "Ranger les pages",
        cachety: CACHETY.pages,
        other: "Les fichiers peuvent être réordonnés avant la fusion. Réorganiser les pages une à une demande de se connecter ; un compte gratuit suffit.",
        edge: "cachety",
      },
      {
        criterion: "Passer sous une taille maximale",
        cachety: CACHETY.size,
        other: "Trois niveaux de compression : élevé, moyen et faible. Fichiers jusqu’à 2 Go.",
      },
      {
        criterion: "Photos et autres types de fichiers",
        cachety: CACHETY.inputs,
        other: "La fusion gratuite accepte les PDF. Combiner des PDF avec des fichiers Word, Excel, PowerPoint ou des images fait partie d’Acrobat Pro. Des outils gratuits séparés transforment des images, photos HEIC comprises, en PDF, pour un nombre limité de conversions.",
      },
      {
        criterion: "À quoi ressemble le nouveau PDF",
        cachety: CACHETY.output,
        other: "Les fichiers sont combinés sans compression et sans perte de qualité des images, du texte ou de la mise en forme.",
        edge: "other",
      },
      {
        criterion: "Données cachées",
        cachety: CACHETY.hidden,
        other: "La suppression des informations masquées (« sanitize » en anglais) et le caviardage sont des fonctions d’Acrobat Pro, payant.",
        edge: "cachety",
      },
      {
        criterion: "Applications et usage hors ligne",
        cachety: CACHETY.offline,
        other: "Acrobat Reader, gratuit, permet de lire, d’annoter, de remplir et de signer. La modification, la conversion et la compression sont dans l’application de bureau payante. L’application pour téléphone Adobe Scan stocke les scans dans le stockage en ligne d’Adobe.",
      },
    ],
    body: [
      { type: "h2", text: "La référence du PDF, et un petit outil pour une seule tâche" },
      {
        type: "p",
        text: "Adobe propose plus de 25 outils en ligne gratuits. L’outil de fusion accepte jusqu’à 100 fichiers et les combine sans modifier leur qualité. L’outil de compression propose trois niveaux. Tous deux envoient vos fichiers sur les serveurs d’Adobe, où ils sont supprimés sauf si vous vous connectez pour les enregistrer. Adobe indique que les fichiers sont chiffrés pendant le transfert et au repos, et cite ISO 27001 et SOC 2 parmi ses certifications pour Acrobat sur le web.",
      },
      {
        type: "p",
        text: "Cachety ne fait que préparer un fichier à envoyer : les PDF et les photos qu’on vous a demandés, dans l’ordre, en un seul PDF de la bonne taille. Tout se passe dans votre navigateur, sans connexion à un compte à aucune étape.",
      },
      { type: "h2", text: "Là où Adobe Acrobat fait mieux" },
      {
        type: "list",
        items: [
          "Le PDF fusionné garde la qualité du texte, des images et de la mise en forme d’origine.",
          "Il accepte les gros travaux : jusqu’à 100 fichiers dans une fusion, et des fichiers jusqu’à 2 Go dans l’outil de compression.",
          "L’application de bureau payante modifie le texte et les images, convertit les fichiers, compresse et caviarde.",
          "Si vous payez déjà Acrobat, tout est au même endroit, avec vos fichiers dans votre compte Adobe.",
        ],
      },
      { type: "h2", text: "Là où Cachety fait mieux" },
      {
        type: "list",
        items: [
          "Vos fichiers ne sont jamais envoyés en ligne, et vous n’avez à vous connecter à aucun moment.",
          "Déplacer, tourner et retirer des pages une à une est gratuit et ne demande aucun compte.",
          "Photos et PDF vont dans le même fichier en une seule étape. Avec les outils gratuits d’Adobe, il faut d’abord convertir les photos en PDF, puis fusionner.",
          "Les données cachées sont retirées de chaque fichier, une fonction qu’Adobe réserve à sa formule payante Pro.",
          "Vous choisissez une taille en mégaoctets et vous êtes prévenu avant le téléchargement si elle peut être atteinte ou non.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Le texte du PDF fusionné doit rester sélectionnable et permettre la recherche.",
      "Vous avez des dizaines de fichiers ou de très gros PDF à combiner.",
      "Vous payez déjà Acrobat, ou vous devez aussi modifier, convertir ou reconnaître du texte.",
    ],
    chooseCachety: [
      "Ce sont des pièces d’identité, des fiches de paie ou des relevés de compte, et vous préférez ne pas les envoyer en ligne.",
      "Vous voulez réordonner, tourner ou retirer des pages sans vous connecter.",
      "Vous devez mélanger photos et PDF, et garder le résultat sous une taille maximale donnée en mégaoctets.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Adobe Acrobat",
        "Avec les outils en ligne d’Adobe, oui : les fichiers sont traités sur les serveurs d’Adobe et supprimés sauf si vous vous connectez pour les enregistrer. L’application de bureau Acrobat travaille sur votre propre appareil."
      ),
      {
        q: "Faut-il un compte Adobe pour fusionner des PDF ?",
        a: "Pas pour fusionner et télécharger. Adobe demande de se connecter pour réorganiser les pages une à une ou pour partager le fichier par un lien. Avec Cachety, il n’y a pas de compte du tout.",
      },
      {
        q: "Acrobat en ligne peut-il supprimer les métadonnées d’un PDF ?",
        a: "La suppression des informations masquées est une fonction d’Acrobat Pro, payant. Cachety retire les données cachées de chaque fichier qu’il fabrique, en reconstruisant les pages en images.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Adobe Acrobat : outils en ligne gratuits", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat : fusionner des PDF", url: "https://www.adobe.com/acrobat/online/merge-pdf.html" },
      { label: "Adobe Acrobat : compresser un PDF", url: "https://www.adobe.com/acrobat/online/compress-pdf.html" },
      { label: "Adobe Acrobat : JPG en PDF", url: "https://www.adobe.com/acrobat/online/jpg-to-pdf.html" },
      { label: "Adobe Acrobat : image en PDF", url: "https://www.adobe.com/acrobat/online/image-to-pdf.html" },
      { label: "Adobe Acrobat : HEIC en PDF", url: "https://acrobat.adobe.com/heic-to-pdf" },
      { label: "Adobe Acrobat : réorganiser les pages d’un PDF", url: "https://www.adobe.com/acrobat/online/rearrange-pdf.html" },
      { label: "Adobe Acrobat : supprimer des pages d’un PDF", url: "https://www.adobe.com/acrobat/online/delete-pdf-pages.html" },
      { label: "Adobe Acrobat Reader", url: "https://www.adobe.com/acrobat/pdf-reader.html" },
      { label: "Adobe Acrobat : comparaison des formules", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe Scan", url: "https://www.adobe.com/acrobat/mobile/scanner-app.html" },
      {
        label: "Adobe Acrobat Services : présentation de la sécurité",
        url: "https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/doc-cloud/acrobat-dc-security-overview-ue.pdf",
      },
      { label: "Adobe : liste des certifications de conformité", url: "https://www.adobe.com/trust/compliance/compliance-list.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ────────────────────────────── PDF24 ──────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-pdf24-merge",
    competitor: "pdf24-merge",
    competitorName: "PDF24",
    competitorUrl: "https://tools.pdf24.org/",
    title: "Cachety ou PDF24 : fusionner et compresser des PDF sans les envoyer en ligne",
    metaTitle: "Alternative à PDF24 : fusionner des PDF sans envoi",
    description:
      "PDF24 fusionne et compresse en ligne sur ses serveurs ; son programme Windows travaille hors ligne. Cachety marche dans tout navigateur, sans envoi.",
    intro:
      "PDF24 est un ensemble d’outils PDF gratuits, venu d’Allemagne. Ses outils en ligne traitent les fichiers sur les serveurs de PDF24, et son programme pour Windows, PDF24 Creator, fait le même travail sur votre PC. Cachety fonctionne dans le navigateur de n’importe quel appareil et n’envoie jamais vos fichiers en ligne, mais son travail est plus limité.",
    verdict:
      "Sur un ordinateur Windows, PDF24 Creator est difficile à battre : il est gratuit, il fonctionne hors ligne et il assemble les pages d’origine, si bien que le texte reste tel qu’il était. Sur un téléphone, un Mac ou un ordinateur où vous ne pouvez rien installer, PDF24, ce sont ses outils en ligne, qui envoient vos fichiers sur ses serveurs. Là, Cachety est le meilleur choix pour des documents personnels, et il vous laisse choisir une taille en mégaoctets.",
    table: [
      {
        criterion: "Où les fichiers sont traités",
        cachety: CACHETY.where,
        other: "Outils en ligne : dans le cloud, sur les serveurs de PDF24. PDF24 Creator (Windows) : sur votre PC, sans envoi.",
      },
      {
        criterion: "Durée de conservation des fichiers",
        cachety: CACHETY.kept,
        other: "En ligne : supprimés automatiquement au bout d’une heure. On peut aussi les supprimer à la main tout de suite.",
        edge: "cachety",
      },
      {
        criterion: "Compte, usage gratuit et limites",
        cachety: CACHETY.free,
        other: "Gratuit et sans restriction, sans inscription. En ligne, un fichier peut peser jusqu’à 1 000 Mo et une tâche jusqu’à 10 Go.",
      },
      {
        criterion: "Ranger les pages",
        cachety: CACHETY.pages,
        other: "Les fichiers se réordonnent par glisser-déposer. Un mode page affiche les pages de tous les fichiers : vous choisissez celles que vous voulez et les faites glisser dans l’ordre, en laissant les autres de côté. Tourner des pages se fait dans un outil séparé.",
      },
      {
        criterion: "Passer sous une taille maximale",
        cachety: CACHETY.size,
        other: "Vous réglez la résolution (DPI) et la qualité des images, avec une option niveaux de gris. Il n’y a pas d’option « compresser à 5 Mo ».",
        edge: "cachety",
      },
      {
        criterion: "Types de fichiers acceptés",
        cachety: CACHETY.inputs,
        other: "PDF, images, documents Word et autres fichiers. Les photos HEIC d’iPhone ne sont pas prises en charge dans l’outil de fusion.",
      },
      {
        criterion: "À quoi ressemble le nouveau PDF",
        cachety: CACHETY.output,
        other: "Les pages sont reprises telles quelles, pas recréées : texte, images et polices gardent leur qualité.",
        edge: "other",
      },
      {
        criterion: "Données cachées",
        cachety: CACHETY.hidden,
        other: "Un outil séparé supprime les métadonnées d’un PDF. L’outil de compression peut aussi retirer les métadonnées, les pièces jointes et les annotations.",
      },
      {
        criterion: "Options de fusion",
        cachety: MERGE_OPTIONS,
        other: "Signets, table des matières, page de garde avant chaque fichier, pages blanches pour l’impression recto verso, nom du fichier sur les pages.",
        edge: "other",
      },
      {
        criterion: "Applications et usage hors ligne",
        cachety: CACHETY.offline,
        other: "PDF24 Creator apporte tous les outils hors ligne, sur Windows uniquement. Il n’existe pas encore de version Mac ou Linux, ni d’application dans les boutiques d’applications pour téléphone : les outils en ligne peuvent être ajoutés à l’écran d’accueil d’un téléphone, mais ils ont toujours besoin d’une connexion.",
      },
      {
        criterion: "Publicité et pisteurs",
        cachety: CACHETY.ads,
        other: "Les outils en ligne sont financés par la publicité. La politique de confidentialité cite Google AdSense et Google Analytics, entre autres.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Deux façons d’utiliser PDF24" },
      {
        type: "p",
        text: "Les outils en ligne de PDF24 sont gratuits, sans inscription, et financés par la publicité. Ils traitent vos fichiers sur les serveurs de PDF24 : le transfert est chiffré, et les fichiers sont supprimés au bout d’une heure. PDF24 est géré par une société installée à Berlin.",
      },
      {
        type: "p",
        text: "PDF24 Creator, c’est autre chose. C’est un programme gratuit pour Windows qui apporte tous les outils PDF24 sur votre PC, où les fichiers restent en local et ne sont pas envoyés en ligne. Si vous êtes sous Windows et pouvez installer un logiciel, il vous offre la même confidentialité que Cachety, avec plus de fonctions.",
      },
      { type: "h2", text: "Là où PDF24 fait mieux" },
      {
        type: "list",
        items: [
          "Le PDF fusionné garde les pages d’origine telles quelles : texte, images et polices gardent leur qualité.",
          "Des options de fusion que Cachety n’a pas : signets, table des matières, pages de garde, pages blanches pour l’impression recto verso.",
          "Il accepte les documents Word et d’autres fichiers, et propose la reconnaissance de texte (OCR).",
          "Sous Windows, PDF24 Creator fait tout cela hors ligne, gratuitement.",
          "Vous pouvez régler vous-même la résolution et la qualité des images pour la compression.",
        ],
      },
      { type: "h2", text: "Là où Cachety fait mieux" },
      {
        type: "list",
        items: [
          "Aucun envoi en ligne, quel que soit l’appareil : téléphone, Mac, ordinateur sous Linux ou PC où vous ne pouvez pas installer de logiciel.",
          "Vous choisissez une taille en mégaoctets, au lieu d’essayer des réglages jusqu’à ce que le fichier soit assez léger.",
          "Les photos HEIC d’iPhone sont acceptées telles quelles.",
          "Les données cachées sont retirées de chaque fichier, sans étape supplémentaire.",
          "Ni publicité ni pisteur.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous êtes sous Windows et pouvez installer PDF24 Creator : il fonctionne hors ligne et garde les pages d’origine.",
      "Le texte du PDF fusionné doit rester sélectionnable et permettre la recherche.",
      "Vous devez ajouter des documents Word ou reconnaître le texte d’un scan.",
      "Vous voulez régler vous-même la résolution et la qualité des images.",
    ],
    chooseCachety: [
      "Vous êtes sur un téléphone, un Mac ou un ordinateur où vous ne pouvez pas installer de logiciel, et vous préférez ne pas envoyer vos documents en ligne.",
      "Un formulaire demande un seul fichier, ou un fichier par type de document, sous une taille maximale donnée en mégaoctets.",
      "Vos photos viennent d’un iPhone.",
    ],
    faq: [
      FAQ_UPLOADED(
        "PDF24",
        "Avec les outils en ligne de PDF24, oui : les fichiers sont traités sur ses serveurs et supprimés au bout d’une heure. Avec PDF24 Creator sous Windows, non : les fichiers restent sur votre PC."
      ),
      {
        q: "PDF24 peut-il compresser un PDF à une taille donnée ?",
        a: "Pas directement. Vous réglez la résolution et la qualité des images, et le propre guide de PDF24 indique qu’il n’y a pas d’option « compresser à 5 Mo ». Avec Cachety, vous choisissez une taille maximale en mégaoctets, et le fichier est gardé dessous quand c’est possible en restant lisible.",
      },
      {
        q: "PDF24 fonctionne-t-il hors ligne sur Mac ou sur téléphone ?",
        a: "Non. PDF24 Creator n’existe que pour Windows. Sur un Mac ou un téléphone, PDF24 propose ses outils en ligne, qui traitent les fichiers sur ses serveurs. Cachety fonctionne dans le navigateur de n’importe quel appareil, sans envoi en ligne.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "PDF24 Tools : fusionner des PDF", url: "https://tools.pdf24.org/en/merge-pdf" },
      { label: "PDF24 Tools : compresser un PDF", url: "https://tools.pdf24.org/en/compress-pdf" },
      { label: "PDF24 Tools : images en PDF", url: "https://tools.pdf24.org/en/images-to-pdf" },
      { label: "PDF24 Tools : supprimer les métadonnées d’un PDF", url: "https://tools.pdf24.org/en/remove-pdf-metadata" },
      { label: "PDF24 Tools : tourner les pages d’un PDF", url: "https://tools.pdf24.org/en/rotate-pdf" },
      { label: "PDF24 Tools : questions et réponses", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 Creator", url: "https://tools.pdf24.org/en/creator" },
      { label: "Aide PDF24 : fusionner des fichiers PDF", url: "https://help.pdf24.org/en/how-to-merge-pdf-files-with-pdf24/" },
      { label: "Aide PDF24 : compresser un PDF", url: "https://help.pdf24.org/en/compress-pdf-guide/" },
      { label: "Aide PDF24 : Mac, Linux et téléphones", url: "https://help.pdf24.org/en/pdf24-for-mac-linux-portable/" },
      { label: "PDF24 : politique de confidentialité", url: "https://www.pdf24.org/en/privacy-policy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ────────────────────────────── Sejda ──────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-sejda-merge",
    competitor: "sejda-merge",
    competitorName: "Sejda",
    competitorUrl: "https://www.sejda.com/",
    title: "Cachety ou Sejda : fusionner et compresser des PDF sans les envoyer en ligne",
    metaTitle: "Alternative à Sejda : fusionner des PDF sans envoi",
    description:
      "Sejda fusionne et compresse en ligne, ou sur votre ordinateur avec son application, dans des limites gratuites. Cachety marche dans le navigateur, sans envoi.",
    intro:
      "Sejda est une boîte à outils PDF néerlandaise à deux visages : des outils en ligne qui traitent les fichiers sur ses serveurs, et Sejda Desktop, une application pour Mac, Windows et Linux qui les traite sur votre ordinateur. Les deux ont des limites gratuites. Cachety fonctionne dans le navigateur de n’importe quel appareil, n’envoie rien en ligne et n’a pas de limite par heure ni par jour, mais son travail est plus limité.",
    verdict:
      "La fusion de Sejda est plus riche : elle conserve les signets, construit une table des matières et peut imprimer le nom du fichier en bas des pages. Sejda Desktop garde les fichiers sur votre ordinateur. Choisissez-le quand vous avez besoin de ces options. Choisissez Cachety pour des documents personnels sur téléphone ou sans rien installer, pour des fichiers qui dépassent les limites gratuites de Sejda, et pour une taille maximale donnée en mégaoctets.",
    table: [
      {
        criterion: "Où les fichiers sont traités",
        cachety: CACHETY.where,
        other: "En ligne : envoyés et traités sur les serveurs de Sejda. Sejda Desktop : sur votre ordinateur, sans envoi.",
      },
      {
        criterion: "Durée de conservation des fichiers",
        cachety: CACHETY.kept,
        other: "En ligne : supprimés automatiquement au bout de 2 heures. La page de résultat comporte un bouton pour supprimer les fichiers (« Delete files »).",
        edge: "cachety",
      },
      {
        criterion: "Compte, usage gratuit et limites",
        cachety: CACHETY.free,
        other: "Aucune inscription. Fusion gratuite en ligne : jusqu’à 50 pages ou 50 Mo, 3 tâches par heure. Compression gratuite : jusqu’à 200 pages ou 100 Mo. Application de bureau gratuite : 3 tâches par jour, sur des documents de 50 Mo et 200 pages au plus. Une formule payante supprime les limites de pages et de tâches par heure ; les envois vont alors jusqu’à 500 Mo par fichier.",
        edge: "cachety",
      },
      {
        criterion: "Ranger les pages",
        cachety: CACHETY.pages,
        other: "Les fichiers se réordonnent par glisser-déposer. Une vue par pages permet de supprimer, réordonner et dupliquer des pages avant la fusion.",
      },
      {
        criterion: "Passer sous une taille maximale",
        cachety: CACHETY.size,
        other: "Réglages de qualité et de résolution des images, avec une option niveaux de gris. Pas de taille en mégaoctets à viser.",
        edge: "cachety",
      },
      {
        criterion: "Types de fichiers acceptés",
        cachety: CACHETY.inputs,
        other: "PDF et images, comme JPG et PNG, dans l’outil de fusion. Les images HEIC ne sont pas prises en charge.",
      },
      {
        criterion: "Options de fusion",
        cachety: MERGE_OPTIONS,
        other: "Signets conservés ou créés pour chaque fichier, table des matières, pages blanches pour l’impression recto verso, nom du fichier en pied de page.",
        edge: "other",
      },
      {
        criterion: "Données cachées",
        cachety: CACHETY.hidden,
        other: "Un outil séparé modifie les métadonnées d’un PDF ou les retire toutes.",
      },
      {
        criterion: "Applications et usage hors ligne",
        cachety: CACHETY.offline,
        other: "Sejda Desktop, pour Mac, Windows et Linux, fonctionne hors ligne, avec les mêmes fonctions que le service en ligne.",
      },
    ],
    body: [
      { type: "h2", text: "En ligne ou sur votre ordinateur : Sejda propose les deux" },
      {
        type: "p",
        text: "Sur le site de Sejda, vous envoyez vos documents et ils sont traités sur ses serveurs. Sejda indique que les fichiers sont chiffrés pendant le transfert et au repos, et supprimés automatiquement au bout de deux heures. Le service gratuit est limité en pages, en mégaoctets et en tâches par heure.",
      },
      {
        type: "p",
        text: "Sejda Desktop traite les fichiers sur votre ordinateur, sans envoi, sur Mac, Windows et Linux. Sa version gratuite permet trois tâches par jour, sur des documents de 50 Mo et 200 pages au plus, et des fusions de 30 fichiers et 50 pages au plus. Un détail compte pour les documents personnels : les conditions d’utilisation de Sejda indiquent que les utilisateurs ne doivent pas soumettre à son service en ligne d’informations personnelles sensibles, comme des numéros d’identification délivrés par un État.",
      },
      { type: "h2", text: "Là où Sejda fait mieux" },
      {
        type: "list",
        items: [
          "Des options de fusion que Cachety n’a pas : signets, table des matières, pages blanches pour l’impression recto verso.",
          "Une application de bureau pour Mac, Windows et Linux, qui garde les fichiers sur votre ordinateur.",
          "Beaucoup d’autres outils au même endroit : reconnaissance de texte (OCR), recadrage et redressement des pages d’un PDF, modification.",
          "Il peut prendre les fichiers directement dans Dropbox, Google Drive ou OneDrive.",
          "Un contrôle fin de la compression, avec des réglages de qualité et de résolution des images.",
        ],
      },
      { type: "h2", text: "Là où Cachety fait mieux" },
      {
        type: "list",
        items: [
          "Rien n’est envoyé en ligne et rien n’est installé, sur téléphone comme sur ordinateur.",
          "Pas de limite à 50 pages, et aucun plafond de tâches par heure ou par jour : un fichier de 60 pages ou un quatrième fichier dans l’heure ne posent pas de problème.",
          "Vous choisissez une taille en mégaoctets, et vous êtes prévenu avant le téléchargement si elle peut être atteinte ou non.",
          "Les photos HEIC d’iPhone sont acceptées telles quelles, et les données cachées sont retirées de chaque fichier.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Il vous faut des signets ou une table des matières dans le PDF fusionné.",
      "Vous pouvez installer Sejda Desktop et votre travail tient dans ses limites gratuites, ou vous avez une formule payante.",
      "Il vous faut la reconnaissance de texte, ou recadrer ou redresser les pages d’un PDF scanné : Cachety ne le fait que pour les photos.",
    ],
    chooseCachety: [
      "Ce sont des pièces d’identité, des fiches de paie ou des relevés de compte, et vous êtes sur téléphone ou ne pouvez pas installer de logiciel.",
      "Votre fichier dépasse 50 pages, ou vous avez plusieurs fichiers à préparer dans la même heure.",
      "Un formulaire demande un seul fichier, ou un fichier par type de document, sous une taille maximale donnée en mégaoctets.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Sejda",
        "Avec les outils en ligne de Sejda, oui : les fichiers sont envoyés sur ses serveurs et supprimés au bout de deux heures. Avec Sejda Desktop, non : les fichiers sont traités sur votre ordinateur."
      ),
      {
        q: "Quelles sont les limites gratuites de Sejda pour fusionner ?",
        a: "En ligne, des documents jusqu’à 50 pages ou 50 Mo et trois tâches par heure. La version gratuite de Sejda Desktop permet trois tâches par jour, sur des documents de 50 Mo et 200 pages au plus. Cachety n’a pas ces limites : jusqu’à 1 000 pages dans un fichier.",
      },
      {
        q: "Sejda peut-il compresser un PDF à une taille donnée ?",
        a: "Son outil de compression propose des réglages de qualité et de résolution des images, pas une taille à viser. Avec Cachety, vous choisissez une taille maximale en mégaoctets, et le fichier est gardé dessous quand c’est possible en restant lisible.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Sejda : fusionner des PDF", url: "https://www.sejda.com/merge-pdf" },
      { label: "Sejda : compresser un PDF", url: "https://www.sejda.com/compress-pdf" },
      { label: "Sejda : JPG en PDF", url: "https://www.sejda.com/jpg-to-pdf" },
      { label: "Sejda : organiser les pages d’un PDF", url: "https://www.sejda.com/organize-pdf" },
      { label: "Sejda : modifier les métadonnées d’un PDF", url: "https://www.sejda.com/edit-pdf-metadata" },
      { label: "Sejda : formules et questions", url: "https://www.sejda.com/upgrade" },
      { label: "Sejda : page de résultat", url: "https://www.sejda.com/result" },
      { label: "Sejda Desktop", url: "https://www.sejda.com/desktop" },
      { label: "Sejda : sécurité", url: "https://www.sejda.com/security" },
      { label: "Sejda : politique de confidentialité", url: "https://www.sejda.com/privacy" },
      { label: "Sejda : conditions d’utilisation", url: "https://www.sejda.com/terms" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
