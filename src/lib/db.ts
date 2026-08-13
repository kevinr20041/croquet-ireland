import { neon, types } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// The driver parses `date` columns into JS Date objects by default, but every
// query/type in this app treats date columns as plain "YYYY-MM-DD" strings
// (for .slice(), string comparisons like `>= today`, etc). Keep them as the
// raw string Postgres returns instead of auto-parsing to Date.
types.setTypeParser(types.builtins.DATE, (value: string) => value);

export const sql = neon(process.env.DATABASE_URL);
