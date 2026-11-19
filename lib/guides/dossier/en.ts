// Guides for the Dossier tool (en): merging PDFs, photos to PDF, page
// order and rotation, removing hidden data. Each entry carries tool: "dossier".
// Written for readers in the United Kingdom (en-GB). Plain text only: no
// link, no tag, no markdown.
//
// These guides describe the Dossier tool (docs/prd-dossier.md) as shipped,
// sections, photo straightening and custom size included. The quoted labels
// (‘One PDF’, ‘Split into several files’, ‘Straighten and crop’, ‘Other…’)
// are those of the `dossier` block of lib/i18n.tsx: keep them in step.

import type { Guide } from "../types";

const UPDATED = "2026-11-19";

/** Address of the tool, written without a scheme (guides carry no link). */
const TOOL = "cachety.com/en/dossier";

const NOT_UPLOADED =
  "Cachety works in your browser. There is no server that receives your files, and the page forbids your browser from contacting any other website. You can check it yourself: load the page, switch to aeroplane mode, and it still works. It is free, with no account, and the code is open source.";

const PIXELS =
  "To remove hidden data, Cachety rebuilds each page as a picture. So the text in the new PDF cannot be selected or searched, and a PDF that only held text can come out bigger than the original. Your original files are not changed: keep them.";

