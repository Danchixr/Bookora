import {
  Clock3,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

export default function UpcomingBookingCard({ bookings }) {

  const upcoming = bookings[0];

  return (
    <section className="upcoming-card">

      <div className="section-title">
        <div className="next-booking-header">

          <div className="header-icon">
            <Clock3 size={24} />
          </div>

          <h3>
            Next Booking
          </h3>

        </div>
      </div>


      {upcoming ? (

        <div className="booking-card">


          <div className="customer-info">

            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="customer"
            />

            <div>
              <h3>
                {upcoming.customer_name}
              </h3>

              <p>
                {upcoming.services?.name}
              </p>
            </div>

          </div>



          <div className="booking-details">

            <span>
              <CalendarDays size={18}/>
              {upcoming.date}
            </span>


            <span>
              <Clock3 size={18}/>
              {upcoming.time}
            </span>

          </div>



          <div className="booking-action">

            <span className="booking-status">
              {upcoming.status}
            </span>


            <ChevronRight size={24}/>

          </div>


        </div>

      ) : (

        <p>No upcoming bookings.</p>

      )}

    </section>
  );
}