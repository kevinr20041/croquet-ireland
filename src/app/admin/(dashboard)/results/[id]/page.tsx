import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { ResultForm } from "../ResultForm";
import type { ResultRow, Club, EventRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditResultPage({ params }: PageProps<"/admin/results/[id]">) {
  const { id } = await params;
  const [resultRows, clubs, events] = await Promise.all([
    sql`select * from results where id = ${id} limit 1` as unknown as Promise<ResultRow[]>,
    sql`select * from clubs order by name asc` as unknown as Promise<Club[]>,
    sql`select * from events order by start_date desc` as unknown as Promise<EventRow[]>,
  ]);
  const result = resultRows[0];
  if (!result) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit result" />
      <ResultForm result={result} clubs={clubs} events={events} />
    </div>
  );
}
