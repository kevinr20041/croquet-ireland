import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";

const memberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  email: z.string().optional().nullable(),
  photo_url: z.string().optional().nullable(),
  sort_order: z.number().default(0),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const d = memberSchema.parse(await request.json());
  const rows = await sql`
    update council_members set name = ${d.name}, role = ${d.role}, email = ${d.email || null},
      photo_url = ${d.photo_url || null}, sort_order = ${d.sort_order}
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
  await sql`delete from council_members where id = ${id}`;
  return NextResponse.json({ ok: true });
}
