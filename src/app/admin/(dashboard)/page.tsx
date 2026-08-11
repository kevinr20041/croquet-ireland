import Link from "next/link";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";

export const dynamic = "force-dynamic";

async function getCounts() {
  const [articles, drafts, events, clubs, results] = await Promise.all([
    sql`select count(*)::int as n from articles where status = 'published'`,
    sql`select count(*)::int as n from articles where status = 'draft'`,
    sql`select count(*)::int as n from events where start_date >= current_date`,
    sql`select count(*)::int as n from clubs`,
    sql`select count(*)::int as n from results`,
  ]);
  return {
    published: articles[0].n as number,
    drafts: drafts[0].n as number,
    upcomingEvents: events[0].n as number,
    clubs: clubs[0].n as number,
    results: results[0].n as number,
  };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const stats = [
    { label: "Published articles", value: counts.published, href: "/admin/articles" },
    { label: "Draft articles", value: counts.drafts, href: "/admin/articles" },
    { label: "Upcoming events", value: counts.upcomingEvents, href: "/admin/events" },
    { label: "Clubs listed", value: counts.clubs, href: "/admin/clubs" },
    { label: "Results published", value: counts.results, href: "/admin/results" },
  ];

  return (
    <div>
      <AdminPageHeader title="Overview" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-line bg-paper-raised p-5 hover:border-lawn"
          >
            <p className="text-3xl font-semibold text-ink">{stat.value}</p>
            <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-line bg-paper-tint p-6">
        <h2 className="font-serif text-lg font-semibold text-ink">Quick actions</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/admin/articles/new" className="rounded-lg bg-lawn px-4 py-2.5 text-sm font-semibold text-paper-raised hover:bg-lawn-deep">
            Write a news article
          </Link>
          <Link href="/admin/events/new" className="rounded-lg border border-lawn px-4 py-2.5 text-sm font-semibold text-lawn-deep hover:bg-paper-raised">
            Add an event
          </Link>
          <Link href="/admin/results/new" className="rounded-lg border border-lawn px-4 py-2.5 text-sm font-semibold text-lawn-deep hover:bg-paper-raised">
            Publish a result
          </Link>
        </div>
      </div>
    </div>
  );
}
