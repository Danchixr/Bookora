"use server";

import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export async function updateBookingStatus(formData) {
  const bookingId = formData.get("booking_id");
  const newStatus = formData.get("status");

  if (!bookingId || !newStatus) {
    return;
  }

  // Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  // Get the business owned by this user
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (businessError || !business) {
    console.error("BUSINESS FETCH ERROR:", businessError);
    return;
  }

  // Get the booking and make sure it belongs to this business
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("id, status")
    .eq("id", bookingId)
    .eq("business_id", business.id)
    .maybeSingle();

  if (bookingError || !booking) {
    console.error("BOOKING FETCH ERROR:", bookingError);
    return;
  }

  // Completed bookings cannot be manually changed
  if (booking.status === "completed") {
    return;
  }

  // Only allow valid manual status changes
  const validTransition =
    (booking.status === "pending" &&
      ["confirmed", "cancelled"].includes(newStatus)) ||
    (booking.status === "confirmed" &&
      newStatus === "cancelled");

  if (!validTransition) {
    return;
  }

  const { error: updateError } = await supabase
    .from("bookings")
    .update({ status: newStatus })
    .eq("id", bookingId)
    .eq("business_id", business.id);

  if (updateError) {
    console.error("BOOKING UPDATE ERROR:", updateError);
    return;
  }

  redirect("/mybookings");
}