"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
   const pathname = usePathname();
  return (
    <aside className="dashboard-sidebar">

      <div className="dashboard-logo">
        <div className="logo-circle">B</div>
        <h2>Bookora</h2>
      </div>

      <div className="business-profile">
        <img
          src="https://i.pravatar.cc/150?img=32"
          alt="Business"
        />

        <div className="business-info">
          <h3>Glow Spa</h3>
          <a href="#">View Public Page</a>
        </div>

        <span className="live-badge">Live</span>
      </div>

      <nav className="dashboard-nav">
        <a href="#" className="menu-item">
          Home
        </a>

        <Link
  href="/dashboard"
  className={`nav-item ${
    pathname === "/dashboard" ? "active" : ""
  }`}
>
  Dashboard
</Link>

       <Link
  href="/bookings"
  className={`nav-item ${
    pathname.startsWith("/bookings") ? "active" : ""
  }`}
>
  Bookings
</Link>

        <Link
  href="/service"
  className={`nav-item ${
    pathname.startsWith("/service") ? "active" : ""
  }`}
>
  Services
</Link>

        <a href="#" className="nav-item">
          Withdraw
        </a>

        <a href="#" className="nav-item">
          Settings
        </a>
      </nav>

          <div className="help-card">
  <h4>Need Help?</h4>
  <p>Visit our Help Center</p>
</div>

<div className="owner-profile">
  <img
    src="https://i.pravatar.cc/100?img=5"
    alt="Owner"
  />

  <div>
    <h4>Adaeze M.</h4>
    <span>Business Owner</span>
  </div>
</div>

    </aside>
  )
}
