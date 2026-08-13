"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Field, TextInput, TextArea, Select, FormActions, PrimaryButton } from "@/components/admin/fields";
import type { ResultRow, Club, EventRow } from "@/lib/types";

type Placing = { title: string; winner: string; runner_up: string };

export function ResultForm({ result, clubs, events }: { result?: ResultRow; clubs: Club[]; events: EventRow[] }) {
  const router = useRouter();
  const [competition, setCompetition] = useState(result?.competition ?? "");
  const [category, setCategory] = useState(result?.category ?? "");
  const [resultDate, setResultDate] = useState(result?.result_date?.slice(0, 10) ?? "");
  const [clubId, setClubId] = useState(result?.club_id ?? "");
  const [eventId, setEventId] = useState(result?.event_id ?? "");
  const [summary, setSummary] = useState(result?.summary ?? "");
  const [pdfUrl, setPdfUrl] = useState(result?.pdf_url ?? "");
  const [placings, setPlacings] = useState<Placing[]>(
    (result?.placings as Placing[] | undefined)?.length
      ? (result!.placings as Placing[])
      : [{ title: "", winner: "", runner_up: "" }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updatePlacing(i: number, key: keyof Placing, value: string) {
    setPlacings((prev) => prev.map((p, idx) => (idx === i ? { ...p, [key]: value } : p)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      competition,
      category: category || null,
      result_date: resultDate,
      club_id: clubId || null,
      event_id: eventId || null,
      summary: summary || null,
      pdf_url: pdfUrl || null,
      placings: placings.filter((p) => p.title || p.winner),
    };
    const endpoint = result ? `/api/admin/results/${result.id}` : "/api/admin/results";
    const res = await fetch(endpoint, {
      method: result ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/admin/results");
      router.refresh();
    } else {
      setError("Could not save the result.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <Field label="Competition name">
        <TextInput required value={competition} onChange={(e) => setCompetition(e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Category" hint="e.g. AC, GC, Handicap">
          <TextInput value={category} onChange={(e) => setCategory(e.target.value)} />
        </Field>
        <Field label="Result date">
          <TextInput type="date" required value={resultDate} onChange={(e) => setResultDate(e.target.value)} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Club">
          <Select value={clubId} onChange={(e) => setClubId(e.target.value)}>
            <option value="">None</option>
            {clubs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Linked event">
          <Select value={eventId} onChange={(e) => setEventId(e.target.value)}>
            <option value="">None</option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Summary">
        <TextArea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} />
      </Field>

      <div>
        <span className="mb-1 block text-sm font-semibold text-ink-soft">Trophy / event placings</span>
        <div className="space-y-3">
          {placings.map((p, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
              <TextInput placeholder="Trophy / event" value={p.title} onChange={(e) => updatePlacing(i, "title", e.target.value)} />
              <TextInput placeholder="Winner" value={p.winner} onChange={(e) => updatePlacing(i, "winner", e.target.value)} />
              <TextInput placeholder="Runner-up" value={p.runner_up} onChange={(e) => updatePlacing(i, "runner_up", e.target.value)} />
              <button
                type="button"
                onClick={() => setPlacings((prev) => prev.filter((_, idx) => idx !== i))}
                className="rounded-lg p-2 text-ink-faint hover:bg-maroon/10 hover:text-maroon"
                aria-label="Remove row"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPlacings((prev) => [...prev, { title: "", winner: "", runner_up: "" }])}
          className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-lawn-deep hover:underline"
        >
          <Plus size={15} /> Add another row
        </button>
      </div>

      <Field label="PDF result sheet URL" hint="Optional. Link to a scanned or uploaded PDF">
        <TextInput value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} />
      </Field>

      {error && <p className="text-sm font-semibold text-maroon">{error}</p>}
      <FormActions>
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : result ? "Save changes" : "Publish result"}
        </PrimaryButton>
      </FormActions>
    </form>
  );
}
