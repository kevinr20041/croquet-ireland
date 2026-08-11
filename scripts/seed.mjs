import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

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

async function seedAdmin() {
  const existing = await sql`select id from admin_users where username = 'admin' limit 1`;
  if (existing.length) {
    console.log("Admin user already exists, skipping.");
    return;
  }
  const hash = await bcrypt.hash("Croquet2026!", 10);
  await sql`insert into admin_users (username, password_hash, display_name) values ('admin', ${hash}, 'CAI Web Master')`;
  console.log("Created admin user: admin / Croquet2026!");
}

const CLUBS = [
  {
    name: "Carrickmines Croquet & Lawn Tennis Club",
    county: "Dublin",
    description:
      "A large club with four lawns in South Dublin, at which most international matches and larger tournaments are played. Home of the Championship of Ireland since 1909.",
    lawns: "4 full-size lawns",
    croquet_types: ["Association Croquet", "Golf Croquet"],
    beginner_friendly: true,
    featured: true,
  },
  {
    name: "Herbert Park Croquet Club",
    county: "Dublin",
    description:
      "The club has two lawns in Herbert Park, a lovely public park near the centre of Dublin. Around 45 members, and new members are always welcome.",
    lawns: "2 lawns",
    website: "hpcc.ie",
    facebook_url: "https://www.facebook.com/pages/Herbert-Park-Croquet-Club/960165227347725",
    contact_person: "Steven J Keating (Chairman) / Karen Keating (Hon. Sec)",
    croquet_types: ["Association Croquet", "Golf Croquet"],
    beginner_friendly: true,
  },
  {
    name: "Rushbrooke Croquet and Lawn Tennis Club",
    county: "Cork",
    description:
      "Rushbrooke has 2 croquet lawns in the picturesque town of Cobh, a short distance from Cork City. Hosts national croquet tournaments — new members and visitors always welcome. The oldest surviving club in Ireland, founded in 1882.",
    lawns: "2 lawns (green fees accepted through the Croquet Secretary)",
    website: "www.rushbrooketennis.com",
    contact_person: "Sally Donegan (Chairperson), Roy O'Connor (Captain)",
    email: "info@sallydonegan.ie",
    croquet_types: ["Association Croquet", "Golf Croquet"],
    beginner_friendly: true,
  },
  {
    name: "Trinity College Dublin Croquet Club",
    county: "Dublin",
    description: "The club has 2 full-sized lawns in the lovely New Square in the centre of Dublin City.",
    lawns: "2 full-size lawns",
    address: "P O Box 63, Regent House, Trinity College Dublin",
    contact_person: "John Lappin (Captain), Matthew Martin (Secretary)",
    croquet_types: ["Association Croquet", "Golf Croquet"],
    beginner_friendly: true,
  },
  {
    name: "Kells Croquet Club",
    county: "Meath",
    description: "A small club with two private lawns in the countryside of Co. Meath.",
    lawns: "2 private lawns",
    address: "Ballynamona House, Kells, Co Meath",
    contact_person: "Stephen Strong",
    croquet_types: ["Association Croquet"],
    beginner_friendly: false,
  },
  {
    name: "Monkstown Croquet and Lawn Tennis Club",
    county: "Cork",
    description: "A club in Monkstown, Co Cork.",
    address: "Arderin, Monkstown, Co Cork",
    contact_person: "Anna O'Connor",
    croquet_types: ["Association Croquet"],
    beginner_friendly: false,
  },
  {
    name: "Waterville Lake Croquet Society",
    county: "Kerry",
    description: "One full-size lawn and one smaller lawn.",
    lawns: "1 full-size lawn, 1 smaller lawn",
    contact_person: "Hugh O'Neill",
    email: "hughandmarian@eircom.net",
    croquet_types: ["Golf Croquet"],
    beginner_friendly: true,
  },
  {
    name: "Strokestown Croquet Club",
    county: "Roscommon",
    description: "One full-size lawn.",
    lawns: "1 full-size lawn",
    contact_person: "Grace Rickard",
    phone: "071 9633505",
    email: "jrick40@aol.com",
    croquet_types: ["Golf Croquet"],
    beginner_friendly: true,
  },
  {
    name: "Newbridge House Croquet Club",
    county: "Dublin",
    description:
      "Situated in the parkland setting of Newbridge House, Donabate, Co Dublin. Two lawns — a smaller lawn and an international-standard lawn — both refurbished by Fingal County Council in 2016-17. New members always very welcome.",
    lawns: "2 lawns (1 international standard)",
    website: "nhcccroquet.com",
    email: "nhcc.croquet@gmail.com",
    contact_person: "Clair Whyms (Chair), Anne Collins (Secretary)",
    croquet_types: ["Association Croquet", "Golf Croquet"],
    beginner_friendly: true,
  },
];

