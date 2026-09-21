"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(formData) {
  const bookingId = formData.get("booking_id");
  const newStatus = formData.get("status");

  if (
    typeof bookingId !== "string" ||
    typeof newStatus !== "string" ||
    !["confirmed", "cancelled"].includes(newStatus)
  ) {
    return;
  }

  const supabase = await createClient();

  // Get the authenticated business owner.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return;
  }

  // Find the business belonging to this account.
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (businessError || !business) {
    console.error("BUSINESS FETCH ERROR:", businessError);
    return;
  }

  // Verify ownership and retrieve the current booking status.
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("id, status, date, time")
    .eq("id", bookingId)
    .eq("business_id", business.id)
    .maybeSingle();

  if (bookingError || !booking) {
    console.error("BOOKING FETCH ERROR:", bookingError);
    return;
  }

  // Expired, completed and cancelled bookings cannot be changed.
  const validTransition =
    (booking.status === "pending" &&
      ["confirmed", "cancelled"].includes(newStatus)) ||
    (booking.status === "confirmed" &&
      newStatus === "cancelled");

  if (!validTransition) {
    return;
  }

  // Prevent accepting a pending booking after its appointment starts.
  // Bookora currently uses Nigeria time for appointment scheduling.
  if (newStatus === "confirmed") {
    const appointment = new Date(
      `${booking.date}T${booking.time}+01:00`
    );

    if (
      Number.isNaN(appointment.getTime()) ||
      appointment <= new Date()
    ) {
      return;
    }
  }

  // Check the original status again during the update.
  const { data: updatedBooking, error: updateError } = await supabase
    .from("bookings")
    .update({ status: newStatus })
    .eq("id", bookingId)
    .eq("business_id", business.id)
    .eq("status", booking.status)
    .select("id")
    .maybeSingle();

  if (updateError) {
    console.error("BOOKING UPDATE ERROR:", updateError);
    return;
  }

  if (!updatedBooking) {
    // The booking may have changed status since it was fetched.
    return;
  }

  revalidatePath("/mybookings");
  revalidatePath("/dashboard");

  redirect("/mybookings");
}