export default function OverviewCards({
  bookings,
  services,
}) {
  return (
    <div className="overview-grid">
    
      <div className="overview-card purple">
        <div className="card-icon">📅</div>

        <p>Bookings Today</p>

        <h3>{bookings.length}</h3>

      </div>

      <div className="overview-card green">
        <div className="card-icon">👜</div>

        <p>Services</p>

        <h3>{services.length}</h3>
      </div>

    <div className="overview-card orange">
        <div className="card-icon">💰</div>

        <p>Total Earnings</p>

        <h3>₦125,000</h3>
      </div>
    
    </div>

  );
}