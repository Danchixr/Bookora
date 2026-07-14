import { supabase } from "@/lib/supabaseClient";
import "../../../add-service/add-service.css";
import "../../../dashboard/dashboard.css";

import Sidebar from "../../../dashboard/components/Sidebar";
import AddServiceHeader from "../../../add-service/components/AddServiceHeader";
import ImageUpload from "../../../add-service/components/ImageUpload";
import ServiceForm from "../../../add-service/components/ServiceForm";
import SaveButton from "../../../add-service/components/SaveButton";

export default async function EditServicePage({ params }) {

  const { id } = await params;

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();


  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="add-service-main">

 <AddServiceHeader
  title="Edit Service"
  subtitle="Update your service information"
/>

        <ImageUpload />

        <ServiceForm service={service}>

          <SaveButton text="Save Changes" />

        </ServiceForm>

      </main>

    </div>
  );
}