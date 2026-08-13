"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Compass, CalendarDays, Newspaper, MapPinned, Users, FileText } from "lucide-react";

type Suggestion = { title: string; subtitle: string; href: string; external?: boolean };
type Results = {
  pages: Suggestion[];
  events: Suggestion[];
  articles: Suggestion[];
  clubs: Suggestion[];
  council: Suggestion[];
  documents: Suggestion[];
};

const EMPTY: Results = { pages: [], events: [], articles: [], clubs: [], council: [], documents: [] };

const GROUPS: { key: keyof Results; label: string; icon: typeof Compass }[] = [
  { key: "pages", label: "Where to find it", icon: Compass },
  { key: "events", label: "Calendar events", icon: CalendarDays },
  { key: "articles", label: "News", icon: Newspaper },
  { key: "clubs", label: "Clubs", icon: MapPinned },
  { key: "council", label: "Council", icon: Users },
  { key: "documents", label: "Documents", icon: FileText },
];

export function SearchAutocomplete({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Results>(EMPTY);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flatSuggestions = useMemo(() => {
    const flat: (Suggestion & { group: string })[] = [];
    for (const { key, label } of GROUPS) {
      for (const item of results[key]) flat.push({ ...item, group: label });
    }
    return flat;
  }, [results]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(EMPTY);
      setLoading(false);
      return;
    }
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/suggest?q=${encodeURIComponent(query)}`);
        const data = (await res.json()) as Results;
        setResults(data);
        setHighlight(0);
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function goTo(item: Suggestion) {
    setOpen(false);
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || flatSuggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % flatSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + flatSuggestions.length) % flatSuggestions.length);
    } else if (e.key === "Enter" && flatSuggestions[highlight]) {
      e.preventDefault();
      goTo(flatSuggestions[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  let runningIndex = -1;

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input
          ref={inputRef}
          type="search"
          name="q"
          role="combobox"
          aria-expanded={open && flatSuggestions.length > 0}
          aria-controls="search-suggest-listbox"
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder="Search rankings, news, clubs, calendar, documents…"
          className="min-h-[48px] w-full rounded-lg border border-line bg-paper-raised py-2.5 pl-12 pr-24 text-lg text-ink placeholder:text-ink-faint"
          autoFocus
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setResults(EMPTY);
              inputRef.current?.focus();
            }}
            className="absolute right-[92px] top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
          >
            <X size={18} />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[38px] rounded-lg bg-lawn px-4 text-sm font-semibold text-paper-raised hover:bg-lawn-deep"
        >
          Search
        </button>
      </div>

      {open && query.trim() && (
        <div
          id="search-suggest-listbox"
          role="listbox"
          className="absolute z-30 mt-2 max-h-[60vh] w-full overflow-y-auto rounded-xl border border-line bg-paper-raised shadow-lg"
        >
          {loading && flatSuggestions.length === 0 && (
            <p className="px-5 py-4 text-sm text-ink-faint">Searching…</p>
          )}
          {!loading && flatSuggestions.length === 0 && (
            <p className="px-5 py-4 text-sm text-ink-faint">No matches for &ldquo;{query}&rdquo; yet. Press Enter for a full search.</p>
          )}
          {GROUPS.map(({ key, label, icon: Icon }) => {
            const items = results[key];
            if (items.length === 0) return null;
            return (
              <div key={key} className="border-b border-line-soft last:border-0">
                <p className="flex items-center gap-1.5 px-5 pt-3 pb-1 text-xs font-bold uppercase tracking-wide text-ink-faint">
                  <Icon size={13} /> {label}
                </p>
                <ul>
                  {items.map((item) => {
                    runningIndex++;
                    const i = runningIndex;
                    return (
                      <li key={`${key}-${item.href}-${item.title}`} role="option" aria-selected={i === highlight}>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => goTo(item)}
                          onMouseEnter={() => setHighlight(i)}
                          className={`block w-full px-5 py-2.5 text-left ${i === highlight ? "bg-paper-tint" : ""}`}
                        >
                          <span className="block text-sm font-semibold text-ink">{item.title}</span>
                          {item.subtitle && <span className="block truncate text-xs text-ink-soft">{item.subtitle}</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
}
