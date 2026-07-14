export default function RecentBookingList({
  bookings,
}) {

  const recentBookings = bookings?.slice(0, 3) || [];

  return (

    <section className="recent-bookings-card">

      <div className="section-title">

        <h2>Recent Bookings</h2>

        <span>View All</span>

      </div>

      {recentBookings.length > 0 ? (

        recentBookings.map((booking) => (

          <div
            key={booking.id}
            className="recent-booking-item"
          >

            <div className="booking-avatar">
              {booking.customer_name?.charAt(0).toUpperCase()}
            </div>

            <div className="booking-details">

              <h4>{booking.customer_name}</h4>

              <p>
                {booking.services?.name || "Service"}
              </p>

            </div>

            <div className="booking-right">

              <small>
                {booking.date}
              </small>

              <span className={`status ${booking.status?.toLowerCase()}`}>
                {booking.status}
              </span>

            </div>

          </div>

        ))

      ) : (

        <p className="empty-bookings">
          No recent bookings.
        </p>

      )}

    </section>

  );

}