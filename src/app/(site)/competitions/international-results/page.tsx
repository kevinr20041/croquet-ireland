import type { Metadata } from "next";
import { Container, PageHero } from "@/components/site/ui";
import { INTERNATIONAL_RESULTS_SECTIONS } from "@/lib/content";

export const metadata: Metadata = { title: "International Results" };

export default function InternationalResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Competitions"
        title="International results"
        description="Ireland's international team match history — Home Internationals, the Vera McWeeney and Appleton trophies, and more."
      />
      <Container className="py-14">
        <div className="grid gap-8 sm:grid-cols-2">
          {INTERNATIONAL_RESULTS_SECTIONS.map((section) => (
            <div key={section.title} className="rounded-xl border border-line bg-paper-raised p-5">
              <h2 className="font-serif text-base font-semibold text-ink">{section.title}</h2>
              <ul className="mt-3 space-y-1 text-sm text-ink-soft">
                {section.lines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
