"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { ImagePlus } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { GalleryPhoto } from "@/lib/types";

export function PhotoManager({ albumId, photos }: { albumId: string; photos: GalleryPhoto[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList) {
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await upload(file.name, file, { access: "public", handleUploadUrl: "/api/upload" });
      await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ album_id: albumId, image_url: result.url, sort_order: photos.length + i }),
      });
    }
    setUploading(false);
    router.refresh();
  }

  return (
    <div className="mt-10 max-w-4xl">
      <h2 className="mb-3 font-serif text-lg font-semibold text-ink">Photos ({photos.length})</h2>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="mb-4 flex items-center gap-2 rounded-lg border-2 border-dashed border-line px-4 py-3 text-sm font-semibold text-ink-faint hover:border-lawn hover:text-lawn-deep"
      >
        <ImagePlus size={18} /> {uploading ? "Uploading…" : "Add photos (select multiple)"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files);
        }}
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative overflow-hidden rounded-lg border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.image_url} alt={photo.caption ?? ""} className="aspect-square w-full object-cover" />
            <div className="absolute right-1 top-1 rounded-lg bg-paper-raised/90 shadow-sm">
              <DeleteButton endpoint={`/api/admin/photos/${photo.id}`} confirmLabel="Remove this photo?" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
