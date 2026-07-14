import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AddServiceHeader({
  title = "Add New Service",
  subtitle = "Create and publish a new service",
}) {
  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-page-header">

        <Link
          href="/service"
          className="back-btn"
        >
          <ArrowLeft size={24} strokeWidth={2.2} />
        </Link>

        <h2>{title}</h2>

        <div style={{ width: 42 }} />

      </div>

      {/* Desktop Header */}
      <div className="page-header">

        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

      </div>
    </>
  );
}