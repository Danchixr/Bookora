"use client";

import Link from "next/link";
import {
  ArrowLeft,
  MoreVertical,
  MapPin,
  Clock,
} from "lucide-react";

import "./booking-details.css";

export default function BookingDetailsPage() {
  const booking = {
    business: "Glow Spa",
    category: "Spa & Wellness",
    date: "Tomorrow",
    time: "2:30 PM",
    location: "Lekki Phase 1, Lagos",
    service: "Deep Tissue Massage",
    duration: "60 mins",
    price: "₦25,000",
  logo: "/logo.png",
  };

  return (
    <main className="booking-details-page">

      {/* Header */}
      <header className="booking-details-header">

        <Link href="/home" className="back-btn">
          <ArrowLeft size={22} />
        </Link>

        <h1>Booking Details</h1>

        <button className="more-btn">
          <MoreVertical size={22} />
        </button>

      </header>


      {/* Business */}
      <section className="booking-business">

        <img
          src={booking.logo}
          alt={booking.business}
        />

        <div>
          <h2>{booking.business}</h2>
          <p>{booking.category}</p>
        </div>

      </section>


      {/* Confirmation */}
      <section className="booking-confirmed">

        <div className="confirmed-icon">
          ✓
        </div>

        <div>
          <h3>Booking Confirmed</h3>

          <p>
            {booking.date} • {booking.time}
          </p>
        </div>

      </section>


      {/* Location */}
      <div className="booking-location">

        <MapPin size={19} />

        <span>{booking.location}</span>

      </div>


      {/* Service */}
      <section className="booking-service-card">

        <h3>{booking.service}</h3>

        <div className="service-row">

          <span>
            <Clock size={16} />
            {booking.duration}
          </span>

          <strong>{booking.price}</strong>

        </div>

      </section>


      {/* Important Note */}
      <section className="important-note">

        <h3>Important Note</h3>

        <p>
          Please arrive 10 mins before your appointment time.
        </p>

      </section>


      {/* Actions */}
      <div className="booking-actions">

        <Link
          href="/business/1"
          className="view-business-btn"
        >
          View Business
        </Link>

        <button className="cancel-booking-btn">
          Cancel Booking
        </button>

      </div>

    </main>
  );
}