import type { RoadmapCopy, RoadmapId, Text } from "./types";

const ITEMS: Record<RoadmapId, Text> = {
  "per-recipient-password": {
    title: "A different password for each recipient",
    body: "Each recipient's copy locked with its own password, listed with the codes after download. One leaked password then opens only one copy.",
  },
  "suggested-areas": {
    title: "Suggested areas to hide",
    body: "Cachety spots account numbers, ID numbers and similar details on the page and offers to hide them. Detection runs on your device, like everything else.",
  },
  "more-languages": {
    title: "More languages",
    body: "Italian, Korean and Turkish.",
  },
  "purpose-from-recipient": {
    title: "Purpose suggestions from the recipient",
    body: "Typing the recipient, such as a letting agency, could suggest the matching purpose.",
  },
  "local-word-lists": {
    title: "Easy-to-read passwords in your language",
    body: "Password words in your own language, limited to plain letters so they type the same on any keyboard.",
  },
  "remember-signature": {
    title: "Remember my signature on this device",
    body: "An opt-in choice to keep your signature on this device, with a plain sentence about what is stored and a one-tap delete. Today it is never saved.",
  },
  "keep-vector-pages": {
    title: "Keep the text of signed PDFs",
    body: "An option to sign without rebuilding the pages from pixels, so the text stays searchable. It would come with its own removal of hidden data.",
  },
  "sign-embed": {
    title: "Signing on partner websites",
    body: "Approved websites can show the sign tool in their own pages, alone or next to the watermark tool, with the place and note already filled in. The documents still stay on the visitor's device.",
  },
  "sign": {
    title: "Sign a document",
    body: "Draw, type or upload your signature, place it on a PDF or a photo, and download a signed PDF. Like the watermark tool, nothing leaves your device.",
  },
  "simpler-tool": {
    title: "A simpler tool",
    body: "Three steps in plain words: your document, what it's for and who gets it, then preview and download. Every advanced option stays one tap away.",
  },
  "easy-passwords": {
    title: "Easy-to-read passwords",
    body: "Locking a file now makes a password of 12 random words, as strong as a crypto wallet recovery phrase.",
  },
  "partner-embed": {
    title: "Cachety on partner websites",
    body: "Approved websites can show the tool in their own pages. It still runs on cachety.com, so the documents stay on the visitor's device, out of reach of the host site.",
  },
};

const COPY: RoadmapCopy = {
  nav: "Roadmap",
  title: "What's coming",
  lead: "What we're working on next, and ideas we're considering. Cachety stays free and open source, and stays on your device.",
  next: "Next",
  idea: "Ideas we're considering",
  shipped: "Recently added",
  suggest: "Suggest an idea",
  suggestBody: "Missing something? Open an issue on GitHub. Ideas are welcome in any language.",
  meta: {
    title: "Roadmap: what's coming to Cachety",
    description: "Upcoming features of Cachety, the free tool to watermark and sign documents without them leaving your device: what's next, ideas, and recent additions.",
  },
};

export default { items: ITEMS, copy: COPY };
