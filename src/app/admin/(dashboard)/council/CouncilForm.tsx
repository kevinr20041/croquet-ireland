"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, FormActions, PrimaryButton } from "@/components/admin/fields";
import type { CouncilMember } from "@/lib/types";

export function CouncilForm({ member }: { member?: CouncilMember }) {
  const router = useRouter();
  const [name, setName] = useState(member?.name ?? "");
  const [role, setRole] = useState(member?.role ?? "");
  const [email, setEmail] = useState(member?.email ?? "");
  const [sortOrder, setSortOrder] = useState(member?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = { name, role, email: email || null, sort_order: sortOrder };
    const endpoint = member ? `/api/admin/council/${member.id}` : "/api/admin/council";
    const res = await fetch(endpoint, {
      method: member ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/admin/council");
      router.refresh();
    } else {
      setError("Could not save.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-5">
      <Field label="Name">
        <TextInput required value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Role">
        <TextInput required value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Honorary Secretary" />
      </Field>
      <Field label="Email">
        <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Field label="Display order" hint="Lower numbers appear first">
        <TextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
      </Field>
      {error && <p className="text-sm font-semibold text-maroon">{error}</p>}
      <FormActions>
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : member ? "Save changes" : "Add member"}
        </PrimaryButton>
      </FormActions>
    </form>
  );
}
