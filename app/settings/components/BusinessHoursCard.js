import AccordionCard from "./AccordionCard";
import WorkingDaysPicker from "./WorkingDaysPicker";
import {updateBusinessHours,} from "../actions";

export default function BusinessHoursCard({ business }) {

  return (

    <AccordionCard title="Business Hours">
    
    <form action={updateBusinessHours}>

      <div className="settings-grid">

        <div className="form-group">

          <label>Opening Time</label>

          <input
            name="opening_time"
            type="time"
            defaultValue={business?.opening_time || ""}
          />

        </div>

        <div className="form-group">

          <label>Closing Time</label>

          <input
           name="closing_time"
            type="time"
            defaultValue={business?.closing_time || ""}
          />

        </div>

        <div className="form-group">

          

         <WorkingDaysPicker
  name="working_days"
  label="Working Days"
  defaultDays={business?.working_days || []}
/>

        </div>

        <div className="form-group">

          <label>Timezone</label>

          <input
            type="text"
            defaultValue="Africa/Lagos"
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