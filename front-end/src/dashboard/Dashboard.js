import React, { useEffect, useState } from "react";
import { listReservations, listTables, removeReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import ReservationDisplay from "../layout/ReservationDisplay"
import TableDisplay from "../layout/TableDisplay";
import { Link, useHistory } from "react-router-dom";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)
  let history = useHistory()

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
      
    
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError)
    return () => abortController.abort();
  }

  function getToday(){
    history.push(`/dashboard`)    
  }

  function getYesterday(){
    let yesterday = previous(date)
    history.push(`/dashboard?date=${yesterday}`)    
  }

  function getTomorrow(){
    let tomorrow = next(date)
    history.push(`/dashboard?date=${tomorrow}`)    
  }

  function onFinish(table_id, reservation_id) {
    removeReservation(table_id, reservation_id).then(loadDashboard).catch(setTablesError);
  }



  return (
    <>
    <div className = "container">
      <div className = "row g-1">
      {/* <div className="padded col-lg-7 col-md-5 col-sm-12 col-xs-6 card-main"> */}
      <div className="padded col-7 card-main min-vh-100 ">
        <div className="text-center">
          <div>
            <div className="row p-0 justify-content-center">
              <div className="col-auto p-1">
                <h2 className = "bold">Reservations</h2>
              </div>
              <div className="col-auto plus-button p-1">
                <Link className="nav-link " to="/reservations/new">
                  <span className="oi oi-plus" />
                  &nbsp;
                </Link>
              </div>
            </div>

            <h6 className="my-2">
              Date: {date}
            </h6>
            <div className="mb-3">
              <button className="btn btn-secondary" onClick={getYesterday}><span className="oi oi-chevron-left" />&nbsp;Yesterday</button>
              <button className="btn btn-success" onClick={getToday}>Today </button>
              <button className="btn btn-primary" onClick={getTomorrow}>Tomorrow&nbsp;<span className="oi oi-chevron-right" /></button>
            </div>
            <div className="text-left">
              <ReservationDisplay reservations={reservations} />
              <ErrorAlert error={reservationsError} />
            </div>
          </div>
        </div>
      </div>
      
      {/* <div className="padded col-lg-4 col-md-5 col-sm-12 col-xs-6 card-main"> */}
      <div className="padded col-5 card-main min-vh-100 table-avail ">
          <div className="text-center ">
            <div className="row justify-content-center">
              <div className="col-auto p-1">
                <h2 className = "bold">Tables</h2>
              </div>
              <div className="col-auto plus-button p-1">
                <Link className="nav-link" to="/tables/new">
                  <span className="oi oi-plus" />
                  &nbsp;
                </Link>
              </div>
            </div>
            
            <TableDisplay tables={tables} onFinish={onFinish} />
            <ErrorAlert error={tablesError} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default Dashboard;

