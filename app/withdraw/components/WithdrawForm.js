export default function WithdrawForm() {

  return (

    <section className="withdraw-card">

      <h3>Withdraw Funds</h3>

      <form className="withdraw-form">

        <div className="form-group">

          <label>Amount</label>

          <input
            type="number"
            placeholder="Enter amount"
          />

        </div>

        <div className="form-group">

          <label>Bank</label>

          <select>

            <option>Select Bank</option>

          </select>

        </div>

        <div className="form-group">

          <label>Account Number</label>

          <input
            type="text"
            placeholder="0123456789"
          />

        </div>

        <div className="form-group">

          <label>Account Name</label>

          <input
            type="text"
            placeholder="Account name will appear automatically"
            readOnly
          />

        </div>

        <button
          className="withdraw-btn"
          type="submit"
        >
          Withdraw Funds
        </button>

      </form>

    </section>

  );

}