import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const buf = readFileSync("C:\\Users\\kevin\\Downloads\\CAI_Joining_Form.pdf");
  const blob = await put("documents/CAI_Individual_Membership_Application_Form.pdf", buf, {
    access: "public",
    contentType: "application/pdf",
    addRandomSuffix: false,
  });
  console.log("Uploaded to:", blob.url);

  const existing = await sql`select id from documents where title = 'CAI Individual Membership Joining Form' limit 1`;
  if (existing.length) {
    await sql`update documents set file_url = ${blob.url}, title = 'CAI Individual Membership Application Form' where id = ${existing[0].id}`;
    console.log("Updated existing document row to point at the self-hosted copy.");
  } else {
    await sql`
      insert into documents (title, description, category, file_url)
      values ('CAI Individual Membership Application Form', 'Application form for individual CAI membership.', 'forms', ${blob.url})
    `;
    console.log("Inserted new document row.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
