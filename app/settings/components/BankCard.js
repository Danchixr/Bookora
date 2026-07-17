import AccordionCard from "./AccordionCard";

export default function BankCard() {

  return (

    <AccordionCard title="Bank Details">

      <div className="settings-grid">

        <div className="form-group">

          <label>Bank</label>

          <select>

            <option>GTBank</option>

          </select>

        </div>

        <div className="form-group">

          <label>Account Number</label>

          <input
            type="text"
            defaultValue="0123456789"
          />

        </div>

        <div className="form-group full-width">

          <label>Account Name</label>

          <input
            type="text"
            defaultValue="Glow Spa Ltd"
            readOnly
          />

        </div>

        <button className="save-btn">

          Save Changes

        </button>

      </div>

    </AccordionCard>

  );

}