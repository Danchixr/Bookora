export default function AboutSection({ business }) {
  return (
    <section className="about-section">

      <div className="section-header">
        <h2>About</h2>

        <button className="section-link">
          See more →
        </button>
      </div>

      <p className="about-text">
        {business?.description || "No description provided yet."}
      </p>

    </section>
  );
}