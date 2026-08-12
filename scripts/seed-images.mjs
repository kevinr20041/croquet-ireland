import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";

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

const HISTORICAL_FILES = [
  "CCI02072015_3_.jpg", "CCI02072015_5_.jpg", "CCI02072015_6_.jpg", "CCI02072015_7_.jpg", "CCI02072015_10_.jpg",
  "CCI26072015_0002_6_.jpg", "CCI26072015_0002_10_.jpg", "CCI26072015_0002_12_.jpg",
  "CCI26072015_0003_4_.jpg", "CCI26072015_0003_6_.jpg", "CCI26072015_0003_8_.jpg", "CCI26072015_0003_9_.jpg",
  "CCI26072015_0003_10_.jpg", "CCI26072015_0003_13_.jpg", "CCI26072015_0003_15_.jpg",
];

const IRISH_OPEN_2022_FILES = [
  "RRM_220730_A6504118.jpg", "RRM_220730_A6504139.jpg", "RRM_220731_A6504145.jpg", "RRM_220731_A6504154.jpg",
  "RRM_220731_A6504161.jpg", "RRM_220731_A6504164.jpg", "RRM_220731_A6504171.jpg", "RRM_220731_A6504175.jpg",
  "RRM_220731_A6504176.jpg", "RRM_220731_A6504196.jpg", "RRM_220731_A6504213.jpg", "RRM_220731_A6504214.jpg",
  "RRM_220731_A6504215.jpg", "RRM_220802_A6504230.jpg", "RRM_220802_A6504247.jpg", "RRM_220802_A6504251.jpg",
  "RRM_220802_A6504266.jpg", "RRM_220802_A6504268.jpg", "RRM_220802_A6504274.jpg", "RRM_220802_A6504280.jpg",
  "RRM_220802_A6504300.jpg", "RRM_220802_A6504305.jpg", "RRM_220802_A6504306.jpg", "RRM_220802_A6504307.jpg",
];

const DUBLIN_OPEN_2022_FILES = [
  "RRM_220603_A6503924.jpg", "RRM_220603_A6503926.jpg", "RRM_220603_A6503930.jpg", "RRM_220603_A6503932.jpg",
  "RRM_220603_A6503933.jpg", "RRM_220603_A6503938.jpg", "RRM_220603_A6503940.jpg", "RRM_220603_A6503944.jpg",
  "RRM_220603_A6503945.jpg", "RRM_220603_A6503947.jpg", "RRM_220603_A6503950.jpg", "RRM_220603_A6503954.jpg",
  "RRM_220603_A6503955.jpg", "RRM_220603_A6503956.jpg", "RRM_220603_A6503959.jpg", "RRM_220603_A6503961.jpg",
  "RRM_220603_A6503964.jpg", "RRM_220603_A6503967.jpg", "RRM_220603_A6503973.jpg", "RRM_220603_A6503977.jpg",
  "RRM_220603_A6503979.jpg", "RRM_220603_A6503984.jpg", "RRM_220603_A6503987.jpg", "RRM_220603_A6503991.jpg",
  "RRM_220603_A6503993.jpg", "RRM_220603_A6503994.jpg", "RRM_220603_A6503997.jpg",
];

const ALBUMS = [
  {
    title: "Croquet circa 1900",
    slug: "croquet-circa-1900",
    is_historical: true,
    album_date: null,
    sourceBase: "https://croquetireland.com/albums/Croquet-circa-1900/photos/",
    files: HISTORICAL_FILES,
    blobPrefix: "gallery/croquet-circa-1900",
  },
  {
    title: "Irish Open Championships 2022",
    slug: "irish-open-2022",
    is_historical: false,
    album_date: "2022-08-02",
    sourceBase: "https://croquetireland.com/albums/IrishOpen2022/photos/",
    files: IRISH_OPEN_2022_FILES,
    blobPrefix: "gallery/irish-open-2022",
  },
  {
    title: "Co Dublin Championships 2022",
    slug: "co-dublin-championships-2022",
    is_historical: false,
    album_date: "2022-06-03",
    sourceBase: "https://croquetireland.com/albums/DublinOpen2022/photos/",
    files: DUBLIN_OPEN_2022_FILES,
    blobPrefix: "gallery/co-dublin-championships-2022",
  },
];

async function downloadAndUpload(url, blobPath) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; CAI-migration-bot/1.0)" } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const blob = await put(blobPath, buf, { access: "public", contentType: "image/jpeg", addRandomSuffix: false });
  return blob.url;
}

async function main() {
  for (const album of ALBUMS) {
    const existing = await sql`select id from gallery_albums where slug = ${album.slug} limit 1`;
    let albumId;
    if (existing.length) {
      albumId = existing[0].id;
      console.log(`Album "${album.title}" already exists, adding any missing photos.`);
    } else {
      const rows = await sql`
        insert into gallery_albums (slug, title, album_date, is_historical)
        values (${album.slug}, ${album.title}, ${album.album_date}, ${album.is_historical})
        returning id
      `;
      albumId = rows[0].id;
      console.log(`Created album "${album.title}" (${albumId})`);
    }

    const existingPhotos = await sql`select image_url from gallery_photos where album_id = ${albumId}`;
    const existingUrls = new Set(existingPhotos.map((p) => p.image_url));

    let sortOrder = existingPhotos.length;
    let uploaded = 0;
    for (const file of album.files) {
      const sourceUrl = album.sourceBase + file;
      const blobPath = `${album.blobPrefix}/${file}`;
      try {
        const blobUrl = await downloadAndUpload(sourceUrl, blobPath);
        if (existingUrls.has(blobUrl)) continue;
        await sql`insert into gallery_photos (album_id, image_url, sort_order) values (${albumId}, ${blobUrl}, ${sortOrder})`;
        sortOrder++;
        uploaded++;
        if (sortOrder === existingPhotos.length + 1) {
          await sql`update gallery_albums set cover_image_url = ${blobUrl} where id = ${albumId} and cover_image_url is null`;
        }
      } catch (err) {
        console.error(`  Failed: ${file} — ${err.message}`);
      }
    }
    console.log(`  Uploaded ${uploaded} new photos for "${album.title}".`);
  }
  console.log("\nImage migration complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
