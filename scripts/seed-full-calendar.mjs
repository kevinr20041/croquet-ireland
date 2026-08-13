import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const CARRICKMINES = "Carrickmines Croquet & Lawn Tennis Club";

// Real fixtures pulled from the CAI's live TeamUp calendar (embedded at
// croquetireland.com/node/494). Venue is only set where independently
// confirmed (via a matching news article) — left blank otherwise rather
// than assuming every fixture is at Carrickmines.
const EVENTS = [
  { name: "Carrickmines v Hamptworth", start: "2025-08-21", end: "2025-08-22", type: "AC" },
  { name: "Ireland v Spain Women GC", start: "2025-09-06", end: "2025-09-07", type: "GC International", venue: CARRICKMINES },
  { name: "Golf Croquet Championships of Ireland (Open)", start: "2025-09-12", end: "2025-09-14", type: "GC" },
  { name: "B J Fitzpatrick Cup (Juniors)", start: "2025-09-20", end: "2025-09-21", type: "GC Juniors" },
  { name: "R J Leonard Novices Trophy", start: "2025-10-04", end: "2025-10-05", type: "GC" },
  { name: "European GC Club League Finals", start: "2025-10-10", end: "2025-10-12", type: "GC" },
  { name: "Club GC (non-handicap) Finals", start: "2025-10-18", end: "2025-10-19", type: "GC" },
  { name: "Autumn Bowl (Open)", start: "2025-10-26", end: "2025-10-27", type: "AC" },
  { name: "Turkey Tournament AC & GC", start: "2025-11-09", end: "2025-11-09", type: "AC & GC" },
  { name: "Maymes Ansell GC Invitational", start: "2025-11-15", end: "2025-11-16", type: "GC" },
  { name: "Turkey Tournament AC & GC", start: "2025-11-23", end: "2025-11-23", type: "AC & GC" },
  { name: "Turkey Tournament AC & GC", start: "2025-11-30", end: "2025-11-30", type: "AC & GC" },
  { name: "Turkey Tournament AC & GC", start: "2025-12-07", end: "2025-12-07", type: "AC & GC" },
  { name: "Turkey Tournament AC & GC", start: "2025-12-14", end: "2025-12-14", type: "AC & GC" },
  { name: "Turkey Tournament AC & GC", start: "2025-12-21", end: "2025-12-21", type: "AC & GC" },
  { name: "Valentine's Tournament", start: "2026-01-11", end: "2026-01-11", type: "GC" },
  { name: "Valentine's Tournament", start: "2026-01-18", end: "2026-01-18", type: "GC" },
  { name: "Valentine's Tournament", start: "2026-01-25", end: "2026-01-25", type: "GC" },
  { name: "Valentine's Tournament", start: "2026-02-01", end: "2026-02-01", type: "GC" },
  { name: "Valentine's Tournament", start: "2026-02-08", end: "2026-02-08", type: "GC" },
  { name: "Valentine's Tournament", start: "2026-02-15", end: "2026-02-15", type: "GC" },
  { name: "Valentine's Tournament", start: "2026-02-22", end: "2026-02-22", type: "GC" },
  { name: "St Patrick's Day Weekend", start: "2026-03-15", end: "2026-03-16", type: "GC" },
  { name: "Easter Tournament (Open) GC", start: "2026-04-04", end: "2026-04-04", type: "GC" },
  { name: "Easter Tournament (Open) AC", start: "2026-04-06", end: "2026-04-06", type: "AC" },
  { name: "Charity One-Ball", start: "2026-04-11", end: "2026-04-11", type: "AC" },
  { name: "Silver Medal (Invitation)", start: "2026-04-25", end: "2026-04-26", type: "AC", venue: CARRICKMINES, articleSlug: "cai-silver-medal-2026", resultCompetition: "CAI Silver Medal 2026" },
  { name: "Gymnastic Cup (Open) Handicap", start: "2026-05-03", end: "2026-05-04", type: "AC" },
  { name: "Appleton Trophy v Scotland", start: "2026-05-09", end: "2026-05-10", type: "AC International", venue: "Scottish National Croquet Centre, Balgreen, Edinburgh", articleSlug: "appleton-report-edinburgh-2026" },
  { name: "European GC Club League B Heat", start: "2026-05-16", end: "2026-05-17", type: "GC" },
  { name: "Harrison Cup (Open)", start: "2026-05-23", end: "2026-05-24", type: "GC" },
  { name: "European Women's GC Championships", start: "2026-06-25", end: "2026-06-28", type: "GC" },
  { name: "GC Home Internationals", start: "2026-07-18", end: "2026-07-19", type: "GC International" },
  { name: "Alternate Shot Doubles", start: "2026-07-18", end: "2026-07-19", type: "AC" },
  { name: "World AC Team Championships", start: "2026-07-22", end: "2026-07-27", type: "AC" },
  { name: "McWeeney Trophy v England", start: "2026-08-15", end: "2026-08-16", type: "AC International" },
  { name: "Golf Croquet Championships of Ireland (Open)", start: "2026-09-11", end: "2026-09-13", type: "GC" },
  { name: "B J Fitzpatrick Cup (Juniors)", start: "2026-09-19", end: "2026-09-20", type: "GC Juniors" },
  { name: "Reggie Leonard Novices Trophy", start: "2026-10-04", end: "2026-10-04", type: "GC" },
  { name: "European GC Club League Finals", start: "2026-10-09", end: "2026-10-11", type: "GC" },
  { name: "Club AC (non-handicap) Finals", start: "2026-10-17", end: "2026-10-18", type: "AC" },
  { name: "Club GC (non-handicap) Finals", start: "2026-10-17", end: "2026-10-18", type: "GC" },
  { name: "Autumn Bowl (Open)", start: "2026-10-25", end: "2026-10-26", type: "AC" },
  { name: "Maymes Ansell GC Invitational", start: "2026-11-14", end: "2026-11-15", type: "GC" },
  { name: "Turkey Tournament AC & GC", start: "2026-11-15", end: "2026-11-15", type: "AC & GC" },
  { name: "Turkey Tournament AC & GC", start: "2026-11-22", end: "2026-11-22", type: "AC & GC" },
  { name: "Turkey Tournament AC & GC", start: "2026-11-29", end: "2026-11-29", type: "AC & GC" },
  { name: "Turkey Tournament AC & GC", start: "2026-12-06", end: "2026-12-06", type: "AC & GC" },
  { name: "Turkey Tournament AC & GC", start: "2026-12-13", end: "2026-12-13", type: "AC & GC" },
  { name: "Turkey Tournament AC & GC", start: "2026-12-20", end: "2026-12-20", type: "AC & GC" },
  // AC Home Internationals and Championships of County Dublin are handled separately below
  // because they already exist (as an event or as an article) from the first migration pass.
];

