export type PageIndexEntry = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
};

// A small curated index of hub/feature pages, so generic searches ("council",
// "constitution", "calendar", "rankings") reliably land on the right page even
// when there's no single database record whose title matches exactly.
export const PAGE_INDEX: PageIndexEntry[] = [
  {
    title: "Rankings & Handicaps",
    description: "AC rankings, GC rankings, AC handicaps and the GC handicap table — search for a player.",
    href: "/rankings",
    keywords: ["ranking", "rankings", "rank", "handicap", "handicaps", "golf croquet ranking", "ac ranking", "gc ranking", "handicap list", "handicap table"],
  },
  {
    title: "CAI Calendar",
    description: "Every CAI tournament and fixture, upcoming and past — searchable by name or date.",
    href: "/competitions/calendar",
    keywords: ["calendar", "fixtures", "schedule", "cai calendar", "events"],
  },
  {
    title: "Championship Winners",
    description: "The full honour roll of Irish croquet champions, back to 1900.",
    href: "/competitions/champions",
    keywords: ["past irish championships", "championship winners", "champions", "irish championship", "honour roll"],
  },
  {
    title: "International Results",
    description: "Ireland's international team match history — Home Internationals, Vera McWeeney and Appleton trophies.",
    href: "/competitions/international-results",
    keywords: ["international results", "internationals", "vera mcweeney", "appleton trophy", "home internationals"],
  },
  {
    title: "Rules & Resources",
    description: "Rules, tournament conditions, governance documents, and useful external links.",
    href: "/rules",
    keywords: ["rules", "links", "useful links", "external links", "tournament conditions", "document library", "documents"],
  },
  {
    title: "About CAI — Council & Governance",
    description: "The CAI Council, governance and Sport Ireland compliance information.",
    href: "/about",
    keywords: ["council", "cai council", "governance", "committee", "sport ireland", "governance code"],
  },
  {
    title: "Membership",
    description: "Membership advantages, the application form, and fee information.",
    href: "/about/membership",
    keywords: ["membership", "join", "join cai", "membership fee", "advantages of membership", "membership application"],
  },
  {
    title: "Contact",
    description: "Contact the Secretary, Web Master, or Photo Info team.",
    href: "/contact",
    keywords: ["contact", "contact information", "secretary", "email", "phone"],
  },
  {
    title: "Find a Club",
    description: "Search CAI-affiliated clubs across Ireland by county and croquet type.",
    href: "/play/clubs",
    keywords: ["clubs", "find a club", "club list", "clubs in ireland"],
  },
  {
    title: "Gallery",
    description: "Photo albums from recent championships, and a historical collection from around 1900.",
    href: "/gallery",
    keywords: ["gallery", "photos", "pictures", "images", "albums"],
  },
  {
    title: "About Croquet — History",
    description: "The history of croquet in Ireland.",
    href: "/about-croquet/history",
    keywords: ["history", "history of croquet"],
  },
];

export function searchPageIndex(query: string, limit = 6): PageIndexEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PAGE_INDEX.filter(
    (p) => p.title.toLowerCase().includes(q) || p.keywords.some((k) => k.includes(q) || q.includes(k))
  ).slice(0, limit);
}
