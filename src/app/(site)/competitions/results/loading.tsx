import { Container, PageHero } from "@/components/site/ui";
import { Skeleton } from "@/components/site/Skeleton";

export default function ResultsLoading() {
  return (
    <>
      <PageHero
        eyebrow="Competitions"
        title="Results archive"
        description="Structured results from every CAI competition, searchable and not buried in old match reports."
      />
      <Container className="py-14">
        <div className="space-y-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-line bg-paper-raised p-6">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="mt-3 h-4 w-2/3" />
              <Skeleton className="mt-4 h-24 w-full" />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
