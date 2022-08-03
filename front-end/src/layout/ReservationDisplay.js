import React from "react";
import ReservationButtons from "./ReservationButtons";

//parent is Dashboard.js
export default function ReservationDisplay({ reservations = []}){
    const rows = reservations.length ? (
        reservations.map((reservation) => {
            
            if (reservation.status !== "finished"){
                return (
                    <tr key={reservation.reservation_id}>
                    <td className = "align-middle res-td">{reservation.reservation_id}</td>
                    <td className = "align-middle res-td">{reservation.first_name}</td>
                    <td className = "align-middle res-td">{reservation.last_name}</td>
                    <td className = "align-middle res-td">{reservation.mobile_number}</td>
                    <td className = "align-middle res-td">{reservation.reservation_date}</td>
                    <td className = "align-middle res-td">{reservation.reservation_time}</td>
                    <td className = "align-middle res-td">{reservation.people}</td>
                    
                    <td className = "align-middle" data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                    <ReservationButtons 
                        status={reservation.status}
                        reservation_id={reservation.reservation_id}
                        
                    />
                </tr>
                )
            } else {
                return null
            }
        })
    ) : (
        <tr>
            <td colSpan="6">No reservations found.</td>
        </tr>
    );

    return (
        <div className="table-responsive">
            <table className="table no-wrap table-striped">
                <thead className="thead-dark">
                <tr>
                    <th className="border-top-0">#</th>
                    <th className="border-top-0">FIRST NAME</th>
                    <th className="border-top-0">LAST NAME</th>
                    <th className="border-top-0">PHONE</th>
                    <th className="border-top-0">DATE</th>
                    <th className="border-top-0">TIME</th>
                    <th className="border-top-0">PEOPLE</th>
                    <th className="border-top-0">STATUS</th>
                    <th className="border-top-0" colSpan = "3">ACTION</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    )

}