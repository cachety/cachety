"use client";

import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});

    const warm = () => {
      import("pdfjs-dist").catch(() => {});
      fetch("/pdfjs/pdf.worker.min.mjs").catch(() => {});
    };
    if ("requestIdleCallback" in window) requestIdleCallback(warm);
    else setTimeout(warm, 2000);
  }, []);
  return null;
}
