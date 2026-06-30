"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import TimeWheelPicker from "@/components/TimeWheelPicker"

export default function BookingPage() {
  const [services, setServices] = useState([])
  const [serviceId, setServiceId] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [loading, setLoading] = useState(false)
  const [availableSlots, setAvailableSlots] = useState([])
  const [business, setBusiness] = useState(null)

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
  .from("services")
  .select(`
    *,
    businesses (
      opening_time,
      closing_time
    )
  `)

      setServices(data || [])
    }

    fetchServices()
  }, [])

  useEffect(() => {
  async function generateSlots() {
    if (!serviceId || !date) {
      setAvailableSlots([])
      return
    }

    const selectedService = services.find(
      (s) => s.id === serviceId
    )

    if (!selectedService) return

    const opening = selectedService.businesses?.opening_time
const closing = selectedService.businesses?.closing_time

if (!opening || !closing) return

    const { data: bookings } = await supabase
      .from("bookings")
      .select("*")
      .eq("service_id", serviceId)
      .eq("date", date)

    console.log("Selected date:", date)
    console.log("Bookings found:", bookings)

    const slots = []

const duration = Number(selectedService.duration) || 0
const buffer = 15

const [openHour, openMinute] = opening
  .split(":")
  .map(Number)

const [closeHour, closeMinute] = closing
  .split(":")
  .map(Number)

let current = new Date()
current.setHours(openHour, openMinute, 0, 0)

const end = new Date()
end.setHours(closeHour, closeMinute, 0, 0)

while (current < end) {
  const hours = String(current.getHours()).padStart(2, "0")
  const minutes = String(current.getMinutes()).padStart(2, "0")

  const slotTime = `${hours}:${minutes}`

  const slotStart = new Date(`2000-01-01T${slotTime}:00`)
const slotEnd = new Date(
  slotStart.getTime() + (duration + buffer) * 60000
)

const occupied = (bookings || []).some((booking) => {
  const bookingStart = new Date(
    `2000-01-01T${booking.time}:00`
  )

  const bookingEnd = new Date(
    bookingStart.getTime() + (duration + buffer) * 60000
  )

  return (
    slotStart < bookingEnd &&
    slotEnd > bookingStart
  )
})

if (!occupied) {
  slots.push(slotTime)
} 

  current.setMinutes(current.getMinutes() + 15)
}

    setAvailableSlots(slots)
  }

  generateSlots()
}, [serviceId, date, services])

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    const selectedService = services.find(
      (s) => s.id === serviceId
    )

    if (!selectedService) {
      alert("Please select a service")
      setLoading(false)
      return
    }

const { data: existingBookings } = await supabase
  .from("bookings")
  .select("*")
  .eq("service_id", serviceId)
  .eq("date", date)
  console.log("Existing bookings:", 
    existingBookings)

const newStart = new Date(`2000-01-01T${time}:00`)
const duration = Number(selectedService.duration) || 0
const buffer = 15

const newEnd = new Date(
  newStart.getTime() + (duration + buffer) * 60000
)

let hasConflict = false

for (const booking of existingBookings || []) {
  const existingStart = new Date(
    `2000-01-01T${booking.time}:00`
  )

  const existingEnd = new Date(
    existingStart.getTime() +
      (duration + buffer) * 60000
  )

  const overlaps =
    newStart < existingEnd &&
    newEnd > existingStart

  if (overlaps) {
    hasConflict = true
    break
  }
}

console.log("Existing bookings:", existingBookings)
console.log("New start:", newStart)
console.log("New end:", newEnd)
console.log("Has conflict:", hasConflict)

if (hasConflict) {
  alert(
    "This time slot is already occupied for this service."
  )
  setLoading(false)
  return
}

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          business_id: selectedService.business_id,
          service_id: serviceId,
          customer_name: customerName,
          date,
          time,
        },
      ])

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Booking created!")

      setCustomerName("")
      setDate("")
      setTime("")
      setServiceId("")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Booking</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="">Select Service</option>

          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <br /><br />

        <input
          placeholder="Your name"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
        />

        <br /><br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <br /><br />
      <TimeWheelPicker
       availableSlots={availableSlots}
       onTimeChange={setTime}
       /> 

       <p>
       Booking time: {time}
       </p>     

        <br /><br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Booking..."
            : "Create Booking"}
        </button>
      </form>
    </div>
  )
}

