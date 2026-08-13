import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, FileText, ExternalLink } from "lucide-react";
import { getEventBySlug } from "@/lib/queries";
import { Container, formatDateRange } from "@/components/site/ui";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AddToCalendarButton } from "@/components/site/AddToCalendarButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/competitions/calendar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return { title: event?.name ?? "Event" };
}

export default async function EventDetailPage({ params }: PageProps<"/competitions/calendar/[slug]">) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: "Competitions", href: "/competitions" },
          { label: "Calendar", href: "/competitions/calendar" },
          { label: event.name },
        ]}
      />
      <p className="flex items-center gap-1.5 text-sm font-semibold text-lawn-deep">
        <CalendarDays size={16} /> {formatDateRange(event.start_date, event.end_date)}
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-ink">{event.name}</h1>
      {event.start_time && (
        <p className="mt-2 flex items-center gap-1.5 text-ink-soft">
          <Clock size={16} /> {event.start_time}
          {event.end_time ? ` – ${event.end_time}` : ""}
        </p>
      )}
      {(event.venue || event.club_name) && (
        <p className="mt-2 flex items-center gap-1.5 text-ink-soft">
          <MapPin size={16} /> {event.venue ?? event.club_name}
        </p>
      )}
      {!event.venue && !event.club_name && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-faint">
          <MapPin size={16} /> Venue to be confirmed
        </p>
      )}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="max-w-2xl space-y-4 text-ink-soft">
          {event.description && <p>{event.description}</p>}
          {event.entry_info && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Entry information</h2>
              <p className="mt-1">{event.entry_info}</p>
            </div>
          )}
        </div>
        <aside className="h-fit space-y-3 rounded-xl border border-line bg-paper-tint p-6">
          <AddToCalendarButton
            name={event.name}
            startDate={event.start_date}
            endDate={event.end_date}
            location={event.venue ?? event.club_name ?? ""}
            details={event.description ?? ""}
          />
          {event.registration_link && (
            <a
              href={event.registration_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-lawn px-4 py-2.5 text-sm font-semibold text-paper-raised hover:bg-lawn-deep"
            >
              <ExternalLink size={16} /> Entry form
            </a>
          )}
          {event.documents_url && (
            <a
              href={event.documents_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-lawn px-4 py-2.5 text-sm font-semibold text-lawn-deep hover:bg-paper-raised"
            >
              <FileText size={16} /> Tournament conditions
            </a>
          )}
        </aside>
      </div>
    </Container>
  );
}
