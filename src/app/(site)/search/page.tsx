import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, MapPinned, FileText } from "lucide-react";
import { Container, PageHero } from "@/components/site/ui";
import { searchArticles, searchClubs, searchDocuments } from "@/lib/queries";

export const metadata: Metadata = { title: "Search" };
export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";

  const [articles, clubs, documents] = q
    ? await Promise.all([searchArticles(q), searchClubs(q), searchDocuments(q)])
    : [[], [], []];

  const totalResults = articles.length + clubs.length + documents.length;

  return (
    <>
      <PageHero eyebrow="Search" title="Search the CAI website" description="News, clubs and documents in one place." />
      <Container className="py-10">
        <form action="/search" method="get" className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search news, clubs, documents…"
            className="min-h-[48px] flex-1 rounded-lg border border-line bg-paper-raised px-4 py-2.5 text-lg text-ink"
            autoFocus
          />
          <button type="submit" className="min-h-[48px] rounded-lg bg-lawn px-6 font-semibold text-paper-raised hover:bg-lawn-deep">
            Search
          </button>
        </form>

        {q && (
          <p className="mt-4 text-sm text-ink-faint">
            {totalResults} result{totalResults === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
          </p>
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
