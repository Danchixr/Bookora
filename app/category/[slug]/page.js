import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { BUSINESS_CATEGORIES } from "@/lib/categories";

import "../../explore/explore.css";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const category = BUSINESS_CATEGORIES.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("businesses")
    .select(
      "id, user_id, name, category, location, city, state, logo_url, banner_url"
    )
    .eq("category", category.name)
    .order("name", { ascending: true });

  if (error) {
    console.error("CATEGORY BUSINESSES ERROR:", error);
  }

  const businesses = (data || []).filter(
    (business) => business.user_id !== user?.id
  );

  return (
    <main className="explore-page">

      <header className="explore-header">
        <Link
          href="/home"
          className="explore-menu-btn"
          aria-label="Back to home"
        >
          <ArrowLeft size={26} />
        </Link>

        <h1>{category.name}</h1>

        <div style={{ width: 44 }} />
      </header>

      <section className="explore-businesses">

        <div className="explore-section-header">
          <h2>Businesses</h2>

          {!error && (
            <span className="explore-results-count">
              {businesses.length} found
            </span>
          )}
        </div>

        <div className="explore-business-list">

          {error ? (
            <p className="explore-feedback">
              Unable to load businesses. Please try again.
            </p>
          ) : businesses.length === 0 ? (
            <div className="explore-empty-state">
              <h3>No businesses yet</h3>

              <p>
                There are currently no {category.name} businesses available.
              </p>
            </div>
          ) : (
            businesses.map((business) => {
              const image =
                business.banner_url || business.logo_url;

              const location = [
                business.city,
                business.state,
              ]
                .filter(Boolean)
                .join(", ");

              return (
                <Link
                  key={business.id}
                  href={`/business-page?business_id=${business.id}`}
                  className="explore-business-card"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={business.name || "Business"}
                    />
                  ) : (
                    <div className="explore-business-image-placeholder">
                      {business.name
                        ?.charAt(0)
                        ?.toUpperCase() || "B"}
                    </div>
                  )}

                  <div className="explore-business-info">
                    <h3>{business.name}</h3>

                    <p>
                      {business.category || "Business"}
                    </p>

                    <div className="explore-business-meta">
                      <span>
                        <MapPin size={14} />

                        {location ||
                          business.location ||
                          "Location unavailable"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}

        </div>

      </section>

    </main>
  );
}