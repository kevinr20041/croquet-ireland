import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";

const sql = neon(process.env.DATABASE_URL);

const CLUB_IMAGES = [
  { clubSlug: "carrickmines-croquet-lawn-tennis-club", url: "https://croquetireland.com/cai/images/CarrickminesCnLTClub.jpg", file: "carrickmines.jpg" },
  { clubSlug: "herbert-park-croquet-club", url: "https://croquetireland.com/cai/images/HerbertPark.jpg", file: "herbert-park.jpg" },
  { clubSlug: "rushbrooke-croquet-and-lawn-tennis-club", url: "https://croquetireland.com/cai/images/rushbrooke2.jpg", file: "rushbrooke.jpg" },
  { clubSlug: "trinity-college-dublin-croquet-club", url: "https://croquetireland.com/cai/images/TCDLawn720.jpg", file: "tcd-lawns.jpg" },
  { clubSlug: "waterville-lake-croquet-society", url: "https://croquetireland.com/cai/images/WatervilleClub-640.jpg", file: "waterville.jpg" },
  { clubSlug: "strokestown-croquet-club", url: "https://croquetireland.com/cai/images/StrokestownCroquetPitch.jpg", file: "strokestown.jpg" },
  { clubSlug: "newbridge-house-croquet-club", url: "https://croquetireland.com/cai/images/NewBridgeHouseCC.png", file: "newbridge-house.png" },
];

async function downloadAndUpload(url, blobPath) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; CAI-migration-bot/1.0)" } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const contentType = url.endsWith(".png") ? "image/png" : "image/jpeg";
  const blob = await put(blobPath, buf, { access: "public", contentType, addRandomSuffix: false });
  return blob.url;
}

async function main() {
  for (const img of CLUB_IMAGES) {
    const rows = await sql`select id, image_url from clubs where slug = ${img.clubSlug} limit 1`;
    if (!rows.length) {
      console.log(`Club not found for slug ${img.clubSlug}, skipping.`);
      continue;
    }
    if (rows[0].image_url) {
      console.log(`${img.clubSlug} already has an image, skipping.`);
      continue;
    }
    try {
      const blobUrl = await downloadAndUpload(img.url, `clubs/${img.file}`);
      await sql`update clubs set image_url = ${blobUrl} where id = ${rows[0].id}`;
      console.log(`Set image for ${img.clubSlug}`);
    } catch (err) {
      console.error(`Failed ${img.clubSlug}: ${err.message}`);
    }
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
