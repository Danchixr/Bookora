"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, MapPin } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import "./create-profile.css";

export default function CreateProfilePage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [user, setUser] = useState(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [checkingProfile, setCheckingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function checkAccount() {
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
            "full_name, phone, location, profile_completed"
          )
          .eq("id", currentUser.id)
          .maybeSingle();

      if (cancelled) return;

      if (profileError) {
        console.error(
          "CREATE PROFILE CHECK ERROR:",
          profileError
        );

        setError(
          "Unable to check your profile. Please try again."
        );

        setCheckingProfile(false);
        return;
      }

      /*
        An already-onboarded customer should never be sent
        through Create Profile again.
      */
      if (profile?.profile_completed) {
        router.replace("/home");
        return;
      }

      /*
        If an unfinished profile row already exists,
        preserve anything the customer entered previously.
      */
      setFullName(
        profile?.full_name ||
          currentUser.user_metadata?.full_name ||
          currentUser.user_metadata?.name ||
          ""
      );

      setPhone(profile?.phone || "");
      setLocation(profile?.location || "");

      setCheckingProfile(false);
    }

    checkAccount();

    return () => {
      cancelled = true;
    };
  }, [supabase, router]);

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

    const { error: saveError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          full_name: cleanName,
          phone: cleanPhone,
          location: cleanLocation,
          profile_completed: true,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "id",
        }
      );

    if (saveError) {
      console.error(
        "CREATE PROFILE SAVE ERROR:",
        saveError
      );

      setError(
        "Unable to create your profile. Please try again."
      );

      setSaving(false);
      return;
    }

    router.replace("/home");
    router.refresh();
  }

  if (checkingProfile) {
    return (
      <main className="create-profile-page">
        <p className="create-profile-loading">
          Setting up your account...
        </p>
      </main>
    );
  }

  return (
    <main className="create-profile-page">
      <section className="create-profile-container">
        <div className="create-profile-heading">
          <div className="create-profile-icon">
            <User size={28} />
          </div>

          <h1>Create your profile</h1>

          <p>
            Tell us a little about yourself to finish setting
            up your Bookora account.
          </p>
        </div>

        <form
          className="create-profile-form"
          onSubmit={handleSubmit}
        >
          <label>
            Full Name

            <div className="create-profile-input">
              <User size={19} />

              <input
                type="text"
                value={fullName}
                onChange={(event) =>
                  setFullName(event.target.value)
                }
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>
          </label>

          <label>
            Phone Number

            <div className="create-profile-input">
              <Phone size={19} />

              <input
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="+234"
                autoComplete="tel"
                required
              />
            </div>
          </label>

          <label>
            Location

            <div className="create-profile-input">
              <MapPin size={19} />

              <input
                type="text"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                placeholder="e.g. Enugu, Enugu State"
                autoComplete="address-level2"
                required
              />
            </div>
          </label>

          {error && (
            <p
              className="create-profile-error"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="create-profile-submit"
            disabled={saving}
          >
            {saving
              ? "Creating Profile..."
              : "Complete Profile"}
          </button>

          <p className="create-profile-required">
            All fields are required to continue.
          </p>
        </form>
      </section>
    </main>
  );
}