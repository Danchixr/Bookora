import AccordionCard from "./AccordionCard";
import { updateBusinessLocation } from "../actions";

export default function LocationCard({ business }) {

  return (

   <AccordionCard title="Business Location">

  <form action={updateBusinessLocation}>

    <div className="settings-grid">

        <div className="form-group">

          <label>Address</label>

          <input
           name="location"
            type="text"
            defaultValue={business?.location || ""}
          />

        </div>

        <div className="form-group">

          <label>City</label>

          <input
            name="city"
            type="text"
            defaultValue={business?.city || ""}
          />

        </div>

        <div className="form-group">

          <label>State</label>

          <input
           name="state"
            type="text"
            defaultValue={business?.state || ""}
          />

        </div>

        <div className="form-group full-width">

          <label>Google Maps Link</label>

          <input
  name="google_maps_url"
  type="text"
  placeholder="Paste Google Maps URL"
  defaultValue={business?.google_maps_url || ""}
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