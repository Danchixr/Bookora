"use server";

import { supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createServiceAction(formData) {

  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .limit(1)
    .single();

  if (!business) {
    throw new Error("Business not found.");
  }
console.log("IMAGE URL:", formData.get("image_url"));
console.log({
  image_url: formData.get("image_url"),
});
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
    throw new Error(error.message);
  }

  revalidatePath("/service");

  redirect("/service");
}

export async function updateServiceAction(formData) {

  const serviceId = formData.get("service_id");

  const updatedService = {
  name: formData.get("name"),
  category: formData.get("category"),
  price: Number(formData.get("price")),
  duration: Number(formData.get("duration")),
  description: formData.get("description"),
  deposit_amount: Number(formData.get("deposit_amount")) || 0,
};

const { error } = await supabase
  .from("services")
  .update(updatedService)
  .eq("id", serviceId);

if (error) {
  throw new Error(error.message);
}

revalidatePath("/service");

redirect("/service");
}

export async function deleteServiceAction(formData) {

  const serviceId = formData.get("service_id");

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", serviceId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/service");
}