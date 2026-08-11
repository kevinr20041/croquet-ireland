import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug, getRelatedArticles } from "@/lib/queries";
import { Container, formatDate, Tag } from "@/components/site/ui";
import { ArticleCard } from "@/components/site/cards";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return { title: article?.title ?? "News" };
}

export default async function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const related = await getRelatedArticles(article.id, article.category, 3);

  return (
    <Container className="py-10">
      <Link href="/news" className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-lawn-deep hover:underline">
        <ArrowLeft size={16} /> Back to news
      </Link>
      <article className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-wide text-maroon">{article.category.replace("-", " ")}</p>
        <h1 className="mt-1.5 text-3xl font-semibold text-ink">{article.title}</h1>
        <p className="mt-2 text-sm text-ink-faint">
          {formatDate(article.published_at)} {article.author && `· ${article.author}`}
        </p>
        {article.featured_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.featured_image_url} alt="" className="mt-6 w-full rounded-xl border border-line object-cover" />
        )}
        <div className="prose-content mt-6 space-y-4 text-[1.05rem] leading-relaxed text-ink-soft whitespace-pre-line">
          {article.body}
        </div>
        {article.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </article>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-5 text-xl font-semibold text-ink">Related articles</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
