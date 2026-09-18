import { createClient } from "@/lib/supabase/server";

export async function getServices() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (businessError) {
    console.error("BUSINESS FETCH ERROR:", businessError);
    return [];
  }

  if (!business) {
    return [];
  }

  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select("*")
    .eq("business_id", business.id)
    .order("created_at", { ascending: false });

  if (servicesError) {
    console.error("SERVICES FETCH ERROR:", servicesError);
    return [];
  }

  return services || [];
}