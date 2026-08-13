import { Container, PageHero } from "@/components/site/ui";
import { CardGridSkeleton } from "@/components/site/Skeleton";

export default function NewsLoading() {
  return (
    <>
      <PageHero eyebrow="News" title="Latest news" description="Match reports, championship results, and CAI announcements." />
      <Container className="py-10">
        <CardGridSkeleton count={9} />
      </Container>
    </>
  );
}
