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

export async function GET() {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const rows = await sql`select * from events order by start_date desc`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const d = eventSchema.parse(await request.json());
  const rows = await sql`
    insert into events (slug, name, start_date, end_date, start_time, end_time, venue, club_id, competition_type, description, entry_info, registration_link, documents_url, status)
    values (${d.slug}, ${d.name}, ${d.start_date}, ${d.end_date || null}, ${d.start_time || null}, ${d.end_time || null}, ${d.venue || null}, ${d.club_id || null}, ${d.competition_type || null}, ${d.description || null}, ${d.entry_info || null}, ${d.registration_link || null}, ${d.documents_url || null}, ${d.status})
    returning *
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
