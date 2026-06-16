"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function BookingPage() {
  const [services, setServices] = useState([])
  const [serviceId, setServiceId] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from("services")
        .select("*")

      setServices(data || [])
    }

    fetchServices()
  }, [])

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

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

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

