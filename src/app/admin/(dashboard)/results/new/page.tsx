import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { ResultForm } from "../ResultForm";
import type { Club, EventRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function NewResultPage() {
  const [clubs, events] = await Promise.all([
    sql`select * from clubs order by name asc` as unknown as Promise<Club[]>,
    sql`select * from events order by start_date desc` as unknown as Promise<EventRow[]>,
  ]);
  return (
    <div>
      <AdminPageHeader title="New result" />
      <ResultForm clubs={clubs} events={events} />
    </div>
  );
}
