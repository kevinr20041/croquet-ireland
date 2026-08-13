export type PageIndexEntry = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
};

// A small curated index of hub and feature pages, so general searches such as
// "council", "constitution", "calendar" or "rankings" reliably land on the
// right page even when no single database record matches the title exactly.
export const PAGE_INDEX: PageIndexEntry[] = [
  {
    title: "Rankings & Handicaps",
    description: "AC rankings, GC rankings, AC handicaps and the GC handicap table. Search for a player by name.",
    href: "/rankings",
    keywords: ["ranking", "rankings", "rank", "handicap", "handicaps", "golf croquet ranking", "ac ranking", "gc ranking", "handicap list", "handicap table"],
  },
  {
    title: "CAI Calendar",
    description: "Every CAI tournament and fixture, upcoming and past, searchable by name or date.",
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
    description: "Ireland's international team match history, including the Home Internationals, and the Vera McWeeney and Appleton trophies.",
    href: "/competitions/international-results",
    keywords: ["international results", "internationals", "vera mcweeney", "appleton trophy", "home internationals"],
  },
  {
    title: "Tournament Conditions",
    description: "Entry rules, hoop-setting, conduct and handicap conditions for CAI tournaments.",
    href: "/competitions/tournament-conditions",
    keywords: ["tournament conditions", "regulations", "hoop setting", "conduct", "entry rules"],
  },
  {
    title: "History",
    description: "Croquet in Ireland, the Croquet Gazette archive, Carrickmines' centenary, and the 1900 photo gallery.",
    href: "/about-croquet/history",
    keywords: ["croquet gazette", "carrickmines 100 years", "how the irish invented croquet", "1900 gallery", "kinealy"],
  },
  {
    title: "Rules & Resources",
    description: "Rules, tournament conditions, governance documents, and useful external links.",
    href: "/rules",
    keywords: ["rules", "links", "useful links", "external links", "tournament conditions", "document library", "documents"],
  },
  {
    title: "About CAI: Council & Governance",
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
    title: "About Croquet: History",
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
