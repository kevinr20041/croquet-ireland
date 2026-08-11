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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const d = documentSchema.parse(await request.json());
  const rows = await sql`
    update documents set title = ${d.title}, description = ${d.description || null}, category = ${d.category},
      file_url = ${d.file_url}, version = ${d.version || null}, doc_date = ${d.doc_date || null}
    where id = ${id}
    returning *
  `;
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  await sql`delete from documents where id = ${id}`;
  return NextResponse.json({ ok: true });
}
