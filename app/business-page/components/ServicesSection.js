"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

export default function ServicesSection({
  services = [],
  business,
}) {
  const [selectedService, setSelectedService] = useState(null);

  function formatPrice(price) {
    return `₦${Number(price || 0).toLocaleString("en-NG")}`;
  }

  return (
    <>
      <section className="services-section">
        <div className="section-header">
          <h2>Services</h2>

          <button className="section-link">
            See all →
          </button>
        </div>

        <div className="services-list">
          {services.length === 0 ? (
            <p>No services available yet.</p>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="service-card"
              >
                {service.image_url ? (
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="service-image"
                  />
                ) : (
                  <div className="service-image" />
                )}

                <div className="service-info">
                  <h3>{service.name}</h3>

                  <p className="service-duration">
                    {service.duration} mins
                  </p>

                  <div className="service-footer">
                    <span className="service-price">
                      {formatPrice(service.price)}
                    </span>

                    <button
                      className="service-select-btn"
                      onClick={() => setSelectedService(service)}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {selectedService && (
       <BookingModal
  service={{
    ...selectedService,
    image: selectedService.image_url,
    duration: `${selectedService.duration} mins`,
    price: formatPrice(selectedService.price),
    deposit: formatPrice(selectedService.deposit_amount),
  }}
  business={business}
  onClose={() => setSelectedService(null)}
/>
      )}
    </>
  );
}