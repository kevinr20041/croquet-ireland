import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";

const documentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  category: z.string().min(1),
  file_url: z.string().min(1),
  version: z.string().optional().nullable(),
  doc_date: z.string().optional().nullable(),
});

export async function GET() {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const rows = await sql`select * from documents order by category asc, title asc`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const d = documentSchema.parse(await request.json());
  const rows = await sql`
    insert into documents (title, description, category, file_url, version, doc_date)
    values (${d.title}, ${d.description || null}, ${d.category}, ${d.file_url}, ${d.version || null}, ${d.doc_date || null})
    returning *
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
