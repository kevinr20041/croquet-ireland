import { Container, PageHero } from "@/components/site/ui";
import { CardGridSkeleton, Skeleton } from "@/components/site/Skeleton";

export default function CalendarLoading() {
  return (
    <>
      <PageHero
        eyebrow="Competitions"
        title="CAI Calendar"
        description="Every tournament and fixture, upcoming and past. Search by event name or date."
      />
      <Container className="py-14">
        <Skeleton className="h-12 w-full max-w-xl" />
        <div className="mt-10">
          <CardGridSkeleton count={6} />
        </div>
      </Container>
    </>
  );
}
