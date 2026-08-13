import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, ExternalLink, CalendarDays, Navigation } from "lucide-react";
import { getClubBySlug, getEventsByClub } from "@/lib/queries";
import { Container, Tag, formatDateRange } from "@/components/site/ui";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/play/clubs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const club = await getClubBySlug(slug);
  return { title: club?.name ?? "Club" };
}

export default async function ClubProfilePage({ params }: PageProps<"/play/clubs/[slug]">) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);
  if (!club) notFound();
  const upcomingEvents = await getEventsByClub(club.id, 3);

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Play Croquet", href: "/play" }, { label: "Find a Club", href: "/play/clubs" }, { label: club.name }]} />

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {club.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={club.image_url}
              alt={club.name}
              className="mb-6 h-64 w-full rounded-2xl border border-line object-cover sm:h-80"
            />
          )}
          <h1 className="text-3xl font-semibold text-ink">{club.name}</h1>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {club.croquet_types?.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
            {club.beginner_friendly && <Tag>Beginner-friendly</Tag>}
          </div>
          {club.description && <p className="mt-6 max-w-2xl text-lg text-ink-soft">{club.description}</p>}
          {club.lawns && (
            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Facilities</h2>
              <p className="mt-1 text-ink-soft">{club.lawns}</p>
            </div>
          )}
          {upcomingEvents.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Upcoming events at this club</h2>
              <ul className="mt-3 space-y-2">
                {upcomingEvents.map((event) => (
                  <li key={event.id}>
                    <a
                      href={`/competitions/calendar/${event.slug}`}
                      className="flex items-center gap-2 rounded-lg border border-line bg-paper-raised px-4 py-3 hover:border-lawn"
                    >
                      <CalendarDays size={16} className="shrink-0 text-lawn-deep" />
                      <span className="flex-1 text-sm font-semibold text-ink">{event.name}</span>
                      <span className="shrink-0 text-xs text-ink-faint">{formatDateRange(event.start_date, event.end_date)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-line bg-paper-tint p-6">
          <h2 className="font-serif text-lg font-semibold text-ink">Contact</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {club.address && (
              <li className="flex items-start gap-2 text-ink-soft">
                <MapPin size={16} className="mt-0.5 shrink-0" /> {club.address}
              </li>
            )}
            {club.address && (
              <li>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${club.name}, ${club.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-lawn-deep hover:underline"
                >
                  <Navigation size={16} /> Get directions
                </a>
              </li>
            )}
            {club.contact_person && <li className="text-ink-soft">Contact: {club.contact_person}</li>}
            {club.phone && (
              <li>
                <a href={`tel:${club.phone}`} className="flex items-center gap-2 font-semibold text-lawn-deep hover:underline">
                  <Phone size={16} /> {club.phone}
                </a>
              </li>
            )}
            {club.email && (
              <li>
                <a href={`mailto:${club.email}`} className="flex items-center gap-2 font-semibold text-lawn-deep hover:underline">
                  <Mail size={16} /> {club.email}
                </a>
              </li>
            )}
            {club.website && (
              <li>
                <a
                  href={club.website.startsWith("http") ? club.website : `https://${club.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-lawn-deep hover:underline"
                >
                  <ExternalLink size={16} /> Website
                </a>
              </li>
            )}
            {club.facebook_url && (
              <li>
                <a
                  href={club.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-lawn-deep hover:underline"
                >
                  <ExternalLink size={16} /> Facebook
                </a>
              </li>
            )}
          </ul>
        </aside>
      </div>
    </Container>
  );
}