async function seedClubs() {
  const ids = {};
  for (const club of CLUBS) {
    const slug = slugify(club.name);
    const existing = await sql`select id from clubs where slug = ${slug} limit 1`;
    if (existing.length) {
      ids[club.name] = existing[0].id;
      continue;
    }
    const rows = await sql`
      insert into clubs (slug, name, county, address, phone, email, contact_person, website, facebook_url, lawns, croquet_types, beginner_friendly, description, featured)
      values (${slug}, ${club.name}, ${club.county ?? null}, ${club.address ?? null}, ${club.phone ?? null}, ${club.email ?? null}, ${club.contact_person ?? null}, ${club.website ?? null}, ${club.facebook_url ?? null}, ${club.lawns ?? null}, ${club.croquet_types}, ${club.beginner_friendly}, ${club.description ?? null}, ${club.featured ?? false})
      returning id
    `;
    ids[club.name] = rows[0].id;
  }
  console.log(`Seeded ${CLUBS.length} clubs.`);
  return ids;
}

const COUNCIL = [
  { name: "Celine Reilly", role: "Chair, Governance, Funding (Carrickmines)", sort_order: 1 },
  { name: "Huw Spiers", role: "Honorary Treasurer (Carrickmines)", sort_order: 2 },
  { name: "Alan Looney", role: "Honorary Secretary (Carrickmines)", email: "secretary@croquetireland.com", sort_order: 3 },
  { name: "Hillary Whitty", role: "Ordinary Member (Rushbrooke)", sort_order: 4 },
  { name: "Clair Whyms", role: "Ordinary Member (Newbridge House)", sort_order: 5 },
  { name: "Frank Fitzgibbon", role: "Communications (Herbert Park)", sort_order: 6 },
  { name: "Simon Williams", role: "National Children's Officer (Carrickmines)", sort_order: 7 },
  { name: "Ann Collins", role: "Outreach Events (Newbridge House)", sort_order: 8 },
  { name: "Sandy Greig", role: "Coaching Officer, Selection Committee (Carrickmines)", sort_order: 9 },
];

async function seedCouncil() {
  const existing = await sql`select count(*)::int as n from council_members`;
  if (existing[0].n > 0) {
    console.log("Council already seeded, skipping.");
    return;
  }
  for (const m of COUNCIL) {
    await sql`insert into council_members (name, role, email, sort_order) values (${m.name}, ${m.role}, ${m.email ?? null}, ${m.sort_order})`;
  }
  console.log(`Seeded ${COUNCIL.length} council members.`);
}

const AC_RANKINGS = [
  ["Andrew Johnston", 18, 2479, 43, 31, 72],
  ["Danny Johnston", 32, 2342, 23, 16, 70],
  ["Simon Williams", 48, 2291, 23, 17, 74],
  ["Tim O'Donnell", 80, 2176, 35, 26, 74],
  ["Sandy Greig", 130, 2038, 43, 23, 53],
  ["Russell Harris", 155, 1974, 50, 26, 52],
  ["Jane Morrison", 158, 1971, 35, 19, 54],
  ["Ian Vincent", 169, 1951, 12, 4, 33],
  ["Nathaniel Healy", 229, 1848, 9, 1, 11],
  ["Brian Havill", 351, 1654, 24, 10, 42],
  ["Alan Looney", 502, 1478, 13, 3, 23],
  ["Duncan Styles", 522, 1458, 17, 4, 24],
  ["Huw Spiers", 568, 1402, 17, 6, 35],
  ["Conor O'Sullivan", 646, 1312, 7, 3, 43],
  ["David Beddy", 699, 1238, 12, 9, 75],
];

const GC_RANKINGS = [
  ["Simon Williams", 144, 2193, 53, 32, 60],
  ["Fred Rogerson", 181, 2152, 23, 16, 70],
  ["Mark Stephens", 186, 2149, 38, 16, 42],
  ["Robert O'Donoghue", 192, 2144, 62, 32, 52],
  ["Charlie Von Schmieder", 199, 2133, 20, 10, 50],
  ["Kieran Murphy", 259, 2089, 47, 27, 57],
  ["Evan Newell", 465, 1951, 24, 6, 25],
  ["Alan Looney", 491, 1941, 47, 18, 38],
  ["Clair Whyms", 712, 1837, 28, 15, 54],
  ["Huw Spiers", 718, 1836, 30, 20, 67],
  ["Patricia Whitty", 1192, 1702, 19, 9, 47],
  ["David Beddy", 1217, 1695, 48, 26, 54],
  ["Patricia Mulcahy", 1270, 1681, 114, 43, 38],
  ["Sylvia Briggs", 1382, 1654, 11, 5, 45],
  ["Yvonne Marrinan", 1445, 1638, 23, 11, 48],
  ["Celine Reilly", 1546, 1611, 20, 13, 65],
  ["Hillary Whitty", 1610, 1595, 28, 11, 39],
  ["Anne Marie McGowan", 1801, 1552, 19, 8, 42],
];

