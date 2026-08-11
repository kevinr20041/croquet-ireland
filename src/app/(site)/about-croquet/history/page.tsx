import type { Metadata } from "next";
import { Container, PageHero, Prose } from "@/components/site/ui";
import { HISTORY_TEXT } from "@/lib/content";

export const metadata: Metadata = { title: "History of Croquet in Ireland" };

export default function HistoryPage() {
  const paragraphs = HISTORY_TEXT.split("\n\n");
  return (
    <>
      <PageHero eyebrow="About Croquet" title="A history of croquet in Ireland" description="By Clive Martin & Simon Williams (2004)" />
      <Container className="py-14">
        <Prose>
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Prose>
      </Container>
    </>
  );
}
