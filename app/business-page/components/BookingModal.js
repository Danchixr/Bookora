"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { generateAvailableSlots } from "@/lib/bookingAvailability";

import BookingSummary from "./BookingSummary";

import {
  X,
  ChevronLeft,
  ChevronRight,
  Clock3,
  WalletCards,
} from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatTime(time) {
  if (!time) return "No time selected";

  const [hours, minutes] = time.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";
  const hour = hours % 12 || 12;

  return `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
}

function getTimeParts(time) {
  const [hours, minutes] = time.split(":").map(Number);

  return {
    hour: hours % 12 || 12,
    minute: minutes,
    period: hours >= 12 ? "PM" : "AM",
  };
}

function formatPrice(price) {
  return `₦${Number(price || 0).toLocaleString("en-NG")}`;
}

export default function BookingModal({
  service,
  business,
  onClose,
}) {
  const supabase = useMemo(() => createClient(), []);

  const [showSummary, setShowSummary] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [bookings, setBookings] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const today = formatDate(new Date());

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const workingDays = business?.working_days || [];

  // Keep the original service fields unchanged.
  // The availability function can also handle "30 mins"
  // following the parseInt fix we made earlier.
  const serviceForAvailability = useMemo(
    () => ({
      ...service,
      duration: parseInt(service.duration, 10),
    }),
    [service]
  );

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentMonth]);

  // Load existing bookings for the selected service and date.
  useEffect(() => {
    let cancelled = false;

    async function fetchBookings() {
      setBookings([]);
      setSelectedTime("");
      setBookingError("");

      if (!selectedDate || !service?.id) {
        setLoadingSlots(false);
        return;
      }

      setLoadingSlots(true);

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          service_id,
          date,
          time,
          status,
          services(duration)
        `)
        .eq("service_id", service.id)
        .eq("date", selectedDate)
        .neq("status", "cancelled");

      if (cancelled) return;

      if (error) {
        console.error("AVAILABILITY FETCH ERROR:", error);

        setBookingError("Unable to load available times.");
        setLoadingSlots(false);
        return;
      }

      setBookings(data || []);
      setLoadingSlots(false);
    }

    fetchBookings();

    return () => {
      cancelled = true;
    };
  }, [selectedDate, service?.id, supabase]);

  // Generate available slots using our existing function.
  const availableSlots = useMemo(() => {
    if (!selectedDate || loadingSlots || bookingError) {
      return [];
    }

    const slots = generateAvailableSlots({
      date: selectedDate,
      service: serviceForAvailability,
      business,
      bookings,
    });

    // Remove times that have already passed today.
    if (selectedDate === today) {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      return slots.filter((slot) => {
        const [hours, minutes] = slot.split(":").map(Number);

        return hours * 60 + minutes > currentMinutes;
      });
    }

    return slots;
  }, [
    selectedDate,
    serviceForAvailability,
    business,
    bookings,
    loadingSlots,
    bookingError,
    today,
  ]);

  // Derive the three picker columns from real available slots.
  const selectedParts = selectedTime
    ? getTimeParts(selectedTime)
    : null;

  const periods = [
    ...new Set(
      availableSlots.map((slot) => getTimeParts(slot).period)
    ),
  ];

  const activePeriod = selectedParts?.period || periods[0] || "";

  const hours = [
    ...new Set(
      availableSlots
        .map(getTimeParts)
        .filter((slot) => slot.period === activePeriod)
        .map((slot) => slot.hour)
    ),
  ];

  const activeHour = selectedParts?.hour || hours[0] || null;

  const minutes = [
    ...new Set(
      availableSlots
        .map(getTimeParts)
        .filter(
          (slot) =>
            slot.period === activePeriod &&
            slot.hour === activeHour
        )
        .map((slot) => slot.minute)
    ),
  ];

  function selectTimePart(part, value) {
    const current = selectedParts || {
      period: activePeriod,
      hour: activeHour,
      minute: minutes[0],
    };

    const next = {
      ...current,
      [part]: value,
    };

    const matchingSlots = availableSlots.filter((slot) => {
      const time = getTimeParts(slot);

      if (part === "period") {
        return time.period === next.period;
      }

      if (part === "hour") {
        return (
          time.period === next.period &&
          time.hour === next.hour
        );
      }

      return (
        time.period === next.period &&
        time.hour === next.hour &&
        time.minute === next.minute
      );
    });

    if (!matchingSlots.length) return;

    // Preserve the selected minute when possible.
    // Otherwise choose the first genuinely available slot.
    const exactMatch = matchingSlots.find((slot) => {
      const time = getTimeParts(slot);

      return (
        time.hour === next.hour &&
        time.minute === next.minute &&
        time.period === next.period
      );
    });

    setSelectedTime(exactMatch || matchingSlots[0]);
    setBookingError("");
  }

  function changeMonth(amount) {
    setCurrentMonth(
      (previous) =>
        new Date(
          previous.getFullYear(),
          previous.getMonth() + amount,
          1
        )
    );

    setSelectedDate("");
    setSelectedTime("");
    setBookingError("");
  }

  function handleContinue() {
    if (!selectedDate || !selectedTime) {
      setBookingError("Please select a date and available time.");
      return;
    }

    if (!availableSlots.includes(selectedTime)) {
      setBookingError("This time is no longer available.");
      return;
    }

    setShowSummary(true);
  }

  // BOOKING SUMMARY
  if (showSummary) {
    const [hours24, minutes24] = selectedTime
      .split(":")
      .map(Number);

    return (
      <BookingSummary
        service={{
          ...service,
          image: service.image_url || service.image,
          price:
            typeof service.price === "number"
              ? formatPrice(service.price)
              : service.price,
          duration: `${parseInt(service.duration, 10)} mins`,
          deposit:
            service.deposit_amount !== undefined
              ? formatPrice(service.deposit_amount)
              : service.deposit,
        }}
        business={business}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedHour={hours24 % 12 || 12}
        selectedMinute={minutes24}
        period={hours24 >= 12 ? "PM" : "AM"}
        onBack={() => setShowSummary(false)}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">

        {/* DRAG HANDLE */}
        <div className="booking-modal-handle" />

        {/* CLOSE */}
        <button
          type="button"
          className="booking-modal-close"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* SERVICE DETAILS */}
        <div className="booking-service">

          {service.image_url || service.image ? (
            <img
              src={service.image_url || service.image}
              alt={service.name}
              className="booking-service-image"
            />
          ) : (
            <div className="booking-service-image" />
          )}

          <div className="booking-service-info">

            <h2>{service.name}</h2>

            <div className="booking-price-row">
              <strong>
                {typeof service.price === "number"
                  ? formatPrice(service.price)
                  : service.price}
              </strong>

              <span>•</span>

              <span>
                {parseInt(service.duration, 10)} mins
              </span>
            </div>

            <p>{service.description}</p>

            <div className="deposit-box">
              <WalletCards size={22} />

              <div>
                <span>Deposit required to confirm booking</span>

                <strong>
                  Deposit:{" "}
                  {service.deposit_amount !== undefined
                    ? formatPrice(service.deposit_amount)
                    : service.deposit}
                </strong>
              </div>
            </div>

          </div>
        </div>

        {/* DATE */}
        <div className="booking-section">

          <h3>Select Date</h3>

          <div className="calendar-header">

            <button
              type="button"
              onClick={() => changeMonth(-1)}
              disabled={
                currentMonth.getFullYear() ===
                  new Date().getFullYear() &&
                currentMonth.getMonth() ===
                  new Date().getMonth()
              }
            >
              <ChevronLeft size={20} />
            </button>

            <strong>{monthLabel}</strong>

            <button
              type="button"
              onClick={() => changeMonth(1)}
            >
              <ChevronRight size={20} />
            </button>

          </div>

          <div className="calendar-weekdays">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="calendar-grid">

            {calendarDays.map((date, index) => {
              if (!date) {
                return (
                  <span
                    key={`empty-${index}`}
                    className="calendar-day muted"
                  />
                );
              }

              const dateString = formatDate(date);

              const dayName = date.toLocaleDateString("en-US", {
                weekday: "long",
              });

              const disabled =
                dateString < today ||
                !workingDays.includes(dayName);

              const isSelected = selectedDate === dateString;

              return (
                <button
                  key={dateString}
                  type="button"
                  disabled={disabled}
                  className={`
                    calendar-day
                    ${disabled ? "muted" : ""}
                    ${isSelected ? "selected" : ""}
                  `}
                  onClick={() => {
                    setSelectedDate(dateString);
                    setSelectedTime("");
                    setBookingError("");
                  }}
                >
                  {date.getDate()}
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

          {loadingSlots ? (
            <p>Loading available times...</p>
          ) : bookingError === "Unable to load available times." ? (
            <p>Unable to load available times.</p>
          ) : availableSlots.length === 0 ? (
            <p>
              {selectedDate
                ? "No available times for this date."
                : "Select a date to see available times."}
            </p>
          ) : (
            <div className="time-picker">

              {/* HOURS */}
              <div className="time-column">

                {hours.map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    className={
                      activeHour === hour
                        ? "time-option selected"
                        : "time-option"
                    }
                    onClick={() =>
                      selectTimePart("hour", hour)
                    }
                  >
                    {hour}
                  </button>
                ))}

              </div>

              {/* MINUTES */}
              <div className="time-column">

                {minutes.map((minute) => (
                  <button
                    key={minute}
                    type="button"
                    className={
                      selectedParts?.minute === minute
                        ? "time-option selected"
                        : "time-option"
                    }
                    onClick={() =>
                      selectTimePart("minute", minute)
                    }
                  >
                    {String(minute).padStart(2, "0")}
                  </button>
                ))}

              </div>

              {/* AM / PM */}
              <div className="period-column">

                {periods.map((period) => (
                  <button
                    key={period}
                    type="button"
                    className={
                      activePeriod === period
                        ? "period-option selected"
                        : "period-option"
                    }
                    onClick={() =>
                      selectTimePart("period", period)
                    }
                  >
                    {period}
                  </button>
                ))}

              </div>

            </div>
          )}

        </div>

        {/* SELECTED DATE / TIME */}
        <div className="booking-selection-summary">

          <Clock3 size={24} />

          <div>
            <span>Selected Date</span>

            <strong>
              {selectedDate
                ? new Date(
                    `${selectedDate}T12:00:00`
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Not selected"}
            </strong>
          </div>

          <div>
            <span>Selected Time</span>

            <strong>
              {formatTime(selectedTime)}
            </strong>
          </div>

        </div>

        {/* ERROR */}
        {bookingError && (
          <p role="alert">{bookingError}</p>
        )}

        {/* CONTINUE */}
        <button
          type="button"
          className="booking-continue-btn"
          onClick={handleContinue}
          disabled={
            !selectedDate ||
            !selectedTime ||
            loadingSlots ||
            Boolean(bookingError)
          }
        >
          Continue
        </button>

      </div>
    </div>
  );
}