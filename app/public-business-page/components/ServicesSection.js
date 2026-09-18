export default function ServicesSection({ services }) {
  return (
    <section className="services-section">

      <div className="section-header">
        <h2>Services</h2>

        <button className="section-link">
          See all →
        </button>
      </div>

      <div className="services-list">

        {services.length === 0 ? (
          <p>
            This business has no services yet.
          </p>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="service-card"
            >

              <img
                src={
                  service.image_url ||
                  "https://picsum.photos/300/200"
                }
                alt={service.name}
                className="service-image"
              />

              <div className="service-info">

                <h3>{service.name}</h3>

                <p className="service-duration">
                  {service.duration
                    ? `${service.duration} mins`
                    : "Duration not set"}
                </p>

                <div className="service-footer">

                  <span className="service-price">
                    ₦{Number(service.price || 0).toLocaleString()}
                  </span>

                  <button className="service-select-btn">
                    Select
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </section>
  );
}