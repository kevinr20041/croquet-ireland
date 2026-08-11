import { AdminPageHeader } from "@/components/admin/fields";
import { ClubForm } from "../ClubForm";

export default function NewClubPage() {
  return (
    <div>
      <AdminPageHeader title="New club" />
      <ClubForm />
    </div>
  );
}
