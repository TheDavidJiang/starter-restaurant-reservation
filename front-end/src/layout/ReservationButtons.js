import { Link, useHistory } from "react-router-dom";
import React from "react";
import { cancelReservation } from "../utils/api";

export default function ReservationButtons({ status, reservation_id }) {


    const history = useHistory()
        
    async function cancelHandler(e){
        e.preventDefault()
        let reservationIdCancel = e.target.dataset.reservationIdCancel
        if (
            reservationIdCancel && 
            window.confirm(
                "Do you want to cancel this reservation?\n\nThis cannot be undone."
            )
        ) {
            await cancelReservation(reservationIdCancel)
            history.go(0)
        }
    }
    

    if(status === "booked") {
        return (
            <>
                <td><Link className="btn btn-success" to={`/reservations/${reservation_id}/seat`}><span className="oi oi-check" />Seat</Link></td>
                {/* <td><Link className="btn btn-primary" to={`/reservations/${reservation_id}/edit`}><span className="oi oi-pencil" />Edit</Link></td> */}
                <td><a className="btn btn-primary" href={`/reservations/${reservation_id}/edit`}><span className="oi oi-pencil" />Edit</a></td>
                <td><button className="btn btn-danger mr-2 cancel" type="button" data-reservation-id-cancel={reservation_id} onClick={cancelHandler}><span className="oi oi-x" />Cancel</button></td>
            </>
        );
    }
    return (
        <>
            <td />
            <td />
            <td />
        </>
    )
}