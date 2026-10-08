"use client";

import { useEffect, useState } from "react";
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
  const [supabase] = useState(() => createClient());

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setLoading(true);
      setProfileError("");

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

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select(
          "id, full_name, phone, location, avatar_url, profile_completed"
        )
        .eq("id", currentUser.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("PROFILE LOAD ERROR:", error);

        setProfileError(
          "Unable to load your profile. Please try again."
        );

        setLoading(false);
        return;
      }

      /*
        A logged-in account that has not completed
        mandatory onboarding should not use Profile.
      */
      if (!profileData?.profile_completed) {
        router.replace("/create-profile");
        return;
      }

      setProfile(profileData);
      setLoading(false);
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [supabase, router]);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      setLogoutError(
        "Unable to log out. Please try again."
      );

      setLoggingOut(false);
    }
  }

  if (loading) {
    return (
      <main className="profile-page">
        <p className="profile-loading">
          Loading your profile...
        </p>
      </main>
    );
  }

  if (profileError) {
    return (
      <main className="profile-page">
        <div className="profile-error-state">
          <h2>Couldn't load profile</h2>

          <p>{profileError}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const fullName = profile?.full_name || "Bookora User";
  const email = user?.email || "";
  const phone = profile?.phone || "";
  const location = profile?.location || "";

  const initials = getInitials(fullName);

  return (
    <main className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <button
          type="button"
          className="profile-menu-btn"
        >
          <Menu size={28} />
        </button>

        <h1>Client Profile</h1>

        <button
          type="button"
          className="profile-notification"
        >
          <Bell size={24} />
          <span className="notification-dot"></span>
        </button>
      </header>

      {/* Profile Hero */}
      <section className="profile-hero">
        <div className="profile-picture-wrapper">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={`${fullName} profile`}
              className="profile-picture"
            />
          ) : (
            <div className="profile-picture profile-picture-placeholder">
              {initials}
            </div>
          )}

          <button
            type="button"
            className="camera-btn"
            aria-label="Edit profile photo"
            onClick={() => router.push("/edit-profile")}
          >
            <Camera size={19} />
          </button>
        </div>

        <h2>{fullName}</h2>
        <p>{email}</p>

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
          value={fullName}
          onClick={() => router.push("/edit-profile")}
        />

        <ProfileItem
          icon={<Mail size={22} />}
          title="Email Address"
          value={email}
        />

        <ProfileItem
          icon={<Phone size={22} />}
          title="Phone Number"
          value={phone}
          onClick={() => router.push("/edit-profile")}
        />

        <ProfileItem
          icon={<MapPin size={22} />}
          title="Location"
          value={location}
          onClick={() => router.push("/edit-profile")}
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
        <p
          role="alert"
          style={{
            color: "#c62828",
            textAlign: "center",
          }}
        >
          {logoutError}
        </p>
      )}

      <BottomNavigation />
    </main>
  );
}

function ProfileItem({
  icon,
  title,
  value,
  onClick,
}) {
  return (
    <button
      type="button"
      className="profile-item"
      onClick={onClick}
    >
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

function getInitials(name) {
  if (!name) return "BU";

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "BU";

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}