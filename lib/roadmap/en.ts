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
  "simpler-tool": {
    title: "A simpler tool",
    body: "Three steps in plain words: your document, what it's for and who gets it, then preview and download. Every advanced option stays one tap away.",
  },
  "easy-passwords": {
    title: "Easy-to-read passwords",
    body: "Locking a file now makes a password of 12 random words, as strong as a crypto wallet recovery phrase.",
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
    description: "Upcoming features of Cachety, the free watermarking tool that keeps your documents on your device: what's next, ideas, and what was added recently.",
  },
};

export default { items: ITEMS, copy: COPY };
