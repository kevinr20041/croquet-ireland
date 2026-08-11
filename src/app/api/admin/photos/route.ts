import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";

const photoSchema = z.object({
  album_id: z.string().uuid(),
  image_url: z.string().min(1),
  caption: z.string().optional().nullable(),
  sort_order: z.number().default(0),
});

export async function POST(request: Request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const d = photoSchema.parse(await request.json());
  const rows = await sql`
    insert into gallery_photos (album_id, image_url, caption, sort_order)
    values (${d.album_id}, ${d.image_url}, ${d.caption || null}, ${d.sort_order})
    returning *
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
