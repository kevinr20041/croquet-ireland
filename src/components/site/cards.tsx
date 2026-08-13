import Link from "next/link";
import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react";
import type { Article, EventRow, ResultRow } from "@/lib/types";
import { Card, Tag, formatDate, formatDateRange } from "./ui";

export function EventCard({ event }: { event: EventRow }) {
  return (
    <Link
      href={`/competitions/calendar/${event.slug}`}
      className="group block focus-visible:outline-none"
      aria-label={`${event.name}: see more information`}
    >
      <Card className="flex h-full flex-col p-5 transition-colors group-hover:border-lawn group-focus-visible:border-lawn group-focus-visible:ring-2 group-focus-visible:ring-focus">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-lawn-deep">
          <CalendarDays size={16} />
          {formatDateRange(event.start_date, event.end_date)}
        </p>
        {event.start_time && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
            <Clock size={15} />
            {event.start_time}
            {event.end_time ? ` – ${event.end_time}` : ""}
          </p>
        )}
        <h3 className="mt-2 text-lg font-semibold text-ink group-hover:underline">{event.name}</h3>
        {(event.venue || event.club_name) && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
            <MapPin size={15} />
            {event.venue ?? event.club_name}
          </p>
        )}
        <div className="mt-3 flex flex-1 items-end justify-between gap-2">
          {event.competition_type ? <Tag>{event.competition_type}</Tag> : <span />}
          <span className="flex items-center gap-1 text-xs font-semibold text-lawn-deep opacity-0 transition-opacity group-hover:opacity-100">
            More information <ArrowRight size={13} />
          </span>
        </div>
      </Card>
    </Link>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      {article.featured_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.featured_image_url}
          alt=""
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-paper-tint text-ink-faint">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12h8M12 8v8" strokeLinecap="round" />
          </svg>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-maroon">
          {article.category.replace("-", " ")}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold leading-snug text-ink">
          <Link href={`/news/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h3>
        {article.excerpt && <p className="mt-2 flex-1 text-sm text-ink-soft">{article.excerpt}</p>}
        <p className="mt-3 text-xs text-ink-faint">{formatDate(article.published_at)}</p>
      </div>
    </Card>
  );
}

export function ResultCard({ result }: { result: ResultRow }) {
  return (
    <Card className="p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
        {formatDate(result.result_date)} {result.club_name ? `· ${result.club_name}` : ""}
      </p>
      <h3 className="mt-1 text-base font-semibold text-ink">{result.competition}</h3>
      {result.placings?.[0] && (
        <p className="mt-2 text-sm text-ink-soft">
          Winner: <span className="font-semibold text-ink">{result.placings[0].winner}</span>
        </p>
      )}
    </Card>
  );
}
