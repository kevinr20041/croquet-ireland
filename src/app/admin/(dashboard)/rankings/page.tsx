import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { RankingsBulkEditor } from "./RankingsBulkEditor";
import type { RankingRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminRankingsPage() {
  const [ac, gc] = await Promise.all([
    sql`select * from rankings where discipline = 'AC' order by sort_order asc` as unknown as Promise<RankingRow[]>,
    sql`select * from rankings where discipline = 'GC' order by sort_order asc` as unknown as Promise<RankingRow[]>,
  ]);

  return (
    <div>
      <AdminPageHeader title="Rankings" />
      <p className="mb-6 max-w-2xl text-sm text-ink-soft">
        Rankings are replaced in full each time you save. Paste the latest export from the WCF rankings
        database and save. This mirrors how the CAI already updates rankings today, without needing to
        touch HTML.
      </p>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 font-serif text-lg font-semibold text-ink">Association Croquet</h2>
          <RankingsBulkEditor discipline="AC" initialRows={ac} />
        </div>
        <div>
          <h2 className="mb-2 font-serif text-lg font-semibold text-ink">Golf Croquet</h2>
          <RankingsBulkEditor discipline="GC" initialRows={gc} />
        </div>
      </div>
    </div>
  );
}
