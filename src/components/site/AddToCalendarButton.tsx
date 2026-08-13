"use client";

import { useState } from "react";
import { CalendarPlus, ChevronDown } from "lucide-react";

function toIcsDate(dateStr: string) {
  return dateStr.replace(/-/g, "");
}

function buildGoogleCalendarUrl(name: string, start: string, end: string, location: string, details: string) {
  const endExclusive = new Date(end);
  endExclusive.setDate(endExclusive.getDate() + 1);
  const endStr = endExclusive.toISOString().slice(0, 10).replace(/-/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: name,
    dates: `${toIcsDate(start)}/${endStr}`,
    details,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildIcsFile(name: string, start: string, end: string, location: string, details: string) {
  const endExclusive = new Date(end);
  endExclusive.setDate(endExclusive.getDate() + 1);
  const endStr = endExclusive.toISOString().slice(0, 10).replace(/-/g, "");
  const escape = (s: string) => s.replace(/[,;]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Croquet Association of Ireland//Calendar//EN",
    "BEGIN:VEVENT",
    `UID:${toIcsDate(start)}-${name.replace(/\s+/g, "-").toLowerCase()}@croquetireland`,
    `DTSTART;VALUE=DATE:${toIcsDate(start)}`,
    `DTEND;VALUE=DATE:${endStr}`,
    `SUMMARY:${escape(name)}`,
    location ? `LOCATION:${escape(location)}` : "",
    details ? `DESCRIPTION:${escape(details)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function AddToCalendarButton({
  name,
  startDate,
  endDate,
  location,
  details,
}: {
  name: string;
  startDate: string;
  endDate?: string | null;
  location: string;
  details: string;
}) {
  const [open, setOpen] = useState(false);
  const end = endDate ?? startDate;

  function downloadIcs() {
    const ics = buildIcsFile(name, startDate, end, location, details);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-lawn px-4 py-2.5 text-sm font-semibold text-lawn-deep hover:bg-paper-raised"
      >
        <CalendarPlus size={16} /> Add to calendar <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-lg">
          <button
            type="button"
            onClick={downloadIcs}
            className="block w-full px-4 py-2.5 text-left text-sm font-semibold text-ink hover:bg-paper-tint"
          >
            Apple / Outlook (.ics file)
          </button>
          <a
            href={buildGoogleCalendarUrl(name, startDate, end, location, details)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block w-full px-4 py-2.5 text-left text-sm font-semibold text-ink hover:bg-paper-tint"
          >
            Google Calendar
          </a>
        </div>
      )}
    </div>
  );
}
