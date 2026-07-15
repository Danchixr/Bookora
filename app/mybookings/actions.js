"use server";
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export async function updateBookingStatus(formData) {

  const bookingId = formData.get("booking_id");
  const status = formData.get("status");

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    return;
  }

  redirect("/mybookings");
}