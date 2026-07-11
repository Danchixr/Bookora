import { getServices } from "@/lib/services";
import "../dashboard/dashboard.css";
import "./services.css";
import Sidebar from "../dashboard/components/Sidebar";
import ServicesHeader from "./components/ServicesHeader";
import ServicesTable from "./components/ServicesTable";
import TableFooter from "./components/TableFooter";

export default async function ServicePage() {

  const services = await getServices();

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="services-main">

        <ServicesHeader />
        <ServicesTable services={services} />
        <TableFooter services={services} />

      </main>
    </div>
  );
}