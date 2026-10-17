import type { Comparison } from "../types";

// Comparatifs de l'outil de signature (nl). Même règle éditoriale que les
// comparatifs du filigrane (lib/compare/types.ts) ; chaque entrée porte tool: "sign".
//
// Vergelijkingen van de ondertekentool in het Nederlands, voor Nederland en
// Vlaanderen. Elke bewering over een andere tool komt van de eigen openbare
// pagina's van die tool (veld `sources`), gecontroleerd op 2026-10-17. Geen
// prijzen. Niets over de uitvoer van andere tools (plat gemaakt of niet), want
// dat beschrijven ze niet. Franse rechtspraak wordt niet als Nederlands of
// Belgisch recht voorgesteld. Alleen platte tekst.

const CHECKED = "2026-10-17";
const UPDATED = "2026-10-17";

// Cellen voor Cachety die op elke pagina terugkomen (gecontroleerde feitenlijst).
const C = {
  where: "Op je eigen apparaat, in de browser. Het document gaat naar geen enkele server.",
  account: "Geen account, niet inloggen.",
  price: "Gratis, zonder betaalde versie.",
  level:
    "Een afbeelding van je handtekening op de pagina, wat men gewoonlijk een “gewone” elektronische handtekening noemt. Geen certificaat, geen tijdstempel.",
  audit:
    "Nee: geen audittrail en geen voltooiingscertificaat. Na het downloaden toont Cachety een SHA-256-vingerafdruk van het bestand, die je kunt bewaren.",
  sending: "Nee: je ondertekent zelf. Niets versturen ter ondertekening, geen volgorde, één ondertekenaar.",
  identity: "Geen identiteitscontrole.",
  retention: "Niets bewaard: je handtekening bestaat alleen in het geheugen van het tabblad, het document verlaat je apparaat niet.",
  ads: "Geen advertenties, geen trackers.",
  fields:
    "Handtekening tekenen, typen of als foto importeren (achtergrond wordt verwijderd). Optioneel datum, plaats en vermelding eronder, paraaf op elke pagina, watermerk.",
};

const LEGAL = {
  type: "p" as const,
  text: "Een afbeelding van je handtekening op het document, zoals Cachety die maakt, is wat men gewoonlijk een gewone elektronische handtekening noemt. In de EU mag een elektronische handtekening niet als bewijs worden geweigerd alleen omdat ze elektronisch is (eIDAS-verordening, artikel 25). Zo'n afbeelding telt als niemand haar betwist, maar weegt weinig als iemand dat wel doet. Alleen een gekwalificeerde handtekening, gezet met een certificaat van een gekwalificeerde aanbieder, wordt vermoed betrouwbaar te zijn en staat gelijk aan een handgeschreven handtekening.",
};

const WHEN_NOT = {
  type: "warning" as const,
  text: "Gebruik Cachety niet als een geavanceerde of gekwalificeerde handtekening verplicht is, als meerdere mensen moeten tekenen of een audittrail nodig is, als de wet een vermelding in je eigen handschrift eist (borgtocht, schuldbekentenis), voor een testament of een notariële akte, of als de andere partij een bepaald platform eist.",
};

const HOW_TO: { type: "steps"; items: string[] } = {
  type: "steps",
  items: [
    "Open cachety.com/nl/sign in je browser, op de computer of op je telefoon. Niets te installeren, geen account nodig.",
    "Sleep je pdf of een foto van het document erin (JPG, PNG, HEIC). Meerdere documenten tegelijk kan ook; een foto wordt een pagina op A4-formaat.",
    "Teken je handtekening met je vinger of de muis, typ je naam of importeer een foto van je handtekening. Datum, plaats en een vermelding eronder zijn optioneel.",
    "Sleep de handtekening naar de juiste plek. Parafeer desgewenst elke pagina, voeg een watermerk toe of zet er een wachtwoord op.",
    "Download de ondertekende pdf en bewaar de vingerafdruk van het bestand die je te zien krijgt.",
  ],
};

const AIRPLANE_TIP = {
  type: "tip" as const,
  text: "De vliegtuigmodustest: open cachety.com/nl/sign, zet vliegtuigmodus aan en onderteken je document. Blijft alles werken, dan is er niets van je apparaat af gegaan. Een dienst die documenten uploadt, kan dat zonder verbinding niet.",
};

