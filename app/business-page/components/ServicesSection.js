"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      name: "Swedish Massage",
      duration: "60 mins",
      price: "₦25,000",
      image: "https://picsum.photos/300/200?1",
      description:
        "Relax and release tension with our soothing Swedish massage therapy.",
      deposit: "₦5,000",
    },
    {
      id: 2,
      name: "Deep Tissue Massage",
      duration: "90 mins",
      price: "₦35,000",
      image: "https://picsum.photos/300/200?2",
      description:
        "Relieve muscle tension and reduce stress with our deep tissue massage therapy.",
      deposit: "₦7,000",
    },
    {
      id: 3,
      name: "Facial Treatment",
      duration: "45 mins",
      price: "₦18,000",
      image: "https://picsum.photos/300/200?3",
      description:
        "A refreshing facial treatment designed to leave your skin feeling clean and refreshed.",
      deposit: "₦3,600",
    },
  ];

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

          {services.map((service) => (

            <div
              key={service.id}
              className="service-card"
            >

              <img
                src={service.image}
                alt={service.name}
                className="service-image"
              />

              <div className="service-info">

                <h3>{service.name}</h3>

                <p className="service-duration">
                  {service.duration}
                </p>

                <div className="service-footer">

                  <span className="service-price">
                    {service.price}
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

          ))}

        </div>

      </section>

      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}