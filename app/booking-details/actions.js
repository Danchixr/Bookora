"use server";

import { createClient } from "@/lib/supabase/server";

export async function cancelBooking(bookingId) {
  if (!bookingId || typeof bookingId !== "string") {
    return {
      success: false,
      error: "Invalid booking.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      error: "Please log in to cancel your booking.",
    };
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("id, status")
    .eq("id", bookingId)
    .eq("customer_id", user.id)
    .maybeSingle();

  if (bookingError || !booking) {
    return {
      success: false,
      error: "Booking not found.",
    };
  }

  if (!["pending", "confirmed"].includes(booking.status)) {
    return {
      success: false,
      error: "This booking can no longer be cancelled.",
    };
  }

  const { data: updatedBooking, error: updateError } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId)
    .eq("customer_id", user.id)
    .in("status", ["pending", "confirmed"])
    .select("id")
    .maybeSingle();

  if (updateError || !updatedBooking) {
    return {
      success: false,
      error: "Unable to cancel this booking. Please refresh and try again.",
    };
  }

  return {
    success: true,
  };
}