import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";

const albumSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  album_date: z.string().optional().nullable(),
  event_id: z.string().uuid().optional().nullable().or(z.literal("")),
  cover_image_url: z.string().optional().nullable(),
  is_historical: z.boolean().default(false),
});

export async function GET() {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const rows = await sql`select * from gallery_albums order by album_date desc nulls last`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const d = albumSchema.parse(await request.json());
  const rows = await sql`
    insert into gallery_albums (slug, title, album_date, event_id, cover_image_url, is_historical)
    values (${d.slug}, ${d.title}, ${d.album_date || null}, ${d.event_id || null}, ${d.cover_image_url || null}, ${d.is_historical})
    returning *
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
