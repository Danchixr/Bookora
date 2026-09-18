"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

import "./home.css";

import Sidebar from "./components/Sidebar";
import HomeHeader from "./components/HomeHeader";
import Greeting from "./components/Greeting";
import CategoriesSection from "./components/CategoriesSection";
import UpcomingBookings from "./components/UpcomingBookings";
import FeaturedBusinesses from "./components/FeaturedBusinesses";
import RecentlyVisited from "./components/RecentlyVisited";
import BottomNavigation from "./components/BottomNavigation";

const upcomingBookings = [
  {
    id: 1,
    business: "Glow Spa",
    service: "Deep Tissue Massage",
    date: "Tomorrow",
    time: "2:30 PM",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&auto=format&fit=crop",
  },
];

export default function HomePage() {
  const [supabase] = useState(() => createClient());

  const [notification, setNotification] = useState("");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
  const [businessesLoading, setBusinessesLoading] = useState(true);

  // Get logged-in user
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, [supabase]);

  // Show notification after creating a business
  useEffect(() => {
    const businessCreated = sessionStorage.getItem("businessCreated");

    if (businessCreated) {
      setNotification("Business created successfully 🎉");

      sessionStorage.removeItem("businessCreated");

      const timer = setTimeout(() => {
        setNotification("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Fetch real businesses from Supabase
  useEffect(() => {
    async function fetchBusinesses() {
      setBusinessesLoading(true);

      const { data, error } = await supabase
        .from("businesses")
        .select(`
          id,
          name,
          category,
          location,
          city,
          state,
          logo_url,
          banner_url
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("BUSINESSES FETCH ERROR:", error);

        setFeaturedBusinesses([]);
        setBusinessesLoading(false);

        return;
      }

      // Keep the image field expected by the existing business cards.
      const businesses = (data || []).map((business) => ({
        ...business,
        image: business.banner_url || business.logo_url || "",
      }));

      setFeaturedBusinesses(businesses);
      setBusinessesLoading(false);
    }

    fetchBusinesses();
  }, [supabase]);

  return (
    <>
      {menuOpen && (
        <>
          <div
            className="sidebar-overlay"
            onClick={() => setMenuOpen(false)}
          />

          <Sidebar
            onClose={() => setMenuOpen(false)}
          />
        </>
      )}

      <main className="home-page">
        {user && (
          <p>Logged in as: {user.email}</p>
        )}

        {notification && (
          <div className="success-notification">
            {notification}
          </div>
        )}

        <HomeHeader
          onMenuClick={() => setMenuOpen((prev) => !prev)}
        />

        <Greeting />

        <CategoriesSection />

        {upcomingBookings.length > 0 && (
          <UpcomingBookings bookings={upcomingBookings} />
        )}

        {businessesLoading ? (
          <p>Loading businesses...</p>
        ) : (
          <FeaturedBusinesses
            businesses={featuredBusinesses}
          />
        )}

        <RecentlyVisited />
      </main>

      <BottomNavigation />
    </>
  );
}