"use client";

import {
  Menu,
  Search,
  SlidersHorizontal,
  Bell,
} from "lucide-react";



export default function HomeHeader({ onMenuClick }) {

  return (
    <header className="home-header">

      <button
  className="header-icon-btn"
  onClick={onMenuClick}
>
  <Menu size={22} />
</button>

      <div className="home-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search businesses or services..."
        />

      </div>

      <button className="header-icon-btn">
        <SlidersHorizontal size={21} />
      </button>

      <button className="header-icon-btn notification-btn">

        <Bell size={21} />

        <span className="notification-dot"></span>

      </button>

    </header>
  );
}