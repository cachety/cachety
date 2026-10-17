"use client";

// Générateur du code d'intégration (page partenaires) : options, deux extraits
// à copier, et un aperçu réel de la page intégrée (même origine : autorisée).

import { useEffect, useRef, useState } from "react";
import { LANGS } from "@/components/LangToggle";
import { SITE_URL } from "@/lib/brand";
import { PARTNERS_COPY } from "@/lib/partners-copy";
import { STRINGS } from "@/lib/i18n";
import { readPrefill, type EmbedTool } from "@/lib/partners";
import type { Lang } from "@/lib/site-meta";

const RESIZE_SCRIPT = `<script>
window.addEventListener("message", function (e) {
  if (e.origin !== "${SITE_URL}" || !e.data || e.data.type !== "cachety:height") return;
  var frame = document.querySelector('iframe[src^="${SITE_URL}/embed/"]');
  if (frame && typeof e.data.height === "number") frame.style.height = e.data.height + "px";
});
</script>`;

type ToolChoice = "watermark" | "sign" | "both";
const TOOLS: Record<ToolChoice, EmbedTool[]> = { watermark: ["watermark"], sign: ["sign"], both: ["watermark", "sign"] };

type Options = { tools: ToolChoice; purpose: string; recipient: string; place: string; note: string; accent: string };

/** Le filigrane seul est le choix par défaut : rien dans le fragment (codes déjà collés inchangés). */
function fragment({ tools, purpose, recipient, place, note, accent }: Options) {
  const params = new URLSearchParams();
  if (tools !== "watermark") params.set("tools", TOOLS[tools].join(","));
  if (purpose.trim()) params.set("for", purpose.trim());
  if (recipient.trim()) params.set("to", recipient.trim());
  if (tools !== "watermark" && place.trim()) params.set("place", place.trim());
  if (tools !== "watermark" && note.trim()) params.set("note", note.trim());
  if (accent) params.set("accent", accent);
  const s = params.toString().replace(/\+/g, "%20").replace(/%2C/g, ",");
  return s ? `#${s}` : "";
}

function CopyBlock({ label, code, copy, copied }: { label: string; code: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold">{label}</p>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard?.writeText(code).catch(() => undefined);
            setDone(true);
            setTimeout(() => setDone(false), 2000);
          }}
          className="rounded-lg border border-trait bg-white px-3 py-1.5 text-sm font-medium hover:border-bleu hover:text-bleu"
        >
          {done ? copied : copy}
        </button>
      </div>
      <pre dir="ltr" className="mt-2 overflow-x-auto rounded-xl bg-encre p-3 text-left text-xs leading-relaxed text-white">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function EmbedBuilder({ lang }: { lang: Lang }) {
  const c = PARTNERS_COPY[lang];
  const o = c.options;
  const [embedLang, setEmbedLang] = useState<Lang>(lang);
  const b = STRINGS[embedLang].sign.block;
  const [tools, setTools] = useState<ToolChoice>("watermark");
  const [place, setPlace] = useState("");
  const [note, setNote] = useState("");
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [accent, setAccent] = useState("");
  const [height, setHeight] = useState(900);
  const frame = useRef<HTMLIFrameElement>(null);
  // Couleur trop claire pour un texte blanc : ignorée par la page intégrée.
  const accentOk = !accent || readPrefill(`#accent=${encodeURIComponent(accent)}`).accent === accent;
  const hash = fragment({ tools, purpose, recipient, place, note, accent: accentOk ? accent : "" });
  const src = `${SITE_URL}/embed/${embedLang}${hash}`;
  const code = `<iframe src="${src}" title="Cachety" loading="lazy" allow="clipboard-write" style="width: 100%; min-height: 640px; border: 0"></iframe>`;

  // Aperçu : la page intégrée envoie sa hauteur ; on n'écoute que notre origine.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === "cachety:height" && typeof e.data.height === "number") setHeight(e.data.height);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const field = "w-full rounded-xl border border-trait bg-white px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-bleu";
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium sm:col-span-2">
          {o.tools}
          <select value={tools} onChange={(e) => setTools(e.target.value as ToolChoice)} className={field}>
            {(Object.keys(TOOLS) as ToolChoice[]).map((choice) => (
              <option key={choice} value={choice}>
                {o.toolChoices[choice]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          {o.lang}
          <select value={embedLang} onChange={(e) => setEmbedLang(e.target.value as Lang)} className={field}>
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          {o.accent}
          <span className="flex items-center gap-2">
            <input
              type="color"
              value={accent || "#c4262e"}
              onChange={(e) => setAccent(e.target.value)}
              aria-label={o.accent}
              className="h-11 w-14 cursor-pointer rounded-lg border border-trait bg-white p-1"
            />
            <span className={`text-xs font-normal ${accentOk ? "text-encre-2" : "text-sceau-fonce"}`}>{o.accentHint}</span>
          </span>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          {o.purpose}
          <input value={purpose} maxLength={80} onChange={(e) => setPurpose(e.target.value)} placeholder={o.purposePlaceholder} className={field} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          {o.recipient}
          <input value={recipient} maxLength={60} onChange={(e) => setRecipient(e.target.value)} placeholder={o.recipientPlaceholder} className={field} />
        </label>
        {tools !== "watermark" && (
          <fieldset className="grid gap-4 rounded-2xl border border-trait p-4 sm:col-span-2 sm:grid-cols-2">
            <legend className="px-1 text-sm font-semibold">{b.title}</legend>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              {b.place}
              <input value={place} maxLength={80} onChange={(e) => setPlace(e.target.value)} placeholder={b.placePh} className={field} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              {b.mention}
              <input value={note} maxLength={80} onChange={(e) => setNote(e.target.value)} placeholder={b.mentionPh} className={field} />
            </label>
            <p className="text-sm text-encre-2 sm:col-span-2">{o.signHint}</p>
          </fieldset>
        )}
      </div>

      <CopyBlock label={c.embedCode} code={code} copy={c.copy} copied={c.copied} />
      <div>
        <CopyBlock label={c.resizeCode} code={RESIZE_SCRIPT} copy={c.copy} copied={c.copied} />
        <p className="mt-2 text-sm text-encre-2">{c.resizeHelp}</p>
      </div>

      <div>
        <p className="font-semibold">{c.previewTitle}</p>
        <p className="mt-1 text-sm text-encre-2">{c.previewNote}</p>
        <iframe
          key={`${embedLang}${hash}`}
          ref={frame}
          src={`/embed/${embedLang}${hash}`}
          title={c.previewTitle}
          allow="clipboard-write"
          style={{ height }}
          className="mt-3 w-full rounded-2xl border border-trait bg-papier"
        />
      </div>
    </div>
  );
}
