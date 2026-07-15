import { supabase } from "@/lib/supabaseClient";

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      services (
        name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      services (
        name
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}