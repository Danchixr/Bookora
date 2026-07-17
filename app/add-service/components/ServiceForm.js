import {
  createServiceAction,
  updateServiceAction,
} from "../actions";

import ImageUpload from "./ImageUpload";

export default function ServiceForm({ children, service }) {

  const formAction = service
  ? updateServiceAction
  : createServiceAction;
  return (

    <section className="add-service-card">

      <form
  action={formAction}
  className="service-form"
>

    

  <ImageUpload
    name="image_url"
    label="Service Image"
/>

        <div className="form-group">

          <label>
            Category *
          </label>

          <select
  name="category"
  defaultValue={service?.category || ""}
  required
>

            <option value="">Select Category</option>
<option value="Massage Therapy">Massage Therapy</option>
<option value="Facial Treatment">Facial Treatment</option>
<option value="Body Treatment">Body Treatment</option>
<option value="Nail Care">Nail Care</option>
<option value="Hair Services">Hair Services</option>
<option value="Makeup">Makeup</option>
<option value="Fitness Training">Fitness Training</option>
<option value="Photography">Photography</option>

          </select>

        </div>

        <div className="form-group">

          <label>
            Service Name *
          </label>

          <input
          name="name"
          type="text"
          placeholder="Enter service name"
          defaultValue={service?.name || ""}
          required
         />

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>
              Price *
            </label>

           <input
           name="price"
           type="number"
           placeholder="₦25,000"
           defaultValue={service?.price || ""}
           required
           />

          </div>

          <div className="form-group">

            <label>
              Duration *
            </label>

            <select
  name="duration"
  defaultValue={service?.duration || ""}
  required
>

              <option value="">Select Duration</option>
<option value="15">15 mins</option>
<option value="30">30 mins</option>
<option value="45">45 mins</option>
<option value="60">60 mins</option>
<option value="90">90 mins</option>
<option value="120">120 mins</option>

            </select>

          </div>

        </div>

        <div className="form-group">

          <label>
            Description *
          </label>

          <textarea
  name="description"
  rows="5"
  placeholder="Describe this service"
  defaultValue={service?.description || ""}
  required
/>

        </div>

        <div className="form-group">

          <label>
            Deposit Amount (Optional)
          </label>

    <input
  name="deposit_amount"
  type="number"
  placeholder="₦0"
  defaultValue={service?.deposit_amount || ""}
/>

        </div>
       {children}
      </form>

    </section>

  );
}