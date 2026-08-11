import type { Metadata } from "next";
import { Container, PageHero } from "@/components/site/ui";
import { ArticleCard } from "@/components/site/cards";
import { getPublishedArticles } from "@/lib/queries";

export const metadata: Metadata = { title: "News" };
export const dynamic = "force-dynamic";

const CATEGORIES = [
  { id: "", label: "All" },
  { id: "tournament-report", label: "Tournament reports" },
  { id: "international", label: "International" },
  { id: "club-news", label: "Club news" },
  { id: "announcement", label: "Announcements" },
];

export default async function NewsPage({ searchParams }: PageProps<"/news">) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : "";
  const articles = await getPublishedArticles(60, category || undefined);

  return (
    <>
      <PageHero eyebrow="News" title="Latest news" description="Match reports, championship results, and CAI announcements." />
      <Container className="py-10">
        <div className="flex flex-wrap gap-2 border-b border-line pb-4">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={c.id ? `/news?category=${c.id}` : "/news"}
              className={`min-h-[40px] rounded-full border px-4 py-1.5 text-sm font-semibold ${
                category === c.id ? "border-lawn bg-lawn text-paper-raised" : "border-line text-ink-soft hover:bg-paper-tint"
              }`}
            >
              {c.label}
            </a>
          ))}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        {articles.length === 0 && <p className="py-10 text-ink-soft">No articles in this category yet.</p>}
      </Container>
    </>
  );
}
