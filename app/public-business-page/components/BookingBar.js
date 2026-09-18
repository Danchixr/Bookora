"use client";

import Link from "next/link";
import { MapPin, Settings } from "lucide-react";

export default function BookingBar({ business }) {
  return (
    <div className="booking-bar">

      {business?.google_maps_url ? (
        <a
          href={business.google_maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="map-btn"
        >
          <MapPin size={22} />
        </a>
      ) : (
        <span className="map-btn">
          <MapPin size={22} />
        </span>
      )}

      <Link
        href="/settings"
        className="manage-btn"
      >
        <Settings size={20} />
        <span>Manage Business</span>
      </Link>

    </div>
  );
}