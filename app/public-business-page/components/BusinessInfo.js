"use client";

import {
  Star,
  Clock3,
  MapPin,
} from "lucide-react";

export default function BusinessInfo({ business }) {
  const location =
    business?.location ||
    [business?.city, business?.state]
      .filter(Boolean)
      .join(", ");

  const openingTime = business?.opening_time
    ? new Date(`1970-01-01T${business.opening_time}`)
        .toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
    : null;

  const closingTime = business?.closing_time
    ? new Date(`1970-01-01T${business.closing_time}`)
        .toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
    : null;

  const hours =
    openingTime && closingTime
      ? `${openingTime} - ${closingTime}`
      : "Hours not set";

  return (
    <section className="business-info">

      <img
        src={
          business?.logo_url ||
          "https://i.pravatar.cc/150?img=32"
        }
        alt={`${business?.name || "Business"} Logo`}
        className="business-logo"
      />

      <div className="business-text">

        <h2>
          {business?.name || "Business"}

          <div className="rating">
            <Star
              size={16}
              fill="#FBBF24"
              color="#FBBF24"
            />

            <span>4.9</span>
          </div>
        </h2>

        <p className="category">
          {business?.category || "Business"}
        </p>

        <div className="business-meta">

          <div className="meta-item">
            <MapPin size={15} />
            <span>
              {location || "Location not set"}
            </span>
          </div>

          <span className="dot">•</span>

          <div className="meta-item">
            <Clock3 size={15} />
            <span>{hours}</span>
          </div>

        </div>

      </div>

    </section>
  );
}