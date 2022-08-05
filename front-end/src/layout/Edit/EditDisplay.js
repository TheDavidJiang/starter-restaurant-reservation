import React, {useEffect, useState} from "react"
import { useHistory, useParams } from "react-router-dom"
import { editReservation, getReservation } from "../../utils/api"
import { formatAsDate } from "../../utils/date-time"
import ReservationForm from "../ReservationForm"

//parent is Route.js
export default function EditDisplay(){

    const history = useHistory()
    const params = useParams()


    const [formState, setFormState] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    })

        useEffect(()=>{
            const abortController = new AbortController()
            const getInitialInfo = async () =>{
                try{
                    const response = await getReservation(params.reservation_id, abortController.signal)
                    setFormState({
                        first_name: response.first_name,
                        last_name: response.last_name,
                        mobile_number: response.mobile_number,
                        reservation_date: formatAsDate(response.reservation_date),
                        reservation_time: response.reservation_time,
                        people: response.people
                })

                }catch(e){
                    console.log(e)
                }
            }
            getInitialInfo()
            return () => abortController.abort()
        }, [params.reservation_id])
        
       


   const [errors, setErrors] = useState([])

    const handleSubmit = async (event) =>{
        event.preventDefault()
        const ac = new AbortController()
        try {
            await editReservation(params.reservation_id, formState)
            history.push(`/dashboard?date=${formState.reservation_date}`)
        } catch (e) {
            setErrors([...errors, e])
            console.log(e)
        }
         return () => ac.abort()
    }

    const handleChange = ({target}) =>{

        setFormState({
            ...formState,
            [target.name]: target.value
        })
    }


    return (
        <>
        {errors.length > 0 && (
            <div className = "alert alert-danger">
                <ul>
                {errors.map((error)=>{
                    return <li key={errors[errors.length-1]}>{error.message} </li>
                        
                })}
                </ul>
            </div>
        )}


        <h2>
            Edit your Reservation
         </h2>
        <ReservationForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            reservationForm={formState}
        />
        
        </>
       
    )
}