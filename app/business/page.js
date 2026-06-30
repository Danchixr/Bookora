"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function BusinessPage() {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [openingTime, setOpeningTime] = useState("")
  const [closingTime, setClosingTime] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("businesses").insert([
      {
        name,
        location,
        phone,
        email,
        description,
        opening_time: openingTime,
        closing_time: closingTime,
      },
    ])

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Business created!")

      setName("")
      setLocation("")
      setPhone("")
      setEmail("")
      setDescription("")
      setOpeningTime("")
      setClosingTime("")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Business</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Business name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Business Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <label>Opening Time</label>
        <br />
        <input
          type="time"
          value={openingTime}
          onChange={(e) => setOpeningTime(e.target.value)}
        />

        <br /><br />

        <label>Closing Time</label>
        <br />
        <input
          type="time"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Business"}
        </button>
      </form>
    </div>
  )
}