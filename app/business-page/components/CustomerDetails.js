"use client";

import { useState } from "react";
import { ArrowLeft, X, UserRound, Phone } from "lucide-react";

export default function CustomerDetails({
  onBack,
  onClose,
  onContinue,
  submitting = false,
  submissionError = "",
}) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const name = customerName.trim();
    const phone = customerPhone.trim();

    if (!name || !phone) {
      setError("Please enter your name and phone number.");
      return;
    }

    setError("");

    onContinue({
      customerName: name,
      customerPhone: phone,
    });
  }

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
            <h2>Customer Details</h2>
            <p>Enter your contact information for this booking.</p>
          </div>

          <button
            type="button"
            className="summary-close-btn"
            onClick={onClose}
          >
            <X size={21} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="customer-details-form">
          <div className="customer-details-card">
            <div className="summary-detail">
              <UserRound size={19} />
              <label htmlFor="customer-name">Full Name</label>
            </div>

            <input
              id="customer-name"
              type="text"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />

            <div className="summary-detail">
              <Phone size={19} />
              <label htmlFor="customer-phone">Phone Number</label>
            </div>

            <input
              id="customer-phone"
              type="tel"
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              placeholder="Enter your phone number"
              autoComplete="tel"
              required
            />

            {error && <p role="alert">{error}</p>}

            {submissionError && (
  <p role="alert" className="customer-form-error">
    {submissionError}
  </p>
)}

            <button
  type="submit"
  className="summary-continue-btn"
  disabled={submitting}
>
  {submitting ? "Submitting booking..." : "Continue"}
</button>

          </div>
        </form>

      </div>
    </div>
  );
}