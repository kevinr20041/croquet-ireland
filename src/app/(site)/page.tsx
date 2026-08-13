import Link from "next/link";
import {
  CalendarDays,
  MapPinned,
  GraduationCap,
  Trophy,
  BookOpenText,
  ListOrdered,
  UserPlus,
  Brain,
  Trees,
  Users,
  Flag,
  Compass,
  HeartHandshake,
  CalendarPlus,
  Globe,
} from "lucide-react";
import { getAllAlbums, getLatestResults, getPublishedArticles, getUpcomingEvents } from "@/lib/queries";
import { Container, SectionHeading, ButtonLink, formatDate } from "@/components/site/ui";
import { ArticleCard, EventCard, ResultCard } from "@/components/site/cards";
import { NextEventBanner } from "@/components/site/NextEventBanner";

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

const WHY_PLAY = [
  { title: "Strategy", description: "Every shot is a decision. Croquet rewards tactics as much as skill with a mallet.", icon: Brain },
  { title: "Outdoors", description: "Play on some of the finest lawns in Ireland, in clubs old and new.", icon: Trees },
  { title: "Social", description: "Meet people through clubs, leagues and competitions around the country.", icon: Users },
  { title: "Competitive", description: "From your first game to representing Ireland at international level.", icon: Trophy },
];

const GET_INVOLVED = [
  {
    title: "I'm new to croquet",
    description: "No equipment or experience needed. Find your nearest club and go along.",
    href: "/play/clubs",
    cta: "Find a club",
    icon: Compass,
  },
  {
    title: "I want to join a club",
    description: "See CAI membership benefits and how to apply.",
    href: "/about/membership",
    cta: "Membership",
    icon: HeartHandshake,
  },
  {
    title: "I'm already a player",
    description: "Check the calendar, rankings and results.",
    href: "/competitions/calendar",
    cta: "Competitions",
    icon: CalendarPlus,
  },
  {
    title: "I want to play for Ireland",
    description: "See how rankings feed into international selection.",
    href: "/rankings",
    cta: "Rankings",
    icon: Globe,
  },
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
  const nextEvent = events[0];

  return (
    <>
      {nextEvent && <NextEventBanner event={nextEvent} />}
      <section className="relative overflow-hidden border-b border-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://q41s7axx6lc9r6rm.public.blob.vercel-storage.com/hero/learning-to-play.jpg"
          alt="Players in whites during a croquet match on an Irish club lawn"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(115deg, rgba(6,40,31,0.92) 0%, rgba(6,40,31,0.78) 32%, rgba(6,40,31,0.35) 62%, rgba(6,40,31,0.15) 100%)" }}
          aria-hidden="true"
        />
        <Container className="relative py-20 lg:py-28">
          <div className="max-w-xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gold">
              <span className="inline-block h-1 w-6 rounded-full bg-gold" />
              Established players since the 1830s
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Croquet in Ireland
            </h1>
            <p className="mt-3 text-xl font-medium text-white/90 sm:text-2xl">
              An old game. A modern sport.
            </p>
            <p className="mt-5 max-w-lg text-lg text-white/80">
              CAI is the governing body for the sport of croquet in Ireland, from relaxed garden play to
              national and international championships. Whatever your level, there is a club and a
              competition for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/play/clubs">Find a Club</ButtonLink>
              <ButtonLink href="/about-croquet/getting-started" variant="secondary" className="!border-white !text-white hover:!bg-white/10">
                Try Croquet
              </ButtonLink>
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
        <SectionHeading eyebrow="New to the game?" title="Why play croquet?" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_PLAY.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-xl border border-line bg-paper-raised p-5">
              <Icon size={26} className="text-lawn-deep" />
              <h3 className="mt-3 font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{description}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="border-y border-line bg-paper-tint">
        <Container className="py-14">
          <SectionHeading
            eyebrow="Two forms, one sport"
            title="Golf Croquet or Association Croquet?"
            description="Not sure where to start? Here is the difference between the two games played in Ireland."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-lawn bg-paper-raised p-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-lawn/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-lawn-deep">
                <Flag size={14} /> Golf Croquet
              </p>
              <p className="mt-3 text-lg font-semibold text-ink">Fast &middot; Social &middot; Easy to get started</p>
              <p className="mt-2 text-ink-soft">
                Short games decided hoop by hoop, where every player is involved in every turn. The most
                popular form for beginners and the format played at most Irish clubs&rsquo; open days.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-sky bg-paper-raised p-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-sky/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky">
                <Compass size={14} /> Association Croquet
              </p>
              <p className="mt-3 text-lg font-semibold text-ink">Tactical &middot; Strategic &middot; Longer games</p>
              <p className="mt-2 text-ink-soft">
                The traditional, longer-format game, prized for its depth of strategy. Widely considered
                one of the most tactically demanding lawn sports, and the format of the Irish
                Championships.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <ButtonLink href="/about-croquet" variant="ghost">
              Which one is for me? Read more about the game
            </ButtonLink>
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
          <p className="text-ink-soft">No events scheduled yet. Check back soon.</p>
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
        <Container className="py-14">
          <SectionHeading
            eyebrow="Get involved"
            title="Where do you fit in?"
            description="The CAI has croquet sets available for free loan, and every affiliated club welcomes new and visiting players. Whatever stage you're at, here's where to go next."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GET_INVOLVED.map(({ title, description, href, cta, icon: Icon }) => (
              <div key={title} className="flex flex-col rounded-xl border border-line bg-paper-raised p-5">
                <Icon size={24} className="text-lawn-deep" />
                <h3 className="mt-3 font-semibold text-ink">{title}</h3>
                <p className="mt-1 flex-1 text-sm text-ink-soft">{description}</p>
                <Link href={href} className="mt-4 text-sm font-semibold text-lawn-deep hover:underline">
                  {cta} &rarr;
                </Link>
              </div>
            ))}
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
