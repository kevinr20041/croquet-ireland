import { AdminPageHeader } from "@/components/admin/fields";
import { DocumentForm } from "../DocumentForm";

export default function NewDocumentPage() {
  return (
    <div>
      <AdminPageHeader title="New document" />
      <DocumentForm />
    </div>
  );
}
