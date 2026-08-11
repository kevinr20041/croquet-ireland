import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { CouncilForm } from "../CouncilForm";
import type { CouncilMember } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditCouncilMemberPage({ params }: PageProps<"/admin/council/[id]">) {
  const { id } = await params;
  const rows = (await sql`select * from council_members where id = ${id} limit 1`) as unknown as CouncilMember[];
  const member = rows[0];
  if (!member) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit council member" />
      <CouncilForm member={member} />
    </div>
  );
}
