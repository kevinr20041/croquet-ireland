import Link from "next/link";
import { Plus } from "lucide-react";
import { sql } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDate } from "@/components/site/ui";
import type { GalleryAlbum } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const albums = (await sql`select * from gallery_albums order by album_date desc nulls last`) as unknown as GalleryAlbum[];

  return (
    <div>
      <AdminPageHeader
        title="Gallery"
        action={
          <Link href="/admin/gallery/new" className="flex items-center gap-1.5 rounded-lg bg-lawn px-4 py-2.5 text-sm font-semibold text-paper-raised hover:bg-lawn-deep">
            <Plus size={16} /> New album
          </Link>
        }
      />
      <div className="overflow-x-auto rounded-xl border border-line bg-paper-raised">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-tint text-left text-xs font-bold uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Album</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {albums.map((a) => (
              <tr key={a.id} className="border-b border-line-soft">
                <td className="px-4 py-3 font-medium text-ink">
                  <Link href={`/admin/gallery/${a.id}`} className="hover:underline">
                    {a.title}
                  </Link>
                  {a.is_historical && <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">Historical</span>}
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(a.album_date)}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteButton endpoint={`/api/admin/albums/${a.id}`} confirmLabel={`Delete "${a.title}"?`} />
                </td>
              </tr>
            ))}
            {albums.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-ink-faint">
                  No albums yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
