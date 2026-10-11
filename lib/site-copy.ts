// Textes du site autour de l'outil : navigation, page d'accueil, page
// confidentialité, gabarit des guides, pied de page. Données pures (pas de
// "use client") : lisibles par les pages serveur comme par les composants.
// Public visé : des gens peu à l'aise avec l'informatique. Phrases courtes,
// aucun jargon, aucune promesse que le code ne tient pas (cf. docs/security.md).

import type { Lang } from "@/lib/site-meta";
import { SITE_AR } from "@/lib/locales/ar/site";
import { SITE_ES } from "@/lib/locales/es/site";
import { SITE_FA } from "@/lib/locales/fa/site";
import { SITE_DE } from "@/lib/locales/de/site";
import { SITE_PT } from "@/lib/locales/pt/site";
import { SITE_ID } from "@/lib/locales/id/site";
import { SITE_NL } from "@/lib/locales/nl/site";

type Item = { title: string; body: string };
type Section = { title: string; paras?: string[]; items?: string[] };

export type SiteCopy = {
  nav: {
    tool: string;
    about: string;
    guides: string;
    privacy: string;
    menu: string;
    close: string;
    donate: string;
    compare: string;
    /** Étymologie en quelques mots, sous le nom dans la barre de navigation. */
    nameShort: string;
  };
  hero: { title: string; lead: string; pills: string[] };
  landing: {
    howTitle: string;
    how: Item[];
    trustTitle: string;
    trustLead: string;
    trust: Item[];
    airplaneTitle: string;
    airplaneBody: string;
    featuresTitle: string;
    features: Item[];
    originTitle: string;
    originBody: string;
    originBy: string;
    supportTitle: string;
    supportBody: string;
    supportCta: string;
    supportNote: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
    guidesTitle: string;
    guidesLead: string;
    guidesAll: string;
    backToTop: string;
  };
  privacy: { title: string; lead: string; sections: Section[]; updated: string };
  guidesUi: {
    title: string;
    lead: string;
    read: string;
    example: string;
    faqTitle: string;
    related: string;
    cta: string;
    ctaNote: string;
    updated: (date: string) => string;
    allGuides: string;
  };
  compareUi: {
    title: string;
    lead: string;
    read: string;
    verdictTitle: string;
    tableTitle: string;
    criterion: string;
    edgeCachety: string;
    edgeOther: (name: string) => string;
    chooseOther: (name: string) => string;
    chooseCachety: string;
    sourcesTitle: string;
    checked: (date: string) => string;
    /** Qui écrit, et l'engagement d'exactitude. */
    disclosure: string;
    allComparisons: string;
    related: string;
  };
  footer: {
    tagline: string;
    /** Définition façon dictionnaire du nom « Cachety ». */
    name: { pron: string; pos: string; def: string };
    support: string;
    madeIn: string;
    by: string;
    basedOn: string;
    inspiredBy: string;
    license: string;
    source: string;
    free: string;
  };
};

