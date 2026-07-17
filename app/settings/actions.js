"use server";

import { supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

export async function updateBusinessProfile(formData) {

  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .limit(1)
    .single();

  if (!business) {
    throw new Error("Business not found.");
  }
  console.log({
  name: formData.get("name"),
  phone: formData.get("phone"),
  email: formData.get("email"),
  description: formData.get("description"),
  logo_url: formData.get("logo_url"),
  banner_url: formData.get("banner_url"),
});

  const updates = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    description: formData.get("description"),
    logo_url: formData.get("logo_url"),
    banner_url: formData.get("banner_url"),
  };

  const { error } = await supabase
    .from("businesses")
    .update(updates)
    .eq("id", business.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/settings");
}

export async function updateBusinessLocation(formData) {
  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .limit(1)
    .single();

  const updates = {
    location: formData.get("location"),
    city: formData.get("city"),
    state: formData.get("state"),
    google_maps_url: formData.get("google_maps_url"),
  };

  const { error } = await supabase
    .from("businesses")
    .update(updates)
    .eq("id", business.id);

  if (error) throw new Error(error.message);

  revalidatePath("/settings");
}

export async function updateBusinessHours(formData) {

  

  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .limit(1)
    .single();

  const workingDays = JSON.parse(
    formData.get("working_days") || "[]"
  );

  console.log({
  opening_time: formData.get("opening_time"),
  closing_time: formData.get("closing_time"),
  working_days: formData.get("working_days"),
});

  const updates = {
    opening_time: formData.get("opening_time"),
    closing_time: formData.get("closing_time"),
    working_days: workingDays,
  };

  const { data, error } = await supabase
  .from("businesses")
  .update(updates)
  .eq("id", business.id)
  .select();

console.log("Updated row:", data);
console.log("Supabase error:", error);

if (error) throw new Error(error.message);

revalidatePath("/settings");
}