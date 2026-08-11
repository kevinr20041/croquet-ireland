"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/admin/fields";
import type { RankingRow } from "@/lib/types";

function toText(rows: RankingRow[]) {
  return rows
    .map((r) => [r.player_name, r.world_rank ?? "", r.grade ?? "", r.games ?? "", r.wins ?? "", r.win_pct ?? ""].join("\t"))
    .join("\n");
}

function parse(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("\t").map((p) => p.trim());
      const [name, worldRank, grade, games, wins, winPct] = parts;
      return {
        player_name: name,
        world_rank: worldRank ? Number(worldRank) : null,
        grade: grade ? Number(grade) : null,
        games: games ? Number(games) : null,
        wins: wins ? Number(wins) : null,
        win_pct: winPct ? Number(winPct) : null,
      };
    })
    .filter((r) => r.player_name);
}

export function RankingsBulkEditor({ discipline, initialRows }: { discipline: "AC" | "GC"; initialRows: RankingRow[] }) {
  const router = useRouter();
  const [text, setText] = useState(toText(initialRows));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const preview = parse(text);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/rankings/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ discipline, rows: preview }),
    });
    if (res.ok) {
      setMessage(`Saved ${preview.length} players.`);
      router.refresh();
    } else {
      setMessage("Something went wrong — check the format and try again.");
    }
    setSaving(false);
  }

  return (
    <div>
      <p className="mb-2 text-sm text-ink-soft">
        One player per line, columns separated by <strong>Tab</strong> (paste straight from a spreadsheet):{" "}
        <code className="rounded bg-paper-tint px-1.5 py-0.5 text-xs">Name, World Rank, Grade, Games, Wins, Win%</code>
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={14}
        spellCheck={false}
        className="w-full rounded-lg border border-line bg-paper-raised p-3 font-mono text-sm text-ink"
      />
      <div className="mt-3 flex items-center gap-3">
        <PrimaryButton type="button" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : `Save ${preview.length} players`}
        </PrimaryButton>
        {message && <p className="text-sm text-ink-soft">{message}</p>}
      </div>
    </div>
  );
}
