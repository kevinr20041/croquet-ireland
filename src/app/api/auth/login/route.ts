import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  const rows = await sql`select * from admin_users where username = ${username} limit 1`;
  const user = rows[0] as { id: string; username: string; password_hash: string; display_name: string } | undefined;

  if (!user) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  await createSession({ sub: user.id, username: user.username, displayName: user.display_name });

  return NextResponse.json({ ok: true });
}
