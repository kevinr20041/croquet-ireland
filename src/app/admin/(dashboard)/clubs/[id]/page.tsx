import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { ClubForm } from "../ClubForm";
import type { Club } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditClubPage({ params }: PageProps<"/admin/clubs/[id]">) {
  const { id } = await params;
  const rows = (await sql`select * from clubs where id = ${id} limit 1`) as unknown as Club[];
  const club = rows[0];
  if (!club) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit club" />
      <ClubForm club={club} />
    </div>
  );
}
