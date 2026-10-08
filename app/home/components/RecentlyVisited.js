"use client";

import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

export default function RecentlyVisited({
  businesses = [],
}) {
  // Don't show the entire section when the customer
  // hasn't completed any appointments yet.
  if (businesses.length === 0) {
    return null;
  }

  return (
    <section className="recently-visited-section">

      <div className="section-header">

        <h2>Recently Visited</h2>

        <Link href="/bookings" className="view-all">
          View All
          <ChevronRight size={16} />
        </Link>

      </div>

      <div className="recently-visited-scroll">

        {businesses.map((business) => (

          <Link
            href={`/business?business_id=${business.id}`}
            className="recently-visited-card"
            key={business.id}
          >

            {business.image ? (
              <img
                src={business.image}
                alt={business.name}
              />
            ) : (
              <div className="recently-visited-image-placeholder">
                {business.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <div className="recently-visited-info">

              <h3>{business.name}</h3>

              {business.category && (
                <p>{business.category}</p>
              )}

              {business.location && (
                <div className="recently-visited-meta">

                  <span>
                    <MapPin size={13} />
                    {business.location}
                  </span>

                </div>
              )}

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}