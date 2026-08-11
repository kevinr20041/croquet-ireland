"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, TextArea, Select, FormActions, PrimaryButton } from "@/components/admin/fields";
import { FileUpload } from "@/components/admin/FileUpload";
import type { DocumentRow } from "@/lib/types";

const CATEGORIES = [
  { value: "rules", label: "Rules & tournament conditions" },
  { value: "governance", label: "Governance" },
  { value: "forms", label: "Forms & applications" },
  { value: "policies", label: "Policies" },
  { value: "general", label: "General" },
];

export function DocumentForm({ document: doc }: { document?: DocumentRow }) {
  const router = useRouter();
  const [title, setTitle] = useState(doc?.title ?? "");
  const [description, setDescription] = useState(doc?.description ?? "");
  const [category, setCategory] = useState(doc?.category ?? "general");
  const [fileUrl, setFileUrl] = useState(doc?.file_url ?? "");
  const [version, setVersion] = useState(doc?.version ?? "");
  const [docDate, setDocDate] = useState(doc?.doc_date?.slice(0, 10) ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = { title, description: description || null, category, file_url: fileUrl, version: version || null, doc_date: docDate || null };
    const endpoint = doc ? `/api/admin/documents/${doc.id}` : "/api/admin/documents";
    const res = await fetch(endpoint, {
      method: doc ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/admin/documents");
      router.refresh();
    } else {
      setError("Could not save the document. Make sure a file has been uploaded.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <Field label="Title">
        <TextInput required value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <Field label="Description">
        <TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
      </Field>
      <Field label="Category">
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
      </Field>
      <FileUpload label="File" value={fileUrl} onChange={setFileUrl} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Version">
          <TextInput value={version} onChange={(e) => setVersion(e.target.value)} />
        </Field>
        <Field label="Date">
          <TextInput type="date" value={docDate} onChange={(e) => setDocDate(e.target.value)} />
        </Field>
      </div>
      {error && <p className="text-sm font-semibold text-maroon">{error}</p>}
      <FormActions>
        <PrimaryButton type="submit" disabled={saving || !fileUrl}>
          {saving ? "Saving…" : doc ? "Save changes" : "Add document"}
        </PrimaryButton>
      </FormActions>
    </form>
  );
}
