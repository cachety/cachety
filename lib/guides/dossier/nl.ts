// Uitleg bij de Dossier-tool (nl): pdf's samenvoegen, foto's naar pdf,
// volgorde en draaiing van pagina's, verborgen gegevens verwijderen. Elke
// uitleg heeft tool: "dossier".
// Geschreven voor lezers in Nederland. Alleen platte tekst: geen links, geen
// HTML, geen markdown. Bedrijfsnamen zijn verzonnen.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// Deze uitleg beschrijft de Dossier-tool (docs/prd-dossier.md) zoals die is
// uitgebracht, met onderdelen, foto's rechtzetten en een eigen grootte. De
// aangehaalde knoppen (“Eén pdf”, “Splitsen in meerdere bestanden”,
// “Rechtzetten en bijsnijden”, “Anders…” en de overige) zijn gecontroleerd
// tegen het blok `dossier` in lib/locales/nl/strings.ts: houd ze gelijk.

import type { Guide } from "../types";

const UPDATED = "2026-11-19";

/** Adres van de tool, zonder schema geschreven (de uitleg bevat geen links). */
const TOOL = "cachety.com/nl/dossier";

const NOT_UPLOADED =
  "Cachety werkt in je browser. Er is geen server die je bestanden ontvangt, en de pagina verbiedt je browser om contact te maken met een andere website. Controleer het zelf: laad de pagina, zet vliegtuigmodus aan, en alles blijft werken. Het is gratis, zonder account, en de code is open source.";

const PIXELS =
  "Om verborgen gegevens te verwijderen, bouwt Cachety elke pagina opnieuw op als afbeelding. De tekst in de nieuwe pdf is daardoor niet te selecteren of te doorzoeken, en een pdf met alleen tekst kan groter uitvallen dan het origineel. Je originele bestanden worden niet gewijzigd: bewaar ze.";

