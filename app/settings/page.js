import "./settings.css";

import SettingsHeader from "./components/SettingsHeader";
import BottomNavigation from "../dashboard/components/mobile/BottomNavigation";
import { getPendingBookingsCount } from "@/lib/bookings";
import BusinessProfileCard from "./components/BusinessProfileCard";
import LocationCard from "./components/LocationCard";
import BusinessHoursCard from "./components/BusinessHoursCard";
import BookingSettingsCard from "./components/BookingSettingsCard";
import BankCard from "./components/BankCard";
import SecurityCard from "./components/SecurityCard";
import DangerZoneCard from "./components/DangerZoneCard";
import { supabase } from "@/lib/supabaseClient";

export default async function SettingsPage() {

  const pendingBookings = await getPendingBookingsCount();

  const { data: business } = await supabase
  .from("businesses")
  .select("*")
  .limit(1)
  .single();

  return (
    <>
      <SettingsHeader />
    <BusinessProfileCard business={business} />

<LocationCard business={business} />

<BusinessHoursCard business={business} />

     <BookingSettingsCard />
     <BankCard />
     <SecurityCard />
      <DangerZoneCard />

      <BottomNavigation
        pendingBookings={pendingBookings}
      />
    </>
  );
}