"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cancelBooking } from "./actions";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  MoreVertical,
  MapPin,
  Clock,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import "./booking-details.css";

export default function BookingDetailsPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  const [supabase] = useState(() => createClient());

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchBooking() {
      setLoading(true);
      setError("");
      setBooking(null);

      if (!bookingId) {
        setError("No booking was selected.");
        setLoading(false);
        return;
      }

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (authError || !user) {
        setError("Please log in to view your booking.");
        setLoading(false);
        return;
      }

      const { data, error: bookingError } = await supabase
        .from("bookings")
        .select(`
          id,
          customer_id,
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
            logo_url
          ),
          services (
            name,
            duration,
            price
          )
        `)
        .eq("id", bookingId)
        .eq("customer_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (bookingError || !data) {
        setError("Booking not found.");
        setLoading(false);
        return;
      }

      setBooking(data);
      setLoading(false);
    }

    fetchBooking();

    return () => {
      cancelled = true;
    };
  }, [bookingId, supabase]);

  
  async function handleCancelBooking() {
  if (!booking || cancelling) return;

  const confirmed = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmed) return;

  setCancelling(true);
  setCancelError("");

  try {
    const result = await cancelBooking(booking.id);

    if (!result.success) {
      setCancelError(result.error || "Unable to cancel booking.");
      return;
    }

    // Update the details immediately without requiring a refresh.
    setBooking((previous) => ({
      ...previous,
      status: "cancelled",
    }));
  } catch (error) {
    console.error("CANCEL BOOKING ERROR:", error);
    setCancelError("Something went wrong. Please try again.");
  } finally {
    setCancelling(false);
  }
}

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

  if (loading) {
    return (
      <main className="booking-details-page">
        <p>Loading booking details...</p>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="booking-details-page">
        <Link href="/bookings" className="back-btn">
          <ArrowLeft size={22} />
        </Link>

        <p role="alert">{error || "Booking not found."}</p>
      </main>
    );
  }

  const business = booking.businesses;
  const service = booking.services;

  const statusLabels = {
    pending: "Booking Pending",
    confirmed: "Booking Confirmed",
    completed: "Booking Completed",
    cancelled: "Booking Cancelled",
    expired: "Booking Expired",
  };

  const statusDescriptions = {
    pending: "Waiting for the business to accept your booking.",
    confirmed: "Your booking has been accepted by the business.",
    completed: "This appointment has been marked as completed.",
    cancelled: "This booking has been cancelled.",
    expired: "The business did not confirm your booking before the appointment time.",
  };

  const location = [
    business?.location,
    business?.city,
    business?.state,
  ]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(", ");

  return (
    <main className="booking-details-page">

      {/* Header */}
      <header className="booking-details-header">

        <Link href="/customer-bookings" className="back-btn">
          <ArrowLeft size={22} />
        </Link>

        <h1>Booking Details</h1>

        <button className="more-btn" type="button">
          <MoreVertical size={22} />
        </button>

      </header>

      {/* Business */}
      <section className="booking-business">

        {business?.logo_url ? (
          <img
            src={business.logo_url}
            alt={business.name || "Business"}
          />
        ) : (
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#F1EDFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5427D8",
              fontWeight: 700,
              fontSize: "22px",
              flexShrink: 0,
            }}
          >
            {business?.name?.charAt(0)?.toUpperCase() || "B"}
          </div>
        )}

        <div>
          <h2>{business?.name || "Business"}</h2>
          <p>{business?.category || "Business"}</p>
        </div>

      </section>

      {/* Booking Status */}
      <section className="booking-confirmed">

        <div className="confirmed-icon">
          {booking.status === "confirmed" ||
booking.status === "completed"
  ? "✓"
  : booking.status === "cancelled"
  ? "×"
  : booking.status === "expired"
  ? "!"
  : "…"}
        </div>

        <div>
          <h3>
            {statusLabels[booking.status] || "Booking Status"}
          </h3>

          <p>
            {formatDate(booking.date)} • {formatTime(booking.time)}
          </p>

          <p style={{ marginTop: "6px" }}>
            {statusDescriptions[booking.status] ||
              "Contact the business for more information."}
          </p>
        </div>

      </section>

      {/* Location */}
      <div className="booking-location">

        <MapPin size={19} />

        <span>{location || "Location not provided"}</span>

      </div>

      {/* Service */}
      <section className="booking-service-card">

        <h3>{service?.name || "Service"}</h3>

        <div className="service-row">

          <span>
            <Clock size={16} />
            {service?.duration != null
              ? `${service.duration} mins`
              : "Duration unavailable"}
          </span>

          <strong>
            {service?.price != null
              ? `₦${Number(service.price).toLocaleString("en-NG")}`
              : "Price unavailable"}
          </strong>

        </div>

      </section>

      {/* Important Note */}
      <section className="important-note">

        <h3>Important Note</h3>

        <p>
          {booking.status === "pending"
  ? "Your booking request is awaiting confirmation from the business."
  : booking.status === "confirmed"
  ? "Your appointment is confirmed. Contact the business if you need to make changes."
  : booking.status === "completed"
  ? "This appointment has been marked as completed."
  : booking.status === "expired"
  ? "Your booking expired because it wasn't confirmed in time. Contact the business if you'd like to know why."
  : "This booking has been cancelled."}
        </p>

      </section>

      {/* Actions */}
      <div className="booking-actions">

        {business?.id && (
          <Link
            href={`/business-page?business_id=${business.id}`}
            className="view-business-btn"
          >
            View Business
          </Link>
        )}

        {/* We'll connect cancellation after implementing its server action. */}
       {["pending", "confirmed"].includes(booking.status) && (
  <button
    type="button"
    className="cancel-booking-btn"
    onClick={handleCancelBooking}
    disabled={cancelling}
  >
    {cancelling ? "Cancelling..." : "Cancel Booking"}
  </button>
)}

{cancelError && (
  <p role="alert" style={{ color: "#D32F2F" }}>
    {cancelError}
  </p>
)}

      </div>

    </main>
  );
}