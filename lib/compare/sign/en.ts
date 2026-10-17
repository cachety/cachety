import type { Comparison } from "../types";

// Comparatifs de l'outil de signature (en). Même règle éditoriale que les
// comparatifs du filigrane (lib/compare/types.ts) ; chaque entrée porte tool: "sign".
// Written for readers in the United Kingdom (en-GB). Plain text only.
// Every claim about another tool is backed by a page listed in its `sources`,
// read on the `checked` date. Prices change often, so none are quoted here.

const CHECKED = "2026-10-17";
const UPDATED = "2026-10-17";

// Shared wording for the Cachety column.
const CACHETY = {
  where: "In your browser, on your own device. Nothing is uploaded.",
  account: "None.",
  free: "Free, with no paid tier.",
  level: "What is commonly called a simple electronic signature: an image of your signature placed on the page.",
  audit: "None: no certificate, no audit trail, no timestamp.",
  send: "No. One signer: you. You send the signed file yourself.",
  identity: "None.",
  retention: "Nothing is stored. Your signature only exists in the tab's memory.",
  trackers: "No ads and no trackers.",
  mobile: "Works in a phone browser. Nothing to install.",
  styles: "Draw, type or upload a photo of your signature. Date, place and a note underneath, initials on every page, all optional.",
  output:
    "A flattened PDF: pages are rebuilt from pixels, and hidden text, metadata and attachments are removed. A SHA-256 fingerprint is shown after download.",
};

const LEGAL: Comparison["body"][number] = {
  type: "p",
  text: "A signature you draw, type or upload and place on the page is what is commonly called a simple electronic signature. It counts if nobody disputes it, and it is usually accepted for everyday documents. But an image of a signature, like a scanned one, is easy to dispute, and then it carries little weight on its own: whoever relies on the document must prove who signed it. Only a qualified signature, made with a certificate from a qualified provider, is presumed reliable. This is not legal advice.",
};

const NOT_FOR: Comparison["body"][number] = {
  type: "warning",
  text: "Cachety is not the right tool when an advanced or qualified signature is required, when you need an audit trail or several signers, for a will or a deed, or when the other party insists on a specific signing platform. In those cases, use what they ask for.",
};

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "How to sign a document with Cachety" },
  {
    type: "steps",
    items: [
      "Open cachety.com/en/sign in your browser, on a computer or a phone. There is nothing to install and no account to create.",
      "Add your PDF, or a photo of a paper document (JPG, PNG or HEIC). A photo becomes a page that fits an A4 sheet. You can add several documents at once.",
      "Draw your signature with a finger or the mouse, type your name, or upload a photo of your signature on white paper. Add the date, the place or a short note underneath if you wish.",
      "Drag the signature onto the line and resize it. Tick ‘Also initial every page’ if you are asked to.",
      "Check the preview and download the signed PDF. Keep the fingerprint shown after the download with your records.",
    ],
  },
];

const FAQ_VALID = (other?: string) => ({
  q: "Is a Cachety signature legally valid?",
  a: `It is what is commonly called a simple electronic signature: an image of your signature on the page. It counts if nobody disputes it, and it is usually accepted for everyday documents. If it is disputed, it carries little weight on its own. When a contract really matters, or the other party asks for it, use a service that offers advanced or qualified signatures${other ? `, such as ${other}` : ""}. This is not legal advice.`,
});

