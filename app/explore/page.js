
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  SlidersHorizontal,
  MapPin,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import BottomNavigation from "../home/components/BottomNavigation";

import "./explore.css";

export default function ExplorePage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [businesses, setBusinesses] = useState([]);
  const [services, setServices] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchExploreData() {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (authError || !user) {
        setBusinesses([]);
        setServices([]);
        setError("Please log in to explore businesses.");
        setLoading(false);
        return;
      }

      const [businessResult, serviceResult] = await Promise.all([
        supabase
          .from("businesses")
          .select(
            "id, user_id, name, category, location, city, state, logo_url, banner_url"
          )
          .not("user_id", "is", null)
          .order("name", { ascending: true }),

        supabase
          .from("services")
          .select("business_id, name"),
      ]);

      if (cancelled) return;

      if (businessResult.error || serviceResult.error) {
        console.error(
          "EXPLORE ERROR:",
          businessResult.error || serviceResult.error
        );

        setError("Unable to load businesses. Please try again.");
        setBusinesses([]);
        setServices([]);
      } else {
        setBusinesses(
          (businessResult.data || []).filter(
            (business) => business.user_id !== user.id
          )
        );

        setServices(serviceResult.data || []);
      }

      setLoading(false);
    }

    fetchExploreData();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        businesses
          .map((business) => business.category?.trim())
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories.sort()];
  }, [businesses]);

  const states = useMemo(() => {
    return [
      ...new Set(
        businesses
          .map((business) => business.state?.trim())
          .filter(Boolean)
      ),
    ].sort();
  }, [businesses]);

  const cities = useMemo(() => {
    return [
      ...new Set(
        businesses
          .filter(
            (business) =>
              !selectedState || business.state === selectedState
          )
          .map((business) => business.city?.trim())
          .filter(Boolean)
      ),
    ].sort();
  }, [businesses, selectedState]);

  const filteredBusinesses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return businesses.filter((business) => {
      const businessServices = services.filter(
        (service) => service.business_id === business.id
      );

      const matchesSearch =
        !query ||
        business.name?.toLowerCase().includes(query) ||
        business.category?.toLowerCase().includes(query) ||
        businessServices.some((service) =>
          service.name?.toLowerCase().includes(query)
        );

      const matchesCategory =
        selectedCategory === "All" ||
        business.category === selectedCategory;

      const matchesState =
        !selectedState || business.state === selectedState;

      const matchesCity =
        !selectedCity || business.city === selectedCity;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesState &&
        matchesCity
      );
    });
  }, [
    businesses,
    services,
    search,
    selectedCategory,
    selectedState,
    selectedCity,
  ]);

  function clearFilters() {
    setSearch("");
    setSelectedCategory("All");
    setSelectedState("");
    setSelectedCity("");
  }

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 6);

  return (
    <main className="explore-page">
      {/* Header */}
      <header className="explore-header">
        <button
          type="button"
          className="explore-menu-btn"
          aria-label="Menu"
        >
          <Menu size={28} />
        </button>

        <h1>Explore</h1>

        <button
          type="button"
          className="explore-notification-btn"
          aria-label="Notifications"
        >
          <Bell size={27} />
          <span className="notification-dot" />
        </button>
      </header>

      {/* Search */}
      <div className="explore-search-row">
        <div className="explore-search">
          <Search size={19} />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search businesses or services..."
            aria-label="Search businesses or services"
          />
        </div>

        <button
          type="button"
          className="explore-filter-btn"
          onClick={() => setShowFilters((previous) => !previous)}
          aria-expanded={showFilters}
        >
          <SlidersHorizontal size={20} />
          <span>Filters</span>
        </button>
      </div>

      {/* Location filters */}
      {showFilters && (
        <section className="explore-filter-panel">
          <div className="explore-filter-panel-header">
            <h2>Filter by location</h2>

            <button type="button" onClick={clearFilters}>
              Clear all
            </button>
          </div>

          <label className="explore-filter-label">
            State
            <select
              value={selectedState}
              onChange={(event) => {
                setSelectedState(event.target.value);
                setSelectedCity("");
              }}
            >
              <option value="">All states</option>

              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          <label className="explore-filter-label">
            City
            <select
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
            >
              <option value="">All cities</option>

              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="explore-apply-filters"
            onClick={() => setShowFilters(false)}
          >
            Show {filteredBusinesses.length}{" "}
            {filteredBusinesses.length === 1 ? "Business" : "Businesses"}
          </button>
        </section>
      )}

      {/* Categories */}
      <section className="explore-categories">
        <div className="explore-section-header">
          <h2>Categories</h2>

          {categories.length > 6 && (
            <button
              type="button"
              onClick={() =>
                setShowAllCategories((previous) => !previous)
              }
            >
              {showAllCategories ? "Show Less" : "View All"}
            </button>
          )}
        </div>

        <div className="explore-category-list">
          {visibleCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`explore-category ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Businesses */}
      <section className="explore-businesses">
        <div className="explore-section-header">
          <h2>Businesses</h2>

          {!loading && !error && (
            <span className="explore-results-count">
              {filteredBusinesses.length} found
            </span>
          )}
        </div>

        <div className="explore-business-list">
          {loading ? (
            <p className="explore-feedback">Loading businesses...</p>
          ) : error ? (
            <p className="explore-feedback" role="alert">
              {error}
            </p>
          ) : filteredBusinesses.length === 0 ? (
            <div className="explore-empty-state">
              <Search size={32} strokeWidth={1.6} />

              <h3>No businesses found</h3>

              <p>
                Try another search or change your filters.
              </p>

              <button type="button" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            filteredBusinesses.map((business) => {
              const image =
                business.banner_url || business.logo_url;

              const location = [
                business.city,
                business.state,
              ]
                .filter(Boolean)
                .join(", ");

              return (
                <button
                  key={business.id}
                  type="button"
                  className="explore-business-card"
                  onClick={() =>
                    router.push(
                      `/business-page?business_id=${business.id}`
                    )
                  }
                >
                  {image ? (
                    <img
                      src={image}
                      alt={business.name || "Business"}
                    />
                  ) : (
                    <div className="explore-business-image-placeholder">
                      {business.name?.charAt(0)?.toUpperCase() || "B"}
                    </div>
                  )}

                  <div className="explore-business-info">
                    <h3>{business.name}</h3>

                    <p>{business.category || "Business"}</p>

                    <div className="explore-business-meta">
                      <span>
                        <MapPin size={14} />
                        {location ||
                          business.location ||
                          "Location unavailable"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}