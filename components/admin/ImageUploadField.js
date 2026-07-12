"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadMedia } from "@/lib/admin/upload";

export default function ImageUploadField({
  name,
  label = "Görsel",
  initialUrl = "",
  folder = "misc",
}) {
  const [url, setUrl] = useState(initialUrl || "");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError("");
    setIsUploading(true);
    const { url: publicUrl, error: uploadError } = await uploadMedia(file, folder);
    setIsUploading(false);

    if (uploadError) {
      setError(uploadError);
      return;
    }
    setUrl(publicUrl || "");
  }

  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
        {label}
      </label>
      <input type="hidden" name={name} value={url} readOnly />

      <div className="flex items-start gap-3">
        <div className="flex h-20 w-28 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#D6DFEC] bg-[#F2F4F9]">
          {url ? (
            <Image
              src={url}
              alt={label}
              width={112}
              height={80}
              className="h-full w-full object-cover"
              unoptimized
            />
          ) : (
            <span className="text-[11px] text-[#727F94]">Görsel yok</span>
          )}
        </div>

        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="block w-full text-[13px] text-[#465367] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e8eef8] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-[#042352] hover:file:bg-[#D6DFEC]"
          />
          <p className="mt-1 text-[11px] text-[#727F94]">
            Maks. 3MB · JPG, PNG, WEBP, GIF
          </p>
          {isUploading ? (
            <p className="mt-1 text-[12px] font-medium text-[#2B6FD6]">Yükleniyor...</p>
          ) : null}
          {error ? <p className="mt-1 text-[12px] font-medium text-red-600">{error}</p> : null}
          {url ? (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="mt-1 text-[12px] font-medium text-red-600 underline"
            >
              Görseli kaldır
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
