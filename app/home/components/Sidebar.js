"use client";

import { X } from "lucide-react";
import {
  Home,
  CalendarDays,
  Heart,
  User,
} from "lucide-react";

export default function Sidebar({ onClose }) {
  return (
    <aside className="mobile-sidebar">

      {/* Sidebar Header */}
      <div className="sidebar-header">

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            B
          </div>

          <h2>Bookora</h2>

        </div>

        <button
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={23} />
        </button>

      </div>
    
    {/* Customer Profile */}
<div className="sidebar-profile">

  <img
    src="https://i.pravatar.cc/150?img=12"
    alt="Profile"
    className="sidebar-profile-image"
  />

  <div className="sidebar-profile-info">

    <h3>Chisom</h3>

    <p>Customer</p>

  </div>

</div>

<nav className="sidebar-nav">

  <a
    href="/home"
    className="sidebar-nav-item active"
    onClick={onClose}
  >
    <Home size={20} />
    <span>Home</span>
  </a>

  <a
    href="/mybookings"
    className="sidebar-nav-item"
    onClick={onClose}
  >
    <CalendarDays size={20} />
    <span>My Bookings</span>
  </a>

  <a
    href="/favourites"
    className="sidebar-nav-item"
    onClick={onClose}
  >
    <Heart size={20} />
    <span>Favourites</span>
  </a>

  <a
    href="/profile"
    className="sidebar-nav-item"
    onClick={onClose}
  >
    <User size={20} />
    <span>Profile</span>
  </a>

</nav>

<div className="sidebar-bottom">

  <a
    href="/dashboard"
    className="visit-dashboard-btn"
    onClick={onClose}
  >
    Visit Dashboard
  </a>

</div>

    </aside>
  );
}