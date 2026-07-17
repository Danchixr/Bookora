"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ImageUpload({
  name = "image_url",
  label = "Upload Image",
  defaultImage = "",
}) {
  const [preview, setPreview] = useState(defaultImage);
  const [imageUrl, setImageUrl] = useState(defaultImage || "");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const extension = file.name.split(".").pop();

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${extension}`;

    const { error } = await supabase.storage
      .from("service-images")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("service-images")
      .getPublicUrl(fileName);

    setImageUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="form-group">

      <label>{label}</label>

      <label
        className={
          name === "logo_url"
            ? "logo-upload"
            : "banner-upload"
        }
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
          />
        ) : (
          <span>
            {uploading ? "Uploading..." : "Tap to upload"}
          </span>
        )}

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleUpload}
        />
      </label>

      <input
        type="hidden"
        name={name}
        value={imageUrl}
        readOnly
      />

    </div>
  );
}