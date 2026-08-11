import type { Metadata } from "next";
import { Container, PageHero, Prose, ButtonLink } from "@/components/site/ui";
import { GETTING_STARTED_TEXT } from "@/lib/content";

export const metadata: Metadata = { title: "Getting Started" };

export default function GettingStartedPage() {
  const paragraphs = GETTING_STARTED_TEXT.split("\n\n");
  return (
    <>
      <PageHero eyebrow="About Croquet" title="Getting started" description="How to try croquet, whichever way suits you best." />
      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_320px]">
        <Prose>
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Prose>
        <aside className="h-fit rounded-xl border border-line bg-paper-tint p-6">
          <h2 className="font-serif text-lg font-semibold text-ink">Next step</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Borrow a free croquet set, or go straight to finding your nearest club.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <ButtonLink href="/play">Free loan croquet sets</ButtonLink>
            <ButtonLink href="/play/clubs" variant="secondary">
              Find a club
            </ButtonLink>
          </div>
        </aside>
      </Container>
    </>
  );
}
