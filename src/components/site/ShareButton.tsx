"use client";

import { useState } from "react";
import { Share2, Check, Link2 } from "lucide-react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the share sheet, no action needed
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-lawn hover:text-lawn-deep"
    >
      {copied ? (
        <>
          <Check size={14} /> Link copied
        </>
      ) : (
        <>
          {typeof navigator !== "undefined" && "share" in navigator ? <Share2 size={14} /> : <Link2 size={14} />}
          Share
        </>
      )}
    </button>
  );
}
