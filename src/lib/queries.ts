import { sql } from "./db";
import type {
  Article,
  Club,
  CouncilMember,
  DocumentRow,
  EventRow,
  GalleryAlbum,
  GalleryPhoto,
  HandicapRow,
  RankingRow,
  ResultRow,
} from "./types";

// ---------- Articles ----------

export async function getPublishedArticles(limit = 20, category?: string, year?: string) {
  let rows;
  if (category && year) {
    rows = await sql`select * from articles where status = 'published' and category = ${category} and extract(year from published_at)::text = ${year} order by published_at desc nulls last limit ${limit}`;
  } else if (category) {
    rows = await sql`select * from articles where status = 'published' and category = ${category} order by published_at desc nulls last limit ${limit}`;
  } else if (year) {
    rows = await sql`select * from articles where status = 'published' and extract(year from published_at)::text = ${year} order by published_at desc nulls last limit ${limit}`;
  } else {
    rows = await sql`select * from articles where status = 'published' order by published_at desc nulls last limit ${limit}`;
  }
  return rows as unknown as Article[];
}

export async function getArticleYears() {
  const rows = await sql`
    select distinct extract(year from published_at)::int as year
    from articles where status = 'published' and published_at is not null
    order by year desc
  `;
  return (rows as { year: number }[]).map((r) => r.year);
}

export async function getArticleBySlug(slug: string) {
  const rows = await sql`select * from articles where slug = ${slug} and status = 'published' limit 1`;
  return (rows[0] as unknown as Article) ?? null;
}

export async function getRelatedArticles(id: string, category: string, limit = 3) {
  const rows =
    await sql`select * from articles where status = 'published' and category = ${category} and id != ${id} order by published_at desc limit ${limit}`;
  return rows as unknown as Article[];
}

export async function searchArticles(query: string, limit = 20) {
  const rows =
    await sql`select * from articles where status = 'published' and (title ilike ${"%" + query + "%"} or body ilike ${"%" + query + "%"}) order by published_at desc limit ${limit}`;
  return rows as unknown as Article[];
}

// ---------- Events ----------

export async function getUpcomingEvents(limit = 4) {
  const rows = await sql`
    select e.*, c.name as club_name
    from events e left join clubs c on c.id = e.club_id
    where e.start_date >= current_date - interval '1 day'
    order by e.start_date asc
    limit ${limit}
  `;
  return rows as unknown as EventRow[];
}

export async function getAllEvents() {
  const rows = await sql`
    select e.*, c.name as club_name
    from events e left join clubs c on c.id = e.club_id
    order by e.start_date asc
  `;
  return rows as unknown as EventRow[];
}

export async function getEventsByClub(clubId: string, limit = 3) {
  const rows = await sql`
    select e.*, c.name as club_name
    from events e left join clubs c on c.id = e.club_id
    where e.club_id = ${clubId} and e.start_date >= current_date - interval '1 day'
    order by e.start_date asc
    limit ${limit}
  `;
  return rows as unknown as EventRow[];
}

export async function getEventBySlug(slug: string) {
  const rows = await sql`
    select e.*, c.name as club_name
    from events e left join clubs c on c.id = e.club_id
    where e.slug = ${slug} limit 1
  `;
  return (rows[0] as unknown as EventRow) ?? null;
}

// ---------- Results ----------

export async function getLatestResults(limit = 5) {
  const rows = await sql`
    select r.*, c.name as club_name
    from results r left join clubs c on c.id = r.club_id
    order by r.result_date desc
    limit ${limit}
  `;
  return rows as unknown as ResultRow[];
}

export async function getAllResults() {
  const rows = await sql`
    select r.*, c.name as club_name
    from results r left join clubs c on c.id = r.club_id
    order by r.result_date desc
  `;
  return rows as unknown as ResultRow[];
}

// ---------- Clubs ----------

export async function getAllClubs() {
  const rows = await sql`select * from clubs order by sort_order asc, name asc`;
  return rows as unknown as Club[];
}

export async function getClubBySlug(slug: string) {
  const rows = await sql`select * from clubs where slug = ${slug} limit 1`;
  return (rows[0] as unknown as Club) ?? null;
}

export async function searchClubs(query: string, limit = 10) {
  const rows = await sql`select * from clubs where name ilike ${"%" + query + "%"} or county ilike ${"%" + query + "%"} limit ${limit}`;
  return rows as unknown as Club[];
}

export async function getCounties() {
  const rows = await sql`select distinct county from clubs where county is not null order by county asc`;
  return (rows as { county: string }[]).map((r) => r.county);
}

// ---------- Documents ----------

export async function getAllDocuments() {
  const rows = await sql`select * from documents order by category asc, sort_order asc, title asc`;
  return rows as unknown as DocumentRow[];
}

export async function searchDocuments(query: string, limit = 10) {
  const rows = await sql`select * from documents where title ilike ${"%" + query + "%"} or description ilike ${"%" + query + "%"} limit ${limit}`;
  return rows as unknown as DocumentRow[];
}

// ---------- Gallery ----------

export async function getAllAlbums() {
  const rows = await sql`select * from gallery_albums order by is_historical asc, album_date desc nulls last`;
  return rows as unknown as GalleryAlbum[];
}

export async function getAlbumBySlug(slug: string) {
  const rows = await sql`select * from gallery_albums where slug = ${slug} limit 1`;
  return (rows[0] as unknown as GalleryAlbum) ?? null;
}

export async function getPhotosForAlbum(albumId: string) {
  const rows = await sql`select * from gallery_photos where album_id = ${albumId} order by sort_order asc`;
  return rows as unknown as GalleryPhoto[];
}

// ---------- Council ----------

export async function getCouncilMembers() {
  const rows = await sql`select * from council_members order by sort_order asc`;
  return rows as unknown as CouncilMember[];
}

export async function searchCouncil(query: string, limit = 10) {
  const rows = await sql`select * from council_members where name ilike ${"%" + query + "%"} or role ilike ${"%" + query + "%"} limit ${limit}`;
  return rows as unknown as CouncilMember[];
}

// ---------- Events search ----------

export async function searchEvents(query: string, limit = 10) {
  const rows = await sql`
    select e.*, c.name as club_name
    from events e left join clubs c on c.id = e.club_id
    where e.name ilike ${"%" + query + "%"} or e.venue ilike ${"%" + query + "%"} or e.competition_type ilike ${"%" + query + "%"}
    order by e.start_date desc
    limit ${limit}
  `;
  return rows as unknown as EventRow[];
}

// ---------- Rankings & Handicaps ----------

export async function getRankings(discipline: "AC" | "GC") {
  const rows = await sql`select * from rankings where discipline = ${discipline} order by sort_order asc`;
  return rows as unknown as RankingRow[];
}

export async function getHandicaps(discipline: "AC" | "GC") {
  const rows = await sql`select * from handicaps where discipline = ${discipline} order by sort_order asc`;
  return rows as unknown as HandicapRow[];
}

// ---------- Site settings ----------

export async function getSetting<T = unknown>(key: string): Promise<T | null> {
  const rows = await sql`select value from site_settings where key = ${key} limit 1`;
  if (!rows[0]) return null;
  return (rows[0] as { value: T }).value;
}
