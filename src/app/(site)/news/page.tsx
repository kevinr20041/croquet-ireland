import type { Metadata } from "next";
import { Container, PageHero } from "@/components/site/ui";
import { ArticleCard } from "@/components/site/cards";
import { getPublishedArticles, getArticleYears } from "@/lib/queries";

export const metadata: Metadata = { title: "News" };
export const dynamic = "force-dynamic";

const CATEGORIES = [
  { id: "", label: "All" },
  { id: "tournament-report", label: "Tournament reports" },
  { id: "international", label: "International" },
  { id: "club-news", label: "Club news" },
  { id: "announcement", label: "Announcements" },
];

function buildHref(category: string, year: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (year) params.set("year", year);
  const qs = params.toString();
  return qs ? `/news?${qs}` : "/news";
}

export default async function NewsPage({ searchParams }: PageProps<"/news">) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : "";
  const year = typeof params.year === "string" ? params.year : "";
  const [articles, years] = await Promise.all([
    getPublishedArticles(60, category || undefined, year || undefined),
    getArticleYears(),
  ]);

  return (
    <>
      <PageHero eyebrow="News" title="Latest news" description="Match reports, championship results, and CAI announcements — browse by category or by year." />
      <Container className="py-10">
        <div className="flex flex-wrap gap-2 border-b border-line pb-4">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={buildHref(c.id, year)}
              className={`min-h-[40px] rounded-full border px-4 py-1.5 text-sm font-semibold ${
                category === c.id ? "border-lawn bg-lawn text-paper-raised" : "border-line text-ink-soft hover:bg-paper-tint"
              }`}
            >
              {c.label}
            </a>
          ))}
        </div>

        {years.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-faint">Archive by year</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={buildHref(category, "")}
                className={`min-h-[36px] rounded-full border px-3.5 py-1 text-sm font-semibold ${
                  !year ? "border-sky bg-sky/10 text-sky" : "border-line text-ink-soft hover:bg-paper-tint"
                }`}
              >
                All years
              </a>
              {years.map((y) => (
                <a
                  key={y}
                  href={buildHref(category, String(y))}
                  className={`min-h-[36px] rounded-full border px-3.5 py-1 text-sm font-semibold ${
                    year === String(y) ? "border-sky bg-sky/10 text-sky" : "border-line text-ink-soft hover:bg-paper-tint"
                  }`}
                >
                  {y}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        {articles.length === 0 && (
          <p className="py-10 text-ink-soft">
            No articles match those filters yet — older seasons are still being added to the archive.
          </p>
        )}
      </Container>
    </>
  );
}
