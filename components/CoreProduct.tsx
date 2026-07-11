"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ACCEPT, hasVisibleText, isSupported, outputName, zipDocuments } from "@/lib/files";
import { releaseResult, watermarkFile, type WatermarkResult } from "@/lib/watermark";
import { useT, type ErrorKey, type Strings } from "@/lib/i18n";
import { ChevronIcon, CloseIcon, DownloadIcon, UploadIcon } from "@/components/icons";

type Status = "pending" | "processing" | "ready" | "error";

type Doc = {
  id: string;
  file: File;
  status: Status;
  result?: WatermarkResult;
  stampedWith?: string;
  error?: string;
  progress?: [number, number];
};

const docId = (f: File) => `${f.name}:${f.size}:${f.lastModified}`;

const outName = (doc: Doc, t: Strings) =>
  outputName(doc.file.name, doc.result?.extension ?? "pdf", t.suffix);

function size(bytes: number, t: Strings) {
  return `${Math.max(0.1, bytes / 1024 / 1024).toFixed(1)} ${t.sizeUnit}`;
}

function triggerDownload(url: string, name: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function CoreProduct() {
  const t = useT();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [text, setText] = useState("");
  const [autoApply, setAutoApply] = useState(true);
  const [appliedText, setAppliedText] = useState("");
  const [rejected, setRejected] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem("autoApply") === "0") setAutoApply(false);
  }, []);

  const setAuto = (on: boolean) => {
    setAutoApply(on);
    setAppliedText(text.trim());
    localStorage.setItem("autoApply", on ? "1" : "0");
  };

  const addFiles = useCallback((list: FileList | File[] | null | undefined) => {
    if (!list) return;
    const incoming = Array.from(list);
    setRejected(incoming.filter((f) => !isSupported(f.type)).map((f) => f.name));
    const accepted = incoming.filter((f) => isSupported(f.type));
    if (!accepted.length) return;
    setDocs((prev) => {
      const known = new Set(prev.map((d) => d.id));
      const added = accepted
        .filter((f) => !known.has(docId(f)))
        .map<Doc>((f) => ({ id: docId(f), file: f, status: "pending" }));
      return [...prev, ...added];
    });
  }, []);

  const removeDoc = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
    inputRef.current?.focus();
  };

  const today = () => new Date().toLocaleDateString(t.locale);

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => addFiles(e.clipboardData?.files);
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [addFiles]);

  const prevDocs = useRef<Doc[]>([]);
  useEffect(() => {
    const live = new Set(docs.map((d) => d.result).filter(Boolean));
    for (const old of prevDocs.current) {
      if (old.result && !live.has(old.result)) releaseResult(old.result);
    }
    prevDocs.current = docs;
  }, [docs]);
  useEffect(
    () => () => prevDocs.current.forEach((d) => d.result && releaseResult(d.result)),
    []
  );

  const value = text.trim();
  const active = autoApply ? value : appliedText.trim();
  const meaningful = hasVisibleText(active);
  const pending = !autoApply && hasVisibleText(value) && value !== appliedText.trim();
  const fileKey = docs.map((d) => d.id).join("|");
  useEffect(() => {
    if (!fileKey || !meaningful) {
      setDocs((prev) =>
        prev.some((d) => d.result || d.status !== "pending")
          ? prev.map((d) => ({ id: d.id, file: d.file, status: "pending" }))
          : prev
      );
      return;
    }
    let cancelled = false;
    const patch = (id: string, changes: Partial<Doc>) => {
      if (!cancelled)
        setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, ...changes } : d)));
    };
    const timer = setTimeout(async () => {
      for (const doc of prevDocs.current) {
        if (cancelled) return;
        if (doc.result && doc.stampedWith === active) continue;
        patch(doc.id, { status: "processing", error: undefined });
        try {
          const result = await watermarkFile(doc.file, active, (done, total) =>
            patch(doc.id, { progress: [done, total] })
          );
          if (cancelled) releaseResult(result);
          else patch(doc.id, { status: "ready", result, stampedWith: active, progress: undefined });
        } catch (e) {
          const key = e instanceof Error ? (e.message as ErrorKey) : "";
          patch(doc.id, {
            status: "error",
            result: undefined,
            stampedWith: undefined,
            error: t.errors[key as ErrorKey] ?? t.errors.generic,
            progress: undefined,
          });
        }
      }
    }, autoApply ? 500 : 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileKey, active, meaningful]);

  const fresh = (d: Doc) => d.status === "ready" && !!d.result && d.stampedWith === active;
  const apply = () => setAppliedText(value);
  const ready = docs.filter(fresh);
  const processing = docs.some((d) => d.status === "processing");
  const shown =
    docs.find((d) => d.id === activeId) ?? docs.find((d) => d.result || d.error);

  const [zipping, setZipping] = useState(false);
  const downloadZip = async () => {
    setZipping(true);
    try {
      const files = await Promise.all(
        ready.map(async (d) => ({
          name: outName(d, t),
          bytes: new Uint8Array(await d.result!.blob.arrayBuffer()),
        }))
      );
      const url = URL.createObjectURL(
        new Blob([zipDocuments(files) as BlobPart], { type: "application/zip" })
      );
      triggerDownload(url, `${t.zipName}.zip`);
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } finally {
      setZipping(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:grid lg:grid-cols-[400px_minmax(0,1fr)] lg:items-start">
      <div className="flex flex-col gap-8">
        <section aria-label={t.step1}>
          <StepLabel n={1} active={docs.length === 0}>
            {t.step1}
          </StepLabel>

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`motif-filigrane mt-3 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-feuille px-6 text-center transition-colors focus-within:ring-2 focus-within:ring-bleu ${
              docs.length ? "py-5" : "py-12"
            } ${dragging ? "border-sceau bg-sceau/5" : "border-trait hover:border-encre-2"}`}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ACCEPT}
              aria-label={t.inputAria}
              className="sr-only"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
            {docs.length === 0 ? (
              <>
                <UploadIcon className="h-9 w-9 text-encre-2" />
                <span className="text-lg font-semibold">{t.dropTitle}</span>
                <span className="text-sm text-encre-2">{t.dropHint}</span>
              </>
            ) : (
              <span className="text-sm text-encre-2">{t.dropAdd}</span>
            )}
          </label>

          {rejected.length > 0 && (
            <div
              role="alert"
              className="mt-3 break-words rounded-xl border border-sceau/40 bg-sceau/5 px-4 py-3 text-sm text-sceau-fonce"
            >
              {t.rejected(rejected.join(", "))}
            </div>
          )}

          {docs.length > 0 && (
            <ul className="mt-3 flex flex-col gap-2">
              {docs.map((doc) => (
                <li key={doc.id} className="flex items-stretch gap-2">
                  <button
                    onClick={() => setActiveId(doc.id)}
                    aria-pressed={shown?.id === doc.id}
                    className={`flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border bg-feuille px-4 py-3 text-left transition-colors ${
                      shown?.id === doc.id
                        ? "border-bleu ring-1 ring-bleu"
                        : "border-trait hover:border-encre-2"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {doc.file.name}
                      </span>
                      <span className="block text-sm text-encre-2">
                        {size(doc.file.size, t)}
                        {doc.result &&
                          doc.result.extension === "pdf" &&
                          ` · ${t.pages(doc.result.pageCount)}`}
                      </span>
                    </span>
                    <DocStatus doc={doc} />
                  </button>
                  <button
                    onClick={() => removeDoc(doc.id)}
                    aria-label={t.remove(doc.file.name)}
                    className="flex w-12 shrink-0 items-center justify-center rounded-xl border border-trait text-encre-2 transition-colors hover:border-sceau hover:text-sceau"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-label={t.step2}>
          <StepLabel n={2} active={docs.length > 0 && !meaningful}>
            {t.step2}
          </StepLabel>
          <textarea
            value={text}
            maxLength={120}
            rows={2}
            aria-label={t.textareaAria}
            onChange={(e) => setText(e.target.value.replace(/\n/g, " "))}
            placeholder={t.placeholder}
            className="mt-3 w-full resize-y rounded-xl border border-trait bg-feuille px-4 py-3 font-mono field-sizing-content focus:outline-none focus:ring-2 focus:ring-bleu"
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-encre-2">
              <input
                type="checkbox"
                checked={autoApply}
                onChange={(e) => setAuto(e.target.checked)}
                className="peer sr-only"
              />
              <span className="relative h-5 w-9 rounded-full bg-trait transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:bg-bleu peer-checked:after:translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-bleu peer-focus-visible:ring-offset-1" />
              {t.autoApply}
            </label>
            {text && (
              <span className="text-xs text-encre-2 tabular-nums">{text.length} / 120</span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.presets.map((p) => (
              <button
                key={p}
                onClick={() => setText(t.onDate(p, today()).slice(0, 120))}
                className="rounded-lg border border-trait bg-feuille px-3 py-1.5 text-left text-sm text-encre-2 transition-colors hover:border-bleu hover:text-bleu"
              >
                {p.split(".")[0]}
              </button>
            ))}
            {value && !text.includes(today()) && (
              <button
                onClick={() => setText(t.onDate(value, today()).slice(0, 120))}
                className="rounded-lg border border-bleu/40 bg-bleu/5 px-3 py-1.5 text-sm text-bleu transition-colors hover:border-bleu"
              >
                {t.addDate}
              </button>
            )}
          </div>
          {!autoApply && (
            <button
              onClick={apply}
              disabled={!pending}
              className="mt-3 w-full rounded-xl bg-sceau px-6 py-3 font-semibold text-white transition-colors hover:bg-sceau-fonce focus:outline-none focus:ring-2 focus:ring-sceau focus:ring-offset-2 disabled:opacity-40"
            >
              {t.apply}
            </button>
          )}
          <p className="mt-2 text-sm text-encre-2">{t.tip}</p>
        </section>

        {ready.length > 1 && (
          <button
            onClick={downloadZip}
            disabled={zipping}
            className="w-full rounded-xl border-2 border-sceau px-6 py-3 font-semibold text-sceau transition-colors hover:bg-sceau/5 disabled:opacity-50"
          >
            {t.downloadAll(ready.length)}
          </button>
        )}
      </div>

      <section aria-label={t.step3} className="min-w-0">
        <StepLabel n={3} active={ready.length > 0}>
          {t.step3}
        </StepLabel>

        <div className="mt-3">
          {docs.length === 0 || !meaningful ? (
            <div className="motif-filigrane flex min-h-[420px] items-center justify-center rounded-2xl border border-trait bg-feuille px-6 text-center text-encre-2">
              {docs.length === 0
                ? t.emptyStart
                : !autoApply && hasVisibleText(value)
                  ? t.applyHint
                  : t.emptyText}
            </div>
          ) : shown?.error ? (
            <div
              role="alert"
              className="rounded-2xl border border-sceau/40 bg-sceau/5 px-5 py-4 text-sceau-fonce"
            >
              {t.docError(shown.file.name, shown.error)}
            </div>
          ) : shown && fresh(shown) ? (
            <Kiosk key={shown.id} doc={shown} />
          ) : (
            <div
              className="flex min-h-[420px] items-center justify-center rounded-2xl border border-trait bg-feuille text-encre-2"
              aria-live="polite"
            >
              {shown ? t.processingDoc(shown.file.name, shown.progress) : t.processingGeneric}
            </div>
          )}
        </div>
      </section>

      <p className="sr-only" role="status" aria-live="polite">
        {processing ? t.srProcessing : ready.length > 0 ? t.srReady(ready.length) : ""}
      </p>
    </div>
  );
}

function Kiosk({ doc }: { doc: Doc }) {
  const t = useT();
  const [page, setPage] = useState(0);
  const zoomRef = useRef<HTMLDialogElement>(null);
  const result = doc.result!;
  const shownPages = result.previews.length;

  return (
    <div className="rounded-2xl border border-trait bg-feuille p-4">
      <a
        href={result.url}
        download={outName(doc, t)}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-sceau px-6 py-3.5 font-semibold text-white transition-colors hover:bg-sceau-fonce focus:outline-none focus:ring-2 focus:ring-sceau focus:ring-offset-2"
      >
        <DownloadIcon className="h-5 w-5 shrink-0" />
        <span className="truncate">{outName(doc, t)}</span>
        <span className="shrink-0 font-normal opacity-80">
          ({size(result.blob.size, t)})
        </span>
      </a>

      {shownPages > 1 && (
        <nav
          aria-label={t.pagerNav}
          className="mt-4 flex items-center justify-center gap-4"
        >
          <PagerButton
            direction="prev"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          />
          <span className="text-sm text-encre-2 tabular-nums">
            {t.pageOf(page + 1, result.pageCount)}
          </span>
          <PagerButton
            direction="next"
            disabled={page === shownPages - 1}
            onClick={() => setPage(page + 1)}
          />
        </nav>
      )}

      <button
        onClick={() => zoomRef.current?.showModal()}
        className="mt-4 block w-full cursor-zoom-in rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu"
        aria-label={t.zoomOpen(page + 1)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={result.previews[page]}
          alt={t.previewAlt(doc.file.name, page + 1)}
          className="mx-auto max-h-[70vh] w-auto max-w-full rounded-lg border border-trait shadow-sm"
        />
      </button>

      <dialog
        ref={zoomRef}
        aria-label={t.zoomLabel(page + 1)}
        onClick={(e) => e.target === zoomRef.current && zoomRef.current.close()}
        className="m-auto max-h-[95dvh] max-w-[95vw] bg-transparent p-0 backdrop:bg-encre/85"
      >
        <div className="relative">
          <button
            onClick={() => zoomRef.current?.close()}
            aria-label={t.zoomClose}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-encre/70 text-white transition-colors hover:bg-encre focus:outline-none focus:ring-2 focus:ring-white"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.previews[page]}
            alt={t.zoomAlt(doc.file.name, page + 1)}
            className="max-h-[95dvh] max-w-[95vw] rounded-xl object-contain"
          />
        </div>
      </dialog>

      {result.pageCount > shownPages && (
        <p className="mt-3 text-center text-sm text-encre-2">
          {t.previewLimit(shownPages, result.pageCount)}
        </p>
      )}
    </div>
  );
}

function PagerButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const t = useT();
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? t.pagerPrev : t.pagerNext}
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-trait text-encre transition-colors hover:border-bleu hover:text-bleu disabled:cursor-not-allowed disabled:opacity-30"
    >
      <ChevronIcon direction={direction === "prev" ? "left" : "right"} className="h-4 w-4" />
    </button>
  );
}

function DocStatus({ doc }: { doc: Doc }) {
  const t = useT();
  const styles: Record<Status, string> = {
    pending: "bg-encre/5 text-encre-2",
    processing: "bg-bleu/10 text-bleu",
    ready: "bg-green-700/10 text-green-800",
    error: "bg-sceau/10 text-sceau-fonce",
  };
  return (
    <span
      className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ${styles[doc.status]}`}
    >
      {doc.status === "processing" && doc.progress
        ? t.pageOf(doc.progress[0], doc.progress[1])
        : t.status[doc.status]}
    </span>
  );
}

function StepLabel({
  n,
  active,
  children,
}: {
  n: number;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-3 text-lg font-semibold">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
          active ? "bg-sceau text-white" : "bg-encre/10 text-encre-2"
        }`}
      >
        {n}
      </span>
      {children}
    </h2>
  );
}
