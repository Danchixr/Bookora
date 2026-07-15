"use client";

import { useState } from "react";

import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import {  X } from "lucide-react";


export default function MyBookingsHeader() {
const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="mybookings-mobile-header">

      <Link
        href="/dashboard"
        className="back-btn"
      >
        <ArrowLeft size={24} strokeWidth={2.2} />
      </Link>


      {searchOpen ? (
  <input
  className="header-search"
  type="text"
  placeholder="Search customer..."
  autoFocus
/>
) : (
 <div>

  <h1 className="page-title">
    Bookings
  </h1>

  <p className="page-subtitle">
    Manage customer appointments
  </p>

</div>
)}


      <button
  className="search-btn"
  onClick={() => setSearchOpen(!searchOpen)}
>
  {searchOpen ? (
    <X size={22} />
  ) : (
    <Search size={22} />
  )}
</button>

    </div>
  );
}