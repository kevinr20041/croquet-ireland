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

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const albumRows = await sql`select * from gallery_albums where id = ${id} limit 1`;
  if (!albumRows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const photos = await sql`select * from gallery_photos where album_id = ${id} order by sort_order asc`;
  return NextResponse.json({ ...albumRows[0], photos });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const d = albumSchema.parse(await request.json());
  const rows = await sql`
    update gallery_albums set slug = ${d.slug}, title = ${d.title}, album_date = ${d.album_date || null},
      event_id = ${d.event_id || null}, cover_image_url = ${d.cover_image_url || null}, is_historical = ${d.is_historical}
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
  await sql`delete from gallery_albums where id = ${id}`;
  return NextResponse.json({ ok: true });
}
