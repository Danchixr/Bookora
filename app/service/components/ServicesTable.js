import Link from "next/link";
import { deleteServiceAction } from "@/app/add-service/actions";

export default function ServicesTable({ services }) {
  return (

    <section className="services-table">

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

    </section>

  );
}