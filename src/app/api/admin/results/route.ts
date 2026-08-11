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

export async function GET() {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const rows = await sql`select * from results order by result_date desc`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const d = resultSchema.parse(await request.json());
  const rows = await sql`
    insert into results (event_id, club_id, competition, category, result_date, summary, placings, pdf_url)
    values (${d.event_id || null}, ${d.club_id || null}, ${d.competition}, ${d.category || null}, ${d.result_date}, ${d.summary || null}, ${JSON.stringify(d.placings)}::jsonb, ${d.pdf_url || null})
    returning *
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
