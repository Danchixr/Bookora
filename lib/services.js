import { supabase } from "./supabaseClient";

export async function getServices() {

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .limit(1)
    .single();

  if (!business) {
    return [];
  }

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("business_id", business.id)
    .order("created_at", { ascending: false });

  return services || [];
}