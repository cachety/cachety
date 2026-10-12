export type RoadmapStatus = "next" | "idea" | "shipped";

/** Identifiants stables, repris tels quels dans ROADMAP.md. */
export const ROADMAP_IDS = [
  "per-recipient-password",
  "suggested-areas",
  "more-languages",
  "purpose-from-recipient",
  "local-word-lists",
  "simpler-tool",
  "easy-passwords",
] as const;
export type RoadmapId = (typeof ROADMAP_IDS)[number];

export type Text = { title: string; body: string };

export type RoadmapCopy = {
  nav: string;
  title: string;
  lead: string;
  next: string;
  idea: string;
  shipped: string;
  suggest: string;
  suggestBody: string;
  meta: { title: string; description: string };
};
