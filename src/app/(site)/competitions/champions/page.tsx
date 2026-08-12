import type { Metadata } from "next";
import { Container, PageHero } from "@/components/site/ui";
import { CHAMPIONSHIP_WINNERS } from "@/lib/content";

export const metadata: Metadata = { title: "Championship Winners" };

export default function ChampionshipWinnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Competitions"
        title="Championship winners"
        description="A full honour roll of Irish croquet champions — the Singles Championship of Ireland dates back to 1900."
      />
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          {CHAMPIONSHIP_WINNERS.map((table) => (
            <div key={table.title} className="rounded-xl border border-line bg-paper-raised">
              <h2 className="border-b border-line bg-paper-tint px-5 py-3 font-serif text-lg font-semibold text-ink">
                {table.title}
              </h2>
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {table.results.map(([year, winner], i) => (
                      <tr key={`${year}-${i}`} className="border-b border-line-soft last:border-0">
                        <td className="w-20 px-5 py-2 font-semibold text-ink-soft">{year}</td>
                        <td className="px-5 py-2 text-ink">{winner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
