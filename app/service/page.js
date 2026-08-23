import {
  getBookings,
  getPendingBookingsCount,
} from "@/lib/bookings";

import { Package } from "lucide-react";
import Link from "next/link";

import { getServices } from "@/lib/services";
import "../dashboard/dashboard.css";
import "./services.css";

import Sidebar from "../dashboard/components/Sidebar";
import ServicesHeader from "./components/ServicesHeader";
import ServicesTable from "./components/ServicesTable";
import TableFooter from "./components/TableFooter";
import BottomNavigation from "../dashboard/components/mobile/BottomNavigation";


export default async function ServicePage(){
const pendingBookings = await getPendingBookingsCount();
 const services = await getServices();

 console.log("Services:", services);

 if (services.length === 0) {
  return (
    <div className="dashboard-layout">

      <div className="desktop-sidebar-wrapper">
        <Sidebar />
      </div>

      <main className="services-main">

        <ServicesHeader />

        <section className="empty-services">

          <div className="empty-services-icon">
            <Package size={52} />
          </div>

          <h2>No services yet</h2>

          <p>
            Add your first service so customers
            can start booking.
          </p>

          <Link
            href="/add-service"
            className="add-service-btn"
          >
            + Add Service
          </Link>

        </section>

      </main>

      <div className="bottom-navigation">
        <BottomNavigation pendingBookings={pendingBookings} />
      </div>

    </div>
  );
}

 return (

 <div className="dashboard-layout">

   <div className="desktop-sidebar-wrapper">
     <Sidebar />
   </div>


   <main className="services-main">

      <ServicesHeader />

      <ServicesTable services={services}/>

      <TableFooter services={services}/>

   </main>


   <div className="bottom-navigation">
      <BottomNavigation pendingBookings={pendingBookings} />
   </div>


 </div>

 );

}