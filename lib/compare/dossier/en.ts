import type { Comparison } from "../types";

// Comparisons for the Dossier tool (en): merging PDFs and photos into one
// file and getting it under a size limit. Same editorial rule as the other
// comparisons (lib/compare/types.ts); each entry carries tool: "dossier".
// Written for readers in the United Kingdom (en-GB). Plain text only.
// Every claim about another tool is backed by a page listed in its `sources`,
// read on the `checked` date. Prices change often, so none are quoted here.
//
// The Cachety column describes the Dossier tool as specified in
// docs/prd-dossier.md (Must scope). Publish with the tool, not before, and
// re-check the column against the shipped interface.

const CHECKED = "2026-11-18";
const UPDATED = "2026-11-18";

/** Address of the tool, written without a scheme. */
const TOOL = "cachety.com/en/dossier";

// Shared wording for the Cachety column.
const CACHETY = {
  where: "In your browser, on your own device. Nothing is uploaded.",
  kept: "Nothing is kept: there is no server that receives your files.",
  free: "Free, with no account, no paid tier and no daily limit. Up to 200 MB per file, 500 pages per PDF and 1,000 pages in total.",
  pages: "Every page of every file in one grid: move a page, even from one file to another, turn it or remove it.",
  size: "You pick a maximum size: 1, 2, 5 or 10 MB. Cachety says before the download whether the file will fit and stay readable.",
  output:
    "Each page is rebuilt as a picture. The text cannot be selected or searched, and a text-only PDF can come out bigger.",
  hidden: "Removed in every file: hidden text, author and other properties, attachments, links, and the GPS location of photos.",
  inputs: "PDFs and photos together, iPhone HEIC photos included. No Word, Excel or PowerPoint files.",
  offline: "Nothing to install. The page keeps working in aeroplane mode once it has loaded, on a phone or a computer.",
  ads: "No ads and no trackers. The code is open source.",
};

const PIXELS: Comparison["body"] = [
  { type: "h2", text: "What a file made by Cachety is like" },
  {
    type: "p",
    text: "Cachety does not join your original pages. It rebuilds each page as a picture and makes a new PDF from those pictures. This is how it removes what you cannot see: hidden text, the author's name, attachments, links and the GPS location of photos. The price is real: the text of the new file cannot be selected or searched, and a PDF that only held text can come out bigger than the original, unless you choose a maximum size.",
  },
  {
    type: "warning",
    text: "Cachety is not the right tool when the text must stay selectable or searchable, when you need bookmarks or form fields kept, when you want to add Word or Excel files, or when you need text recognition (OCR) on a scan.",
  },
];

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "How to make one PDF with Cachety" },
  {
    type: "steps",
    items: [
      `Open ${TOOL} in your browser, on a computer or a phone. There is nothing to install and no account to create.`,
      "Add your PDFs and photos. A photo becomes a page.",
      "Go to the pages: drag them into order, turn the sideways ones and remove the ones you do not want.",
      "Choose ‘One PDF’ and, if you were given a size limit, pick 1, 2, 5 or 10 MB.",
      "Check the preview, hide any detail the recipient does not need, then download the file.",
    ],
  },
];

const FAQ_UPLOADED = (other: string, answer: string) => ({
  q: `Are my files uploaded with Cachety or ${other}?`,
  a: `With Cachety, no: the work is done in your browser and there is no server that receives your files. ${answer}`,
});

const FAQ_TEXT = {
  q: "Is the text still selectable after merging with Cachety?",
  a: "No. Cachety rebuilds each page as a picture, which removes hidden data but also the selectable text. If you need the text, use a tool that joins the original pages.",
};

