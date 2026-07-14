import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default function ServicesHeader() {
  return (
    <>
      {/* Mobile Header */}
      <div className="services-mobile-header">

        <Link
  href="/dashboard"
  className="back-btn"
>
  <ArrowLeft size={24} strokeWidth={2.2} />
</Link>


        <h2>
          My Services
        </h2>


        <Link
          href="/add-service"
          className="mobile-add-btn"
        >
          <Plus size={24} strokeWidth={2.5}/>
        </Link>

      </div>



      {/* Desktop Header */}
      <div className="page-header">

        <div>

          <h1>
            My Services
          </h1>

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
    </>
  );
}