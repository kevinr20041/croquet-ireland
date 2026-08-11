import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, formatDate } from "@/components/site/ui";
import { getAllAlbums } from "@/lib/queries";

export const metadata: Metadata = { title: "Gallery" };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const albums = await getAllAlbums();
  const current = albums.filter((a) => !a.is_historical);
  const historical = albums.filter((a) => a.is_historical);

  return (
    <>
      <PageHero eyebrow="Gallery" title="Photo albums" description="From this season's championships to a historical collection from around 1900." />
      <Container className="py-14">
        {current.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {current.map((album) => (
              <Link key={album.id} href={`/gallery/${album.slug}`} className="group overflow-hidden rounded-xl border border-line bg-paper-raised">
                <div className="aspect-[4/3] w-full overflow-hidden bg-paper-tint">
                  {album.cover_image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={album.cover_image_url} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  )}
                </div>
                <p className="p-3 text-sm font-semibold text-ink">{album.title}</p>
                <p className="px-3 pb-3 text-xs text-ink-faint">{formatDate(album.album_date)}</p>
              </Link>
            ))}
          </div>
        )}
        {current.length === 0 && <p className="text-ink-soft">No albums yet.</p>}

        {historical.length > 0 && (
          <>
            <h2 className="mb-5 mt-14 text-xl font-semibold text-ink">Historical photographs</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {historical.map((album) => (
                <Link key={album.id} href={`/gallery/${album.slug}`} className="group overflow-hidden rounded-xl border border-line bg-paper-raised">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-paper-tint">
                    {album.cover_image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={album.cover_image_url} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    )}
                  </div>
                  <p className="p-3 text-sm font-semibold text-ink">{album.title}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
