"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, TextArea, Select, FormActions, PrimaryButton } from "@/components/admin/fields";
import { slugify } from "@/lib/slug";
import type { EventRow, Club } from "@/lib/types";

export function EventForm({ event, clubs }: { event?: EventRow; clubs: Club[] }) {
  const router = useRouter();
  const [name, setName] = useState(event?.name ?? "");
  const [slug, setSlug] = useState(event?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!event);
  const [startDate, setStartDate] = useState(event?.start_date?.slice(0, 10) ?? "");
  const [endDate, setEndDate] = useState(event?.end_date?.slice(0, 10) ?? "");
  const [venue, setVenue] = useState(event?.venue ?? "");
  const [clubId, setClubId] = useState(event?.club_id ?? "");
  const [competitionType, setCompetitionType] = useState(event?.competition_type ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [entryInfo, setEntryInfo] = useState(event?.entry_info ?? "");
  const [registrationLink, setRegistrationLink] = useState(event?.registration_link ?? "");
  const [documentsUrl, setDocumentsUrl] = useState(event?.documents_url ?? "");
  const [status, setStatus] = useState(event?.status ?? "upcoming");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      slug: slug || slugify(name),
      name,
      start_date: startDate,
      end_date: endDate || null,
      venue: venue || null,
      club_id: clubId || null,
      competition_type: competitionType || null,
      description: description || null,
      entry_info: entryInfo || null,
      registration_link: registrationLink || null,
      documents_url: documentsUrl || null,
      status,
    };
    const endpoint = event ? `/api/admin/events/${event.id}` : "/api/admin/events";
    const res = await fetch(endpoint, {
      method: event ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/admin/events");
      router.refresh();
    } else {
      setError("Could not save the event.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <Field label="Event name">
        <TextInput
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
        />
      </Field>
      <Field label="URL slug">
        <TextInput required value={slug} onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Start date">
          <TextInput type="date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Field>
        <Field label="End date" hint="Leave blank for a single-day event">
          <TextInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </Field>
      </div>
      <Field label="Venue">
        <TextInput value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="e.g. Carrickmines Croquet & Lawn Tennis Club" />
      </Field>
      <Field label="Club">
        <Select value={clubId} onChange={(e) => setClubId(e.target.value)}>
          <option value="">— None —</option>
          {clubs.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Competition type" hint="e.g. AC, GC, Handicap, International">
        <TextInput value={competitionType} onChange={(e) => setCompetitionType(e.target.value)} />
      </Field>
      <Field label="Description">
        <TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      </Field>
      <Field label="Entry information">
        <TextArea value={entryInfo} onChange={(e) => setEntryInfo(e.target.value)} rows={3} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Registration link">
          <TextInput value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} />
        </Field>
        <Field label="Tournament conditions / documents URL">
          <TextInput value={documentsUrl} onChange={(e) => setDocumentsUrl(e.target.value)} />
        </Field>
      </div>
      <Field label="Status">
        <Select value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </Select>
      </Field>
      {error && <p className="text-sm font-semibold text-maroon">{error}</p>}
      <FormActions>
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : event ? "Save changes" : "Create event"}
        </PrimaryButton>
      </FormActions>
    </form>
  );
}
