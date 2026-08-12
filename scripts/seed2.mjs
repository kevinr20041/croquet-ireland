import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function replaceGcHandicaps() {
  const raw = readFileSync(new URL("./gc-handicaps-raw.txt", import.meta.url), "utf8");
  const rows = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("\t");
      if (parts.length !== 3) return null;
      const [name, hcap, date] = parts;
      const num = Number(hcap);
      if (!name || Number.isNaN(num)) return null;
      return { name: name.trim(), hcap: num, date: date.trim() };
    })
    .filter(Boolean);

  await sql`delete from handicaps where discipline = 'GC'`;
  let i = 0;
  for (const r of rows) {
    await sql`insert into handicaps (discipline, player_name, handicap, last_updated, sort_order) values ('GC', ${r.name}, ${r.hcap}, ${r.date}, ${i++})`;
  }
  console.log(`Replaced GC handicaps with ${rows.length} real players from the live site.`);
}

async function clearFabricatedAcHandicaps() {
  const res = await sql`delete from handicaps where discipline = 'AC'`;
  console.log(`Cleared placeholder AC handicap rows (${res.length ?? 0}) — the live site's AC handicap page currently serves no data to migrate; CAI can populate real figures via the bulk editor.`);
}

const EXTENDED_AC_RANKINGS = [
  ["Andrew Johnston", 18, 2479, 43, 31, 72],
  ["Danny Johnston", 34, 2342, 23, 16, 70],
  ["Simon Williams", 51, 2291, 23, 17, 74],
  ["Tim O'Donnell", 86, 2176, 35, 26, 74],
  ["Sandy Greig", 138, 2038, 43, 23, 53],
  ["Russell Harris", 164, 1974, 50, 26, 52],
  ["Jane Morrison", 167, 1971, 35, 19, 54],
  ["Ian Vincent", 178, 1951, 12, 4, 33],
  ["Fiachra Carroll", 234, 1862, 2, 0, 0],
  ["Fred Rogerson", 237, 1859, 3, 1, 33],
  ["Nathaniel Healy", 244, 1848, 9, 1, 11],
  ["Brian Havill", 382, 1654, 24, 10, 42],
  ["Alan Looney", 556, 1478, 13, 3, 23],
  ["Duncan Styles", 581, 1458, 17, 4, 24],
  ["Huw Spiers", 642, 1402, 17, 6, 35],
  ["Nigel Werner", 651, 1389, 4, 2, 50],
  ["Gerard Osborne-Burke", 690, 1360, 2, 0, 0],
  ["Conor O'Sullivan", 738, 1312, 7, 3, 43],
  ["David Beddy", 803, 1238, 12, 9, 75],
  ["Anne-Marie McGowan", 1011, 1079, 6, 2, 33],
  ["Clair Whyms", 1014, 1075, 4, 4, 100],
  ["Patricia Mulcahy", 1051, 1040, 6, 2, 33],
  ["Geraldine O'Rourke", 1073, 1003, 3, 1, 33],
];

async function replaceAcRankings() {
  await sql`delete from rankings where discipline = 'AC'`;
  const today = new Date().toISOString().slice(0, 10);
  let i = 0;
  for (const [name, world, grade, games, wins, pct] of EXTENDED_AC_RANKINGS) {
    await sql`insert into rankings (discipline, player_name, world_rank, grade, games, wins, win_pct, last_updated, sort_order) values ('AC', ${name}, ${world}, ${grade}, ${games}, ${wins}, ${pct}, ${today}, ${i++})`;
  }
  console.log(`Replaced AC rankings with the full extended list (${EXTENDED_AC_RANKINGS.length} players).`);
}