export const DOSSIER_GUIDES_EN: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "merge-pdf-without-uploading",
    topic: "merge",
    tool: "dossier",
    title: "How to merge PDF files into one without uploading them",
    metaTitle: "Merge PDF Files Without Uploading Them, for Free",
    description:
      "Combine PDFs and photos into one PDF in your browser. Put the pages in order, keep the file under a size limit, and upload nothing. Free, no account.",
    intro:
      "‘Please send everything as one PDF.’ Most free tools that merge PDFs start by uploading your files to their servers. When the files are your passport, your payslips and your bank statements, there is another way: do it on your own device.",
    example: "Tenancy application – Parkside Estates Leeds – 18/11/2026",
    body: [
      { type: "h2", text: "Why merging online is not a small thing" },
      {
        type: "p",
        text: "The documents people merge are rarely holiday photos. They are the papers a letting agent, a bank, an employer or a public office asked for: proof of identity, proof of income, proof of address. Sending them in one batch to a website you know little about, just to join them together, is a risk you do not need to take.",
      },
      { type: "h2", text: "Merge your files with Cachety" },
      {
        type: "steps",
        items: [
          `Open ${TOOL} in your browser, on a computer or a phone. There is nothing to install and no account to create.`,
          "Add your files: PDFs and photos together (JPG, PNG, iPhone HEIC photos and more). A photo becomes a page.",
          "Go to the pages. Every page of every file is shown as a small picture. Drag a page to move it, even from one document to another. Turn a sideways page, and remove the pages you do not want.",
          "Choose ‘One PDF’. If the website you are sending to has a size limit, pick it: 1, 2, 5 or 10 MB, or ‘Other…’ for any limit from 0.5 to 50 MB. Cachety tells you before you download whether the file will fit and stay readable.",
          "Check the preview, give the file a name and download it.",
        ],
      },
      {
        type: "tip",
        text: "Before you download, you can hide an account number or any other detail the recipient does not need. In a PDF that contains text, Cachety points out the account and card numbers it finds. The hidden area is removed from the file, not just covered.",
      },
      { type: "h2", text: "One file per kind of document" },
      {
        type: "p",
        text: "Some websites do not want one big file but one file per kind of document: ID, payslips, proof of address. Tick ‘Split into several files’, then open a page's menu and choose ‘New section here’ where each new file should start. Give each section a name: it becomes the name of its file. ‘One PDF per section’ is then selected, and you download all the files at once in a ZIP archive. The size limit then applies to each file.",
      },
      { type: "h2", text: "What happens to your files" },
      { type: "p", text: NOT_UPLOADED },
      { type: "h2", text: "What the new PDF is like" },
      { type: "p", text: PIXELS },
      {
        type: "p",
        text: "The good side of this is that the new file carries less than the originals: no author name, no hidden text, no attachments, and no GPS location from your photos. What the recipient sees is all there is.",
      },
      {
        type: "warning",
        text: "If you need the text of the merged PDF to stay selectable and searchable, for a report or a thesis for example, Cachety is not the right tool. Use an app that runs on your computer and joins the original pages as they are, such as Preview on a Mac.",
      },
      { type: "h2", text: "A few limits to know" },
      {
        type: "list",
        items: [
          "Up to 200 MB per file, 500 pages per PDF and 1,000 pages in total.",
          "Word and Excel files are not accepted: save them as a PDF first (Print, then Save as PDF).",
          "A locked PDF can be added: Cachety asks for its password, on your device.",
          "A watermark and a password on the new file are optional, and off unless you ask for them.",
        ],
      },
    ],
    faq: [
      {
        q: "Are my PDFs uploaded to be merged?",
        a: "No. The merge happens in your browser, on your device. Cachety has no server that could receive your files.",
      },
      {
        q: "Can I merge PDFs and photos together?",
        a: "Yes. Add PDFs and photos in any mix. Each photo becomes a page, and you can put all the pages in the order you want.",
      },
      {
        q: "Is the text still selectable after merging?",
        a: "No. Each page is rebuilt as a picture, which removes hidden data. If you need selectable text, use an app on your computer that keeps the original pages.",
      },
      {
        q: "Why is the merged file sometimes bigger than my files?",
        a: "A PDF that only held text is very light, and a picture of the same page weighs more. Choose a maximum size and Cachety shrinks the pages to fit.",
      },
      {
        q: "Does it work on a phone?",
        a: "Yes, on iPhone and Android, in the browser. You can move pages with your finger.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "photos-to-pdf-on-your-phone",
    topic: "photo-to-pdf",
    tool: "dossier",
    title: "How to turn photos of paper documents into one PDF on your phone",
    metaTitle: "Turn Photos Into One PDF on Your Phone, No App",
    description:
      "Photograph your paper documents and turn the photos into one PDF in your phone's browser. No app, no upload, and small enough for an online form.",
    intro:
      "A website wants a PDF and you only have paper. Or it refuses your iPhone photo because of its format. You do not need a scanner or a scanning app: your phone's camera and its browser are enough.",
    example: "Nursery application – Hillside Primary School – 18/11/2026",
    body: [
      { type: "h2", text: "Take photos that read well" },
      {
        type: "list",
        items: [
          "Lay the sheet flat on a plain, dark surface, near a window. Avoid the flash, which leaves a white patch.",
          "Hold the phone straight above the sheet, so the edges look parallel, and fill the frame with the page. A photo taken at an angle can be straightened afterwards.",
          "Take one photo per page. Check that the small print is sharp before you move on.",
        ],
      },
      { type: "h2", text: "From photos to one PDF" },
      {
        type: "steps",
        items: [
          `Open ${TOOL} in your phone's browser. There is no app to install.`,
          "Tap the drop area and choose your photos. iPhone photos in HEIC format work as they are.",
          "Go to the pages. Each photo has become a page. Turn the ones that are sideways and drag them into the right order.",
          "For a photo that is tilted or shows the table around the sheet, tap the page and choose ‘Straighten and crop’. Put each corner on a corner of the sheet, then choose ‘Apply’.",
          "In the same place, ‘Whiten the background’ turns grey paper white and ‘Black and white’ removes the colour. The page reads better and weighs much less. ‘Apply to all photos’ does it for every photo at once.",
          "Choose ‘One PDF’ and, if the form has a size limit, pick 1, 2, 5 or 10 MB, or ‘Other…’ for another limit.",
          "Check the preview and download the PDF. It is saved on your phone, ready to attach.",
        ],
      },
      {
        type: "tip",
        text: "You can mix photos with PDFs you already have, such as a payslip you downloaded. Everything ends up in one file, in the order you choose.",
      },
      { type: "h2", text: "Why the form refused your photo" },
      {
        type: "p",
        text: "Online forms often accept only PDF, JPG or PNG, and limit the size to a few megabytes. A photo from a recent phone can weigh more than that, and iPhones save photos as HEIC, a format many websites do not read. Turning the photos into one PDF with a size limit solves both problems at once.",
      },
      { type: "h2", text: "Your photos stay on your phone" },
      { type: "p", text: NOT_UPLOADED },
      {
        type: "p",
        text: "A photo also remembers where and when it was taken, and with which phone. Cachety rebuilds each page as a new picture, so this hidden information, the GPS location included, is not in the PDF you send.",
      },
      {
        type: "warning",
        text: "A very small size limit and many photo pages do not always go together. If the file cannot fit and stay readable, Cachety says so before you download. Try ‘Black and white’ first, then remove some pages, split the file into several files, or choose a larger size if the website allows it.",
      },
    ],
    faq: [
      {
        q: "Do I need a scanning app?",
        a: "No. Take the photos with your phone's camera and open Cachety in the browser. Nothing is installed.",
      },
      {
        q: "Do iPhone photos (HEIC) work?",
        a: "Yes. HEIC photos are read on your device and become pages of the PDF, like any other photo.",
      },
      {
        q: "Are my photos uploaded?",
        a: "No. Everything happens in your phone's browser. There is no server that receives your photos.",
      },
      {
        q: "Can I search or copy the text in the PDF?",
        a: "No. The pages are pictures: Cachety does not read the text of a photo. For a form that asks for a PDF, that is rarely a problem.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "rotate-reorder-delete-pdf-pages",
    topic: "pdf-pages",
    tool: "dossier",
    title: "How to rotate, reorder or delete pages in a PDF without uploading it",
    metaTitle: "Rotate, Reorder or Delete PDF Pages, No Upload",
    description:
      "Turn a sideways page, change the page order or remove pages from a PDF in your browser. Free, no account, and the file never leaves your device.",
    intro:
      "A scan that came out upside down, a blank page in the middle, a contract where you only need pages 1 and 7: small fixes, but most free tools want you to upload the whole document first. Here is how to do it on your own device.",
    example: "Mortgage application – Northgate Bank – 18/11/2026",
    body: [
      { type: "h2", text: "Fix the pages with Cachety" },
      {
        type: "steps",
        items: [
          `Open ${TOOL} in your browser, on a computer or a phone.`,
          "Add your PDF. You can add several files, and photos too.",
          "Go to the pages. Every page is shown as a small picture, in the order of the final file.",
          "Drag a page to move it. Use the rotate button to turn it a quarter turn at a time. Use the remove button to take it out. If you remove the wrong page, ‘Undo’ brings it back: it shows for a few seconds. On a phone, tap a page to see the same actions in a menu.",
          "Choose ‘One PDF’, check the preview and download.",
        ],
      },
      {
        type: "tip",
        text: "On a computer, you can do it all from the keyboard: Alt and the arrow keys move the selected page, R turns it, and Delete removes it.",
      },
      { type: "h2", text: "A real rotation, not a display setting" },
      {
        type: "p",
        text: "Many tools only add a note to the PDF saying ‘show this page turned’. Some readers ignore it, and the page is sideways again for the person who receives it. Cachety rebuilds the page the right way up, so it looks the same everywhere.",
      },
      { type: "h2", text: "Removed pages are really gone" },
      {
        type: "p",
        text: "When you take a page out, it is not in the new file at all. The same goes for what you cannot see in a PDF: hidden text, attachments, the author's name. The new file is built from what is shown on each page, and nothing else.",
      },
      { type: "h2", text: "What to expect from the result" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "If you need to keep selectable text, bookmarks or form fields, use an app that runs on your computer and edits the original pages, such as Preview on a Mac.",
      },
      { type: "h2", text: "Nothing is uploaded" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "Can I rotate just one page of a PDF?",
        a: "Yes. Each page has its own rotate button. The other pages are not changed.",
      },
      {
        q: "Can I move a page from one PDF into another?",
        a: "Yes. Add both files: all their pages appear together and can be moved freely, then saved as one PDF.",
      },
      {
        q: "Can I get a removed page back?",
        a: "Yes, with ‘Undo’, which shows for a few seconds after you remove a page. If you removed every page of a document, ‘Put its pages back’ appears next to it in the list. After that, add the file again: your original file is never changed.",
      },
      {
        q: "Is my PDF uploaded?",
        a: "No. The pages are shown and rebuilt in your browser. There is no server that receives your file.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "remove-metadata-from-pdf-or-photo",
    topic: "metadata",
    tool: "dossier",
    title: "How to remove metadata and hidden data from a PDF or photo before you send it",
    metaTitle: "Remove Metadata From a PDF or Photo, No Upload",
    description:
      "A PDF or a photo carries more than you see: author, dates, hidden text, GPS location. Remove it all before sending, in your browser, with no upload.",
    intro:
      "The file you send says more than the page shows. A PDF can name its author and the software that made it, and keep text you thought was gone. A photo can say exactly where it was taken. Here is what hides in a file, and how to send a clean copy.",
    example: "Insurance claim – Brightwater Insurance – 18/11/2026",
    body: [
      { type: "h2", text: "What a file carries without telling you" },
      {
        type: "list",
        items: [
          "In a PDF: the author's name, the title, the software used, the dates it was created and changed.",
          "Also in a PDF: a layer of selectable text, comments, links, attached files, form data, and sometimes text sitting under a black box.",
          "In a photo: the date, the make of the phone and, very often, the GPS location of the place where it was taken.",
        ],
      },
      {
        type: "p",
        text: "None of this shows when you look at the page. All of it can be read in a few clicks by the person who receives the file, or by anyone it is forwarded to.",
      },
      { type: "h2", text: "Make a clean copy with Cachety" },
      {
        type: "steps",
        items: [
          `Open ${TOOL} in your browser. No account is needed.`,
          "Add your PDF or your photos.",
          "Go to the pages and check that they are in the right order. Remove the ones you do not want to send.",
          "Choose ‘One PDF’ and download it.",
          "Send the new file, not the original.",
        ],
      },
      { type: "h2", text: "How the cleaning works" },
      {
        type: "p",
        text: "Cachety does not try to find and delete each piece of hidden data, one by one. It rebuilds every page as a picture of what you see, and makes a new PDF from those pictures. Whatever was not visible on the page is not in the new file: no author, no hidden text, no attachment, no script, no link, no GPS location.",
      },
      {
        type: "tip",
        text: "To check a file, open its properties in your PDF reader and try to select the text on a page. In a copy made by Cachety, the properties are empty and nothing can be selected.",
      },
      { type: "h2", text: "The price to pay" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Cleaning a file removes what is hidden, not what is printed on the page. A name, an account number or a barcode that can be seen is still there. Hide those before you download: the hidden area is removed for real.",
      },
      { type: "h2", text: "Your file is not uploaded to be cleaned" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "Does it remove the GPS location from my photos?",
        a: "Yes. The page is rebuilt as a new picture inside a PDF, and the photo's hidden information, location included, is not carried over.",
      },
      {
        q: "Does it remove the author's name from a PDF?",
        a: "Yes. The new PDF is made from pictures of the pages and does not carry the original file's properties.",
      },
      {
        q: "Can I keep the text selectable and only remove the metadata?",
        a: "Not with Cachety. It removes all hidden data by rebuilding the pages as pictures. To keep selectable text, use the ‘remove hidden information’ feature of a PDF editor on your computer.",
      },
      {
        q: "Is the result a PDF or a photo?",
        a: "A PDF. A photo becomes a page of the PDF.",
      },
    ],
    updated: UPDATED,
  },
];
