"use client";

import { Bell, Heart, MapPin, Star } from "lucide-react";

import BottomNavigation from "../home/components/BottomNavigation";

import "./favourites.css";

const favourites = [
  {
    id: 1,
    name: "Glow Spa",
    category: "Spa & Wellness",
    rating: "4.9",
    location: "Lekki",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Elite Hair Studio",
    category: "Beauty & Salon",
    rating: "4.8",
    location: "Victoria Island",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "FitZone",
    category: "Fitness",
    rating: "4.7",
    location: "Ikeja",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop",
  },
];

export default function FavouritesPage() {
  return (
    <main className="favourites-page">

      {/* Header */}
      <header className="favourites-header">

        <h1>Favourites</h1>

        <button className="favourites-notification">
          <Bell size={22} />
          <span className="notification-dot"></span>
        </button>

      </header>


      {/* Favourite Businesses */}
      <section className="favourites-list">

        {favourites.map((business) => (

          <div
            className="favourite-card"
            key={business.id}
          >

            <img
              src={business.image}
              alt={business.name}
            />

            <div className="favourite-info">

              <h2>{business.name}</h2>

              <p>{business.category}</p>

              <div className="favourite-meta">

                <span>
                  <Star size={13} fill="currentColor" />
                  {business.rating}
                </span>

                <span>
                  <MapPin size={13} />
                  {business.location}
                </span>

              </div>

            </div>

            <button className="favourite-heart">
              <Heart
                size={20}
                fill="currentColor"
              />
            </button>

          </div>

        ))}

      </section>


      <BottomNavigation />

    </main>
  );
}