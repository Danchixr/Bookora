import { supabase } from "./supabaseClient";

export async function getDashboardData() {
  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .limit(1)
    .single();

  if (!business) {
    return {
      business: null,
      services: [],
      bookings: [],
    };
  }

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("business_id", business.id);

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      *,
      services(name)
    `)
    .eq("business_id", business.id);

  return {
    business,
    services,
    bookings,
  };
}