function computeStatus(start, end, today) {
  const s = new Date(start);
  const e = new Date(end || start);
  if (e < today) return "completed";
  if (s > today) return "upcoming";
  return "ongoing";
}

async function insertEvent({ name, start, end, type, venue, slugSuffix }, today, carrickminesId) {
  const slug = slugify(`${name}-${start}${slugSuffix ?? ""}`);
  const existing = await sql`select id from events where slug = ${slug} limit 1`;
  if (existing.length) return existing[0].id;

  const status = computeStatus(start, end, today);
  const clubId = venue === CARRICKMINES ? carrickminesId : null;
  const rows = await sql`
    insert into events (slug, name, start_date, end_date, venue, club_id, competition_type, status)
    values (${slug}, ${name}, ${start}, ${end}, ${venue ?? null}, ${clubId}, ${type}, ${status})
    returning id
  `;
  return rows[0].id;
}

async function main() {
  const today = new Date();
  const carrickmines = (await sql`select id from clubs where slug = 'carrickmines-croquet-lawn-tennis-club' limit 1`)[0]?.id ?? null;

  let inserted = 0;
  for (const ev of EVENTS) {
    const existingCount = await sql`select count(*)::int as n from events where name = ${ev.name} and start_date = ${ev.start}`;
    if (existingCount[0].n > 0) continue;
    const id = await insertEvent(ev, today, carrickmines);
    inserted++;

    if (ev.articleSlug) {
      await sql`update articles set event_id = ${id} where slug = ${ev.articleSlug}`;
    }
    if (ev.resultCompetition) {
      await sql`update results set event_id = ${id} where competition = ${ev.resultCompetition}`;
    }
  }
  console.log(`Inserted ${inserted} new real events from the CAI calendar.`);

  // --- AC Home Internationals 2026 (article already exists, no event yet) ---
  const homeIntSlug = slugify("ac-home-internationals-2026-06-06");
  const homeIntExisting = await sql`select id from events where slug = ${homeIntSlug} limit 1`;
  let homeIntId = homeIntExisting[0]?.id;
  if (!homeIntId) {
    const rows = await sql`
      insert into events (slug, name, start_date, end_date, venue, club_id, competition_type, status)
      values (${homeIntSlug}, 'AC Home Internationals', '2026-06-06', '2026-06-07', ${CARRICKMINES}, ${carrickmines}, 'AC International', 'completed')
      returning id
    `;
    homeIntId = rows[0].id;
    console.log("Inserted AC Home Internationals 2026 event.");
  }
  await sql`update articles set event_id = ${homeIntId} where slug = 'ac-home-internationals-report-2026'`;

  // --- Ireland v Spain Women's GC — the article's published_at was a placeholder guess (2026-03-16);
  // the real calendar shows this fixture only occurred 6-7 Sep 2025. Correct the article date. ---
  const spainEvent = await sql`select id from events where name = 'Ireland v Spain Women GC' and start_date = '2025-09-06' limit 1`;
  if (spainEvent.length) {
    await sql`update articles set event_id = ${spainEvent[0].id}, published_at = '2025-09-08T10:00:00Z' where slug = 'ireland-spain-4th-womens-gc-match'`;
    console.log("Corrected Ireland v Spain article date to match the real fixture (was a placeholder guess) and linked it to the event.");
  }

  // --- Appleton Trophy — article published_at (2026-05-04) was before the real fixture date (9-10 May). Fix. ---
  const appletonEvent = await sql`select id from events where name = 'Appleton Trophy v Scotland' and start_date = '2026-05-09' limit 1`;
  if (appletonEvent.length) {
    await sql`update articles set published_at = '2026-05-11T10:00:00Z' where slug = 'appleton-report-edinburgh-2026'`;
    console.log("Corrected Appleton Trophy article date — it was dated before the real fixture took place.");
  }

  // --- Championships of County Dublin: correct the existing event's date range to the real 29 May - 1 Jun span ---
  await sql`
    update events set start_date = '2026-05-29', end_date = '2026-06-01'
    where slug = 'co-dublin-championships-2026'
  `;
  const coDublinEvent = await sql`select id from events where slug = 'co-dublin-championships-2026' limit 1`;
  if (coDublinEvent.length) {
    await sql`update articles set event_id = ${coDublinEvent[0].id} where slug = 'co-dublin-championship-results-2026'`;
    await sql`update results set event_id = ${coDublinEvent[0].id} where competition = 'Co. Dublin Championships 2026'`;
    console.log("Corrected Co. Dublin Championships event date range to the real 29 May - 1 Jun 2026 span and linked article/result.");
  }

  // --- Championship of Ireland: link the existing article/result to the existing event ---
  const coiEvent = await sql`select id from events where slug = 'championship-of-ireland-2026' limit 1`;
  if (coiEvent.length) {
    await sql`update articles set event_id = ${coiEvent[0].id} where slug = 'championship-of-ireland-2026-report'`;
    await sql`update results set event_id = ${coiEvent[0].id} where competition = 'Championship of Ireland 2026'`;
    console.log("Linked Championship of Ireland article/result to its event.");
  }

  const total = await sql`select count(*)::int as n from events`;
  console.log(`\nDone. ${total[0].n} total events now in the database.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
