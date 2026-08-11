"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, Checkbox, FormActions, PrimaryButton } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/slug";
import type { GalleryAlbum } from "@/lib/types";

export function AlbumForm({ album }: { album?: GalleryAlbum }) {
  const router = useRouter();
  const [title, setTitle] = useState(album?.title ?? "");
  const [slug, setSlug] = useState(album?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!album);
  const [albumDate, setAlbumDate] = useState(album?.album_date?.slice(0, 10) ?? "");
  const [coverImage, setCoverImage] = useState(album?.cover_image_url ?? "");
  const [isHistorical, setIsHistorical] = useState(album?.is_historical ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      slug: slug || slugify(title),
      title,
      album_date: albumDate || null,
      cover_image_url: coverImage || null,
      is_historical: isHistorical,
    };
    const endpoint = album ? `/api/admin/albums/${album.id}` : "/api/admin/albums";
    const res = await fetch(endpoint, {
      method: album ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const saved = await res.json();
      if (album) {
        router.refresh();
      } else {
        router.push(`/admin/gallery/${saved.id}`);
      }
    } else {
      setError("Could not save the album.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <Field label="Album title">
        <TextInput
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
        />
      </Field>
      <Field label="URL slug">
        <TextInput required value={slug} onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }} />
      </Field>
      <Field label="Date">
        <TextInput type="date" value={albumDate} onChange={(e) => setAlbumDate(e.target.value)} />
      </Field>
      <ImageUpload label="Cover image" value={coverImage} onChange={setCoverImage} />
      <Checkbox label="Historical album" checked={isHistorical} onChange={(e) => setIsHistorical(e.target.checked)} />
      {error && <p className="text-sm font-semibold text-maroon">{error}</p>}
      <FormActions>
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : album ? "Save changes" : "Create album & add photos"}
        </PrimaryButton>
      </FormActions>
    </form>
  );
}
