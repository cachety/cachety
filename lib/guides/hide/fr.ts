// Guides sur les zones suggérées (fr) : repérer et masquer les numéros de
// compte, donner son RIB ou son IBAN, envoyer une copie de sa carte bancaire.
// Écrits pour un public en France. Texte brut uniquement : pas de lien, pas de
// balise, pas de markdown.
//
// Ces guides décrivent la fonction « zones suggérées » (docs/prd-suggested-areas.md)
// telle qu'elle est livrée. Les libellés cités (« Voir », « Tout masquer »,
// « Pas celui-ci », « Numéro de compte (IBAN) », « Terminé », « Masquer quelque
// chose ») sont ceux de lib/suggest-copy/fr.ts et de lib/i18n.tsx, vérifiés le
// 2026-11-19, et la liste des numéros est celle de lib/sensitive.ts : à garder
// en accord avec eux. Les règles françaises citées (RIB et mandat, remboursement
// d'un prélèvement SEPA, listes noire et blanche, vérification d'un avis
// d'impôt, contenu du code 2D-Doc) ont été relues le même jour auprès de la
// Banque de France, de l'administration (service de vérification des avis) et
// des spécifications 2D-Doc de l'ANTS. Les règles des cartes (PCI DSS, Visa)
// sont celles qui ont été vérifiées pour le guide anglais.

import type { Guide } from "../types";

const UPDATED = "2026-11-19";

