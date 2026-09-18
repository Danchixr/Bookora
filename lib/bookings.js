import { createClient } from "@/lib/supabase/server";

async function getCurrentBusiness() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: business, error } = await supabase
    .from("businesses")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("BUSINESS FETCH ERROR:", error);
    return null;
  }

  return {
    supabase,
    business,
  };
}

export async function getBookings() {
  const result = await getCurrentBusiness();

  if (!result?.business) {
    return [];
  }

  const { supabase, business } = result;

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      services (
        name,
        price
      )
    `)
    .eq("business_id", business.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("BOOKINGS FETCH ERROR:", error);
    return [];
  }

  return data || [];
}

export async function getBooking(id) {
  const result = await getCurrentBusiness();

  if (!result?.business) {
    return null;
  }

  const { supabase, business } = result;

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      services (
        name,
        price
      )
    `)
    .eq("id", id)
    .eq("business_id", business.id)
    .maybeSingle();

  if (error) {
    console.error("BOOKING FETCH ERROR:", error);
    return null;
  }

  return data;
}

export async function getPendingBookingsCount() {
  const result = await getCurrentBusiness();

  if (!result?.business) {
    return 0;
  }

  const { supabase, business } = result;

  const { count, error } = await supabase
    .from("bookings")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("business_id", business.id)
    .eq("status", "pending");

  if (error) {
    console.error("PENDING BOOKINGS ERROR:", error);
    return 0;
  }

  return count || 0;
}