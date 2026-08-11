import type { Metadata } from "next";
import { Container, PageHero } from "@/components/site/ui";
import { EventCard } from "@/components/site/cards";
import { getAllEvents } from "@/lib/queries";

export const metadata: Metadata = { title: "Calendar" };
export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const events = await getAllEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.start_date >= today);
  const past = events.filter((e) => e.start_date < today).reverse();

  return (
    <>
      <PageHero eyebrow="Competitions" title="CAI Calendar" description="Every tournament and fixture, upcoming and past." />
      <Container className="py-14">
        <h2 className="mb-5 text-xl font-semibold text-ink">Upcoming</h2>
        {upcoming.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-ink-soft">No upcoming events scheduled.</p>
        )}

        {past.length > 0 && (
          <>
            <h2 className="mb-5 mt-12 text-xl font-semibold text-ink">Past events</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
