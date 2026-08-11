import Link from "next/link";
import { Plus } from "lucide-react";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDate } from "@/components/site/ui";
import type { EventRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = (await sql`select * from events order by start_date desc`) as unknown as EventRow[];

  return (
    <div>
      <AdminPageHeader
        title="Events"
        action={
          <Link href="/admin/events/new" className="flex items-center gap-1.5 rounded-lg bg-lawn px-4 py-2.5 text-sm font-semibold text-paper-raised hover:bg-lawn-deep">
            <Plus size={16} /> New event
          </Link>
        }
      />
      <div className="overflow-x-auto rounded-xl border border-line bg-paper-raised">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-tint text-left text-xs font-bold uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b border-line-soft">
                <td className="px-4 py-3 font-medium text-ink">
                  <Link href={`/admin/events/${e.id}`} className="hover:underline">
                    {e.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(e.start_date)}</td>
                <td className="px-4 py-3 text-ink-soft">{e.status}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteButton endpoint={`/api/admin/events/${e.id}`} confirmLabel={`Delete "${e.name}"?`} />
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-faint">
                  No events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
