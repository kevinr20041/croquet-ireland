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

export async function GET() {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const rows = await sql`select * from articles order by created_at desc`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const data = articleSchema.parse(await request.json());
  const publishedAt = data.status === "published" ? data.published_at ?? new Date().toISOString() : data.published_at ?? null;

  const rows = await sql`
    insert into articles (slug, title, excerpt, body, featured_image_url, category, author, event_id, club_id, tags, social_caption, social_image_url, status, published_at)
    values (${data.slug}, ${data.title}, ${data.excerpt || null}, ${data.body}, ${data.featured_image_url || null}, ${data.category}, ${data.author || null}, ${data.event_id || null}, ${data.club_id || null}, ${data.tags}, ${data.social_caption || null}, ${data.social_image_url || null}, ${data.status}, ${publishedAt})
    returning *
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
