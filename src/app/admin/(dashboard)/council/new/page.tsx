import { AdminPageHeader } from "@/components/admin/fields";
import { CouncilForm } from "../CouncilForm";

export default function NewCouncilMemberPage() {
  return (
    <div>
      <AdminPageHeader title="New council member" />
      <CouncilForm />
    </div>
  );
}
