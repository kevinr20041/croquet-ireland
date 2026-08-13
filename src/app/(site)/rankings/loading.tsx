import { Container, PageHero } from "@/components/site/ui";
import { Skeleton, TableSkeleton } from "@/components/site/Skeleton";

export default function RankingsLoading() {
  return (
    <>
      <PageHero
        eyebrow="Rankings & Handicaps"
        title="Player standings"
        description="Official Irish rankings drawn from the World Croquet Federation database, and CAI handicap lists."
      />
      <Container className="py-10">
        <div className="flex gap-2 border-b border-line pb-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-11 w-64" />
        </div>
        <div className="mt-4">
          <TableSkeleton rows={10} />
        </div>
      </Container>
    </>
  );
}
