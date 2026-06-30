"use client"

"use client"

import { useState, useEffect, useMemo } from "react"
import Wheel from "./WheelComponent"

export default function TimeWheelPicker({
  availableSlots = [],
  onTimeChange,
}) {
  // Build a structured list of available times
  const slots = useMemo(() => {
    return availableSlots.map((slot) => {
      const [h, m] = slot.split(":")
      const hour24 = Number(h)

      return {
        value: slot,
        hour:
          hour24 === 0
            ? 12
            : hour24 > 12
            ? hour24 - 12
            : hour24,
        minute: m,
        period: hour24 >= 12 ? "PM" : "AM",
      }
    })
  }, [availableSlots])

  // First available slot
  const firstSlot = slots[0]

  const [hour, setHour] = useState(firstSlot?.hour || 12)
  const [minute, setMinute] = useState(firstSlot?.minute || "00")
  const [period, setPeriod] = useState(firstSlot?.period || "AM")

  // Reset selection whenever available slots change
  useEffect(() => {
    if (!firstSlot) return

    setHour(firstSlot.hour)
    setMinute(firstSlot.minute)
    setPeriod(firstSlot.period)
  }, [firstSlot])

  const periods = [...new Set(slots.map((s) => s.period))]

  const hours = [
    ...new Set(
      slots
        .filter((s) => s.period === period)
        .map((s) => s.hour)
    ),
  ]

  const minutes = [
    ...new Set(
      slots
        .filter(
          (s) =>
            s.period === period &&
            s.hour === hour
        )
        .map((s) => s.minute)
    ),
  ]

  // Keep hour valid
  useEffect(() => {
    if (!hours.includes(hour) && hours.length) {
      setHour(hours[0])
    }
  }, [hours, hour])

  // Keep minute valid
  useEffect(() => {
    if (!minutes.includes(minute) && minutes.length) {
      setMinute(minutes[0])
    }
  }, [minutes, minute])

  // Send selected slot to BookingPage
  useEffect(() => {
    const selected = slots.find(
      (s) =>
        s.hour === hour &&
        s.minute === minute &&
        s.period === period
    )

    if (selected) {
      onTimeChange?.(selected.value)
    }
  }, [slots, hour, minute, period, onTimeChange])

  return (
    <div>
      <h3>Select Time</h3>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Wheel
          items={hours}
          selected={hour}
          onChange={setHour}
        />

        <Wheel
          items={minutes}
          selected={minute}
          onChange={setMinute}
        />

        <Wheel
          items={periods}
          selected={period}
          onChange={setPeriod}
        />
      </div>

      <p>
        Selected time: {hour}:{minute} {period}
      </p>
    </div>
  )
}