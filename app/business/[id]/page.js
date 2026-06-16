import { createClient } from "@supabase/supabase-js"

export default async function BusinessDetailsPage({ params }) {
  const { id } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data: business, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .single()

    const { data: services } = await supabase
  .from("services")
  .select("*")
  .eq("business_id", id)

  if (error || !business) {
    return <div>Business not found</div>
  }

  return (
  <div style={{ padding: 20 }}>
    <h1>{business.name}</h1>
    <p>{business.location}</p>

    <h2>Services</h2>

    {services?.length === 0 ? (
      <p>No services yet</p>
    ) : (
      services.map((service) => (
        <div key={service.id}>
          <p>{service.name}</p>
          <p>₦{service.price}</p>
        </div>
      ))
    )}
  </div>
)
}
