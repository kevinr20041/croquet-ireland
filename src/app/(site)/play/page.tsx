import type { Metadata } from "next";
import { Container, PageHero, ButtonLink, Card } from "@/components/site/ui";

export const metadata: Metadata = { title: "Play Croquet" };

export default function PlayPage() {
  return (
    <>
      <PageHero
        eyebrow="Play Croquet"
        title="Ways to start playing"
        description="From borrowing a free set to visiting a club, here's everything you need to actually get on a lawn."
      />
      <Container className="grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="font-serif text-lg font-semibold text-ink">Free loan croquet set</h2>
          <p className="mt-2 text-sm text-ink-soft">
            CAI has croquet sets available for free loan, supported by Garden Games, so you can try the game
            in your own garden before committing to anything.
          </p>
          <p className="mt-3 text-sm">
            Contact the <a href="mailto:secretary@croquetireland.com" className="font-semibold text-lawn-deep hover:underline">Secretary</a> to arrange a loan.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="font-serif text-lg font-semibold text-ink">Visit a club</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Every CAI-affiliated club welcomes prospective members and visitors. Most offer beginner
            coaching and are happy to lend equipment for a first go.
          </p>
          <ButtonLink href="/play/clubs" className="mt-4" variant="secondary">
            Find a club
          </ButtonLink>
        </Card>
        <Card className="p-6">
          <h2 className="font-serif text-lg font-semibold text-ink">Learn the rules first</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Read a plain-language introduction to Golf Croquet and Association Croquet before you go, so
            you're not learning everything on the lawn.
          </p>
          <ButtonLink href="/about-croquet/getting-started" className="mt-4" variant="secondary">
            Getting started guide
          </ButtonLink>
        </Card>
      </Container>
    </>
  );
}
