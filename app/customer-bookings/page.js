"use client";

import { useState } from "react";
import { Bell, CalendarDays, Clock } from "lucide-react";

import BottomNavigation from "../home/components/BottomNavigation";

import "./bookings.css";

const bookings = {
  Upcoming: [
    {
      id: 1,
      business: "Glow Spa",
      service: "Deep Tissue Massage",
      date: "Tomorrow",
      time: "2:30 PM",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      business: "Elite Hair Studio",
      service: "Hair Treatment",
      date: "Friday",
      time: "11:00 AM",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop",
    },
  ],

  Completed: [
    {
      id: 3,
      business: "Pure Skin Clinic",
      service: "Hydrating Facial",
      date: "August 20",
      time: "10:00 AM",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop",
    },
  ],

  Cancelled: [
    {
      id: 4,
      business: "Polished Nails",
      service: "Acrylic Nails",
      date: "August 18",
      time: "1:00 PM",
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop",
    },
  ],
};

export default function CustomerBookingsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const currentBookings = bookings[activeTab];

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

        {Object.keys(bookings).map((tab) => (
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

        {currentBookings.map((booking) => (

          <button
            key={booking.id}
            className="booking-card"
          >

            <img
              src={booking.image}
              alt={booking.business}
              className="booking-image"
            />

            <div className="booking-info">

              <h2>{booking.business}</h2>

              <p className="booking-service">
                {booking.service}
              </p>

              <div className="booking-details">

                <span>
                  <CalendarDays size={15} />
                  {booking.date}
                </span>

                <span>
                  <Clock size={15} />
                  {booking.time}
                </span>

              </div>

            </div>

          </button>

        ))}

      </section>


      {/* Bottom Navigation */}
      <BottomNavigation />

    </main>
  );
}