import type { Metadata } from "next";
import { Container, PageHero } from "@/components/site/ui";
import { getHandicaps, getRankings } from "@/lib/queries";
import { RankingsTabs } from "./RankingsTabs";

export const metadata: Metadata = { title: "Rankings & Handicaps" };
export const dynamic = "force-dynamic";

export default async function RankingsPage() {
  const [acRankings, gcRankings, acHandicaps, gcHandicaps] = await Promise.all([
    getRankings("AC"),
    getRankings("GC"),
    getHandicaps("AC"),
    getHandicaps("GC"),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Rankings & Handicaps"
        title="Player standings"
        description="Official Irish rankings drawn from the World Croquet Federation database, and CAI handicap lists. Search for your own name."
      />
      <Container className="py-10">
        <RankingsTabs acRankings={acRankings} gcRankings={gcRankings} acHandicaps={acHandicaps} gcHandicaps={gcHandicaps} />
      </Container>
    </>
  );
}
