import { createClient } from "@/lib/supabase/server";

export async function getDashboardData() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      business: null,
      services: [],
      bookings: [],
    };
  }

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (businessError) {
    console.error("BUSINESS FETCH ERROR:", businessError);
  }

  if (!business) {
    return {
      business: null,
      services: [],
      bookings: [],
    };
  }

  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select("*")
    .eq("business_id", business.id);

  if (servicesError) {
    console.error("SERVICES FETCH ERROR:", servicesError);
  }

  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select(`
      *,
      services(name, price)
    `)
    .eq("business_id", business.id);

  if (bookingsError) {
    console.error("BOOKINGS FETCH ERROR:", bookingsError);
  }

  return {
    business,
    services: services || [],
    bookings: bookings || [],
  };
}