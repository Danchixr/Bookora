import {
  ChevronLeft,
  Search,
  Heart,
} from "lucide-react";
import Link from "next/link"

export default function BusinessHeader() {
  return (
    <section className="business-header">

      <img
        src="https://picsum.photos/1200/450"
        alt="Business Banner"
        className="business-banner"
      />

      <div className="header-overlay">

       <Link href="/dashboard" className="header-btn">
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

      <button className="whatsapp-btn"> 💬 </button>

    </section>
  );
}