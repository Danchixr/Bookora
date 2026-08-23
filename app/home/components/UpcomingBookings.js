"use client";

import Link from "next/link";
import { CalendarDays, Clock3, ChevronRight } from "lucide-react";

export default function UpcomingBookings({ bookings }) {
  const booking = bookings[0];

  return (
    <section className="upcoming-bookings">

      <div className="section-header">

        <h2>Upcoming Booking</h2>

        <Link href="/bookings" className="view-all">
          View All
          <ChevronRight size={16} />
        </Link>

      </div>

      <div className="booking-card">

        <img
          src={booking.image}
          alt={booking.business}
          className="booking-image"
        />

        <div className="booking-content">

          <h3>{booking.business}</h3>

          <p>{booking.service}</p>

          <div className="booking-meta">

            <span>
              <CalendarDays size={16} />
              {booking.date}
            </span>

            <span>
              <Clock3 size={16} />
              {booking.time}
            </span>

          </div>

          <Link
            href="/bookings"
            className="booking-btn"
          >
            View Booking
          </Link>

        </div>

      </div>

    </section>
  );
}