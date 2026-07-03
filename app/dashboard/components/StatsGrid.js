export default function StatsGrid({
  bookings,
  services,
}) {

const today = new Date()
  .toISOString()
  .split("T")[0]

const todaysBookings =
  bookings?.filter(
    (booking) => booking.date === today
  ) || []

  return (
   <section className="stats-grid">

  <div className="stat-card">

    <div className="stat-icon">
      📅
    </div>

    <div>
      <p>Bookings Today</p>

      <h2>{todaysBookings.length}</h2> 

      <span>
        +25% from yesterday
      </span>
    </div>

  </div>

  <div className="stat-card">

  <div className="stat-icon">
    ⏰
  </div>

  <div>

    <p>Upcoming Bookings</p>

    <h2>12</h2>

    <span>
      View all upcoming
    </span>

  </div>

</div>

<div className="stat-card">

  <div className="stat-icon">
    🛠️
  </div>

  <div>

    <p>Services</p>

    <h2>{services?.length || 0}</h2>

    <span>
      Manage services
    </span>

  </div>

</div>

<div className="stat-card">

  <div className="stat-icon">
    💰
  </div>

  <div>

    <p>Total Earnings</p>

    <h2>₦125,000</h2>

    <span>
      +18% from last week
    </span>

  </div>

</div>

</section>
  )
}