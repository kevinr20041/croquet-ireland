import type { Metadata } from "next";
import { Container, PageHero, formatDate } from "@/components/site/ui";
import { getAllResults } from "@/lib/queries";

export const metadata: Metadata = { title: "Results" };
export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const results = await getAllResults();

  return (
    <>
      <PageHero
        eyebrow="Competitions"
        title="Results archive"
        description="Structured results from every CAI competition — searchable, not buried in old match reports."
      />
      <Container className="py-14">
        {results.length === 0 && <p className="text-ink-soft">No results posted yet.</p>}
        <div className="space-y-8">
          {results.map((result) => (
            <div key={result.id} className="rounded-xl border border-line bg-paper-raised p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold text-ink">{result.competition}</h2>
                <p className="text-sm text-ink-faint">{formatDate(result.result_date)}</p>
              </div>
              {result.club_name && <p className="text-sm text-ink-soft">{result.club_name}</p>}
              {result.summary && <p className="mt-3 text-ink-soft">{result.summary}</p>}
              {Array.isArray(result.placings) && result.placings.length > 0 && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[420px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-line text-left text-xs font-bold uppercase tracking-wide text-ink-faint">
                        <th className="py-2 pr-4">Event</th>
                        <th className="py-2 pr-4">Winner</th>
                        <th className="py-2">Runner-up</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.placings.map((p, i) => (
                        <tr key={i} className="border-b border-line-soft">
                          <td className="py-2 pr-4 font-medium text-ink">{p.title ?? "—"}</td>
                          <td className="py-2 pr-4 text-ink-soft">{p.winner ?? "—"}</td>
                          <td className="py-2 text-ink-soft">{p.runner_up ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {result.pdf_url && (
                <a href={result.pdf_url} className="mt-3 inline-block text-sm font-semibold text-lawn-deep hover:underline">
                  Download full result sheet (PDF)
                </a>
              )}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
