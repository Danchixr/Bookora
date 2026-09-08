"use client";

import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

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

const featuredBusinesses = [
  {
    id: 1,
    name: "Glow Spa",
    category: "Spa & Wellness",
    rating: "4.9",
    location: "Lekki",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Elite Hair Studio",
    category: "Beauty & Salon",
    rating: "4.8",
    location: "Victoria Island",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "FitZone",
    category: "Fitness",
    rating: "4.7",
    location: "Ikeja",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop",
  },
];



export default function HomePage() {
  const [notification, setNotification] = useState("");

const [user, setUser] = useState(null);

useEffect(() => {
  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  getUser();
}, []);

useEffect(() => {
  const businessCreated = sessionStorage.getItem("businessCreated");

  if (businessCreated) {
    setNotification("Business created successfully 🎉");
    sessionStorage.removeItem("businessCreated");

    setTimeout(() => {
      setNotification("");
    }, 3000);
  }
}, []);

  const [menuOpen, setMenuOpen] = useState(false);
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
    
    {user && <p>Logged in as: {user.email}</p>}

    {notification && (
  <div className="success-notification">
    {notification}
  </div>
)}
    
      <HomeHeader
        onMenuClick={() => setMenuOpen(prev => !prev)}
      />

      <Greeting />

      <CategoriesSection />

      {upcomingBookings.length > 0 && (
        <UpcomingBookings bookings={upcomingBookings} />
      )}

      <FeaturedBusinesses
        businesses={featuredBusinesses}
      />
    
    <RecentlyVisited />
    
    </main>
    <BottomNavigation />
  </>
);
}

