"use client";

import {
  Bell,
  Menu,
  Camera,
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";

import BottomNavigation from "../home/components/BottomNavigation";

import "./profile.css";

export default function ProfilePage() {
  return (
    <main className="profile-page">

      {/* Header */}
      <header className="profile-header">

        <button className="profile-menu-btn">
          <Menu size={28} />
        </button>

        <h1>Client Profile</h1>

        <button className="profile-notification">
          <Bell size={24} />

          <span className="notification-dot"></span>
        </button>

      </header>


      {/* Profile Hero */}
      <section className="profile-hero">

        <div className="profile-picture-wrapper">

          <img
            src="https://i.pravatar.cc/300?img=32"
            alt="Profile"
            className="profile-picture"
          />

          <button className="camera-btn">
            <Camera size={19} />
          </button>

        </div>


        <h2>Amara Chisom</h2>

        <p>amara.chisom@email.com</p>


        {/* Business Dashboard */}
        <button className="business-dashboard-card">

          <div className="business-dashboard-icon">
            <Store size={23} />
          </div>

          <div className="business-dashboard-text">

            <strong>Business Dashboard</strong>

            <span>
              Manage your business, services and bookings
            </span>

          </div>

          <ChevronRight size={22} />

        </button>

      </section>


      {/* Personal Information */}
      <section className="profile-card">

        <ProfileItem
          icon={<User size={22} />}
          title="Full Name"
          value="Amara Chisom"
        />

        <ProfileItem
          icon={<Mail size={22} />}
          title="Email Address"
          value="amara.chisom@email.com"
        />

        <ProfileItem
          icon={<Phone size={22} />}
          title="Phone Number"
          value="+234 816 123 4567"
        />

        <ProfileItem
          icon={<MapPin size={22} />}
          title="Location"
          value="Lekki, Lagos"
        />

      </section>


      {/* Account */}
      <section className="profile-card">

        <ProfileItem
          icon={<Lock size={22} />}
          title="Password"
          value="*********"
        />

        <ProfileItem
          icon={<Bell size={22} />}
          title="Notifications"
          value="Manage your notification preferences"
        />

        <ProfileItem
          icon={<Shield size={22} />}
          title="Privacy"
          value="Manage your privacy and data"
        />

        <ProfileItem
          icon={<HelpCircle size={22} />}
          title="Help & Support"
          value="Get help and contact support"
        />

      </section>


      {/* Logout */}
      <button className="logout-btn">

        <LogOut size={20} />

        <span>Log Out</span>

      </button>


      <BottomNavigation />

    </main>
  );
}


function ProfileItem({ icon, title, value }) {
  return (
    <button className="profile-item">

      <div className="profile-item-icon">
        {icon}
      </div>

      <div className="profile-item-content">

        <span className="profile-item-title">
          {title}
        </span>

        <strong className="profile-item-value">
          {value}
        </strong>

      </div>

      <ChevronRight
        size={21}
        className="profile-item-arrow"
      />

    </button>
  );
}