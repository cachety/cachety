// Guides pratiques en français, écrits pour un public en France.
// Texte brut uniquement : pas de lien, pas de balise, pas de markdown.

import type { Guide } from "./types";

const UPDATED = "2026-10-12";

export const GUIDES_FR: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "filigrane-dossier-location",
    topic: "rental",
    title: "Mettre un filigrane sur son dossier de location",
    metaTitle: "Filigrane sur un dossier de location : le guide",
    description:
      "Filigrane pour dossier de location : protégez vos papiers envoyés à une agence ou un propriétaire, et déjouez l’arnaque au faux bailleur. Gratuit.",
    intro:
      "Pièce d’identité, fiches de paie, avis d’imposition : un dossier de location contient tout ce qu’il faut pour usurper votre identité. Un simple filigrane, ajouté en deux minutes, limite fortement les risques.",
    example: "Dossier de location – Agence Martin – 12/10/2026",
    body: [
      { type: "h2", text: "Pourquoi un dossier de location attire les escrocs" },
      {
        type: "p",
        text: "Pour louer un appartement, on envoie souvent ses papiers à plusieurs agences et à plusieurs propriétaires, parfois à des inconnus rencontrés sur une petite annonce. Chaque envoi, c’est une copie de plus qui circule, dans une boîte mail ou un dossier partagé que vous ne contrôlez pas.",
      },
      {
        type: "p",
        text: "En France, l’arnaque au faux propriétaire est bien connue : une annonce alléchante, un « bailleur » pressé qui réclame le dossier complet avant toute visite, puis plus de nouvelles. Les documents récupérés servent ensuite à ouvrir un crédit, souscrire un abonnement ou louer un autre logement à votre nom.",
      },
      {
        type: "warning",
        text: "Méfiez-vous d’un propriétaire qui refuse la visite, demande de l’argent avant la signature ou exige votre dossier complet par message. Dans le doute, n’envoyez rien, et ne versez jamais de dépôt de garantie avant d’avoir visité et signé.",
      },
      { type: "h2", text: "Ce que change un filigrane" },
      {
        type: "p",
        text: "Le filigrane est un texte écrit en travers de chaque page, par exemple « Dossier de location – Agence Martin – 12/10/2026 ». Le document reste parfaitement lisible pour l’agence, mais il devient difficile à réutiliser ailleurs : une banque ou un opérateur qui reçoit une copie marquée « location » pour une autre personne a de bonnes raisons de se méfier. Et si une copie fuite, la mention vous indique à qui vous l’aviez confiée.",
      },
      {
        type: "p",
        text: "Le principe est d’ailleurs déjà appliqué par certaines plateformes de dossier, comme DossierFacile, le service proposé par l’État : les pièces y sont marquées pour un usage locatif. Si une agence vous demande vos papiers en direct, vous pouvez faire la même chose vous-même.",
      },
      { type: "h2", text: "Filigraner votre dossier avec Cachety" },
      {
        type: "steps",
        items: [
          "Ouvrez cachety.com dans votre navigateur, sur ordinateur ou sur téléphone.",
          "Déposez vos fichiers : pièce d’identité, trois dernières fiches de paie, avis d’imposition, justificatif de domicile. Vous pouvez en mettre plusieurs à la fois, en PDF ou en photo.",
          "Sous « À quoi sert cette copie ? », tapez le motif ou choisissez l’exemple « Logement ». Puis, sous « Qui va la recevoir ? », indiquez le destinataire, par exemple « Agence Martin ». La date est ajoutée automatiquement.",
          "Vérifiez l’aperçu : le texte doit couvrir la page sans gêner la lecture des informations utiles.",
          "Avant de télécharger, choisissez « Un seul PDF » pour tout réunir dans l’ordre de votre choix : c’est plus simple pour l’agence. Puis téléchargez.",
        ],
      },
      {
        type: "tip",
        text: "Vous postulez pour plusieurs logements ? Ajoutez chaque agence ou propriétaire avec « + Ajouter un destinataire » : chacun reçoit sa propre copie, avec son nom dessus, en une seule fois. Si une copie circule un jour, vous saurez d’où elle vient.",
      },
      { type: "h2", text: "Vos papiers ne quittent pas votre appareil" },
      {
        type: "p",
        text: "Avec Cachety, rien n’est envoyé sur internet. Le travail se fait directement dans votre navigateur, sur votre ordinateur ou votre téléphone. Il n’existe aucun serveur qui recevrait vos fichiers. Vous pouvez même couper le wifi ou passer en mode avion une fois la page chargée : tout continue de fonctionner. C’est gratuit, sans compte et sans pistage.",
      },
      {
        type: "p",
        text: "Soyons honnêtes : un filigrane ne rend pas toute fraude impossible. Quelqu’un de déterminé peut toujours photographier un document. Mais il décourage la plupart des abus et rend une fuite traçable, ce qui est déjà beaucoup.",
      },
    ],
    faq: [
      {
        q: "Une agence peut-elle refuser un dossier filigrané ?",
        a: "En pratique, c’est rare : le filigrane n’empêche pas de lire et de vérifier vos documents. Gardez un texte discret et une opacité modérée pour que les montants et les noms restent bien lisibles.",
      },
      {
        q: "Que faut-il écrire dans le filigrane ?",
        a: "Le motif, le destinataire et la date : « Dossier de location – Agence Martin – 12/10/2026 ». Pour un particulier, mettez son nom à la place de l’agence.",
      },
      {
        q: "Le propriétaire peut-il enlever le filigrane ?",
        a: "Le texte est fondu dans l’image de chaque page, répété en diagonale. On ne peut pas l’effacer simplement en modifiant le PDF. Cela reste une protection dissuasive, pas une garantie absolue.",
      },
      {
        q: "Mon dossier est-il envoyé quelque part ?",
        a: "Non. Les fichiers sont traités sur votre appareil, dans le navigateur, et ne sont jamais envoyés en ligne. Vous seul choisissez ensuite à qui transmettre le résultat.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "filigrane-carte-identite",
    topic: "id-card",
    title: "Comment mettre un filigrane sur sa carte d’identité",
    metaTitle: "Filigrane sur une copie de carte d’identité",
    description:
      "Mettez un filigrane sur la copie de votre carte d’identité ou de votre passeport en deux minutes, gratuitement, sans envoyer vos papiers en ligne.",
    intro:
      "On vous demande souvent une copie de votre carte nationale d’identité ou de votre passeport. Avant de l’envoyer, ajoutez un filigrane : c’est rapide, gratuit, et cela protège votre identité.",
    example: "Ouverture de compte – Banque Durand – 12/10/2026",
    body: [
      { type: "h2", text: "Pourquoi filigraner une copie de pièce d’identité" },
      {
        type: "p",
        text: "Banque, location, inscription, nouvel emploi : la copie de la carte d’identité est demandée partout. Une fois envoyée, elle peut rester des années dans une boîte mail, être transférée ou tomber entre de mauvaises mains. Avec votre nom, votre date de naissance et votre photo, un escroc a de quoi ouvrir un compte ou souscrire un crédit à votre place.",
      },
      {
        type: "p",
        text: "Le filigrane indique noir sur blanc à quoi sert la copie. Une copie marquée « Ouverture de compte – Banque Durand » sera bien plus difficile à réutiliser pour autre chose. Cybermalveillance.gouv.fr, le dispositif public d’aide aux victimes, conseille d’ailleurs de filigraner les copies de ses papiers.",
      },
      { type: "h2", text: "Un bon filigrane en trois éléments" },
      {
        type: "list",
        items: [
          "Le motif : pourquoi vous envoyez cette copie (location, ouverture de compte, inscription).",
          "Le destinataire : le nom de l’organisme ou de la personne.",
          "La date du jour : elle montre que la copie a été faite pour une démarche précise, à un moment précis.",
        ],
      },
      {
        type: "p",
        text: "Le texte doit passer sur la photo et sur les informations principales, sans les rendre illisibles. Le destinataire doit pouvoir vérifier votre identité ; un fraudeur, lui, ne doit pas pouvoir réutiliser l’image proprement.",
      },
      { type: "h2", text: "La marche à suivre avec Cachety" },
      {
        type: "steps",
        items: [
          "Ouvrez cachety.com dans votre navigateur.",
          "Déposez le scan ou la photo de votre carte, recto et verso, ou de votre passeport. Les PDF, les photos JPG et les photos d’iPhone (HEIC) sont acceptés.",
          "Indiquez à quoi sert la copie (tapez-le, par exemple « Ouverture de compte », ou choisissez un exemple comme « Banque »), puis qui va la recevoir, par exemple « Banque Durand ». La date est ajoutée automatiquement.",
          "Regardez l’aperçu : le texte est répété en diagonale sur toute la page. Si besoin, cliquez sur « Ajuster le filigrane » : Léger, Normal ou Marqué, et la taille ou l’opacité sous « Plus de réglages ».",
          "Téléchargez votre copie filigranée et envoyez-la.",
        ],
      },
      {
        type: "tip",
        text: "Ne réutilisez pas la même copie pour deux démarches. Refaites-en une nouvelle à chaque fois, avec le bon destinataire et la date du jour : cela ne prend qu’une minute.",
      },
      { type: "h2", text: "Ce qui se passe avec vos fichiers" },
      {
        type: "p",
        text: "Rien ne part sur internet. Cachety fonctionne entièrement dans votre navigateur, sur votre propre appareil : vos papiers ne sont jamais envoyés sur un serveur. Vous pouvez le vérifier en passant en mode avion une fois la page ouverte, tout continue de marcher. Le fichier final est aussi nettoyé de ses données cachées, comme la position GPS d’une photo prise au téléphone.",
      },
      {
        type: "p",
        text: "Un dernier mot, en toute franchise : un filigrane décourage les abus et permet de savoir d’où vient une copie qui fuite, mais il ne rend pas la réutilisation physiquement impossible. C’est une précaution simple, à combiner avec un peu de vigilance sur la personne à qui vous envoyez vos papiers.",
      },
    ],
    faq: [
      {
        q: "Une banque ou une administration accepte-t-elle une copie filigranée ?",
        a: "En général oui, tant que la copie reste lisible. Gardez une opacité modérée pour que la photo, le nom et le numéro restent bien visibles.",
      },
      {
        q: "Faut-il filigraner le recto et le verso ?",
        a: "Oui. Déposez les deux faces en même temps : Cachety applique le même filigrane à chaque fichier, et vous pouvez les réunir en un seul PDF.",
      },
      {
        q: "Et pour un passeport ?",
        a: "Exactement la même méthode. Pensez à faire passer le texte sur la page avec votre photo, c’est elle qui intéresse les fraudeurs.",
      },
      {
        q: "Est-ce vraiment gratuit ?",
        a: "Oui : gratuit, sans compte, sans pistage. Cachety est un logiciel libre, conçu en France.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "filigrane-avis-imposition-fiche-de-paie",
    topic: "tax-payslip",
    title: "Avis d’imposition, fiches de paie, RIB : que filigraner, que masquer ?",
    metaTitle: "Filigrane avis d’imposition, fiche de paie et RIB",
    description:
      "Avis d’imposition, fiche de paie, RIB : ce qu’il faut filigraner, ce qu’on peut masquer avant de les envoyer. Gratuit, vos papiers restent chez vous.",
    intro:
      "Votre avis d’imposition, vos bulletins de salaire et votre RIB disent beaucoup de choses sur vous. Avant de les envoyer, deux gestes simples : ajouter un filigrane et masquer ce qui n’est pas nécessaire.",
    example: "Dossier de prêt – Banque Durand – 12/10/2026",
    body: [
      { type: "h2", text: "Des documents très convoités" },
      {
        type: "p",
        text: "Un avis d’imposition donne votre adresse, votre situation familiale, vos revenus et votre numéro fiscal. Une fiche de paie contient votre salaire, le nom de votre employeur et souvent votre numéro de sécurité sociale. Un RIB, enfin, donne vos coordonnées bancaires. Ensemble, ils permettent de monter un faux dossier très crédible.",
      },
      { type: "h2", text: "Filigraner : toujours" },
      {
        type: "p",
        text: "Chaque fois que vous envoyez l’un de ces documents, ajoutez un filigrane qui précise le motif, le destinataire et la date : « Dossier de prêt – Banque Durand – 12/10/2026 » ou « Dossier de location – M. Petit – 12/10/2026 ». Le destinataire peut tout lire, mais la copie est clairement liée à une démarche.",
      },
      { type: "h2", text: "Masquer : seulement ce qui n’est pas demandé" },
      {
        type: "list",
        items: [
          "Fiche de paie : le numéro de sécurité sociale est rarement utile à un propriétaire. Vous pouvez le masquer. Gardez le salaire, l’employeur et la date, qui sont ce que l’on vérifie.",
          "Avis d’imposition : le revenu fiscal de référence doit rester visible. Le numéro fiscal et la référence de l’avis servent parfois à vérifier l’authenticité du document : si vous les masquez, on pourra vous les redemander.",
          "RIB : ne masquez pas l’IBAN si l’on vous le demande pour un prélèvement ou un virement, il ne servirait plus à rien. Filigranez-le simplement.",
          "Relevés de compte : si vous devez en envoyer un, masquez les opérations qui ne regardent personne.",
        ],
      },
      {
        type: "tip",
        text: "Pour un dossier de location, un bailleur n’a pas le droit de tout demander : la loi fixe une liste de pièces autorisées. Un relevé de compte bancaire, par exemple, n’en fait pas partie. Vous pouvez refuser poliment.",
      },
      { type: "h2", text: "Avec Cachety, pas à pas" },
      {
        type: "steps",
        items: [
          "Ouvrez cachety.com.",
          "Déposez vos documents, PDF ou photos. Vous pouvez en ajouter plusieurs d’un coup, ou coller une capture d’écran avec Ctrl+V.",
          "Indiquez à quoi sert la copie (tapez-le ou choisissez un exemple : « Impôts », « Banque », « Logement »), puis qui va la recevoir. La date est ajoutée automatiquement.",
          "Si besoin, cliquez sur « Masquer quelque chose » sous l’aperçu et dessinez un rectangle par-dessus le numéro à cacher, puis « Terminé ». La zone masquée est réellement retirée du fichier, pas seulement recouverte.",
          "Vérifiez l’aperçu, puis téléchargez. La taille du fichier s’affiche avant le téléchargement : si un site la limite, « Réduire la taille » la garde sous 10, 5, 2 ou 1 Mo.",
        ],
      },
      { type: "h2", text: "Vos documents restent chez vous" },
      {
        type: "p",
        text: "Tout se passe dans votre navigateur, sur votre ordinateur ou votre téléphone. Vos fichiers ne sont jamais envoyés en ligne, et la page fonctionne même sans connexion une fois chargée. Le texte sélectionnable et les informations cachées du fichier d’origine sont aussi retirés de la copie.",
      },
      {
        type: "p",
        text: "Gardez en tête qu’un filigrane ne rend pas la réutilisation impossible : quelqu’un peut toujours photographier un document. Il dissuade et rend une fuite traçable, et c’est déjà une vraie protection.",
      },
    ],
    faq: [
      {
        q: "Puis-je masquer mon numéro fiscal sur mon avis d’imposition ?",
        a: "Vous pouvez, mais sachez qu’il sert parfois, avec la référence de l’avis, à vérifier que le document est authentique. Si le destinataire en a besoin, il vous le redemandera.",
      },
      {
        q: "Combien de fiches de paie faut-il filigraner ?",
        a: "Toutes celles que vous envoyez. Déposez-les ensemble : le même texte est appliqué à chaque fichier, et vous pouvez les réunir en un seul PDF.",
      },
      {
        q: "Un RIB filigrané reste-t-il valable ?",
        a: "Oui. Le filigrane n’empêche pas de lire l’IBAN. Il indique seulement pour quoi et pour qui vous l’avez transmis.",
      },
      {
        q: "Puis-je protéger le PDF par un mot de passe ?",
        a: "Oui : cochez « Verrouiller avec un mot de passe ». Le PDF est alors protégé par un chiffrement fort (AES-256), celui qu’utilisent les banques, avec un mot de passe facile à lire de 12 mots, créé pour vous et affiché après le téléchargement. Envoyez-le par un autre moyen que le fichier, par SMS par exemple.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "masquer-information-pdf",
    topic: "redact",
    title: "Masquer un numéro, un IBAN ou une photo dans un PDF",
    metaTitle: "Masquer une information dans un PDF ou une image",
    description:
      "Masquer une information dans un PDF ou une photo : IBAN, numéro, visage. Pourquoi un rectangle noir ne suffit pas, et comment la retirer vraiment.",
    intro:
      "Vous voulez cacher un numéro de sécurité sociale, un IBAN ou une photo avant d’envoyer un document ? Attention : poser un rectangle noir dans un éditeur de PDF ne suffit pas toujours. Voici comment masquer pour de bon.",
    example: "Justificatif – Mutuelle Bernard – 12/10/2026",
    body: [
      { type: "h2", text: "Le piège du rectangle noir" },
      {
        type: "p",
        text: "Beaucoup de gens ouvrent leur PDF, dessinent un rectangle noir sur le numéro à cacher, et enregistrent. À l’écran, tout semble parfait. Pourtant, dans bien des cas, le texte est toujours là, simplement recouvert. Il suffit de le sélectionner et de le copier-coller, ou de supprimer le rectangle, pour le voir réapparaître.",
      },
      {
        type: "warning",
        text: "Un test simple : dans votre PDF « masqué », essayez de sélectionner le texte sous le rectangle noir et de le coller dans un message. Si le numéro apparaît, il n’a jamais été retiré.",
      },
      {
        type: "p",
        text: "Masquer vraiment, on dit aussi « caviarder », c’est faire disparaître l’information du fichier lui-même, pas seulement la cacher sous une forme.",
      },
      { type: "h2", text: "Ce qu’on masque le plus souvent" },
      {
        type: "list",
        items: [
          "Le numéro de sécurité sociale sur une fiche de paie ou une attestation.",
          "Un IBAN sur un relevé, quand le destinataire n’en a pas besoin.",
          "La photo ou le numéro d’une pièce d’identité, quand seul le nom compte.",
          "Les opérations d’un relevé de compte qui ne regardent personne.",
          "Les informations d’une autre personne : conjoint, enfant, colocataire.",
        ],
      },
      { type: "h2", text: "Masquer avec Cachety" },
      {
        type: "steps",
        items: [
          "Ouvrez cachety.com dans votre navigateur.",
          "Déposez votre PDF ou votre photo (JPG, PNG, HEIC d’iPhone…).",
          "Sous l’aperçu, cliquez sur « Masquer quelque chose » et dessinez un rectangle par-dessus chaque zone à cacher : numéro, IBAN, photo. Vous pouvez en tracer plusieurs, les déplacer, les redimensionner ou les retirer, puis cliquez sur « Terminé ».",
          "Ajoutez un filigrane : indiquez à quoi sert la copie, par exemple « Justificatif », puis qui va la recevoir, par exemple « Mutuelle Bernard ». La date est ajoutée automatiquement.",
          "Vérifiez l’aperçu, puis téléchargez le document.",
        ],
      },
      {
        type: "p",
        text: "Ici, la zone masquée est réellement retirée du fichier. Chaque page est transformée en image, avec le masque et le filigrane fondus dedans : il n’y a plus de texte caché à sélectionner sous le noir. Les données invisibles du fichier d’origine, comme l’auteur ou la position GPS d’une photo, sont elles aussi effacées.",
      },
      {
        type: "tip",
        text: "Avant d’envoyer, refaites le test du copier-coller sur le fichier téléchargé. Vous verrez qu’il n’y a plus rien à sélectionner : c’est bon signe.",
      },
      { type: "h2", text: "Et vos fichiers dans tout ça ?" },
      {
        type: "p",
        text: "Ils restent sur votre appareil. Cachety fonctionne dans votre navigateur, sans jamais envoyer vos documents sur internet : il n’y a aucun serveur pour les recevoir. Une fois la page ouverte, vous pouvez même couper la connexion. C’est gratuit, sans compte et sans pistage.",
      },
      {
        type: "p",
        text: "Une précision honnête : ce que vous masquez disparaît bien du fichier, mais le filigrane, lui, est une protection dissuasive. Il rend une copie difficile à réutiliser et facile à tracer, sans pouvoir empêcher qu’on la photographie.",
      },
    ],
    faq: [
      {
        q: "Pourquoi mon rectangle noir dans un éditeur PDF ne suffit-il pas ?",
        a: "Parce que beaucoup d’éditeurs ajoutent simplement une forme par-dessus le texte. Le texte reste dans le fichier et peut être copié ou révélé. Il faut un outil qui retire réellement l’information.",
      },
      {
        q: "Peut-on masquer une partie d’une photo prise au téléphone ?",
        a: "Oui. Déposez la photo, même au format HEIC de l’iPhone, et dessinez un rectangle sur la zone à cacher. La position GPS de la photo est aussi retirée.",
      },
      {
        q: "Le texte du PDF reste-t-il sélectionnable après ?",
        a: "Non. Le document téléchargé ne contient plus de texte sélectionnable, ce qui garantit que rien ne se cache sous les zones noires.",
      },
      {
        q: "Faut-il un logiciel payant pour caviarder un PDF ?",
        a: "Non. Cachety est gratuit, sans compte et sans pistage. Il fonctionne dans votre navigateur, sur ordinateur comme sur téléphone, sans rien installer.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "filigrane-sur-telephone",
    topic: "phone",
    title: "Mettre un filigrane depuis son téléphone (iPhone et Android)",
    metaTitle: "Filigrane sur téléphone : iPhone et Android",
    description:
      "Ajoutez un filigrane sur vos papiers depuis votre téléphone, iPhone ou Android, photos HEIC comprises. Gratuit, sans application à télécharger.",
    intro:
      "Pas besoin d’ordinateur pour protéger vos papiers. Depuis votre iPhone ou votre téléphone Android, vous pouvez filigraner une photo de carte d’identité ou un PDF en quelques gestes.",
    example: "Inscription club de sport – Club Leroy – 12/10/2026",
    body: [
      { type: "h2", text: "Tout se fait dans le navigateur" },
      {
        type: "p",
        text: "Cachety s’ouvre dans Safari, Chrome ou tout autre navigateur. Il n’y a rien à télécharger depuis une boutique d’applications, aucun compte à créer. Et comme sur ordinateur, vos photos ne quittent jamais votre téléphone : elles sont traitées sur l’appareil, jamais envoyées sur internet.",
      },
      { type: "h2", text: "Pas à pas sur votre téléphone" },
      {
        type: "steps",
        items: [
          "Ouvrez cachety.com dans votre navigateur.",
          "Touchez la zone de dépôt et choisissez vos fichiers : une photo de votre galerie ou un PDF enregistré sur le téléphone.",
          "Indiquez à quoi sert la copie (tapez-le, par exemple « Inscription club de sport », ou choisissez un exemple), puis qui va la recevoir, par exemple « Club Leroy ». La date est ajoutée automatiquement.",
          "Vérifiez l’aperçu en zoomant si besoin.",
          "Téléchargez le résultat, puis envoyez-le par mail ou par messagerie.",
        ],
      },
      { type: "h2", text: "Sur iPhone : les photos HEIC passent sans souci" },
      {
        type: "p",
        text: "Les iPhone enregistrent souvent les photos au format HEIC, que beaucoup de sites refusent. Cachety les accepte directement : pas besoin de les convertir avant. Le fichier téléchargé est dans un format que tout le monde peut ouvrir.",
      },
      {
        type: "tip",
        text: "Ajoutez Cachety à votre écran d’accueil pour l’avoir sous la main comme une application. Sur iPhone, dans Safari, touchez le bouton de partage puis « Sur l’écran d’accueil ». Sur Android, dans Chrome, ouvrez le menu puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».",
      },
      { type: "h2", text: "Sur Android : filigraner depuis « Partager »" },
      {
        type: "p",
        text: "Une fois Cachety installé sur un téléphone Android, il apparaît dans le menu « Partager ». Depuis votre galerie ou un PDF reçu par mail, touchez « Partager », choisissez Cachety, et le fichier s’ouvre directement, prêt à être filigrané.",
      },
      { type: "h2", text: "Même en mode avion" },
      {
        type: "p",
        text: "Une fois la page chargée, Cachety continue de fonctionner sans réseau. Vous pouvez passer en mode avion avant de déposer vos papiers : c’est la meilleure preuve que rien n’est envoyé nulle part. Les données cachées des photos, comme la position GPS enregistrée par le téléphone, sont aussi retirées de la copie.",
      },
      {
        type: "p",
        text: "Pour rester honnête : le filigrane décourage les abus et permet de retrouver l’origine d’une fuite, mais il ne peut pas empêcher quelqu’un de photographier votre document. C’est une précaution simple et efficace, pas une garantie absolue.",
      },
    ],
    faq: [
      {
        q: "Faut-il installer une application ?",
        a: "Non. Cachety fonctionne dans le navigateur. Vous pouvez l’ajouter à l’écran d’accueil si vous voulez y accéder plus vite, mais ce n’est pas obligatoire.",
      },
      {
        q: "Mes photos sont-elles envoyées sur internet ?",
        a: "Non. Elles sont traitées sur votre téléphone, dans le navigateur. Essayez en mode avion : tout fonctionne.",
      },
      {
        q: "Cachety lit-il les photos HEIC de l’iPhone ?",
        a: "Oui, directement, sans conversion préalable.",
      },
      {
        q: "Puis-je filigraner plusieurs photos à la fois ?",
        a: "Oui. Sélectionnez-en plusieurs : le même filigrane est appliqué à toutes. Avant de télécharger, choisissez « Un seul PDF » pour les réunir, ou « Fichiers séparés (ZIP) ».",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "usurpation-identite-copie-papiers",
    topic: "identity-theft",
    title: "Usurpation d’identité : protéger les copies de vos papiers",
    metaTitle: "Usurpation d’identité : protéger ses copies de papiers",
    description:
      "Usurpation d’identité : comment protéger les copies de vos papiers avec un filigrane, et que faire si l’une d’elles a fuité. Conseils simples.",
    intro:
      "Une copie de pièce d’identité envoyée un peu vite peut suffire à un escroc. Voici comment limiter les risques au quotidien, et comment réagir si une copie de vos papiers circule sans votre accord.",
    example: "Candidature – Société Garnier – 12/10/2026",
    body: [
      { type: "h2", text: "Comment les copies servent aux escrocs" },
      {
        type: "p",
        text: "Avec une copie de carte d’identité, une fiche de paie et un justificatif de domicile, un fraudeur peut ouvrir un compte, demander un crédit, souscrire un forfait téléphonique ou louer un logement à votre nom. Ces copies sont récupérées par de fausses annonces, de faux recruteurs, des messages piégés, ou dans des boîtes mail piratées.",
      },
      { type: "h2", text: "Les bons réflexes avant d’envoyer vos papiers" },
      {
        type: "list",
        items: [
          "Vérifiez à qui vous envoyez : une vraie agence, un vrai employeur, un organisme que vous connaissez.",
          "N’envoyez que ce qui est demandé, et masquez ce qui ne sert pas, comme le numéro de sécurité sociale.",
          "Ajoutez toujours un filigrane : motif, destinataire, date.",
          "Faites une copie différente pour chaque destinataire, pour savoir d’où viendrait une fuite.",
        ],
      },
      {
        type: "p",
        text: "Cybermalveillance.gouv.fr, le dispositif public d’assistance aux victimes, recommande justement d’ajouter un filigrane sur les copies de ses documents d’identité. C’est simple et cela rend une copie bien moins utile à un fraudeur.",
      },
      { type: "h2", text: "Protéger vos copies avec Cachety" },
      {
        type: "steps",
        items: [
          "Ouvrez cachety.com.",
          "Déposez vos documents : carte d’identité, passeport, justificatifs, en PDF ou en photo.",
          "Indiquez à quoi sert la copie, par exemple « Candidature », puis qui va la recevoir, par exemple « Société Garnier ». La date est ajoutée automatiquement.",
          "Cliquez sur « Modifier le texte » et insérez {code}, par exemple « réf. {code} » : chaque copie reçoit son propre code court. Après le téléchargement, « Enregistrer la liste » vous donne le registre de vos envois. Ce registre reste chez vous, il n’est enregistré nulle part.",
          "Vérifiez l’aperçu, puis téléchargez et envoyez.",
        ],
      },
      {
        type: "tip",
        text: "Vos fichiers ne sont jamais envoyés sur internet : Cachety travaille directement sur votre appareil, et fonctionne même en mode avion une fois la page ouverte. Vous ne confiez vos papiers à personne de plus.",
      },
      { type: "h2", text: "Une copie a fuité : que faire ?" },
      {
        type: "steps",
        items: [
          "Gardez des preuves : captures d’écran, messages, courriers reçus pour des contrats que vous n’avez pas signés.",
          "Regardez le filigrane ou la référence de la copie retrouvée : vous saurez à qui vous l’aviez envoyée.",
          "Prévenez votre banque au plus vite si des opérations ou un crédit vous semblent suspects.",
          "Portez plainte au commissariat ou à la gendarmerie, avec vos preuves.",
          "Contactez les organismes concernés (opérateur, organisme de crédit) pour contester ce qui a été fait en votre nom.",
          "Si votre pièce d’identité a été perdue ou volée, déclarez-le et faites-la refaire.",
        ],
      },
      {
        type: "warning",
        text: "Si l’on vous appelle de la part de votre banque pour « sécuriser » votre compte, raccrochez et rappelez vous-même le numéro habituel. Les escrocs profitent souvent d’une première fuite pour en provoquer une seconde.",
      },
      {
        type: "p",
        text: "Pour finir, un mot de franchise : un filigrane ne peut pas empêcher toute fraude, et quelqu’un peut toujours photographier un document. Mais il décourage la plupart des tentatives et vous aide à remonter la piste si une copie circule. Pour vous faire accompagner, Cybermalveillance.gouv.fr propose aussi des conseils aux victimes.",
      },
    ],
    faq: [
      {
        q: "Un filigrane suffit-il à empêcher une usurpation d’identité ?",
        a: "Non, aucune mesure n’est infaillible. Le filigrane rend une copie beaucoup moins réutilisable et permet de savoir d’où vient une fuite. Associé à un peu de vigilance, il réduit nettement les risques.",
      },
      {
        q: "Comment savoir qui a laissé fuiter ma copie ?",
        a: "Si chaque copie porte le nom du destinataire, ou son propre code inséré avec « Modifier le texte », il suffit de lire le filigrane de la copie retrouvée et de la comparer à votre registre des envois.",
      },
      {
        q: "Où porter plainte pour usurpation d’identité ?",
        a: "Au commissariat de police ou à la brigade de gendarmerie. Apportez toutes vos preuves. Prévenez aussi votre banque si vos comptes sont concernés.",
      },
      {
        q: "Mes papiers sont-ils envoyés à Cachety ?",
        a: "Non. Le traitement se fait sur votre appareil, dans le navigateur. Aucun serveur ne reçoit vos fichiers.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  // Guides de signature (outil Signer, /fr/sign). Les passages juridiques
  // reprennent la page Signer (docs/prd-sign.md, sections 10.6 et 10.7).
  {
    slug: "signer-bail-document-location",
    topic: "sign",
    tool: "sign",
    title: "Signer un bail ou un document de location en ligne, sans l’envoyer nulle part",
    metaTitle: "Signer un bail ou un état des lieux en ligne, gratuitement",
    description:
      "Signez un bail, un état des lieux ou une pièce du dossier de location dans votre navigateur : signature dessinée ou tapée, rien n’est envoyé. Gratuit.",
    intro:
      "L’agence ou le propriétaire vous envoie le bail en PDF et vous demande de le renvoyer signé. Pas besoin d’imprimer, de scanner ni de créer un compte : vous pouvez le signer dans votre navigateur en une minute, et le document ne quitte jamais votre appareil.",
    example: "Bail signé – réservé à l’Agence Martin – 17/10/2026",
    body: [
      { type: "h2", text: "Les papiers à signer pour une location" },
      {
        type: "p",
        text: "Louer un logement, c’est signer plusieurs documents : le bail lui-même, l’état des lieux d’entrée, parfois une attestation ou une pièce du dossier de location. Ils arrivent le plus souvent en PDF, avec une ligne « Signature ». D’habitude, on a le choix entre une plateforme de signature qui demande d’envoyer le fichier et d’ouvrir un compte, ou imprimer, signer, scanner et renvoyer. Avec Cachety, tout se fait dans le navigateur.",
      },
      { type: "h2", text: "Signer vos documents de location avec Cachety" },
      {
        type: "steps",
        items: [
          "Ouvrez cachety.com/fr/sign dans votre navigateur, sur ordinateur ou sur téléphone. Rien à installer, aucun compte à créer.",
          "Vos documents : déposez le PDF sur la page, ou touchez la zone pour le choisir. Vous pouvez en mettre plusieurs à la fois, par exemple le bail et l’état des lieux. Une photo d’un document papier marche aussi : elle devient un PDF d’une page.",
          "Votre signature : dessinez-la avec le doigt, un stylet ou la souris, tapez votre nom, ou importez une photo de votre signature sur papier blanc. Sous « Sous la signature (facultatif) », gardez la date du jour et ajoutez si besoin le lieu et une mention comme « Lu et approuvé ».",
          "Placez, vérifiez, téléchargez : votre signature apparaît en bas à droite de la dernière page. Faites-la glisser sur la ligne prévue et utilisez le coin pour la redimensionner. Cochez « Parapher aussi chaque page » si l’agence demande un paraphe sur chaque page.",
          "Vérifiez l’aperçu, puis téléchargez. La copie signée garde le nom d’origine, suivi de -signed. C’est cette copie que vous renvoyez à l’agence.",
        ],
      },
      {
        type: "p",
        text: "Avec plusieurs documents, chacun a son propre emplacement. Un document n’est prêt qu’une fois la signature posée dessus : la liste vous indique ceux qui l’attendent encore.",
      },
      {
        type: "tip",
        text: "Après le téléchargement, Cachety affiche l’empreinte de chaque fichier : un code court calculé à partir du fichier exact que vous avez envoyé. Copiez-la et gardez-la avec vos papiers. Si une autre version du bail réapparaît un jour, vous pourrez montrer que ce n’est pas celle que vous avez signée.",
      },
      { type: "h2", text: "Les options utiles" },
      {
        type: "list",
        items: [
          "« Parapher aussi chaque page » pose une petite copie de votre signature en bas à droite de chacune des autres pages : une page remplacée se voit plus facilement.",
          "« Verrouiller avec un mot de passe » est désactivé par défaut, car l’agence doit pouvoir ouvrir le fichier. Ne l’activez que si vous lui donnez le mot de passe par un autre moyen, par exemple au téléphone.",
          "« Réduire la taille » sert quand la messagerie ou le portail de l’agence limite le poids des fichiers.",
          "« Ajouter aussi un filigrane » inscrit l’usage, le destinataire et la date sur la copie signée.",
        ],
      },
      { type: "h2", text: "Vos documents ne quittent pas votre appareil" },
      {
        type: "p",
        text: "Cachety fonctionne dans votre navigateur. Il n’existe aucun serveur qui recevrait vos documents, et la page a techniquement interdiction de contacter un autre site. Vérifiez-le vous-même : une fois la page chargée, passez en mode avion, puis signez votre document. Tout continue de fonctionner. Votre signature n’est pas enregistrée non plus : elle n’existe que dans la mémoire de l’onglet et disparaît quand vous le fermez.",
      },
      {
        type: "p",
        text: "Chaque page de la copie signée est reconstruite à partir de ses pixels. Cela retire le texte caché et les métadonnées, et le texte n’est plus sélectionnable dans la copie signée. Votre original reste chez vous, intact.",
      },
      { type: "h2", text: "Quelle valeur a cette signature pour un bail ?" },
      {
        type: "p",
        text: "Une signature dessinée ou tapée puis posée sur le document est une signature électronique dite « simple ». En Europe, une signature ne peut pas être refusée seulement parce qu’elle est électronique (règlement eIDAS, article 25). En France, une signature vaut si elle identifie son auteur et montre qu’il consent à l’acte (Code civil, article 1367). Pour un bail d’habitation, un état des lieux ou une pièce du dossier de location, cela suffit en général.",
      },
      {
        type: "p",
        text: "En cas de litige, c’est à vous de montrer que vous êtes bien l’auteur de la signature. Une signature « qualifiée », avec un certificat délivré par un prestataire agréé, bénéficie d’une présomption de fiabilité que la signature simple n’a pas.",
      },
      {
        type: "warning",
        text: "Ce n’est pas le bon outil quand une signature qualifiée est exigée, ou quand l’autre partie impose une plateforme précise : certains contrats de prêt ou d’assurance, les actes notariés, certaines démarches administratives. Dans ce cas, utilisez l’outil demandé. Ceci n’est pas un conseil juridique.",
      },
      { type: "h2", text: "Peut-on réutiliser ma signature ?" },
      {
        type: "p",
        text: "Votre signature fait partie de l’image de chaque page : on ne peut pas la déplacer ou la supprimer en modifiant le PDF. Mais, comme pour une signature sur papier scanné, quelqu’un pourrait la découper et la coller ailleurs. Aucune image de signature ne peut l’empêcher. Pour limiter ce risque, ajoutez un filigrane qui lie la copie à son usage et à son destinataire, et paraphez chaque page.",
      },
    ],
    faq: [
      {
        q: "Une agence accepte-t-elle un bail signé de cette façon ?",
        a: "Dans la plupart des cas, oui : renvoyer un PDF signé par mail est courant pour les documents de location. Si l’agence utilise sa propre plateforme de signature et y tient, utilisez la sienne.",
      },
      {
        q: "Faut-il imprimer quelque chose ?",
        a: "Non. Vous signez à l’écran et vous renvoyez le PDF signé. Si vous n’avez qu’un exemplaire papier, prenez-le en photo, bien éclairé, et signez la photo.",
      },
      {
        q: "Ma signature est-elle enregistrée ?",
        a: "Non. Elle n’existe que dans la mémoire de l’onglet. Fermez-le et elle disparaît. La prochaine fois, vous la dessinez ou la tapez à nouveau.",
      },
      {
        q: "Peut-on encore copier le texte du PDF signé ?",
        a: "Non. Chaque page est reconstruite à partir de ses pixels, ce qui retire aussi le texte caché et les métadonnées. Gardez votre original si vous avez besoin du texte.",
      },
      {
        q: "Cachety est-il vraiment gratuit ?",
        a: "Oui. C’est gratuit, sans compte et sans pistage. C’est un logiciel libre fabriqué en France par Amir Moradi.",
      },
    ],
    updated: "2026-10-17",
  },

  // ------------------------------------------------------------------
  {
    slug: "signer-pdf-sur-telephone",
    topic: "sign-phone",
    tool: "sign",
    title: "Signer un PDF sur son téléphone (iPhone et Android)",
    metaTitle: "Signer un PDF sur téléphone : iPhone et Android, gratuit",
    description:
      "Signez un PDF avec le doigt sur votre iPhone ou votre téléphone Android. Sans application, sans compte, et le document n’est jamais envoyé. Gratuit.",
    intro:
      "On vous a envoyé un PDF à signer et à renvoyer, et vous n’avez pas d’ordinateur sous la main. Vous pouvez le signer avec le doigt, directement dans le navigateur de votre téléphone, en une minute.",
    example: "Autorisation parentale signée – pour l’école Jules-Ferry – 17/10/2026",
    body: [
      { type: "h2", text: "Sans application, sans compte, sans envoi" },
      {
        type: "p",
        text: "Cachety s’ouvre dans le navigateur de votre téléphone, Safari, Chrome ou un autre. Rien à télécharger depuis une boutique d’applications, aucun compte à créer. Le document est traité sur le téléphone lui-même, jamais envoyé : la page a techniquement interdiction de contacter un autre site.",
      },
      { type: "h2", text: "Pas à pas sur votre téléphone" },
      {
        type: "steps",
        items: [
          "Enregistrez sur votre téléphone le PDF reçu. Dans la plupart des applications de mail, touchez la pièce jointe, puis enregistrez-la dans Fichiers sur iPhone ou dans Téléchargements sur Android.",
          "Ouvrez cachety.com/fr/sign dans votre navigateur, touchez la zone de dépôt et choisissez le PDF. Une photo d’un document papier marche aussi.",
          "Dessinez votre signature dans le cadre avec le doigt. La signature ne vous plaît pas ? Touchez « Annuler le dernier trait » ou « Effacer », et recommencez. Vous pouvez aussi taper votre nom, ou importer une photo de votre signature.",
          "Choisissez ce qui s’affiche sous la signature, si vous le souhaitez. La date du jour est cochée par défaut, et vous pouvez ajouter le lieu et une mention comme « Lu et approuvé ».",
          "Passez à « Placez, vérifiez, téléchargez ». Votre signature apparaît en bas à droite de la dernière page. Faites-la glisser avec le doigt et utilisez le coin pour la redimensionner.",
          "Vérifiez l’aperçu, téléchargez le PDF signé, puis renvoyez-le par mail ou par messagerie.",
        ],
      },
      {
        type: "tip",
        text: "Signez un peu plus grand que sur papier, sans vous presser. L’espace vide autour de la signature est retiré automatiquement : elle reste nette une fois posée sur la page.",
      },
      { type: "h2", text: "Vous préférez une photo de votre signature ?" },
      {
        type: "p",
        text: "Si signer avec le doigt vous gêne, signez une feuille blanche avec un stylo foncé, prenez-la en photo à la lumière du jour, et choisissez « Importer ». Le fond blanc est retiré pour vous. S’il reste un peu de papier visible, déplacez le curseur « Sensibilité ». Les photos HEIC de l’iPhone passent aussi.",
      },
      { type: "h2", text: "Vérifiez que tout reste sur votre téléphone" },
      {
        type: "p",
        text: "Une fois la page chargée, passez en mode avion, puis choisissez votre PDF et signez-le. Tout continue de fonctionner : c’est la preuve que rien n’est envoyé nulle part. Votre signature n’est pas enregistrée : fermez l’onglet et elle disparaît.",
      },
      { type: "h2", text: "Les options avant de télécharger" },
      {
        type: "list",
        items: [
          "« Parapher aussi chaque page » ajoute une petite copie de votre signature sur les autres pages.",
          "« Réduire la taille » garde le fichier sous le poids accepté par une messagerie ou un site.",
          "« Verrouiller avec un mot de passe » est désactivé par défaut, pour que le destinataire puisse ouvrir le fichier tout de suite.",
          "Après le téléchargement, l’empreinte du fichier s’affiche. Gardez-la : si une autre version réapparaît un jour, vous pourrez montrer que ce n’est pas celle que vous avez signée.",
        ],
      },
      { type: "h2", text: "Quelle valeur a cette signature ?" },
      {
        type: "p",
        text: "Une signature dessinée sur votre téléphone puis posée sur le document est une signature électronique dite « simple ». Elle suffit en général pour les documents de tous les jours : autorisation parentale, formulaire d’école ou d’association, attestation, devis, dossier de location. En cas de litige, c’est à vous de montrer que vous êtes bien l’auteur.",
      },
      {
        type: "warning",
        text: "Ce n’est pas le bon outil quand une signature qualifiée, avec certificat, est exigée, ou quand l’autre partie impose sa propre plateforme : certains contrats de prêt ou d’assurance, les actes notariés, certaines démarches administratives. Et comme pour une signature sur papier scanné, quelqu’un pourrait découper votre signature sur la copie et la réutiliser. Un filigrane avec l’usage et le destinataire, et un paraphe sur chaque page, limitent ce risque. Ceci n’est pas un conseil juridique.",
      },
    ],
    faq: [
      {
        q: "Faut-il installer une application ?",
        a: "Non. Cachety fonctionne dans le navigateur. Vous pouvez l’ajouter à l’écran d’accueil pour y accéder plus vite, mais ce n’est pas obligatoire.",
      },
      {
        q: "Puis-je signer avec un stylet ?",
        a: "Oui. Le cadre de signature fonctionne avec le doigt, un stylet ou, sur ordinateur, la souris.",
      },
      {
        q: "Le PDF est-il envoyé quelque part ?",
        a: "Non. Tout se passe sur votre téléphone. Passez en mode avion une fois la page chargée : tout fonctionne.",
      },
      {
        q: "Pourquoi le texte du PDF signé n’est-il plus sélectionnable ?",
        a: "Chaque page est reconstruite à partir de ses pixels : la signature ne peut pas être détachée, et les données cachées sont retirées. Votre original reste sur votre téléphone, intact.",
      },
    ],
    updated: "2026-10-17",
  },
];
