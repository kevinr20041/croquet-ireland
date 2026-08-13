import { Container, PageHero } from "@/components/site/ui";
import { CardGridSkeleton, Skeleton } from "@/components/site/Skeleton";

export default function ClubsLoading() {
  return (
    <>
      <PageHero eyebrow="Play Croquet" title="Find a club" description="Search by county or by the type of croquet on offer." />
      <Container className="py-10">
        <Skeleton className="h-24 w-full" />
        <div className="mt-4">
          <CardGridSkeleton count={9} />
        </div>
      </Container>
    </>
  );
}
