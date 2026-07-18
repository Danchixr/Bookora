export default function ServicesSection() {
  const services = [
    {
      id: 1,
      name: "Swedish Massage",
      duration: "60 mins",
      price: "₦25,000",
      image: "https://picsum.photos/300/200?1",
    },
    {
      id: 2,
      name: "Deep Tissue Massage",
      duration: "90 mins",
      price: "₦35,000",
      image: "https://picsum.photos/300/200?2",
    },
    {
      id: 3,
      name: "Facial Treatment",
      duration: "45 mins",
      price: "₦18,000",
      image: "https://picsum.photos/300/200?3",
    },
  ];

  return (
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

                <button className="service-select-btn">
                  Select
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}