"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import {
  Bell,
  Menu,
  Camera,
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";

import BottomNavigation from "../home/components/BottomNavigation";

import "./profile.css";

export default function ProfilePage() {
  const router = useRouter();

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      // Replace the current page so Back doesn't return to Profile.
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
      setLogoutError("Unable to log out. Please try again.");
      setLoggingOut(false);
    }
  }

  return (
    <main className="profile-page">

      {/* Header */}
      <header className="profile-header">

        <button className="profile-menu-btn">
          <Menu size={28} />
        </button>

        <h1>Client Profile</h1>

        <button className="profile-notification">
          <Bell size={24} />

          <span className="notification-dot"></span>
        </button>

      </header>


      {/* Profile Hero */}
      <section className="profile-hero">

        <div className="profile-picture-wrapper">

          <img
            src="https://i.pravatar.cc/300?img=32"
            alt="Profile"
            className="profile-picture"
          />

          <button className="camera-btn">
            <Camera size={19} />
          </button>

        </div>


        <h2>Amara Chisom</h2>

        <p>amara.chisom@email.com</p>


        {/* Business Dashboard */}
        <button
            type="button"
            className="business-dashboard-card"
            onClick={() => router.push("/dashboard")}
           >

          <div className="business-dashboard-icon">
            <Store size={23} />
          </div>

          <div className="business-dashboard-text">

            <strong>Business Dashboard</strong>

            <span>
              Manage your business, services and bookings
            </span>

          </div>

          <ChevronRight size={22} />

        </button>

      </section>


      {/* Personal Information */}
      <section className="profile-card">

        <ProfileItem
          icon={<User size={22} />}
          title="Full Name"
          value="Amara Chisom"
        />

        <ProfileItem
          icon={<Mail size={22} />}
          title="Email Address"
          value="amara.chisom@email.com"
        />

        <ProfileItem
          icon={<Phone size={22} />}
          title="Phone Number"
          value="+234 816 123 4567"
        />

        <ProfileItem
          icon={<MapPin size={22} />}
          title="Location"
          value="Lekki, Lagos"
        />

      </section>


      {/* Account */}
      <section className="profile-card">

        <ProfileItem
          icon={<Lock size={22} />}
          title="Password"
          value="*********"
        />

        <ProfileItem
          icon={<Bell size={22} />}
          title="Notifications"
          value="Manage your notification preferences"
        />

        <ProfileItem
          icon={<Shield size={22} />}
          title="Privacy"
          value="Manage your privacy and data"
        />

        <ProfileItem
          icon={<HelpCircle size={22} />}
          title="Help & Support"
          value="Get help and contact support"
        />

      </section>


    {/* Logout */}
<button
  type="button"
  className="logout-btn"
  onClick={handleLogout}
  disabled={loggingOut}
>
  <LogOut size={20} />

  <span>
    {loggingOut ? "Logging out..." : "Log Out"}
  </span>
</button>

{logoutError && (
  <p role="alert" style={{ color: "#c62828", textAlign: "center" }}>
    {logoutError}
  </p>
)}


      <BottomNavigation />

    </main>
  );
}


function ProfileItem({ icon, title, value }) {
  return (
    <button className="profile-item">

      <div className="profile-item-icon">
        {icon}
      </div>

      <div className="profile-item-content">

        <span className="profile-item-title">
          {title}
        </span>

        <strong className="profile-item-value">
          {value}
        </strong>

      </div>

      <ChevronRight
        size={21}
        className="profile-item-arrow"
      />

    </button>
  );
}