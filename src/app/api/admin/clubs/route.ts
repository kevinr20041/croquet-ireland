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

export async function GET() {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const rows = await sql`select * from clubs order by name asc`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const d = clubSchema.parse(await request.json());
  const rows = await sql`
    insert into clubs (slug, name, county, address, phone, email, contact_person, website, facebook_url, lawns, croquet_types, beginner_friendly, description, image_url, featured)
    values (${d.slug}, ${d.name}, ${d.county || null}, ${d.address || null}, ${d.phone || null}, ${d.email || null}, ${d.contact_person || null}, ${d.website || null}, ${d.facebook_url || null}, ${d.lawns || null}, ${d.croquet_types}, ${d.beginner_friendly}, ${d.description || null}, ${d.image_url || null}, ${d.featured})
    returning *
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
