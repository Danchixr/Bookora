import Link from "next/link";

export default function ServicesHeader() {
  return (

    <div className="page-header">

      <div>

        <h1>My Services</h1>

        <p>
          Manage all your services and pricing
        </p>

      </div>

      <Link
  href="/add-service"
  className="add-service-btn"
>
  + Add New Service
</Link>

    </div>

  );
}