export const DOSSIER_GUIDES_NL: Guide[] = [
  // ───────────────────────────── Samenvoegen ─────────────────────────────
  {
    slug: "pdf-samenvoegen-zonder-uploaden",
    topic: "merge",
    tool: "dossier",
    title: "Zo voeg je pdf-bestanden samen tot één pdf zonder ze te uploaden",
    metaTitle: "Pdf samenvoegen zonder uploaden: gratis, in je browser",
    description:
      "Voeg pdf's en foto's samen tot één pdf in je browser. Zet de pagina's op volgorde, blijf onder een maximale grootte en upload niets. Gratis, geen account.",
    intro:
      "“Wilt u alles als één pdf aanleveren?” De meeste gratis tools om pdf's samen te voegen beginnen met het uploaden van je bestanden naar hun servers. Gaat het om je paspoort, je loonstroken en je bankafschriften, dan kan het ook anders: op je eigen apparaat.",
    example: "Huuraanvraag, Makelaardij De Linde, 18-11-2026",
    body: [
      { type: "h2", text: "Waarom online samenvoegen geen kleinigheid is" },
      {
        type: "p",
        text: "De documenten die mensen samenvoegen, zijn zelden vakantiefoto's. Het zijn de papieren waar een makelaar, een bank, een werkgever of een overheidsinstantie om heeft gevraagd: een identiteitsbewijs, een inkomensbewijs, een bewijs van je adres. Die in één keer naar een website sturen waar je weinig van weet, alleen om ze aan elkaar te zetten, is een risico dat je niet hoeft te nemen.",
      },
      { type: "h2", text: "Je bestanden samenvoegen met Cachety" },
      {
        type: "steps",
        items: [
          `Open ${TOOL} in je browser, op een computer of een telefoon. Er is niets te installeren en je hoeft geen account aan te maken.`,
          "Voeg je bestanden toe: pdf's en foto's door elkaar (JPG, PNG, HEIC-foto's van een iPhone en meer). Een foto wordt een pagina.",
          "Ga naar de pagina's. Elke pagina van elk bestand wordt als kleine afbeelding getoond. Sleep een pagina om die te verplaatsen, ook van het ene document naar het andere. Draai een pagina die op zijn kant ligt en verwijder de pagina's die je niet wilt.",
          "Kies “Eén pdf”. Heeft de website waar je het bestand naartoe stuurt een maximale grootte, kies die dan: 1, 2, 5 of 10 MB, of “Anders…” voor een limiet van 0,5 tot 50 MB. Cachety zegt vóór het downloaden of het bestand past en leesbaar blijft.",
          "Controleer het voorbeeld, geef het bestand een naam en download het.",
        ],
      },
      {
        type: "tip",
        text: "Voordat je downloadt, kun je een rekeningnummer of iets anders afdekken dat de ontvanger niet nodig heeft. In een pdf met tekst wijst Cachety de rekening- en kaartnummers aan die het vindt. Het afgedekte gebied wordt uit het bestand verwijderd, niet alleen bedekt.",
      },
      { type: "h2", text: "Eén bestand per soort document" },
      {
        type: "p",
        text: "Sommige websites willen niet één groot bestand, maar één bestand per soort document: identiteitsbewijs, loonstroken, adresbewijs. Vink “Splitsen in meerdere bestanden” aan, open dan het menu van een pagina en kies “Nieuw onderdeel hier” op de plek waar een nieuw bestand moet beginnen. Geef elk onderdeel een naam: dat wordt de naam van het bestand. “Eén pdf per onderdeel” is dan geselecteerd, en je downloadt alle bestanden in één keer in een ZIP-archief. De maximale grootte geldt dan per bestand.",
      },
      { type: "h2", text: "Wat er met je bestanden gebeurt" },
      { type: "p", text: NOT_UPLOADED },
      { type: "h2", text: "Hoe de nieuwe pdf eruitziet" },
      { type: "p", text: PIXELS },
      {
        type: "p",
        text: "De goede kant daarvan: het nieuwe bestand bevat minder dan de originelen. Geen naam van de auteur, geen verborgen tekst, geen bijlagen en geen gps-locatie van je foto's. Wat de ontvanger ziet, is alles wat er is.",
      },
      {
        type: "warning",
        text: "Moet de tekst van de samengevoegde pdf selecteerbaar en doorzoekbaar blijven, bijvoorbeeld voor een verslag of een scriptie, dan is Cachety niet de juiste tool. Gebruik een app op je computer die de originele pagina's samenvoegt zoals ze zijn, zoals Voorvertoning op een Mac.",
      },
      { type: "h2", text: "Een paar limieten om te kennen" },
      {
        type: "list",
        items: [
          "Tot 200 MB per bestand, 500 pagina's per pdf en 1.000 pagina's in totaal.",
          "Word- en Excel-bestanden worden niet geaccepteerd: sla ze eerst op als pdf (Afdrukken, dan Opslaan als pdf).",
          "Een beveiligde pdf kun je toevoegen: Cachety vraagt om het wachtwoord, op je eigen apparaat.",
          "Een watermerk en een wachtwoord op het nieuwe bestand zijn optioneel, en staan uit tot je ze aanzet.",
        ],
      },
    ],
    faq: [
      {
        q: "Worden mijn pdf's geüpload om ze samen te voegen?",
        a: "Nee. Het samenvoegen gebeurt in je browser, op je eigen apparaat. Cachety heeft geen server die je bestanden kan ontvangen.",
      },
      {
        q: "Kan ik pdf's en foto's samenvoegen?",
        a: "Ja. Voeg pdf's en foto's door elkaar toe. Elke foto wordt een pagina, en je zet alle pagina's in de volgorde die je wilt.",
      },
      {
        q: "Is de tekst na het samenvoegen nog te selecteren?",
        a: "Nee. Elke pagina wordt opnieuw opgebouwd als afbeelding, waardoor verborgen gegevens verdwijnen. Heb je selecteerbare tekst nodig, gebruik dan een app op je computer die de originele pagina's behoudt.",
      },
      {
        q: "Waarom is het samengevoegde bestand soms groter dan mijn bestanden?",
        a: "Een pdf met alleen tekst is heel licht, en een afbeelding van dezelfde pagina weegt meer. Kies een maximale grootte en Cachety verkleint de pagina's tot het bestand past.",
      },
      {
        q: "Werkt het op een telefoon?",
        a: "Ja, op iPhone en Android, in de browser. Je verplaatst pagina's met je vinger.",
      },
    ],
    updated: UPDATED,
  },

  // ───────────────────────────── Foto's naar pdf ─────────────────────────────
  {
    slug: "foto-naar-pdf-op-je-telefoon",
    topic: "photo-to-pdf",
    tool: "dossier",
    title: "Zo maak je van foto's van papieren documenten één pdf op je telefoon",
    metaTitle: "Foto's naar één pdf op je telefoon, zonder app",
    description:
      "Fotografeer je papieren en maak van de foto's één pdf in de browser van je telefoon. Geen app, geen upload, en klein genoeg voor een online formulier.",
    intro:
      "Een website wil een pdf en jij hebt alleen papier. Of je iPhone-foto wordt geweigerd vanwege het formaat. Je hebt geen scanner of scan-app nodig: de camera en de browser van je telefoon zijn genoeg.",
    example: "Aanmelding kinderopvang, Kindcentrum De Wilg, 18-11-2026",
    body: [
      { type: "h2", text: "Maak foto's die goed leesbaar zijn" },
      {
        type: "list",
        items: [
          "Leg het vel plat op een effen, donkere ondergrond, bij een raam. Gebruik geen flits: die geeft een witte vlek.",
          "Houd de telefoon recht boven het vel, zodat de randen evenwijdig lopen, en vul het beeld met de pagina. Een scheef genomen foto kun je achteraf rechtzetten.",
          "Maak één foto per pagina. Controleer of de kleine letters scherp zijn voordat je verdergaat.",
        ],
      },
      { type: "h2", text: "Van foto's naar één pdf" },
      {
        type: "steps",
        items: [
          `Open ${TOOL} in de browser van je telefoon. Je hoeft geen app te installeren.`,
          "Tik op het vak en kies je foto's. iPhone-foto's in HEIC-formaat werken zoals ze zijn.",
          "Ga naar de pagina's. Elke foto is een pagina geworden. Draai de pagina's die op hun kant liggen en sleep ze in de goede volgorde.",
          "Staat een foto scheef of zie je de tafel rond het vel, tik dan op de pagina en kies “Rechtzetten en bijsnijden”. Zet elke hoek op een hoek van het vel en kies dan “Toepassen”.",
          "Op dezelfde plek maakt “Achtergrond wit maken” grijs papier wit en haalt “Zwart-wit” de kleur weg. De pagina leest beter en wordt veel lichter. Met “Toepassen op alle foto's” doe je dat voor alle foto's tegelijk.",
          "Kies “Eén pdf” en kies, als het formulier een maximale grootte heeft, 1, 2, 5 of 10 MB, of “Anders…” voor een andere limiet.",
          "Controleer het voorbeeld en download de pdf. Die staat dan op je telefoon, klaar om mee te sturen.",
        ],
      },
      {
        type: "tip",
        text: "Je kunt foto's combineren met pdf's die je al hebt, zoals een loonstrook die je hebt gedownload. Alles komt in één bestand, in de volgorde die jij kiest.",
      },
      { type: "h2", text: "Waarom het formulier je foto weigerde" },
      {
        type: "p",
        text: "Online formulieren accepteren vaak alleen pdf, JPG of PNG, en beperken de grootte tot een paar megabytes. Een foto van een recente telefoon kan zwaarder zijn, en iPhones slaan foto's op als HEIC, een formaat dat veel websites niet kunnen lezen. Van de foto's één pdf met een maximale grootte maken lost beide problemen in één keer op.",
      },
      { type: "h2", text: "Je foto's blijven op je telefoon" },
      { type: "p", text: NOT_UPLOADED },
      {
        type: "p",
        text: "Een foto onthoudt ook waar en wanneer hij is gemaakt, en met welke telefoon. Cachety bouwt elke pagina opnieuw op als een nieuwe afbeelding, dus die verborgen informatie, ook de gps-locatie, zit niet in de pdf die je verstuurt.",
      },
      {
        type: "warning",
        text: "Een heel kleine maximale grootte en veel fotopagina's gaan niet altijd samen. Past het bestand niet zonder onleesbaar te worden, dan zegt Cachety dat voordat je downloadt. Probeer eerst “Zwart-wit”, haal daarna pagina's weg, splits het bestand in meerdere bestanden, of kies een hogere limiet als de website dat toestaat.",
      },
    ],
    faq: [
      {
        q: "Heb ik een scan-app nodig?",
        a: "Nee. Maak de foto's met de camera van je telefoon en open Cachety in de browser. Er wordt niets geïnstalleerd.",
      },
      {
        q: "Werken iPhone-foto's (HEIC)?",
        a: "Ja. HEIC-foto's worden op je apparaat gelezen en worden pagina's van de pdf, net als elke andere foto.",
      },
      {
        q: "Worden mijn foto's geüpload?",
        a: "Nee. Alles gebeurt in de browser van je telefoon. Er is geen server die je foto's ontvangt.",
      },
      {
        q: "Kan ik de tekst in de pdf doorzoeken of kopiëren?",
        a: "Nee. De pagina's zijn afbeeldingen: Cachety leest de tekst van een foto niet. Voor een formulier dat om een pdf vraagt, is dat zelden een probleem.",
      },
    ],
    updated: UPDATED,
  },

  // ───────────────────────────── Pagina's ─────────────────────────────
  {
    slug: "pdf-paginas-draaien-verplaatsen-verwijderen",
    topic: "pdf-pages",
    tool: "dossier",
    title: "Zo draai, verplaats of verwijder je pagina's in een pdf zonder hem te uploaden",
    metaTitle: "Pdf-pagina's draaien, verplaatsen of verwijderen, gratis",
    description:
      "Draai een gekantelde pagina, wijzig de volgorde of verwijder pagina's uit een pdf, in je browser. Gratis, geen account; het bestand blijft op je apparaat.",
    intro:
      "Een scan die ondersteboven is uitgekomen, een lege pagina in het midden, een contract waarvan je alleen pagina 1 en 7 nodig hebt: kleine klusjes, maar de meeste gratis tools willen dat je eerst het hele document uploadt. Zo doe je het op je eigen apparaat.",
    example: "Hypotheekaanvraag, Polderbank, 18-11-2026",
    body: [
      { type: "h2", text: "De pagina's in orde maken met Cachety" },
      {
        type: "steps",
        items: [
          `Open ${TOOL} in je browser, op een computer of een telefoon.`,
          "Voeg je pdf toe. Je kunt meerdere bestanden toevoegen, en ook foto's.",
          "Ga naar de pagina's. Elke pagina wordt als kleine afbeelding getoond, in de volgorde van het uiteindelijke bestand.",
          "Sleep een pagina om die te verplaatsen. Met de draaiknop draai je een pagina een kwartslag per keer. Met de verwijderknop haal je een pagina weg. Verwijder je de verkeerde pagina, dan haal je die terug met “Ongedaan maken”: die knop is een paar seconden te zien. Op een telefoon tik je op een pagina en zie je dezelfde acties in een menu.",
          "Kies “Eén pdf”, controleer het voorbeeld en download.",
        ],
      },
      {
        type: "tip",
        text: "Op een computer kan alles met het toetsenbord: Alt met de pijltjestoetsen verplaatst de geselecteerde pagina, R draait de pagina en Delete verwijdert die.",
      },
      { type: "h2", text: "Echt gedraaid, niet alleen een weergave-instelling" },
      {
        type: "p",
        text: "Veel tools zetten alleen een aantekening in de pdf: “toon deze pagina gedraaid”. Sommige pdf-lezers negeren die, en dan ligt de pagina bij de ontvanger weer op zijn kant. Cachety bouwt de pagina rechtop opnieuw op, dus de pagina ziet er overal hetzelfde uit.",
      },
      { type: "h2", text: "Verwijderde pagina's zijn echt weg" },
      {
        type: "p",
        text: "Een pagina die je weghaalt, zit helemaal niet in het nieuwe bestand. Hetzelfde geldt voor wat je in een pdf niet ziet: verborgen tekst, bijlagen, de naam van de auteur. Het nieuwe bestand wordt opgebouwd uit wat op elke pagina te zien is, en uit niets anders.",
      },
      { type: "h2", text: "Wat je van het resultaat kunt verwachten" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Wil je selecteerbare tekst, bladwijzers of formuliervelden behouden, gebruik dan een app op je computer die de originele pagina's bewerkt, zoals Voorvertoning op een Mac.",
      },
      { type: "h2", text: "Er wordt niets geüpload" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "Kan ik maar één pagina van een pdf draaien?",
        a: "Ja. Elke pagina heeft een eigen draaiknop. De andere pagina's veranderen niet.",
      },
      {
        q: "Kan ik een pagina van de ene pdf naar de andere verplaatsen?",
        a: "Ja. Voeg beide bestanden toe: alle pagina's staan dan bij elkaar, zijn vrij te verplaatsen en worden als één pdf opgeslagen.",
      },
      {
        q: "Kan ik een verwijderde pagina terughalen?",
        a: "Ja, met “Ongedaan maken”: die knop is na het verwijderen een paar seconden te zien. Heb je alle pagina's van een document verwijderd, dan staat in de lijst naast dat document “Pagina's terugzetten”. Daarna voeg je het bestand gewoon opnieuw toe: je originele bestand wordt nooit gewijzigd.",
      },
      {
        q: "Wordt mijn pdf geüpload?",
        a: "Nee. De pagina's worden in je browser getoond en opnieuw opgebouwd. Er is geen server die je bestand ontvangt.",
      },
    ],
    updated: UPDATED,
  },

  // ───────────────────────────── Metadata ─────────────────────────────
  {
    slug: "metadata-verwijderen-uit-pdf-of-foto",
    topic: "metadata",
    tool: "dossier",
    title: "Zo verwijder je metadata en verborgen gegevens uit een pdf of foto voordat je die verstuurt",
    metaTitle: "Metadata verwijderen uit een pdf of foto, zonder upload",
    description:
      "Een pdf of foto bevat meer dan je ziet: auteur, datums, verborgen tekst, gps-locatie. Verwijder alles voor het versturen, in je browser, zonder upload.",
    intro:
      "Het bestand dat je verstuurt, zegt meer dan de pagina laat zien. Een pdf kan de auteur en de gebruikte software noemen, en tekst bewaren waarvan je dacht dat die weg was. Een foto kan precies zeggen waar hij is gemaakt. Dit zit er in een bestand verborgen, en zo verstuur je een schone kopie.",
    example: "Schademelding, Noorderlicht Verzekeringen, 18-11-2026",
    body: [
      { type: "h2", text: "Wat een bestand ongemerkt meedraagt" },
      {
        type: "list",
        items: [
          "In een pdf: de naam van de auteur, de titel, de gebruikte software, de datums waarop het bestand is gemaakt en gewijzigd.",
          "Ook in een pdf: een laag selecteerbare tekst, opmerkingen, links, bijgevoegde bestanden, formuliergegevens, en soms tekst die onder een zwart blok zit.",
          "In een foto: de datum, het merk van de telefoon en heel vaak de gps-locatie van de plek waar hij is gemaakt.",
        ],
      },
      {
        type: "p",
        text: "Niets daarvan zie je als je naar de pagina kijkt. Alles is in een paar klikken te lezen door de ontvanger van het bestand, of door iedereen naar wie het wordt doorgestuurd.",
      },
      { type: "h2", text: "Een schone kopie maken met Cachety" },
      {
        type: "steps",
        items: [
          `Open ${TOOL} in je browser. Je hebt geen account nodig.`,
          "Voeg je pdf of je foto's toe.",
          "Ga naar de pagina's en controleer of ze in de goede volgorde staan. Verwijder de pagina's die je niet wilt versturen.",
          "Kies “Eén pdf” en download het bestand.",
          "Verstuur het nieuwe bestand, niet het origineel.",
        ],
      },
      { type: "h2", text: "Hoe het opschonen werkt" },
      {
        type: "p",
        text: "Cachety probeert niet elk verborgen gegeven één voor één op te sporen en te wissen. Het bouwt elke pagina opnieuw op als een afbeelding van wat je ziet, en maakt van die afbeeldingen een nieuwe pdf. Wat niet zichtbaar was op de pagina, zit niet in het nieuwe bestand: geen auteur, geen verborgen tekst, geen bijlage, geen script, geen link, geen gps-locatie.",
      },
      {
        type: "tip",
        text: "Wil je een bestand controleren, open dan de eigenschappen in je pdf-lezer en probeer de tekst op een pagina te selecteren. In een kopie van Cachety zijn de eigenschappen leeg en is er niets te selecteren.",
      },
      { type: "h2", text: "De prijs die je betaalt" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Opschonen verwijdert wat verborgen is, niet wat op de pagina staat. Een naam, een rekeningnummer of een streepjescode die te zien is, staat er nog. Dek die af voordat je downloadt: het afgedekte gebied wordt echt verwijderd.",
      },
      { type: "h2", text: "Je bestand wordt niet geüpload om het op te schonen" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "Verwijdert het de gps-locatie uit mijn foto's?",
        a: "Ja. De pagina wordt opnieuw opgebouwd als een nieuwe afbeelding in een pdf, en de verborgen informatie van de foto, ook de locatie, gaat niet mee.",
      },
      {
        q: "Verwijdert het de naam van de auteur uit een pdf?",
        a: "Ja. De nieuwe pdf wordt gemaakt van afbeeldingen van de pagina's en neemt de eigenschappen van het originele bestand niet over.",
      },
      {
        q: "Kan ik de tekst selecteerbaar houden en alleen de metadata verwijderen?",
        a: "Niet met Cachety. Het verwijdert alle verborgen gegevens door de pagina's opnieuw op te bouwen als afbeeldingen. Wil je selecteerbare tekst behouden, gebruik dan de functie om verborgen informatie te verwijderen in een pdf-editor op je computer.",
      },
      {
        q: "Is het resultaat een pdf of een foto?",
        a: "Een pdf. Een foto wordt een pagina van de pdf.",
      },
    ],
    updated: UPDATED,
  },
];
