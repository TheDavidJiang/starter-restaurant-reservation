import React, {useState} from "react"
import { useHistory } from "react-router"
import { createReservations } from "../utils/api"
import ReservationForm from "./ReservationForm"

function AddReservation(){

    const history = useHistory()

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }

    const [reservationForm, setReservationForm] = useState(initialFormState)
    const [errors, setErrors] = useState([])



    const handleChange = ({ target }) =>{
        setReservationForm({
            ...reservationForm,
            [target.name]: target.value,
            
        })
        
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        const ac = new AbortController()
        try{
        const newReservation = await createReservations({...reservationForm, people: Number(reservationForm.people)}, ac.signal)
        setReservationForm(initialFormState)
        history.push(`/dashboard?date=${newReservation.reservation_date}`)
        }catch(e){

        setErrors([...errors, e])
        console.log(e)

            
        }
        return () => ac.abort()
    }


    // function noPastDate(){
    //     const today = new Date();
    //     const dd = String(today.getDate()).padStart(2, "0");
    //     const mm = String(today.getMonth() + 1).padStart(2, "0");
    //     const yyyy = today.getFullYear();
    //     return yyyy + "-" + mm + "-" + dd;
    // }
    

    return (
        <>
        {errors.length > 0 && (
            <div className = "alert alert-danger">
                <ul>
                {errors.map((error)=>{
                    return <li>{error.message} </li>
                        
                })}
                </ul>
            </div>
        )}
            <h2>
                Create a reservation
            </h2>
            <ReservationForm 
                handleSubmit = {handleSubmit}
                handleChange = {handleChange}
                reservationForm = {reservationForm}
                // noPastDate = {noPastDate}
                
                />
        </>
    )
}

export default AddReservation