export const SIGN_COMPARISONS_EN: Comparison[] = [
  // ───────────────────────────── DocuSign ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-docusign",
    competitor: "docusign",
    competitorName: "DocuSign",
    competitorUrl: "https://www.docusign.com/",
    title: "Cachety vs DocuSign: which should you use to sign a document?",
    metaTitle: "DocuSign Alternative to Sign a PDF Yourself, Free",
    description:
      "DocuSign sends contracts for signature, with an audit trail. Cachety lets you sign a PDF yourself, in your browser, free and with no account.",
    intro:
      "DocuSign is the best-known e-signature platform. It is built to send a document to other people for signature and to keep a record of who signed and when. Cachety does a smaller job: it lets you sign a document yourself, in your browser, without uploading it or creating an account.",
    verdict:
      "These tools do different jobs. For a contract with several signers, an audit trail, identity checks or an advanced or qualified signature, DocuSign is the better choice, and Cachety cannot do any of that. If you only need to put your own signature on a PDF and send it back, Cachety does it for free, with no account, and the document never leaves your device.",
    table: [
      {
        criterion: "Where the document is processed",
        cachety: CACHETY.where,
        other: "In DocuSign's cloud. The document is uploaded and stored in one of five data-centre regions: the US, Canada, Europe, Australia or Japan.",
        edge: "cachety",
      },
      {
        criterion: "Account and free use",
        cachety: "Free, with no account and no paid tier.",
        other: "Senders need an account: a 30-day free trial, then a paid plan. People you send a document to can sign for free, without an account.",
        edge: "cachety",
      },
      {
        criterion: "Signature level",
        cachety: CACHETY.level,
        other: "Electronic signatures sealed with a digital certificate. Advanced signatures are offered, and qualified signatures as an add-on: DocuSign is a qualified trust service provider in Europe.",
        edge: "other",
      },
      {
        criterion: "Audit trail and certificate",
        cachety: CACHETY.audit,
        other: "A certificate of completion and an audit log with every signed document, on all plans.",
        edge: "other",
      },
      {
        criterion: "Sending to other signers",
        cachety: CACHETY.send,
        other: "Yes, in serial, parallel or mixed order, with automatic reminders, templates and bulk sending.",
        edge: "other",
      },
      {
        criterion: "Identity checks",
        cachety: CACHETY.identity,
        other: "SMS one-time passcode, phone check or government ID verification.",
        edge: "other",
      },
      {
        criterion: "How long documents are kept",
        cachety: CACHETY.retention,
        other: "Set by the customer, who can delete documents at any time.",
      },
      {
        criterion: "Signature styles and apps",
        cachety: CACHETY.styles + " " + CACHETY.mobile,
        other: "A style generated from your name, a drawn signature or an uploaded image. Apps for iOS and Android.",
      },
      {
        criterion: "What you get",
        cachety: CACHETY.output,
        other: "A document digitally sealed with public key infrastructure (PKI), with its certificate of completion.",
      },
    ],
    body: [
      { type: "h2", text: "Two tools for two different jobs" },
      {
        type: "p",
        text: "DocuSign eSignature is a platform for sending documents. You upload a contract, add fields such as signatures, initials, checkboxes or dropdowns, choose who signs and in what order, and DocuSign emails each person, sends reminders and collects the signatures. At the end, the document is digitally sealed and comes with a certificate of completion that records the process. DocuSign offers signing in 44 languages and more than 1,100 integrations.",
      },
      {
        type: "p",
        text: "Cachety does not send anything to anyone. It is for the moment when someone has emailed you a PDF and asked you to sign it and send it back. You open the page, sign, download the signed copy and reply to the email. There is no account, no envelope and no record kept anywhere.",
      },
      { type: "h2", text: "Where DocuSign is better" },
      {
        type: "list",
        items: [
          "Several signers, in a set order, with reminders and tracking.",
          "A certificate of completion and an audit log that show who signed and when.",
          "Identity checks, such as an SMS code or a government ID document.",
          "Advanced and qualified electronic signatures, which carry far more weight if a signature is ever disputed.",
          "Templates, bulk sending, APIs and integrations with business software.",
        ],
      },
      { type: "h2", text: "Where Cachety is better" },
      {
        type: "list",
        items: [
          "Your document is never uploaded. Signing happens in your browser, and it still works in aeroplane mode once the page has loaded.",
          "No account and no trial: it is free and open source, with no ads and no trackers.",
          "The signed PDF is flattened, and hidden text, metadata and attachments are removed, so you do not send more than you mean to.",
          "A photo of a paper document works too. You can sign several documents in one go.",
        ],
      },
      { type: "h2", text: "What a Cachety signature is worth" },
      LEGAL,
      NOT_FOR,
      ...HOW_TO,
    ],
    chooseOther: [
      "You need to send a contract to one or more people and track who has signed.",
      "You need an audit trail, an identity check, or an advanced or qualified signature.",
      "Someone has sent you a document through DocuSign: you can sign it there for free, without an account.",
      "Your business wants templates, bulk sending or integrations with its other software.",
    ],
    chooseCachety: [
      "You only need to sign a PDF yourself and send it back by email.",
      "You would rather the document never left your device, and you do not want an account or a trial.",
      "You want the signed copy cleaned of hidden data, such as metadata and hidden text.",
    ],
    faq: [
      FAQ_VALID("DocuSign"),
      {
        q: "Do I need an account?",
        a: "Not with Cachety. With DocuSign, you need an account to send documents for signature, but not to sign a document that someone sends you.",
      },
      {
        q: "Can I send the document to someone else to sign?",
        a: "Not through Cachety. It has one signer: you. You download the signed PDF and send it yourself. The other person can sign their copy the same way, but nothing records who signed or when. If you need that, DocuSign is the right tool.",
      },
      {
        q: "Does DocuSign keep my documents?",
        a: "Documents are stored in DocuSign's cloud, in one of five regions, including Europe. The customer decides how long they are kept and can delete them at any time. Cachety stores nothing, because the document never leaves your device.",
      },
    ],
    sources: [
      {
        label: "DocuSign: add an electronic signature to a PDF for free",
        url: "https://www.docusign.com/learn/add-electronic-signature-pdf-free",
      },
      {
        label: "DocuSign: sign a document online for free",
        url: "https://www.docusign.com/en-gb/esignature/sign-document-online-free",
      },
      { label: "DocuSign eSignature plans", url: "https://ecom.docusign.com/plans-and-pricing/esignature" },
      {
        label: "DocuSign eSignature features",
        url: "https://www.docusign.com/en-ca/products/electronic-signature/features",
      },
      { label: "DocuSign eSignature", url: "https://www.docusign.com/products/electronic-signature" },
      {
        label: "DocuSign: customising your signature",
        url: "https://docusign.com/blog/quick-tip-customizing-your-signature",
      },
      {
        label: "DocuSign: qualified electronic signature",
        url: "https://www.docusign.com/en-gb/products/electronic-signature/qualified-electronic-signature",
      },
      {
        label: "DocuSign: advanced electronic signature",
        url: "https://www.docusign.com/en-gb/products/electronic-signature/advanced-electronic-signature",
      },
      { label: "DocuSign data residency", url: "https://www.docusign.com/privacy/data-residency" },
      { label: "DocuSign data management", url: "https://www.docusign.com/trust/privacy/data-mgmt-privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────── Youtrust (formerly Yousign) ───────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-yousign",
    competitor: "yousign",
    competitorName: "Youtrust (formerly Yousign)",
    competitorUrl: "https://www.youtrust.com/",
    title: "Cachety vs Youtrust (formerly Yousign): which should you use to sign a PDF?",
    metaTitle: "Youtrust (Yousign) Alternative to Sign a PDF Yourself",
    description:
      "Youtrust, formerly Yousign, sends documents for signature with an evidence file. Cachety lets you sign a PDF yourself, in your browser, with no account.",
    intro:
      "Youtrust, called Yousign until July 2026, is a French e-signature platform. It sends documents for signature and keeps a time-stamped evidence file. Cachety is a simpler tool: it lets you sign a PDF yourself, in your browser, with no account and no upload.",
    verdict:
      "For a contract that needs several signers, an evidence file, an identity check or an advanced or qualified signature, Youtrust is the better choice. Its free plan includes unlimited signing of your own documents, once you have an account, and every plan comes with a time-stamped evidence file. If you just want to put your signature on a PDF without creating an account or uploading the file, Cachety does that.",
    table: [
      {
        criterion: "Where the document is processed",
        cachety: CACHETY.where,
        other: "On Youtrust's servers, which are hosted exclusively in France.",
        edge: "cachety",
      },
      {
        criterion: "Account",
        cachety: CACHETY.account,
        other: "Required, including on the free plan.",
        edge: "cachety",
      },
      {
        criterion: "Free use",
        cachety: CACHETY.free,
        other: "A free, ad-free plan with unlimited signing of your own documents and two signature requests a month. Paid plans: One, Plus and Pro.",
      },
      {
        criterion: "Signature level",
        cachety: CACHETY.level,
        other: "Simple, advanced (with ID verification) or qualified (with video ID verification). Advanced and qualified are paid add-ons on the Plus and Pro plans.",
        edge: "other",
      },
      {
        criterion: "Evidence file",
        cachety: CACHETY.audit,
        other: "A time-stamped evidence file, archived for 10 years, on every plan.",
        edge: "other",
      },
      {
        criterion: "Sending to other signers",
        cachety: CACHETY.send,
        other: "Yes, with signer order, approvals, automatic reminders and templates.",
        edge: "other",
      },
      {
        criterion: "Identity checks",
        cachety: CACHETY.identity,
        other: "An optional one-time code, an SMS access code on the Plus plan, and ID checks for advanced and qualified signatures.",
        edge: "other",
      },
      {
        criterion: "How long data is kept",
        cachety: CACHETY.retention,
        other: "Signature evidence is kept for 10 years and identity data for 90 days, according to its privacy policy.",
      },
    ],
    body: [
      { type: "h2", text: "Yousign is now Youtrust" },
      {
        type: "p",
        text: "In its own announcement, the publisher says that Yousign is becoming Youtrust from July 2026. During the move, you may still see the name Yousign, or ‘Yousign (soon to be Youtrust)’, in the app, which is due to switch over by 2027. The company is Youtrust SAS, based in Caen, France.",
      },
      { type: "h2", text: "Two tools for two different jobs" },
      {
        type: "p",
        text: "Youtrust is built for sending. You upload a document, choose who signs and in what order, and Youtrust sends the invitations and reminders. Each signature comes with a time-stamped evidence file that is archived for 10 years. You can choose the level: simple, advanced with an ID check, or qualified with a video ID check. Youtrust is on the EU list of qualified trust service providers, and it connects to tools such as Zapier and HubSpot.",
      },
      {
        type: "p",
        text: "Cachety does not send, track or archive anything. It is for signing a document yourself: someone emails you a PDF, you sign it in your browser, and you send it back. Nothing is uploaded and nothing is kept.",
      },
      { type: "h2", text: "About image signatures" },
      {
        type: "p",
        text: "Youtrust says its eIDAS-compliant signatures are legally enforceable, unlike basic image-based or scanned signatures. That is its own claim, made to promote its product, but it points to a real limit. A Cachety signature is an image placed on the page, what is commonly called a simple electronic signature. It counts if nobody disputes it, and it is usually accepted for everyday documents. If it is disputed, it carries little weight on its own. Only a qualified signature is presumed reliable. This is not legal advice.",
      },
      NOT_FOR,
      { type: "h2", text: "Where Youtrust is better" },
      {
        type: "list",
        items: [
          "Sending a document to several people, in order, with reminders.",
          "A time-stamped evidence file for every signature, kept for 10 years.",
          "Advanced and qualified signatures, with ID or video ID checks.",
          "A free, ad-free plan for signing your own documents, with a time-stamped evidence file on every plan.",
        ],
      },
      { type: "h2", text: "Where Cachety is better" },
      {
        type: "list",
        items: [
          "No account at all: open the page and sign.",
          "Your document is never uploaded, not even to servers in France. It still works in aeroplane mode once the page has loaded.",
          "The signed PDF is flattened, and hidden text, metadata and attachments are removed.",
          "It is open source, with no ads and no trackers.",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "You need to send a document to other people for signature and follow its progress.",
      "You want a time-stamped evidence file, or an advanced or qualified signature.",
      "You sign your own documents often and want an evidence file for each one, and an account is fine for you.",
      "The other party has sent you a Youtrust or Yousign link: sign there.",
    ],
    chooseCachety: [
      "You only need to sign a PDF yourself and send it back.",
      "You do not want to create an account or upload the document anywhere.",
      "You want the signed copy cleaned of hidden data before you send it.",
    ],
    faq: [
      {
        q: "Are Yousign and Youtrust the same thing?",
        a: "Yes. The publisher announced that Yousign is becoming Youtrust from July 2026. The app may still show the name Yousign for a while, as the move is due to finish by 2027.",
      },
      FAQ_VALID("Youtrust"),
      {
        q: "Do I need an account?",
        a: "Not with Cachety. Youtrust asks you to create an account, even on its free plan.",
      },
      {
        q: "Can I send the document to someone else to sign?",
        a: "Not through Cachety. It has one signer: you. You download the signed PDF and send it yourself, and nothing records who signed or when. If you need to collect several signatures with an evidence file, use Youtrust.",
      },
    ],
    sources: [
      { label: "Youtrust: Yousign becomes Youtrust", url: "https://youtrust.com/yousign-becomes-youtrust" },
      { label: "Youtrust home page", url: "https://www.youtrust.com/" },
      { label: "Youtrust free plan", url: "https://youtrust.com/electronic-signature-freemium" },
      { label: "Youtrust plans", url: "https://youtrust.com/pricing-application" },
      { label: "Youtrust: electronic signature levels", url: "https://youtrust.com/e-signature" },
      { label: "Youtrust: how to sign a PDF", url: "https://youtrust.com/blog/how-to-sign-a-pdf" },
      { label: "Youtrust application features", url: "https://youtrust.com/application" },
      { label: "Youtrust security", url: "https://youtrust.com/security" },
      { label: "Youtrust privacy policy", url: "https://youtrust.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────────── Adobe Acrobat Sign ───────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-adobe-fill-sign",
    competitor: "adobe-fill-sign",
    competitorName: "Adobe Acrobat Sign",
    competitorUrl: "https://www.adobe.com/acrobat/online/sign-pdf.html",
    title: "Cachety vs Adobe Acrobat Sign: which should you use to sign a PDF?",
    metaTitle: "Adobe Fill & Sign Alternative: Sign a PDF Privately",
    description:
      "Adobe signs your PDF on its servers. Cachety signs it in your browser, free, with no account and nothing uploaded. An honest comparison.",
    intro:
      "Adobe offers two ways to sign a PDF: a free online Sign PDF tool, also known as Fill & Sign, and Acrobat Sign, its e-signature service for businesses. Cachety is closer to the first: it lets you sign a document yourself. The difference is that Cachety does it in your browser, without uploading the file.",
    verdict:
      "To send a document to several signers, keep an audit trail or use advanced or qualified signatures, Adobe Acrobat Sign is the better choice, and Cachety does none of that. To sign a PDF yourself, both work. Adobe's online tool handles the file on its servers, and its page says you must be signed in to complete the form. Cachety needs no account and never uploads the document.",
    table: [
      {
        criterion: "Where the document is processed",
        cachety: CACHETY.where,
        other: "On Adobe's servers. The file is deleted unless you sign in to save it. The page does not state a retention period or a country.",
        edge: "cachety",
      },
      {
        criterion: "Account",
        cachety: CACHETY.account,
        other: "The online tool's page says you must be signed in to complete the fillable form.",
        edge: "cachety",
      },
      {
        criterion: "Signature styles",
        cachety: CACHETY.styles,
        other: "Type, draw or upload an image of your signature. Initials, text, checkmarks and lines.",
      },
      {
        criterion: "Signature level",
        cachety: CACHETY.level,
        other: "With Acrobat Sign, any mix of simple, advanced or qualified electronic signatures, through more than 200 trust service providers.",
        edge: "other",
      },
      {
        criterion: "Audit trail",
        cachety: CACHETY.audit,
        other: "Offered with Acrobat Sign. The online tool says requesting signatures and accessing audit trails may require a paid Acrobat plan.",
        edge: "other",
      },
      {
        criterion: "Sending to other signers",
        cachety: CACHETY.send,
        other: "Yes, with Acrobat Sign: several signers, templates, and signing inside Microsoft Word, Teams, Salesforce and Workday.",
        edge: "other",
      },
      {
        criterion: "Phones",
        cachety: CACHETY.mobile,
        other: "The Acrobat Reader app for iOS and Android includes signing. The Adobe Fill & Sign app for iPhone can sign a photo of a paper form.",
      },
      {
        criterion: "Who handles your data",
        cachety: "Nobody else: there is no server that receives your documents. No ads and no trackers.",
        other: "For users in the EU, Adobe Systems Software Ireland Limited.",
      },
    ],
    body: [
      { type: "h2", text: "Fill & Sign and Acrobat Sign are not the same thing" },
      {
        type: "p",
        text: "Adobe's free online Sign PDF tool is for signing a document yourself. You open the page, add your PDF, then type, draw or upload an image of your signature, and add initials, text or checkmarks. Adobe says the file is handled by its servers and deleted unless you sign in to save it. On the iPhone, the Adobe Fill & Sign app can also sign a photo of a paper form.",
      },
      {
        type: "p",
        text: "Acrobat Sign is Adobe's e-signature service for businesses. It sends documents to several signers, uses templates, keeps audit trails and works inside tools such as Microsoft Word, Teams, Salesforce and Workday. For Europe, Adobe says it can deploy advanced or qualified signatures through more than 200 trust service providers.",
      },
      {
        type: "p",
        text: "Cachety only does the first job, signing yourself, but it does it in your browser. There is no upload and no Adobe account, or any other account.",
      },
      { type: "h2", text: "What Adobe says about legal value" },
      {
        type: "p",
        text: "Adobe says signatures made with its online tool are legally sufficient under the ESIGN Act and UETA, two US laws, and that its certificate-based digital signatures meet eIDAS qualified and other international standards. These are Adobe's own claims. A certificate-based signature is a different thing from an image of a signature.",
      },
      LEGAL,
      NOT_FOR,
      { type: "h2", text: "Where Adobe is better" },
      {
        type: "list",
        items: [
          "Sending a document to several signers, with templates and audit trails.",
          "Advanced and qualified signatures for contracts that must hold up if challenged.",
          "Signing inside the business software you already use.",
          "Apps for iPhone and Android, if you prefer an app to a web page.",
        ],
      },
      { type: "h2", text: "Where Cachety is better" },
      {
        type: "list",
        items: [
          "Your document is never uploaded. It still works in aeroplane mode once the page has loaded.",
          "No account to create or sign in to.",
          "The signed PDF is flattened, and hidden text, metadata and attachments are removed.",
          "Free and open source, with no ads and no trackers.",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "You need several people to sign the same document, with an audit trail.",
      "You need an advanced or qualified signature.",
      "Your business already uses Microsoft Word, Teams, Salesforce or Workday and wants signing built in.",
      "You already have an Adobe account and are happy for the file to go to Adobe's servers.",
    ],
    chooseCachety: [
      "You only need to sign a PDF yourself and send it back.",
      "You do not want to sign in to anything, or upload the document.",
      "You want hidden data removed from the signed copy.",
    ],
    faq: [
      FAQ_VALID("Adobe Acrobat Sign"),
      {
        q: "Do I need an account?",
        a: "Not with Cachety. Adobe's online Sign PDF page says you must be signed in to complete the fillable form.",
      },
      {
        q: "Can I send the document to someone else to sign?",
        a: "Not through Cachety. It has one signer: you. You download the signed PDF and send it yourself. To send a document to several signers with an audit trail, Adobe Acrobat Sign is the right tool.",
      },
      {
        q: "Does Adobe keep my file?",
        a: "Adobe's online tool says the file is handled by its servers and deleted unless you sign in to save it. The page does not say how long it stays there. With Cachety, the file never leaves your device.",
      },
    ],
    sources: [
      { label: "Adobe Acrobat online: Sign PDF", url: "https://www.adobe.com/acrobat/online/sign-pdf.html" },
      { label: "Adobe Acrobat Sign for business", url: "https://www.adobe.com/acrobat/business/sign.html" },
      { label: "Adobe Acrobat Sign and eIDAS", url: "https://www.adobe.com/acrobat/business/compliance/eidas.html" },
      { label: "Adobe Fill & Sign on the App Store", url: "https://apps.apple.com/cr/app/adobe-fill-sign/id950099951" },
      { label: "Adobe privacy policy", url: "https://www.adobe.com/privacy/policy.html" },
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
    title: "Cachety vs iLovePDF: which should you use to sign a PDF?",
    metaTitle: "iLovePDF Sign Alternative: Sign a PDF Without Uploading",
    description:
      "iLovePDF signs your PDF on its servers, with an audit trail and a Premium digital signature. Cachety signs it in your browser, free, with no account.",
    intro:
      "iLovePDF's Sign PDF tool, also sold as iLoveSign, can sign a document yourself or send it to other people to sign. Cachety only does the first, but in your browser, without uploading the file.",
    verdict:
      "To invite others to sign, get an audit trail or an advanced signature, iLovePDF is the better choice. Its Premium digital signature also embeds a certified hash and a qualified timestamp. To sign a PDF yourself and send it back, Cachety does it with no account, no ads, and nothing uploaded.",
    table: [
      {
        criterion: "Where the document is processed",
        cachety: CACHETY.where,
        other: "On iLovePDF's servers, within the European Economic Area. Uploaded files are deleted within two hours.",
        edge: "cachety",
      },
      {
        criterion: "Free use and ads",
        cachety: CACHETY.free + " " + CACHETY.trackers,
        other: "A free Basic plan that shows ads, with a 50 MB limit for Sign and a limited number of requests. Unlimited simple signatures of your own documents with iLoveSign.",
        edge: "cachety",
      },
      {
        criterion: "Account",
        cachety: CACHETY.account,
        other: "Needed to request signatures from other people.",
      },
      {
        criterion: "Signature level",
        cachety: CACHETY.level,
        other: "A simple signature, which becomes an eIDAS advanced signature with SMS validation. A Premium Digital Signature is also offered.",
        edge: "other",
      },
      {
        criterion: "Audit trail",
        cachety: CACHETY.audit,
        other: "An audit trail is generated when signing is complete, archived for 10 years with iLoveSign.",
        edge: "other",
      },
      {
        criterion: "Sending to other signers",
        cachety: CACHETY.send,
        other: "Yes: ‘Several people’, with signing order, expiry date and reminders.",
        edge: "other",
      },
      {
        criterion: "Identity checks",
        cachety: CACHETY.identity,
        other: "SMS validation, and an ID scan option.",
        edge: "other",
      },
      {
        criterion: "How long signed documents are kept",
        cachety: CACHETY.retention,
        other: "Signed documents are kept for a maximum of 5 years, according to its security page.",
      },
      {
        criterion: "What you get",
        cachety: CACHETY.output,
        other: "With the Premium Digital Signature, a signed certified hash and a qualified timestamp are embedded in the document.",
      },
    ],
    body: [
      { type: "h2", text: "Signing yourself, or asking others" },
      {
        type: "p",
        text: "iLovePDF's Sign PDF tool starts with a choice: ‘Only me’ or ‘Several people’. For yourself, you draw, type or upload your signature and initials, then add a date or text. To invite others, you need an account, and you can set a signing order, an expiry date and reminders. An audit trail is generated at the end. With SMS validation, iLovePDF says the signature becomes an eIDAS advanced signature, and it also offers an ID scan.",
      },
      {
        type: "p",
        text: "The work happens on iLovePDF's servers. Its security page says files are deleted within two hours and signed documents are kept for a maximum of 5 years. iLovePDF is a company based in Barcelona, it processes data within the European Economic Area, and it holds ISO/IEC 27001 certification.",
      },
      {
        type: "p",
        text: "Cachety only covers ‘Only me’. You sign in your browser, download the signed PDF and send it yourself. Nothing is uploaded and nothing is kept.",
      },
      { type: "h2", text: "What a Cachety signature is worth" },
      LEGAL,
      NOT_FOR,
      { type: "h2", text: "Where iLovePDF is better" },
      {
        type: "list",
        items: [
          "Sending a document to several people, with order, expiry date and reminders.",
          "An audit trail, archived for 10 years with iLoveSign.",
          "An advanced signature with SMS validation, and a digital signature with a qualified timestamp.",
          "Apps for iOS and Android.",
        ],
      },
      { type: "h2", text: "Where Cachety is better" },
      {
        type: "list",
        items: [
          "Your document is never uploaded. It still works in aeroplane mode once the page has loaded.",
          "Free, with no ads, no trackers and no account.",
          "The signed PDF is flattened, and hidden text, metadata and attachments are removed.",
          "Open source, so anyone can check what it does.",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "You need other people to sign the same document, with reminders and an audit trail.",
      "You need an advanced signature, or a digital signature with a qualified timestamp.",
      "You already use iLovePDF for other PDF jobs and are comfortable with the upload.",
    ],
    chooseCachety: [
      "You only need to sign a PDF yourself and send it back.",
      "You would rather the document never left your device, even for two hours.",
      "You want a free tool with no ads and no account.",
    ],
    faq: [
      FAQ_VALID("iLovePDF"),
      {
        q: "Do I need an account?",
        a: "Not with Cachety. iLovePDF asks for an account when you request signatures from other people.",
      },
      {
        q: "Can I send the document to someone else to sign?",
        a: "Not through Cachety. It has one signer: you. You download the signed PDF and send it yourself. iLovePDF can invite several signers and produce an audit trail.",
      },
      {
        q: "Does iLovePDF upload my document?",
        a: "Yes. The document is processed on iLovePDF's servers, within the European Economic Area. Its security page says files are deleted within two hours and signed documents are kept for a maximum of 5 years.",
      },
    ],
    sources: [
      { label: "iLovePDF: Sign PDF", url: "https://www.ilovepdf.com/sign-pdf" },
      {
        label: "iLovePDF guide: how to add a signature to a PDF",
        url: "https://www.ilovepdf.com/blog/how-to-add-a-signature-to-a-pdf-document-online-using-ilovepdf",
      },
      { label: "iLovePDF pricing", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLoveSign pricing", url: "https://www.ilovesign.com/esignature-pricing" },
      { label: "iLovePDF security", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF privacy policy", url: "https://www.ilovepdf.com/help/privacy" },
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
    title: "Cachety vs Smallpdf: which should you use to sign a PDF?",
    metaTitle: "Smallpdf Sign Alternative: Sign a PDF on Your Device",
    description:
      "Smallpdf signs your PDF on its servers and deletes it after an hour. Cachety signs it in your browser, free, with no account and no trackers.",
    intro:
      "Smallpdf's Sign PDF tool lets you draw, type or upload your signature without creating an account. To ask other people to sign, it points you to Sign.com, its e-signature service. Cachety only lets you sign a document yourself, but without uploading it.",
    verdict:
      "To request signatures from others, track them and get a certificate of completion, Smallpdf with Sign.com is the better choice. To sign a PDF yourself, both work without an account. The difference is where the file goes: Smallpdf processes it on its servers, while Cachety keeps it on your device.",
    table: [
      {
        criterion: "Where the document is processed",
        cachety: CACHETY.where,
        other: "On Smallpdf's servers, hosted by Hetzner in the EU, with Cloudflare in the US or Europe. Transfers are encrypted with TLS.",
        edge: "cachety",
      },
      {
        criterion: "How long the file is kept",
        cachety: CACHETY.retention,
        other: "Deleted automatically after one hour, unless you save it to a Smallpdf account.",
        edge: "cachety",
      },
      {
        criterion: "Account",
        cachety: CACHETY.account,
        other: "Not needed to sign a PDF yourself.",
      },
      {
        criterion: "Free use",
        cachety: CACHETY.free,
        other: "Free with a daily download limit. Sign.com's free plan includes a limited number of documents a month.",
      },
      {
        criterion: "Analytics and advertising trackers",
        cachety: "None.",
        other: "With your consent: Google Analytics, Google Ads remarketing, Facebook Pixel and LinkedIn, according to its privacy notice.",
        edge: "cachety",
      },
      {
        criterion: "Seal and certificate",
        cachety: CACHETY.audit,
        other: "Through Sign.com: digital seals and a certificate of completion.",
        edge: "other",
      },
      {
        criterion: "Sending to other signers",
        cachety: CACHETY.send,
        other: "Yes, through Sign.com, with tracking.",
        edge: "other",
      },
      {
        criterion: "Signature styles and apps",
        cachety: CACHETY.styles + " " + CACHETY.mobile,
        other: "Draw, type or upload your signature, and add initials, text and dates. Apps for Android and iOS.",
      },
    ],
    body: [
      { type: "h2", text: "Two services in one" },
      {
        type: "p",
        text: "On Smallpdf's Sign PDF page, you can sign a document yourself without an account or anything to install: draw, type or upload your signature, then add initials, text and dates. Requesting signatures from others, tracking them, digital seals and a certificate of completion come from Sign.com, Smallpdf's e-signature service.",
      },
      {
        type: "p",
        text: "In both cases, the document goes to Smallpdf's servers. Its sign page says files are deleted automatically after one hour, unless you save them to your Smallpdf account. Its privacy notice says processing uses Hetzner servers in the EU and Cloudflare in the US or Europe. The company is Smallpdf AG, based in Zürich.",
      },
      {
        type: "p",
        text: "Cachety does not send, track or store anything. You sign in your browser, download the signed PDF and send it yourself.",
      },
      { type: "h2", text: "Legal claims, and what they mean" },
      {
        type: "p",
        text: "Smallpdf describes its signatures as legally binding, and adds that you should always check your local laws. Sign.com says its signatures are legally valid and binding according to eIDAS standards, without naming a level. These are their own claims. What matters, if a signature is ever challenged, is its level: simple, advanced or qualified.",
      },
      LEGAL,
      NOT_FOR,
      { type: "h2", text: "Where Smallpdf is better" },
      {
        type: "list",
        items: [
          "Requesting signatures from others and tracking them, through Sign.com.",
          "Digital seals and a certificate of completion.",
          "Apps for Android and iOS.",
        ],
      },
      { type: "h2", text: "Where Cachety is better" },
      {
        type: "list",
        items: [
          "Your document is never uploaded, not even for an hour. It still works in aeroplane mode once the page has loaded.",
          "No analytics or advertising trackers, with or without consent.",
          "The signed PDF is flattened, and hidden text, metadata and attachments are removed.",
          "Free and open source.",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "You need to send a document to other people for signature and track it.",
      "You want a digital seal and a certificate of completion with the signed document.",
      "You already use Smallpdf for other PDF jobs and are comfortable with the upload.",
    ],
    chooseCachety: [
      "You only need to sign a PDF yourself and send it back.",
      "You would rather the document never left your device.",
      "You want a tool with no analytics or advertising trackers.",
    ],
    faq: [
      FAQ_VALID(),
      {
        q: "Do I need an account?",
        a: "No, for either tool, when you sign a PDF yourself. Smallpdf says no account or installation is required to sign.",
      },
      {
        q: "Can I send the document to someone else to sign?",
        a: "Not through Cachety. It has one signer: you. You download the signed PDF and send it yourself. Smallpdf offers this through Sign.com, with tracking and a certificate of completion.",
      },
      {
        q: "Does Smallpdf upload my document?",
        a: "Yes. The document is processed on Smallpdf's servers and deleted automatically after one hour, unless you save it to your account. Cachety does everything on your device.",
      },
    ],
    sources: [
      { label: "Smallpdf: Sign PDF", url: "https://smallpdf.com/sign-pdf" },
      { label: "Smallpdf: eSign", url: "https://smallpdf.com/sign" },
      { label: "Smallpdf pricing", url: "https://smallpdf.com/pricing" },
      { label: "Sign.com for Smallpdf", url: "https://sign.com/smallpdf" },
      { label: "Smallpdf privacy notice", url: "https://smallpdf.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
