import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";

const eventSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  start_date: z.string().min(1),
  end_date: z.string().optional().nullable(),
  start_time: z.string().optional().nullable(),
  end_time: z.string().optional().nullable(),
  venue: z.string().optional().nullable(),
  club_id: z.string().uuid().optional().nullable().or(z.literal("")),
  competition_type: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  entry_info: z.string().optional().nullable(),
  registration_link: z.string().optional().nullable(),
  documents_url: z.string().optional().nullable(),
  status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]),
});

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const rows = await sql`select * from events where id = ${id} limit 1`;
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const d = eventSchema.parse(await request.json());
  const rows = await sql`
    update events set
      slug = ${d.slug}, name = ${d.name}, start_date = ${d.start_date}, end_date = ${d.end_date || null},
      start_time = ${d.start_time || null}, end_time = ${d.end_time || null}, venue = ${d.venue || null},
      club_id = ${d.club_id || null}, competition_type = ${d.competition_type || null}, description = ${d.description || null},
      entry_info = ${d.entry_info || null}, registration_link = ${d.registration_link || null}, documents_url = ${d.documents_url || null},
      status = ${d.status}, updated_at = now()
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
  await sql`delete from events where id = ${id}`;
  return NextResponse.json({ ok: true });
}
