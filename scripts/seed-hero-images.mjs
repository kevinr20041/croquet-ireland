import { put } from "@vercel/blob";

const IMAGES = [
  { url: "https://croquetireland.com/sites/default/files/styles/slideshow/public/2016-02/RRM_140805_DSC00352.jpg", file: "hero/interested-crowd.jpg", key: "spectators" },
  { url: "https://croquetireland.com/sites/default/files/styles/slideshow/public/2016-02/RRM_130804_DSC03564.jpg", file: "hero/learning-to-play.jpg", key: "learning" },
];

async function main() {
  const out = {};
  for (const img of IMAGES) {
    const res = await fetch(img.url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; CAI-migration-bot/1.0)" } });
    if (!res.ok) {
      console.error(`Failed ${img.key}: ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const blob = await put(img.file, buf, { access: "public", contentType: "image/jpeg", addRandomSuffix: false });
    out[img.key] = blob.url;
    console.log(`${img.key}: ${blob.url}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