async function seedMoreArticles() {
  const carrickmines = (await sql`select id from clubs where slug = 'carrickmines-croquet-lawn-tennis-club' limit 1`)[0]?.id ?? null;

  const articles = [
    {
      slug: "ac-home-internationals-report-2026",
      title: "AC Home Internationals Report 2026",
      excerpt:
        "The Home Internationals returned to Carrickmines for the first time since 2022, with Irish debutant Tim O'Donnell making an immediate impact.",
      body: `Carrickmines Croquet and Lawn Tennis Club, Co. Dublin, Ireland — June 6-7th 2026

The 2026 AC Home Internationals returned to Ireland for the first time since 2022. The visiting teams from England, Scotland and Wales were met by customary mildly inclement weather and an air of excitement: the Irish hosts were desperate to make up for the nail-biting finish and wafer-thin loss to the English in the 2025 tournament at Budleigh Salterton. Having lost by a single game on that occasion, they were keen to take advantage of familiar conditions in Carrickmines.

Angharad Walters of Wales, managing the event once again to extend a long sequence in the role, drew the opening match-ups of England vs Wales and Ireland vs Scotland. The overnight rain had left some standing water on Lawn 4, but otherwise the courts were remarkably well drained, which was a testament to the Club's recent investment. Tournament veterans David Maugham and Simon Williams got off to rapid starts, each going a game up on their opponents in short order. David quickly put the first point on the board for England with a +24TP, +26TP victory over Chris Williams, but Simon's opponent, Stefan Colling, dug in in game 2 and fought to earn a 1-1 match position around lunchtime.

Meanwhile, Andrew Johnston, the event's highest-ranked player and Irish number 1, was in a similar battle with Alastair Burn-Murdoch. Irish debutant Tim O'Donnell had a strong start to his Home Internationals career, taking the first game off David Magee playing in the number 4 position. Danny Johnston got in early in both games against Martin Murray, putting an Irish point on the board at roughly the same time Simon eventually got over the line against Stefan, with the win over Scotland rounded out by debutant O'Donnell in two games.

Ireland went on to record a strong showing across the weekend, with Tim O'Donnell's debut becoming one to remember and Sandy Greig, Andrew Johnston and Danny Johnston all contributing crucial points as the tournament moved through its rounds at Carrickmines.`,
      category: "international",
      author: "CAI",
      club_id: carrickmines,
      tags: ["Home Internationals", "Carrickmines", "Association Croquet"],
      status: "published",
      published_at: "2026-06-08T10:00:00Z",
    },
    {
      slug: "appleton-report-edinburgh-2026",
      title: "Appleton Report Edinburgh 2026",
      excerpt:
        "Ireland travelled to Edinburgh as holders of the Appleton Trophy but fell 16-9 to a Scottish side inspired by MVP Rosemary Saunders Robertson.",
      body: `The Irish team of Nathaniel Healy, Russell Harris, Brian Havill, Alan Looney, Huw Spiers and debutant Henry Bagwell travelled as holders to the new Scottish National Croquet Centre at Balgreen in Edinburgh. However, Russell did a little unintended detour to say goodbye to the old venue at Meadows.

The Scots team of John Owen, Stefan Colling, Rosemary Saunders Robertson, Kathy Brown and Roger Binks was led by captain Chris Martin and had a clean sweep of the open 3 doubles matches before the two-session afternoon singles were equally shared 6-6, so the overnight score stood at 9-6 to the Scots.

The venue's catering volunteer Charlotte did a wonderful job warming everyone up with a welcome bowl of soup as a chilly East wind took its toll in the morning, followed by an array of other delicious dishes. Led by tournament manager Jane Morrison, the teams retired for a wonderful Italian meal washed down by delicious wines. CAI would like to extend its thanks to the SCA for their generous hospitality and to the accommodation hosts.

Play resumed on Sunday morning at 9am for a fresh round of doubles, which Scotland took 2-1, increasing their overnight lead. The fixture was rounded off by a round of singles, also won by the SCA 4-2, for a final score of 16-9 to the Scots. The lawns were perfectly prepared by Roger and Campbell and were faster than those previously experienced at Meadows.

Congratulations to MVP Rosemary Saunders Robertson of the SCA, who won 5 from 5 in a devastating display of accuracy. Ireland's star player was Russell Harris, winning all his singles. Ireland looks forward to next year's contest in Carrickmines to compete for the Appleton Trophy once again.`,
      category: "international",
      author: "CAI",
      club_id: carrickmines,
      tags: ["Appleton Trophy", "Scotland", "Association Croquet"],
      status: "published",
      published_at: "2026-05-04T10:00:00Z",
    },
    {
      slug: "cai-silver-medal-2026",
      title: "CAI Silver Medal 2026",
      excerpt: "Simon Williams completed a triple peel in the final round to edge out Danny Johnston and claim the CAI Association Croquet Silver Medal.",
      body: `The CAI Association Croquet Silver Medal was held at Carrickmines on 25/26 April, featuring 8 of the top AC players in Ireland. The lawns were in excellent condition, the weather was warm and dry, and there was some top-quality croquet with 9 triple peels.

Everyone played 7 games and it came down to the final round with Simon Williams, unbeaten in his first 6 games, against Danny Johnston, who had won 5 but would win on hoop difference if he beat Simon. Danny got in first but broke down attempting a triple, and Simon calmly went round, completing his own triple, to win the Silver Medal.

Three players had 5 wins, but on hoop difference Tim O'Donnell, playing in this event for the first time, came second, Danny came third and Sandy Greig fourth.`,
      category: "tournament-report",
      author: "CAI",
      club_id: carrickmines,
      tags: ["Silver Medal", "Carrickmines", "Association Croquet"],
      status: "published",
      published_at: "2026-04-27T10:00:00Z",
    },
    {
      slug: "ireland-spain-4th-womens-gc-match",
      title: "Ireland – Spain 4th Women's GC Match",
      excerpt: "Spain took 10 of the last 12 games to win the fourth women's GC international 33-24 at Carrickmines, despite a spirited Irish fightback.",
      body: `Carrickmines Croquet and Lawn Tennis Club was the venue for the 4th women's GC match between Ireland and Spain. This time the Spanish sent a team to match the Irish players' DGrades, after decisive victories for Spain in the first three encounters.

The format was a mixture of doubles and singles, and at the end of the first day the Spanish held a slight lead. This was reduced to one game by lunchtime on Sunday, with Clair Whyms taking a game off Spain's number 2, Luz Maria Prado, to reduce the lead to 23-22. However, the Spanish took 10 of the remaining 12 games to win the match comfortably, 33 games to 24. Three of these games were close 7-6 battles, so the match was closer than the overall score suggests.

The weather was grey and misty for most of the weekend, which didn't dampen the spirit of conviviality and bonhomie. The two teams were treated to an excellent barbecue on Saturday evening by Master Chef Alan Looney, with coffee and cakes very welcome on both days. Many thanks to Carrickmines for hosting the event on its superb lawns.

Irish Team: Jane Morrison (c), Clair Whyms, Patricia Whitty, Patricia Mulcahy, Sylvia Briggs, Celine Reilly and Hillary Whitty.
Spanish Team: Maria Angeles Alvear (c), Luz Maria Prado, Beatriz Cabeza de Vaca, Maria Eugenia Ortiz, Paloma Casanova, Enriqueta Cuartero.`,
      category: "international",
      author: "CAI",
      club_id: carrickmines,
      tags: ["Golf Croquet", "Spain", "Women's International"],
      status: "published",
      published_at: "2026-03-16T10:00:00Z",
    },
  ];

  let count = 0;
  for (const a of articles) {
    const existing = await sql`select id from articles where slug = ${a.slug} limit 1`;
    if (existing.length) continue;
    await sql`
      insert into articles (slug, title, excerpt, body, category, author, club_id, tags, status, published_at)
      values (${a.slug}, ${a.title}, ${a.excerpt}, ${a.body}, ${a.category}, ${a.author}, ${a.club_id}, ${a.tags}, ${a.status}, ${a.published_at})
    `;
    count++;
  }
  console.log(`Added ${count} new real news articles.`);
}

async function main() {
  await replaceAcRankings();
  await replaceGcHandicaps();
  await clearFabricatedAcHandicaps();
  await seedMoreArticles();
  console.log("\nseed2 complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
