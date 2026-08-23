"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Star } from "lucide-react";

export default function FeaturedBusinesses({ businesses }) {
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

        {businesses.map((business) => (

          <Link
            href={`/business/${business.id}`}
            className="business-card"
            key={business.id}
          >

            <div className="business-image-wrapper">

              <img
                src={business.image}
                alt={business.name}
                className="business-image"
              />

              <span className="featured-badge">
                Featured
              </span>

            </div>

            <div className="business-info">

              <h3>{business.name}</h3>

              <div className="business-rating">

                <Star size={14} fill="currentColor" />

                <span>{business.rating}</span>

                <span>•</span>

                <MapPin size={14} />

                <span>{business.location}</span>

              </div>

              <p>{business.category}</p>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}