export default function RecentBookings({ bookings }) {
  return (
    <div className="dashboard-card">

      <div className="card-header">
        <h2>Recent Bookings</h2>

        <a href="#">
          View all bookings
        </a>
      </div>

      <table className="bookings-table">

        <thead>

          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

  {!bookings || bookings.length === 0 ? (

    <tr>
      <td colSpan="5">
        No bookings yet
      </td>
    </tr>

  ) : (

    bookings
      .slice(0, 5)
      .map((booking) => (

        <tr key={booking.id}>

          <td>{booking.customer_name}</td>

          <td>{booking.services?.name}</td>

          <td>{booking.date}</td>

          <td>{booking.time}</td>

          <td>
            <span className={`status ${booking.status?.toLowerCase() || "pending"}`}>
            {booking.status || "Pending"}
           </span>
          </td>

        </tr>

      ))

  )}

</tbody>

      </table>

    </div>
  )
}