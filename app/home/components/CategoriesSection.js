"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    {
      name: "Spa",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=200&auto=format&fit=crop",
    },
    {
      name: "Salon",
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=200&auto=format&fit=crop",
    },
    {
      name: "Clinic",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&auto=format&fit=crop",
    },
    {
      name: "Fitness",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&auto=format&fit=crop",
    },
    {
      name: "Medical",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=200&auto=format&fit=crop",
    },
    {
      name: "Education",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="categories-section">
      <div className="section-header">
        <h2>Categories</h2>

        <Link href="/explore" className="view-all">
          View All
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="categories-scroll">
        {categories.map((category) => (
          <button
            key={category.name}
            className="category-item"
          >
            <img
              src={category.image}
              alt={category.name}
            />

            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}