export const DOSSIER_COMPARISONS_EN: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-ilovepdf-merge",
    competitor: "ilovepdf-merge",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "Cachety vs iLovePDF: merging and compressing PDFs without uploading them",
    metaTitle: "iLovePDF Alternative to Merge PDFs Without Upload",
    description:
      "iLovePDF merges and compresses PDFs on its servers. Cachety does it in your browser: nothing is uploaded, and hidden data is removed. A fair comparison.",
    intro:
      "iLovePDF is one of the most used sets of online PDF tools, made in Barcelona. Its Merge and Compress tools process your files on its servers. Cachety does a narrower job on your own device: it puts PDFs and photos into one file, under a size limit, without uploading them.",
    verdict:
      "iLovePDF does more: Office files, text recognition, many files at once, and a paid desktop app that works offline. For that, it is the better choice. Cachety is the better choice when the files are personal documents you would rather not upload, when photos and PDFs must go into the same file, or when a form sets a size limit in megabytes.",
    table: [
      {
        criterion: "Where the files are processed",
        cachety: CACHETY.where,
        other: "On iLovePDF's servers for the website. The desktop app, on a paid plan, processes files on your computer.",
        edge: "cachety",
      },
      {
        criterion: "How long files are kept",
        cachety: CACHETY.kept,
        other: "Deleted automatically within two hours of being processed. A button on the download screen deletes them sooner.",
        edge: "cachety",
      },
      {
        criterion: "Account, free use and limits",
        cachety: CACHETY.free,
        other: "Free without registering, for a limited number of documents. Free merge: up to 100 files and 300 MB per task. Free compress: 5 files per task. A paid plan raises the limits.",
      },
      {
        criterion: "Putting pages in order",
        cachety: CACHETY.pages,
        other: "Merge reorders whole files. Sorting, deleting and rotating single pages is done in a separate tool, Organize PDF.",
        edge: "cachety",
      },
      {
        criterion: "Getting under a size limit",
        cachety: CACHETY.size,
        other: "Three compression levels: extreme, recommended and less. No size in megabytes to aim for.",
        edge: "cachety",
      },
      {
        criterion: "Photos and PDFs together",
        cachety: CACHETY.inputs,
        other: "In two steps on the website: convert the images to PDF first, then merge. Word, Excel and PowerPoint files have their own converters.",
      },
      {
        criterion: "What the new PDF is like",
        cachety: CACHETY.output,
        other: "Not described on the Merge page. A separate tool recognises text (OCR) to make a scan searchable.",
      },
      {
        criterion: "Hidden data",
        cachety: CACHETY.hidden,
        other: "Not documented for the website's tools. The desktop app can edit or clear a PDF's metadata.",
      },
      {
        criterion: "Apps and offline use",
        cachety: CACHETY.offline,
        other: "A desktop app for Windows and Mac that runs offline: its free tier is a PDF reader, and the tools need a paid plan. Apps for iOS and Android.",
      },
      {
        criterion: "Ads and trackers",
        cachety: CACHETY.ads,
        other: "The free plan shows ads; the paid plan removes them.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "A large online toolbox and a tool that stays on your device" },
      {
        type: "p",
        text: "On iLovePDF's website, your files are sent to its servers, processed there, and deleted automatically within two hours. You can delete them sooner from the download screen. iLovePDF says it holds the ISO/IEC 27001 certification and transfers files over an encrypted connection. The site is available in 26 languages.",
      },
      {
        type: "p",
        text: "Cachety only prepares a file to send: the PDFs and photos you were asked for, in order, in one PDF of the right size. Everything happens in your browser. There is no upload, so there is nothing to delete afterwards.",
      },
      { type: "h2", text: "Where iLovePDF is better" },
      {
        type: "list",
        items: [
          "It converts Word, Excel and PowerPoint files to PDF.",
          "It recognises text in scans (OCR), so a scanned PDF can become searchable.",
          "It takes large jobs: up to 100 files in a free merge.",
          "Its paid desktop app processes files on your computer, with the same tools as the website.",
        ],
      },
      { type: "h2", text: "Where Cachety is better" },
      {
        type: "list",
        items: [
          "Your files are never uploaded, for free, on a phone as well as on a computer.",
          "Photos and PDFs go into the same file in one step, and single pages can be moved, turned or removed in the same place.",
          "You choose a size in megabytes, the way online forms state their limits, and you are told before the download if it cannot be reached while staying readable.",
          "Hidden data is removed from every file, and there are no ads.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "You need to convert Word, Excel or PowerPoint files, or recognise the text of a scan.",
      "You have many files or very large PDFs to process in one go.",
      "You pay for iLovePDF and use its desktop app, which works on your computer.",
    ],
    chooseCachety: [
      "The files are ID documents, payslips or bank statements and you would rather not upload them.",
      "You need photos and PDFs in the same file, with the pages in your order.",
      "A form asks for one file under 1, 2, 5 or 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "iLovePDF",
        "With iLovePDF's website, yes: files are processed on its servers and deleted within two hours. Its desktop app processes files on your computer, on a paid plan."
      ),
      {
        q: "Can iLovePDF compress a PDF to an exact size?",
        a: "No. It offers three compression levels, and its own guide says no tool can promise an exact output size. With Cachety you pick 1, 2, 5 or 10 MB, and you are told before the download if the file cannot fit and stay readable.",
      },
      {
        q: "Does iLovePDF work offline?",
        a: "Its desktop app for Windows and Mac does, but the tools in it need a paid plan. Cachety is a web page that keeps working in aeroplane mode once it has loaded, for free.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "iLovePDF: Merge PDF", url: "https://www.ilovepdf.com/merge_pdf" },
      { label: "iLovePDF: Compress PDF", url: "https://www.ilovepdf.com/compress_pdf" },
      { label: "iLovePDF pricing and limits per tool", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF security", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF questions and answers", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF Desktop", url: "https://www.ilovepdf.com/desktop" },
      { label: "iLovePDF blog: web, desktop or mobile", url: "https://www.ilovepdf.com/blog/pdf-web-or-desktop" },
      { label: "iLovePDF blog: organising PDF pages", url: "https://www.ilovepdf.com/blog/organize-pdf-pages" },
      { label: "iLovePDF blog: merging PDF and JPG files", url: "https://www.ilovepdf.com/blog/merge-pdf-and-jpg-files-online" },
      { label: "iLovePDF blog: compressing a PDF to a specific size", url: "https://www.ilovepdf.com/blog/compress-pdf-to-specific-size" },
      {
        label: "iLovePDF blog: editing or removing PDF metadata",
        url: "https://www.ilovepdf.com/blog/edit-or-remove-pdf-metadata-windows-mac",
      },
      { label: "iLovePDF blog: 15 years of iLovePDF", url: "https://www.ilovepdf.com/blog/ilovepdf-15-years-anniversary-milestones" },
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
    title: "Cachety vs Smallpdf: merging and compressing PDFs without uploading them",
    metaTitle: "Smallpdf Alternative to Merge PDFs Without Upload",
    description:
      "Smallpdf merges and compresses PDFs in the cloud, with a daily free limit. Cachety does it in your browser, free, with no upload. A fair comparison.",
    intro:
      "Smallpdf is a well-known set of online PDF tools from Switzerland, with apps for phones and Windows. Its Merge and Compress tools work in the cloud. Cachety does a narrower job on your own device: it puts PDFs and photos into one file, under a size limit, without uploading them.",
    verdict:
      "Smallpdf does more: it accepts Word, Excel and PowerPoint files, recognises text in scans and has a Windows app that works offline. For that, it is the better choice. Cachety is the better choice when the files are personal documents you would rather not upload, when you have more than a couple of files to prepare in a day, or when a form sets a size limit in megabytes.",
    table: [
      {
        criterion: "Where the files are processed",
        cachety: CACHETY.where,
        other: "In the cloud. Files are uploaded to servers located in the European Union. The Windows desktop app handles files offline.",
        edge: "cachety",
      },
      {
        criterion: "How long files are kept",
        cachety: CACHETY.kept,
        other: "Deleted from the servers after one hour, unless you save them to your account.",
        edge: "cachety",
      },
      {
        criterion: "Account, free use and limits",
        cachety: CACHETY.free,
        other: "No sign-up needed. Free use has a daily download limit and a file size limit; a paid plan removes them.",
        edge: "cachety",
      },
      {
        criterion: "Putting pages in order",
        cachety: CACHETY.pages,
        other: "Merge rearranges, rotates and deletes pages. A separate Organize tool does the same on one PDF.",
      },
      {
        criterion: "Getting under a size limit",
        cachety: CACHETY.size,
        other: "Compression levels, not a size in megabytes. Basic compression is free; stronger levels are part of the paid plan.",
        edge: "cachety",
      },
      {
        criterion: "File types accepted",
        cachety: CACHETY.inputs,
        other: "PDF, Word, Excel, PowerPoint, JPG and PNG in Merge: other files are converted to PDF first. HEIC photos in JPG to PDF.",
        edge: "other",
      },
      {
        criterion: "What the new PDF is like",
        cachety: CACHETY.output,
        other: "Not described on the Merge page. Text recognition (OCR) is offered as a separate tool.",
      },
      {
        criterion: "Hidden data",
        cachety: CACHETY.hidden,
        other: "Not documented for Merge on the product or help pages.",
      },
      {
        criterion: "Apps and offline use",
        cachety: CACHETY.offline,
        other: "Apps for iOS and Android, and a Windows desktop app that works offline. The Mac desktop app is no longer supported.",
      },
    ],
    body: [
      { type: "h2", text: "A cloud toolbox and a tool that stays on your device" },
      {
        type: "p",
        text: "Smallpdf describes its Merge and Compress tools as cloud-based: your files are uploaded, processed on its servers, and deleted after one hour unless you save them to your account. Smallpdf says it is ISO/IEC 27001 certified and uses TLS encryption during file transfer. Its tools are available in 24 languages.",
      },
      {
        type: "p",
        text: "Cachety has one job here: turn the PDFs and photos someone asked you for into one clean file of the right size. Everything happens in your browser. There is no upload, so there is nothing to delete afterwards.",
      },
      { type: "h2", text: "Where Smallpdf is better" },
      {
        type: "list",
        items: [
          "It converts Word, Excel and PowerPoint files to PDF and merges them in one go.",
          "It offers text recognition (OCR), so a scan can become searchable.",
          "It has phone apps with a scanner, and a Windows app that handles files offline.",
          "An account lets you keep your documents online and find them on another device.",
        ],
      },
      { type: "h2", text: "Where Cachety is better" },
      {
        type: "list",
        items: [
          "Your files are never uploaded, on a phone as well as on a computer, with nothing to install.",
          "There is no daily limit and no paid plan.",
          "You choose a size in megabytes, the way online forms state their limits, and you are told before the download if it cannot be reached while staying readable.",
          "Hidden data is removed from every file, without a separate step.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "You need to add Word, Excel or PowerPoint files to the merged PDF.",
      "You need the text of a scan to be recognised (OCR).",
      "You use Windows and want an installed app that works offline.",
      "You want to keep your documents in an online account.",
    ],
    chooseCachety: [
      "The files are ID documents, payslips or bank statements and you would rather not upload them.",
      "A form asks for one file under 1, 2, 5 or 10 MB.",
      "You are on a phone and do not want to install an app or create an account.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Smallpdf",
        "With Smallpdf's online tools, yes: files are uploaded to its servers and deleted after one hour unless you save them to your account. Its Windows desktop app handles files offline."
      ),
      {
        q: "Can Smallpdf compress a PDF to an exact size?",
        a: "No. Smallpdf offers compression levels, and its own blog says the tool does not let you enter an exact size. With Cachety you pick 1, 2, 5 or 10 MB.",
      },
      {
        q: "Is Smallpdf free?",
        a: "Partly. Merge and basic compression are free with a daily download limit; stronger compression and unlimited use are part of the paid plan. Cachety is free, with no daily limit and no paid plan.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Smallpdf: Merge PDF", url: "https://smallpdf.com/merge-pdf" },
      { label: "Smallpdf: Compress PDF", url: "https://smallpdf.com/compress-pdf" },
      { label: "Smallpdf: Organize PDF", url: "https://smallpdf.com/organize-pdf" },
      { label: "Smallpdf: JPG to PDF", url: "https://smallpdf.com/jpg-to-pdf" },
      { label: "Smallpdf pricing and plan comparison", url: "https://smallpdf.com/pricing" },
      { label: "Smallpdf privacy notice", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf Trust Center", url: "https://smallpdf.com/trust-center" },
      { label: "Smallpdf apps and extensions", url: "https://smallpdf.com/download" },
      { label: "Smallpdf blog: compressing a PDF to a chosen size", url: "https://smallpdf.com/blog/compress-pdf-to-chosen-size" },
      { label: "About Smallpdf", url: "https://smallpdf.com/about" },
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
    title: "Cachety vs Adobe Acrobat online: merging and compressing PDFs",
    metaTitle: "Adobe Acrobat Alternative to Merge PDFs, No Upload",
    description:
      "Adobe's free online tools merge and compress PDFs on Adobe servers. Cachety does it in your browser, with no upload and no sign-in. A fair comparison.",
    intro:
      "Adobe invented the PDF, and its free Acrobat online tools merge and compress PDFs in any browser. The files are handled on Adobe's servers. Cachety does a narrower job on your own device: it puts PDFs and photos into one file, under a size limit, without uploading them.",
    verdict:
      "For PDFs whose text must stay as it is, Adobe's merge is the better choice: it combines files without reducing the quality of images, text or formatting, and takes up to 100 files. Its paid desktop app does far more than Cachety. Cachety is the better choice for personal documents you would rather not upload, for mixing photos and PDFs for free, and for meeting a size limit given in megabytes.",
    table: [
      {
        criterion: "Where the files are processed",
        cachety: CACHETY.where,
        other: "On Adobe's servers for the online tools. The Acrobat desktop app compresses files locally on your device.",
        edge: "cachety",
      },
      {
        criterion: "How long files are kept",
        cachety: CACHETY.kept,
        other: "Deleted from Adobe's servers unless you sign in to save them to your account. You can delete a file yourself after downloading it.",
        edge: "cachety",
      },
      {
        criterion: "Account, free use and limits",
        cachety: CACHETY.free,
        other: "Merge: up to 100 files of 500 pages each, with no watermark. Compress: free with limited use; unlimited use needs a paid plan.",
      },
      {
        criterion: "Putting pages in order",
        cachety: CACHETY.pages,
        other: "Files can be reordered before merging. Reorganising individual pages requires signing in.",
        edge: "cachety",
      },
      {
        criterion: "Getting under a size limit",
        cachety: CACHETY.size,
        other: "Three compression levels: high, medium and low. Files up to 2 GB.",
      },
      {
        criterion: "Photos and other file types",
        cachety: CACHETY.inputs,
        other: "The free merge takes PDFs. Combining PDFs with Word, Excel, PowerPoint or image files is part of Acrobat Pro. A separate tool turns images into a PDF, and you must sign in to download the result.",
      },
      {
        criterion: "What the new PDF is like",
        cachety: CACHETY.output,
        other: "Files are combined without compressing or reducing the quality of images, text or formatting.",
        edge: "other",
      },
      {
        criterion: "Hidden data",
        cachety: CACHETY.hidden,
        other: "Removing hidden information (‘sanitize’) and redaction are features of the paid Acrobat Pro.",
        edge: "cachety",
      },
      {
        criterion: "Apps and offline use",
        cachety: CACHETY.offline,
        other: "The free Acrobat Reader views, annotates, fills and signs. Editing, converting and compressing are in the paid desktop app. The Adobe Scan phone app stores scans in Adobe's cloud storage.",
      },
    ],
    body: [
      { type: "h2", text: "The reference for PDFs, and a small tool for one job" },
      {
        type: "p",
        text: "Adobe offers more than 25 free online tools. Merge PDFs takes up to 100 files and combines them without changing their quality. Compress PDF offers three levels. Both send your files to Adobe's servers, where they are deleted unless you sign in to save them. Adobe says files are encrypted in transit and at rest, and lists ISO 27001 and SOC 2 among its certifications for Acrobat on the web.",
      },
      {
        type: "p",
        text: "Cachety only prepares a file to send: the PDFs and photos you were asked for, in order, in one PDF of the right size. Everything happens in your browser, with no sign-in at any step.",
      },
      { type: "h2", text: "Where Adobe Acrobat is better" },
      {
        type: "list",
        items: [
          "The merged PDF keeps the quality of the original text, images and formatting.",
          "It handles large jobs: up to 100 files in a merge, and files up to 2 GB in the compressor.",
          "The paid desktop app edits text and images, converts files, compresses and redacts.",
          "If you already pay for Acrobat, everything is in one place, with your files in your Adobe account.",
        ],
      },
      { type: "h2", text: "Where Cachety is better" },
      {
        type: "list",
        items: [
          "Your files are never uploaded, and there is no sign-in at any point.",
          "Moving, turning and removing single pages is free and needs no account.",
          "Photos and PDFs go into the same file for free, iPhone HEIC photos included.",
          "Hidden data is removed from every file, a feature Adobe keeps for its paid Pro plan.",
          "You choose a size in megabytes and are told before the download whether it can be reached.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "The text of the merged PDF must stay selectable and searchable.",
      "You have dozens of files or very large PDFs to combine.",
      "You already pay for Acrobat, or you need to edit, convert or recognise text as well.",
    ],
    chooseCachety: [
      "The files are ID documents, payslips or bank statements and you would rather not upload them.",
      "You want to reorder, turn or remove pages without signing in.",
      "You need to mix photos and PDFs, and keep the result under 1, 2, 5 or 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Adobe Acrobat",
        "With Adobe's online tools, yes: files are handled on Adobe's servers and deleted unless you sign in to save them. The Acrobat desktop app works on your own device."
      ),
      {
        q: "Do I need an Adobe account to merge PDFs?",
        a: "Not to merge and download. Adobe asks you to sign in to reorganise individual pages, to share the file with a link, or to download a PDF made from images. Cachety has no account at all.",
      },
      {
        q: "Can Acrobat online remove metadata from a PDF?",
        a: "Removing hidden information is a feature of the paid Acrobat Pro. Cachety removes hidden data from every file it makes, by rebuilding the pages as pictures.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Adobe Acrobat: free online tools", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat: Merge PDFs", url: "https://www.adobe.com/acrobat/online/merge-pdf.html" },
      { label: "Adobe Acrobat: Compress PDF", url: "https://www.adobe.com/acrobat/online/compress-pdf.html" },
      { label: "Adobe Acrobat: JPG to PDF", url: "https://www.adobe.com/acrobat/online/jpg-to-pdf.html" },
      { label: "Adobe Acrobat: reorder PDF pages", url: "https://www.adobe.com/acrobat/online/rearrange-pdf.html" },
      { label: "Adobe Acrobat: delete PDF pages", url: "https://www.adobe.com/acrobat/online/delete-pdf-pages.html" },
      { label: "Adobe Acrobat Reader", url: "https://www.adobe.com/acrobat/pdf-reader.html" },
      { label: "Adobe Acrobat plans compared", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe Scan", url: "https://www.adobe.com/acrobat/mobile/scanner-app.html" },
      {
        label: "Adobe Acrobat Services security overview",
        url: "https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/doc-cloud/acrobat-dc-security-overview-ue.pdf",
      },
      { label: "Adobe compliance list", url: "https://www.adobe.com/trust/compliance/compliance-list.html" },
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
    title: "Cachety vs PDF24: merging and compressing PDFs without uploading them",
    metaTitle: "PDF24 Alternative to Merge PDFs Without Upload",
    description:
      "PDF24's online tools merge and compress PDFs on its servers; its Windows app works offline. Cachety works in any browser, with no upload. Compared.",
    intro:
      "PDF24 is a free German set of PDF tools. Its online tools process files on PDF24's servers, and its Windows program, PDF24 Creator, does the same work on your PC. Cachety works in the browser of any device and never uploads your files, but it does a narrower job.",
    verdict:
      "On a Windows computer, PDF24 Creator is hard to beat: it is free, it works offline and it joins the original pages, so the text stays as it was. On a phone, a Mac or a computer where you cannot install anything, PDF24 means its online tools, which upload your files. There, Cachety is the better choice for personal documents, and it lets you choose a size in megabytes.",
    table: [
      {
        criterion: "Where the files are processed",
        cachety: CACHETY.where,
        other: "Online tools: in the cloud, on PDF24's servers. PDF24 Creator (Windows): on your PC, with no upload.",
      },
      {
        criterion: "How long files are kept",
        cachety: CACHETY.kept,
        other: "Online: deleted automatically after one hour. They can also be removed by hand straight away.",
        edge: "cachety",
      },
      {
        criterion: "Account, free use and limits",
        cachety: CACHETY.free,
        other: "Free and without restriction, with no registration. Online, a file may be up to 1,000 MB and a job up to 10 GB.",
      },
      {
        criterion: "Putting pages in order",
        cachety: CACHETY.pages,
        other: "Files are reordered by drag and drop. A page mode shows the pages of all files. Turning and removing pages are separate tools.",
      },
      {
        criterion: "Getting under a size limit",
        cachety: CACHETY.size,
        other: "You set the resolution (DPI) and the image quality, with a grayscale option. There is no ‘compress to 5 MB’ option.",
        edge: "cachety",
      },
      {
        criterion: "File types accepted",
        cachety: CACHETY.inputs,
        other: "PDFs, images, Word documents and other files. iPhone HEIC photos are not supported in the merge tool.",
      },
      {
        criterion: "What the new PDF is like",
        cachety: CACHETY.output,
        other: "Pages are taken over as they are, not recreated: text, images and fonts keep their quality.",
        edge: "other",
      },
      {
        criterion: "Hidden data",
        cachety: CACHETY.hidden,
        other: "A separate tool removes the metadata of a PDF.",
      },
      {
        criterion: "Apps and offline use",
        cachety: CACHETY.offline,
        other: "PDF24 Creator brings all the tools offline, on Windows only. There is no Mac or Linux version yet, and no app in the phone app stores.",
      },
      {
        criterion: "Ads and trackers",
        cachety: CACHETY.ads,
        other: "The online tools are financed by advertising. The privacy policy names Google AdSense and Google Analytics.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Two ways to use PDF24" },
      {
        type: "p",
        text: "PDF24's online tools are free, need no registration and are paid for by advertising. They process your files on PDF24's servers: the transfer is encrypted, and the files are deleted after one hour. PDF24 is run by a company based in Berlin.",
      },
      {
        type: "p",
        text: "PDF24 Creator is different. It is a free Windows program that brings all the PDF24 tools to your PC, where files stay local and are not uploaded. If you use Windows and can install software, it gives you the privacy of Cachety and more features.",
      },
      { type: "h2", text: "Where PDF24 is better" },
      {
        type: "list",
        items: [
          "The merged PDF keeps the original pages, so the text stays selectable and the file stays light.",
          "It accepts Word documents and other files, and offers text recognition (OCR).",
          "On Windows, PDF24 Creator does all of this offline, for free.",
          "You can set the resolution and the image quality of the compression yourself.",
        ],
      },
      { type: "h2", text: "Where Cachety is better" },
      {
        type: "list",
        items: [
          "No upload on any device: a phone, a Mac, a Linux computer or a PC where you cannot install software.",
          "You choose a size in megabytes instead of trying settings until the file is small enough.",
          "iPhone HEIC photos are accepted as they are.",
          "Hidden data is removed from every file without a separate step.",
          "No ads and no trackers.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "You use Windows and can install PDF24 Creator: it works offline and keeps the original pages.",
      "The text of the merged PDF must stay selectable and searchable.",
      "You need to add Word documents or recognise the text of a scan.",
      "You want to set the resolution and image quality yourself.",
    ],
    chooseCachety: [
      "You are on a phone, a Mac or a computer where you cannot install software, and you would rather not upload your documents.",
      "A form asks for one file under 1, 2, 5 or 10 MB.",
      "Your photos come from an iPhone.",
    ],
    faq: [
      FAQ_UPLOADED(
        "PDF24",
        "With PDF24's online tools, yes: files are processed on its servers and deleted after one hour. With PDF24 Creator on Windows, no: files stay on your PC."
      ),
      {
        q: "Can PDF24 compress a PDF to a given size?",
        a: "Not directly. You set the resolution and the image quality, and PDF24's own guide says there is no ‘compress to 5 MB’ option. With Cachety you pick 1, 2, 5 or 10 MB.",
      },
      {
        q: "Does PDF24 work offline on a Mac or a phone?",
        a: "No. PDF24 Creator is for Windows only. On a Mac or a phone, PDF24 offers its online tools, which process files on its servers. Cachety works in the browser of any device without uploading.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "PDF24 Tools: Merge PDF", url: "https://tools.pdf24.org/en/merge-pdf" },
      { label: "PDF24 Tools: Compress PDF", url: "https://tools.pdf24.org/en/compress-pdf" },
      { label: "PDF24 Tools: Images to PDF", url: "https://tools.pdf24.org/en/images-to-pdf" },
      { label: "PDF24 Tools: Remove PDF metadata", url: "https://tools.pdf24.org/en/remove-pdf-metadata" },
      { label: "PDF24 Tools: questions and answers", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 Creator", url: "https://tools.pdf24.org/en/creator" },
      { label: "PDF24 help: merging PDF files", url: "https://help.pdf24.org/en/how-to-merge-pdf-files-with-pdf24/" },
      { label: "PDF24 help: compressing a PDF", url: "https://help.pdf24.org/en/compress-pdf-guide/" },
      { label: "PDF24 help: Mac, Linux and phones", url: "https://help.pdf24.org/en/pdf24-for-mac-linux-portable/" },
      { label: "PDF24 privacy policy", url: "https://www.pdf24.org/en/privacy-policy" },
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
    title: "Cachety vs Sejda: merging and compressing PDFs without uploading them",
    metaTitle: "Sejda Alternative to Merge PDFs Without Upload",
    description:
      "Sejda merges and compresses PDFs online, or on your computer with its desktop app, within free limits. Cachety works in your browser with no upload.",
    intro:
      "Sejda is a Dutch PDF toolbox with two faces: online tools that process files on its servers, and Sejda Desktop, an app for Mac, Windows and Linux that processes them on your computer. Both have free limits. Cachety works in the browser of any device, uploads nothing and has no hourly or daily limit, but it does a narrower job.",
    verdict:
      "Sejda's merge is richer: it keeps bookmarks, builds a table of contents and can print the file name at the foot of the pages. Sejda Desktop keeps files on your computer. Choose it when you need those options. Choose Cachety for personal documents on a phone or with nothing to install, for files beyond Sejda's free limits, and for a size limit given in megabytes.",
    table: [
      {
        criterion: "Where the files are processed",
        cachety: CACHETY.where,
        other: "Online: uploaded and processed on Sejda's servers. Sejda Desktop: on your computer, not uploaded.",
      },
      {
        criterion: "How long files are kept",
        cachety: CACHETY.kept,
        other: "Online: deleted automatically after 2 hours. A button deletes them sooner.",
        edge: "cachety",
      },
      {
        criterion: "Account, free use and limits",
        cachety: CACHETY.free,
        other: "No sign-up. Free online merge: up to 50 pages or 50 MB, 3 tasks per hour. Free compress: up to 200 pages or 100 MB. Free desktop: 3 tasks per day. A paid plan removes the limits.",
        edge: "cachety",
      },
      {
        criterion: "Putting pages in order",
        cachety: CACHETY.pages,
        other: "Files are reordered by drag and drop. A pages view deletes, reorders and duplicates pages before merging.",
      },
      {
        criterion: "Getting under a size limit",
        cachety: CACHETY.size,
        other: "Image quality and resolution settings, with a grayscale option. No size in megabytes to aim for.",
        edge: "cachety",
      },
      {
        criterion: "File types accepted",
        cachety: CACHETY.inputs,
        other: "PDFs and images such as JPG and PNG in the merge tool. HEIC images are not supported.",
      },
      {
        criterion: "Merge options",
        cachety: "None beyond the page order: no bookmarks, no table of contents.",
        other: "Bookmarks kept or created per file, a table of contents, blank pages for double-sided printing, the file name in the footer.",
        edge: "other",
      },
      {
        criterion: "Hidden data",
        cachety: CACHETY.hidden,
        other: "A separate tool edits a PDF's metadata.",
      },
      {
        criterion: "Apps and offline use",
        cachety: CACHETY.offline,
        other: "Sejda Desktop for Mac, Windows and Linux works offline, with the same features as the online service.",
      },
    ],
    body: [
      { type: "h2", text: "Online or on your computer: Sejda offers both" },
      {
        type: "p",
        text: "On Sejda's website, you upload your documents and they are processed on its servers. Sejda says files are encrypted in transit and at rest, and deleted automatically after two hours. The free service is limited by pages, megabytes and tasks per hour.",
      },
      {
        type: "p",
        text: "Sejda Desktop processes files on your computer, with no upload, on Mac, Windows and Linux. Its free version allows three tasks a day. One detail matters for personal documents: Sejda's terms of service say that users must not submit sensitive personal information, such as government ID numbers, to its online service.",
      },
      { type: "h2", text: "Where Sejda is better" },
      {
        type: "list",
        items: [
          "Merge options that Cachety does not have: bookmarks, a table of contents, blank pages for double-sided printing.",
          "A desktop app for Mac, Windows and Linux that keeps files on your computer.",
          "Many other tools in the same place: text recognition (OCR), cropping, straightening scans, editing.",
          "Fine control over compression, with image quality and resolution settings.",
        ],
      },
      { type: "h2", text: "Where Cachety is better" },
      {
        type: "list",
        items: [
          "Nothing is uploaded and nothing is installed, on a phone as well as on a computer.",
          "No 50-page limit and no cap on tasks per hour or per day: a 60-page file or a fourth file in the hour is not a problem.",
          "You choose a size in megabytes, and are told before the download whether it can be reached.",
          "iPhone HEIC photos are accepted as they are, and hidden data is removed from every file.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "You need bookmarks or a table of contents in the merged PDF.",
      "You can install Sejda Desktop and your job fits its free limits, or you have a paid plan.",
      "You need text recognition, cropping or straightening of scans.",
    ],
    chooseCachety: [
      "The files are ID documents, payslips or bank statements, and you are on a phone or cannot install software.",
      "Your file is over 50 pages, or you have several files to prepare in the same hour.",
      "A form asks for one file under 1, 2, 5 or 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Sejda",
        "With Sejda's online tools, yes: files are uploaded to its servers and deleted after two hours. With Sejda Desktop, no: files are processed on your computer."
      ),
      {
        q: "What are Sejda's free limits for merging?",
        a: "Online, documents up to 50 pages or 50 MB and three tasks per hour. Sejda Desktop's free version allows three tasks per day. Cachety has no such limits: up to 1,000 pages in one file.",
      },
      {
        q: "Can Sejda compress a PDF to a given size?",
        a: "Its compress tool offers image quality and resolution settings, not a size to aim for. With Cachety you pick 1, 2, 5 or 10 MB.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Sejda: Merge PDF", url: "https://www.sejda.com/merge-pdf" },
      { label: "Sejda: Compress PDF", url: "https://www.sejda.com/compress-pdf" },
      { label: "Sejda: JPG to PDF", url: "https://www.sejda.com/jpg-to-pdf" },
      { label: "Sejda: Organize PDF pages", url: "https://www.sejda.com/organize-pdf" },
      { label: "Sejda: Edit PDF metadata", url: "https://www.sejda.com/edit-pdf-metadata" },
      { label: "Sejda pricing and questions", url: "https://www.sejda.com/pricing" },
      { label: "Sejda Desktop", url: "https://www.sejda.com/desktop" },
      { label: "Security at Sejda", url: "https://www.sejda.com/security" },
      { label: "Sejda privacy policy", url: "https://www.sejda.com/privacy" },
      { label: "Sejda terms of service", url: "https://www.sejda.com/terms" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
