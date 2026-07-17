import WithdrawHistoryCard from "./WithdrawHistoryCard";

export default function WithdrawHistory() {

  const withdrawals = [

    {
      id:1,
      date:"Jun 10, 2026",
      amount:"₦50,000",
      bank:"GTBank",
      reference:"#WD1024",
      status:"Completed",
    },

    {
      id:2,
      date:"Jun 02, 2026",
      amount:"₦25,000",
      bank:"Access Bank",
      reference:"#WD1023",
      status:"Pending",
    },

    {
      id:3,
      date:"May 28, 2026",
      amount:"₦40,000",
      bank:"UBA",
      reference:"#WD1022",
      status:"Completed",
    },

  ];

  return (

   

      <div className="withdraw-history-list">

        {withdrawals.map((withdrawal)=>(

          <WithdrawHistoryCard
            key={withdrawal.id}
            withdrawal={withdrawal}
          />

        ))}

      </div>

    

  );

}