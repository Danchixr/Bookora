"use client";

import Link from "next/link";
import { CalendarX2 } from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CalendarDays, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

import BottomNavigation from "../home/components/BottomNavigation";

import "./bookings.css";

const tabs = ["Upcoming", "Completed", "Cancelled", "Expired"];

export default function CustomerBookingsPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [activeTab, setActiveTab] = useState("Upcoming");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchBookings() {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (authError || !user) {
        setBookings([]);
        setError("Please log in to view your bookings.");
        setLoading(false);
        return;
      }

      const { data, error: bookingsError } = await supabase
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
        .eq("customer_id", user.id)
        .order("date", { ascending: false })
        .order("time", { ascending: false });

      if (cancelled) return;

      if (bookingsError) {
        console.error("CUSTOMER BOOKINGS ERROR:", bookingsError);
        setBookings([]);
        setError("Unable to load your bookings. Please try again.");
      } else {
        setBookings(data || []);
      }

      setLoading(false);
    }

    fetchBookings();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const now = new Date();

  const currentBookings = bookings
    .filter((booking) => {
      const appointment = new Date(
        `${booking.date}T${booking.time}`
      );

      if (activeTab === "Upcoming") {
        return (
          ["pending", "confirmed"].includes(booking.status) &&
          appointment > now
        );
      }

      if (activeTab === "Completed") {
  return booking.status === "completed";
}

if (activeTab === "Cancelled") {
  return booking.status === "cancelled";
}

if (activeTab === "Expired") {
  return booking.status === "expired";
}

return false;
    })
    .sort((a, b) => {
      const first = new Date(`${a.date}T${a.time}`).getTime();
      const second = new Date(`${b.date}T${b.time}`).getTime();

      return activeTab === "Upcoming"
        ? first - second
        : second - first;
    });

  function formatDate(date) {
    return new Date(`${date}T12:00:00`).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  }

  function formatTime(time) {
    return new Date(
      `2000-01-01T${time}`
    ).toLocaleTimeString("en-NG", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <main className="customer-bookings-page">

      {/* Header */}
      <header className="bookings-header">
        <h1>My Bookings</h1>

        <button className="bookings-notification">
          <Bell size={22} />
          <span className="notification-dot"></span>
        </button>
      </header>

      {/* Tabs */}
      <div className="booking-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`booking-tab ${
              activeTab === tab ? "active" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings */}
      <section className="bookings-list">

        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p role="alert">{error}</p>
       ) : currentBookings.length === 0 ? (
  <div className="bookings-empty-state">

    <div className="bookings-empty-icon">
      <CalendarX2 size={36} strokeWidth={1.7} />
    </div>

    <h2>
      {activeTab === "Upcoming"
    ? "No upcoming bookings"
    : activeTab === "Completed"
    ? "No completed bookings yet"
    : activeTab === "Cancelled"
    ? "No cancelled bookings"
    : "No expired bookings"}
    </h2>

    <p>
  {activeTab === "Upcoming"
    ? "Your upcoming appointments will appear here once you book a service."
    : activeTab === "Completed"
    ? "Your completed appointments will appear here after your visits."
    : activeTab === "Cancelled"
    ? "Any bookings that are cancelled will appear here."
    : "Booking requests that weren't accepted before their appointment time will appear here."}
</p>

    {activeTab === "Upcoming" && (
      <Link href="/explore" className="bookings-explore-btn">
        Explore Businesses
        <span aria-hidden="true">→</span>
      </Link>
    )}

  </div>
) : (
          currentBookings.map((booking) => (
            <button
              key={booking.id}
              type="button"
              className="booking-card"
              onClick={() =>
                router.push(`/booking-details?id=${booking.id}`)
              }
            >
              {booking.businesses?.banner_url ||
              booking.businesses?.logo_url ? (
                <img
                  src={
                    booking.businesses.banner_url ||
                    booking.businesses.logo_url
                  }
                  alt={booking.businesses?.name || "Business"}
                  className="booking-image"
                />
              ) : (
                <div
                  className="booking-image"
                  style={{
                    background: "#F1EDFF",
                    flexShrink: 0,
                  }}
                />
              )}

              <div className="booking-info">
                <h2>
                  {booking.businesses?.name || "Business"}
                </h2>

                <p className="booking-service">
                  {booking.services?.name || "Service"}
                </p>

                <div className="booking-details">
                  <span>
                    <CalendarDays size={15} />
                    {formatDate(booking.date)}
                  </span>

                  <span>
                    <Clock size={15} />
                    {formatTime(booking.time)}
                  </span>
                </div>

                <span
                  style={{
                    display: "inline-block",
                    marginTop: "8px",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "capitalize",
                   color:
                     booking.status === "confirmed"
                      ? "#16803C"
                      : booking.status === "pending"
                      ? "#B7791F"
                      : booking.status === "cancelled"
                      ? "#D32F2F"
                      : booking.status === "expired"
                      ? "#6B7280"
                      : "#5427D8",
                     }}
                >
                  {booking.status}
                </span>
              </div>
            </button>
          ))
        )}

      </section>

      <BottomNavigation />
    </main>
  );
}