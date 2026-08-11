"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({ endpoint, confirmLabel = "Delete this item?" }: { endpoint: string; confirmLabel?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm(confirmLabel)) return;
    setBusy(true);
    await fetch(endpoint, { method: "DELETE" });
    router.refresh();
    setBusy(false);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={busy}
      aria-label="Delete"
      className="rounded-lg p-2 text-ink-faint hover:bg-maroon/10 hover:text-maroon disabled:opacity-50"
    >
      <Trash2 size={17} />
    </button>
  );
}
