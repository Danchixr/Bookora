import { supabase } from "@/lib/supabaseClient"

export default async function BusinessesPage() {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>All Businesses</h1>

      {data.length === 0 ? (
        <p>No businesses yet</p>
      ) : (
        data.map((biz) => (
          <div
            key={biz.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: 10,
              padding: 10,
            }}
          >
            <h3>{biz.name}</h3>
            <p>{biz.location}</p>
          </div>
        ))
      )}
    </div>
  )
}
