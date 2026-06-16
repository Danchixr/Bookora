"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function BusinessPage() {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("businesses").insert([
      {
        name,
        location,
      },
    ])

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Business created!")
      setName("")
      setLocation("")
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

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Business"}
        </button>
      </form>
    </div>
  )
}