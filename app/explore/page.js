

"use client";

import { Menu, Bell } from "lucide-react";
import { Search, SlidersHorizontal } from "lucide-react";
import "./explore.css";
import BottomNavigation from "../home/components/BottomNavigation";

export default function ExplorePage() {
  return (
    <main className="explore-page">

      <header className="explore-header">

        <button className="explore-menu-btn">
          <Menu size={28} />
        </button>

        <h1>Explore</h1>

        <button className="explore-notification-btn">
          <Bell size={27} />
          <span className="notification-dot"></span>
        </button>

      </header>

    <div className="explore-search-row">

  <div className="explore-search">
    <Search size={19} />

    <input
      type="text"
      placeholder="Search businesses or services..."
    />
  </div>

  <button className="explore-filter-btn">
    <SlidersHorizontal size={20} />
    <span>Filters</span>
  </button>

</div>

<section className="explore-categories">

  <div className="explore-section-header">
    <h2>Categories</h2>

    <button>View All</button>
  </div>

  <div className="explore-category-list">

    {[
      "Spa",
      "Salon",
      "Fitness",
      "Clinic",
      "Medical",
      "Education",
    ].map((category) => (
      <button
        key={category}
        className="explore-category"
      >
        {category}
      </button>
    ))}

  </div>

</section>

<section className="explore-businesses">

  <div className="explore-section-header">
    <h2>Businesses</h2>
  </div>

  <div className="explore-business-list">

    <div className="explore-business-card">

      <img
        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop"
        alt="Glow Spa"
      />

      <div className="explore-business-info">

        <h3>Glow Spa</h3>

        <p>Spa & Wellness</p>

        <div className="explore-business-meta">
          <span>⭐ 4.9</span>
          <span>📍 Lekki</span>
        </div>

      </div>

    </div>


    <div className="explore-business-card">

      <img
        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop"
        alt="Elite Hair Studio"
      />

      <div className="explore-business-info">

        <h3>Elite Hair Studio</h3>

        <p>Beauty & Salon</p>

        <div className="explore-business-meta">
          <span>⭐ 4.8</span>
          <span>📍 Victoria Island</span>
        </div>

      </div>

    </div>


    <div className="explore-business-card">

      <img
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop"
        alt="FitZone"
      />

      <div className="explore-business-info">

        <h3>FitZone</h3>

        <p>Fitness</p>

        <div className="explore-business-meta">
          <span>⭐ 4.7</span>
          <span>📍 Ikeja</span>
        </div>

      </div>

    </div>

  </div>

</section>

      <BottomNavigation />
    </main>
    
  );
}