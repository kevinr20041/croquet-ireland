import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAlbumBySlug, getPhotosForAlbum } from "@/lib/queries";
import { Container, formatDate } from "@/components/site/ui";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PhotoGrid } from "./PhotoGrid";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);
  return { title: album?.title ?? "Album" };
}

export default async function AlbumPage({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);
  if (!album) notFound();
  const photos = await getPhotosForAlbum(album.id);

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Gallery", href: "/gallery" }, { label: album.title }]} />
      <h1 className="text-3xl font-semibold text-ink">{album.title}</h1>
      {album.album_date && <p className="mt-1 text-ink-soft">{formatDate(album.album_date)}</p>}

      {photos.length > 0 ? (
        <PhotoGrid photos={photos} />
      ) : (
        <p className="mt-8 text-ink-soft">No photos in this album yet.</p>
      )}
    </Container>
  );
}
