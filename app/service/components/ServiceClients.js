"use client";

import { useState } from "react";

import Sidebar from "../../dashboard/components/Sidebar";
import MobileSidebar from "../../dashboard/components/mobile/MobileSidebar";
import BottomNavigation from "../../dashboard/components/mobile/BottomNavigation";

import ServicesHeader from "./ServicesHeader";
import ServicesTable from "./ServicesTable";
import TableFooter from "./TableFooter";

export default function ServiceClient({ services }) {

  <ServicesHeader
  onMenuClick={() => {
    console.log("Opening menu");
    setMenuOpen(true);
  }}
/>

console.log("menuOpen =", menuOpen);
  return (
    <div className="dashboard-layout">

      {/* Desktop Sidebar */}
      <div className="desktop-sidebar-wrapper">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <>
          <div
            className="sidebar-overlay"
            onClick={() => setMenuOpen(false)}
          />

          <MobileSidebar
  onClose={() => setMenuOpen(false)}
/>
        </>
      )}

      <main className="services-main">

        <ServicesHeader
          onMenuClick={() => setMenuOpen(true)}
        />

        <ServicesTable services={services} />

        <TableFooter services={services} />

      </main>

      <div className="bottom-navigation">
        <BottomNavigation />
      </div>

    </div>
  );
}