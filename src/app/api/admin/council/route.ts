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

export async function GET() {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const rows = await sql`select * from council_members order by sort_order asc`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const d = memberSchema.parse(await request.json());
  const rows = await sql`
    insert into council_members (name, role, email, photo_url, sort_order)
    values (${d.name}, ${d.role}, ${d.email || null}, ${d.photo_url || null}, ${d.sort_order})
    returning *
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
