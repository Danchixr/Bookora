import { updateBookingStatus } from "../actions";

import { getBooking } from "@/lib/bookings";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  CalendarDays,
  Clock3,
  Circle
} from "lucide-react";

import "./bookingdetails.css";

export default async function BookingDetailsPage({ params }) {

  const { id } = await params;

  const booking = await getBooking(id);

  if (!booking) {
    return <h2>Booking not found</h2>;
  }

  return (

    <main className="booking-details-page">

      <div className="booking-details-header">

        <Link
          href="/mybookings"
          className="back-btn"
        >
          <ArrowLeft size={22} />
        </Link>

        <h2>Booking Details</h2>

      </div>


      <section className="booking-customer-card">

        <div className="customer-avatar">
          {booking.customer_name.charAt(0)}
        </div>

        <div>

          <h3>{booking.customer_name}</h3>

          <p>{booking.services?.name}</p>

        </div>

      </section>


      <section className="booking-info-card">

        <div className="info-row">

          <CalendarDays size={20} />

          <div>

            <small>Date</small>

            <strong>{booking.date}</strong>

          </div>

        </div>


        <div className="info-row">

          <Clock3 size={20} />

          <div>

            <small>Time</small>

            <strong>{booking.time}</strong>

          </div>

        </div>


        <div className="info-row">

          <Circle size={14} />

          <div>

            <small>Status</small>

            <strong className={`status ${booking.status}`}>
              {booking.status}
            </strong>

          </div>

        </div>

      </section>

<div className="booking-actions">

  <form
    action={updateBookingStatus}
    className="booking-action-form"
  >

    <input
      type="hidden"
      name="booking_id"
      value={booking.id}
    />

    <input
      type="hidden"
      name="status"
      value="confirmed"
    />

    <button
      type="submit"
      className="accept-btn"
    >
      Accept Booking
    </button>

  </form>

  <form
    action={updateBookingStatus}
    className="booking-action-form"
  >

    <input
      type="hidden"
      name="booking_id"
      value={booking.id}
    />

    <input
      type="hidden"
      name="status"
      value="cancelled"
    />

    <button
      type="submit"
      className="decline-btn"
    >
      Decline Booking
    </button>

  </form>

</div>

    </main>

  );

}