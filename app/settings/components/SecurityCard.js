import AccordionCard from "./AccordionCard";

export default function SecurityCard() {

  return (

    <AccordionCard title="Security">

      <div className="settings-grid">

        <div className="form-group full-width">

          <label>Current Password</label>

          <input
            type="password"
          />

        </div>

        <div className="form-group">

          <label>New Password</label>

          <input
            type="password"
          />

        </div>

        <div className="form-group">

          <label>Confirm Password</label>

          <input
            type="password"
          />

        </div>

        <button className="save-btn">

          Update Password

        </button>

      </div>

    </AccordionCard>

  );

}