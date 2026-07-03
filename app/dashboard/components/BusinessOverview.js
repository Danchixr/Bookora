export default function BusinessOverview({
  business,
}) {
  return (
    <div className="dashboard-card">

      <h2>Business Overview</h2>

      <div className="overview-grid">

        <div>
          <span>Business Name</span>
          <strong>{business?.name}</strong>
        </div>

        <div>
          <span>Category</span>
          <strong>{business?.category}</strong>
        </div>

        <div>
          <span>Location</span>
          <strong>{business?.location}</strong>
        </div>

        <div>
          <span>Member Since</span>
          <strong>May 2025</strong>
        </div>

      </div>

    </div>
  )
}