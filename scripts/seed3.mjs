import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function seedMcWeeneyArticle() {
  const existing = await sql`select id from articles where slug = 'ireland-fail-to-regain-the-mcweeney-2024' limit 1`;
  if (existing.length) return console.log("McWeeney 2024 article already exists, skipping.");

  const carrickmines = (await sql`select id from clubs where slug = 'carrickmines-croquet-lawn-tennis-club' limit 1`)[0]?.id ?? null;

  const body = `The annual match between CAI and the Croquet Association (England) was played on 20/21 July at Carrickmines, with the visitors emerging on the right side of a 14-10 scoreline, retaining the trophy they had won at Southport the previous year.

Starting on a wet and miserable Saturday with a round of doubles, the Irish were 3-0 down by lunchtime and never recovered. The two rounds of singles showed the sides evenly matched, so the day ended at 9-6.

Sunday was a much nicer day, but again the doubles proved costly, with only Sandy Greig and Duncan Styles winning their game. The final round of singles was shared evenly, giving the visitors a comfortable victory overall.

The highlight of the match was Sandy Greig completing a triple peel on Sunday afternoon, combined with four wins out of five — earning him the Maugham Quaich as best player of the match.`;

  await sql`
    insert into articles (slug, title, excerpt, body, category, author, club_id, tags, status, published_at)
    values (
      'ireland-fail-to-regain-the-mcweeney-2024',
      'Ireland Fail To Regain The McWeeney',
      'England retain the McWeeney Trophy with a 14-10 win at Carrickmines, despite an outstanding individual display from Sandy Greig.',
      ${body}, 'international', 'CAI', ${carrickmines}, ${["McWeeney Trophy", "Carrickmines", "Association Croquet"]}, 'published', '2024-07-23T10:00:00Z'
    )
  `;
  console.log("Added Ireland Fail To Regain The McWeeney (2024) article.");
}

async function addEntryLinksToEvents() {
  await sql`
    update events set registration_link = 'https://docs.google.com/forms/d/e/1FAIpQLSd17Uu6yHFeW5BsVVPMNJhdhrPU2tUldg6ZhjCh1CXIw8si6w/viewform'
    where slug = 'co-dublin-championships-2026'
  `;
  await sql`
    update events set registration_link = 'https://docs.google.com/forms/d/e/1FAIpQLSd1TM3p84xe2i-6ml7YqG32ezQJBgNydaeXcc8VE-yHTn0thQ/viewform'
    where slug = 'championship-of-ireland-2026'
  `;
  await sql`update events set documents_url = '/competitions/tournament-conditions' where documents_url is null`;
  console.log("Linked real entry forms to Co. Dublin and Championship of Ireland 2026 events, and pointed all events at Tournament Conditions.");
}

async function seedKinealyDoc() {
  const existing = await sql`select id from documents where title ilike '%Kinealy%' limit 1`;
  if (existing.length) return console.log("Kinealy document already exists, skipping.");
  await sql`
    insert into documents (title, description, category, file_url, sort_order)
    values (
      'How the Irish Invented Croquet — Christine Kinealy',
      'An academic essay on the early Irish origins of croquet, by historian Christine Kinealy.',
      'general',
      'https://q41s7axx6lc9r6rm.public.blob.vercel-storage.com/documents/how-the-irish-invented-croquet-kinealy.pdf',
      30
    )
  `;
  console.log("Added Christine Kinealy's essay as a document.");
}

async function main() {
  await seedMcWeeneyArticle();
  await addEntryLinksToEvents();
  await seedKinealyDoc();
  console.log("\nseed3 complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
