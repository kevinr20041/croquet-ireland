import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";

const placingSchema = z.object({ title: z.string(), winner: z.string(), runner_up: z.string().optional() });
const resultSchema = z.object({
  event_id: z.string().uuid().optional().nullable().or(z.literal("")),
  club_id: z.string().uuid().optional().nullable().or(z.literal("")),
  competition: z.string().min(1),
  category: z.string().optional().nullable(),
  result_date: z.string().min(1),
  summary: z.string().optional().nullable(),
  placings: z.array(placingSchema).default([]),
  pdf_url: z.string().optional().nullable(),
});

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const rows = await sql`select * from results where id = ${id} limit 1`;
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const d = resultSchema.parse(await request.json());
  const rows = await sql`
    update results set
      event_id = ${d.event_id || null}, club_id = ${d.club_id || null}, competition = ${d.competition},
      category = ${d.category || null}, result_date = ${d.result_date}, summary = ${d.summary || null},
      placings = ${JSON.stringify(d.placings)}::jsonb, pdf_url = ${d.pdf_url || null}
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
  await sql`delete from results where id = ${id}`;
  return NextResponse.json({ ok: true });
}
