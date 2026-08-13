import type { Metadata } from "next";
import Link from "next/link";
import { Images, FileText } from "lucide-react";
import { Container, PageHero, Prose, Card, ButtonLink } from "@/components/site/ui";
import { HISTORY_TEXT, GAZETTE_SUMMARY, CARRICKMINES_100_SUMMARY } from "@/lib/content";

export const metadata: Metadata = { title: "History" };

export default function HistoryPage() {
  const historyParagraphs = HISTORY_TEXT.split("\n\n");
  const gazetteParagraphs = GAZETTE_SUMMARY.split("\n\n");
  const carrickminesParagraphs = CARRICKMINES_100_SUMMARY.split("\n\n");

  return (
    <>
      <PageHero
        eyebrow="About Croquet"
        title="History"
        description="Croquet in Ireland, from its 1830s origins to a century of championships at Carrickmines."
      />

      <Container className="py-14">
        <span id="croquet-in-ireland" className="block scroll-mt-24" />
        <h2 className="text-2xl font-semibold text-ink">Croquet in Ireland</h2>
        <p className="mb-6 text-sm text-ink-faint">By Clive Martin &amp; Simon Williams (2004)</p>
        <Prose>
          {historyParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Prose>
      </Container>

      <section className="border-t border-line bg-paper-tint">
        <Container className="py-14">
          <span id="croquet-gazette" className="block scroll-mt-24" />
          <h2 className="text-2xl font-semibold text-ink">The Irish Championship, from the pages of the Croquet Gazette</h2>
          <p className="mb-6 text-sm text-ink-faint">Compiled from CAI's Croquet Gazette archive notes</p>
          <Prose>
            {gazetteParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Prose>
        </Container>
      </section>

      <Container className="py-14">
        <span id="carrickmines-100-years" className="block scroll-mt-24" />
        <h2 className="text-2xl font-semibold text-ink">Carrickmines: 100 years of championships</h2>
        <p className="mb-6 text-sm text-ink-faint">Written for the club's centenary, 2009</p>
        <Prose>
          {carrickminesParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Prose>
      </Container>

      <section className="border-t border-line bg-paper-tint">
        <Container className="py-14">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="p-6">
              <span id="how-the-irish-invented-croquet" className="block scroll-mt-24" />
              <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink">
                <FileText size={20} className="text-lawn-deep" /> How the Irish invented croquet
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                An academic essay by historian Christine Kinealy on croquet&apos;s early Irish origins, with
                evidence that the game was played here up to two decades before it reached England.
              </p>
              <ButtonLink
                href="https://q41s7axx6lc9r6rm.public.blob.vercel-storage.com/documents/how-the-irish-invented-croquet-kinealy.pdf"
                variant="secondary"
                className="mt-4"
              >
                Read the essay (PDF)
              </ButtonLink>
            </Card>
            <Card className="p-6">
              <span id="1900-gallery" className="block scroll-mt-24" />
              <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink">
                <Images size={20} className="text-lawn-deep" /> 1900 gallery
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                A collection of photographs of Irish croquet from around the turn of the twentieth century.
              </p>
              <ButtonLink href="/gallery/croquet-circa-1900" variant="secondary" className="mt-4">
                View the gallery
              </ButtonLink>
            </Card>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <p className="text-sm text-ink-faint">
          Looking for the full championship-by-championship record?{" "}
          <Link href="/competitions/champions" className="font-semibold text-lawn-deep hover:underline">
            See Championship Winners since 1900
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
