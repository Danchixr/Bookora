"use client";

import Link from "next/link";
import { BUSINESS_CATEGORIES } from "@/lib/categories";

export default function CategoriesSection() {
  return (
    <section className="categories-section">

      <div className="section-header">
        <h2>Categories</h2>

      </div>

      <div className="categories-scroll">

        {BUSINESS_CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="category-item"
          >
            <img
              src={category.image}
              alt={category.name}
            />

            <span>{category.name}</span>
          </Link>
        ))}

      </div>

    </section>
  );
}