async function seedRankings() {
  const existing = await sql`select count(*)::int as n from rankings`;
  if (existing[0].n > 0) {
    console.log("Rankings already seeded, skipping.");
    return;
  }
  const today = new Date().toISOString().slice(0, 10);
  let i = 0;
  for (const [name, world, grade, games, wins, pct] of AC_RANKINGS) {
    await sql`insert into rankings (discipline, player_name, world_rank, grade, games, wins, win_pct, last_updated, sort_order) values ('AC', ${name}, ${world}, ${grade}, ${games}, ${wins}, ${pct}, ${today}, ${i++})`;
  }
  i = 0;
  for (const [name, world, grade, games, wins, pct] of GC_RANKINGS) {
    await sql`insert into rankings (discipline, player_name, world_rank, grade, games, wins, win_pct, last_updated, sort_order) values ('GC', ${name}, ${world}, ${grade}, ${games}, ${wins}, ${pct}, ${today}, ${i++})`;
  }
  console.log(`Seeded ${AC_RANKINGS.length + GC_RANKINGS.length} ranking rows.`);
}

const GC_HANDICAPS = [
  ["Andrew Johnston", 11], ["Alan Looney", 10], ["Celine Reilly", 7], ["Clair Whyms", 10],
  ["Anne Collins", 4], ["Anne-Marie McGowan", 5], ["Ann Woulfe-Flanagan", 6], ["Ben Harris", 9],
  ["Bruce Hindin", 9], ["Caroline Denny", 7], ["Charlie von Schmieder", 11], ["Colm McCarthy", 5],
  ["Danny Johnston", 11], ["David McGrath", 6], ["Basil Mulligan", 6], ["Barry Kenny", 5],
];

const AC_HANDICAPS = [
  ["Andrew Johnston", 0], ["Danny Johnston", 0.5], ["Simon Williams", 1], ["Tim O'Donnell", 1.5],
  ["Sandy Greig", 2], ["Russell Harris", 2.5], ["Jane Morrison", 3], ["Ian Vincent", 3.5],
  ["Nathaniel Healy", 6], ["Brian Havill", 8], ["Alan Looney", 10], ["Huw Spiers", 12],
];

async function seedHandicaps() {
  const existing = await sql`select count(*)::int as n from handicaps`;
  if (existing[0].n > 0) {
    console.log("Handicaps already seeded, skipping.");
    return;
  }
  const today = new Date().toISOString().slice(0, 10);
  let i = 0;
  for (const [name, hcap] of AC_HANDICAPS) {
    await sql`insert into handicaps (discipline, player_name, handicap, last_updated, sort_order) values ('AC', ${name}, ${hcap}, ${today}, ${i++})`;
  }
  i = 0;
  for (const [name, hcap] of GC_HANDICAPS) {
    await sql`insert into handicaps (discipline, player_name, handicap, last_updated, sort_order) values ('GC', ${name}, ${hcap}, ${today}, ${i++})`;
  }
  console.log(`Seeded ${AC_HANDICAPS.length + GC_HANDICAPS.length} handicap rows.`);
}

const DOCUMENTS = [
  {
    title: "CAI Constitution (2018)",
    category: "governance",
    file_url: "https://croquetireland.com/cai/docs/CAI%20Constitution%202018.pdf",
    version: "2018",
  },
  {
    title: "CAI Child Safeguarding Statement",
    category: "policies",
    file_url: "https://croquetireland.com/cai/docs/Croquet%20Association%20of%20Ireland%20Safeguarding%20Policy%202023.pdf",
    version: "2023",
  },
  {
    title: "CAI Expenses Policy",
    category: "policies",
    file_url: "https://croquetireland.com/cai/docs/CAI%20Expenses%20Policy%20260121.pdf",
  },
  {
    title: "CAI Bursaries Policy",
    category: "policies",
    file_url: "https://croquetireland.com/cai/docs/CAIBursariesPolicy2602.pdf",
  },
  {
    title: "CAI Player Bursary Application Form",
    category: "forms",
    file_url: "https://croquetireland.com/cai/docs/CAIPlayerBursaryApplication2602.docx",
  },
  {
    title: "CAI Club Set-up Application Form",
    category: "forms",
    file_url: "https://croquetireland.com/cai/docs/CAIClubSetupForm2020-1.pdf",
  },
  {
    title: "CAI Individual Membership Joining Form",
    category: "forms",
    file_url: "https://croquetireland.com/cai/docs/CAI_Joining_Form.pdf",
  },
  {
    title: "Golf Croquet Handicap System (by hoop)",
    category: "rules",
    description: "Explains how the CAI Golf Croquet handicap-by-hoop system works.",
    file_url: "https://croquetireland.com/cai/docs/GolfCroquetHandicapsbyHoop.pdf",
  },
];

