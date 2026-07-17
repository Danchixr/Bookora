"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AccordionCard({

  title,
  children,

}) {

  const [open, setOpen] = useState(false);

  return (

    <section
      className={`settings-card ${open ? "active" : ""}`}
    >

      <div
        className="accordion-header"
        onClick={() => setOpen(!open)}
      >

        <h2>{title}</h2>

        <ChevronDown
          className={`accordion-icon ${open ? "rotate" : ""}`}
          size={18}
        />

      </div>

      {open && (

        <div className="accordion-content">

          {children}

        </div>

      )}

    </section>

  );

}