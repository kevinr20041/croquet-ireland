"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, CalendarDays, MapPin } from "lucide-react";
import type { EventRow } from "@/lib/types";
import { EventCard } from "@/components/site/cards";
import { formatDate, formatDateRange } from "@/components/site/ui";

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

function searchHaystack(event: EventRow) {
  const parts = [
    event.name,
    event.competition_type ?? "",
    event.venue ?? "",
    event.club_name ?? "",
    event.start_date,
    event.end_date ?? "",
    formatDate(event.start_date),
    event.end_date ? formatDate(event.end_date) : "",
  ];
  return parts.join(" ").toLowerCase();
}

function matches(event: EventRow, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (searchHaystack(event).includes(q)) return true;
  // allow bare month names ("sep", "september") and years to match too
  const monthHit = MONTHS.find((m) => m.startsWith(q) || q.startsWith(m));
  if (monthHit) {
    const monthIndex = MONTHS.indexOf(monthHit);
    const startMonth = new Date(event.start_date).getMonth();
    if (startMonth === monthIndex) return true;
  }
  return false;
}

export function CalendarBrowser({ events }: { events: EventRow[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().slice(0, 10);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return events.filter((e) => matches(e, query)).slice(0, 8);
  }, [events, query]);

  const filtered = useMemo(() => events.filter((e) => matches(e, query)), [events, query]);
  const upcoming = filtered.filter((e) => e.start_date >= today);
  const past = filtered.filter((e) => e.start_date < today).reverse();
  const isSearching = query.trim().length > 0;

  function goToEvent(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/competitions/calendar/${slug}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goToEvent(suggestions[highlight].slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div>
      <div className="relative max-w-xl">
        <label htmlFor="event-search" className="sr-only">
          Search events by name or date
        </label>
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input
          ref={inputRef}
          id="event-search"
          type="text"
          role="combobox"
          aria-expanded={open && suggestions.length > 0}
          aria-controls="event-search-listbox"
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={handleKeyDown}
          placeholder="Search events by name or date — e.g. &ldquo;Championships&rdquo; or &ldquo;September&rdquo;"
          className="min-h-[48px] w-full rounded-lg border border-line bg-paper-raised py-2.5 pl-11 pr-11 text-ink placeholder:text-ink-faint"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
          >
            <X size={18} />
          </button>
        )}

        {open && suggestions.length > 0 && (
          <ul
            id="event-search-listbox"
            role="listbox"
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-line bg-paper-raised shadow-lg"
          >
            {suggestions.map((event, i) => (
              <li key={event.id} role="option" aria-selected={i === highlight}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToEvent(event.slug)}
                  onMouseEnter={() => setHighlight(i)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm ${
                    i === highlight ? "bg-paper-tint" : ""
                  }`}
                >
                  <span className="flex items-center gap-2 font-semibold text-ink">
                    <CalendarDays size={15} className="shrink-0 text-lawn-deep" />
                    {event.name}
                  </span>
                  <span className="shrink-0 text-xs text-ink-faint">{formatDateRange(event.start_date, event.end_date)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {open && query.trim() && suggestions.length === 0 && (
          <div className="absolute z-20 mt-2 w-full rounded-xl border border-line bg-paper-raised p-4 text-sm text-ink-faint shadow-lg">
            No events match &ldquo;{query}&rdquo;.
          </div>
        )}
      </div>

      {isSearching ? (
        <div className="mt-8">
          <p className="mb-4 text-sm text-ink-faint">
            {filtered.length} event{filtered.length === 1 ? "" : "s"} match &ldquo;{query}&rdquo;
          </p>
          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="flex items-center gap-2 text-ink-soft">
              <MapPin size={16} /> No events found. Try a different name or month.
            </p>
          )}
        </div>
      ) : (
        <>
          <h2 className="mb-5 mt-10 text-xl font-semibold text-ink">Upcoming</h2>
          {upcoming.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-ink-soft">No upcoming events scheduled.</p>
          )}

          {past.length > 0 && (
            <>
              <h2 className="mb-5 mt-12 text-xl font-semibold text-ink">Past events</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {past.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
