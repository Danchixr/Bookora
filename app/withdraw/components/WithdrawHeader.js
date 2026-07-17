import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WithdrawHeader() {

  return (

    <div className="withdraw-header">

     <Link
        href="/dashboard"
        className="back-btn"
      >
        <ArrowLeft size={24} strokeWidth={2.2} />
      </Link>

      <div>

      <h1>Withdraw</h1>

      <p>
        Manage your payouts and withdrawal requests
      </p>

    </div>
    </div>

  );

}