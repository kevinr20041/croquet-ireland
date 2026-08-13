"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Share2 } from "lucide-react";
import { Field, TextInput, TextArea, Select, FormActions, PrimaryButton } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/slug";
import type { Article } from "@/lib/types";

const CATEGORIES = [
  { value: "news", label: "News" },
  { value: "tournament-report", label: "Tournament report" },
  { value: "international", label: "International" },
  { value: "club-news", label: "Club news" },
  { value: "announcement", label: "Announcement" },
];

export function ArticleForm({ article }: { article?: Article }) {
  const router = useRouter();
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!article);
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [body, setBody] = useState(article?.body ?? "");
  const [featuredImage, setFeaturedImage] = useState(article?.featured_image_url ?? "");
  const [category, setCategory] = useState(article?.category ?? "news");
  const [author, setAuthor] = useState(article?.author ?? "");
  const [tags, setTags] = useState(article?.tags?.join(", ") ?? "");
  const [status, setStatus] = useState(article?.status ?? "draft");
  const [socialCaption, setSocialCaption] = useState(article?.social_caption ?? "");
  const [shareFacebook, setShareFacebook] = useState(true);
  const [shareInstagram, setShareInstagram] = useState(true);
  const [shareX, setShareX] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      slug: slug || slugify(title),
      title,
      excerpt: excerpt || null,
      body,
      featured_image_url: featuredImage || null,
      category,
      author: author || null,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      social_caption: socialCaption || null,
      social_image_url: featuredImage || null,
      status,
      published_at: article?.published_at ?? null,
    };

    const endpoint = article ? `/api/admin/articles/${article.id}` : "/api/admin/articles";
    const method = article ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/articles");
      router.refresh();
    } else {
      setError("Could not save the article. Check the required fields.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <Field label="Title">
        <TextInput
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
        />
      </Field>
      <Field label="URL slug" hint="Used in the article's web address">
        <TextInput
          required
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
        />
      </Field>
      <Field label="Excerpt" hint="Short summary shown on news cards">
        <TextArea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
      </Field>
      <Field label="Article body">
        <TextArea required value={body} onChange={(e) => setBody(e.target.value)} rows={12} />
      </Field>
      <ImageUpload label="Featured image" value={featuredImage} onChange={setFeaturedImage} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Category">
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Author">
          <TextInput value={author} onChange={(e) => setAuthor(e.target.value)} />
        </Field>
      </div>
      <Field label="Tags" hint="Comma-separated">
        <TextInput value={tags} onChange={(e) => setTags(e.target.value)} />
      </Field>
      <Field label="Status">
        <Select value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </Select>
      </Field>

      <div className="rounded-xl border border-line bg-paper-tint p-5">
        <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink">
          <Share2 size={18} /> Share to social
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Pre-filled from the title, excerpt and featured image above. Edit the caption if you want something
          different on social media.
        </p>
        <div className="mt-3 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <input type="checkbox" checked={shareFacebook} onChange={(e) => setShareFacebook(e.target.checked)} className="h-5 w-5 rounded border-line" />
            Facebook
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <input type="checkbox" checked={shareInstagram} onChange={(e) => setShareInstagram(e.target.checked)} className="h-5 w-5 rounded border-line" />
            Instagram
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <input type="checkbox" checked={shareX} onChange={(e) => setShareX(e.target.checked)} className="h-5 w-5 rounded border-line" />
            X (posted manually until connected)
          </label>
        </div>
        <div className="mt-3">
          <TextArea
            value={socialCaption || excerpt}
            onChange={(e) => setSocialCaption(e.target.value)}
            rows={3}
            placeholder="Social caption"
          />
        </div>
        <p className="mt-2 text-xs text-ink-faint">
          Facebook and Instagram accounts are not connected yet. Once linked in Settings, publishing here will
          post automatically. For now this caption is saved with the article so it is ready to copy across.
        </p>
      </div>

      {error && <p className="text-sm font-semibold text-maroon">{error}</p>}
      <FormActions>
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : article ? "Save changes" : "Create article"}
        </PrimaryButton>
      </FormActions>
    </form>
  );
}
