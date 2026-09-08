"use client";

export default function HeroCard({ bookings = [] }) {
  const today = new Date().toISOString().split("T")[0];

  const todaysBookings = bookings.filter(
    (booking) => booking.date === today
  );

  const todaysRevenue = todaysBookings.reduce(
    (total, booking) =>
      total + Number(booking.services?.price || 0),
    0
  );

  return (
    <section className="hero-card">
      <p className="hero-label">
        Today's Revenue
      </p>

      <h2 className="hero-amount">
        ₦{todaysRevenue.toLocaleString()}
      </h2>

      <p className="hero-subtitle">
        {todaysBookings.length} bookings today
      </p>
    </section>
  );
}