import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { ArticleForm } from "../ArticleForm";
import type { Article } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: PageProps<"/admin/articles/[id]">) {
  const { id } = await params;
  const rows = (await sql`select * from articles where id = ${id} limit 1`) as unknown as Article[];
  const article = rows[0];
  if (!article) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit article" />
      <ArticleForm article={article} />
    </div>
  );
}
