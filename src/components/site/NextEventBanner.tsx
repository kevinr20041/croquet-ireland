import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Container, formatDateRange } from "@/components/site/ui";
import { AddToCalendarButton } from "@/components/site/AddToCalendarButton";
import type { EventRow } from "@/lib/types";

function daysUntil(startDate: string) {
  const start = new Date(startDate);
  const today = new Date();
  const startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((startUTC - todayUTC) / 86400000);
}

function countdownLabel(days: number) {
  if (days <= 0) return "Happening now";
  if (days === 1) return "Tomorrow";
  if (days <= 7) return `In ${days} days`;
  const weeks = Math.round(days / 7);
  return weeks === 1 ? "In 1 week" : `In ${weeks} weeks`;
}

export function NextEventBanner({ event }: { event: EventRow }) {
  const days = daysUntil(event.start_date);
  const location = event.venue ?? event.club_name ?? "";

  return (
    <section className="border-b border-line bg-lawn-deep text-paper-raised">
      <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3 sm:items-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-lawn-deep">
            <CalendarDays size={22} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-gold">
              Next up &middot; {countdownLabel(days)}
            </p>
            <Link href={`/competitions/calendar/${event.slug}`} className="text-lg font-semibold hover:underline">
              {event.name}
            </Link>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-paper-raised/85">
              <span>{formatDateRange(event.start_date, event.end_date)}</span>
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {location}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="w-full shrink-0 sm:w-56">
          <AddToCalendarButton
            name={event.name}
            startDate={event.start_date}
            endDate={event.end_date}
            location={location}
            details={event.description ?? ""}
            variant="dark"
          />
        </div>
      </Container>
    </section>
  );
}
