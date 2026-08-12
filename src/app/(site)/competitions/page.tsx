import type { Metadata } from "next";
import { Container, PageHero, ButtonLink, SectionHeading } from "@/components/site/ui";
import { EventCard, ResultCard } from "@/components/site/cards";
import { getUpcomingEvents, getLatestResults } from "@/lib/queries";

export const metadata: Metadata = { title: "Competitions" };
export const dynamic = "force-dynamic";

export default async function CompetitionsPage() {
  const [events, results] = await Promise.all([getUpcomingEvents(6), getLatestResults(6)]);

  return (
    <>
      <PageHero
        eyebrow="Competitions"
        title="Tournaments, entries and results"
        description="Every CAI tournament from club weekends to the Championship of Ireland and international fixtures."
      />
      <Container className="py-14">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="What's on" title="Upcoming tournaments" />
          <ButtonLink href="/competitions/calendar" variant="ghost" className="hidden sm:inline-flex">
            Full calendar
          </ButtonLink>
        </div>
        {events.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-ink-soft">No upcoming events posted yet.</p>
        )}
      </Container>
      <section className="border-t border-line bg-paper-tint">
        <Container className="py-14">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Scores" title="Recent results" />
            <ButtonLink href="/competitions/results" variant="ghost" className="hidden sm:inline-flex">
              Full results archive
            </ButtonLink>
          </div>
          {results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {results.map((result) => (
                <ResultCard key={result.id} result={result} />
              ))}
            </div>
          ) : (
            <p className="text-ink-soft">No results posted yet.</p>
          )}
        </Container>
      </section>
      <Container className="py-14">
        <SectionHeading eyebrow="History" title="Championship archive" />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/competitions/champions" variant="secondary">
            Championship winners since 1900
          </ButtonLink>
          <ButtonLink href="/competitions/international-results" variant="secondary">
            International results
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
