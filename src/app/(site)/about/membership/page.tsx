import type { Metadata } from "next";
import { CircleCheck, Download, Mail, Users, FileText } from "lucide-react";
import { Container, PageHero, Card, ButtonLink } from "@/components/site/ui";

export const metadata: Metadata = { title: "Membership" };

const MEMBERSHIP_FORM_URL =
  "https://q41s7axx6lc9r6rm.public.blob.vercel-storage.com/documents/CAI_Individual_Membership_Application_Form.pdf";

const INDIVIDUAL_BENEFITS = [
  "Aids the development and support of croquet throughout Ireland",
  "Right of entry to CAI individual events",
  "Access to coach training and referee training",
  "Can hold an official Association Croquet or Golf Croquet handicap",
  "Qualifies for selection to Irish teams, WCF world events and ECF European events",
  "Access to advice and aid for lawn (re-)development",
  "Eligible for a Player Development Bursary",
  "Voting rights at an AGM/EGM",
];

const CLUB_BENEFITS = [
  "Eligible for financial grants from the CAI",
  "Right of entry to CAI inter-club events",
  "The right to be represented on the CAI Council",
  "Club members registered as croquet players have all the rights of individual members",
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="About CAI"
        title="Membership of Croquet Association of Ireland"
        description="Join as an individual, or register your club — membership supports coaching, bursaries, lawn development and Ireland's international teams."
      />

      <Container className="py-14">
        <div className="grid gap-5 sm:grid-cols-2">
          <Card className="flex flex-col p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lawn/10 text-lawn-deep">
                <FileText size={22} />
              </span>
              <h2 className="font-serif text-lg font-semibold text-ink">Join CAI</h2>
            </div>
            <p className="mt-3 flex-1 text-sm text-ink-soft">
              Download and complete the Individual Membership Application Form, then return it to the
              Honorary Secretary along with your subscription.
            </p>
            <ButtonLink href={MEMBERSHIP_FORM_URL} className="mt-4">
              <Download size={16} /> Download Membership Application Form
            </ButtonLink>
          </Card>

          <Card className="flex flex-col p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Mail size={22} />
              </span>
              <h2 className="font-serif text-lg font-semibold text-ink">Pay your membership fee</h2>
            </div>
            <p className="mt-3 flex-1 text-sm text-ink-soft">
              <strong className="text-ink">Full member:</strong> €20 / year &nbsp;·&nbsp;{" "}
              <strong className="text-ink">Junior (under 18):</strong> €5 / year.
              <br />
              Online payment is being set up — in the meantime, email the Secretary to arrange payment
              alongside your application.
            </p>
            <ButtonLink href="mailto:secretary@croquetireland.com" variant="secondary" className="mt-4">
              <Mail size={16} /> Email the Secretary
            </ButtonLink>
          </Card>
        </div>
      </Container>

      <section className="border-y border-line bg-paper-tint">
        <Container className="py-14">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold text-ink">
            <Users size={24} className="text-lawn-deep" /> Advantages of membership
          </h2>
          <p className="mb-8 max-w-2xl text-ink-soft">
            Membership is open to individual players and to affiliated clubs, each with its own set of
            benefits.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <h3 className="font-serif text-lg font-semibold text-ink">An individual member</h3>
              <ul className="mt-4 space-y-3">
                {INDIVIDUAL_BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <CircleCheck size={18} className="mt-0.5 shrink-0 text-lawn-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="font-serif text-lg font-semibold text-ink">A registered club</h3>
              <ul className="mt-4 space-y-3">
                {CLUB_BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <CircleCheck size={18} className="mt-0.5 shrink-0 text-lawn-deep" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink-soft">
                Setting up a new club? Download the{" "}
                <a href="/rules" className="font-semibold text-lawn-deep hover:underline">
                  Club Set-up Application Form
                </a>{" "}
                from Rules &amp; Resources.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <div className="rounded-2xl border border-line bg-paper-raised p-6 sm:p-8">
          <h2 className="font-serif text-xl font-semibold text-ink">Data protection &amp; safeguarding</h2>
          <p className="mt-2 max-w-3xl text-sm text-ink-soft">
            CAI stores your personal information securely and uses it only to administer and promote croquet
            activities. It may be shared, as appropriate, with Irish team captains, selectors, handicappers and
            other duly appointed officers, or with the organisers of an international tournament you have been
            selected for or are seeking selection to. Tournament results are included in official World Croquet
            Federation ranking lists. CAI does not pass your information to any other third party. The
            Association is fully committed to safeguarding the wellbeing of its members, in line with{" "}
            <em>Children First: National Guidance for the Protection and Welfare of Children</em> and the Code
            of Ethics and Good Practice for Children&apos;s Sport in Ireland.
          </p>
          <p className="mt-4 text-sm text-ink-soft">
            Read the full{" "}
            <a href="/rules" className="font-semibold text-lawn-deep hover:underline">
              Safeguarding Statement and governance documents
            </a>{" "}
            in Rules &amp; Resources.
          </p>
        </div>
      </Container>
    </>
  );
}
