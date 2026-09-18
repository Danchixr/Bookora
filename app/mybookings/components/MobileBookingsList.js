"use client";

import Link from "next/link";
import { useState } from "react";
import BookingFilters from "./BookingFilters";

import {
  Clock,
  CalendarDays,
  ChevronRight,
} from "lucide-react";


export default function MobileBookingsList({
  bookings = [],
  searchTerm,
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  const today = new Date().toISOString().split("T")[0];

const filteredBookings = bookings.filter((booking) => {
  const matchesStatus =
    activeFilter === "all" ||
    booking.status === activeFilter;

  const matchesSearch =
    !searchTerm ||
    booking.customer_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    booking.services?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

  return matchesStatus && matchesSearch;
});

const groupedBookings = filteredBookings.reduce((groups, booking) => {
  const date = booking.date;

  if (!groups[date]) {
    groups[date] = [];
  }

  groups[date].push(booking);

  return groups;
}, {});

const sortedDates = Object.keys(groupedBookings).sort(
  (a, b) => new Date(a) - new Date(b)
);

  return (
    <div className="mobile-bookings-list">

      <h3 className="booking-section-title">
  All Bookings
</h3>

      <BookingFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

{sortedDates.length === 0 ? (

  <div className="empty-bookings">

    <div className="empty-icon">
      <CalendarDays size={35} />
    </div>

    <h3>No bookings found</h3>

    <p>
      New bookings from customers will
      appear here.
    </p>

  </div>

) : (

  sortedDates.map((date) => (

    <div key={date} className="booking-date-group">

      <h3 className="booking-date-title">
        {date}
      </h3>

      {groupedBookings[date]
        .sort((a, b) =>
          a.time.localeCompare(b.time)
        )
        .map((booking) => (

          <Link
            key={booking.id}
            href={`/mybookings/${booking.id}`}
            className="booking-card-link"
          >

            <div className="booking-card">

              <div className="booking-card-top">

                <div className="customer-info">

                  <div className="customer-avatar">
                    {booking.customer_name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h3>
                      {booking.customer_name || "Customer"}
                    </h3>

                    <p>
                      {booking.services?.name || "Unknown Service"}
                    </p>
                  </div>

                </div>

                <ChevronRight size={22} />

              </div>

              <div className="booking-details">

                <span>
                  <Clock size={16} />
                  {booking.time}
                </span>

                <span>
                  <CalendarDays size={16} />
                  {booking.date}
                </span>

              </div>

              <span
                className={`booking-status ${booking.status?.toLowerCase()}`}
              >
                {booking.status}
              </span>

            </div>

          </Link>

        ))}

    </div>

  ))

)}

    </div>
  );
}