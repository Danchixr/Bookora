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
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const pendingBookings = await getPendingBookingsCount();

const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

let business = null;

if (user) {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("BUSINESS FETCH ERROR:", error);
  }

  business = data;
}

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