async function seedDocuments() {
  const existing = await sql`select count(*)::int as n from documents`;
  if (existing[0].n > 0) {
    console.log("Documents already seeded, skipping.");
    return;
  }
  let i = 0;
  for (const d of DOCUMENTS) {
    await sql`insert into documents (title, description, category, file_url, version, sort_order) values (${d.title}, ${d.description ?? null}, ${d.category}, ${d.file_url}, ${d.version ?? null}, ${i++})`;
  }
  console.log(`Seeded ${DOCUMENTS.length} documents.`);
}

async function seedEvents(clubIds) {
  const existing = await sql`select count(*)::int as n from events`;
  if (existing[0].n > 0) {
    console.log("Events already seeded, skipping.");
    return;
  }
  const carrickmines = clubIds["Carrickmines Croquet & Lawn Tennis Club"];
  const EVENTS = [
    {
      name: "Co. Dublin AC Croquet Championships 2026",
      slug: "co-dublin-championships-2026",
      start_date: "2026-06-01",
      end_date: "2026-06-01",
      venue: "Carrickmines Croquet & Lawn Tennis Club",
      club_id: carrickmines,
      competition_type: "AC, handicap events",
      description: "The Co. Dublin AC Croquet Championships — 7 graded events over the June Bank Holiday weekend.",
      status: "completed",
    },
    {
      name: "Championship of Ireland 2026",
      slug: "championship-of-ireland-2026",
      start_date: "2026-08-01",
      end_date: "2026-08-08",
      venue: "Carrickmines Croquet & Lawn Tennis Club",
      club_id: carrickmines,
      competition_type: "AC, Championship of Ireland",
      description: "The Irish AC Croquet Championships — nine trophies across all handicap levels, culminating in finals day.",
      status: "completed",
    },
    {
      name: "September Weekend",
      slug: "september-weekend-2026",
      start_date: "2026-09-12",
      end_date: "2026-09-13",
      venue: "Carrickmines Croquet & Lawn Tennis Club",
      club_id: carrickmines,
      competition_type: "AC",
      description: "Carrickmines' traditional September weekend tournament.",
      status: "upcoming",
    },
    {
      name: "Irish Golf Croquet Championships 2026",
      slug: "irish-gc-championships-2026",
      start_date: "2026-09-19",
      end_date: "2026-09-20",
      venue: "Carrickmines Croquet & Lawn Tennis Club",
      club_id: carrickmines,
      competition_type: "GC, Championship",
      description: "Ireland's national Golf Croquet Championships.",
      status: "upcoming",
    },
  ];
  for (const e of EVENTS) {
    await sql`
      insert into events (slug, name, start_date, end_date, venue, club_id, competition_type, description, status)
      values (${e.slug}, ${e.name}, ${e.start_date}, ${e.end_date}, ${e.venue}, ${e.club_id ?? null}, ${e.competition_type}, ${e.description}, ${e.status})
    `;
  }
  console.log(`Seeded ${EVENTS.length} events.`);
}

