import type { Metadata } from "next";
import { Container, PageHero } from "@/components/site/ui";
import { getAllClubs, getCounties } from "@/lib/queries";
import { ClubDirectory } from "./ClubDirectory";

export const metadata: Metadata = { title: "Find a Club" };
export const dynamic = "force-dynamic";

export default async function ClubsPage() {
  const [clubs, counties] = await Promise.all([getAllClubs(), getCounties()]);

  return (
    <>
      <PageHero
        eyebrow="Play Croquet"
        title="Find a club"
        description={`${clubs.length} affiliated clubs across Ireland. Search by county or by the type of croquet on offer.`}
      />
      <Container className="py-10">
        <ClubDirectory clubs={clubs} counties={counties} />
      </Container>
    </>
  );
}
