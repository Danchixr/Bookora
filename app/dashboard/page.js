import { getDashboardData } from "../../lib/dashboard";
import { supabase } from "@/lib/supabaseClient"
import "./dashboard.css"
import Sidebar from "./components/Sidebar"
import DashboardHeader from "./components/DashboardHeader"
import StatsGrid from "./components/StatsGrid"
import Test from "./components/RecentBookings"
import RecentBookings from "./components/RecentBookings"
import BusinessOverview from "./components/BusinessOverview"
import UpcomingBookings from "./components/UpcomingBookings"
import MobileDashboard from "./components/mobile/MobileDashboard";
import {
  getPendingBookingsCount,
} from "@/lib/bookings";

export default async function DashboardPage() {

  const {
  business,
  services,
  bookings,
} = await getDashboardData();

const pendingBookings =
  await getPendingBookingsCount();
  return (

    <div className="dashboard-layout">
      
 <div className="desktop-sidebar">
  <Sidebar />
</div>


      <main className="dashboard-main">

    <div className="desktop-dashboard">
        <DashboardHeader />

        <StatsGrid
        bookings={bookings}
        services={services}
         />

       <div className="dashboard-content">

  <div className="left-column">

    <RecentBookings bookings={bookings} />

   <BusinessOverview business={business} />

  </div>

  <div className="right-column">

    <UpcomingBookings />

  </div>

  
  {/* Existing dashboard */}
  </div>

</div>

<MobileDashboard
      business={business}
      bookings={bookings}
      services={services}
      pendingBookings={pendingBookings}
    />
      </main>
    </div>
  )
}