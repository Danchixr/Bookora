import { Clock3, MapPin } from "lucide-react";

export default function BusinessInfo({ business }) {
  const location =
    [business?.location, business?.city, business?.state]
      .filter(Boolean)
      .join(", ") || "Location not provided";

  function formatTime(time) {
    if (!time) return null;

    const [hours, minutes] = time.split(":");
    const hour = Number(hours);

    if (Number.isNaN(hour)) return time;

    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}:${minutes} ${period}`;
  }

  const openingTime = formatTime(business?.opening_time);
  const closingTime = formatTime(business?.closing_time);

  const businessHours =
    openingTime && closingTime
      ? `${openingTime} - ${closingTime}`
      : "Hours not provided";

  return (
    <section className="business-info">

      {business?.logo_url ? (
        <img
          src={business.logo_url}
          alt={`${business.name} Logo`}
          className="business-logo"
        />
      ) : (
        <div className="business-logo" />
      )}

      <div className="business-text">

        <h2>{business?.name || "Business"}</h2>

        <p className="category">
          {business?.category || "Category not provided"}
        </p>

        <div className="business-meta">

          <div className="meta-item">
            <MapPin size={15} />
            <span>{location}</span>
          </div>

          <span className="dot">•</span>

          <div className="meta-item">
            <Clock3 size={15} />
            <span>{businessHours}</span>
          </div>

        </div>

      </div>

    </section>
  );
}