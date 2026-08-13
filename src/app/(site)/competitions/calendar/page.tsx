import type { Metadata } from "next";
import { Container, PageHero } from "@/components/site/ui";
import { getAllEvents } from "@/lib/queries";
import { CalendarBrowser } from "./CalendarBrowser";

export const metadata: Metadata = { title: "Calendar" };
export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const events = await getAllEvents();

  return (
    <>
      <PageHero
        eyebrow="Competitions"
        title="CAI Calendar"
        description="Every tournament and fixture, upcoming and past — search by event name or date."
      />
      <Container className="py-14">
        <CalendarBrowser events={events} />
      </Container>
    </>
  );
}
