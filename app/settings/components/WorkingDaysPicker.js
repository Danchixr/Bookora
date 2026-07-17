"use client";

import { useState } from "react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WorkingDaysPicker({
  name = "working_days",
  label = "Working Days",
  defaultDays = [],
}) {
  const [selected, setSelected] = useState(defaultDays || []);

  function toggleDay(day) {
    if (selected.includes(day)) {
      setSelected(selected.filter((d) => d !== day));
    } else {
      setSelected([...selected, day]);
    }
  }

  return (
    <div className="form-group">

      <label>{label}</label>

      <div className="working-days-field">

        {selected.length === 0 ? (
          <span className="placeholder">
            Select working days
          </span>
        ) : 
          selected.map((day) => (
  <button
    key={day}
    type="button"
    className="day-chip"
    onClick={() => toggleDay(day)}
  >
    {day} ✕
  </button>
))}
        

      </div>

      <div className="days-grid">

        {DAYS.map((day) => (

          <button
            key={day}
            type="button"
            className={
              selected.includes(day)
                ? "day-btn active"
                : "day-btn"
            }
            onClick={() => toggleDay(day)}
          >
            {day}
          </button>

        ))}

      </div>

      <input
        type="hidden"
        name={name}
        value={JSON.stringify(selected)}
        readOnly
      />

    </div>
  );
}