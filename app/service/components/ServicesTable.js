import Link from "next/link";
import { Pencil, Trash2, Clock3, CircleCheck } from "lucide-react";
import { deleteServiceAction } from "@/app/add-service/actions";

export default function ServicesTable({ services }) {
  return (

    <section className="services-table">

        {/* MOBILE VIEW */}
      <div className="mobile-services-list">

  {services.map((service) => (

    <div
      className="mobile-service-card"
      key={service.id}
    >

      <div className="mobile-service-top">

        <div className="mobile-service-image">

          <img
            src={
              service.image_url ||
              "https://via.placeholder.com/70"
            }
            alt={service.name}
          />

        </div>

        <div>

          <h3>{service.name}</h3>

          <p>₦{service.price}</p>

        </div>

      </div>


      <div className="mobile-service-info">

        <div>

          <span>Duration</span>

          <strong>

            <Clock3 size={15} />

            {service.duration} mins

          </strong>

        </div>


        <div>

          <span>Status</span>

          <strong className="mobile-active">

            <CircleCheck size={15} />

            Active

          </strong>

        </div>

      </div>


      <div className="mobile-service-actions">

        <Link
          href={`/service/edit/${service.id}`}
          className="mobile-action-btn edit-btn"
        >

          <Pencil size={17} />

          Edit

        </Link>


        <form action={deleteServiceAction}>

          <input
            type="hidden"
            name="service_id"
            value={service.id}
          />

          <button
            type="submit"
            className="mobile-action-btn delete-btn"
          >

            <Trash2 size={17} />

            Delete

          </button>

        </form>

      </div>

    </div>

  ))}

</div>

  {/* DESKTOP VIEW */}
      <div className="desktop-services-table">

      <table>

        <thead>

          <tr>
            <th>Service</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

       <tbody>

  {services.length === 0 ? (

    <tr>

      <td colSpan="5">
        No services yet.
      </td>

    </tr>

  ) : (

    services.map((service) => (

      <tr key={service.id}>

        <td className="service-cell">

          <img
  src={
    service.image_url ||
    "https://via.placeholder.com/60x60?text=No+Image"
  }
  alt={service.name}
/>

          <span>
            {service.name}
          </span>

        </td>

        <td>
          ₦{service.price}
        </td>

        <td>
          {service.duration} mins
        </td>

        <td>

          <span className="status active">
            ● Active
          </span>

        </td>

        <td className="actions">

          <Link href={`/service/edit/${service.id}`}>
             ✏️
          </Link>

          <form action={deleteServiceAction}>

  <input
    type="hidden"
    name="service_id"
    value={service.id}
  />

  <button type="submit">
  🗑️
</button>

</form>

        </td>

      </tr>

    ))

  )}

</tbody>

      </table>

      </div>

    </section>

  );
}