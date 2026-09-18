import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

import "../../../add-service/add-service.css";
import "../../../dashboard/dashboard.css";

import Sidebar from "../../../dashboard/components/Sidebar";
import AddServiceHeader from "../../../add-service/components/AddServiceHeader";
import ServiceForm from "../../../add-service/components/ServiceForm";
import SaveButton from "../../../add-service/components/SaveButton";

export default async function EditServicePage({ params }) {
  const { id } = await params;

  const supabase = await createClient();

  // Get the logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Find this user's business
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (businessError) {
    throw new Error(businessError.message);
  }

  if (!business) {
    redirect("/create-business");
  }

  // Only retrieve a service belonging to this business
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .eq("business_id", business.id)
    .maybeSingle();

  if (serviceError) {
    throw new Error(serviceError.message);
  }

  if (!service) {
    notFound();
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="add-service-main">
        <AddServiceHeader
          title="Edit Service"
          subtitle="Update your service information"
        />

        <ServiceForm service={service}>
          <SaveButton text="Save Changes" />
        </ServiceForm>
      </main>
    </div>
  );
}