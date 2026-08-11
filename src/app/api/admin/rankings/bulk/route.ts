import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";

const rowSchema = z.object({
  player_name: z.string().min(1),
  world_rank: z.number().nullable(),
  grade: z.number().nullable(),
  games: z.number().nullable(),
  wins: z.number().nullable(),
  win_pct: z.number().nullable(),
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

  await sql`delete from rankings where discipline = ${discipline}`;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    await sql`
      insert into rankings (discipline, player_name, world_rank, grade, games, wins, win_pct, last_updated, sort_order)
      values (${discipline}, ${r.player_name}, ${r.world_rank}, ${r.grade}, ${r.games}, ${r.wins}, ${r.win_pct}, ${today}, ${i})
    `;
  }
  return NextResponse.json({ ok: true, count: rows.length });
}
