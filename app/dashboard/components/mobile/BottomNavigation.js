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

export default function BottomNavigation() {
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
  href="/bookings"
  className={`bottom-item ${pathname.startsWith("/bookings") ? "active" : ""}`}
>
  <CalendarDays size={22} />
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