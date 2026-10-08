"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function FavouriteButton({
  businessId,
  initialIsFavourite,
  isLoggedIn,
  isOwnBusiness,
}) {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function toggleFavourite() {
    if (saving) return;

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (isOwnBusiness) return;

    setSaving(true);
    setError("");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setSaving(false);
      router.push("/login");
      return;
    }

    if (isFavourite) {
      const { error: removeError } = await supabase
        .from("favourites")
        .delete()
        .eq("customer_id", user.id)
        .eq("business_id", businessId);

      if (removeError) {
        console.error("REMOVE FAVOURITE ERROR:", removeError);
        setError("Couldn't remove favourite. Try again.");
      } else {
        setIsFavourite(false);
      }
    } else {
      const { error: addError } = await supabase
        .from("favourites")
        .insert({
          customer_id: user.id,
          business_id: businessId,
        });

      if (addError) {
        console.error("ADD FAVOURITE ERROR:", addError);
        setError("Couldn't save favourite. Try again.");
      } else {
        setIsFavourite(true);
      }
    }

    setSaving(false);
  }

  return (
    <>
      <button
        type="button"
        className="header-btn"
        onClick={toggleFavourite}
        disabled={saving || isOwnBusiness}
        aria-label={
          isOwnBusiness
            ? "You cannot favourite your own business"
            : isFavourite
            ? "Remove from favourites"
            : "Add to favourites"
        }
        aria-pressed={isFavourite}
        title={
          isOwnBusiness
            ? "You cannot favourite your own business"
            : undefined
        }
      >
        <Heart
  size={20}
  fill={isFavourite ? "#ef4444" : "none"}
  color={isFavourite ? "#ef4444" : "currentColor"}
/>
      </button>

      {error && (
        <span role="alert" className="favourite-button-error">
          {error}
        </span>
      )}
    </>
  );
}