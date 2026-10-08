
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Heart, MapPin } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import BottomNavigation from "../home/components/BottomNavigation";

import "./favourites.css";

export default function FavouritesPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchFavourites() {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (authError || !user) {
        setFavourites([]);
        setError("Please log in to view your favourites.");
        setLoading(false);
        return;
      }

      const { data, error: favouritesError } = await supabase
        .from("favourites")
        .select(`
          id,
          business_id,
          businesses (
            id,
            name,
            category,
            location,
            city,
            state,
            logo_url,
            banner_url
          )
        `)
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (favouritesError) {
        console.error("FAVOURITES ERROR:", favouritesError);
        setError("Unable to load your favourites. Please try again.");
        setFavourites([]);
      } else {
        setFavourites(
          (data || []).filter((item) => item.businesses)
        );
      }

      setLoading(false);
    }

    fetchFavourites();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  async function removeFavourite(favouriteId) {
    if (removingId) return;

    setRemovingId(favouriteId);
    setError("");

    const { error: removeError } = await supabase
      .from("favourites")
      .delete()
      .eq("id", favouriteId);

    if (removeError) {
      console.error("REMOVE FAVOURITE ERROR:", removeError);
      setError("Unable to remove this favourite. Please try again.");
    } else {
      setFavourites((previous) =>
        previous.filter((item) => item.id !== favouriteId)
      );
    }

    setRemovingId(null);
  }

  return (
    <main className="favourites-page">
      {/* Header */}
      <header className="favourites-header">
        <h1>Favourites</h1>

        <button
          type="button"
          className="favourites-notification"
          aria-label="Notifications"
        >
          <Bell size={22} />
          <span className="notification-dot" />
        </button>
      </header>

      {/* Favourite Businesses */}
      <section className="favourites-list">
        {loading ? (
          <p className="favourites-feedback">
            Loading favourites...
          </p>
        ) : error && favourites.length === 0 ? (
          <p className="favourites-feedback" role="alert">
            {error}
          </p>
        ) : favourites.length === 0 ? (
          <div className="favourites-empty-state">
            <div className="favourites-empty-icon">
              <Heart size={36} strokeWidth={1.7} />
            </div>

            <h2>No favourites yet</h2>

            <p>
              Save businesses you love to find them easily
              whenever you need them.
            </p>

            <button
              type="button"
              className="favourites-explore-btn"
              onClick={() => router.push("/explore")}
            >
              Explore Businesses
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : (
          <>
            {error && (
              <p className="favourites-feedback" role="alert">
                {error}
              </p>
            )}

            {favourites.map((item) => {
              const business = item.businesses;

              const image =
                business.banner_url || business.logo_url;

              const location =
                [business.city, business.state]
                  .filter(Boolean)
                  .join(", ") ||
                business.location ||
                "Location unavailable";

              return (
                <div
                  className="favourite-card"
                  key={item.id}
                  role="link"
                  tabIndex={0}
                  onClick={() =>
                    router.push(
                      `/business-page?business_id=${business.id}`
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.target === event.currentTarget &&
                      (event.key === "Enter" ||
                        event.key === " ")
                    ) {
                      event.preventDefault();
                      router.push(
                        `/business-page?business_id=${business.id}`
                      );
                    }
                  }}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={business.name || "Business"}
                    />
                  ) : (
                    <div className="favourite-image-placeholder">
                      {business.name?.charAt(0)?.toUpperCase() ||
                        "B"}
                    </div>
                  )}

                  <div className="favourite-info">
                    <h2>{business.name}</h2>

                    <p>
                      {business.category || "Business"}
                    </p>

                    <div className="favourite-meta">
                      <span>
                        <MapPin size={13} />
                        {location}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="favourite-heart"
                    aria-label={`Remove ${business.name} from favourites`}
                    disabled={removingId === item.id}
                    onClick={(event) => {
                      event.stopPropagation();
                      removeFavourite(item.id);
                    }}
                  >
                    <Heart
                      size={20}
                      fill="currentColor"
                    />
                  </button>
                </div>
              );
            })}
          </>
        )}
      </section>

      <BottomNavigation />
    </main>
  );
}