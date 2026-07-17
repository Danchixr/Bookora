"use client";

import { useState } from "react";

export default function WithdrawFilters() {

  const [activeFilter, setActiveFilter] = useState("total");

  return (
      
      <div className="withdraw-history">

      <h3>
        Recent Withdrawals
      </h3>

    <div className="withdraw-filters">

      <button
        className={activeFilter === "total" ? "filter-chip active" : "filter-chip"}
        onClick={() => setActiveFilter("total")}
      >
        Total
      </button>

      <button
        className={activeFilter === "pending" ? "filter-chip active" : "filter-chip"}
        onClick={() => setActiveFilter("pending")}
      >
        Pending
      </button>

      <button
        className={activeFilter === "month" ? "filter-chip active" : "filter-chip"}
        onClick={() => setActiveFilter("month")}
      >
        This Month
      </button>

    </div>

    </div>

  );

}