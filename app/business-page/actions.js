"use server";

import { createClient } from "@/lib/supabase/server";
import { generateAvailableSlots } from "@/lib/bookingAvailability";

export async function createBooking({
  serviceId,
  date,
  time,
  customerName,
  customerPhone,
}) {
  const name = String(customerName || "").trim();
  const phone = String(customerPhone || "").trim();

  if (
    !serviceId ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date || "") ||
    !/^\d{2}:\d{2}$/.test(time || "") ||
    !name ||
    !phone
  ) {
    return {
      success: false,
      error: "Please provide valid booking details.",
    };
  }

  const supabase = await createClient();

  // Fetch the actual service and its business from the database.
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("id, business_id, duration")
    .eq("id", serviceId)
    .maybeSingle();

  if (serviceError || !service) {
    return {
      success: false,
      error: "This service is no longer available.",
    };
  }

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("id, opening_time, closing_time, working_days")
    .eq("id", service.business_id)
    .maybeSingle();

  if (businessError || !business) {
    return {
      success: false,
      error: "This business is no longer available.",
    };
  }

  // Do not accept dates or times that have already passed.
  // This uses the server's clock; we'll make business time zones
  // explicit before production if businesses operate in multiple zones.
  const now = new Date();
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const appointment = new Date(year, month - 1, day, hour, minute);

  if (
    appointment.getFullYear() !== year ||
    appointment.getMonth() !== month - 1 ||
    appointment.getDate() !== day ||
    appointment.getHours() !== hour ||
    appointment.getMinutes() !== minute ||
    appointment <= now
  ) {
    return {
      success: false,
      error: "Please choose a future appointment date and time.",
    };
  }

  // Re-fetch bookings immediately before attempting to insert.
  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("id, service_id, date, time, status, services(duration)")
    .eq("service_id", service.id)
    .eq("date", date)
    .neq("status", "cancelled");

  if (bookingsError) {
    return {
      success: false,
      error: "Unable to verify availability. Please try again.",
    };
  }

  const availableSlots = generateAvailableSlots({
    date,
    service,
    business,
    bookings: bookings || [],
  });

  if (!availableSlots.includes(time)) {
    return {
      success: false,
      error: "That time is no longer available. Please select another slot.",
    };
  }

  const { data: booking, error: insertError } = await supabase
    .from("bookings")
    .insert({
      business_id: business.id,
      service_id: service.id,
      customer_name: name,
      customer_phone: phone,
      date,
      time,
      status: "pending",
      payment_status: "unpaid",
    })
    .select("id")
    .single();

  if (insertError) {
    console.error("BOOKING INSERT ERROR:", insertError);

    return {
      success: false,
      error: "Unable to submit your booking. Please try again.",
    };
  }

  return {
    success: true,
    bookingId: booking.id,
  };
}