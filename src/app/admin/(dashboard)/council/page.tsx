import Link from "next/link";
import { Plus } from "lucide-react";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { CouncilMember } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminCouncilPage() {
  const members = (await sql`select * from council_members order by sort_order asc`) as unknown as CouncilMember[];

  return (
    <div>
      <AdminPageHeader
        title="Council"
        action={
          <Link href="/admin/council/new" className="flex items-center gap-1.5 rounded-lg bg-lawn px-4 py-2.5 text-sm font-semibold text-paper-raised hover:bg-lawn-deep">
            <Plus size={16} /> New member
          </Link>
        }
      />
      <div className="overflow-x-auto rounded-xl border border-line bg-paper-raised">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-tint text-left text-xs font-bold uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b border-line-soft">
                <td className="px-4 py-3 font-medium text-ink">
                  <Link href={`/admin/council/${m.id}`} className="hover:underline">
                    {m.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{m.role}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteButton endpoint={`/api/admin/council/${m.id}`} confirmLabel={`Remove "${m.name}"?`} />
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-ink-faint">
                  No council members listed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