export const SIGN_COMPARISONS_NL: Comparison[] = [
  // ───────────────────────────── DocuSign ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-docusign",
    competitor: "docusign",
    competitorName: "DocuSign",
    competitorUrl: "https://www.docusign.com/",
    title: "Cachety of DocuSign: zelf ondertekenen of laten ondertekenen?",
    metaTitle: "DocuSign of Cachety: zelf een pdf ondertekenen",
    description:
      "DocuSign stuurt contracten ter ondertekening rond, met voltooiingscertificaat. Cachety ondertekent je pdf op je eigen apparaat, zonder account.",
    intro:
      "DocuSign is een van de bekendste platforms voor elektronische handtekeningen: je uploadt een contract, stuurt het naar anderen om te tekenen en krijgt aan het eind een voltooiingscertificaat. Cachety doet iets veel kleiners: je ondertekent zelf een document, in de browser, en het verlaat je apparaat niet.",
    verdict:
      "Voor contracten met meerdere ondertekenaars, een audittrail, identiteitscontrole of een geavanceerde of gekwalificeerde handtekening is DocuSign de betere keuze. Cachety is voor alledaagse dingen: een formulier, verklaring of offerte die je zelf ondertekent en terugstuurt, zonder account en zonder upload. Het resultaat is een afbeelding van je handtekening op een platgemaakte pdf, dus een gewone elektronische handtekening.",
    table: [
      {
        criterion: "Waar het document wordt verwerkt",
        cachety: C.where,
        other: "In de cloud van DocuSign, in een van vijf datacenterregio's: Verenigde Staten, Canada, Europa, Australië of Japan.",
        edge: "cachety",
      },
      {
        criterion: "Account en gratis gebruik",
        cachety: "Geen account, gratis, zonder betaalde versie.",
        other: "Om te versturen een abonnement (Personal, Standard, Business Pro, Advanced) na een gratis proefperiode van 30 dagen; Personal omvat 5 enveloppen per maand. Ontvangers tekenen gratis en zonder account.",
        edge: "cachety",
      },
      {
        criterion: "Niveau van de handtekening",
        cachety: C.level,
        other: "Documenten worden digitaal verzegeld met een public key infrastructure (PKI). Geavanceerde handtekening beschikbaar, gekwalificeerde handtekening als extra optie; DocuSign is in Europa een gekwalificeerde verlener van vertrouwensdiensten.",
        edge: "other",
      },
      {
        criterion: "Audittrail en certificaat",
        cachety: C.audit,
        other: "Voltooiingscertificaat en auditlog in alle abonnementen.",
        edge: "other",
      },
      {
        criterion: "Naar anderen sturen om te tekenen",
        cachety: C.sending,
        other: "Ja: meerdere ondertekenaars na elkaar, tegelijk of gemengd, automatische herinneringen, sjablonen, bulkverzending.",
        edge: "other",
      },
      {
        criterion: "Identiteitscontrole",
        cachety: C.identity,
        other: "Eenmalige code per sms, controle per telefoon of met een officieel identiteitsbewijs.",
        edge: "other",
      },
      {
        criterion: "Bewaartermijn",
        cachety: C.retention,
        other: "De klant bepaalt hoe lang documenten bewaard blijven en kan ze op elk moment wissen.",
      },
      {
        criterion: "Velden, talen, koppelingen",
        cachety: C.fields,
        other: "Initialen, tekstvelden, selectievakjes, keuzerondjes, keuzelijsten; ondertekenen in 44 talen, meer dan 1.100 integraties, API's, apps voor iOS en Android.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Twee heel verschillende tools" },
      {
        type: "p",
        text: "DocuSign is gemaakt voor situaties waarin anderen tekenen: je uploadt het contract, bepaalt wie waar en in welke volgorde tekent, en DocuSign verstuurt het, stuurt herinneringen en verzamelt de handtekeningen. Elk afgerond document krijgt een voltooiingscertificaat, en de identiteit van ondertekenaars kan worden gecontroleerd met een sms-code of identiteitsbewijs. Voor bedrijven, hr-afdelingen of makelaars is dat het juiste kader.",
      },
      {
        type: "p",
        text: "Cachety heeft daar niets van. Het zet een afbeelding van je handtekening op je eigen document, in je browser. Dat past als iemand je een pdf stuurt met de vraag die ondertekend terug te sturen, en je daarvoor geen account wilt aanmaken of het bestand ergens wilt uploaden.",
      },
      { type: "h2", text: "Wat is de handtekening van Cachety waard?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "Waar DocuSign sterker is" },
      {
        type: "list",
        items: [
          "Meerdere ondertekenaars in een vaste volgorde, met automatische herinneringen.",
          "Een voltooiingscertificaat en auditlog bij elk document.",
          "Identiteitscontrole via sms, telefoon of identiteitsbewijs.",
          "Geavanceerde handtekening, en een gekwalificeerde als extra optie.",
          "Sjablonen, bulkverzending, meer dan 1.100 integraties en API's.",
        ],
      },
      { type: "h2", text: "Waar Cachety beter past" },
      {
        type: "list",
        items: [
          "Je tekent zelf, en het document blijft op je apparaat.",
          "Geen account, geen proefperiode, geen abonnement.",
          "Een foto van een papieren document wordt meteen een ondertekende A4-pagina.",
          "De pagina's worden opnieuw opgebouwd: verborgen tekst, metadata, bijlagen en gps-gegevens van foto's verdwijnen.",
        ],
      },
      { type: "h2", text: "Zo doe je het met Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Meerdere mensen moeten tekenen, in een vaste volgorde en met herinneringen.",
      "Je hebt een audittrail of voltooiingscertificaat nodig als bewijs van wie wanneer heeft getekend.",
      "Er wordt een geavanceerde of gekwalificeerde handtekening gevraagd, of de identiteit van ondertekenaars moet worden gecontroleerd.",
      "Je verstuurt regelmatig contracten en wilt sjablonen, bulkverzending of een koppeling met je eigen software.",
    ],
    chooseCachety: [
      "Je moet zelf een pdf ondertekenen en terugsturen, zoals een verklaring, formulier of offerte.",
      "Je wilt daarvoor geen account aanmaken en het document niet uploaden.",
      "Je ondertekent maar af en toe iets en hebt geen proefperiode of abonnement nodig.",
    ],
    faq: [
      {
        q: "Kan ik gratis tekenen met DocuSign?",
        a: "Als ontvanger wel: DocuSign schrijft dat ontvangers gratis en zonder account tekenen. Wie zelf documenten ter ondertekening wil versturen, heeft een abonnement nodig; daarvoor is er een gratis proefperiode van 30 dagen.",
      },
      {
        q: "Is een handtekening met Cachety evenveel waard als een met DocuSign?",
        a: "Niet bij een geschil. Cachety zet een afbeelding van je handtekening, een gewone elektronische handtekening zonder certificaat en zonder audittrail. Die telt als niemand haar betwist, maar weegt weinig als iemand dat wel doet. DocuSign verzegelt documenten digitaal, levert een voltooiingscertificaat en biedt ook geavanceerde en gekwalificeerde handtekeningen. Alleen de gekwalificeerde staat gelijk aan een handgeschreven handtekening.",
      },
      {
        q: "Waar bewaart DocuSign mijn documenten?",
        a: "In zijn cloud, in een van vijf regio's: Verenigde Staten, Canada, Europa, Australië of Japan. Hoe lang ze daar blijven, bepaalt de klant. Bij Cachety wordt niets geüpload.",
      },
      {
        q: "Iemand stuurde me een DocuSign-link. Heb ik Cachety nodig?",
        a: "Nee. Dan teken je gewoon bij DocuSign, gratis en zonder account. Eist de andere partij een platform, gebruik dan dat.",
      },
    ],
    sources: [
      { label: "DocuSign: pdf gratis ondertekenen (proefperiode)", url: "https://www.docusign.com/learn/add-electronic-signature-pdf-free" },
      { label: "DocuSign: gratis online ondertekenen", url: "https://www.docusign.com/en-gb/esignature/sign-document-online-free" },
      { label: "DocuSign: abonnementen eSignature", url: "https://ecom.docusign.com/plans-and-pricing/esignature" },
      { label: "DocuSign: functies", url: "https://www.docusign.com/en-ca/products/electronic-signature/features" },
      { label: "DocuSign: eSignature", url: "https://www.docusign.com/products/electronic-signature" },
      { label: "DocuSign: geavanceerde handtekening", url: "https://www.docusign.com/en-gb/products/electronic-signature/advanced-electronic-signature" },
      { label: "DocuSign: gekwalificeerde handtekening", url: "https://www.docusign.com/en-gb/products/electronic-signature/qualified-electronic-signature" },
      { label: "DocuSign: dataresidentie", url: "https://www.docusign.com/privacy/data-residency" },
      { label: "DocuSign: gegevensbeheer", url: "https://www.docusign.com/trust/privacy/data-mgmt-privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Youtrust (voorheen Yousign) ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-yousign",
    competitor: "yousign",
    competitorName: "Youtrust (voorheen Yousign)",
    competitorUrl: "https://www.youtrust.com/",
    title: "Cachety of Youtrust (voorheen Yousign): waarmee onderteken je?",
    metaTitle: "Youtrust (Yousign) of Cachety: pdf ondertekenen",
    description:
      "Youtrust, voorheen Yousign, biedt gewone, geavanceerde en gekwalificeerde handtekeningen. Cachety ondertekent je pdf zonder account op je apparaat.",
    intro:
      "Sinds juli 2026 vervangt de naam Youtrust de naam Yousign; tijdens de overgang kan de oude naam nog in de app staan. Youtrust is een Frans platform voor elektronische handtekeningen, gehost in Frankrijk. Cachety is een kleine browsertool waarmee je zelf een document ondertekent, zonder account en zonder upload.",
    verdict:
      "Moeten anderen tekenen, heb je een bewijsdossier met tijdstempel nodig of wordt een geavanceerde of gekwalificeerde handtekening gevraagd, dan is Youtrust de betere keuze, en al in het gratis abonnement zitten twee ondertekenverzoeken per maand. Cachety past als je alleen zelf wilt tekenen, zonder account en zonder het document te uploaden. Het resultaat is een gewone elektronische handtekening, een afbeelding op een platgemaakte pdf.",
    table: [
      {
        criterion: "Waar het document wordt verwerkt",
        cachety: C.where,
        other: "Op de servers van Youtrust, volgens de aanbieder uitsluitend gehost in Frankrijk.",
        edge: "cachety",
      },
      { criterion: "Account", cachety: C.account, other: "Account nodig, ook voor het gratis abonnement.", edge: "cachety" },
      {
        criterion: "Gratis gebruik",
        cachety: C.price,
        other: "Gratis abonnement: onbeperkt zelf ondertekenen, 2 ondertekenverzoeken per maand. Daarboven de abonnementen One, Plus en Pro.",
      },
      {
        criterion: "Niveau van de handtekening",
        cachety: C.level,
        other: "Gewoon (optioneel met eenmalige code), geavanceerd (met controle van je identiteitsbewijs) en gekwalificeerd (met video-identificatie); de laatste twee als betaalde extra's bij Plus en Pro. Youtrust staat op de EU-lijst van gekwalificeerde verleners van vertrouwensdiensten.",
        edge: "other",
      },
      {
        criterion: "Bewijs van de ondertekening",
        cachety: C.audit,
        other: "Bewijsdossier met tijdstempel in elk abonnement, 10 jaar gearchiveerd.",
        edge: "other",
      },
      {
        criterion: "Naar anderen sturen om te tekenen",
        cachety: C.sending,
        other: "Ja: goedkeuringen, volgorde van ondertekenaars, automatische herinneringen, sjablonen; koppeling met Zapier en HubSpot, API als apart product.",
        edge: "other",
      },
      {
        criterion: "Identiteitscontrole",
        cachety: C.identity,
        other: "Toegangscode per sms vóór het tekenen (Plus), controle van het identiteitsbewijs voor de geavanceerde en video-identificatie voor de gekwalificeerde handtekening.",
        edge: "other",
      },
      {
        criterion: "Bewaartermijn",
        cachety: C.retention,
        other: "Ondertekenbewijs 10 jaar, identiteitsgegevens 90 dagen, volgens de privacyverklaring.",
      },
      { criterion: "Advertenties", cachety: C.ads, other: "Het gratis abonnement is volgens Youtrust zonder advertenties." },
    ],
    body: [
      { type: "h2", text: "Wat Youtrust doet" },
      {
        type: "p",
        text: "Youtrust, dat in juli 2026 de naam Yousign begon te vervangen, is een platform voor elektronische handtekeningen van Youtrust SAS in Caen. Je tekent zelf of stuurt documenten ter ondertekening rond, bepaalt de volgorde, en Youtrust stuurt ondertekenaars automatisch herinneringen. Elke ondertekening krijgt een bewijsdossier met tijdstempel dat tien jaar wordt gearchiveerd. Er zijn drie niveaus, tot en met de gekwalificeerde handtekening met video-identificatie, die Youtrust omschrijft als het juridische equivalent van een handgeschreven handtekening.",
      },
      {
        type: "p",
        text: "Youtrust onderscheidt zijn handtekeningen zelf nadrukkelijk van gewone afbeeldingen en ingescande handtekeningen. Precies dat maakt Cachety: een afbeelding van je handtekening op de pagina. Het is dus een andere tool voor een andere behoefte, geen vervanging van een ondertekenplatform.",
      },
      { type: "h2", text: "Wat is de handtekening van Cachety waard?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "Waar Youtrust sterker is" },
      {
        type: "list",
        items: [
          "Ondertekenverzoeken aan anderen, met volgorde, goedkeuringen en herinneringen, al twee per maand in het gratis abonnement.",
          "Een bewijsdossier met tijdstempel, tien jaar gearchiveerd.",
          "Geavanceerde en gekwalificeerde handtekeningen met identiteitscontrole.",
          "Een Europese aanbieder, gehost in Frankrijk, op de EU-lijst van gekwalificeerde verleners van vertrouwensdiensten.",
        ],
      },
      { type: "h2", text: "Waar Cachety beter past" },
      {
        type: "list",
        items: [
          "Geen account: pagina openen, ondertekenen, downloaden.",
          "Het document wordt niet geüpload, en dus ook nergens bewaard.",
          "Een paraaf op elke pagina en een watermerk met doel en ontvanger in dezelfde stap.",
          "Werkt na het laden van de pagina ook in vliegtuigmodus.",
        ],
      },
      { type: "h2", text: "Zo doe je het met Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Anderen moeten tekenen, en je wilt een volgorde, herinneringen en een bewijsdossier met tijdstempel.",
      "Je hebt een geavanceerde of gekwalificeerde handtekening nodig, bijvoorbeeld omdat de andere partij die eist.",
      "De identiteit van ondertekenaars moet worden gecontroleerd, met een sms-code, identiteitsbewijs of video.",
    ],
    chooseCachety: [
      "Je wilt alleen zelf een document ondertekenen, zonder daarvoor een account aan te maken.",
      "Het document mag je apparaat niet verlaten, bijvoorbeeld omdat er persoonsgegevens in staan.",
      "Je wilt elke pagina paraferen en een watermerk met doel en ontvanger toevoegen.",
    ],
    faq: [
      {
        q: "Is Yousign nu Youtrust?",
        a: "Ja. Volgens de aankondiging van de aanbieder wordt Yousign vanaf juli 2026 Youtrust. Tijdens de overgang kan er in de app nog “Yousign” staan; de migratie moet in 2027 klaar zijn.",
      },
      {
        q: "Is Youtrust gratis?",
        a: "Er is een gratis abonnement zonder advertenties, met account: onbeperkt zelf ondertekenen en 2 ondertekenverzoeken per maand. Geavanceerde en gekwalificeerde handtekeningen zijn betaalde extra's bij Plus en Pro. Cachety is gratis en zonder account, maar kan geen verzoeken versturen.",
      },
      {
        q: "Waar staan mijn documenten bij Youtrust?",
        a: "Volgens Youtrust uitsluitend in Frankrijk; het bewijs wordt gearchiveerd door Arkhinéo. Ondertekenbewijs wordt 10 jaar bewaard, identiteitsgegevens 90 dagen. Bij Cachety wordt niets geüpload en niets bewaard.",
      },
      {
        q: "Heeft een handtekening met Cachety dezelfde waarde?",
        a: "Niet bij een geschil. Cachety maakt een gewone elektronische handtekening, een afbeelding zonder certificaat en zonder bewijsdossier. Die telt als niemand haar betwist, maar weegt weinig als iemand dat wel doet. Alleen een gekwalificeerde handtekening, zoals Youtrust die aanbiedt, staat gelijk aan een handgeschreven handtekening.",
      },
    ],
    sources: [
      { label: "Youtrust: Yousign wordt Youtrust", url: "https://youtrust.com/yousign-becomes-youtrust" },
      { label: "Youtrust: homepage", url: "https://www.youtrust.com/" },
      { label: "Youtrust: gratis abonnement", url: "https://youtrust.com/electronic-signature-freemium" },
      { label: "Youtrust: abonnementen", url: "https://youtrust.com/pricing-application" },
      { label: "Youtrust: elektronische handtekening", url: "https://youtrust.com/e-signature" },
      { label: "Youtrust: functies van de app", url: "https://youtrust.com/application" },
      { label: "Youtrust: beveiliging", url: "https://youtrust.com/security" },
      { label: "Youtrust: privacy", url: "https://youtrust.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Adobe Acrobat ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-adobe-fill-sign",
    competitor: "adobe-fill-sign",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat/online/sign-pdf.html",
    title: "Cachety of Adobe Acrobat: waarmee onderteken je een pdf?",
    metaTitle: "Adobe Acrobat of Cachety: een pdf ondertekenen",
    description:
      "Adobe Acrobat ondertekent pdf's online op Adobe-servers, Acrobat Sign stuurt ze naar meerdere mensen. Cachety werkt in je browser, zonder account.",
    intro:
      "Met Adobe Acrobat kun je op verschillende manieren ondertekenen: in de online tool “Pdf ondertekenen”, in de apps Acrobat Reader en Fill & Sign, en in het zakelijke Acrobat Sign. Cachety is een eenvoudige browsertool waarmee je zelf je document ondertekent, zonder dat het je apparaat verlaat.",
    verdict:
      "Moeten meerdere mensen tekenen, heb je een audittrail nodig of een geavanceerde of gekwalificeerde handtekening, dan is Adobe met Acrobat Sign de betere keuze. Voor een snelle eigen handtekening op een pdf bespaart Cachety je de upload en het inloggen. Het maakt een afbeelding van je handtekening op een platgemaakte pdf, dus een gewone elektronische handtekening.",
    table: [
      {
        criterion: "Waar het document wordt verwerkt",
        cachety: C.where,
        other: "Online tool: op servers van Adobe. Het bestand wordt gewist, tenzij je inlogt om het op te slaan; termijn en land noemt de pagina niet.",
        edge: "cachety",
      },
      {
        criterion: "Account",
        cachety: C.account,
        other: "Volgens de pagina moet je ingelogd zijn om het invulbare formulier af te ronden.",
        edge: "cachety",
      },
      {
        criterion: "Niveau van de handtekening",
        cachety: C.level,
        other: "Digitale handtekeningen op basis van een certificaat voldoen volgens Adobe aan de eIDAS-norm voor gekwalificeerde handtekeningen en andere internationale normen. Acrobat Sign biedt gewone, geavanceerde en gekwalificeerde handtekeningen, met meer dan 200 vertrouwensdienstverleners.",
        edge: "other",
      },
      {
        criterion: "Audittrail",
        cachety: C.audit,
        other: "Aanwezig in Acrobat Sign. In de online tool kunnen ondertekenverzoeken en audittrails volgens Adobe een betaald Acrobat-abonnement vereisen.",
        edge: "other",
      },
      {
        criterion: "Naar anderen sturen om te tekenen",
        cachety: C.sending,
        other: "Acrobat Sign: naar meerdere ondertekenaars, met sjablonen, ook rechtstreeks vanuit Microsoft Word, Teams, Salesforce of Workday.",
        edge: "other",
      },
      {
        criterion: "Handtekening en velden",
        cachety: C.fields,
        other: "Handtekening typen, tekenen of als afbeelding uploaden; initialen, tekst, vinkjes en lijnen.",
      },
      {
        criterion: "Op je telefoon",
        cachety: "In de browser op iPhone en Android, zonder app. Een foto van een papieren document wordt een A4-pagina.",
        other: "De app Acrobat Reader voor iOS en Android kan ondertekenen; de iOS-app Adobe Fill & Sign vult formulieren in vanaf een foto van het papier.",
      },
      {
        criterion: "Wie je gegevens verwerkt",
        cachety: "Alleen je browser: Cachety ontvangt je document nooit. Geen advertenties, geen trackers.",
        other: "Adobe; verwerkingsverantwoordelijke voor gebruikers in de EU is Adobe Systems Software Ireland Limited.",
      },
    ],
    body: [
      { type: "h2", text: "Wat Adobe biedt" },
      {
        type: "p",
        text: "In de online tool “Pdf ondertekenen” typ of teken je je handtekening of upload je er een afbeelding van, en je kunt initialen, tekst, vinkjes en lijnen toevoegen. Het bestand wordt daarbij op servers van Adobe verwerkt en gewist, tenzij je inlogt om het op te slaan. Wie documenten naar meerdere mensen wil sturen, met sjablonen en audittrails, gebruikt Acrobat Sign, dat ook werkt vanuit Word, Teams, Salesforce of Workday.",
      },
      {
        type: "p",
        text: "Wat niveaus betreft is Adobe breed: Acrobat Sign ondersteunt volgens Adobe gewone, geavanceerde en gekwalificeerde handtekeningen volgens eIDAS en werkt daarvoor met meer dan 200 vertrouwensdienstverleners. Cachety biedt daar niets van, alleen een afbeelding van je handtekening.",
      },
      { type: "h2", text: "Wat is de handtekening van Cachety waard?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "Waar Adobe sterker is" },
      {
        type: "list",
        items: [
          "Handtekeningen met certificaat: geavanceerd en gekwalificeerd.",
          "Acrobat Sign voor meerdere ondertekenaars, met sjablonen en audittrails.",
          "Werkt vanuit Microsoft Word, Teams, Salesforce en Workday.",
          "Apps voor iOS en Android, plus Fill & Sign voor papieren formulieren op de iPhone.",
        ],
      },
      { type: "h2", text: "Waar Cachety beter past" },
      {
        type: "list",
        items: [
          "Het document wordt niet geüpload, ook niet even.",
          "Niet inloggen, geen Adobe-account.",
          "Paraaf op elke pagina, watermerk en wachtwoord in dezelfde stap.",
          "Meerdere documenten tegelijk, ook foto's van papieren documenten.",
        ],
      },
      { type: "h2", text: "Zo doe je het met Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Je werkt al met Acrobat en wilt documenten rechtstreeks vanuit Word, Teams of Salesforce laten ondertekenen.",
      "Meerdere mensen moeten tekenen, met sjablonen en een audittrail.",
      "Je hebt een handtekening met certificaat nodig, geavanceerd of gekwalificeerd.",
    ],
    chooseCachety: [
      "Je wilt snel zelf een pdf ondertekenen, zonder ergens in te loggen.",
      "Het document mag niet naar andermans servers, ook niet even.",
      "Je wilt in één keer elke pagina paraferen, een watermerk toevoegen en een wachtwoord instellen.",
    ],
    faq: [
      {
        q: "Bewaart Adobe mijn pdf als ik online onderteken?",
        a: "Volgens Adobe wordt het bestand op Adobe-servers verwerkt en gewist, tenzij je inlogt om het op te slaan. Een termijn noemt de pagina niet. Bij Cachety wordt het document niet eens geüpload.",
      },
      {
        q: "Heb ik een Adobe-account nodig?",
        a: "Om een invulbaar formulier in de online tool af te ronden vraagt Adobe je in te loggen, en ondertekenverzoeken en audittrails kunnen volgens Adobe een betaald abonnement vereisen. Cachety heeft geen account nodig.",
      },
      {
        q: "Wat is het verschil tussen Acrobat en Acrobat Sign?",
        a: "Met de online tool en de Acrobat-apps onderteken je zelf. Acrobat Sign is het zakelijke product: het stuurt documenten naar meerdere ondertekenaars, met sjablonen en audittrails, en ondersteunt volgens Adobe gewone, geavanceerde en gekwalificeerde handtekeningen volgens eIDAS.",
      },
      {
        q: "Is een handtekening met Cachety juridisch bindend?",
        a: "Dat belooft Cachety niet. Het maakt een gewone elektronische handtekening: die telt als niemand haar betwist, maar weegt weinig als iemand dat wel doet. Wordt een gekwalificeerde handtekening gevraagd, gebruik dan een tool die die aanbiedt, zoals Acrobat Sign.",
      },
    ],
    sources: [
      { label: "Adobe: pdf online ondertekenen", url: "https://www.adobe.com/acrobat/online/sign-pdf.html" },
      { label: "Adobe: Acrobat Sign voor bedrijven", url: "https://www.adobe.com/acrobat/business/sign.html" },
      { label: "Adobe: eIDAS", url: "https://www.adobe.com/acrobat/business/compliance/eidas.html" },
      { label: "App Store: Adobe Fill & Sign", url: "https://apps.apple.com/cr/app/adobe-fill-sign/id950099951" },
      { label: "Adobe: privacybeleid", url: "https://www.adobe.com/privacy/policy.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-ilovepdf-sign",
    competitor: "ilovepdf-sign",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/sign-pdf",
    title: "Cachety of iLovePDF: een pdf ondertekenen, op hun server of op je apparaat?",
    metaTitle: "iLovePDF of Cachety: een pdf ondertekenen",
    description:
      "iLovePDF ondertekent pdf's op zijn servers en stuurt ze ook naar anderen. Cachety ondertekent op je apparaat, zonder upload. Een eerlijke vergelijking.",
    intro:
      "iLovePDF uit Barcelona heeft een eigen ondertekentool, ook bekend als iLoveSign: een gewone handtekening voor jezelf, een digitale handtekening en uitnodigingen aan anderen. Daarvoor wordt het document naar de servers van iLovePDF geüpload. Cachety ondertekent in de browser, het document blijft op je apparaat.",
    verdict:
      "Wil je anderen laten tekenen, met volgorde, herinneringen en audittrail, of heb je een digitale of geavanceerde handtekening nodig, dan is iLovePDF de betere keuze. Voor je eigen handtekening op een persoonlijk document vermijdt Cachety de upload en de advertenties. Het maakt een gewone elektronische handtekening, een afbeelding op een platgemaakte pdf.",
    table: [
      {
        criterion: "Waar het document wordt verwerkt",
        cachety: C.where,
        other: "Op de servers van iLovePDF; gegevens worden volgens de privacyverklaring binnen de EER verwerkt.",
        edge: "cachety",
      },
      {
        criterion: "Bewaartermijn",
        cachety: C.retention,
        other: "Bestanden worden binnen twee uur gewist; ondertekende documenten worden maximaal 5 jaar bewaard, de audittrail 10 jaar gearchiveerd.",
        edge: "cachety",
      },
      {
        criterion: "Account en gratis gebruik",
        cachety: "Geen account, gratis, zonder betaalde versie.",
        other: "Gratis: onbeperkt gewone handtekeningen voor jezelf, beperkt aantal verzoeken aan anderen, 50 MB bij ondertekenen. Voor verzoeken aan anderen is een account nodig.",
      },
      {
        criterion: "Advertenties",
        cachety: C.ads,
        other: "De gratis basisversie is volgens de prijspagina niet advertentievrij.",
        edge: "cachety",
      },
      {
        criterion: "Niveau van de handtekening",
        cachety: C.level,
        other: "Gewone handtekening; digitale handtekening (Premium) met een ondertekende, gecertificeerde hash en een gekwalificeerde tijdstempel; met sms-bevestiging een geavanceerde handtekening volgens eIDAS.",
        edge: "other",
      },
      {
        criterion: "Audittrail",
        cachety: C.audit,
        other: "Audittrail na afronding, 10 jaar gearchiveerd.",
        edge: "other",
      },
      {
        criterion: "Naar anderen sturen om te tekenen",
        cachety: C.sending,
        other: "Ja: “Alleen ik” of “Meerdere personen”, met volgorde, vervaldatum en herinneringen; met Premium 5 uitnodigingen per maand.",
        edge: "other",
      },
      {
        criterion: "Identiteitscontrole",
        cachety: C.identity,
        other: "Sms-bevestiging, optioneel een scan van een identiteitsbewijs.",
        edge: "other",
      },
      {
        criterion: "Handtekening en velden",
        cachety: C.fields,
        other: "Tekenen, typen of als afbeelding uploaden (PNG, JPG, SVG); initialen, datum, tekstvelden. Apps voor iOS en Android.",
      },
    ],
    body: [
      { type: "h2", text: "Wat er met je document gebeurt bij iLovePDF" },
      {
        type: "p",
        text: "iLovePDF verwerkt het document op zijn servers binnen de EER, is ISO/IEC 27001-gecertificeerd en wist bestanden binnen twee uur. Ondertekende documenten bewaart iLovePDF maximaal vijf jaar, de audittrail wordt tien jaar gearchiveerd. Voor een ondertekenplatform is dat logisch: het bewijs moet later nog beschikbaar zijn.",
      },
      {
        type: "p",
        text: "Wil je alleen zelf een verklaring of formulier ondertekenen, dan heb je dat bewijs niet per se nodig, en hoeft je document ook niet naar andermans server. Cachety zet de handtekening in je browser, zonder upload.",
      },
      { type: "h2", text: "Wat is de handtekening van Cachety waard?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "Waar iLovePDF sterker is" },
      {
        type: "list",
        items: [
          "Uitnodigingen aan anderen, met volgorde, vervaldatum en herinneringen.",
          "Een audittrail, tien jaar gearchiveerd.",
          "Digitale handtekening met gekwalificeerde tijdstempel, geavanceerde handtekening met sms-bevestiging.",
          "Apps voor iOS en Android.",
        ],
      },
      { type: "h2", text: "Waar Cachety beter past" },
      {
        type: "list",
        items: [
          "Het document verlaat je apparaat niet, dus er wordt ook niets bewaard.",
          "Geen advertenties, geen trackers.",
          "Van een foto van je handtekening wordt de achtergrond verwijderd en de inkt opnieuw ingekleurd.",
          "Paraaf op elke pagina, watermerk en wachtwoord in dezelfde stap.",
        ],
      },
      { type: "h2", text: "Zo doe je het met Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Anderen moeten tekenen, met volgorde, vervaldatum en herinneringen.",
      "Je hebt een audittrail nodig, of een digitale handtekening met gekwalificeerde tijdstempel.",
      "Er wordt een geavanceerde handtekening met sms-bevestiging of een scan van je identiteitsbewijs gevraagd.",
      "Je gebruikt iLovePDF al voor andere pdf-taken.",
    ],
    chooseCachety: [
      "Je ondertekent zelf een persoonlijk document en wilt het niet uploaden.",
      "Je wilt een site zonder advertenties en zonder trackers.",
      "Je wilt elke pagina paraferen en een watermerk toevoegen, zonder account.",
    ],
    faq: [
      {
        q: "Uploadt iLovePDF mijn document om het te ondertekenen?",
        a: "Ja. iLovePDF verwerkt de gegevens binnen de EER en wist bestanden binnen twee uur; ondertekende documenten bewaart het maximaal vijf jaar. Bij Cachety wordt niets geüpload.",
      },
      {
        q: "Is ondertekenen bij iLovePDF gratis?",
        a: "Gewone handtekeningen voor jezelf zijn volgens iLoveSign gratis en onbeperkt, verzoeken aan anderen zijn beperkt, en de basisversie toont advertenties. De digitale en de geavanceerde handtekening horen bij Premium.",
      },
      {
        q: "Wat is het verschil tussen een gewone en een digitale handtekening bij iLovePDF?",
        a: "iLovePDF onderscheidt een gewone handtekening en een digitale handtekening (Premium). In de digitale worden volgens iLovePDF een ondertekende, gecertificeerde hash en een gekwalificeerde tijdstempel ingebed; met sms-bevestiging wordt het een geavanceerde handtekening volgens eIDAS. Cachety biedt alleen een afbeelding van je handtekening, dus een gewone elektronische handtekening.",
      },
    ],
    sources: [
      { label: "iLovePDF: pdf ondertekenen", url: "https://www.ilovepdf.com/sign-pdf" },
      { label: "iLovePDF: uitleg over ondertekenen", url: "https://www.ilovepdf.com/blog/how-to-add-a-signature-to-a-pdf-document-online-using-ilovepdf" },
      { label: "iLovePDF: prijzen", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLoveSign: prijzen", url: "https://www.ilovesign.com/esignature-pricing" },
      { label: "iLovePDF: beveiliging", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: privacy", url: "https://www.ilovepdf.com/help/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-smallpdf-sign",
    competitor: "smallpdf-sign",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/sign-pdf",
    title: "Cachety of Smallpdf: een pdf ondertekenen zonder account, maar waar?",
    metaTitle: "Smallpdf of Cachety: online een pdf ondertekenen",
    description:
      "Smallpdf ondertekent pdf's zonder account op servers in de EU en wist ze na een uur. Cachety ondertekent op je apparaat. Een eerlijke vergelijking.",
    intro:
      "Smallpdf uit Zürich is een van de bekendste pdf-websites. De tool “Pdf ondertekenen” werkt zonder account en zonder installatie; verzoeken aan anderen lopen via Sign.com. Het bestand gaat daarvoor naar de servers van Smallpdf. Cachety ondertekent in de browser, zonder upload.",
    verdict:
      "Allebei werken ze zonder account als je zelf tekent. Het verschil: Smallpdf verwerkt het bestand op zijn servers en wist het na een uur, Cachety uploadt het helemaal niet. Moeten anderen tekenen, met opvolging, digitaal zegel en voltooiingscertificaat, dan is Smallpdf met Sign.com de betere keuze; Cachety maakt alleen een gewone elektronische handtekening, een afbeelding op een platgemaakte pdf.",
    table: [
      {
        criterion: "Waar het document wordt verwerkt",
        cachety: C.where,
        other: "Op de servers van Smallpdf (Hetzner in de EU), via Cloudflare in de Verenigde Staten of Europa, met TLS-versleuteling.",
        edge: "cachety",
      },
      {
        criterion: "Bewaartermijn",
        cachety: C.retention,
        other: "Automatisch gewist na een uur, tenzij je het bestand opslaat in je Smallpdf-account.",
        edge: "cachety",
      },
      { criterion: "Account", cachety: C.account, other: "Voor ondertekenen geen account en geen installatie nodig." },
      {
        criterion: "Gratis gebruik",
        cachety: C.price,
        other: "Gratis met een dagelijkse downloadlimiet; Sign.com gratis voor een beperkt aantal documenten per maand.",
      },
      {
        criterion: "Advertenties en tracking",
        cachety: C.ads,
        other: "Met je toestemming: Google Analytics, remarketing van Google Ads, Facebook Pixel en LinkedIn, volgens de privacyverklaring.",
        edge: "cachety",
      },
      {
        criterion: "Niveau van de handtekening",
        cachety: C.level,
        other: "Sign.com noemt zijn handtekeningen “juridisch geldig en bindend volgens eIDAS-normen”, zonder een niveau te noemen.",
      },
      {
        criterion: "Zegel en certificaat",
        cachety: C.audit,
        other: "Via Sign.com: digitale zegels en een voltooiingscertificaat.",
        edge: "other",
      },
      {
        criterion: "Naar anderen sturen om te tekenen",
        cachety: C.sending,
        other: "Via Sign.com: handtekeningen aanvragen en de voortgang volgen.",
        edge: "other",
      },
      {
        criterion: "Handtekening en velden",
        cachety: C.fields,
        other: "Tekenen, typen of uploaden; handtekening, initialen, tekst en datum. App voor Android en iOS.",
      },
    ],
    body: [
      { type: "h2", text: "Wat er met je bestand gebeurt bij Smallpdf" },
      {
        type: "p",
        text: "Smallpdf maakt ondertekenen makkelijk: geen account, geen installatie, handtekening tekenen, typen of uploaden. Het bestand gaat daarvoor versleuteld naar servers van Hetzner in de EU, deels via Cloudflare in de Verenigde Staten of Europa, en wordt na een uur automatisch gewist, zolang je het niet in een account opslaat. Verwerkingsverantwoordelijke is Smallpdf AG in Zürich.",
      },
      {
        type: "p",
        text: "Cachety slaat die omweg over. De pagina wordt één keer geladen, daarna gebeurt alles in je browser, en het bestand gaat nergens heen. Analyse- of advertentiediensten zijn er ook niet.",
      },
      { type: "h2", text: "Wat is de handtekening van Cachety waard?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "Waar Smallpdf sterker is" },
      {
        type: "list",
        items: [
          "Via Sign.com handtekeningen van anderen aanvragen en de voortgang volgen.",
          "Digitale zegels en een voltooiingscertificaat.",
          "Een app voor Android en iOS.",
        ],
      },
      { type: "h2", text: "Waar Cachety beter past" },
      {
        type: "list",
        items: [
          "Het bestand wordt niet geüpload, ook niet voor een uur.",
          "Geen analyse- of advertentiediensten, ook niet na toestemming.",
          "Een foto van een papieren document wordt meteen een ondertekende A4-pagina.",
          "De pagina's worden opnieuw opgebouwd: verborgen tekst, metadata, bijlagen en gps-gegevens van foto's verdwijnen.",
        ],
      },
      { type: "h2", text: "Zo doe je het met Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Anderen moeten tekenen, en je wilt de voortgang volgen.",
      "Je hebt een digitaal zegel of een voltooiingscertificaat nodig.",
      "Je gebruikt Smallpdf al voor andere pdf-taken.",
    ],
    chooseCachety: [
      "Je document bevat persoonsgegevens en mag je apparaat niet verlaten.",
      "Je wilt een site zonder analyse- en advertentiediensten.",
      "Je wilt in één keer elke pagina paraferen, een watermerk toevoegen en een wachtwoord instellen.",
    ],
    faq: [
      {
        q: "Bewaart Smallpdf mijn ondertekende pdf?",
        a: "Volgens Smallpdf worden bestanden na een uur automatisch gewist, tenzij je ze in je Smallpdf-account opslaat. Ze worden verwerkt op servers in de EU. Bij Cachety wordt het bestand niet geüpload.",
      },
      {
        q: "Is een handtekening met Smallpdf of Cachety juridisch bindend?",
        a: "Smallpdf noemt zijn handtekeningen zelf juridisch bindend, met de raad om altijd de lokale wetgeving te controleren; Sign.com spreekt van eIDAS-normen, zonder een niveau te noemen. Cachety maakt een gewone elektronische handtekening: die telt als niemand haar betwist, maar weegt weinig als iemand dat wel doet. Alleen een gekwalificeerde handtekening staat gelijk aan een handgeschreven handtekening.",
      },
      {
        q: "Is Smallpdf gratis?",
        a: "Smallpdf is gratis te gebruiken, met een dagelijkse downloadlimiet; Sign.com is gratis voor een beperkt aantal documenten per maand. Cachety is gratis, zonder betaalde versie.",
      },
    ],
    sources: [
      { label: "Smallpdf: pdf ondertekenen", url: "https://smallpdf.com/sign-pdf" },
      { label: "Smallpdf: elektronische handtekening", url: "https://smallpdf.com/sign" },
      { label: "Smallpdf: prijzen", url: "https://smallpdf.com/pricing" },
      { label: "Sign.com voor Smallpdf", url: "https://sign.com/smallpdf" },
      { label: "Smallpdf: privacyverklaring", url: "https://smallpdf.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
