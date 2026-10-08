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



export default function HomePage() {
  const [supabase] = useState(() => createClient());

  const [notification, setNotification] = useState("");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
  const [businessesLoading, setBusinessesLoading] = useState(true);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentlyVisited, setRecentlyVisited] = useState([]);

  // Fetch the authenticated user first, then load businesses.
  useEffect(() => {
    let cancelled = false;

    async function loadHomeData() {
      setBusinessesLoading(true);

      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (authError) {
        console.error("AUTH ERROR:", authError);
        setUser(null);
        setFeaturedBusinesses([]);
        setBusinessesLoading(false);
        return;
      }

      setUser(currentUser);

      // Only fetch businesses with a linked owner ID.
      const { data, error } = await supabase
        .from("businesses")
        .select(`
          id,
          user_id,
          name,
          category,
          location,
          city,
          state,
          logo_url,
          banner_url
        `)
        .not("user_id", "is", null)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) {
        console.error("BUSINESSES FETCH ERROR:", error);
        setFeaturedBusinesses([]);
        setBusinessesLoading(false);
        return;
      }

      // Hide the logged-in user's own business.
      const businesses = (data || [])
        .filter(
          (business) =>
            !currentUser || business.user_id !== currentUser.id
        )
        .map((business) => ({
          ...business,
          image: business.banner_url || business.logo_url || "",
        }));

      setFeaturedBusinesses(businesses);
      setBusinessesLoading(false);
    }

    loadHomeData();

    return () => {
      cancelled = true;
    };
  }, [supabase]);



  useEffect(() => {
  let cancelled = false;

  async function fetchUpcomingBookings() {
    const {
      data: { user: currentUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (cancelled) return;

    if (authError || !currentUser) {
      setUpcomingBookings([]);
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        date,
        time,
        status,
        businesses (
          name,
          logo_url,
          banner_url
        ),
        services (
          name
        )
      `)
      .eq("customer_id", currentUser.id)
      .eq("status", "confirmed")
      .gte("date", new Date().toISOString().slice(0, 10))
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (cancelled) return;

    if (error) {
      console.error("UPCOMING BOOKINGS FETCH ERROR:", error);
      setUpcomingBookings([]);
      return;
    }

    const now = new Date();

    const upcoming = (data || [])
      .filter((booking) => {
        const [year, month, day] = booking.date.split("-").map(Number);
        const [hour, minute] = booking.time.split(":").map(Number);

        const appointment = new Date(
          year,
          month - 1,
          day,
          hour,
          minute
        );

        return appointment > now;
      })
      .map((booking) => ({
        id: booking.id,
        business: booking.businesses?.name || "Business",
        service: booking.services?.name || "Service",
        date: new Date(`${booking.date}T12:00:00`).toLocaleDateString(
          "en-NG",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        ),
        time: new Date(
          `2000-01-01T${booking.time}`
        ).toLocaleTimeString("en-NG", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        image:
          booking.businesses?.banner_url ||
          booking.businesses?.logo_url ||
          "",
      }));

    setUpcomingBookings(upcoming);
  }

  fetchUpcomingBookings();

  return () => {
    cancelled = true;
  };
}, [supabase]);
      
  useEffect(() => {
  let cancelled = false;

  async function fetchRecentlyVisited() {
    const {
      data: { user: currentUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (cancelled) return;

    if (authError || !currentUser) {
      setRecentlyVisited([]);
      return;
    }

    /*
      Only completed bookings count as visits.

      Newest appointments come first so if the customer
      visited the same business several times, the most
      recent visit determines its position.
    */
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        business_id,
        date,
        time,
        status,
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
      .eq("customer_id", currentUser.id)
      .eq("status", "completed")
      .order("date", { ascending: false })
      .order("time", { ascending: false });

    if (cancelled) return;

    if (error) {
      console.error(
        "RECENTLY VISITED FETCH ERROR:",
        error
      );

      setRecentlyVisited([]);
      return;
    }

    /*
      Remove duplicate businesses.

      Because the query is already newest-first,
      the first occurrence is the customer's
      most recent visit to that business.
    */
    const uniqueBusinesses = new Map();

    for (const booking of data || []) {
      const business = booking.businesses;

      if (!business?.id) continue;

      if (!uniqueBusinesses.has(business.id)) {
        uniqueBusinesses.set(business.id, {
          id: business.id,
          name: business.name || "Business",
          category: business.category || "",
          location:
            business.location ||
            [business.city, business.state]
              .filter(Boolean)
              .join(", "),
          image:
            business.banner_url ||
            "",
        });
      }
    }

    setRecentlyVisited(
      Array.from(uniqueBusinesses.values()).slice(0, 6)
    );
  }

  fetchRecentlyVisited();

  return () => {
    cancelled = true;
  };
}, [supabase]);

  

  // Show notification after creating a business.
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

  return (
    <>
      {menuOpen && (
        <>
          <div
            className="sidebar-overlay"
            onClick={() => setMenuOpen(false)}
          />

          <Sidebar onClose={() => setMenuOpen(false)} />
        </>
      )}

      <main className="home-page">
        {user && <p>Logged in as: {user.email}</p>}

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
          <FeaturedBusinesses businesses={featuredBusinesses} />
        )}

        <RecentlyVisited businesses={recentlyVisited} />
      </main>

      <BottomNavigation />
    </>
  );
}