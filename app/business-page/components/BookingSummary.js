"use client";

import {
  X,
  ArrowLeft,
  CalendarDays,
  Clock3,
  Timer,
  Store,
  UserRound,
  ShieldCheck,
  Ban,
} from "lucide-react";

export default function BookingSummary({
  service,
  selectedDate,
  selectedHour,
  selectedMinute,
  period,
  onBack,
  onClose,
}) {
  const formattedTime = `${selectedHour}:${String(selectedMinute).padStart(
    2,
    "0"
  )} ${period}`;

  return (
    <div className="booking-modal-overlay">

      <div className="booking-summary-modal">

        {/* HEADER */}
        <div className="summary-header">

          <button
            className="summary-back-btn"
            onClick={onBack}
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h2>Booking Summary</h2>
            <p>Please review your booking details before proceeding.</p>
          </div>

          <button
            className="summary-close-btn"
            onClick={onClose}
          >
            <X size={21} />
          </button>

        </div>

        {/* MAIN CONTENT */}
        <div className="summary-content">

          {/* LEFT SIDE */}
          <div className="summary-booking-card">

            <div className="summary-service">

              <img
                src={service.image}
                alt={service.name}
              />

              <div>
                <h3>{service.name}</h3>

                <div className="summary-price">
                  <strong>{service.price}</strong>
                  <span>•</span>
                  <span>{service.duration}</span>
                </div>

                <p>{service.description}</p>
              </div>

            </div>

            {/* DETAILS */}

            <div className="summary-details">

              <div className="summary-detail">
                <CalendarDays size={19} />
                <span>Date</span>
                <strong>{selectedDate} July 2026</strong>
              </div>

              <div className="summary-detail">
                <Clock3 size={19} />
                <span>Time</span>
                <strong>{formattedTime}</strong>
              </div>

              <div className="summary-detail">
                <Timer size={19} />
                <span>Duration</span>
                <strong>{service.duration}</strong>
              </div>

              <div className="summary-detail">
                <Store size={19} />
                <span>Business</span>
                <strong>Glow Spa</strong>
              </div>

              <div className="summary-detail">
                <UserRound size={19} />
                <span>Therapist</span>
                <strong>Any Available Therapist</strong>
              </div>

            </div>

            {/* DEPOSIT NOTE */}

            <div className="summary-note">

              <ShieldCheck size={20} />

              <p>
                A 20% deposit is required to confirm your booking.
                <br />
                The remaining balance will be paid at the spa.
              </p>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="payment-summary">

            <h3>Payment Summary</h3>

            <div className="payment-row">
              <span>Total Service Cost</span>
              <strong>{service.price}</strong>
            </div>

            <div className="payment-row">
              <span>Deposit (20%)</span>
              <strong>{service.deposit}</strong>
            </div>

            <div className="payment-total">
              <span>Deposit to Pay Now</span>
              <strong>{service.deposit}</strong>
            </div>

            {/* INFO */}

            <div className="payment-info">

              <div>
                <ShieldCheck size={19} />

                <div>
                  <strong>Secure Payment</strong>
                  <p>Your payment is safe and encrypted.</p>
                </div>
              </div>

              <div>
                <Ban size={19} />

                <div>
                  <strong>Easy Cancellation</strong>
                  <p>Cancel up to 6 hours before your appointment.</p>
                </div>
              </div>

              <div>
                <Clock3 size={19} />

                <div>
                  <strong>On-time Guarantee</strong>
                  <p>We respect your time.</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* CONTINUE */}
        <button
          className="summary-continue-btn"
          onClick={() => {
            // Customer details will be added next
            console.log("Continue to customer details");
          }}
        >
          Continue to Customer Details
          <ArrowLeft
            size={20}
            style={{ transform: "rotate(180deg)" }}
          />
        </button>

      </div>

    </div>
  );
}