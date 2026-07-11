export default function TableFooter({ services }) {
  return (

    <div className="table-footer">

      <span>
       Showing 1 to {services.length} of {services.length} services
      </span>

      <div className="pagination">

        <button>‹</button>

        <button className="active">
          1
        </button>

        <button>›</button>

      </div>

    </div>

  );
}
