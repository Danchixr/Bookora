import AccordionCard from "./AccordionCard";

export default function BookingSettingsCard() {

  return (

    <AccordionCard title="Booking Settings">

      <div className="settings-grid">

        <div className="form-group">

          <label>Deposit Percentage</label>

          <input
            type="number"
            defaultValue="30"
          />

        </div>

        <div className="form-group">

          <label>Buffer Time (minutes)</label>

          <input
            type="number"
            defaultValue="15"
          />

        </div>

        <div className="form-group">

          <label>Minimum Booking Notice (hours)</label>

          <input
            type="number"
            defaultValue="2"
          />

        </div>

        <div className="form-group">

          <label>Maximum Booking Days Ahead</label>

          <input
            type="number"
            defaultValue="30"
          />

        </div>

        <button className="save-btn">

          Save Changes

        </button>

      </div>

    </AccordionCard>

  );

}