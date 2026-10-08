import { ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import FavouriteButton from "./FavouriteButton";

export default function BusinessHeader({
  business,
  initialIsFavourite,
  isLoggedIn,
  isOwnBusiness,
}) {
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

        <FavouriteButton
          businessId={business.id}
          initialIsFavourite={initialIsFavourite}
          isLoggedIn={isLoggedIn}
          isOwnBusiness={isOwnBusiness}
        />

        </div>

      </div>

      <button className="whatsapp-btn">💬</button>

    </section>
  );
}