import {
  ChevronLeft,
  Search,
  Heart,
} from "lucide-react";

import Link from "next/link";

export default function BusinessHeader({ business }) {
  return (
    <section className="business-header">

      {business?.banner_url ? (
        <img
          src={business.banner_url}
          alt={`${business.name} Banner`}
          className="business-banner"
        />
      ) : (
        <div className="business-banner" />
      )}

      <div className="header-overlay">

        <Link href="/home" className="header-btn">
          <ChevronLeft size={22} />
        </Link>

        <div className="header-actions">

          <button className="header-btn">
            <Search size={20} />
          </button>

          <button className="header-btn">
            <Heart size={20} />
          </button>

        </div>

      </div>

      <button className="whatsapp-btn">💬</button>

    </section>
  );
}