import { Menu, Bell } from "lucide-react";
import {  X } from "lucide-react";

export default function MobileHeader({
  onMenuClick,
  menuOpen,
}) {
  return (
    <header className="mobile-header">

  <button
  className="menu-btn"
  onClick={onMenuClick}
>
  {menuOpen ? (
    <X size={24} strokeWidth={2.2} />
  ) : (
    <Menu size={24} strokeWidth={2.2} />
  )}
</button>

      <div className="header-text">

        <p className="greeting">
          Hello,
        </p>

        <h2 className="business-name">
          Glow Spa 
        </h2>

      </div>

      <button className="notification-btn">
  <Bell size={22} strokeWidth={2.2} />
</button>

    </header>
  );
}