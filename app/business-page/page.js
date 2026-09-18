import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import "./business-page.css";

import BottomNavigation from "../home/components/BottomNavigation";
import BusinessHeader from "./components/BusinessHeader";
import BusinessInfo from "./components/BusinessInfo";
import FeatureHighlights from "./components/FeatureHighlights";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import BookingBar from "./components/BookingBar";

export default async function BusinessPage({ searchParams }) {
  const params = await searchParams;
  const businessId = params?.business_id;

  if (!businessId || typeof businessId !== "string") {
    notFound();
  }

  const supabase = await createClient();

  // Fetch the business selected on the homepage.
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", businessId)
    .maybeSingle();

  if (businessError) {
    console.error("CUSTOMER BUSINESS FETCH ERROR:", businessError);
    throw new Error("Unable to load this business.");
  }

  if (!business) {
    notFound();
  }

  // Fetch only this business's services.
  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select("*")
    .eq("business_id", business.id)
    .order("created_at", { ascending: false });

  if (servicesError) {
    console.error("CUSTOMER SERVICES FETCH ERROR:", servicesError);
    throw new Error("Unable to load business services.");
  }

  return (
    <div className="public-business-page">
      <main className="public-business-main">
        <BusinessHeader business={business} />

        <BusinessInfo business={business} />

        <FeatureHighlights />

        <AboutSection business={business} />

        <ServicesSection
  services={services || []}
  business={business}
/>

        <BookingBar business={business} />
      </main>

      <BottomNavigation />
    </div>
  );
}