"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  CalendarDays,
  Plus,
  BriefcaseBusiness,
  Settings,
} from "lucide-react";

export default function BottomNavigation({
  pendingBookings,
}) {
  console.log(pendingBookings);
  const pathname = usePathname();
  return (
    <nav className="bottom-nav">

      <Link
  href="/dashboard"
  className={`bottom-item ${pathname === "/dashboard" ? "active" : ""}`}
>
  <House size={22} />
  <small>Dashboard</small>
</Link>

     <Link
  href="/mybookings"
  className={`bottom-item ${pathname.startsWith("/mybookings") ? "active" : ""}`}
>
  <div className="nav-icon">

  <CalendarDays size={22} />

  {pendingBookings > 0 && (
    <span className="booking-count">
      {pendingBookings > 99 ? "99+" : pendingBookings}
    </span>
  )}

</div>
  <small>Bookings</small>
</Link>

      <Link
  href="/service"
  className={`bottom-item ${pathname.startsWith("/service") ? "active" : ""}`}
>
  <BriefcaseBusiness size={22} />
  <small>Services</small>
</Link>

     <Link
  href="/settings"
  className={`bottom-item ${pathname.startsWith("/settings") ? "active" : ""}`}
>
  <Settings size={22} />
  <small>Settings</small>
</Link>

    </nav>
  );
}