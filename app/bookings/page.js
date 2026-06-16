import { supabase } from "@/lib/supabaseClient"

export default async function BookingsPage() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Bookings</h1>

      {data.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        data.map((booking) => (
          <div
            key={booking.id}
            style={{
              border: "1px solid #ccc",
              padding: 12,
              marginBottom: 10,
            }}
          >
            <p><strong>Name:</strong> {booking.customer_name}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Status:</strong> {booking.status}</p>
          </div>
        ))
      )}
    </div>
  )
}
