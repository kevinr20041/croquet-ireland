import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";

const articleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().optional().nullable(),
  body: z.string().min(1),
  featured_image_url: z.string().optional().nullable(),
  category: z.string().min(1),
  author: z.string().optional().nullable(),
  event_id: z.string().uuid().optional().nullable().or(z.literal("")),
  club_id: z.string().uuid().optional().nullable().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  social_caption: z.string().optional().nullable(),
  social_image_url: z.string().optional().nullable(),
  status: z.enum(["draft", "scheduled", "published", "archived"]),
  published_at: z.string().optional().nullable(),
});

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const rows = await sql`select * from articles where id = ${id} limit 1`;
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const data = articleSchema.parse(await request.json());
  const publishedAt = data.status === "published" ? data.published_at ?? new Date().toISOString() : data.published_at ?? null;

  const rows = await sql`
    update articles set
      slug = ${data.slug}, title = ${data.title}, excerpt = ${data.excerpt || null}, body = ${data.body},
      featured_image_url = ${data.featured_image_url || null}, category = ${data.category}, author = ${data.author || null},
      event_id = ${data.event_id || null}, club_id = ${data.club_id || null}, tags = ${data.tags},
      social_caption = ${data.social_caption || null}, social_image_url = ${data.social_image_url || null},
      status = ${data.status}, published_at = ${publishedAt}, updated_at = now()
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
  await sql`delete from articles where id = ${id}`;
  return NextResponse.json({ ok: true });
}
