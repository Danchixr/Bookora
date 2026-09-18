"use client";

import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

export default function FeaturedBusinesses({ businesses = [] }) {
  return (
    <section className="featured-businesses">
      <div className="section-header">
        <h2>Featured Businesses</h2>

        <Link href="/explore" className="view-all">
          View All
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="featured-scroll">
        {businesses.length === 0 ? (
          <p>No businesses available yet.</p>
        ) : (
          businesses.map((business) => (
            <Link
              href={`/business-page?business_id=${business.id}`}
              className="business-card"
              key={business.id}
            >
              <div className="business-image-wrapper">
                {business.image ? (
                  <img
                    src={business.image}
                    alt={business.name}
                    className="business-image"
                  />
                ) : (
                  <div className="business-image business-image-placeholder">
                    No image available
                  </div>
                )}
              </div>

              <div className="business-info">
                <h3>{business.name}</h3>

                <div className="business-rating">
                  <MapPin size={14} />

                  <span>
                    {business.location ||
                      [business.city, business.state]
                        .filter(Boolean)
                        .join(", ") ||
                      "Location not provided"}
                  </span>
                </div>

                <p>{business.category || "Business"}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}