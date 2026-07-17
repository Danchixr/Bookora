export default function WithdrawHistoryCard({ withdrawal }) {

  return (

    <div className="withdraw-history-card">

      <div className="history-top">

        <div>

          <h4>{withdrawal.amount}</h4>

          <p>{withdrawal.bank}</p>

        </div>

        <span
          className={`history-status ${withdrawal.status.toLowerCase()}`}
        >
          {withdrawal.status}
        </span>

      </div>

      <div className="history-bottom">

        <span>{withdrawal.date}</span>

        <span>{withdrawal.reference}</span>

      </div>

    </div>

  );

}