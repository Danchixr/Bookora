"use client";

import Link from "next/link";

import {
  Star,
  Clock3,
  MapPin,
} from "lucide-react";

export default function BusinessInfo() {
  return (
    <section className="business-info">

      <img
        src="https://i.pravatar.cc/150?img=32"
        alt="Logo"
        className="business-logo"
      />

      <div className="business-text">

        <h2>
          Glow Spa

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
          Spa • Massage • Wellness
        </p>

        <div className="business-meta">

         <div className="meta-item">
  <MapPin size={15} />
  <span>Lekki, Lagos</span>
</div>

<span className="dot">•</span>

<div className="meta-item">
  <Clock3 size={15} />
  <span>9:00 AM - 6:00 PM</span>
</div>

        </div>

      </div>

    </section>
  );
}