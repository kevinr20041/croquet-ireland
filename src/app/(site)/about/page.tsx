import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Container, PageHero, ButtonLink, Card } from "@/components/site/ui";
import { getCouncilMembers } from "@/lib/queries";

export const metadata: Metadata = { title: "About CAI" };
export const dynamic = "force-dynamic";

export default async function AboutCaiPage() {
  const council = await getCouncilMembers();

  return (
    <>
      <PageHero
        eyebrow="About CAI"
        title="The Croquet Association of Ireland"
        description="CAI is the governing body for the sport of croquet in Ireland, run by a volunteer council on behalf of its affiliated clubs and members."
      />

      <Container className="py-14">
        <h2 className="mb-5 text-xl font-semibold text-ink">Council</h2>
        {council.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {council.map((member) => (
              <Card key={member.id} className="p-5">
                <p className="font-semibold text-ink">{member.name}</p>
                <p className="text-sm text-ink-soft">{member.role}</p>
                {member.email && (
                  <a href={`mailto:${member.email}`} className="mt-1 block text-sm text-lawn-deep hover:underline">
                    {member.email}
                  </a>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-ink-soft">Council listing coming soon.</p>
        )}
      </Container>

      <section className="border-y border-line bg-paper-tint">
        <Container className="grid gap-6 py-14 sm:grid-cols-2">
          <Card className="flex items-start gap-4 p-6">
            <ShieldCheck className="mt-1 shrink-0 text-lawn-deep" size={28} />
            <div>
              <h2 className="font-serif text-lg font-semibold text-ink">Governance</h2>
              <p className="mt-1 text-sm text-ink-soft">
                CAI confirms compliance with the Governance Code for the Community, Voluntary and Charity
                sector, and is affiliated with Sport Ireland.
              </p>
              <ButtonLink href="/rules" variant="ghost" className="mt-3">
                View governance documents
              </ButtonLink>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="font-serif text-lg font-semibold text-ink">Membership</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Join as an individual member, or set up a new affiliated club. Membership supports coaching,
              bursaries, and Ireland&apos;s international teams.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <ButtonLink href="/about/membership" variant="secondary">
                Membership &amp; advantages
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </section>

      <Container className="py-14">
        <h2 className="mb-5 text-xl font-semibold text-ink">Contact</h2>
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
      </Container>
    </>
  );
}
