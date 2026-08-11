import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { DocumentForm } from "../DocumentForm";
import type { DocumentRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditDocumentPage({ params }: PageProps<"/admin/documents/[id]">) {
  const { id } = await params;
  const rows = (await sql`select * from documents where id = ${id} limit 1`) as unknown as DocumentRow[];
  const doc = rows[0];
  if (!doc) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit document" />
      <DocumentForm document={doc} />
    </div>
  );
}
