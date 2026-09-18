import Link from "next/link";
import { Store } from "lucide-react";

import BusinessHeader from "./components/BusinessHeader";
import BusinessInfo from "./components/BusinessInfo";
import FeatureHighlights from "./components/FeatureHighlights";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import BookingBar from "./components/BookingBar";
import "./public-business-page.css";
import BottomNavigation from "../dashboard/components/mobile/BottomNavigation";

import { createClient } from "@/lib/supabase/server";

export default async function PublicBusinessPage({ searchParams }) {
  const supabase = await createClient();

  const params = await searchParams;
  const businessId = params?.business_id;

  let business = null;

  /*
   * If a business_id is supplied, load that exact business.
   * Otherwise, load the logged-in user's business.
   */
  if (businessId) {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", businessId)
      .maybeSingle();

    if (error) {
      console.error("PUBLIC BUSINESS FETCH ERROR:", error);
    }

    business = data;
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("BUSINESS FETCH ERROR:", error);
      }

      business = data;
    }
  }

  if (!business) {
    return (
      <div className="public-business-page">
        <main className="public-business-main">
          <section className="business-empty-state">
            <div className="business-empty-icon">
              <Store size={34} />
            </div>

            <h2>No business profile yet</h2>

            <p>
              Set up your business profile to see how
              your page will look to customers.
            </p>

            <Link
              href="/settings"
              className="business-empty-btn"
            >
              Set Up Business
            </Link>
          </section>
        </main>

        <BottomNavigation />
      </div>
    );
  }

  /*
   * Get only the services belonging to this business.
   */
  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select("*")
    .eq("business_id", business.id)
    .order("created_at", { ascending: false });

  if (servicesError) {
    console.error("PUBLIC SERVICES FETCH ERROR:", servicesError);
  }

  return (
    <div className="public-business-page">
      <main className="public-business-main">
        <BusinessHeader business={business} />

        <BusinessInfo business={business} />

        <FeatureHighlights />

        <AboutSection business={business} />

        <ServicesSection services={services || []} />

        <BookingBar business={business} />
      </main>

      <BottomNavigation />
    </div>
  );
}