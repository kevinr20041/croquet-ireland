import Link from "next/link";
import { Plus } from "lucide-react";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Club } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminClubsPage() {
  const clubs = (await sql`select * from clubs order by name asc`) as unknown as Club[];

  return (
    <div>
      <AdminPageHeader
        title="Clubs"
        action={
          <Link href="/admin/clubs/new" className="flex items-center gap-1.5 rounded-lg bg-lawn px-4 py-2.5 text-sm font-semibold text-paper-raised hover:bg-lawn-deep">
            <Plus size={16} /> New club
          </Link>
        }
      />
      <div className="overflow-x-auto rounded-xl border border-line bg-paper-raised">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-tint text-left text-xs font-bold uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">County</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {clubs.map((c) => (
              <tr key={c.id} className="border-b border-line-soft">
                <td className="px-4 py-3 font-medium text-ink">
                  <Link href={`/admin/clubs/${c.id}`} className="hover:underline">
                    {c.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{c.county}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteButton endpoint={`/api/admin/clubs/${c.id}`} confirmLabel={`Delete "${c.name}"?`} />
                </td>
              </tr>
            ))}
            {clubs.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-ink-faint">
                  No clubs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
