import Link from "next/link";
import { CalendarDays, MapPinned, GraduationCap, Trophy, BookOpenText, ListOrdered, UserPlus } from "lucide-react";
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
  { label: "Membership", href: "/about/membership", icon: UserPlus },
  { label: "Rules", href: "/rules", icon: BookOpenText },
];

const QUICK_LINK_COLORS = [
  "var(--lawn)",
  "var(--sky)",
  "var(--gold)",
  "var(--maroon)",
  "var(--lawn-deep)",
  "var(--sky)",
  "var(--gold)",
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
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-lawn-light/25 via-paper-tint to-sky/10">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-lawn/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
        <Container className="relative grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-maroon">
              <span className="inline-block h-1 w-6 rounded-full bg-gold" />
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
          <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-sm">
            <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-b from-lawn/15 to-lawn/5">
              <svg viewBox="0 0 200 150" className="h-4/5 w-4/5" fill="none">
                <rect x="10" y="10" width="180" height="130" rx="4" stroke="var(--lawn)" strokeOpacity="0.3" strokeWidth="2" />
                <path d="M46 122 L46 96 a9 9 0 0 1 18 0 L64 122" stroke="var(--lawn-deep)" strokeWidth="4" strokeLinecap="round" />
                <path d="M108 122 L108 96 a9 9 0 0 1 18 0 L126 122" stroke="var(--lawn-deep)" strokeWidth="4" strokeLinecap="round" />
                <path d="M158 122 L158 96 a9 9 0 0 1 18 0 L176 122" stroke="var(--lawn-deep)" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
                <line x1="55" y1="120" x2="26" y2="142" stroke="var(--ink-faint)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="55" cy="118" r="7" fill="var(--maroon)" />
                <circle cx="86" cy="130" r="7" fill="var(--gold)" />
                <circle cx="117" cy="118" r="7" fill="var(--sky)" />
                <circle cx="148" cy="132" r="7" fill="var(--ink)" />
              </svg>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {QUICK_LINKS.map(({ label, href, icon: Icon }, i) => (
              <Link
                key={href}
                href={href}
                className="quick-link group flex flex-col items-center gap-2 rounded-xl border border-line bg-paper-raised px-3 py-5 text-center text-sm font-semibold text-ink-soft transition-colors hover:border-[var(--accent)] hover:text-ink"
                style={{ "--accent": QUICK_LINK_COLORS[i % QUICK_LINK_COLORS.length] } as React.CSSProperties}
              >
                <Icon size={22} className="transition-colors group-hover:[color:var(--accent)]" />
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
