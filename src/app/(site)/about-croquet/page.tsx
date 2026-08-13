import type { Metadata } from "next";
import { Container, PageHero, ButtonLink, Card } from "@/components/site/ui";

export const metadata: Metadata = { title: "About Croquet" };

export default function AboutCroquetPage() {
  return (
    <>
      <PageHero
        eyebrow="About Croquet"
        title="What is croquet?"
        description="A precise, tactical lawn game with two competitive forms played in Ireland today, and a much longer Irish history than most people realise."
      />
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-2xl border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://q41s7axx6lc9r6rm.public.blob.vercel-storage.com/hero/interested-crowd.jpg"
              alt="Spectators watching a croquet match at an Irish club"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid gap-6">
            <Card className="p-6">
              <h2 className="font-serif text-xl font-semibold text-ink">Golf Croquet</h2>
              <p className="mt-2 text-ink-soft">
                The simplest and most social form. Players take single shots in strict turn order, all racing
                to run the same hoop, so everyone stays involved every round. Easy to learn in minutes, but
                played seriously up to World Championship level.
              </p>
            </Card>
            <Card className="p-6">
              <h2 className="font-serif text-xl font-semibold text-ink">Association Croquet</h2>
              <p className="mt-2 text-ink-soft">
                The more formal, tactical form. Running a hoop or striking another ball earns extra shots, so
                a strong player can build a break through several hoops in one turn while their opponent
                watches. Ireland&apos;s Championship of Ireland is played in this format.
              </p>
            </Card>
          </div>
        </div>
      </Container>
      <section className="border-t border-line bg-paper-tint">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-10">
          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">Ready to find out more?</h2>
            <p className="text-ink-soft">Read the full Irish history of the game, or jump straight to getting started.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/about-croquet/history" variant="secondary">
              History of croquet in Ireland
            </ButtonLink>
            <ButtonLink href="/about-croquet/getting-started">Getting started</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
