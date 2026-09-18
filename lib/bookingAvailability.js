const BUFFER_MINUTES = 15;

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function toTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export function generateAvailableSlots({
  date,
  service,
  business,
  bookings = [],
}) {
  if (!date || !service || !business) {
    return [];
  }

  const {
    opening_time,
    closing_time,
    working_days,
  } = business;

  if (!opening_time || !closing_time) {
    return [];
  }

  // Check whether the selected date is a working day.
  const selectedDate = new Date(`${date}T12:00:00`);

  if (Number.isNaN(selectedDate.getTime())) {
    return [];
  }

  const dayName = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  if (!Array.isArray(working_days) || !working_days.includes(dayName)) {
    return [];
  }

  const opening = toMinutes(opening_time);
  const closing = toMinutes(closing_time);
  const duration = parseInt(service.duration, 10);

  if (!Number.isFinite(duration) || duration <= 0) {
    return [];
  }

  const slots = [];

  // Only bookings for this service should block its time slots.
  const occupiedBookings = bookings.filter(
    (booking) =>
      booking.service_id === service.id &&
      booking.date === date &&
      booking.status !== "cancelled"
  );

  // Generate slots at 15-minute intervals.
  for (
    let start = opening;
    start + duration <= closing;
    start += 15
  ) {
    const end = start + duration;

    const hasConflict = occupiedBookings.some((booking) => {
      const existingStart = toMinutes(booking.time);

      const existingDuration = Number(
        booking.services?.duration ?? service.duration
      );

      const existingEnd = existingStart + existingDuration;

      // Apply the 15-minute clearance between appointments.
      return (
        start < existingEnd + BUFFER_MINUTES &&
        end + BUFFER_MINUTES > existingStart
      );
    });

    if (!hasConflict) {
      slots.push(toTime(start));
    }
  }

  return slots;
}