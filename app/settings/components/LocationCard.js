import AccordionCard from "./AccordionCard";
import { updateBusinessLocation } from "../actions";

export default function LocationCard() {

  return (

   <AccordionCard title="Business Location">

  <form action={updateBusinessLocation}>

    <div className="settings-grid">

        <div className="form-group">

          <label>Address</label>

          <input
           name="location"
            type="text"
            defaultValue="15 Admiralty Way"
          />

        </div>

        <div className="form-group">

          <label>City</label>

          <input
            name="city"
            type="text"
            defaultValue="Lekki"
          />

        </div>

        <div className="form-group">

          <label>State</label>

          <input
           name="state"
            type="text"
            defaultValue="Lagos"
          />

        </div>

        <div className="form-group full-width">

          <label>Google Maps Link</label>

          <input
            type="text"
            placeholder="Paste Google Maps URL"
          />

        </div>

        <button className="save-btn">

          Save Changes

        </button>

      </div>

      </form>

    </AccordionCard>

  );

}