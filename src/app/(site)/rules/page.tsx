import type { Metadata } from "next";
import { FileText, ExternalLink, Download } from "lucide-react";
import { Container, PageHero, formatDate } from "@/components/site/ui";
import { getAllDocuments } from "@/lib/queries";
import { EXTERNAL_LINKS } from "@/lib/content";

export const metadata: Metadata = { title: "Rules & Resources" };
export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  rules: "Rules & tournament conditions",
  governance: "Governance",
  forms: "Forms & applications",
  policies: "Policies",
  general: "General",
};

export default async function RulesPage() {
  const documents = await getAllDocuments();
  const grouped = documents.reduce<Record<string, typeof documents>>((acc, doc) => {
    (acc[doc.category] ??= []).push(doc);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="Rules & Resources"
        title="Rules, policies and documents"
        description="Everything the CAI publishes, from tournament conditions to governance documents, in one searchable library."
      />
      <Container className="py-14">
        {Object.entries(grouped).map(([category, docs]) => (
          <div key={category} className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-ink">{CATEGORY_LABELS[category] ?? category}</h2>
            <div className="divide-y divide-line-soft rounded-xl border border-line bg-paper-raised">
              {docs.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper-tint"
                >
                  <div className="flex items-start gap-3">
                    <FileText size={20} className="mt-0.5 shrink-0 text-lawn-deep" />
                    <div>
                      <p className="font-semibold text-ink">{doc.title}</p>
                      {doc.description && <p className="text-sm text-ink-soft">{doc.description}</p>}
                      <p className="text-xs text-ink-faint">
                        {doc.version && `v${doc.version} · `}
                        {doc.doc_date && formatDate(doc.doc_date)}
                      </p>
                    </div>
                  </div>
                  <Download size={18} className="shrink-0 text-ink-faint" />
                </a>
              ))}
            </div>
          </div>
        ))}
        {documents.length === 0 && <p className="text-ink-soft">No documents published yet.</p>}

        <div className="mt-14">
          <h2 className="mb-4 text-xl font-semibold text-ink">Useful external links</h2>
          <ul className="space-y-2">
            {EXTERNAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-lawn-deep hover:underline"
                >
                  <ExternalLink size={16} /> {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
