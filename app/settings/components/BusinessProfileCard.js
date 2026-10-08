import { updateBusinessProfile } from "../actions";
import AccordionCard from "./AccordionCard";
import ImageUpload from "@/app/add-service/components/ImageUpload";
import { updateBusinessHours } from "../actions";
import { BUSINESS_CATEGORIES } from "@/lib/categories";

export default function BusinessProfileCard({ business }) {

  return (

    <AccordionCard title="Business Profile">

  <form action={updateBusinessProfile}>

    <div className="settings-grid">

        <div className="form-group">

          <label>Business Name</label>

          <input
  name="name"
  type="text"
  defaultValue={business?.name || ""}
/>

        </div>

        <div className="form-group">

          <label>Phone Number</label>

          <input
            name="phone"
            type="text"
            defaultValue={business?.phone || ""}
          />

        </div>

        <div className="form-group">

          <label>Email</label>

          <input
            name="email"          
            type="email"
            defaultValue={business?.email || ""}
          />

        </div>

<div className="form-group">
  <label>Business Category</label>

  <select
    name="category"
    defaultValue={business?.category || ""}
    required
  >
    <option value="" disabled>
      Select Business Category
    </option>

    {BUSINESS_CATEGORIES.map((category) => (
      <option
        key={category.slug}
        value={category.name}
      >
        {category.name}
      </option>
    ))}
  </select>
</div>

       <div className="form-group">

  <ImageUpload
    name="logo_url"
    label="Business Logo"
    defaultImage={business?.logo_url}
  />

</div>
       <div className="form-group full-width">

  <ImageUpload
    name="banner_url"
    label="Business Banner"
    defaultImage={business?.banner_url}
  />

</div>

        <div className="form-group full-width">

          <label>About</label>

          <textarea
            name="description"
            rows={5}
            defaultValue={business?.description || ""}
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