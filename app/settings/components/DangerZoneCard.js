export default function DangerZoneCard() {

  return (

    <section className="danger-card">

      <h2>Danger Zone</h2>

      <p>

        Deactivating or deleting your account
        cannot be undone.

      </p>

      <div className="danger-actions">

        <button className="deactivate-btn">

          Deactivate Account

        </button>

        <button className="delete-btn">

          Delete Account

        </button>

      </div>

    </section>

  );

}