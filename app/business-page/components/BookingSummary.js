"use client";

import { createBooking } from "../actions.js";
import { useState } from "react";
import CustomerDetails from "./CustomerDetails";

import {
  X,
  ArrowLeft,
  CalendarDays,
  Clock3,
  Timer,
  Store,
  ShieldCheck,
} from "lucide-react";

function formatDate(dateString) {
  if (!dateString) return "Not selected";

  const date = new Date(`${dateString}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Not selected";
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(value) {
  if (typeof value === "string" && value.includes("₦")) {
    return value;
  }

  return `₦${Number(value || 0).toLocaleString("en-NG")}`;
}

export default function BookingSummary({
  service,
  business,
  selectedDate,
  selectedTime,
  selectedHour,
  selectedMinute,
  period,
  onBack,
  onClose,
}) {
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  const [submitting, setSubmitting] = useState(false);
const [submissionError, setSubmissionError] = useState("");
const [bookingId, setBookingId] = useState(null);

  const formattedTime = selectedTime
    ? (() => {
        const [hours, minutes] = selectedTime.split(":").map(Number);

        return `${hours % 12 || 12}:${String(minutes).padStart(
          2,
          "0"
        )} ${hours >= 12 ? "PM" : "AM"}`;
      })()
    : `${selectedHour}:${String(selectedMinute).padStart(
        2,
        "0"
      )} ${period}`;

  const servicePrice = formatPrice(service.price);

  const depositAmount =
    service.deposit_amount !== undefined
      ? formatPrice(service.deposit_amount)
      : formatPrice(service.deposit);

  const hasDeposit =
    service.deposit_amount !== undefined
      ? Number(service.deposit_amount) > 0
      : Number(
          String(service.deposit || "0").replace(/[^\d.]/g, "")
        ) > 0;

 async function handleCustomerContinue(customerDetails) {
  if (submitting) return;

  setSubmitting(true);
  setSubmissionError("");

  try {
    const result = await createBooking({
      serviceId: service.id,
      date: selectedDate,
      time: selectedTime,
      customerName: customerDetails.customerName,
      customerPhone: customerDetails.customerPhone,
    });

    if (!result.success) {
      setSubmissionError(result.error || "Unable to submit booking.");
      return;
    }

    setBookingId(result.bookingId);
  } catch (error) {
    console.error("BOOKING SUBMISSION ERROR:", error);
    setSubmissionError("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
}

  // CUSTOMER DETAILS SCREEN
 if (bookingId) {
  return (
    <div className="booking-modal-overlay">
      <div className="booking-summary-modal">
        <div className="summary-header">
          <div>
            <h2>Booking Submitted!</h2>
            <p>Your booking request has been received.</p>
          </div>
        </div>

        <div className="customer-details-form">
          <div className="customer-details-card">
            <p>
              Your booking is pending confirmation from{" "}
              <strong>{business?.name || "the business"}</strong>.
            </p>

            <p>
              <strong>Service:</strong> {service.name}
            </p>

            <p>
              <strong>Date:</strong> {formatDate(selectedDate)}
            </p>

            <p>
              <strong>Time:</strong> {formattedTime}
            </p>

            <p>
              No payment has been collected.
            </p>

            <button
              type="button"
              className="summary-continue-btn"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

if (showCustomerDetails) {
  return (
    <CustomerDetails
      onBack={() => {
        if (!submitting) setShowCustomerDetails(false);
      }}
      onClose={() => {
        if (!submitting) onClose();
      }}
      onContinue={handleCustomerContinue}
      submitting={submitting}
      submissionError={submissionError}
    />
  );
}

  // BOOKING SUMMARY SCREEN
  return (
    <div className="booking-modal-overlay">
      <div className="booking-summary-modal">

        {/* HEADER */}
        <div className="summary-header">
          <button
            type="button"
            className="summary-back-btn"
            onClick={onBack}
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h2>Booking Summary</h2>
            <p>
              Please review your booking details before proceeding.
            </p>
          </div>

          <button
            type="button"
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
              {service.image || service.image_url ? (
                <img
                  src={service.image || service.image_url}
                  alt={service.name}
                />
              ) : (
                <div className="booking-service-image" />
              )}

              <div>
                <h3>{service.name}</h3>

                <div className="summary-price">
                  <strong>{servicePrice}</strong>
                  <span>•</span>
                  <span>{service.duration}</span>
                </div>

                <p>{service.description}</p>
              </div>
            </div>

            {/* BOOKING DETAILS */}
            <div className="summary-details">

              <div className="summary-detail">
                <CalendarDays size={19} />
                <span>Date</span>
                <strong>{formatDate(selectedDate)}</strong>
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
                <strong>{business?.name || "Business"}</strong>
              </div>
            </div>

            {/* BOOKING NOTE */}
            <div className="summary-note">
              <ShieldCheck size={20} />

              <p>
                {hasDeposit
                  ? `This service requires a deposit of ${depositAmount}. Payment has not been collected yet.`
                  : "No deposit is required for this service. Your booking has not been submitted yet."}
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="payment-summary">
            <h3>Cost Summary</h3>

            <div className="payment-row">
              <span>Total Service Cost</span>
              <strong>{servicePrice}</strong>
            </div>

            <div className="payment-row">
              <span>Required Deposit</span>
              <strong>{depositAmount}</strong>
            </div>

            <div className="payment-total">
              <span>Payment Collected</span>
              <strong>₦0</strong>
            </div>

            <div className="payment-info">
              <div>
                <Clock3 size={19} />

                <div>
                  <strong>Next Step</strong>
                  <p>
                    Enter your contact details to continue with
                    your booking.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CONTINUE */}
        <button
          type="button"
          className="summary-continue-btn"
          onClick={() => setShowCustomerDetails(true)}
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