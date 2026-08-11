import Link from "next/link";
import { Plus } from "lucide-react";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDate } from "@/components/site/ui";
import type { Article } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = (await sql`select * from articles order by created_at desc`) as unknown as Article[];

  return (
    <div>
      <AdminPageHeader
        title="News"
        action={
          <Link href="/admin/articles/new" className="flex items-center gap-1.5 rounded-lg bg-lawn px-4 py-2.5 text-sm font-semibold text-paper-raised hover:bg-lawn-deep">
            <Plus size={16} /> New article
          </Link>
        }
      />
      <div className="overflow-x-auto rounded-xl border border-line bg-paper-raised">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-tint text-left text-xs font-bold uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-line-soft">
                <td className="px-4 py-3 font-medium text-ink">
                  <Link href={`/admin/articles/${a.id}`} className="hover:underline">
                    {a.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{a.category}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${a.status === "published" ? "bg-lawn/15 text-lawn-deep" : "bg-gold/15 text-gold"}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(a.published_at)}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteButton endpoint={`/api/admin/articles/${a.id}`} confirmLabel={`Delete "${a.title}"?`} />
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-faint">
                  No articles yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
