import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";

const clubSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  county: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  contact_person: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  facebook_url: z.string().optional().nullable(),
  lawns: z.string().optional().nullable(),
  croquet_types: z.array(z.string()).default([]),
  beginner_friendly: z.boolean().default(true),
  description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  featured: z.boolean().default(false),
});

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const rows = await sql`select * from clubs where id = ${id} limit 1`;
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const d = clubSchema.parse(await request.json());
  const rows = await sql`
    update clubs set
      slug = ${d.slug}, name = ${d.name}, county = ${d.county || null}, address = ${d.address || null},
      phone = ${d.phone || null}, email = ${d.email || null}, contact_person = ${d.contact_person || null},
      website = ${d.website || null}, facebook_url = ${d.facebook_url || null}, lawns = ${d.lawns || null},
      croquet_types = ${d.croquet_types}, beginner_friendly = ${d.beginner_friendly}, description = ${d.description || null},
      image_url = ${d.image_url || null}, featured = ${d.featured}, updated_at = now()
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
  await sql`delete from clubs where id = ${id}`;
  return NextResponse.json({ ok: true });
}
