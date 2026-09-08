"use client";

import { X } from "lucide-react";
import {
  Home,
  CalendarDays,
  Heart,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Sidebar({ onClose }) {
 const [hasBusiness, setHasBusiness] = useState(false);

 useEffect(() => {
  async function checkBusiness() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: business } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    setHasBusiness(!!business);
  }

  checkBusiness();
}, []);

  const router = useRouter();

  async function handleBusinessClick() {
    // Get the currently logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    // Check if this user already has a business
    const { data: business, error } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error(error);
      return;
    }

    onClose();

    if (business) {
      // User already has a business
      router.push("/dashboard");
    } else {
      // User doesn't have a business yet
      router.push("/create-business");
    }
  }

  return (
    <aside className="mobile-sidebar">

      {/* Sidebar Header */}
      <div className="sidebar-header">

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            B
          </div>

          <h2>Bookora</h2>

        </div>

        <button
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={23} />
        </button>

      </div>

      {/* Customer Profile */}
      <div className="sidebar-profile">

        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Profile"
          className="sidebar-profile-image"
        />

        <div className="sidebar-profile-info">

          <h3>Chisom</h3>

          <p>Customer</p>

        </div>

      </div>

      <nav className="sidebar-nav">

        <a
          href="/home"
          className="sidebar-nav-item active"
          onClick={onClose}
        >
          <Home size={20} />
          <span>Home</span>
        </a>

        <a
          href="/mybookings"
          className="sidebar-nav-item"
          onClick={onClose}
        >
          <CalendarDays size={20} />
          <span>My Bookings</span>
        </a>

        <a
          href="/favourites"
          className="sidebar-nav-item"
          onClick={onClose}
        >
          <Heart size={20} />
          <span>Favourites</span>
        </a>

        <a
          href="/profile"
          className="sidebar-nav-item"
          onClick={onClose}
        >
          <User size={20} />
          <span>Profile</span>
        </a>

      </nav>

      <div className="sidebar-bottom">

        <button
          className="visit-dashboard-btn"
          onClick={handleBusinessClick}
        >
          {hasBusiness ? "Visit Dashboard" : "Create Business"}
        </button>

      </div>

    </aside>
  );
}