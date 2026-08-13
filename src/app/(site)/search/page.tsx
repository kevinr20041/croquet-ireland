import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, MapPinned, FileText, CalendarDays, Users, Compass } from "lucide-react";
import { Container, PageHero, formatDateRange } from "@/components/site/ui";
import { searchArticles, searchClubs, searchDocuments, searchEvents, searchCouncil } from "@/lib/queries";
import { searchPageIndex } from "@/lib/searchIndex";
import { SearchAutocomplete } from "./SearchAutocomplete";

export const metadata: Metadata = { title: "Search" };
export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";

  const pages = q ? searchPageIndex(q) : [];
  const [articles, clubs, documents, events, council] = q
    ? await Promise.all([searchArticles(q), searchClubs(q), searchDocuments(q), searchEvents(q), searchCouncil(q)])
    : [[], [], [], [], []];

  const totalResults = pages.length + articles.length + clubs.length + documents.length + events.length + council.length;

  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Search the CAI website"
        description="Rankings, handicaps, news, clubs, calendar, council and documents, all in one place."
      />
      <Container className="py-10">
        <SearchAutocomplete initialQuery={q} />

        {q && (
          <p className="mt-4 text-sm text-ink-faint">
            {totalResults} result{totalResults === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
          </p>
        )}

        {pages.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-soft">
              <Compass size={16} /> Where to find it
            </h2>
            <ul className="divide-y divide-line-soft rounded-xl border border-line bg-paper-raised">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="block px-5 py-3 hover:bg-paper-tint">
                    <p className="font-semibold text-ink">{p.title}</p>
                    <p className="text-sm text-ink-soft">{p.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {events.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-soft">
              <CalendarDays size={16} /> Calendar events
            </h2>
            <ul className="divide-y divide-line-soft rounded-xl border border-line bg-paper-raised">
              {events.map((e) => (
                <li key={e.id}>
                  <Link href={`/competitions/calendar/${e.slug}`} className="block px-5 py-3 hover:bg-paper-tint">
                    <p className="font-semibold text-ink">{e.name}</p>
                    <p className="text-sm text-ink-soft">{formatDateRange(e.start_date, e.end_date)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {articles.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-soft">
              <Newspaper size={16} /> News
            </h2>
            <ul className="divide-y divide-line-soft rounded-xl border border-line bg-paper-raised">
              {articles.map((a) => (
                <li key={a.id}>
                  <Link href={`/news/${a.slug}`} className="block px-5 py-3 hover:bg-paper-tint">
                    <p className="font-semibold text-ink">{a.title}</p>
                    {a.excerpt && <p className="text-sm text-ink-soft">{a.excerpt}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {clubs.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-soft">
              <MapPinned size={16} /> Clubs
            </h2>
            <ul className="divide-y divide-line-soft rounded-xl border border-line bg-paper-raised">
              {clubs.map((c) => (
                <li key={c.id}>
                  <Link href={`/play/clubs/${c.slug}`} className="block px-5 py-3 hover:bg-paper-tint">
                    <p className="font-semibold text-ink">{c.name}</p>
                    {c.county && <p className="text-sm text-ink-soft">{c.county}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {council.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-soft">
              <Users size={16} /> Council
            </h2>
            <ul className="divide-y divide-line-soft rounded-xl border border-line bg-paper-raised">
              {council.map((m) => (
                <li key={m.id}>
                  <Link href="/about" className="block px-5 py-3 hover:bg-paper-tint">
                    <p className="font-semibold text-ink">{m.name}</p>
                    <p className="text-sm text-ink-soft">{m.role}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {documents.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-soft">
              <FileText size={16} /> Documents
            </h2>
            <ul className="divide-y divide-line-soft rounded-xl border border-line bg-paper-raised">
              {documents.map((d) => (
                <li key={d.id}>
                  <a href={d.file_url} target="_blank" rel="noopener noreferrer" className="block px-5 py-3 hover:bg-paper-tint">
                    <p className="font-semibold text-ink">{d.title}</p>
                    {d.description && <p className="text-sm text-ink-soft">{d.description}</p>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {q && totalResults === 0 && <p className="mt-8 text-ink-soft">No results found. Try a different search term.</p>}
      </Container>
    </>
  );
}
