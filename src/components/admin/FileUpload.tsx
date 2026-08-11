"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { FileUp, X, FileText } from "lucide-react";

export function FileUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const result = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      onChange(result.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="mb-1 block text-sm font-semibold text-ink-soft">{label}</span>
      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-line bg-paper-raised px-4 py-3">
          <FileText size={20} className="text-lawn-deep" />
          <a href={value} target="_blank" rel="noopener noreferrer" className="flex-1 truncate text-sm font-semibold text-lawn-deep hover:underline">
            {value.split("/").pop()}
          </a>
          <button type="button" onClick={() => onChange("")} className="text-ink-faint hover:text-maroon" aria-label="Remove file">
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line px-4 py-4 text-sm font-semibold text-ink-faint hover:border-lawn hover:text-lawn-deep"
        >
          <FileUp size={18} /> {uploading ? "Uploading…" : "Upload a file"}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {error && <p className="mt-1 text-sm text-maroon">{error}</p>}
    </div>
  );
}
