import { AdminPageHeader } from "@/components/admin/fields";
import { ArticleForm } from "../ArticleForm";

export default function NewArticlePage() {
  return (
    <div>
      <AdminPageHeader title="New article" />
      <ArticleForm />
    </div>
  );
}
