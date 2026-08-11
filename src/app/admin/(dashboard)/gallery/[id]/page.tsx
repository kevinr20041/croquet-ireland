import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { AlbumForm } from "../AlbumForm";
import { PhotoManager } from "../PhotoManager";
import type { GalleryAlbum, GalleryPhoto } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditAlbumPage({ params }: PageProps<"/admin/gallery/[id]">) {
  const { id } = await params;
  const [albumRows, photos] = await Promise.all([
    sql`select * from gallery_albums where id = ${id} limit 1` as unknown as Promise<GalleryAlbum[]>,
    sql`select * from gallery_photos where album_id = ${id} order by sort_order asc` as unknown as Promise<GalleryPhoto[]>,
  ]);
  const album = albumRows[0];
  if (!album) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit album" />
      <AlbumForm album={album} />
      <PhotoManager albumId={album.id} photos={photos} />
    </div>
  );
}
