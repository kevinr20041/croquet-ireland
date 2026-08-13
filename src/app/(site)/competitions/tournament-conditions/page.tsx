import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container, PageHero, Card } from "@/components/site/ui";

export const metadata: Metadata = { title: "Tournament Conditions" };

const SECTIONS = [
  {
    title: "Entering",
    points: [
      "Entries must be submitted with the full fee, and entrants must be Associates of the CAI or of an affiliated national croquet association.",
      "All CAI tournaments run under the CAI's Regulations for Tournaments.",
      "Requests for leave (time off during the event) must be made in writing at the time of entry, or to the Manager at the start of play — later requests aren't considered.",
      "Players are responsible for entering and playing at their correct handicap; playing off the wrong handicap can lead to disqualification.",
    ],
  },
  {
    title: "On the day",
    points: [
      "Players must check in with the Manager on arrival and before leaving the grounds each day. A late player risks forfeiting the game.",
      "If the Manager isn't available, the posted schedule of play is treated as final.",
      "A double-banked game may be temporarily paused by the Manager if the other game on the same court is close to its time limit.",
      "Players are jointly responsible for keeping accurate time; if they don't, the Manager's ruling stands.",
    ],
  },
  {
    title: "Hoops & equipment",
    points: [
      "Hoop widths follow the standard tolerance above ball diameter (with a tighter tolerance allowed if advertised in advance).",
      "Hoops are checked and reset at least once daily, and moved periodically in longer events; the Tournament Referee is responsible for hoop-setting.",
      "Footwear must be flat-soled, without raised heels.",
    ],
  },
  {
    title: "Conduct",
    points: [
      "Players are expected to wear predominantly white clothing on court (the Manager may allow rain gear).",
      "Anyone — player or spectator — behaving in a way that disrupts play or brings the game into disrepute may be asked to leave the vicinity of the courts.",
      "Spectators should stay aware of nearby games and never walk across a player's line of aim.",
    ],
  },
  {
    title: "Handicaps",
    points: [
      "Tournaments run according to the CAI's published Association Croquet and Golf Croquet handicap systems — see the current lists under Rankings & Handicaps.",
    ],
  },
];

export default function TournamentConditionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Competitions"
        title="Tournament conditions"
        description="The conditions every CAI tournament runs under, summarised — see the full CAI Regulations for Tournaments for the complete rules."
      />
      <Container className="py-14">
        <div className="grid gap-5 sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <Card key={section.title} className="p-6">
              <h2 className="font-serif text-lg font-semibold text-ink">{section.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {section.points.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lawn" />
                    {p}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <a
            href="https://www.sportireland.ie/Anti-Doping/Report-Doping/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-semibold text-lawn-deep hover:underline"
          >
            <ExternalLink size={15} /> Sport Ireland Anti-Doping
          </a>
        </div>
      </Container>
    </>
  );
}
