import { supabase } from "@/lib/supabaseClient"
import "./dashboard.css"
import Sidebar from "./components/Sidebar"
import DashboardHeader from "./components/DashboardHeader"
import StatsGrid from "./components/StatsGrid"
import Test from "./components/RecentBookings"
import RecentBookings from "./components/RecentBookings"
import BusinessOverview from "./components/BusinessOverview"
import UpcomingBookings from "./components/UpcomingBookings"

export default async function DashboardPage() {

    const { data: business, error } = await supabase
  .from("businesses")
  .select("*")
  .limit(1)
  .single()

  console.log(business) 

  const { data: services } = await supabase
  .from("services")
  .select("*")
  .eq("business_id", business.id)

 const { data: bookings } = await supabase
  .from("bookings")
  .select(`
    *,
    services(name)
  `)
  .eq("business_id", business.id)

  console.log("Business ID:", business.id)
console.log("Bookings:", bookings)

  return (

    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
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

</div>
      </main>
    </div>
  )
}