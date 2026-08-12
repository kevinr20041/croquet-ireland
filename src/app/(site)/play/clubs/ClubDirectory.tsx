"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import type { Club } from "@/lib/types";
import { Card, Tag } from "@/components/site/ui";

export function ClubDirectory({ clubs, counties }: { clubs: Club[]; counties: string[] }) {
  const [county, setCounty] = useState("");
  const [type, setType] = useState("");
  const [beginnerOnly, setBeginnerOnly] = useState(false);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return clubs.filter((club) => {
      if (county && club.county !== county) return false;
      if (type && !club.croquet_types?.includes(type)) return false;
      if (beginnerOnly && !club.beginner_friendly) return false;
      if (q && !club.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [clubs, county, type, beginnerOnly, q]);

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-line bg-paper-tint p-4">
        <div>
          <label htmlFor="club-search" className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">
            Search
          </label>
          <input
            id="club-search"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Club name"
            className="min-h-[44px] rounded-lg border border-line bg-paper-raised px-3 py-2 text-ink"
          />
        </div>
        <div>
          <label htmlFor="club-county" className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">
            County
          </label>
          <select
            id="club-county"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            className="min-h-[44px] rounded-lg border border-line bg-paper-raised px-3 py-2 text-ink"
          >
            <option value="">All counties</option>
            {counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="club-type" className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">
            Croquet type
          </label>
          <select
            id="club-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="min-h-[44px] rounded-lg border border-line bg-paper-raised px-3 py-2 text-ink"
          >
            <option value="">Any</option>
            <option value="Association Croquet">Association Croquet</option>
            <option value="Golf Croquet">Golf Croquet</option>
          </select>
        </div>
        <label className="flex min-h-[44px] items-center gap-2 text-sm font-semibold text-ink-soft">
          <input
            type="checkbox"
            checked={beginnerOnly}
            onChange={(e) => setBeginnerOnly(e.target.checked)}
            className="h-5 w-5 rounded border-line"
          />
          Beginner-friendly only
        </label>
      </div>

      <p className="mt-4 text-sm text-ink-faint">
        Showing {filtered.length} of {clubs.length} clubs
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((club) => (
          <Card key={club.id} className="flex flex-col overflow-hidden">
            {club.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={club.image_url} alt={club.name} className="h-40 w-full object-cover" />
            ) : (
              <div className="flex h-40 w-full items-center justify-center bg-paper-tint text-ink-faint">
                <MapPin size={28} />
              </div>
            )}
          <div className="flex flex-1 flex-col p-5">
            <h2 className="text-lg font-semibold text-ink">
              <Link href={`/play/clubs/${club.slug}`} className="hover:underline">
                {club.name}
              </Link>
            </h2>
            {club.county && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
                <MapPin size={15} /> {club.county}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {club.croquet_types?.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
              {club.beginner_friendly && <Tag>Beginner-friendly</Tag>}
            </div>
            <div className="mt-4 flex flex-1 flex-col justify-end gap-1.5 text-sm">
              {club.phone && (
                <a href={`tel:${club.phone}`} className="flex items-center gap-1.5 text-lawn-deep hover:underline">
                  <Phone size={14} /> {club.phone}
                </a>
              )}
              {club.email && (
                <a href={`mailto:${club.email}`} className="flex items-center gap-1.5 text-lawn-deep hover:underline">
                  <Mail size={14} /> {club.email}
                </a>
              )}
              {club.website && (
                <a
                  href={club.website.startsWith("http") ? club.website : `https://${club.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-lawn-deep hover:underline"
                >
                  <ExternalLink size={14} /> Club website
                </a>
              )}
            </div>
          </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-ink-soft">No clubs match those filters.</p>
        )}
      </div>
    </div>
  );
}
