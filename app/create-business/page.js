"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import "./create-business.css"; 
import ImageUpload from "@/app/add-service/components/ImageUpload";
import WorkingDaysPicker from "@/app/settings/components/WorkingDaysPicker";

export default function Page() {
  return (
    <main className="create-business-page">

     <section className="form-card">

        <Link href="/" className="back-link">
  ← Back
</Link>

  <h2>Business Information</h2>

  <div className="settings-grids">

    <div className="form-group">
      <label>Business Name</label>

      <input
        name="name"
        type="text"
        placeholder="Glow Spa"
      />
    </div>

    <div className="form-group">
      <label>Phone Number</label>

      <input
        name="phone"
        type="text"
        placeholder="+234..."
      />
    </div>

    <div className="form-group">
      <label>Email</label>

      <input
        name="email"
        type="email"
        placeholder="hello@business.com"
      />
    </div>

    <div className="form-group">
      <label>Category</label>

      <select name="category">
        <option>Select Category</option>
        <option>Spa & Wellness</option>
        <option>Healthcare</option>
        <option>Beauty & Salon</option>
        <option>Fitness</option>
      </select>
    </div>

    <div className="form-group">
      <ImageUpload
        name="logo_url"
        label="Business Logo"
      />
    </div>

    <div className="form-group full-width">
      <ImageUpload
        name="banner_url"
        label="Business Banner"
      />
    </div>

    <div className="form-group full-width">

      <label>Description</label>

      <textarea
        name="description"
        rows={5}
        placeholder="Tell customers about your business..."
      />

    </div>

  </div>

</section>

                {/* CONTACT INFORMATION */}



<section className="form-card">

  <h2>Contact Information</h2>

  <div className="settings-grid">

    <div className="form-group">

      <label>Business Address</label>

      <input
        name="location"
        type="text"
        placeholder="Enter business address"
      />

    </div>

    <div className="form-group">

      <label>City</label>

      <input
        name="city"
        type="text"
        placeholder="City"
      />

    </div>

    <div className="form-group">

      <label>State</label>

      <input
        name="state"
        type="text"
        placeholder="State"
      />

    </div>

    <div className="form-group full-width">

      <label>Google Maps Link</label>

      <input
        name="google_maps_url"
        type="url"
        placeholder="Paste your Google Maps business link"
      />

    </div>

  </div>

</section>


           {/* BUSINESS LOCATION*/}



<section className="form-card">

  <h2>Business Availability</h2>

  <div className="settings-grid">

    <div className="form-group">

      <label>Opening Time</label>

      <input
        type="time"
        name="opening_time"
      />

    </div>

    <div className="form-group">

      <label>Closing Time</label>

      <input
        type="time"
        name="closing_time"
      />

    </div>

    <div className="form-group full-width">

      <WorkingDaysPicker
        name="working_days"
      />

    </div>

  </div>

</section>


    {/* CLOSING */}


<div className="submit-wrapper">

  <button className="create-business-btn">
    Create Business
  </button>

</div>
    </main>
  );
}