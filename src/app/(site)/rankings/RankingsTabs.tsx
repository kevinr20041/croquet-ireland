"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { HandicapRow, RankingRow } from "@/lib/types";
import { formatDate } from "@/components/site/ui";

type Props = {
  acRankings: RankingRow[];
  gcRankings: RankingRow[];
  acHandicaps: HandicapRow[];
  gcHandicaps: HandicapRow[];
};

type Row = RankingRow | HandicapRow;

const TABS = [
  { id: "ac-rankings", label: "AC Rankings" },
  { id: "gc-rankings", label: "GC Rankings" },
  { id: "ac-handicaps", label: "AC Handicaps" },
  { id: "gc-handicaps", label: "GC Handicaps" },
] as const;

const RANKING_COLUMNS = [
  { key: "player_name", label: "Player" },
  { key: "world_rank", label: "World Rank" },
  { key: "grade", label: "Grade" },
  { key: "games", label: "Games" },
  { key: "win_pct", label: "Win %" },
] as const;

const HANDICAP_COLUMNS = [
  { key: "player_name", label: "Player" },
  { key: "handicap", label: "Handicap" },
] as const;

export function RankingsTabs({ acRankings, gcRankings, acHandicaps, gcHandicaps }: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("ac-rankings");
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const dataset: Row[] =
    tab === "ac-rankings" ? acRankings : tab === "gc-rankings" ? gcRankings : tab === "ac-handicaps" ? acHandicaps : gcHandicaps;
  const isRankings = tab.endsWith("rankings");
  const columns = isRankings ? RANKING_COLUMNS : HANDICAP_COLUMNS;

  const filtered = useMemo(() => {
    let rows = dataset;
    if (q) rows = rows.filter((row) => row.player_name.toLowerCase().includes(q.toLowerCase()));
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = (a as Record<string, unknown>)[sortKey];
        const bv = (b as Record<string, unknown>)[sortKey];
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        if (typeof av === "string" && typeof bv === "string") {
          return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
        }
        const an = Number(av);
        const bn = Number(bv);
        return sortDir === "asc" ? an - bn : bn - an;
      });
    }
    return rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset, q, sortKey, sortDir]);

  const lastUpdated = dataset[0]?.last_updated;

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "player_name" ? "asc" : key === "world_rank" || key === "handicap" ? "asc" : "desc");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-line pb-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTab(t.id);
              setSortKey("");
            }}
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

      <p className="mt-3 text-xs text-ink-faint sm:hidden">Tip: scroll the table sideways, and tap a column heading to sort.</p>

      <div className="mt-2 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-paper-tint text-left text-xs font-bold uppercase tracking-wide text-ink-soft">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleSort(col.key)}
                    className="flex items-center gap-1 hover:text-ink"
                  >
                    {col.label}
                    {sortKey === col.key ? (
                      sortDir === "asc" ? (
                        <ArrowUp size={13} />
                      ) : (
                        <ArrowDown size={13} />
                      )
                    ) : (
                      <ArrowUpDown size={13} className="opacity-40" />
                    )}
                  </button>
                </th>
              ))}
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
