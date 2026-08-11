import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAlbumBySlug, getPhotosForAlbum } from "@/lib/queries";
import { Container, formatDate } from "@/components/site/ui";

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
      <Link href="/gallery" className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-lawn-deep hover:underline">
        <ArrowLeft size={16} /> Back to gallery
      </Link>
      <h1 className="text-3xl font-semibold text-ink">{album.title}</h1>
      {album.album_date && <p className="mt-1 text-ink-soft">{formatDate(album.album_date)}</p>}

      {photos.length > 0 ? (
        <div className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {photos.map((photo) => (
            <figure key={photo.id} className="overflow-hidden rounded-xl border border-line bg-paper-raised">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.image_url} alt={photo.caption ?? ""} className="w-full" />
              {photo.caption && <figcaption className="p-2 text-xs text-ink-soft">{photo.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-ink-soft">No photos in this album yet.</p>
      )}
    </Container>
  );
}
