import { NextResponse } from "next/server";
import { searchArticles, searchClubs, searchDocuments, searchEvents, searchCouncil } from "@/lib/queries";
import { searchPageIndex } from "@/lib/searchIndex";
import { formatDateRange } from "@/components/site/ui";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (!q) {
    return NextResponse.json({ pages: [], events: [], articles: [], clubs: [], council: [], documents: [] });
  }

  const [articles, clubs, documents, events, council] = await Promise.all([
    searchArticles(q, 4),
    searchClubs(q, 4),
    searchDocuments(q, 4),
    searchEvents(q, 4),
    searchCouncil(q, 4),
  ]);

  const pages = searchPageIndex(q, 4);

  return NextResponse.json({
    pages: pages.map((p) => ({ title: p.title, subtitle: p.description, href: p.href })),
    events: events.map((e) => ({
      title: e.name,
      subtitle: formatDateRange(e.start_date, e.end_date),
      href: `/competitions/calendar/${e.slug}`,
    })),
    articles: articles.map((a) => ({ title: a.title, subtitle: a.excerpt ?? "", href: `/news/${a.slug}` })),
    clubs: clubs.map((c) => ({ title: c.name, subtitle: c.county ?? "", href: `/play/clubs/${c.slug}` })),
    council: council.map((m) => ({ title: m.name, subtitle: m.role, href: "/about" })),
    documents: documents.map((d) => ({ title: d.title, subtitle: d.description ?? "", href: d.file_url, external: true })),
  });
}
