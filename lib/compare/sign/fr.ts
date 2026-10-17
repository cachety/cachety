import type { Comparison } from "../types";

// Comparatifs de l'outil de signature (fr). Même règle éditoriale que les
// comparatifs du filigrane (lib/compare/types.ts) ; chaque entrée porte tool: "sign".
// Écrits pour un public en France. Texte brut uniquement. Chaque affirmation sur
// un autre outil s'appuie sur les pages listées dans `sources`, lues à la date
// `checked`. Aucun prix : ils changent trop souvent.

const CHECKED = "2026-10-17";
const UPDATED = "2026-10-17";

// Formulations communes pour la colonne Cachety.
const CACHETY = {
  where: "Sur votre appareil, dans le navigateur. Rien n’est envoyé sur internet.",
  account: "Aucun compte, aucune inscription.",
  free: "Gratuit, sans formule payante.",
  level: "Ce qu’on appelle couramment une signature électronique « simple » : une image de votre signature posée sur la page.",
  audit: "Aucun : ni certificat, ni dossier de preuve, ni horodatage.",
  send: "Non. Un seul signataire : vous. Vous envoyez vous-même le fichier signé.",
  identity: "Aucune.",
  retention: "Rien n’est conservé. Votre signature n’existe que dans la mémoire de l’onglet.",
  trackers: "Ni publicité ni pisteur.",
  mobile: "Marche dans le navigateur du téléphone, rien à installer.",
  styles: "Dessinée, tapée ou importée en photo. Date, lieu et mention dessous, paraphe sur chaque page : tout est facultatif.",
  output:
    "Un PDF aplati : les pages sont reconstruites à partir de leurs pixels, texte caché, métadonnées et pièces jointes sont retirés. Une empreinte SHA-256 s’affiche après le téléchargement.",
};

const LEGAL: Comparison["body"][number] = {
  type: "p",
  text: "Une signature dessinée, tapée ou importée puis posée sur la page est ce qu’on appelle couramment une signature électronique « simple ». En Europe, un juge ne peut pas l’écarter comme preuve au seul motif qu’elle est électronique. Mais en France, la Cour de cassation (2022 et 2024) a jugé qu’une image de signature, comme une signature scannée, ne remplit pas seule les conditions de l’article 1367 du Code civil : elle vaut signature si personne ne la conteste, mais pèse peu si elle l’est. Seule une signature qualifiée est présumée fiable. Ceci n’est pas un conseil juridique.",
};

const NOT_FOR: Comparison["body"][number] = {
  type: "warning",
  text: "Cachety n’est pas le bon outil quand une signature avancée ou qualifiée est exigée, quand il faut un dossier de preuve ou plusieurs signataires, quand la loi demande une mention écrite de votre main (caution, reconnaissance de dette), pour un testament ou un acte devant notaire, ou quand l’autre partie impose sa plateforme. Dans ce cas, utilisez l’outil demandé.",
};

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "Signer un document avec Cachety" },
  {
    type: "steps",
    items: [
      "Ouvrez cachety.com/fr/sign dans votre navigateur, sur ordinateur ou sur téléphone. Rien à installer, aucun compte à créer.",
      "Déposez votre PDF, ou la photo d’un document papier (JPG, PNG ou HEIC). Une photo devient une page au format A4. Vous pouvez mettre plusieurs documents à la fois.",
      "Dessinez votre signature avec le doigt ou la souris, tapez votre nom, ou importez une photo de votre signature sur papier blanc. Ajoutez dessous la date, le lieu ou une mention si besoin.",
      "Faites glisser la signature sur la ligne prévue et redimensionnez-la. Cochez « Parapher aussi chaque page » si on vous le demande.",
      "Vérifiez l’aperçu, puis téléchargez le PDF signé. Gardez l’empreinte affichée après le téléchargement avec vos papiers.",
    ],
  },
];

const FAQ_VALID = (other?: string) => ({
  q: "Une signature faite avec Cachety est-elle valable ?",
  a: `C’est ce qu’on appelle couramment une signature électronique « simple » : une image de votre signature sur la page. Elle vaut signature si personne ne la conteste, et elle est en général acceptée pour les documents du quotidien. Si elle est contestée, elle pèse peu à elle seule (Cour de cassation, 2022 et 2024). Pour un contrat important, ou si l’autre partie le demande, passez par un service qui propose la signature avancée ou qualifiée${other ? `, comme ${other}` : ""}. Ceci n’est pas un conseil juridique.`,
});

