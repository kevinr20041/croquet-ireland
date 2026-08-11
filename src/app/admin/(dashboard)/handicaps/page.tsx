import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { HandicapsBulkEditor } from "./HandicapsBulkEditor";
import type { HandicapRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminHandicapsPage() {
  const [ac, gc] = await Promise.all([
    sql`select * from handicaps where discipline = 'AC' order by sort_order asc` as unknown as Promise<HandicapRow[]>,
    sql`select * from handicaps where discipline = 'GC' order by sort_order asc` as unknown as Promise<HandicapRow[]>,
  ]);

  return (
    <div>
      <AdminPageHeader title="Handicaps" />
      <p className="mb-6 max-w-2xl text-sm text-ink-soft">
        Handicaps are replaced in full each time you save — paste the latest list and save.
      </p>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 font-serif text-lg font-semibold text-ink">Association Croquet</h2>
          <HandicapsBulkEditor discipline="AC" initialRows={ac} />
        </div>
        <div>
          <h2 className="mb-2 font-serif text-lg font-semibold text-ink">Golf Croquet</h2>
          <HandicapsBulkEditor discipline="GC" initialRows={gc} />
        </div>
      </div>
    </div>
  );
}
