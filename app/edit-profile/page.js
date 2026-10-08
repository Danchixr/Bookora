"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  Camera,
  User,
  Phone,
  MapPin,
} from "lucide-react";

import "./edit-profile.css";

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [supabase] = useState(() => createClient());

  const [user, setUser] = useState(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (authError || !currentUser) {
        router.replace("/login");
        return;
      }

      setUser(currentUser);

      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select(
            "full_name, phone, location, avatar_url, profile_completed"
          )
          .eq("id", currentUser.id)
          .maybeSingle();

      if (cancelled) return;

      if (profileError) {
        console.error("EDIT PROFILE LOAD ERROR:", profileError);
        setError("Unable to load your profile.");
        setLoading(false);
        return;
      }

      if (!profile?.profile_completed) {
        router.replace("/create-profile");
        return;
      }

      setFullName(profile.full_name || "");
      setPhone(profile.phone || "");
      setLocation(profile.location || "");
      setCurrentAvatar(profile.avatar_url || "");

      setLoading(false);
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Profile photo must be 5MB or smaller.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving || !user) return;

    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanLocation = location.trim();

    if (!cleanName || !cleanPhone || !cleanLocation) {
      setError("Please complete all required fields.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      let avatarUrl = currentAvatar;

      if (selectedFile) {
  const extension =
    selectedFile.name.split(".").pop()?.toLowerCase() || "jpg";

  // Find any existing avatar belonging to this user.
  const { data: existingFiles, error: listError } =
    await supabase.storage
      .from("avatars")
      .list(user.id);

  if (listError) {
    throw listError;
  }

  // Remove previous avatar files before uploading the new one.
  if (existingFiles?.length > 0) {
    const filesToRemove = existingFiles.map(
      (file) => `${user.id}/${file.name}`
    );

    const { error: removeError } = await supabase.storage
      .from("avatars")
      .remove(filesToRemove);

    if (removeError) {
      throw removeError;
    }
  }

  const filePath = `${user.id}/profile.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, selectedFile, {
      cacheControl: "3600",
      upsert: false,
      contentType: selectedFile.type,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  avatarUrl = `${publicUrlData.publicUrl}?v=${Date.now()}`;
}

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: cleanName,
          phone: cleanPhone,
          location: cleanLocation,
          avatar_url: avatarUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      router.replace("/profile");
      router.refresh();
    } catch (saveError) {
      console.error("EDIT PROFILE SAVE ERROR:", saveError);

      setError(
        saveError?.message ||
          "Unable to save your changes. Please try again."
      );

      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="edit-profile-page">
        <p className="edit-profile-loading">
          Loading your profile...
        </p>
      </main>
    );
  }

  const displayedAvatar = previewUrl || currentAvatar;
  const initials = getInitials(fullName);

  return (
    <main className="edit-profile-page">
      <div className="edit-profile-container">
        <header className="edit-profile-header">
          <button
            type="button"
            className="edit-profile-back"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ArrowLeft size={23} />
          </button>

          <h1>Edit Profile</h1>

          <div className="edit-profile-header-space" />
        </header>

        <form onSubmit={handleSubmit}>
          <section className="edit-avatar-section">
            <div className="edit-avatar-wrapper">
              {displayedAvatar ? (
                <img
                  src={displayedAvatar}
                  alt="Profile"
                  className="edit-avatar"
                />
              ) : (
                <div className="edit-avatar edit-avatar-placeholder">
                  {initials}
                </div>
              )}

              <button
                type="button"
                className="edit-avatar-button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change profile photo"
              >
                <Camera size={18} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
                hidden
              />
            </div>

            <button
              type="button"
              className="change-photo-button"
              onClick={() => fileInputRef.current?.click()}
            >
              Change profile photo
            </button>

            <span>JPG, PNG or WEBP. Maximum 5MB.</span>
          </section>

          <section className="edit-profile-card">
            <label>
              Full Name

              <div className="edit-profile-input">
                <User size={19} />

                <input
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  autoComplete="name"
                  required
                />
              </div>
            </label>

            <label>
              Phone Number

              <div className="edit-profile-input">
                <Phone size={19} />

                <input
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  autoComplete="tel"
                  required
                />
              </div>
            </label>

            <label>
              Location

              <div className="edit-profile-input">
                <MapPin size={19} />

                <input
                  type="text"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  autoComplete="address-level2"
                  required
                />
              </div>
            </label>

            {error && (
              <p className="edit-profile-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="save-profile-button"
              disabled={saving}
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </section>
        </form>
      </div>
    </main>
  );
}

function getInitials(name) {
  if (!name) return "BU";

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "BU";

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}