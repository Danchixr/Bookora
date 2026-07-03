export default function UpcomingBookings({ bookings }) {

  const upcomingBookings =
    bookings
      ?.filter(
        (booking) =>
          booking.date >= new Date().toISOString().split("T")[0]
      )
      .slice(0, 3) || [];

  console.log(upcomingBookings);

  return (

    <div className="dashboard-card">

      <div className="card-header">
        <h2>Upcoming Bookings</h2>

        <a href="#">
          View Calendar
        </a>
      </div>

      {upcomingBookings.length === 0 ? (

        <p>No upcoming bookings.</p>

      ) : (

        upcomingBookings.map((booking) => (

          <div
            className="upcoming-booking"
            key={booking.id}
          >

            <h4>{booking.customer_name}</h4>

            <p>{booking.services?.name}</p>

            <span>
              {booking.date} • {booking.time}
            </span>

          </div>

        ))

      )}

    </div>

  );
}