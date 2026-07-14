export default function OverviewSection({ children }) {
  return (
    <section className="overview-section">

      <div className="overview-header">
        <h2>Overview</h2>

        <button className="overview-filter">
          Today ▾
        </button>
      </div>

      {children}

    </section>
  );
}