export const HIDE_GUIDES_FR: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "masquer-iban-numero-de-compte-pdf",
    topic: "auto-redact",
    title: "Repérer et masquer un IBAN ou un numéro de carte dans un PDF avant de l’envoyer",
    metaTitle: "Repérer et masquer un IBAN dans un PDF, gratuitement",
    description:
      "Cachety repère les IBAN et les numéros de carte dans votre PDF et propose de les noircir, sur votre appareil. Rien n’est envoyé, rien n’est masqué sans vous.",
    intro:
      "Une fiche de paie, une facture ou un relevé de compte en disent souvent plus que ce dont le destinataire a besoin : un IBAN, un numéro de carte, un numéro de sécurité sociale. Cachety vous les montre sur la page et vous laisse les noircir d’un geste, sans que le fichier quitte votre appareil.",
    example: "Justificatif de revenus – Agence Roussel – 18/11/2026",
    body: [
      { type: "h2", text: "Ces numéros qu’on envoie sans y penser" },
      {
        type: "p",
        text: "Quand une agence demande vos trois dernières fiches de paie, elle veut voir qui vous emploie et combien vous gagnez. Elle n’a pas besoin du compte sur lequel votre salaire est versé, et rarement de votre numéro de sécurité sociale. Quand une facture d’énergie sert de justificatif de domicile, personne n’a besoin des coordonnées bancaires imprimées en bas pour le prélèvement. Mais ces numéros sont écrits en petit, en page deux ou trois, et la plupart des gens envoient le fichier tel quel.",
      },
      {
        type: "p",
        text: "Les masquer à la main, c’est possible, mais il faut savoir où regarder. Cachety cherche désormais à votre place.",
      },
      { type: "h2", text: "Ce que Cachety recherche" },
      {
        type: "p",
        text: "Quand vous ajoutez un PDF, Cachety lit son texte dans votre navigateur et y cherche les numéros dont il peut vérifier le format :",
      },
      {
        type: "list",
        items: [
          "Les numéros de compte bancaire écrits sous forme d’IBAN, de n’importe quel pays.",
          "Les numéros de carte bancaire des principaux réseaux.",
          "Les numéros de sécurité sociale, les numéros fiscaux et les références d’avis d’impôt français.",
          "Les numéros d’identité et les numéros fiscaux d’autres pays : l’identifiant fiscal allemand, le DNI et le NIE espagnols, le BSN néerlandais, le numéro national belge, le NIF portugais, le CPF brésilien, le code fiscal italien, la carte d’identité de résident chinoise, le My Number japonais, le code national iranien et le NIK indonésien.",
        ],
      },
      {
        type: "p",
        text: "Un numéro n’est proposé que s’il passe le contrôle prévu par son format, comme la clé de contrôle d’un IBAN, ou si la mention placée à côté dit ce que c’est. Un numéro de téléphone, une date ou le montant d’une facture ne sont pas signalés simplement parce que ce sont des suites de chiffres.",
      },
      { type: "h2", text: "Les masquer, pas à pas" },
      {
        type: "steps",
        items: [
          "Ouvrez cachety.com dans votre navigateur, sur ordinateur ou sur téléphone. Aucun compte à créer.",
          "Ajoutez votre PDF. Indiquez à quoi sert la copie, puis qui va la recevoir.",
          "Si Cachety a trouvé quelque chose, un message au-dessus de l’aperçu vous dit combien de numéros il a repérés. Choisissez « Voir ».",
          "Chaque suggestion est encadrée sur la page et listée avec son nom, par exemple « Numéro de compte (IBAN) ». Sélectionnez celles que vous voulez masquer, ou choisissez « Tout masquer ». Vous pouvez annuler chacune, et écarter avec « Pas celui-ci » une suggestion qui se trompe.",
          "Relisez vous-même chaque page et tracez un rectangle sur tout ce que vous voulez encore cacher. Choisissez ensuite « Terminé » : c’est seulement à ce moment-là que les zones sont retirées du fichier.",
          "Vérifiez l’aperçu et téléchargez votre copie.",
        ],
      },
      {
        type: "tip",
        text: "Rien n’est masqué tant que vous ne l’avez pas décidé. Si le destinataire vous a demandé vos coordonnées bancaires, laissez l’IBAN visible : c’est justement ce dont il a besoin. Sur un avis d’impôt, il peut se servir du numéro fiscal et de la référence de l’avis pour vérifier, sur le site des impôts, que le document est authentique : ne les masquez que s’il n’en a pas besoin.",
      },
      {
        type: "p",
        text: "Les mêmes suggestions apparaissent dans les deux autres outils de Cachety : quand vous signez un PDF, et quand vous réunissez plusieurs documents en un seul fichier avec Dossier.",
      },
      { type: "h2", text: "Ce qu’il ne peut pas trouver" },
      {
        type: "list",
        items: [
          "Tout ce qui se trouve dans une photo ou un scan. Une image ne contient pas de texte à lire, donc aucune suggestion : tracez les zones vous-même.",
          "Les codes-barres et les QR codes. Ils peuvent contenir les mêmes informations que le texte imprimé à côté : le code 2D-Doc d’un avis d’impôt sur le revenu, par exemple, reprend des informations de l’avis, dont le numéro fiscal.",
          "Les numéros dont Cachety ne vérifie pas le format, comme un numéro de compte écrit autrement qu’en IBAN, un numéro de client ou de contrat, un numéro de passeport ou de permis de conduire.",
          "Un numéro de carte déjà en partie masqué, comme les quatre derniers chiffres imprimés sur un ticket. Il n’y a plus rien à masquer.",
          "Les noms, adresses, dates de naissance et numéros de téléphone. C’est en général ce dont le destinataire a besoin : ils ne sont donc pas proposés.",
        ],
      },
      {
        type: "warning",
        text: "Les suggestions sont une aide, pas une garantie. Elles peuvent en oublier. Vérifiez toujours vous-même toute la page avant de l’envoyer.",
      },
      { type: "h2", text: "Vraiment retiré, et jamais envoyé en ligne" },
      {
        type: "p",
        text: "Une zone masquée n’est pas une forme noire posée sur le texte. Cachety reconstruit chaque page en image : le numéro a disparu du fichier et on ne peut pas le copier par-dessous. La recherche des numéros se fait dans votre navigateur, avec des règles simples. Votre document n’est envoyé ni à un serveur ni à un service d’IA, et la page continue de fonctionner en mode avion une fois chargée.",
      },
    ],
    faq: [
      {
        q: "Cachety masque-t-il les numéros automatiquement ?",
        a: "Non. Il encadre ce qu’il a trouvé et c’est vous qui décidez, un par un ou tous d’un coup. Certains numéros sont là parce que le destinataire en a besoin, et vous seul le savez.",
      },
      {
        q: "Est-ce que ça marche sur une photo ou un document scanné ?",
        a: "Non. Les suggestions ont besoin d’un PDF qui contient du vrai texte, comme les fiches de paie, les factures et les relevés que vous téléchargez sur un site. Sur une photo ou un scan, tracez les zones vous-même avec « Masquer quelque chose ».",
      },
      {
        q: "Mon document est-il envoyé quelque part pour être analysé ?",
        a: "Non. Les vérifications se font dans votre navigateur, sur votre appareil. Rien n’est envoyé en ligne, et aucun service d’IA ne lit votre fichier.",
      },
      {
        q: "Peut-il oublier un numéro ?",
        a: "Oui. Un numéro dans une image, dans un code-barres ou dans un format que Cachety ne vérifie pas ne sera pas proposé. C’est pourquoi la page vous demande toujours de vérifier vous-même.",
      },
      {
        q: "Toutes les pages d’un long PDF sont-elles couvertes ?",
        a: "Oui. Les suggestions couvrent toutes les pages, y compris celles qui ne sont pas affichées dans l’aperçu. Pour celles-ci, la liste montre les premiers et les derniers caractères de chaque numéro, pour que vous sachiez ce que vous masquez.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "donner-son-rib-iban-risques",
    topic: "iban",
    title: "Donner son RIB ou son IBAN, est-ce risqué ?",
    metaTitle: "Donner son RIB ou son IBAN : est-ce risqué ?",
    description:
      "Ce qu’on peut faire, ou non, avec votre RIB ou votre IBAN, quand le donner, et comment le masquer sur les documents où il n’est pas utile.",
    intro:
      "Vous donnez votre RIB pour être payé, et votre IBAN figure sur bien des documents que vous envoyez pour d’autres raisons. Seul, il présente peu de risques. Les ennuis commencent quand il voyage avec le reste de vos papiers.",
    example: "RIB pour versement du salaire – Société Garnier – 18/11/2026",
    body: [
      { type: "h2", text: "Ce qu’on peut faire avec votre RIB" },
      {
        type: "p",
        text: "Avec votre IBAN, on peut verser de l’argent sur votre compte. C’est à cela qu’il sert. À lui seul, il ne permet ni de retirer de l’argent ni de faire un virement : il faut pour cela votre carte, vos identifiants de banque en ligne ou votre accord. La Banque de France le dit : communiquer son RIB n’est pas risqué en soi, car pour prélever votre compte, un créancier doit y être autorisé par un mandat de prélèvement que vous avez signé.",
      },
      {
        type: "p",
        text: "Le principal risque, c’est un prélèvement mis en place à votre nom sans votre accord : il arrive que des fraudeurs émettent des prélèvements non autorisés avec des mandats fictifs. Pour un prélèvement SEPA, celui qu’on utilise en France comme dans toute la zone euro, vous pouvez demander à votre banque le remboursement d’une opération dans les huit semaines qui suivent le débit, et dans les treize mois si vous ne l’avez jamais autorisée. Vous pouvez aussi lui demander de bloquer les prélèvements des créanciers que vous désignez (liste noire), ou de n’accepter que ceux des créanciers que vous désignez (liste blanche) : d’après la Banque de France, elle est tenue de répondre à cette demande. Surveillez donc vos relevés, et signalez à votre banque tout prélèvement que vous ne reconnaissez pas.",
      },
      { type: "h2", text: "Le vrai danger, c’est le lot complet" },
      {
        type: "p",
        text: "Un RIB devient bien plus utile à un fraudeur quand il arrive avec une copie de votre pièce d’identité, votre adresse, votre signature et vos fiches de paie. Ensemble, ces éléments suffisent pour tenter d’ouvrir un compte ou de souscrire un crédit à votre nom. Un dossier de location ou un dossier d’embauche contient exactement ce lot. La question est donc moins « mon IBAN est-il secret ? » que « cette personne en a-t-elle vraiment besoin ? ».",
      },
      { type: "h2", text: "Quand le donner, quand le masquer" },
      {
        type: "list",
        items: [
          "Donnez-le quand quelqu’un doit vous payer, ou prélever une somme que vous avez acceptée : un employeur, un propriétaire qui vous rend le dépôt de garantie, un fournisseur d’énergie que vous payez par prélèvement.",
          "Masquez-le quand le document est envoyé pour une autre raison : une fiche de paie comme justificatif de revenus, une facture comme justificatif de domicile, un relevé de compte qui doit seulement montrer votre nom et votre adresse.",
          "Si vous le pouvez, envoyez votre RIB à part, pas dans le même fichier que votre pièce d’identité.",
        ],
      },
      { type: "h2", text: "Masquer un IBAN avec Cachety" },
      {
        type: "steps",
        items: [
          "Ouvrez cachety.com dans votre navigateur. Rien à installer, aucun compte.",
          "Ajoutez votre PDF ou votre photo. Indiquez à quoi sert la copie, puis qui va la recevoir.",
          "Dans un PDF, Cachety recherche les IBAN et vous prévient s’il en trouve un. Choisissez « Voir », sélectionnez la suggestion pour la masquer, puis choisissez « Terminé ».",
          "Un numéro de compte écrit autrement qu’en IBAN (code banque, code guichet, numéro de compte et clé RIB) n’est pas proposé, pas plus que ce qui figure sur une photo : cliquez sur « Masquer quelque chose » et tracez un rectangle par-dessus.",
          "Vérifiez chaque page, puis téléchargez votre copie.",
        ],
      },
      {
        type: "tip",
        text: "Quand vous devez vraiment envoyer votre RIB, ajoutez un filigrane qui dit pour qui et pourquoi, par exemple « RIB pour versement du salaire – Société Garnier ». Une copie marquée ainsi est difficile à réutiliser ailleurs.",
      },
      { type: "h2", text: "Votre fichier reste chez vous" },
      {
        type: "p",
        text: "Cachety fonctionne dans votre navigateur. Votre relevé ou votre fiche de paie n’est jamais envoyé en ligne, et le numéro masqué est retiré du fichier lui-même, pas seulement recouvert. Gardez en tête que les suggestions peuvent en oublier : relisez chaque page avant de l’envoyer.",
      },
    ],
    faq: [
      {
        q: "Peut-on prendre de l’argent sur mon compte avec mon IBAN ?",
        a: "Pas directement. Un IBAN sert à verser de l’argent sur un compte. Le risque, c’est un prélèvement mis en place sans votre accord, et vous avez le droit d’en demander le remboursement. Surveillez vos relevés et signalez tout ce que vous ne reconnaissez pas.",
      },
      {
        q: "Faut-il masquer son IBAN sur une fiche de paie ?",
        a: "Si la fiche de paie sert de justificatif de revenus, oui : le destinataire a besoin de votre nom, de votre employeur et de votre salaire, pas de votre compte. Si votre employeur vous demande votre RIB, envoyez-le à part.",
      },
      {
        q: "Mon propriétaire me demande un RIB. Est-ce normal ?",
        a: "Cela peut l’être, par exemple pour mettre en place le paiement du loyer ou vous rendre le dépôt de garantie. Dans ce cas, il a besoin du numéro : ne le masquez pas. Ajoutez un filigrane avec son nom et le motif.",
      },
      {
        q: "Que faire si je vois un prélèvement que je n’ai jamais autorisé ?",
        a: "Contactez tout de suite votre banque et demandez le remboursement. Pour un prélèvement SEPA, vous avez treize mois à compter du débit pour contester une opération que vous n’avez pas autorisée. Vous pouvez aussi lui demander de bloquer les prélèvements de ce créancier.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "envoyer-copie-carte-bancaire",
    topic: "bank-card",
    title: "On vous demande une copie de votre carte bancaire ? Ce qu’il faut masquer avant de l’envoyer",
    metaTitle: "Copie de carte bancaire : que masquer avant d’envoyer ?",
    description:
      "Un hôtel ou un vendeur demande une photo de votre carte bancaire ? Quels chiffres masquer, pourquoi ne jamais envoyer le cryptogramme, et comment les noircir.",
    intro:
      "Des hôtels, des loueurs de voitures et certains vendeurs en ligne demandent encore une photo de votre carte « pour confirmer la réservation ». Avant d’envoyer quoi que ce soit, masquez ce dont personne n’a besoin. Mieux encore : demandez un moyen de paiement plus sûr.",
    example: "Confirmation de réservation – Hôtel des Tilleuls – 18/11/2026",
    body: [
      { type: "h2", text: "Pourquoi une photo de votre carte est risquée" },
      {
        type: "p",
        text: "Sur la plupart des cartes bancaires, le recto montre le long numéro de carte, la date d’expiration et votre nom, et le verso le cryptogramme visuel, à trois chiffres. Sur certaines cartes récentes, tout cela est imprimé au verso. Réunis, ils suffisent pour payer en ligne avec votre carte. Or un e-mail ou un message peut rester des années dans plusieurs boîtes, bien loin de votre contrôle.",
      },
      {
        type: "warning",
        text: "N’envoyez jamais le cryptogramme visuel : les trois chiffres au dos de la carte, ou les quatre chiffres au recto d’une carte American Express. Aucun commerçant honnête n’en a besoin en photo. Les règles de sécurité que le secteur des cartes s’est données interdisent aux commerçants de le conserver une fois le paiement autorisé.",
      },
      { type: "h2", text: "Demandez d’abord un autre moyen" },
      {
        type: "p",
        text: "Un commerçant qui accepte la carte devrait pouvoir vous envoyer un lien de paiement sécurisé, encaisser par son système de réservation, ou vérifier la carte à votre arrivée. Posez la question. S’il insiste pour avoir une copie, c’est en général pour vérifier que la carte existe et qu’elle est à votre nom : une copie en partie masquée suffit pour cela.",
      },
      { type: "h2", text: "Ce qu’il faut masquer, ce qu’il faut laisser" },
      {
        type: "list",
        items: [
          "Masquez les chiffres du milieu du numéro de carte. Laissez au plus les quatre derniers : c’est en général ce qu’affiche votre exemplaire du ticket de carte.",
          "Masquez le cryptogramme visuel. Au dos de la carte, masquez toute la bande sur laquelle il est imprimé.",
          "Masquez la date d’expiration, sauf si on vous la demande pour une bonne raison.",
          "Laissez votre nom et le logo de la banque : la copie prouve ainsi toujours que la carte est la vôtre.",
        ],
      },
      { type: "h2", text: "Masquer les chiffres avec Cachety" },
      {
        type: "steps",
        items: [
          "Prenez en photo le recto de la carte. Ne photographiez le verso que si on vous le demande.",
          "Ouvrez cachety.com sur votre téléphone ou votre ordinateur et ajoutez la photo.",
          "Indiquez à quoi sert la copie, puis qui va la recevoir, par exemple « Confirmation de réservation » et le nom de l’hôtel.",
          "Sous l’aperçu, cliquez sur « Masquer quelque chose » et tracez un rectangle sur les chiffres du milieu, la date d’expiration et le cryptogramme visuel.",
          "Vérifiez l’aperçu, puis téléchargez la copie et envoyez-la.",
        ],
      },
      {
        type: "tip",
        text: "Dans un PDF, par exemple un relevé qui affiche un numéro de carte complet, Cachety peut repérer le numéro et proposer de le masquer. Sur une photo de la carte, il n’y a pas de texte à lire : vous tracez les zones vous-même.",
      },
      { type: "h2", text: "Ce que devient la photo" },
      {
        type: "p",
        text: "Rien ne quitte votre appareil. Cachety fonctionne dans votre navigateur et aucun serveur ne reçoit votre photo. Les chiffres masqués sont retirés de l’image, pas seulement recouverts, et le lieu de la prise de vue est effacé du fichier. Le filigrane dit pour qui la copie a été faite, ce qui la rend plus difficile à réutiliser.",
      },
      {
        type: "p",
        text: "Pour être honnête, une copie masquée et filigranée réduit le risque sans le supprimer. Si une demande vous paraît louche, n’envoyez pas la carte du tout, et appelez le commerçant à un numéro que vous avez trouvé vous-même.",
      },
    ],
    faq: [
      {
        q: "Quels chiffres de mon numéro de carte puis-je montrer ?",
        a: "Les quatre derniers suffisent pour la plupart des vérifications, et ce sont en général ceux que les commerces impriment sur votre exemplaire du ticket. Selon les règles de sécurité des cartes, un commerçant ne devrait normalement pas afficher plus que les premiers chiffres, qui identifient la banque, et les quatre derniers. Masquez le reste.",
      },
      {
        q: "Peut-on envoyer sans risque une photo de sa carte par e-mail ou par WhatsApp ?",
        a: "Pas avec le numéro complet et le cryptogramme visuel bien visibles. Les messages sont copiés, transférés et conservés, et Visa conseille elle-même de ne jamais envoyer d’informations de paiement par e-mail. Si vous devez envoyer une copie, masquez d’abord les chiffres du milieu et le cryptogramme visuel.",
      },
      {
        q: "L’hôtel veut le recto et le verso. Que faire ?",
        a: "Demandez pourquoi, et proposez plutôt un lien de paiement sécurisé. Si vous envoyez quand même le verso, masquez le cryptogramme visuel et la bande qui l’entoure. Les règles du secteur des cartes n’autorisent pas un commerçant à conserver ce code une fois le paiement autorisé.",
      },
      {
        q: "J’ai déjà envoyé une photo complète de ma carte. Que faire ?",
        a: "Appelez votre banque. Elle peut bloquer la carte et vous en envoyer une nouvelle, et elle vous dira comment contester un paiement que vous n’avez pas fait. Surveillez vos relevés dans les semaines qui suivent.",
      },
    ],
    updated: UPDATED,
  },
];
