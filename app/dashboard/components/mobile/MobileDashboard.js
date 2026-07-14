"use client";
import { useState } from "react";

import MobileHeader from "./MobileHeader";
import HeroCard from "./HeroCard";
import OverviewCards from "./OverviewCards";
import OverviewSection from "./OverviewSection";
import UpcomingBookingCard from "./UpcomingBookingCard";
import RecentBookingList from "./RecentBookingList";
import BottomNavigation from "./BottomNavigation";
import MobileSidebar from "./MobileSidebar";

export default function MobileDashboard({
  business,
  bookings,
  services,
}) {

 const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="mobile-dashboard">
      
 <MobileHeader
  onMenuClick={() => setMenuOpen(prev => !prev)}
/>

 {menuOpen && (
  <>
    <div
      className="sidebar-overlay"
      onClick={() => setMenuOpen(false)}
    />

    <MobileSidebar
      onClose={() => setMenuOpen(false)}
    />
  </>
)}

<HeroCard />

<OverviewSection>

  <OverviewCards
    bookings={bookings}
    services={services}
  />

</OverviewSection>

<UpcomingBookingCard
  bookings={bookings}
/>
<RecentBookingList
  bookings={bookings}
/>
<BottomNavigation />

    </div>
  );
}