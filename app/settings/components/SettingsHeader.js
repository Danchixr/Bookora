import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SettingsHeader() {

  return (

    <div className="settings-header">

      <Link
        href="/dashboard"
        className="back-btn"
      >
        <ArrowLeft
          size={24}
          strokeWidth={2.2}
        />
      </Link>

      <div>

        <h1>Settings</h1>

        <p>
          Manage your business profile
        </p>

      </div>

    </div>

  );

}