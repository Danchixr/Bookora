"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  CalendarDays,
  Search,
  User,
} from "lucide-react";

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="bottom-navigation">

      <Link
        href="/home"
        className={`bottom-nav-item ${
          pathname === "/home" ? "active" : ""
        }`}
      >
        <Home size={21} />
        <span>Home</span>
      </Link>

      <Link
        href="/customer-bookings"
        className={`bottom-nav-item ${
          pathname === "/customer-bookings" ? "active" : ""
        }`}
      >
        <CalendarDays size={21} />
        <span>Bookings</span>
      </Link>

      <Link
        href="/explore"
        className={`bottom-nav-item ${
          pathname === "/explore" ? "active" : ""
        }`}
      >
        <Search size={21} />
        <span>Explore</span>
      </Link>

      <Link
        href="/profile"
        className={`bottom-nav-item ${
          pathname === "/profile" ? "active" : ""
        }`}
      >
        <User size={21} />
        <span>Profile</span>
      </Link>

    </nav>
  );
}