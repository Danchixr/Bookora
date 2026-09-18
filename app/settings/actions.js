"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function getCurrentBusiness() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data: business, error } = await supabase
    .from("businesses")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!business) {
    throw new Error("Business profile not found.");
  }

  return {
    supabase,
    business,
  };
}

export async function updateBusinessProfile(formData) {
  const { supabase, business } = await getCurrentBusiness();

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
  revalidatePath("/dashboard");
  revalidatePath("/public-business-page");
  revalidatePath("/home");
}

export async function updateBusinessLocation(formData) {
  const { supabase, business } = await getCurrentBusiness();

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

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  revalidatePath("/public-business-page");
  revalidatePath("/home");
}

export async function updateBusinessHours(formData) {
  const { supabase, business } = await getCurrentBusiness();

  let workingDays = [];

  try {
    workingDays = JSON.parse(
      formData.get("working_days") || "[]"
    );
  } catch {
    throw new Error("Invalid working days.");
  }

  const updates = {
    opening_time: formData.get("opening_time"),
    closing_time: formData.get("closing_time"),
    working_days: workingDays,
  };

  const { error } = await supabase
    .from("businesses")
    .update(updates)
    .eq("id", business.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  revalidatePath("/public-business-page");
  revalidatePath("/home");
}