import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { getClubBySlug } from "@/lib/queries";
import { Container, Tag } from "@/components/site/ui";

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

  return (
    <Container className="py-10">
      <Link href="/play/clubs" className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-lawn-deep hover:underline">
        <ArrowLeft size={16} /> Back to all clubs
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
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
        </div>

        <aside className="h-fit rounded-xl border border-line bg-paper-tint p-6">
          <h2 className="font-serif text-lg font-semibold text-ink">Contact</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {club.address && (
              <li className="flex items-start gap-2 text-ink-soft">
                <MapPin size={16} className="mt-0.5 shrink-0" /> {club.address}
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
