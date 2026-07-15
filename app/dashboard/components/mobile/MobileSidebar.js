"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function MobileSidebar({ onClose }) {
  const pathname = usePathname();
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "300px",
        height: "100vh",
        background: "#fff",
        zIndex: 99999,
        padding: "24px",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
      >
        <X size={24} />
      </button>

      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "40px",
  }}
>
  <div
    style={{
      width: "46px",
      height: "46px",
      borderRadius: "50%",
      background: "#6C4CF1",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "700",
      fontSize: "18px",
    }}
  >
    B
  </div>

  <h2
    style={{
      margin: 0,
      fontSize: "24px",
      fontWeight: "700",
    }}
  >
    Bookora
  </h2>
</div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "36px",
  }}
>
  <img
    src="https://i.pravatar.cc/150?img=32"
    alt=""
    style={{
      width: "56px",
      height: "56px",
      borderRadius: "50%",
    }}
  />

  <div>
    <h3
      style={{
        margin: 0,
        fontSize: "18px",
      }}
    >
      Glow Spa
    </h3>

    <p
      style={{
        marginTop: "4px",
        color: "#777",
        fontSize: "14px",
      }}
    >
      Spa & Wellness
    </p>
  </div>
</div>

<nav
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }}
>
  
 <Link
  href="/dashboard"
  className={pathname === "/dashboard" ? "active" : ""}
  style={{
    textDecoration: "none",
    color: pathname === "/dashboard" ? "#6C4CF1" : "#222",
    background: pathname === "/dashboard" ? "#F1EDFF" : "transparent",
    padding: "12px 16px",
    borderRadius: "12px",
    fontWeight: "600",
    display: "block",
  }}
>
  Dashboard
</Link>
  

   <Link
  href="/mybookings"
  className={pathname.startsWith("/mybookings") ? "active" : ""}
  style={{
    textDecoration: "none",
    color: pathname.startsWith("/bookings")
      ? "#6C4CF1"
      : "#222",
    background: pathname.startsWith("/bookings")
      ? "#F1EDFF"
      : "transparent",
    padding: "12px 16px",
    borderRadius: "12px",
    fontWeight: "600",
    display: "block",
  }}
>
  Bookings
</Link>


  <Link
    href="/service"
    className={pathname.startsWith("/service") ? "active" : ""}
    style={{
  textDecoration: "none",
  color: "#222",
  padding: "12px 16px",
  borderRadius: "12px",
  fontWeight: "600",
}}
  >
    Services
  </Link>

 <Link href="#"
 
 style={{
  textDecoration: "none",
  color: "#222",
  padding: "12px 16px",
  borderRadius: "12px",
  fontWeight: "600",
}}
 >Withdraw</Link>

  <Link href="#"
  
  style={{
  textDecoration: "none",
  color: "#222",
  padding: "12px 16px",
  borderRadius: "12px",
  fontWeight: "600",
}}
  >Settings</Link>
</nav>

<div
  style={{
    marginTop: "40px",
    padding: "18px",
    borderRadius: "18px",
    background: "#F5F2FF",
  }}
>
  <h4
    style={{
      margin: 0,
      marginBottom: "6px",
    }}
  >
    Need Help?
  </h4>

  <p
    style={{
      margin: 0,
      color: "#777",
      fontSize: "14px",
    }}
  >
    Visit our Help Center
  </p>
</div>

<button
  style={{
    width: "100%",
    marginTop: "40px",
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #FFB8B8",
    background: "#FFF5F5",
    color: "#E53935",
    fontWeight: "600",
    cursor: "pointer",
  }}
>
  Log out
</button>
    </div>
  );
}