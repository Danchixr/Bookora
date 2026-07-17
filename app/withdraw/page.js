import "./withdraw.css";

import WithdrawHeader from "./components/WithdrawHeader";
import BalanceCard from "./components/BalanceCard";
import WithdrawForm from "./components/WithdrawForm";
import WithdrawFilters from "./components/WithdrawFilters";
import WithdrawHistory from "./components/WithdrawHistory";

export default async function WithdrawPage() {

  return (

    <div className="withdraw-page">
          <WithdrawHeader />
       <BalanceCard />
       <WithdrawForm />
       <WithdrawFilters />
       <WithdrawHistory />

    </div>

  );

}