"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServiceErrorToast() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="service-error-toast">

      <div className="service-error-content">
        <strong>
          Business profile required
        </strong>

        <p>
          Create your business profile to continue.
        </p>
      </div>

      <Link
        href="/settings"
        className="service-error-btn"
      >
        Create Business Profile
      </Link>

    </div>
  );
}