// Langues d'origine ici ; les suivantes dans lib/locales/<lang>/site.ts.
const BASE_COPY: Record<"fr" | "en" | "ja" | "zh", SiteCopy> = {
  fr: {
    nav: {
      tool: "L'outil",
      about: "Pourquoi filigraner ?",
      guides: "Guides",
      privacy: "Confidentialité",
      menu: "Menu",
      close: "Fermer le menu",
      donate: "Faire un don",
      compare: "Comparatifs",
      nameShort: "cachet + cacher : sceller, masquer",
    },
    hero: {
      title: "Filigranez vos papiers, sans les envoyer nulle part",
      lead: "Pièce d'identité, avis d'imposition, fiche de paie : ajoutez un filigrane en quelques secondes. Vos fichiers restent sur votre appareil, du début à la fin.",
      pills: ["Gratuit", "Sans compte", "Aucun envoi", "Conçu en France"],
    },
    landing: {
      howTitle: "Comment ça marche",
      how: [
        { title: "Déposez votre document", body: "Un PDF ou une photo, même prise avec un iPhone. Plusieurs à la fois si besoin." },
        { title: "Écrivez à quoi il sert", body: "Par exemple « Dossier de location, agence Martin, 12/10/2026 ». Des modèles sont prêts à l'emploi." },
        { title: "Vérifiez, puis téléchargez", body: "L'aperçu montre exactement le résultat. Le fichier filigrané est enregistré sur votre appareil." },
      ],
      trustTitle: "Vos documents ne quittent jamais votre appareil",
      trustLead: "La plupart des sites de filigrane envoient votre carte d'identité sur leurs serveurs. Cachety, non : tout le travail est fait par votre navigateur, sur votre téléphone ou votre ordinateur.",
      trust: [
        { title: "Traité chez vous", body: "Vos fichiers restent dans la mémoire de votre appareil. Fermez l'onglet, et tout est effacé." },
        { title: "Verrouillé dès la conception", body: "La page interdit à votre navigateur d'envoyer des données vers un autre site. Même en cas de bug, vos fichiers ne peuvent pas partir." },
        { title: "Aucun compte, aucun pistage", body: "Pas d'inscription, pas de cookie de suivi, pas de statistiques de visite, pas de régie publicitaire." },
        { title: "Open source et vérifiable", body: "Le code est public. N'importe qui peut le relire, le vérifier, ou héberger sa propre copie du site." },
      ],
      airplaneTitle: "Vérifiez-le vous-même : le test du mode avion",
      airplaneBody: "Ouvrez cette page, puis coupez Internet (mode avion). Déposez un document : Cachety fonctionne toujours. La preuve que rien ne passe par Internet.",
      featuresTitle: "Tout ce qu'il faut pour protéger une copie",
      features: [
        { title: "Filigrane sur toute la page", body: "Répété en diagonale et fondu dans l'image : impossible à effacer en modifiant simplement le PDF." },
        { title: "Masquer une information", body: "Noircissez un IBAN, un numéro fiscal ou une photo. Le contenu est réellement supprimé, pas seulement recouvert." },
        { title: "Copies traçables", body: "Une date et une référence unique sur chaque copie : si elle circule, vous saurez d'où elle vient." },
        { title: "Une version par destinataire", body: "Une version personnalisée pour chaque agence ou banque, en un seul téléchargement." },
        { title: "Mot de passe", body: "Protégez le PDF avec un chiffrement fort (AES-256), celui qu'utilisent les banques." },
        { title: "Données cachées retirées", body: "Texte sélectionnable, métadonnées et position GPS des photos disparaissent du fichier final." },
        { title: "Taille maximale", body: "1, 2, 5 ou 10 Mo par fichier, pour les sites qui limitent la taille des envois." },
        { title: "Sur téléphone aussi", body: "iPhone et Android, photos HEIC comprises. Ajoutez Cachety à votre écran d'accueil comme une appli." },
      ],
      originTitle: "Gratuit, libre, conçu en France",
      originBody: "Cachety est un logiciel libre (licence AGPL) et gratuit. Son code est ouvert à tous et le restera. Il prolonge le travail de Filigrane Local et de Filigraneur, deux projets français libres.",
      originBy: "Conçu et maintenu par",
      supportTitle: "Soutenir Cachety",
      supportBody: "Cachety est gratuit et le restera. Mais il demande du temps, et le nom de domaine comme les outils de développement ont un coût. Si Cachety vous a rendu service, un petit don aide à le faire vivre.",
      supportCta: "Faire un don",
      supportNote: "Facultatif. Le paiement se fait sur GitHub Sponsors, en dehors de ce site.",
      faqTitle: "Questions fréquentes",
      faq: [
        {
          q: "Mes fichiers sont-ils envoyés sur un serveur ?",
          a: "Non, jamais. Le site n'a d'ailleurs aucun serveur capable de recevoir un fichier. Votre navigateur fait tout le travail, et la page lui interdit techniquement de contacter un autre site. Le test du mode avion vous le prouve en dix secondes.",
        },
        {
          q: "C'est vraiment gratuit ? Où est le piège ?",
          a: "Il n'y en a pas : pas de compte, pas de version payante, aucune donnée collectée. Comme rien n'est traité sur un serveur, héberger le site ne coûte presque rien, et le code libre garantit qu'il restera gratuit. Pour financer son développement, Cachety compte sur vos dons, facultatifs, et pourra un jour afficher quelques liens sponsorisés choisis à la main (outils de chiffrement, logiciels libres…). Jamais de publicité qui vous piste, jamais rien qui dépende de vos documents.",
        },
        {
          q: "Quels fichiers puis-je filigraner ?",
          a: "Les PDF et les images : JPG, PNG, photos d'iPhone (HEIC), WebP, GIF, BMP et AVIF. Jusqu'à 200 Mo par fichier et 500 pages par PDF, plusieurs fichiers à la fois.",
        },
        {
          q: "Peut-on retirer le filigrane ?",
          a: "Pas en modifiant le PDF : le filigrane fait partie de l'image de chaque page. Soyons honnêtes : rien n'empêche quelqu'un de photographier ou de retoucher un document. Le filigrane décourage la réutilisation et permet de retrouver l'origine d'une fuite.",
        },
        {
          q: "Que dois-je écrire dans le filigrane ?",
          a: "Trois choses : à quoi sert la copie, à qui vous l'envoyez, et la date. Par exemple « Dossier de location, agence Martin, 12/10/2026 ». C'est la formule recommandée par Cybermalveillance.gouv.fr.",
        },
        {
          q: "Est-ce que ça marche sur mon téléphone ?",
          a: "Oui, sur iPhone comme sur Android. Ouvrez cachety.com dans votre navigateur, touchez la zone de dépôt et choisissez une photo ou un PDF. Vous pouvez aussi ajouter Cachety à votre écran d'accueil.",
        },
      ],
      guidesTitle: "Guides pratiques",
      guidesLead: "Des explications pas à pas pour les situations de tous les jours.",
      guidesAll: "Tous les guides",
      backToTop: "Filigraner un document",
    },
    privacy: {
      title: "Confidentialité et sécurité",
      lead: "Vos documents sont personnels. Voici, simplement, ce que Cachety fait et ne fait pas, et comment le vérifier vous-même.",
      updated: "Mis à jour le 11 octobre 2026",
      sections: [
        {
          title: "En bref",
          items: [
            "Vos fichiers ne sont jamais envoyés : ils sont traités par votre navigateur, sur votre appareil.",
            "Aucun compte, aucun cookie de suivi, aucune statistique de visite, aucune régie publicitaire.",
            "Rien n'est conservé : fermez l'onglet, et vos documents disparaissent de la mémoire.",
            "Le code est public et vérifiable par tous.",
          ],
        },
        {
          title: "Ce qui se passe quand vous déposez un fichier",
          paras: [
            "Le fichier est lu par votre navigateur, dans la mémoire de votre appareil. Chaque page est transformée en image, le filigrane y est dessiné, puis un nouveau fichier est créé. Quand vous cliquez sur « Télécharger », il est enregistré directement sur votre appareil.",
            "À aucun moment le fichier, le texte du filigrane, les noms des destinataires ou le mot de passe ne passent par Internet.",
          ],
        },
        {
          title: "Ce que nous ne collectons pas",
          items: [
            "Vos documents et leurs aperçus.",
            "Le texte de vos filigranes et les noms de vos destinataires.",
            "Vos mots de passe.",
            "Votre identité : il n'y a ni compte ni formulaire.",
            "Vos habitudes : pas de Google Analytics, pas de pixel publicitaire, pas de cookie de suivi.",
          ],
        },
        {
          title: "Ce qui est gardé sur votre appareil",
          paras: [
            "Seulement vos réglages : la langue, l'apparence du filigrane, l'aperçu automatique et la taille maximale choisie. Ils restent dans votre navigateur pour vous éviter de les refaire. Aucun fichier, aucun texte ni aucun mot de passe n'y est enregistré. Vous pouvez les effacer à tout moment en vidant les données du site dans votre navigateur.",
            "Pour fonctionner hors connexion, le navigateur garde aussi une copie des pages du site (pas de vos documents).",
          ],
        },
        {
          title: "Hébergement et financement",
          paras: [
            "Les pages du site sont distribuées par Cloudflare. Comme tout hébergeur, il voit techniquement l'adresse IP des visiteurs et les pages demandées, pour pouvoir les afficher. Il ne voit jamais vos documents, puisqu'ils ne sont jamais envoyés.",
            "Les dons passent par GitHub Sponsors, sur le site de GitHub et selon ses propres règles de confidentialité. Cachety ne voit jamais vos informations de paiement, et ses pages ne contiennent aucun formulaire ni script de paiement.",
            "Il n'y a aucune publicité sur Cachety aujourd'hui. Pour faire vivre le projet, quelques liens sponsorisés pourront apparaître un jour, choisis à la main et fidèles à son esprit : outils de chiffrement, logiciels libres, partage sécurisé de documents. Ils seront signalés comme tels, servis par Cachety lui-même, sans régie publicitaire ni script tiers, et ne dépendront jamais de vos documents. La politique de sécurité de la page continuera d'interdire toute connexion vers un autre site.",
          ],
        },
        {
          title: "Comment le vérifier vous-même",
          items: [
            "Le test du mode avion : ouvrez le site, coupez Internet, puis filigranez un document. Tout fonctionne.",
            "Le code source est public : chacun peut le lire, et des tests automatiques vérifient à chaque modification qu'aucune donnée ne peut sortir.",
            "Pour les curieux : la politique de sécurité de la page (CSP) interdit au navigateur toute connexion vers un autre site.",
            "Vous préférez ne faire confiance à personne ? Le site peut être installé sur votre propre ordinateur ou serveur.",
          ],
        },
        {
          title: "Des copies protégées avec soin",
          items: [
            "Les zones masquées sont réellement supprimées du fichier, pas recouvertes d'un rectangle.",
            "Le texte caché, les métadonnées et la position GPS des photos sont retirés.",
            "Le mot de passe utilise le chiffrement AES-256 ; copié, il est effacé du presse-papiers après une minute.",
            "Une faille de sécurité ? Signalez-la de façon confidentielle via la page sécurité du dépôt GitHub.",
          ],
        },
        {
          title: "Ce qu'un filigrane ne peut pas faire",
          paras: [
            "Un filigrane décourage la réutilisation d'une copie et permet de retrouver l'origine d'une fuite. Il ne rend pas la copie impossible à photographier ou à retoucher. N'envoyez que les documents réellement demandés, et masquez ce qui n'est pas nécessaire.",
          ],
        },
      ],
    },
    guidesUi: {
      title: "Guides pratiques",
      lead: "Location, banque, impôts, téléphone : comment protéger vos papiers, étape par étape, sans être un expert.",
      read: "Lire le guide",
      example: "Exemple de filigrane",
      faqTitle: "Questions fréquentes",
      related: "À lire aussi",
      cta: "Filigraner mon document",
      ctaNote: "Gratuit, sans compte. Le document ne quitte pas votre appareil.",
      updated: (d) => `Mis à jour le ${d}`,
      allGuides: "Tous les guides",
    },
    compareUi: {
      title: "Cachety face aux autres outils de filigrane",
      lead: "Des comparatifs clairs et vérifiés avec les outils les plus utilisés : où vont vos fichiers, ce que ça coûte, et quand un autre outil est le meilleur choix.",
      read: "Lire le comparatif",
      verdictTitle: "En bref",
      tableTitle: "Côte à côte",
      criterion: "Critère",
      edgeCachety: "Avantage Cachety",
      edgeOther: (n: string) => `Avantage ${n}`,
      chooseOther: (n: string) => `Quand ${n} est le meilleur choix`,
      chooseCachety: "Quand Cachety est le meilleur choix",
      sourcesTitle: "Sources",
      checked: (d: string) =>
        `Faits vérifiés le ${d} sur les pages publiques de chaque éditeur. Les services évoluent : si une information n'est plus à jour, signalez-le sur GitHub et nous la corrigerons.`,
      disclosure: "Rédigé par l'auteur de Cachety. Nous visons des faits vérifiables et une comparaison honnête : chaque affirmation sur un autre outil renvoie à sa source.",
      allComparisons: "Tous les comparatifs",
      related: "Autres comparatifs",
    },
    footer: {
      tagline: "Filigranez vos papiers sans qu'ils quittent votre appareil.",
      name: {
        pron: "/ka.ʃə.ti/",
        pos: "n.",
        def: "De cachet, le sceau qui authentifie un document, et de cacher. Un sceau sur ce que vous partagez, un cache sur le reste.",
      },
      support: "Soutenir le projet",
      madeIn: "Conçu en France",
      by: "par",
      basedOn: "D'après",
      inspiredBy: "lui-même inspiré de",
      license: "Licence AGPL-3.0",
      source: "Code source",
      free: "Service gratuit, sans pistage",
    },
  },

  en: {
    nav: {
      tool: "The tool",
      about: "Why watermark?",
      guides: "Guides",
      privacy: "Privacy",
      menu: "Menu",
      close: "Close menu",
      donate: "Donate",
      compare: "Comparisons",
      nameShort: "cachet (seal) + cacher (to hide)",
    },
    hero: {
      title: "Watermark your documents without sending them anywhere",
      lead: "ID card, passport, payslip, bank statement: add a watermark in seconds. Your files stay on your device from start to finish.",
      pills: ["Free", "No account", "Nothing uploaded", "Made in France"],
    },
    landing: {
      howTitle: "How it works",
      how: [
        { title: "Drop your document", body: "A PDF or a photo, even one taken on an iPhone. Several at once if you need to." },
        { title: "Say what it's for", body: "For example “Rental application, Martin Lettings, 11/10/2026”. Ready-made templates are included." },
        { title: "Check, then download", body: "The preview shows exactly what you'll get. The watermarked file is saved to your device." },
      ],
      trustTitle: "Your documents never leave your device",
      trustLead: "Most watermark websites upload your ID to their servers. Cachety doesn't: all the work is done by your browser, on your own phone or computer.",
      trust: [
        { title: "Processed on your device", body: "Your files stay in your device's memory. Close the tab and everything is gone." },
        { title: "Blocked by design", body: "The page forbids your browser from sending data to any other website. Even if something went wrong, your files couldn't leave." },
        { title: "No account, no tracking", body: "No sign-up, no tracking cookies, no visitor analytics, no ad networks." },
        { title: "Open source and verifiable", body: "The code is public. Anyone can read it, check it, or host their own copy of the site." },
      ],
      airplaneTitle: "Check it yourself: the aeroplane mode test",
      airplaneBody: "Open this page, then switch off the internet (aeroplane mode). Drop in a document: Cachety still works. Proof that nothing goes over the internet.",
      featuresTitle: "Everything you need to protect a copy",
      features: [
        { title: "Watermark across the page", body: "Repeated diagonally and blended into the image: it can't be deleted by simply editing the PDF." },
        { title: "Black out information", body: "Hide an account number, a tax reference or a photo. The content is really removed, not just covered." },
        { title: "Traceable copies", body: "A date and a unique reference on every copy: if one turns up somewhere, you'll know where it came from." },
        { title: "One version per recipient", body: "A personalised version for each agent or bank, in a single download." },
        { title: "Password", body: "Lock the PDF with strong AES-256 encryption, the standard banks use." },
        { title: "Hidden data removed", body: "Selectable text, metadata and the GPS location of photos are stripped from the final file." },
        { title: "Maximum file size", body: "1, 2, 5 or 10 MB per file, for websites that limit upload sizes." },
        { title: "Works on your phone", body: "iPhone and Android, HEIC photos included. Add Cachety to your home screen like an app." },
      ],
      originTitle: "Free, open source, made in France",
      originBody: "Cachety is free, open-source software (AGPL licence). Its code is open to everyone and will stay that way. It builds on Filigrane Local and Filigraneur, two open-source French projects.",
      originBy: "Designed and maintained by",
      supportTitle: "Support Cachety",
      supportBody: "Cachety is free and will stay free. But it takes time, and the domain name and development tools cost money. If Cachety helped you, a small donation keeps it going.",
      supportCta: "Make a donation",
      supportNote: "Optional. Payment happens on GitHub Sponsors, outside this site.",
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Are my files uploaded to a server?",
          a: "No, never. The site doesn't even have a server that could receive a file. Your browser does all the work, and the page technically forbids it from contacting any other website. The aeroplane mode test proves it in ten seconds.",
        },
        {
          q: "Is it really free? What's the catch?",
          a: "There isn't one: no account, no paid version, no data collected. Because nothing is processed on a server, hosting the site costs almost nothing, and the open-source code guarantees it stays free. To fund its development, Cachety relies on optional donations, and may one day show a few hand-picked sponsored links (encryption tools, open-source software…). Never ads that track you, and never anything based on your documents.",
        },
        {
          q: "Which files can I watermark?",
          a: "PDFs and images: JPG, PNG, iPhone photos (HEIC), WebP, GIF, BMP and AVIF. Up to 200 MB per file and 500 pages per PDF, several files at once.",
        },
        {
          q: "Can the watermark be removed?",
          a: "Not by editing the PDF: the watermark is part of the image of each page. To be honest, nothing stops someone photographing or retouching a document. A watermark discourages reuse and lets you trace where a leak came from.",
        },
        {
          q: "What should I write in the watermark?",
          a: "Three things: what the copy is for, who you're sending it to, and the date. For example “Rental application, Martin Lettings, 11/10/2026”.",
        },
        {
          q: "Does it work on my phone?",
          a: "Yes, on iPhone and Android. Open cachety.com in your browser, tap the drop area and pick a photo or a PDF. You can also add Cachety to your home screen.",
        },
      ],
      guidesTitle: "Practical guides",
      guidesLead: "Step-by-step help for everyday situations.",
      guidesAll: "All guides",
      backToTop: "Watermark a document",
    },
    privacy: {
      title: "Privacy and security",
      lead: "Your documents are personal. Here is, in plain words, what Cachety does and doesn't do, and how to check it yourself.",
      updated: "Updated 11 October 2026",
      sections: [
        {
          title: "In short",
          items: [
            "Your files are never uploaded: they are processed by your browser, on your device.",
            "No account, no tracking cookies, no visitor analytics, no ad networks.",
            "Nothing is kept: close the tab and your documents are gone from memory.",
            "The code is public and anyone can check it.",
          ],
        },
        {
          title: "What happens when you drop a file",
          paras: [
            "Your browser reads the file in your device's memory. Each page is turned into an image, the watermark is drawn on it, and a brand-new file is created. When you click Download, it is saved straight to your device.",
            "At no point do the file, the watermark text, the recipients' names or the password travel over the internet.",
          ],
        },
        {
          title: "What we don't collect",
          items: [
            "Your documents and their previews.",
            "Your watermark text and the names of your recipients.",
            "Your passwords.",
            "Your identity: there is no account and no form.",
            "Your habits: no Google Analytics, no advertising pixel, no tracking cookie.",
          ],
        },
        {
          title: "What is kept on your device",
          paras: [
            "Only your settings: language, watermark appearance, auto preview and the maximum file size you chose. They stay in your browser so you don't have to set them again. No file, text or password is ever stored there. You can erase them at any time by clearing this site's data in your browser.",
            "To work offline, your browser also keeps a copy of the site's pages (not of your documents).",
          ],
        },
        {
          title: "Hosting and funding",
          paras: [
            "The site's pages are delivered by Cloudflare. Like any web host, it technically sees visitors' IP addresses and the pages they request, in order to serve them. It never sees your documents, because they are never sent.",
            "Donations go through GitHub Sponsors, on GitHub's own website and under its own privacy policy. Cachety never sees your payment details, and its pages contain no payment form or payment script.",
            "There are no ads on Cachety today. To keep the project going, a few sponsored links may appear in the future, chosen by hand and true to its spirit: encryption tools, open-source software, secure document sharing. They will be clearly marked, served by Cachety itself with no ad network or third-party script, and will never depend on your documents. The page's security policy will still forbid any connection to another website.",
          ],
        },
        {
          title: "How to check it yourself",
          items: [
            "The aeroplane mode test: open the site, switch off the internet, then watermark a document. Everything works.",
            "The source code is public: anyone can read it, and automated tests check on every change that no data can leave.",
            "For the curious: the page's security policy (CSP) forbids the browser from connecting to any other website.",
            "Prefer to trust no one? You can run the site on your own computer or server.",
          ],
        },
        {
          title: "Extra protection for your copies",
          items: [
            "Masked areas are really removed from the file, not just covered by a rectangle.",
            "Hidden text, metadata and the GPS location of photos are removed.",
            "Passwords use AES-256 encryption; once copied, a password is wiped from the clipboard after one minute.",
            "Found a security issue? Report it privately through the security page of the GitHub repository.",
          ],
        },
        {
          title: "What a watermark can't do",
          paras: [
            "A watermark discourages reuse of a copy and helps you trace where a leak came from. It doesn't make a copy impossible to photograph or retouch. Only send the documents you are actually asked for, and hide anything that isn't needed.",
          ],
        },
      ],
    },
    guidesUi: {
      title: "Practical guides",
      lead: "Renting, banking, passports, phones: how to protect your documents step by step, no expertise needed.",
      read: "Read the guide",
      example: "Example watermark",
      faqTitle: "Frequently asked questions",
      related: "Read next",
      cta: "Watermark my document",
      ctaNote: "Free, no account. The document never leaves your device.",
      updated: (d) => `Updated ${d}`,
      allGuides: "All guides",
    },
    compareUi: {
      title: "Cachety compared with other watermark tools",
      lead: "Plain-language, fact-checked comparisons with the tools people use most: where your files go, what it costs, and when another tool is the better choice.",
      read: "Read the comparison",
      verdictTitle: "In short",
      tableTitle: "Side by side",
      criterion: "Criterion",
      edgeCachety: "Advantage Cachety",
      edgeOther: (n: string) => `Advantage ${n}`,
      chooseOther: (n: string) => `When ${n} is the better choice`,
      chooseCachety: "When Cachety is the better choice",
      sourcesTitle: "Sources",
      checked: (d: string) =>
        `Facts checked on ${d} on each publisher's public pages. Services change: if something here is out of date, tell us on GitHub and we will fix it.`,
      disclosure: "Written by the author of Cachety. We aim to be factual and fair: every claim about another tool links to its source.",
      allComparisons: "All comparisons",
      related: "Other comparisons",
    },
    footer: {
      tagline: "Watermark your documents without them ever leaving your device.",
      name: {
        pron: "/ka.ʃə.ti/",
        pos: "noun",
        def: "From the French cachet, the seal that vouches for a document, and cacher, to hide. A seal on what you share, a cover over the rest.",
      },
      support: "Support the project",
      madeIn: "Made in France",
      by: "by",
      basedOn: "Based on",
      inspiredBy: "itself inspired by",
      license: "AGPL-3.0 licence",
      source: "Source code",
      free: "Free service, no tracking",
    },
  },

  ja: {
    nav: {
      tool: "ツール",
      about: "なぜ透かしを？",
      guides: "ガイド",
      privacy: "プライバシー",
      menu: "メニュー",
      close: "メニューを閉じる",
      donate: "寄付する",
      compare: "比較",
      nameShort: "cachet（印）+ cacher（隠す）",
    },
    hero: {
      title: "書類をどこにも送らずに、透かしを入れる",
      lead: "運転免許証、マイナンバーカード、給与明細。数秒で透かしを入れられます。ファイルは最初から最後まで、あなたの端末の中だけにあります。",
      pills: ["無料", "登録不要", "アップロードなし", "フランス製"],
    },
    landing: {
      howTitle: "使い方",
      how: [
        { title: "書類をドロップ", body: "PDF でも写真でも。iPhone で撮った写真もそのまま使えます。複数まとめても大丈夫です。" },
        { title: "用途を書く", body: "たとえば「賃貸申込専用 ○○不動産 2026/10/11」。よく使う文面はテンプレートから選べます。" },
        { title: "確認してダウンロード", body: "プレビューがそのまま仕上がりです。透かし入りのファイルは端末に保存されます。" },
      ],
      trustTitle: "書類は端末の外に出ません",
      trustLead: "多くの透かしサイトは、身分証の画像をサーバーにアップロードします。Cachety は違います。すべての処理は、あなたのスマホやパソコンのブラウザの中で行われます。",
      trust: [
        { title: "端末の中で処理", body: "ファイルは端末のメモリの中にだけあります。タブを閉じれば、すべて消えます。" },
        { title: "外部への送信をブロック", body: "このページの設定で、ブラウザから他のサイトへのデータ送信を禁止しています。万一不具合があっても、ファイルが外に出ることはありません。" },
        { title: "登録なし・追跡なし", body: "会員登録も、追跡クッキーも、アクセス解析も、広告配信ネットワークもありません。" },
        { title: "オープンソースで検証可能", body: "コードは公開されています。誰でも読んで確かめられ、自分でサイトを運用することもできます。" },
      ],
      airplaneTitle: "自分で確かめる：機内モードテスト",
      airplaneBody: "このページを開いてから、インターネットを切ってください（機内モード）。書類をドロップしても、Cachety はそのまま動きます。何もネットに送られていない証拠です。",
      featuresTitle: "コピーを守るための機能がそろっています",
      features: [
        { title: "ページ全体に透かし", body: "斜めに繰り返し、画像そのものに焼き込みます。PDF を編集しただけでは消せません。" },
        { title: "情報を隠す（黒塗り）", body: "口座番号やマイナンバー、顔写真を黒塗りできます。上から覆うのではなく、中身ごと消去します。" },
        { title: "追跡できるコピー", body: "コピーごとに日付と固有の番号が入ります。どこかで見つかっても、出どころが分かります。" },
        { title: "宛先ごとに別の版", body: "不動産会社ごと、銀行ごとに別々の透かしを、一度にまとめて作れます。" },
        { title: "パスワード", body: "銀行でも使われる強力な暗号化（AES-256）で PDF を保護できます。" },
        { title: "隠れたデータを削除", body: "選択できる文字、メタデータ、写真の位置情報（GPS）は、仕上がりのファイルから取り除かれます。" },
        { title: "最大ファイルサイズ", body: "アップロード容量に制限があるサイト向けに、1・2・5・10 MB 以内に収められます。" },
        { title: "スマホでも使える", body: "iPhone と Android に対応し、HEIC 写真も読み込めます。アプリのようにホーム画面に追加できます。" },
      ],
      originTitle: "無料・オープンソース・フランス製",
      originBody: "Cachety は無料のオープンソースソフトウェア（AGPL ライセンス）です。コードは誰にでも公開されており、これからも変わりません。フランスのオープンソースプロジェクト Filigrane Local と Filigraneur を受け継いでいます。",
      originBy: "開発・運営",
      supportTitle: "Cachety を応援する",
      supportBody: "Cachety は無料で、これからも無料です。ただ、開発には時間がかかり、ドメイン名や開発ツールにも費用がかかります。お役に立てたなら、少額の寄付が継続の支えになります。",
      supportCta: "寄付する",
      supportNote: "任意です。お支払いはこのサイトの外、GitHub Sponsors で行われます。",
      faqTitle: "よくある質問",
      faq: [
        {
          q: "ファイルはサーバーに送られますか？",
          a: "いいえ、一切送られません。そもそもこのサイトには、ファイルを受け取るサーバーがありません。処理はすべてブラウザの中で行われ、このページの設定で他のサイトとの通信も禁止しています。機内モードテストなら 10 秒で確かめられます。",
        },
        {
          q: "本当に無料ですか？",
          a: "はい。登録も有料版もなく、データも集めません。サーバーで処理をしないので運営費はほとんどかからず、オープンソースなのでこれからも無料です。開発は任意の寄付で支えられており、将来、厳選したスポンサーリンク（暗号化ツールやオープンソースソフトなど）を表示することがあります。あなたを追跡する広告や、書類の内容に基づく表示は決してありません。",
        },
        {
          q: "どんなファイルに使えますか？",
          a: "PDF と画像（JPG、PNG、iPhone の HEIC、WebP、GIF、BMP、AVIF）です。1 ファイル 200 MB、PDF は 500 ページまで、複数まとめて処理できます。",
        },
        {
          q: "透かしは消されてしまいませんか？",
          a: "PDF を編集しても消せません。透かしは各ページの画像の一部になっているからです。ただし正直に言えば、書類を撮影したり加工したりすることまでは防げません。透かしは使い回しを思いとどまらせ、漏れたときに出どころをたどれるようにするものです。",
        },
        {
          q: "透かしには何を書けばいいですか？",
          a: "「何のためのコピーか」「誰に渡すか」「日付」の三つです。たとえば「賃貸申込専用 ○○不動産 2026/10/11」のように書きます。",
        },
        {
          q: "スマホでも使えますか？",
          a: "はい、iPhone でも Android でも使えます。ブラウザで cachety.com を開き、枠をタップして写真か PDF を選ぶだけです。ホーム画面に追加することもできます。",
        },
      ],
      guidesTitle: "ガイド",
      guidesLead: "身近な場面ごとに、手順をやさしく説明します。",
      guidesAll: "ガイド一覧",
      backToTop: "書類に透かしを入れる",
    },
    privacy: {
      title: "プライバシーと安全性",
      lead: "書類は大切な個人情報です。Cachety が何をして、何をしないのか、そして自分で確かめる方法を、わかりやすく説明します。",
      updated: "2026年10月11日更新",
      sections: [
        {
          title: "要点",
          items: [
            "ファイルは一切アップロードされません。端末のブラウザの中で処理されます。",
            "登録なし、追跡クッキーなし、アクセス解析なし、広告配信ネットワークなし。",
            "何も保存されません。タブを閉じれば、書類はメモリから消えます。",
            "コードは公開されており、誰でも確認できます。",
          ],
        },
        {
          title: "ファイルをドロップすると何が起きるか",
          paras: [
            "ファイルは端末のメモリ上でブラウザが読み込みます。各ページを画像にして透かしを描き、まったく新しいファイルを作ります。「ダウンロード」を押すと、そのまま端末に保存されます。",
            "ファイル、透かしの文字、宛先の名前、パスワードが、インターネットを通ることは一度もありません。",
          ],
        },
        {
          title: "収集しないもの",
          items: [
            "書類とそのプレビュー。",
            "透かしの文字と宛先の名前。",
            "パスワード。",
            "あなたの身元（アカウントも入力フォームもありません）。",
            "利用状況（Google アナリティクスも広告タグも追跡クッキーもありません）。",
          ],
        },
        {
          title: "端末に保存されるもの",
          paras: [
            "保存されるのは設定だけです（言語、透かしの見た目、自動プレビュー、最大ファイルサイズ）。次回また設定し直さなくて済むよう、ブラウザの中に残ります。ファイル、文字、パスワードは保存されません。ブラウザでこのサイトのデータを消去すれば、いつでも削除できます。",
            "オフラインでも使えるように、ブラウザはサイトのページのコピーも保存します（書類ではありません）。",
          ],
        },
        {
          title: "ホスティングと運営資金",
          paras: [
            "サイトのページは Cloudflare から配信されています。一般的なホスティングと同じく、ページを届けるために訪問者の IP アドレスと閲覧ページを技術的に扱います。書類は送信されないため、Cloudflare が目にすることはありません。",
            "寄付は GitHub のサイト上の GitHub Sponsors を通じて、GitHub のプライバシーポリシーのもとで行われます。Cachety がお支払い情報を見ることはなく、ページに決済フォームや決済スクリプトは一切ありません。",
            "現在、Cachety に広告はありません。プロジェクトを続けるため、将来、趣旨に合ったスポンサーリンク（暗号化ツール、オープンソースソフト、安全な書類共有サービスなど）を手作業で選んで掲載することがあります。その場合はスポンサーであることを明示し、広告配信ネットワークや外部スクリプトを使わず Cachety 自身から配信し、書類の内容に左右されることはありません。ページのセキュリティポリシーは引き続き、他のサイトへの接続をすべて禁止します。",
          ],
        },
        {
          title: "自分で確かめる方法",
          items: [
            "機内モードテスト：サイトを開いてからインターネットを切り、書類に透かしを入れてみてください。そのまま動きます。",
            "ソースコードは公開されています。変更のたびに、データが外に出られないことを自動テストで確認しています。",
            "詳しい方へ：このページのセキュリティポリシー（CSP）は、他のサイトへの接続をブラウザに禁じています。",
            "誰も信用したくない場合は、自分のパソコンやサーバーでこのサイトを動かすこともできます。",
          ],
        },
        {
          title: "コピーを守るための配慮",
          items: [
            "黒塗りした部分は、四角で覆うのではなく、ファイルから実際に消去されます。",
            "隠れた文字、メタデータ、写真の位置情報（GPS）は取り除かれます。",
            "パスワードには AES-256 暗号化を使い、コピーしたパスワードは 1 分後にクリップボードから消去されます。",
            "セキュリティ上の問題を見つけたら、GitHub リポジトリのセキュリティページから非公開で報告してください。",
          ],
        },
        {
          title: "透かしにできないこと",
          paras: [
            "透かしはコピーの使い回しを思いとどまらせ、漏れたときに出どころをたどる助けになります。ただし、撮影や加工を不可能にするものではありません。求められた書類だけを送り、必要のない情報は隠しましょう。",
          ],
        },
      ],
    },
    guidesUi: {
      title: "ガイド",
      lead: "賃貸、本人確認、マイナンバー、スマホ。専門知識がなくても、書類を守る手順を一つずつ説明します。",
      read: "ガイドを読む",
      example: "透かしの例",
      faqTitle: "よくある質問",
      related: "あわせて読みたい",
      cta: "書類に透かしを入れる",
      ctaNote: "無料・登録不要。書類が端末の外に出ることはありません。",
      updated: (d) => `${d} 更新`,
      allGuides: "ガイド一覧",
    },
    compareUi: {
      title: "Cachety と他の透かしツールの比較",
      lead: "よく使われるツールとの比較を、事実に基づいてわかりやすくまとめました。ファイルの行き先、費用、そして他のツールの方が向いている場面まで。",
      read: "比較を読む",
      verdictTitle: "まとめ",
      tableTitle: "比較表",
      criterion: "項目",
      edgeCachety: "Cachety が有利",
      edgeOther: (n: string) => `${n} が有利`,
      chooseOther: (n: string) => `${n} が向いている場合`,
      chooseCachety: "Cachety が向いている場合",
      sourcesTitle: "出典",
      checked: (d: string) =>
        `${d}に各社の公開ページで確認した情報です。サービスは変わることがあります。古い情報があれば GitHub でお知らせください。修正します。`,
      disclosure: "この比較は Cachety の作者が書いています。事実に基づき公平であるよう努め、他のツールについての記述にはすべて出典を示しています。",
      allComparisons: "すべての比較",
      related: "ほかの比較",
    },
    footer: {
      tagline: "書類を端末の外に出さずに、透かしを入れる。",
      name: {
        pron: "カシェティ",
        pos: "名詞",
        def: "フランス語の cachet（文書を保証する印・封印）と cacher（隠す）から。見せるものには印を、見せないものには目隠しを。",
      },
      support: "プロジェクトを応援",
      madeIn: "フランス製",
      by: "制作：",
      basedOn: "元になったプロジェクト：",
      inspiredBy: "その原点：",
      license: "AGPL-3.0 ライセンス",
      source: "ソースコード",
      free: "無料・追跡なし",
    },
  },

  zh: {
    nav: {
      tool: "工具",
      about: "为什么加水印？",
      guides: "指南",
      privacy: "隐私",
      menu: "菜单",
      close: "关闭菜单",
      donate: "捐助",
      compare: "对比",
      nameShort: "cachet（印章）+ cacher（隐藏）",
    },
    hero: {
      title: "给证件加水印，文件全程不上传",
      lead: "身份证、户口本、工资条、银行流水：几秒钟就能加上水印。从头到尾，文件都只留在您自己的设备上。",
      pills: ["免费", "无需注册", "不上传", "法国出品"],
    },
    landing: {
      howTitle: "使用方法",
      how: [
        { title: "拖入文件", body: "PDF 或照片都可以，iPhone 拍的照片也行。需要的话可以一次放多个。" },
        { title: "写明用途", body: "例如「仅供××房产租房登记使用，他用无效，2026年10月11日」。常用模板一键可用。" },
        { title: "检查后下载", body: "预览就是最终效果。加好水印的文件直接保存到您的设备。" },
      ],
      trustTitle: "文件始终不离开您的设备",
      trustLead: "很多在线加水印网站会把您的身份证上传到它们的服务器。Cachety 不会：所有处理都由您手机或电脑上的浏览器完成。",
      trust: [
        { title: "在本机处理", body: "文件只存在于设备内存中。关闭页面，一切随之清除。" },
        { title: "技术上杜绝外传", body: "页面禁止浏览器向任何其他网站发送数据。即使出了问题，文件也传不出去。" },
        { title: "无需注册，没有跟踪", body: "不用注册，没有跟踪 Cookie，不做访问统计，也不接入广告联盟。" },
        { title: "开源，可验证", body: "代码完全公开。任何人都可以查看、核实，甚至自己部署一份。" },
      ],
      airplaneTitle: "自己验证：飞行模式测试",
      airplaneBody: "先打开本页，然后断网（开启飞行模式）。再拖入一个文件：Cachety 照常工作。这就证明没有任何东西经过互联网。",
      featuresTitle: "保护复印件所需的功能，一应俱全",
      features: [
        { title: "整页水印", body: "斜向重复铺满整页，直接融进图像，单靠编辑 PDF 删不掉。" },
        { title: "遮盖信息（打码）", body: "遮住银行卡号、身份证号或照片。内容会被真正删除，而不只是盖住。" },
        { title: "可追溯副本", body: "每份副本都带有日期和唯一编号：一旦外流，就知道是从哪里流出的。" },
        { title: "每个接收方一个版本", body: "给每家中介、每家银行各生成一份专属版本，一次下载。" },
        { title: "密码保护", body: "用银行级的 AES-256 强加密锁住 PDF。" },
        { title: "清除隐藏数据", body: "可选中的文字、元数据和照片的 GPS 位置，都会从最终文件中删除。" },
        { title: "控制文件大小", body: "可限制在每个文件 1、2、5 或 10 MB 以内，适合有上传限制的网站。" },
        { title: "手机也能用", body: "支持 iPhone 和安卓，包括 HEIC 照片。还能像 App 一样添加到主屏幕。" },
      ],
      originTitle: "免费、开源、法国出品",
      originBody: "Cachety 是免费的开源软件（AGPL 许可）。代码向所有人公开，并将一直如此。它是在法国开源项目 Filigrane Local 和 Filigraneur 的基础上发展而来的。",
      originBy: "设计与维护：",
      supportTitle: "支持 Cachety",
      supportBody: "Cachety 免费，并将一直免费。但开发需要时间，域名和开发工具也需要费用。如果 Cachety 帮到了您，一笔小小的捐助能让它继续下去。",
      supportCta: "捐助",
      supportNote: "完全自愿。付款在本网站之外的 GitHub Sponsors 上完成。",
      faqTitle: "常见问题",
      faq: [
        {
          q: "我的文件会上传到服务器吗？",
          a: "不会，永远不会。这个网站根本没有能接收文件的服务器。所有处理都由您的浏览器完成，而且页面从技术上禁止它联系任何其他网站。用飞行模式测试，十秒钟就能验证。",
        },
        {
          q: "真的免费吗？有什么附加条件？",
          a: "没有附加条件：不用注册，没有付费版，也不收集任何数据。因为不在服务器上处理任何东西，运行网站几乎不花钱，开源代码也保证它会一直免费。项目的开发依靠自愿捐助，将来也可能展示少量精心挑选的赞助链接（如加密工具、开源软件）。绝不会有跟踪您的广告，也绝不会根据您的文件内容展示任何东西。",
        },
        {
          q: "可以处理哪些文件？",
          a: "PDF 和图片：JPG、PNG、iPhone 照片（HEIC）、WebP、GIF、BMP 和 AVIF。每个文件最大 200 MB，PDF 最多 500 页，可以一次处理多个文件。",
        },
        {
          q: "水印会被去掉吗？",
          a: "编辑 PDF 是去不掉的：水印已经成为每一页图像的一部分。但实话实说，没有什么能阻止别人拍照或修图。水印的作用是让人不敢挪用，并在外流时能追查来源。",
        },
        {
          q: "水印上应该写什么？",
          a: "三样东西：复印件的用途、交给谁、日期。例如「仅供××房产租房登记使用，他用无效，2026年10月11日」。",
        },
        {
          q: "手机上能用吗？",
          a: "能，iPhone 和安卓都可以。在浏览器中打开 cachety.com，点一下上传区域，选择照片或 PDF 即可。也可以添加到主屏幕。",
        },
      ],
      guidesTitle: "实用指南",
      guidesLead: "针对日常场景的分步说明。",
      guidesAll: "全部指南",
      backToTop: "给文件加水印",
    },
    privacy: {
      title: "隐私与安全",
      lead: "证件是您的个人隐私。这里用通俗的话说明 Cachety 做什么、不做什么，以及您如何亲自验证。",
      updated: "更新于 2026年10月11日",
      sections: [
        {
          title: "简而言之",
          items: [
            "文件从不上传：它们由您设备上的浏览器处理。",
            "无需注册，没有跟踪 Cookie，不做访问统计，不接入广告联盟。",
            "不保留任何东西：关闭页面，文件就从内存中消失。",
            "代码公开，任何人都可以检查。",
          ],
        },
        {
          title: "拖入文件后会发生什么",
          paras: [
            "浏览器在设备内存中读取文件，把每一页转成图像，在上面画上水印，然后生成一个全新的文件。点击「下载」后，它会直接保存到您的设备。",
            "文件、水印文字、接收方名称和密码，在任何时候都不会经过互联网。",
          ],
        },
        {
          title: "我们不收集什么",
          items: [
            "您的文件及其预览。",
            "水印文字和接收方名称。",
            "您的密码。",
            "您的身份：没有账号，也没有表单。",
            "您的使用习惯：没有 Google Analytics，没有广告像素，没有跟踪 Cookie。",
          ],
        },
        {
          title: "设备上保存了什么",
          paras: [
            "只有您的设置：语言、水印外观、自动预览和所选的最大文件大小。它们保存在浏览器中，免得您每次重新设置。文件、文字和密码都不会保存在那里。您随时可以在浏览器中清除本站数据来删除它们。",
            "为了离线使用，浏览器还会保存网站页面的副本（不是您的文件）。",
          ],
        },
        {
          title: "托管与资金",
          paras: [
            "网站页面由 Cloudflare 分发。和所有网站托管商一样，为了把页面发送给您，它在技术上会看到访客的 IP 地址和所访问的页面。它永远看不到您的文件，因为文件从未被发送。",
            "捐助通过 GitHub 网站上的 GitHub Sponsors 进行，适用 GitHub 自己的隐私政策。Cachety 看不到您的付款信息，网页中也没有任何付款表单或付款脚本。",
            "目前 Cachety 上没有任何广告。为了让项目持续下去，将来可能会出现少量人工挑选、符合本项目理念的赞助链接，例如加密工具、开源软件、安全的文件分享服务。它们会明确标注为赞助内容，由 Cachety 自己提供，不使用广告联盟或第三方脚本，也绝不会根据您的文件内容展示。页面的安全策略仍会禁止连接任何其他网站。",
          ],
        },
        {
          title: "如何亲自验证",
          items: [
            "飞行模式测试：打开网站后断网，再给文件加水印，一切照常。",
            "源代码公开：任何人都能查看，每次修改都有自动测试确认数据无法外传。",
            "懂技术的朋友可以查看：本页的安全策略（CSP）禁止浏览器连接任何其他网站。",
            "谁都不想信任？您可以在自己的电脑或服务器上运行这个网站。",
          ],
        },
        {
          title: "对复印件的更多保护",
          items: [
            "遮盖的区域会从文件中真正删除，而不是盖上一个方块。",
            "隐藏文字、元数据和照片的 GPS 位置都会被清除。",
            "密码使用 AES-256 加密；复制后的密码一分钟后会从剪贴板清除。",
            "发现安全问题？请通过 GitHub 仓库的安全页面私下报告。",
          ],
        },
        {
          title: "水印做不到的事",
          paras: [
            "水印能让人不敢挪用复印件，并帮助追查泄露来源。但它无法让复印件不能被拍照或修图。只发送对方确实要求的材料，不需要的信息请遮盖。",
          ],
        },
      ],
    },
    guidesUi: {
      title: "实用指南",
      lead: "租房、求职、身份证、手机操作：一步一步教您保护证件，不需要任何专业知识。",
      read: "阅读指南",
      example: "水印示例",
      faqTitle: "常见问题",
      related: "延伸阅读",
      cta: "给我的文件加水印",
      ctaNote: "免费，无需注册。文件不会离开您的设备。",
      updated: (d) => `更新于 ${d}`,
      allGuides: "全部指南",
    },
    compareUi: {
      title: "Cachety 与其他水印工具对比",
      lead: "与常用工具的对比，基于事实、通俗易懂：文件去了哪里、要花多少钱，以及什么时候其他工具更合适。",
      read: "阅读对比",
      verdictTitle: "简要结论",
      tableTitle: "逐项对比",
      criterion: "项目",
      edgeCachety: "Cachety 占优",
      edgeOther: (n: string) => `${n} 占优`,
      chooseOther: (n: string) => `什么时候选 ${n} 更合适`,
      chooseCachety: "什么时候选 Cachety 更合适",
      sourcesTitle: "资料来源",
      checked: (d: string) =>
        `以上信息于 ${d} 根据各服务商的公开页面核实。服务可能变化：如发现信息过时，请在 GitHub 上告诉我们，我们会更正。`,
      disclosure: "本文由 Cachety 的作者撰写。我们力求客观公正：关于其他工具的每一条说法都附有来源。",
      allComparisons: "全部对比",
      related: "其他对比",
    },
    footer: {
      tagline: "文件不离开设备，就能加水印。",
      name: {
        pron: "/ka.ʃə.ti/",
        pos: "名词",
        def: "源自法语 cachet（为文件作证的印章）与 cacher（隐藏）。给分享的内容盖上印，把其余的遮起来。",
      },
      support: "支持本项目",
      madeIn: "法国出品",
      by: "作者：",
      basedOn: "基于",
      inspiredBy: "其灵感来自",
      license: "AGPL-3.0 许可",
      source: "源代码",
      free: "免费服务，无跟踪",
    },
  },
};

export const SITE_COPY: Record<Lang, SiteCopy> = {
  ...BASE_COPY,
  es: SITE_ES,
  ar: SITE_AR,
  fa: SITE_FA,
  de: SITE_DE,
  pt: SITE_PT,
  id: SITE_ID,
  nl: SITE_NL,
};
