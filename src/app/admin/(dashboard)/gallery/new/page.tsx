import { AdminPageHeader } from "@/components/admin/fields";
import { AlbumForm } from "../AlbumForm";

export default function NewAlbumPage() {
  return (
    <div>
      <AdminPageHeader title="New album" />
      <AlbumForm />
    </div>
  );
}
