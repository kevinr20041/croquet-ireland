"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, TextArea, Checkbox, FormActions, PrimaryButton } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/slug";
import type { Club } from "@/lib/types";

const TYPE_OPTIONS = ["Association Croquet", "Golf Croquet"];

export function ClubForm({ club }: { club?: Club }) {
  const router = useRouter();
  const [name, setName] = useState(club?.name ?? "");
  const [slug, setSlug] = useState(club?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!club);
  const [county, setCounty] = useState(club?.county ?? "");
  const [address, setAddress] = useState(club?.address ?? "");
  const [phone, setPhone] = useState(club?.phone ?? "");
  const [email, setEmail] = useState(club?.email ?? "");
  const [contactPerson, setContactPerson] = useState(club?.contact_person ?? "");
  const [website, setWebsite] = useState(club?.website ?? "");
  const [facebookUrl, setFacebookUrl] = useState(club?.facebook_url ?? "");
  const [lawns, setLawns] = useState(club?.lawns ?? "");
  const [types, setTypes] = useState<string[]>(club?.croquet_types ?? []);
  const [beginnerFriendly, setBeginnerFriendly] = useState(club?.beginner_friendly ?? true);
  const [description, setDescription] = useState(club?.description ?? "");
  const [imageUrl, setImageUrl] = useState(club?.image_url ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function toggleType(t: string) {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      slug: slug || slugify(name),
      name,
      county: county || null,
      address: address || null,
      phone: phone || null,
      email: email || null,
      contact_person: contactPerson || null,
      website: website || null,
      facebook_url: facebookUrl || null,
      lawns: lawns || null,
      croquet_types: types,
      beginner_friendly: beginnerFriendly,
      description: description || null,
      image_url: imageUrl || null,
      featured: club?.featured ?? false,
    };
    const endpoint = club ? `/api/admin/clubs/${club.id}` : "/api/admin/clubs";
    const res = await fetch(endpoint, {
      method: club ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/admin/clubs");
      router.refresh();
    } else {
      setError("Could not save the club.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <Field label="Club name">
        <TextInput
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
        />
      </Field>
      <Field label="URL slug">
        <TextInput required value={slug} onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="County">
          <TextInput value={county} onChange={(e) => setCounty(e.target.value)} />
        </Field>
        <Field label="Address">
          <TextInput value={address} onChange={(e) => setAddress(e.target.value)} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Phone">
          <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <Field label="Email">
          <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
      </div>
      <Field label="Contact person">
        <TextInput value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Website">
          <TextInput value={website} onChange={(e) => setWebsite(e.target.value)} />
        </Field>
        <Field label="Facebook URL">
          <TextInput value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} />
        </Field>
      </div>
      <Field label="Facilities / lawns">
        <TextInput value={lawns} onChange={(e) => setLawns(e.target.value)} placeholder="e.g. 4 full-size lawns" />
      </Field>
      <div>
        <span className="mb-1 block text-sm font-semibold text-ink-soft">Croquet types offered</span>
        <div className="flex gap-4">
          {TYPE_OPTIONS.map((t) => (
            <Checkbox key={t} label={t} checked={types.includes(t)} onChange={() => toggleType(t)} />
          ))}
        </div>
      </div>
      <Checkbox label="Beginner-friendly" checked={beginnerFriendly} onChange={(e) => setBeginnerFriendly(e.target.checked)} />
      <Field label="Description">
        <TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      </Field>
      <ImageUpload label="Club photo" value={imageUrl} onChange={setImageUrl} />

      {error && <p className="text-sm font-semibold text-maroon">{error}</p>}
      <FormActions>
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : club ? "Save changes" : "Create club"}
        </PrimaryButton>
      </FormActions>
    </form>
  );
}
