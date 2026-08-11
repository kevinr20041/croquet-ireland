import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { EventForm } from "../EventForm";
import type { EventRow, Club } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: PageProps<"/admin/events/[id]">) {
  const { id } = await params;
  const [eventRows, clubs] = await Promise.all([
    sql`select * from events where id = ${id} limit 1` as unknown as Promise<EventRow[]>,
    sql`select * from clubs order by name asc` as unknown as Promise<Club[]>,
  ]);
  const event = eventRows[0];
  if (!event) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit event" />
      <EventForm event={event} clubs={clubs} />
    </div>
  );
}
