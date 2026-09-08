export default function OverviewCards({
  bookings = [],
  services = [],
}) {
  const today = new Date().toISOString().split("T")[0];

  const bookingsToday = bookings.filter(
    (booking) => booking.date === today
  );

  const totalEarnings = bookings.reduce(
    (total, booking) =>
      total + Number(booking.services?.price || 0),
    0
  );

  return (
    <div className="overview-grid">

      <div className="overview-card purple">
        <div className="card-icon">📅</div>

        <p>Bookings Today</p>

        <h3>{bookingsToday.length}</h3>
      </div>

      <div className="overview-card green">
        <div className="card-icon">👜</div>

        <p>Services</p>

        <h3>{services.length}</h3>
      </div>

      <div className="overview-card orange">
        <div className="card-icon">💰</div>

        <p>Total Earnings</p>

        <h3>₦{totalEarnings.toLocaleString()}</h3>
      </div>

    </div>
  );
}