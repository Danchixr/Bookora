"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ServicesPage() {
  const [businesses, setBusinesses] = useState([])
  const [businessId, setBusinessId] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("")
  const [depositValue, setDepositValue] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchBusinesses() {
      const { data } = await supabase
        .from("businesses")
        .select("*")

      setBusinesses(data || [])
    }

    fetchBusinesses()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    const { error } = await supabase
      .from("services")
      .insert([
        {
          business_id: businessId,
          name,
          price,
          duration,
          deposit_value: depositValue || 0,
        },
      ])

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Service added!")

      setName("")
      setPrice("")
      setDuration("")
      setDepositValue("")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Service</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value)}
        >
          <option value="">Select Business</option>

          {businesses.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <br /><br />

        <input
          placeholder="Service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Deposit Amount (optional)"
          value={depositValue}
          onChange={(e) => setDepositValue(e.target.value)}
        />

        <br /><br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>
    </div>
  )
}
