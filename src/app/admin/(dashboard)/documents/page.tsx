import Link from "next/link";
import { Plus } from "lucide-react";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { DocumentRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage() {
  const documents = (await sql`select * from documents order by category asc, title asc`) as unknown as DocumentRow[];

  return (
    <div>
      <AdminPageHeader
        title="Documents"
        action={
          <Link href="/admin/documents/new" className="flex items-center gap-1.5 rounded-lg bg-lawn px-4 py-2.5 text-sm font-semibold text-paper-raised hover:bg-lawn-deep">
            <Plus size={16} /> New document
          </Link>
        }
      />
      <div className="overflow-x-auto rounded-xl border border-line bg-paper-raised">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-tint text-left text-xs font-bold uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id} className="border-b border-line-soft">
                <td className="px-4 py-3 font-medium text-ink">
                  <Link href={`/admin/documents/${d.id}`} className="hover:underline">
                    {d.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{d.category}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteButton endpoint={`/api/admin/documents/${d.id}`} confirmLabel={`Delete "${d.title}"?`} />
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-ink-faint">
                  No documents yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
