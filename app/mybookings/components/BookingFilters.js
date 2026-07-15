"use client";

export default function BookingFilters({
  activeFilter,
  setActiveFilter,
}) {

  const filters = [
    "all",
    "pending",
    "confirmed",
    "completed",
    "cancelled",
  ];

  return (
    <div className="booking-filters">

      {filters.map((filter) => (

        <button
          key={filter}
          className={
            activeFilter === filter
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() => setActiveFilter(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>

      ))}

    </div>
  );
}