async function seedArticlesAndResults(clubIds) {
  const existing = await sql`select count(*)::int as n from articles`;
  if (existing[0].n > 0) {
    console.log("Articles already seeded, skipping.");
    return;
  }
  const carrickmines = clubIds["Carrickmines Croquet & Lawn Tennis Club"];

  const championshipBody = `The 2026 AC Irish Croquet Championships took place in Carrickmines over eight days, culminating in a grand finals day on Saturday 8th August.

The event took place in largely glorious weather — the sunniest in recent memory. There were 9 trophies to be won, catering for all handicap levels.

We had some newcomers to the Championships, with two keen visitors from England: David Beddy (Bowden), returning after his appearance at the Co. Dublin Championships in June, and first-time visitor Neil George from the High Wycombe club. David continued his meteoric rise in the sport, having taken it up only four years ago, to claim two wins and a runner-up prize shared with his doubles partner Neil George. There was also a welcome runner-up prize for newcomer Pei Wang, and Clair Whyms' good win in the USCA Salver was recognised with a handicap cut from 11 to 10.

Carrickmines' own Simon Williams had an epic best-of-three battle with his old adversary from Newcastle Croquet Club in Co. Wicklow, Andrew Johnston, for the Irish title. Having lost the first 26-6, he stormed back in the second with a 26-0 triple-peel win, leading to a nail-biting finale, which he took 26-20 after 6 hours of gruelling play in the hot sunshine. Congratulations Simon — now leading with an historic eight National titles.`;

  const articleRows = await sql`
    insert into articles (slug, title, excerpt, body, category, author, club_id, tags, status, published_at)
    values (
      'championship-of-ireland-2026-report',
      '2026 Championship of Ireland: Report',
      'Simon Williams claims an historic eighth national title after a gruelling six-hour final against Andrew Johnston at Carrickmines.',
      ${championshipBody},
      'tournament-report',
      'CAI',
      ${carrickmines ?? null},
      ${["Championship of Ireland", "Carrickmines", "Association Croquet"]},
      'published',
      '2026-08-09T10:00:00Z'
    )
    returning id
  `;

  const placings = [
    { title: "Championship Singles — Duff Mathews", winner: "Simon Williams", runner_up: "Andrew Johnston" },
    { title: "Championship Doubles — Anne Healy", winner: "Andy Johnston & Russell Harris", runner_up: "Fiachra Carroll & Danny Johnston" },
    { title: "Handicap Singles — Founders Cup", winner: "David Beddy", runner_up: "Simon Williams" },
    { title: "Handicap Doubles — Stonebrook Cups", winner: "Sandy Greig & Trudy Doyle", runner_up: "Simon Williams & Pei Wang" },
    { title: "Alt Stroke Doubles — Ann Woulfe Flanagan", winner: "Alan Looney & Celine Reilly", runner_up: "David Beddy & Neil George" },
    { title: "Green Cup (Handicaps 3-8)", winner: "David Beddy", runner_up: "Huw Spiers" },
    { title: "USCA Salver (Handicaps 9-14)", winner: "Clair Whyms", runner_up: "Neil George" },
    { title: "Newell Candlestick (Handicaps 15-20)", winner: "Ann Woulfe Flanagan", runner_up: "Celine Reilly" },
    { title: "Plate — Steele Cup", winner: "Nathaniel Healy", runner_up: "Huw Spiers" },
  ];

  await sql`
    insert into results (event_id, club_id, competition, category, result_date, summary, placings)
    values (
      null, ${carrickmines ?? null}, 'Championship of Ireland 2026', 'AC', '2026-08-08',
      'Simon Williams beat Andrew Johnston 6-26, 26-0, 26-20 in a six-hour final to win his eighth national title.',
      ${JSON.stringify(placings)}::jsonb
    )
  `;

  const dublinBody = `Carrickmines had its own marathon this weekend with the Co. Dublin AC Croquet Championships. There were 7 graded events, with Carrickmines players winning 5 of them — one went overseas to regular visitor and ex-pat Irishman David Beddy from the UK, and one to Irish International Russell Harris of Newcastle Croquet Club, Co. Wicklow.`;

  await sql`
    insert into articles (slug, title, excerpt, body, category, author, club_id, tags, status, published_at)
    values (
      'co-dublin-championship-results-2026',
      'Co Dublin Championship Results 2026',
      'Carrickmines players take five of seven graded events at the Co. Dublin AC Croquet Championships.',
      ${dublinBody},
      'tournament-report',
      'CAI',
      ${carrickmines ?? null},
      ${["Co Dublin Championships", "Carrickmines"]},
      'published',
      '2026-06-02T10:00:00Z'
    )
  `;

  await sql`
    insert into results (event_id, club_id, competition, category, result_date, summary)
    values (null, ${carrickmines ?? null}, 'Co. Dublin Championships 2026', 'AC', '2026-06-01',
      'Carrickmines players won 5 of 7 graded events; David Beddy (UK) and Russell Harris (Newcastle) took the other two.')
  `;

  console.log("Seeded 2 articles and 2 results, linked to the 2026 Championship of Ireland event id:", articleRows[0]?.id);
}

async function main() {
  await seedAdmin();
  const clubIds = await seedClubs();
  await seedCouncil();
  await seedRankings();
  await seedHandicaps();
  await seedDocuments();
  await seedEvents(clubIds);
  await seedArticlesAndResults(clubIds);
  console.log("\nSeed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
