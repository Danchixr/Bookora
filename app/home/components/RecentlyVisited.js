"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Star } from "lucide-react";

export default function RecentlyVisited() {
  const visitedBusinesses = [
    {
      id: 1,
      name: "Glow Spa",
      category: "Spa & Wellness",
      rating: "4.9",
      location: "Lekki",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Elite Hair Studio",
      category: "Beauty & Salon",
      rating: "4.8",
      location: "Victoria Island",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="recently-visited-section">

      <div className="section-header">

        <h2>Recently Visited</h2>

        <Link href="/explore" className="view-all">
          View All
          <ChevronRight size={16} />
        </Link>

      </div>

      <div className="recently-visited-scroll">

        {visitedBusinesses.map((business) => (

          <Link
            href={`/business/${business.id}`}
            className="recently-visited-card"
            key={business.id}
          >

            <img
              src={business.image}
              alt={business.name}
            />

            <div className="recently-visited-info">

              <h3>{business.name}</h3>

              <p>{business.category}</p>

              <div className="recently-visited-meta">

                <span>
                  <Star size={13} fill="currentColor" />
                  {business.rating}
                </span>

                <span>
                  <MapPin size={13} />
                  {business.location}
                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}