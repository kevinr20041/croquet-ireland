"use client";

import { useMemo, useState } from "react";
import type { HandicapRow, RankingRow } from "@/lib/types";
import { formatDate } from "@/components/site/ui";

type Props = {
  acRankings: RankingRow[];
  gcRankings: RankingRow[];
  acHandicaps: HandicapRow[];
  gcHandicaps: HandicapRow[];
};

const TABS = [
  { id: "ac-rankings", label: "AC Rankings" },
  { id: "gc-rankings", label: "GC Rankings" },
  { id: "ac-handicaps", label: "AC Handicaps" },
  { id: "gc-handicaps", label: "GC Handicaps" },
] as const;

export function RankingsTabs({ acRankings, gcRankings, acHandicaps, gcHandicaps }: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("ac-rankings");
  const [q, setQ] = useState("");

  const dataset =
    tab === "ac-rankings" ? acRankings : tab === "gc-rankings" ? gcRankings : tab === "ac-handicaps" ? acHandicaps : gcHandicaps;

  const filtered = useMemo(() => {
    if (!q) return dataset;
    return dataset.filter((row) => row.player_name.toLowerCase().includes(q.toLowerCase()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset, q]);

  const lastUpdated = dataset[0]?.last_updated;
  const isRankings = tab.endsWith("rankings");

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-line pb-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`min-h-[44px] rounded-t-lg px-4 text-sm font-semibold ${
              tab === t.id ? "bg-lawn text-paper-raised" : "text-ink-soft hover:bg-paper-tint"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search player name"
          className="min-h-[44px] w-64 rounded-lg border border-line bg-paper-raised px-3 py-2 text-ink"
          aria-label="Search player name"
        />
        {lastUpdated && <p className="text-sm text-ink-faint">Last updated {formatDate(lastUpdated)}</p>}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-paper-tint text-left text-xs font-bold uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Player</th>
              {isRankings && <th className="px-4 py-3">World Rank</th>}
              {isRankings && <th className="px-4 py-3">Grade</th>}
              {isRankings && <th className="px-4 py-3">Games</th>}
              {isRankings && <th className="px-4 py-3">Win %</th>}
              {!isRankings && <th className="px-4 py-3">Handicap</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t border-line-soft odd:bg-paper-raised even:bg-paper">
                <td className="px-4 py-2.5 font-medium text-ink">{row.player_name}</td>
                {isRankings && "world_rank" in row && (
                  <>
                    <td className="px-4 py-2.5 text-ink-soft">{row.world_rank ?? "N/A"}</td>
                    <td className="px-4 py-2.5 text-ink-soft">{row.grade ?? "N/A"}</td>
                    <td className="px-4 py-2.5 text-ink-soft">{row.games ?? "N/A"}</td>
                    <td className="px-4 py-2.5 text-ink-soft">{row.win_pct != null ? `${row.win_pct}%` : "N/A"}</td>
                  </>
                )}
                {!isRankings && "handicap" in row && <td className="px-4 py-2.5 text-ink-soft">{row.handicap ?? "N/A"}</td>}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-faint">
                  No players match &ldquo;{q}&rdquo;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