export const SIGN_COMPARISONS_FR: Comparison[] = [
  // ------------------------------------------------------------------
  {
    tool: "sign",
    slug: "cachety-vs-docusign",
    competitor: "docusign",
    competitorName: "DocuSign",
    competitorUrl: "https://www.docusign.com/",
    title: "Cachety ou DocuSign : quel outil pour signer un document ?",
    metaTitle: "Alternative à DocuSign pour signer soi-même un PDF",
    description:
      "DocuSign envoie des contrats à signer, avec un journal d’audit. Cachety vous fait signer un PDF vous-même, dans le navigateur, gratuitement et sans compte.",
    intro:
      "DocuSign est la plateforme de signature électronique la plus connue. Elle sert à envoyer un document à d’autres personnes pour signature et à garder la trace de qui a signé, et quand. Cachety fait un travail plus modeste : signer vous-même un document, dans votre navigateur, sans l’envoyer en ligne ni créer de compte.",
    verdict:
      "Ces deux outils ne font pas le même travail. Pour un contrat à plusieurs signataires, avec journal d’audit, vérification d’identité ou signature avancée ou qualifiée, DocuSign est le meilleur choix, et Cachety ne fait rien de tout cela. S’il s’agit seulement de poser votre signature sur un PDF et de le renvoyer, Cachety le fait gratuitement, sans compte, et le document ne quitte jamais votre appareil.",
    table: [
      {
        criterion: "Où le document est traité",
        cachety: CACHETY.where,
        other: "Dans le cloud de DocuSign. Le document est envoyé et stocké dans l’une de cinq régions de centres de données : États-Unis, Canada, Europe, Australie ou Japon.",
        edge: "cachety",
      },
      {
        criterion: "Compte et usage gratuit",
        cachety: "Gratuit, sans compte et sans formule payante.",
        other: "L’expéditeur doit avoir un compte : essai gratuit de 30 jours, puis formule payante. Les personnes à qui vous envoyez un document signent gratuitement, sans compte.",
        edge: "cachety",
      },
      {
        criterion: "Niveau de signature",
        cachety: CACHETY.level,
        other: "Signatures électroniques scellées par un certificat numérique. Signature avancée proposée, et signature qualifiée en option : DocuSign est prestataire de services de confiance qualifié en Europe.",
        edge: "other",
      },
      {
        criterion: "Journal d’audit et certificat",
        cachety: CACHETY.audit,
        other: "Un certificat d’achèvement et un journal d’audit pour chaque document signé, sur toutes les formules.",
        edge: "other",
      },
      {
        criterion: "Envoi à d’autres signataires",
        cachety: CACHETY.send,
        other: "Oui, dans un ordre successif, parallèle ou mixte, avec relances automatiques, modèles et envoi en masse.",
        edge: "other",
      },
      {
        criterion: "Vérification d’identité",
        cachety: CACHETY.identity,
        other: "Code à usage unique par SMS, vérification par téléphone ou contrôle d’une pièce d’identité.",
        edge: "other",
      },
      {
        criterion: "Durée de conservation",
        cachety: CACHETY.retention,
        other: "Fixée par le client, qui peut supprimer ses documents à tout moment.",
      },
      {
        criterion: "Style de signature et applis",
        cachety: CACHETY.styles + " " + CACHETY.mobile,
        other: "Style généré à partir de votre nom, signature dessinée ou image importée. Applis iOS et Android.",
      },
      {
        criterion: "Ce que vous obtenez",
        cachety: CACHETY.output,
        other: "Un document scellé numériquement par infrastructure à clé publique (PKI), avec son certificat d’achèvement.",
      },
    ],
    body: [
      { type: "h2", text: "Deux outils pour deux usages" },
      {
        type: "p",
        text: "DocuSign eSignature est une plateforme d’envoi. Vous déposez un contrat, vous ajoutez des champs (signature, paraphe, cases à cocher, listes déroulantes), vous choisissez qui signe et dans quel ordre, puis DocuSign écrit à chacun, relance et recueille les signatures. À la fin, le document est scellé numériquement et accompagné d’un certificat d’achèvement qui retrace le parcours. DocuSign propose la signature en 44 langues et plus de 1 100 intégrations.",
      },
      {
        type: "p",
        text: "Cachety n’envoie rien à personne. Il sert au moment où l’on vous a envoyé un PDF par mail en vous demandant de le renvoyer signé. Vous ouvrez la page, vous signez, vous téléchargez la copie signée et vous répondez au mail. Pas de compte, pas d’enveloppe, aucune trace conservée nulle part.",
      },
      { type: "h2", text: "Là où DocuSign fait mieux" },
      {
        type: "list",
        items: [
          "Plusieurs signataires, dans un ordre choisi, avec relances et suivi.",
          "Un certificat d’achèvement et un journal d’audit qui montrent qui a signé, et quand.",
          "Des vérifications d’identité, comme un code par SMS ou une pièce d’identité.",
          "Les signatures avancées et qualifiées, qui pèsent bien plus lourd en cas de contestation.",
          "Modèles, envoi en masse, API et intégrations avec les logiciels de l’entreprise.",
        ],
      },
      { type: "h2", text: "Là où Cachety fait mieux" },
      {
        type: "list",
        items: [
          "Votre document n’est jamais envoyé en ligne. La signature se fait dans le navigateur, et tout marche en mode avion une fois la page chargée.",
          "Ni compte ni essai : c’est gratuit et open source, sans publicité ni pisteur.",
          "Le PDF signé est aplati, et texte caché, métadonnées et pièces jointes sont retirés : vous n’envoyez pas plus que prévu.",
          "La photo d’un document papier marche aussi. Vous pouvez signer plusieurs documents d’un coup.",
        ],
      },
      { type: "h2", text: "Ce que vaut une signature Cachety" },
      LEGAL,
      NOT_FOR,
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous devez envoyer un contrat à une ou plusieurs personnes et suivre qui a signé.",
      "Il vous faut un journal d’audit, une vérification d’identité, ou une signature avancée ou qualifiée.",
      "On vous a envoyé un document par DocuSign : signez-le là-bas, c’est gratuit et sans compte.",
      "Votre entreprise veut des modèles, l’envoi en masse ou des intégrations avec ses autres logiciels.",
    ],
    chooseCachety: [
      "Vous devez seulement signer vous-même un PDF et le renvoyer par mail.",
      "Vous préférez que le document ne quitte jamais votre appareil, sans compte ni période d’essai.",
      "Vous voulez une copie signée débarrassée des données cachées, comme les métadonnées et le texte caché.",
    ],
    faq: [
      FAQ_VALID("DocuSign"),
      {
        q: "Faut-il un compte ?",
        a: "Pas avec Cachety. Avec DocuSign, il faut un compte pour envoyer des documents à signer, mais pas pour signer un document que quelqu’un vous envoie.",
      },
      {
        q: "Puis-je envoyer le document à quelqu’un d’autre pour qu’il le signe ?",
        a: "Pas avec Cachety. Il n’y a qu’un signataire : vous. Vous téléchargez le PDF signé et vous l’envoyez vous-même. L’autre personne peut signer sa copie de la même façon, mais rien ne garde la trace de qui a signé, ni quand. Pour cela, DocuSign est le bon outil.",
      },
      {
        q: "DocuSign garde-t-il mes documents ?",
        a: "Les documents sont stockés dans le cloud de DocuSign, dans l’une de cinq régions, dont l’Europe. Le client décide de leur durée de conservation et peut les supprimer à tout moment. Cachety ne stocke rien : le document ne quitte jamais votre appareil.",
      },
    ],
    sources: [
      {
        label: "DocuSign : ajouter gratuitement une signature électronique à un PDF",
        url: "https://www.docusign.com/learn/add-electronic-signature-pdf-free",
      },
      {
        label: "DocuSign : signer un document en ligne gratuitement",
        url: "https://www.docusign.com/en-gb/esignature/sign-document-online-free",
      },
      { label: "DocuSign eSignature : formules", url: "https://ecom.docusign.com/plans-and-pricing/esignature" },
      {
        label: "DocuSign eSignature : fonctionnalités",
        url: "https://www.docusign.com/en-ca/products/electronic-signature/features",
      },
      { label: "DocuSign eSignature", url: "https://www.docusign.com/products/electronic-signature" },
      {
        label: "DocuSign : personnaliser sa signature",
        url: "https://docusign.com/blog/quick-tip-customizing-your-signature",
      },
      {
        label: "DocuSign : signature électronique qualifiée",
        url: "https://www.docusign.com/en-gb/products/electronic-signature/qualified-electronic-signature",
      },
      {
        label: "DocuSign : signature électronique avancée",
        url: "https://www.docusign.com/en-gb/products/electronic-signature/advanced-electronic-signature",
      },
      { label: "DocuSign : localisation des données", url: "https://www.docusign.com/privacy/data-residency" },
      { label: "DocuSign : gestion des données", url: "https://www.docusign.com/trust/privacy/data-mgmt-privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    tool: "sign",
    slug: "cachety-vs-yousign",
    competitor: "yousign",
    competitorName: "Youtrust (ex-Yousign)",
    competitorUrl: "https://www.youtrust.com/",
    title: "Cachety ou Youtrust (ex-Yousign) : quel outil pour signer un PDF ?",
    metaTitle: "Alternative à Yousign (Youtrust) pour signer un PDF",
    description:
      "Youtrust, ex-Yousign, envoie des documents à signer avec un dossier de preuve. Cachety vous fait signer un PDF vous-même, dans le navigateur, sans compte.",
    intro:
      "Youtrust, qui s’appelait Yousign jusqu’en juillet 2026, est une plateforme française de signature électronique. Elle envoie des documents à signer et garde un dossier de preuve horodaté. Cachety est un outil plus simple : il vous fait signer un PDF vous-même, dans le navigateur, sans compte et sans envoi en ligne.",
    verdict:
      "Pour un contrat à plusieurs signataires, avec dossier de preuve, vérification d’identité ou signature avancée ou qualifiée, Youtrust est le meilleur choix. Sa formule gratuite permet de signer vos propres documents sans limite, une fois le compte créé, et chaque formule comprend un dossier de preuve horodaté. Si vous voulez seulement poser votre signature sur un PDF sans créer de compte ni envoyer le fichier, Cachety s’en charge.",
    table: [
      {
        criterion: "Où le document est traité",
        cachety: CACHETY.where,
        other: "Sur les serveurs de Youtrust, hébergés exclusivement en France.",
        edge: "cachety",
      },
      {
        criterion: "Compte",
        cachety: CACHETY.account,
        other: "Obligatoire, y compris pour la formule gratuite.",
        edge: "cachety",
      },
      {
        criterion: "Usage gratuit",
        cachety: CACHETY.free,
        other: "Une formule gratuite sans publicité : signature de vos propres documents sans limite et deux demandes de signature par mois. Formules payantes : One, Plus et Pro.",
      },
      {
        criterion: "Niveau de signature",
        cachety: CACHETY.level,
        other: "Simple, avancée (avec vérification d’identité) ou qualifiée (avec vérification d’identité par vidéo). Avancée et qualifiée sont des options payantes des formules Plus et Pro.",
        edge: "other",
      },
      {
        criterion: "Dossier de preuve",
        cachety: CACHETY.audit,
        other: "Un dossier de preuve horodaté, archivé 10 ans, sur toutes les formules.",
        edge: "other",
      },
      {
        criterion: "Envoi à d’autres signataires",
        cachety: CACHETY.send,
        other: "Oui, avec ordre des signataires, validations, relances automatiques et modèles.",
        edge: "other",
      },
      {
        criterion: "Vérification d’identité",
        cachety: CACHETY.identity,
        other: "Code à usage unique en option, code d’accès par SMS avec la formule Plus, contrôle d’identité pour les signatures avancée et qualifiée.",
        edge: "other",
      },
      {
        criterion: "Durée de conservation",
        cachety: CACHETY.retention,
        other: "Preuves de signature gardées 10 ans, données d’identité 90 jours, selon sa politique de confidentialité.",
      },
    ],
    body: [
      { type: "h2", text: "Yousign s’appelle désormais Youtrust" },
      {
        type: "p",
        text: "Dans sa propre annonce, l’éditeur indique que Yousign devient Youtrust à partir de juillet 2026. Pendant la transition, l’application peut encore afficher le nom Yousign : elle doit basculer d’ici 2027. L’entreprise est Youtrust SAS, basée à Caen.",
      },
      { type: "h2", text: "Deux outils pour deux usages" },
      {
        type: "p",
        text: "Youtrust est fait pour envoyer. Vous déposez un document, vous choisissez qui signe et dans quel ordre, et Youtrust envoie les invitations et les relances. Chaque signature est accompagnée d’un dossier de preuve horodaté, archivé 10 ans par Arkhinéo. Vous choisissez le niveau : simple, avancée avec contrôle d’identité, ou qualifiée avec contrôle d’identité par vidéo. Youtrust figure sur la liste européenne des prestataires de services de confiance qualifiés, héberge ses services exclusivement en France, et se connecte à des outils comme Zapier et HubSpot.",
      },
      {
        type: "p",
        text: "Cachety n’envoie, ne suit et n’archive rien. Il sert à signer vous-même : on vous envoie un PDF par mail, vous le signez dans le navigateur, et vous le renvoyez. Rien n’est envoyé en ligne, rien n’est conservé.",
      },
      { type: "h2", text: "À propos des signatures en image" },
      {
        type: "p",
        text: "Youtrust présente ses signatures conformes à eIDAS comme juridiquement opposables, à la différence des simples signatures en image ou scannées. C’est son propre argument commercial, mais il pointe une vraie limite. Une signature Cachety est une image posée sur la page : ce qu’on appelle couramment une signature électronique « simple ». En France, la Cour de cassation (2022 et 2024) a jugé qu’une image de signature, comme une signature scannée, ne remplit pas seule les conditions de l’article 1367 du Code civil : elle vaut signature si personne ne la conteste, mais pèse peu si elle l’est. Seule une signature qualifiée est présumée fiable. Ceci n’est pas un conseil juridique.",
      },
      NOT_FOR,
      { type: "h2", text: "Là où Youtrust fait mieux" },
      {
        type: "list",
        items: [
          "Envoyer un document à plusieurs personnes, dans l’ordre, avec relances.",
          "Un dossier de preuve horodaté pour chaque signature, gardé 10 ans.",
          "Les signatures avancée et qualifiée, avec contrôle d’identité ou contrôle par vidéo.",
          "Une formule gratuite sans publicité pour signer vos propres documents, avec un dossier de preuve sur chaque formule.",
          "Un éditeur français, des serveurs en France.",
        ],
      },
      { type: "h2", text: "Là où Cachety fait mieux" },
      {
        type: "list",
        items: [
          "Aucun compte : vous ouvrez la page et vous signez.",
          "Votre document n’est jamais envoyé en ligne, même vers des serveurs en France. Tout marche en mode avion une fois la page chargée.",
          "Le PDF signé est aplati, et texte caché, métadonnées et pièces jointes sont retirés.",
          "Open source, sans publicité ni pisteur.",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous devez envoyer un document à d’autres personnes pour signature et suivre son avancement.",
      "Vous voulez un dossier de preuve horodaté, ou une signature avancée ou qualifiée.",
      "Vous signez souvent vos propres documents, voulez un dossier de preuve pour chacun, et un compte ne vous gêne pas.",
      "L’autre partie vous a envoyé un lien Youtrust ou Yousign : signez là-bas.",
    ],
    chooseCachety: [
      "Vous devez seulement signer vous-même un PDF et le renvoyer.",
      "Vous ne voulez ni créer de compte ni envoyer le document où que ce soit.",
      "Vous voulez une copie signée débarrassée des données cachées avant de l’envoyer.",
    ],
    faq: [
      {
        q: "Yousign et Youtrust, c’est la même chose ?",
        a: "Oui. L’éditeur a annoncé que Yousign devient Youtrust à partir de juillet 2026. L’application peut encore afficher le nom Yousign un moment : la bascule doit être terminée d’ici 2027.",
      },
      FAQ_VALID("Youtrust"),
      {
        q: "Faut-il un compte ?",
        a: "Pas avec Cachety. Youtrust demande de créer un compte, même pour sa formule gratuite.",
      },
      {
        q: "Puis-je envoyer le document à quelqu’un d’autre pour qu’il le signe ?",
        a: "Pas avec Cachety. Il n’y a qu’un signataire : vous. Vous téléchargez le PDF signé et vous l’envoyez vous-même, et rien ne garde la trace de qui a signé, ni quand. Pour recueillir plusieurs signatures avec un dossier de preuve, passez par Youtrust.",
      },
    ],
    sources: [
      { label: "Youtrust : Yousign devient Youtrust", url: "https://youtrust.com/yousign-becomes-youtrust" },
      { label: "Youtrust : page d’accueil", url: "https://www.youtrust.com/" },
      { label: "Youtrust : formule gratuite", url: "https://youtrust.com/electronic-signature-freemium" },
      { label: "Youtrust : formules", url: "https://youtrust.com/pricing-application" },
      { label: "Youtrust : niveaux de signature électronique", url: "https://youtrust.com/e-signature" },
      { label: "Youtrust : comment signer un PDF", url: "https://youtrust.com/blog/how-to-sign-a-pdf" },
      { label: "Youtrust : fonctionnalités de l’application", url: "https://youtrust.com/application" },
      { label: "Youtrust : sécurité", url: "https://youtrust.com/security" },
      { label: "Youtrust : politique de confidentialité", url: "https://youtrust.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    tool: "sign",
    slug: "cachety-vs-adobe-fill-sign",
    competitor: "adobe-fill-sign",
    competitorName: "Adobe Acrobat Sign",
    competitorUrl: "https://www.adobe.com/acrobat/online/sign-pdf.html",
    title: "Cachety ou Adobe Acrobat Sign : quel outil pour signer un PDF ?",
    metaTitle: "Alternative à Adobe Fill & Sign : signer un PDF sans envoi",
    description:
      "Adobe signe votre PDF sur ses serveurs. Cachety le signe dans votre navigateur, gratuitement, sans compte et sans rien envoyer. Un comparatif honnête.",
    intro:
      "Adobe propose deux façons de signer un PDF : un outil en ligne gratuit pour signer un PDF, aussi appelé Fill & Sign, et Acrobat Sign, son service de signature électronique pour les entreprises. Cachety est proche du premier : il sert à signer vous-même un document. La différence : Cachety le fait dans votre navigateur, sans envoyer le fichier.",
    verdict:
      "Pour envoyer un document à plusieurs signataires, garder un journal d’audit ou utiliser la signature avancée ou qualifiée, Adobe Acrobat Sign est le meilleur choix, et Cachety ne fait rien de tout cela. Pour signer vous-même un PDF, les deux conviennent. L’outil en ligne d’Adobe traite le fichier sur ses serveurs, et sa page indique qu’il faut être connecté pour terminer le formulaire. Cachety ne demande aucun compte et n’envoie jamais le document.",
    table: [
      {
        criterion: "Où le document est traité",
        cachety: CACHETY.where,
        other: "Sur les serveurs d’Adobe. Le fichier est supprimé, sauf si vous vous connectez pour l’enregistrer. La page n’indique ni durée de conservation ni pays.",
        edge: "cachety",
      },
      {
        criterion: "Compte",
        cachety: CACHETY.account,
        other: "La page de l’outil en ligne indique qu’il faut être connecté pour terminer le formulaire.",
        edge: "cachety",
      },
      {
        criterion: "Style de signature",
        cachety: CACHETY.styles,
        other: "Signature tapée, dessinée ou importée en image. Initiales, texte, coches et traits.",
      },
      {
        criterion: "Niveau de signature",
        cachety: CACHETY.level,
        other: "Avec Acrobat Sign, toute combinaison de signatures simples, avancées ou qualifiées, via plus de 200 prestataires de services de confiance.",
        edge: "other",
      },
      {
        criterion: "Journal d’audit",
        cachety: CACHETY.audit,
        other: "Proposé avec Acrobat Sign. L’outil en ligne indique que demander des signatures et consulter les journaux d’audit peut nécessiter une formule Acrobat payante.",
        edge: "other",
      },
      {
        criterion: "Envoi à d’autres signataires",
        cachety: CACHETY.send,
        other: "Oui, avec Acrobat Sign : plusieurs signataires, modèles, et signature depuis Microsoft Word, Teams, Salesforce ou Workday.",
        edge: "other",
      },
      {
        criterion: "Sur téléphone",
        cachety: CACHETY.mobile,
        other: "L’appli Acrobat Reader pour iOS et Android permet de signer. L’appli Adobe Fill & Sign pour iPhone signe aussi la photo d’un formulaire papier.",
      },
      {
        criterion: "Qui traite vos données",
        cachety: "Personne d’autre : aucun serveur ne reçoit vos documents. Ni publicité ni pisteur.",
        other: "Pour les utilisateurs de l’Union européenne, Adobe Systems Software Ireland Limited.",
      },
    ],
    body: [
      { type: "h2", text: "Fill & Sign et Acrobat Sign, ce n’est pas la même chose" },
      {
        type: "p",
        text: "L’outil en ligne gratuit d’Adobe sert à signer vous-même un document. Vous ouvrez la page, vous déposez votre PDF, puis vous tapez, dessinez ou importez une image de votre signature, et ajoutez initiales, texte ou coches. Adobe indique que le fichier est traité par ses serveurs, puis supprimé, sauf si vous vous connectez pour l’enregistrer. Sur iPhone, l’appli Adobe Fill & Sign permet aussi de signer la photo d’un formulaire papier.",
      },
      {
        type: "p",
        text: "Acrobat Sign est le service de signature électronique d’Adobe pour les entreprises. Il envoie les documents à plusieurs signataires, utilise des modèles, garde des journaux d’audit et fonctionne depuis des outils comme Microsoft Word, Teams, Salesforce ou Workday. Pour l’Europe, Adobe indique pouvoir déployer des signatures avancées ou qualifiées via plus de 200 prestataires de services de confiance.",
      },
      {
        type: "p",
        text: "Cachety ne fait que le premier travail, signer vous-même, mais dans votre navigateur. Pas d’envoi en ligne, pas de compte Adobe, ni aucun autre.",
      },
      { type: "h2", text: "Ce qu’Adobe dit de la valeur juridique" },
      {
        type: "p",
        text: "Adobe indique que les signatures faites avec son outil en ligne sont juridiquement suffisantes au regard de l’ESIGN Act et de l’UETA, deux lois américaines, et que ses signatures numériques à certificat répondent au niveau qualifié d’eIDAS et à d’autres normes internationales. Ce sont ses propres affirmations. Une signature à certificat n’a rien à voir avec une image de signature.",
      },
      LEGAL,
      NOT_FOR,
      { type: "h2", text: "Là où Adobe fait mieux" },
      {
        type: "list",
        items: [
          "Envoyer un document à plusieurs signataires, avec modèles et journaux d’audit.",
          "Les signatures avancées et qualifiées, pour les contrats qui doivent tenir en cas de contestation.",
          "Signer depuis les logiciels d’entreprise que vous utilisez déjà.",
          "Des applis pour iPhone et Android, si vous préférez une appli à une page web.",
        ],
      },
      { type: "h2", text: "Là où Cachety fait mieux" },
      {
        type: "list",
        items: [
          "Votre document n’est jamais envoyé en ligne. Tout marche en mode avion une fois la page chargée.",
          "Aucun compte à créer, aucune connexion.",
          "Le PDF signé est aplati, et texte caché, métadonnées et pièces jointes sont retirés.",
          "Gratuit et open source, sans publicité ni pisteur.",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "Plusieurs personnes doivent signer le même document, avec un journal d’audit.",
      "Il vous faut une signature avancée ou qualifiée.",
      "Votre entreprise utilise déjà Microsoft Word, Teams, Salesforce ou Workday et veut la signature intégrée.",
      "Vous avez déjà un compte Adobe et l’envoi du fichier sur les serveurs d’Adobe ne vous gêne pas.",
    ],
    chooseCachety: [
      "Vous devez seulement signer vous-même un PDF et le renvoyer.",
      "Vous ne voulez vous connecter à rien, ni envoyer le document.",
      "Vous voulez que les données cachées soient retirées de la copie signée.",
    ],
    faq: [
      FAQ_VALID("Adobe Acrobat Sign"),
      {
        q: "Faut-il un compte ?",
        a: "Pas avec Cachety. La page de l’outil en ligne d’Adobe indique qu’il faut être connecté pour terminer le formulaire.",
      },
      {
        q: "Puis-je envoyer le document à quelqu’un d’autre pour qu’il le signe ?",
        a: "Pas avec Cachety. Il n’y a qu’un signataire : vous. Vous téléchargez le PDF signé et vous l’envoyez vous-même. Pour envoyer un document à plusieurs signataires avec un journal d’audit, Adobe Acrobat Sign est le bon outil.",
      },
      {
        q: "Adobe garde-t-il mon fichier ?",
        a: "L’outil en ligne d’Adobe indique que le fichier est traité par ses serveurs, puis supprimé, sauf si vous vous connectez pour l’enregistrer. La page ne dit pas combien de temps il y reste. Avec Cachety, le fichier ne quitte jamais votre appareil.",
      },
    ],
    sources: [
      { label: "Adobe Acrobat en ligne : signer un PDF", url: "https://www.adobe.com/acrobat/online/sign-pdf.html" },
      { label: "Adobe Acrobat Sign pour les entreprises", url: "https://www.adobe.com/acrobat/business/sign.html" },
      { label: "Adobe Acrobat Sign et eIDAS", url: "https://www.adobe.com/acrobat/business/compliance/eidas.html" },
      { label: "Adobe Fill & Sign sur l’App Store", url: "https://apps.apple.com/cr/app/adobe-fill-sign/id950099951" },
      { label: "Adobe : politique de confidentialité", url: "https://www.adobe.com/privacy/policy.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    tool: "sign",
    slug: "cachety-vs-ilovepdf-sign",
    competitor: "ilovepdf-sign",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/sign-pdf",
    title: "Cachety ou iLovePDF : quel outil pour signer un PDF ?",
    metaTitle: "Signer un PDF sans l’envoyer : alternative à iLovePDF",
    description:
      "iLovePDF signe votre PDF sur ses serveurs, avec piste d’audit et signature numérique Premium. Cachety le signe dans votre navigateur, sans compte.",
    intro:
      "L’outil de signature de PDF d’iLovePDF, aussi proposé sous le nom iLoveSign, permet de signer vous-même un document ou de l’envoyer à d’autres personnes pour signature. Cachety ne fait que le premier, mais dans votre navigateur, sans envoyer le fichier.",
    verdict:
      "Pour inviter d’autres signataires, obtenir une piste d’audit ou une signature avancée, iLovePDF est le meilleur choix. Sa signature numérique Premium intègre aussi un hachage certifié et un horodatage qualifié. Pour signer vous-même un PDF et le renvoyer, Cachety le fait sans compte, sans publicité, et sans rien envoyer.",
    table: [
      {
        criterion: "Où le document est traité",
        cachety: CACHETY.where,
        other: "Sur les serveurs d’iLovePDF, dans l’Espace économique européen. Les fichiers envoyés sont supprimés dans les deux heures.",
        edge: "cachety",
      },
      {
        criterion: "Usage gratuit et publicité",
        cachety: CACHETY.free + " " + CACHETY.trackers,
        other: "Une formule gratuite Basic avec publicité, une limite de 50 Mo pour la signature et un nombre de demandes limité. Signatures simples de vos propres documents sans limite avec iLoveSign.",
        edge: "cachety",
      },
      {
        criterion: "Compte",
        cachety: CACHETY.account,
        other: "Nécessaire pour demander des signatures à d’autres personnes.",
      },
      {
        criterion: "Niveau de signature",
        cachety: CACHETY.level,
        other: "Une signature simple, qui devient une signature avancée au sens d’eIDAS avec validation par SMS. Une signature numérique (Digital Signature) est proposée en Premium.",
        edge: "other",
      },
      {
        criterion: "Piste d’audit",
        cachety: CACHETY.audit,
        other: "Une piste d’audit est générée à la fin de la signature, archivée 10 ans avec iLoveSign.",
        edge: "other",
      },
      {
        criterion: "Envoi à d’autres signataires",
        cachety: CACHETY.send,
        other: "Oui, avec ordre de signature, date d’expiration et relances.",
        edge: "other",
      },
      {
        criterion: "Vérification d’identité",
        cachety: CACHETY.identity,
        other: "Validation par SMS, et option de scan de pièce d’identité.",
        edge: "other",
      },
      {
        criterion: "Conservation des documents signés",
        cachety: CACHETY.retention,
        other: "Documents signés gardés 5 ans au plus, selon sa page sécurité.",
      },
      {
        criterion: "Ce que vous obtenez",
        cachety: CACHETY.output,
        other: "Avec la signature numérique Premium, un hachage certifié signé et un horodatage qualifié sont intégrés au document.",
      },
    ],
    body: [
      { type: "h2", text: "Signer soi-même, ou faire signer" },
      {
        type: "p",
        text: "L’outil de signature d’iLovePDF commence par un choix : signer seul, ou faire signer plusieurs personnes. Pour vous-même, vous dessinez, tapez ou importez votre signature et vos initiales, puis ajoutez une date ou du texte. Pour inviter d’autres personnes, il faut un compte, et vous pouvez fixer un ordre de signature, une date d’expiration et des relances. Une piste d’audit est générée à la fin. Avec la validation par SMS, iLovePDF indique que la signature devient une signature avancée au sens d’eIDAS, et propose aussi un scan de pièce d’identité.",
      },
      {
        type: "p",
        text: "Le travail se fait sur les serveurs d’iLovePDF. Sa page sécurité indique que les fichiers sont supprimés dans les deux heures et que les documents signés sont gardés 5 ans au plus. iLovePDF est une société basée à Barcelone, qui traite les données dans l’Espace économique européen et détient la certification ISO/IEC 27001.",
      },
      {
        type: "p",
        text: "Cachety ne couvre que le premier cas. Vous signez dans le navigateur, vous téléchargez le PDF signé et vous l’envoyez vous-même. Rien n’est envoyé en ligne, rien n’est conservé.",
      },
      { type: "h2", text: "Ce que vaut une signature Cachety" },
      LEGAL,
      NOT_FOR,
      { type: "h2", text: "Là où iLovePDF fait mieux" },
      {
        type: "list",
        items: [
          "Envoyer un document à plusieurs personnes, avec ordre, date d’expiration et relances.",
          "Une piste d’audit, archivée 10 ans avec iLoveSign.",
          "Une signature avancée avec validation par SMS, et une signature numérique avec horodatage qualifié.",
          "Des applis iOS et Android.",
        ],
      },
      { type: "h2", text: "Là où Cachety fait mieux" },
      {
        type: "list",
        items: [
          "Votre document n’est jamais envoyé en ligne. Tout marche en mode avion une fois la page chargée.",
          "Gratuit, sans publicité, sans pisteur et sans compte.",
          "Le PDF signé est aplati, et texte caché, métadonnées et pièces jointes sont retirés.",
          "Open source : chacun peut vérifier ce qu’il fait.",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "D’autres personnes doivent signer le même document, avec relances et piste d’audit.",
      "Il vous faut une signature avancée, ou une signature numérique avec horodatage qualifié.",
      "Vous utilisez déjà iLovePDF pour d’autres tâches et l’envoi du fichier ne vous gêne pas.",
    ],
    chooseCachety: [
      "Vous devez seulement signer vous-même un PDF et le renvoyer.",
      "Vous préférez que le document ne quitte jamais votre appareil, même deux heures.",
      "Vous voulez un outil gratuit, sans publicité et sans compte.",
    ],
    faq: [
      FAQ_VALID("iLovePDF"),
      {
        q: "Faut-il un compte ?",
        a: "Pas avec Cachety. iLovePDF demande un compte pour demander des signatures à d’autres personnes.",
      },
      {
        q: "Puis-je envoyer le document à quelqu’un d’autre pour qu’il le signe ?",
        a: "Pas avec Cachety. Il n’y a qu’un signataire : vous. Vous téléchargez le PDF signé et vous l’envoyez vous-même. iLovePDF peut inviter plusieurs signataires et produire une piste d’audit.",
      },
      {
        q: "iLovePDF envoie-t-il mon document sur ses serveurs ?",
        a: "Oui. Le document est traité sur les serveurs d’iLovePDF, dans l’Espace économique européen. Sa page sécurité indique que les fichiers sont supprimés dans les deux heures et que les documents signés sont gardés 5 ans au plus.",
      },
    ],
    sources: [
      { label: "iLovePDF : signer un PDF", url: "https://www.ilovepdf.com/sign-pdf" },
      {
        label: "Guide iLovePDF : ajouter une signature à un PDF",
        url: "https://www.ilovepdf.com/blog/how-to-add-a-signature-to-a-pdf-document-online-using-ilovepdf",
      },
      { label: "iLovePDF : tarifs", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLoveSign : tarifs", url: "https://www.ilovesign.com/esignature-pricing" },
      { label: "iLovePDF : sécurité", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF : politique de confidentialité", url: "https://www.ilovepdf.com/help/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    tool: "sign",
    slug: "cachety-vs-smallpdf-sign",
    competitor: "smallpdf-sign",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/sign-pdf",
    title: "Cachety ou Smallpdf : quel outil pour signer un PDF ?",
    metaTitle: "Alternative à Smallpdf pour signer un PDF sans envoi",
    description:
      "Smallpdf signe votre PDF sur ses serveurs et le supprime au bout d’une heure. Cachety le signe dans votre navigateur, gratuitement, sans compte ni pisteur.",
    intro:
      "L’outil de signature de PDF de Smallpdf permet de dessiner, taper ou importer votre signature sans créer de compte. Pour faire signer d’autres personnes, il renvoie vers Sign.com, son service de signature électronique. Cachety ne sert qu’à signer vous-même, mais sans envoyer le document.",
    verdict:
      "Pour demander des signatures à d’autres, les suivre et obtenir un certificat d’achèvement, Smallpdf avec Sign.com est le meilleur choix. Pour signer vous-même un PDF, les deux marchent sans compte. La différence tient à l’endroit où va le fichier : Smallpdf le traite sur ses serveurs, Cachety le garde sur votre appareil.",
    table: [
      {
        criterion: "Où le document est traité",
        cachety: CACHETY.where,
        other: "Sur les serveurs de Smallpdf, hébergés par Hetzner dans l’Union européenne, avec Cloudflare aux États-Unis ou en Europe. Transferts chiffrés en TLS.",
        edge: "cachety",
      },
      {
        criterion: "Conservation du fichier",
        cachety: CACHETY.retention,
        other: "Supprimé automatiquement au bout d’une heure, sauf si vous l’enregistrez dans un compte Smallpdf.",
        edge: "cachety",
      },
      {
        criterion: "Compte",
        cachety: CACHETY.account,
        other: "Inutile pour signer vous-même un PDF.",
      },
      {
        criterion: "Usage gratuit",
        cachety: CACHETY.free,
        other: "Gratuit avec une limite de téléchargements par jour. La formule gratuite de Sign.com inclut un nombre limité de documents par mois.",
      },
      {
        criterion: "Mesure d’audience et pisteurs publicitaires",
        cachety: "Aucun.",
        other: "Avec votre consentement : Google Analytics, remarketing Google Ads, Facebook Pixel et LinkedIn, selon sa politique de confidentialité.",
        edge: "cachety",
      },
      {
        criterion: "Sceau et certificat",
        cachety: CACHETY.audit,
        other: "Via Sign.com : sceaux numériques et certificat d’achèvement.",
        edge: "other",
      },
      {
        criterion: "Envoi à d’autres signataires",
        cachety: CACHETY.send,
        other: "Oui, via Sign.com, avec suivi.",
        edge: "other",
      },
      {
        criterion: "Style de signature et applis",
        cachety: CACHETY.styles + " " + CACHETY.mobile,
        other: "Signature dessinée, tapée ou importée, plus initiales, texte et dates. Applis Android et iOS.",
      },
    ],
    body: [
      { type: "h2", text: "Deux services en un" },
      {
        type: "p",
        text: "Sur la page de signature de Smallpdf, vous pouvez signer vous-même un document sans compte ni installation : dessinez, tapez ou importez votre signature, puis ajoutez initiales, texte et dates. Demander des signatures à d’autres, les suivre, les sceaux numériques et le certificat d’achèvement passent par Sign.com, le service de signature électronique de Smallpdf.",
      },
      {
        type: "p",
        text: "Dans les deux cas, le document part sur les serveurs de Smallpdf. Sa page de signature indique que les fichiers sont supprimés automatiquement au bout d’une heure, sauf si vous les enregistrez dans votre compte. Sa politique de confidentialité précise que le traitement passe par des serveurs Hetzner dans l’Union européenne et par Cloudflare aux États-Unis ou en Europe. L’entreprise est Smallpdf AG, basée à Zurich.",
      },
      {
        type: "p",
        text: "Cachety n’envoie, ne suit et ne stocke rien. Vous signez dans le navigateur, vous téléchargez le PDF signé et vous l’envoyez vous-même.",
      },
      { type: "h2", text: "Les promesses juridiques, et ce qu’elles veulent dire" },
      {
        type: "p",
        text: "Smallpdf présente ses signatures comme juridiquement contraignantes, en ajoutant qu’il faut toujours vérifier la loi locale. Sign.com indique que ses signatures sont valables et contraignantes selon les normes eIDAS, sans préciser de niveau. Ce sont leurs propres affirmations. Ce qui compte, si une signature est un jour contestée, c’est son niveau : simple, avancée ou qualifiée.",
      },
      LEGAL,
      NOT_FOR,
      { type: "h2", text: "Là où Smallpdf fait mieux" },
      {
        type: "list",
        items: [
          "Demander des signatures à d’autres et les suivre, via Sign.com.",
          "Des sceaux numériques et un certificat d’achèvement.",
          "Des applis Android et iOS.",
        ],
      },
      { type: "h2", text: "Là où Cachety fait mieux" },
      {
        type: "list",
        items: [
          "Votre document n’est jamais envoyé en ligne, même une heure. Tout marche en mode avion une fois la page chargée.",
          "Ni mesure d’audience ni pisteur publicitaire, avec ou sans consentement.",
          "Le PDF signé est aplati, et texte caché, métadonnées et pièces jointes sont retirés.",
          "Gratuit et open source.",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "Vous devez envoyer un document à d’autres personnes pour signature et le suivre.",
      "Vous voulez un sceau numérique et un certificat d’achèvement avec le document signé.",
      "Vous utilisez déjà Smallpdf pour d’autres tâches et l’envoi du fichier ne vous gêne pas.",
    ],
    chooseCachety: [
      "Vous devez seulement signer vous-même un PDF et le renvoyer.",
      "Vous préférez que le document ne quitte jamais votre appareil.",
      "Vous voulez un outil sans mesure d’audience ni pisteur publicitaire.",
    ],
    faq: [
      FAQ_VALID(),
      {
        q: "Faut-il un compte ?",
        a: "Non, ni pour l’un ni pour l’autre, quand vous signez vous-même un PDF. Smallpdf indique qu’il n’y a ni compte à créer ni logiciel à installer pour signer.",
      },
      {
        q: "Puis-je envoyer le document à quelqu’un d’autre pour qu’il le signe ?",
        a: "Pas avec Cachety. Il n’y a qu’un signataire : vous. Vous téléchargez le PDF signé et vous l’envoyez vous-même. Smallpdf le propose via Sign.com, avec suivi et certificat d’achèvement.",
      },
      {
        q: "Smallpdf envoie-t-il mon document sur ses serveurs ?",
        a: "Oui. Le document est traité sur les serveurs de Smallpdf et supprimé automatiquement au bout d’une heure, sauf si vous l’enregistrez dans votre compte. Cachety fait tout sur votre appareil.",
      },
    ],
    sources: [
      { label: "Smallpdf : signer un PDF", url: "https://smallpdf.com/sign-pdf" },
      { label: "Smallpdf : signature électronique", url: "https://smallpdf.com/sign" },
      { label: "Smallpdf : tarifs", url: "https://smallpdf.com/pricing" },
      { label: "Sign.com pour Smallpdf", url: "https://sign.com/smallpdf" },
      { label: "Smallpdf : politique de confidentialité", url: "https://smallpdf.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
