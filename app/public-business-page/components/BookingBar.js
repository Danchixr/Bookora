"use client";

import Link from "next/link";
import { MapPin, Settings } from "lucide-react";

export default function BookingBar() {
  return (
    <div className="booking-bar">

      <a
        href="https://maps.google.com/?q=Lekki,Lagos"
        target="_blank"
        rel="noopener noreferrer"
        className="map-btn"
      >
        <MapPin size={22} />
      </a>

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