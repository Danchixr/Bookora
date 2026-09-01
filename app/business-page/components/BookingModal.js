"use client";

import BookingSummary from "./BookingSummary";
import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Clock3,
  WalletCards,
} from "lucide-react";

export default function BookingModal({ service, onClose }) {
 const [showSummary, setShowSummary] = useState(false);

  const [selectedDate, setSelectedDate] = useState(12);
  const [selectedHour, setSelectedHour] = useState(7);
  const [selectedMinute, setSelectedMinute] = useState(30);
  const [period, setPeriod] = useState("AM");

  const days = [
    28, 29, 30, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 1,
  ];

  const handleContinue = () => {
  setShowSummary(true);
};

    // We'll connect this to Booking Summary next.

  

  if (showSummary) {
  return (
    <BookingSummary
      service={service}
      selectedDate={selectedDate}
      selectedHour={selectedHour}
      selectedMinute={selectedMinute}
      period={period}
      onBack={() => setShowSummary(false)}
      onClose={onClose}
    />
  );
}
  return (
    <div className="booking-modal-overlay">

      <div className="booking-modal">

        {/* Drag handle */}
        <div className="booking-modal-handle" />

        {/* Close */}
        <button
          className="booking-modal-close"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* SERVICE DETAILS */}
        <div className="booking-service">

          <img
            src={service.image}
            alt={service.name}
            className="booking-service-image"
          />

          <div className="booking-service-info">

            <h2>{service.name}</h2>

            <div className="booking-price-row">
              <strong>{service.price}</strong>
              <span>•</span>
              <span>{service.duration}</span>
            </div>

            <p>
              {service.description}
            </p>

            <div className="deposit-box">

              <WalletCards size={22} />

              <div>
                <span>Pay 20% deposit to confirm booking</span>

                <strong>
                  Deposit: {service.deposit}
                </strong>
              </div>

            </div>

          </div>

        </div>

        {/* DATE */}
        <div className="booking-section">

          <h3>Select Date</h3>

          <div className="calendar-header">

            <button>
              <ChevronLeft size={20} />
            </button>

            <strong>July 2026</strong>

            <button>
              <ChevronRight size={20} />
            </button>

          </div>

          <div className="calendar-weekdays">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          <div className="calendar-grid">

            {days.map((day, index) => {

              const isCurrentMonth =
                index >= 3 && index <= 33;

              const isSelected =
                day === selectedDate && isCurrentMonth;

              return (
                <button
                  key={index}
                  className={`
                    calendar-day
                    ${!isCurrentMonth ? "muted" : ""}
                    ${isSelected ? "selected" : ""}
                  `}
                  onClick={() => {
                    if (isCurrentMonth) {
                      setSelectedDate(day);
                    }
                  }}
                >
                  {day}
                </button>
              );
            })}

          </div>

        </div>

        {/* TIME */}
        <div className="booking-section">

          <h3>Select Time</h3>

          <p className="time-description">
            Scroll to choose your preferred time
          </p>

          <div className="time-picker">

            <div className="time-column">

              {[6, 7, 8, 9].map((hour) => (

                <button
                  key={hour}
                  className={
                    selectedHour === hour
                      ? "time-option selected"
                      : "time-option"
                  }
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour}
                </button>

              ))}

            </div>

            <div className="time-column">

              {[0, 30, 45, 15].map((minute) => (

                <button
                  key={minute}
                  className={
                    selectedMinute === minute
                      ? "time-option selected"
                      : "time-option"
                  }
                  onClick={() => setSelectedMinute(minute)}
                >
                  {String(minute).padStart(2, "0")}
                </button>

              ))}

            </div>

            <div className="period-column">

              <button
                className={
                  period === "AM"
                    ? "period-option selected"
                    : "period-option"
                }
                onClick={() => setPeriod("AM")}
              >
                AM
              </button>

              <button
                className={
                  period === "PM"
                    ? "period-option selected"
                    : "period-option"
                }
                onClick={() => setPeriod("PM")}
              >
                PM
              </button>

            </div>

          </div>

        </div>

        {/* SELECTED DATE/TIME */}
        <div className="booking-selection-summary">

          <Clock3 size={24} />

          <div>
            <span>Selected Date</span>
            <strong>{selectedDate} July 2026</strong>
          </div>

          <div>
            <span>Selected Time</span>

            <strong>
              {selectedHour}:
              {String(selectedMinute).padStart(2, "0")} {period}
            </strong>
          </div>

        </div>

        {/* CONTINUE */}
        <button
          className="booking-continue-btn"
          onClick={handleContinue}
        >
          Continue
        </button>

      </div>

    </div>
  );
}