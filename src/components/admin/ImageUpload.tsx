"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { ImagePlus, X } from "lucide-react";

export function ImageUpload({
  label,
  value,
  onChange,
  accept = "image/*",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
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
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-32 w-32 rounded-lg border border-line object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-maroon text-paper-raised"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-32 w-32 flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-line text-ink-faint hover:border-lawn hover:text-lawn-deep"
        >
          <ImagePlus size={22} />
          <span className="text-xs font-semibold">{uploading ? "Uploading…" : "Upload"}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
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
