import Link from "next/link";
import { CalendarDays, MapPinned, GraduationCap, Trophy, BookOpenText, ListOrdered } from "lucide-react";
import { getAllAlbums, getLatestResults, getPublishedArticles, getUpcomingEvents } from "@/lib/queries";
import { Container, SectionHeading, ButtonLink, formatDate } from "@/components/site/ui";
import { ArticleCard, EventCard, ResultCard } from "@/components/site/cards";

export const dynamic = "force-dynamic";

const QUICK_LINKS = [
  { label: "Find a Club", href: "/play/clubs", icon: MapPinned },
  { label: "Learn to Play", href: "/about-croquet/getting-started", icon: GraduationCap },
  { label: "Calendar", href: "/competitions/calendar", icon: CalendarDays },
  { label: "Results", href: "/competitions/results", icon: Trophy },
  { label: "Rankings", href: "/rankings", icon: ListOrdered },
  { label: "Rules", href: "/rules", icon: BookOpenText },
];

export default async function HomePage() {
  const [events, articles, results, albums] = await Promise.all([
    getUpcomingEvents(3),
    getPublishedArticles(3),
    getLatestResults(3),
    getAllAlbums(),
  ]);
  const latestAlbums = albums.slice(0, 4);

  return (
    <>
      <section className="border-b border-line bg-paper-tint">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-maroon">
              <span className="inline-block h-px w-6 bg-gold" />
              Established players since the 1830s
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Croquet in Ireland
            </h1>
            <p className="mt-4 max-w-lg text-lg text-ink-soft">
              CAI is the governing body for the sport of croquet in Ireland — from relaxed garden play to
              national and international championships. Whatever level you&apos;re at, there&apos;s a club
              and a competition for you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/play/clubs">Find a Club</ButtonLink>
              <ButtonLink href="/about-croquet/getting-started" variant="secondary">
                Learn to Play
              </ButtonLink>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised">
            <div className="flex aspect-[4/3] items-center justify-center bg-lawn/10">
              <svg viewBox="0 0 200 150" className="h-4/5 w-4/5 text-lawn" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="10" y="10" width="180" height="130" rx="4" strokeOpacity="0.35" />
                <path d="M40 120 L40 90 a10 10 0 0 1 20 0 L60 120" strokeLinecap="round" />
                <path d="M100 120 L100 90 a10 10 0 0 1 20 0 L120 120" strokeLinecap="round" />
                <path d="M160 120 L160 90 a10 10 0 0 1 20 0 L180 120" strokeOpacity="0.3" strokeLinecap="round" />
                <circle cx="55" cy="118" r="6" fill="currentColor" stroke="none" />
                <circle cx="112" cy="118" r="6" fill="currentColor" stroke="none" opacity="0.6" />
                <line x1="55" y1="118" x2="30" y2="140" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-2 rounded-xl border border-line bg-paper-raised px-3 py-5 text-center text-sm font-semibold text-ink-soft hover:border-lawn hover:text-lawn-deep"
              >
                <Icon size={22} />
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="What's on" title="Upcoming events" />
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
          <p className="text-ink-soft">No events scheduled yet — check back soon.</p>
        )}
      </Container>

      <section className="border-y border-line bg-paper-tint">
        <Container className="py-14">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Latest" title="News" />
            <ButtonLink href="/news" variant="ghost" className="hidden sm:inline-flex">
              All news
            </ButtonLink>
          </div>
          {articles.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-ink-soft">No news posted yet.</p>
          )}
        </Container>
      </section>

      <Container className="py-14">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Scores" title="Latest results" />
          <ButtonLink href="/competitions/results" variant="ghost" className="hidden sm:inline-flex">
            All results
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

      <section className="border-y border-line bg-paper-tint">
        <Container className="grid gap-10 py-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="New to the game?"
              title="About croquet"
              description="Croquet has been played in Ireland since the 1830s — in fact, the game arrived in England from Ireland, not the other way around. Today it's played in two main forms: the fast, sociable Golf Croquet, and the tactical, longer-format Association Croquet."
            />
            <ButtonLink href="/about-croquet">Read more about the game</ButtonLink>
          </div>
          <div className="rounded-2xl border border-line bg-paper-raised p-6">
            <h3 className="font-serif text-xl font-semibold text-ink">Try it for free</h3>
            <p className="mt-2 text-ink-soft">
              The CAI has croquet sets available for free loan, and every affiliated club welcomes new and
              visiting players.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href="/play" variant="secondary">
                Getting started
              </ButtonLink>
              <ButtonLink href="/play/clubs" variant="ghost">
                Find a club near you
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {latestAlbums.length > 0 && (
        <Container className="py-14">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Snapshots" title="Latest gallery" />
            <ButtonLink href="/gallery" variant="ghost" className="hidden sm:inline-flex">
              All albums
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {latestAlbums.map((album) => (
              <Link
                key={album.id}
                href={`/gallery/${album.slug}`}
                className="group overflow-hidden rounded-xl border border-line bg-paper-raised"
              >
                <div className="aspect-square w-full overflow-hidden bg-paper-tint">
                  {album.cover_image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={album.cover_image_url}
                      alt=""
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="p-3 text-sm font-semibold text-ink">{album.title}</p>
                <p className="px-3 pb-3 text-xs text-ink-faint">{formatDate(album.album_date)}</p>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
