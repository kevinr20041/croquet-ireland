import Link from "next/link";
import { Plus } from "lucide-react";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDate } from "@/components/site/ui";
import type { ResultRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminResultsPage() {
  const results = (await sql`select * from results order by result_date desc`) as unknown as ResultRow[];

  return (
    <div>
      <AdminPageHeader
        title="Results"
        action={
          <Link href="/admin/results/new" className="flex items-center gap-1.5 rounded-lg bg-lawn px-4 py-2.5 text-sm font-semibold text-paper-raised hover:bg-lawn-deep">
            <Plus size={16} /> New result
          </Link>
        }
      />
      <div className="overflow-x-auto rounded-xl border border-line bg-paper-raised">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-tint text-left text-xs font-bold uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Competition</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-b border-line-soft">
                <td className="px-4 py-3 font-medium text-ink">
                  <Link href={`/admin/results/${r.id}`} className="hover:underline">
                    {r.competition}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(r.result_date)}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteButton endpoint={`/api/admin/results/${r.id}`} confirmLabel={`Delete "${r.competition}"?`} />
                </td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-ink-faint">
                  No results yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
