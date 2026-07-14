import { getServices } from "@/lib/services";
import "../dashboard/dashboard.css";
import "./services.css";

import Sidebar from "../dashboard/components/Sidebar";
import ServicesHeader from "./components/ServicesHeader";
import ServicesTable from "./components/ServicesTable";
import TableFooter from "./components/TableFooter";
import BottomNavigation from "../dashboard/components/mobile/BottomNavigation";


export default async function ServicePage(){

 const services = await getServices();

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
      <BottomNavigation />
   </div>


 </div>

 );

}