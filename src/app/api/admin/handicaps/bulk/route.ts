import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";

const rowSchema = z.object({
  player_name: z.string().min(1),
  handicap: z.number().nullable(),
});
const bodySchema = z.object({
  discipline: z.enum(["AC", "GC"]),
  rows: z.array(rowSchema),
});

export async function POST(request: Request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { discipline, rows } = bodySchema.parse(await request.json());
  const today = new Date().toISOString().slice(0, 10);

  await sql`delete from handicaps where discipline = ${discipline}`;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    await sql`
      insert into handicaps (discipline, player_name, handicap, last_updated, sort_order)
      values (${discipline}, ${r.player_name}, ${r.handicap}, ${today}, ${i})
    `;
  }
  return NextResponse.json({ ok: true, count: rows.length });
}
