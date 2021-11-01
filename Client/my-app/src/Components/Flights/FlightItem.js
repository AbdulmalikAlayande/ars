import React from "react";
import classes from "./FlightItem.module.css";

import { Link } from "react-router-dom";

export const FlightItem = (props) => {
  const flight = props.flight;

  let departureDate = new Date(flight.DepartureDate);
  let arrivalDate = new Date(
    new Date(flight.ArrivalDate).getTime() + 690 * 60000
  );

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const departure = {
    time: departureDate.toLocaleTimeString(),
    longDate: departureDate.toLocaleDateString("en-US", options),
  };

  const arrival = {
    longDate: arrivalDate.toLocaleDateString("en-US", options),
    time: arrivalDate.toLocaleTimeString(),
  };
  return (
    <li className={classes.item}>
      <div>
        <div className={classes.title}>
          <p>{flight.FlightNumber}</p>
        </div>

        <div className={classes.description}>
          <div>
            <label>From</label>
            <div className={classes.content}>{flight.From}</div>
          </div>
          <div>
            <label>Depart</label>
            <div className={classes.content}>{departure.time}</div>
            <div>{departure.longDate}</div>
          </div>
          <div>
            <label>To</label>
            <div className={classes.content}>{flight.To}</div>
          </div>
          <div>
            <label>Arrive</label>
            <div className={classes.content}>{arrival.time}</div>
            <div>{departure.longDate}</div>
          </div>
        </div>
      </div>

      <Link to={`/flights/${flight._id}`} className="btn">
        Flight Details
      </Link>
    </li>
  );
};

// return (
//   <li className={classes.item}>
//     <div className={classes.information}>
//       <div className={classes.title}>
//         <p>Flight {flight.FlightNumber}</p>
//       </div>
//       <div className={classes.description}>
//         <p>
//           <b>Departure:</b> {flight.From} on {departure.date} at{" "}
//           {departure.time}
//         </p>
//         <p>
//           <b>Arrival:</b> {flight.To} on {arrival.date} at {arrival.time}
//         </p>
//       </div>
//     </div>

//     <Link to={`/flights/${flight._id}`} className="btn">
//       Flight Details
//     </Link>
//   </li>
// );
