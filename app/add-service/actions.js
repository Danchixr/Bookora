"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function createServiceAction(prevState, formData) {
  const result = await getCurrentBusiness();

  if (!result) {
    return {
      error: "Business Not Found, Create your business profile to continue.",
    };
  }

  const { supabase, business } = result;

  const service = {
    business_id: business.id,
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    duration: Number(formData.get("duration")),
    description: formData.get("description"),
    deposit_amount: Number(formData.get("deposit_amount")) || 0,
    image_url: formData.get("image_url"),
  };

  const { error } = await supabase
    .from("services")
    .insert([service]);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/service");
  redirect("/service");
}

export async function updateServiceAction(prevState, formData) {
  const serviceId = formData.get("service_id");

  if (!serviceId) {
    throw new Error("Service ID is required.");
  }

  const result = await getCurrentBusiness();

  if (!result) {
    throw new Error("Business not found.");
  }

  const { supabase, business } = result;

  const updatedService = {
  name: formData.get("name"),
  category: formData.get("category"),
  price: Number(formData.get("price")),
  duration: Number(formData.get("duration")),
  description: formData.get("description"),
  deposit_amount: Number(formData.get("deposit_amount")) || 0,
  image_url: formData.get("image_url"),
};

  const { data, error } = await supabase
    .from("services")
    .update(updatedService)
    .eq("id", serviceId)
    .eq("business_id", business.id)
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Service not found or access denied.");
  }

  revalidatePath("/service");
  redirect("/service");
}

export async function deleteServiceAction(formData) {
  const serviceId = formData.get("service_id");

  if (!serviceId) {
    throw new Error("Service ID is required.");
  }

  const result = await getCurrentBusiness();

  if (!result) {
    throw new Error("Business not found.");
  }

  const { supabase, business } = result;

  const { data, error } = await supabase
    .from("services")
    .delete()
    .eq("id", serviceId)
    .eq("business_id", business.id)
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Service not found or access denied.");
  }

  revalidatePath("/service");
}