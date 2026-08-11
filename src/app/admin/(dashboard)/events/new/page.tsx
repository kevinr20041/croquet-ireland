import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { EventForm } from "../EventForm";
import type { Club } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function NewEventPage() {
  const clubs = (await sql`select * from clubs order by name asc`) as unknown as Club[];
  return (
    <div>
      <AdminPageHeader title="New event" />
      <EventForm clubs={clubs} />
    </div>
  );
}
