import type { Metadata } from "next";
import { Container, PageHero, Card, ButtonLink } from "@/components/site/ui";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch" description="For club-specific questions, contact the club directly. See the club directory." />
      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-ink-faint">Secretary</p>
            <p className="mt-1 text-sm text-ink-soft">General CAI matters, and borrowing a croquet set.</p>
            <a href="mailto:secretary@croquetireland.com" className="mt-2 block font-semibold text-lawn-deep hover:underline">
              secretary@croquetireland.com
            </a>
          </Card>
          <Card className="p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-ink-faint">Web Master</p>
            <p className="mt-1 text-sm text-ink-soft">Website questions and corrections.</p>
            <a href="mailto:webcai@croquetireland.com" className="mt-2 block font-semibold text-lawn-deep hover:underline">
              webcai@croquetireland.com
            </a>
          </Card>
          <Card className="p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-ink-faint">Photo Info</p>
            <p className="mt-1 text-sm text-ink-soft">Submitting photos for the gallery.</p>
            <a href="mailto:photocai@croquetireland.com" className="mt-2 block font-semibold text-lawn-deep hover:underline">
              photocai@croquetireland.com
            </a>
          </Card>
        </div>
        <div className="mt-10">
          <ButtonLink href="/play/clubs" variant="secondary">
            Looking for a specific club? Browse the directory
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
