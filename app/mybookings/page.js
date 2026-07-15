import { getBookings } from "@/lib/bookings";
import "./mybookings.css";

import MobileBookingsList from "./components/MobileBookingsList";
import BottomNavigation from "../dashboard/components/mobile/BottomNavigation";
import MyBookingsHeader from "./components/MyBookingsHeader";

export default async function MyBookingsPage() {

  const bookings = await getBookings();

  return (

    <div className="mybookings-page">

      <main className="mybookings-main">

        <MyBookingsHeader />
<MobileBookingsList bookings={bookings} />

      </main>

      <BottomNavigation />

    </div>

  );

}