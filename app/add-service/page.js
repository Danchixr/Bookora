import "../dashboard/dashboard.css";
import "./add-service.css";

import Sidebar from "../dashboard/components/Sidebar";
import AddServiceHeader from "./components/AddServiceHeader";
import ImageUpload from "./components/ImageUpload";
import ServiceForm from "./components/ServiceForm";
import SaveButton from "./components/SaveButton";


export default function AddServicePage() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="add-service-main">

        <AddServiceHeader />
        <ServiceForm>
           <SaveButton />
        </ServiceForm>   


      </main>

    </div>
  );
}