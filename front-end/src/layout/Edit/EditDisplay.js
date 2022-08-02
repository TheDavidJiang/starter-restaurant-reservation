import React, {useEffect, useState} from "react"
import { useHistory, useParams } from "react-router-dom"
import { editReservation, getReservation } from "../../utils/api"
import useQuery from "../../utils/useQuery"
import { formatAsDate } from "../../utils/date-time"
import ReservationForm from "../ReservationForm"

//parent is Route.js
export default function EditDisplay(){

    const history = useHistory()
    const params = useParams()
    // console.log("this my params", params)
    // console.log("this my params", params.reservation_id)

    // use the params to get the reservation information from the backend
    //then populate it to the initialFormState

    const [formState, setFormState] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    })

        useEffect(()=>{
            const getInitialInfo = async () =>{
                try{
                    const response = await getReservation(params.reservation_id)
                    console.log("here is resposneadxo", response)
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
        }, [])
        
       


    // const [editCurrentReservation, setEditCurrentReservation] = useState(initialForm)
    const [errors, setErrors] = useState(null)

    

    // after clicking submit, they should send a PUT request to the backend with the updated info
    
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
        <h2>
            Edit your Reservation
         </h2>
        <ReservationForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            reservationForm={formState}
        />
        </>
        // <>
        // 
        // <form onSubmit = {handleSubmit}>
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-sm">
        //                 <div>
        //                     <label htmlFor="first_name">
        //                             First Name
        //                         </label>
        //                         <input 
        //                         name = "first_name"
        //                         id = "first_name"
        //                         className = "form-control"
        //                         onChange={handleChange}
        //                         value={formState.first_name}
        //                         required
        //                         />
        //                 </div>
        //             </div>
        //             <div className="col-sm">
        //                 <div>
        //                 <label htmlFor="last_name">
        //                     Last Name
        //                 </label>
        //                 <input 
        //                 name = "last_name"
        //                 id = "last_name"
        //                 className = "form-control"
        //                 onChange={handleChange}
        //                 value={formState.last_name}
        //                 required
        //                 />
        //                 </div>
        //             </div>  
        //             <div className="col-sm">
        //                 <div>
        //                     <label htmlFor="mobile_number">
        //                         Mobile Number
        //                     </label>
        //                     <input
        //                     name = "mobile_number"
        //                     id = "mobile_number"
        //                     className = "form-control"
        //                     onChange={handleChange}
        //                     value={formState.mobile_number}
        //                     required
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="row">
        //             <div className="col-sm">
        //                 <div>
        //                     <label htmlFor="reservation_date">
        //                         Date
        //                     </label>
        //                     <input 
        //                     type="date"
        //                     name = "reservation_date"
        //                     id = "reservation_date"
        //                     className = "form-control"
        //                     onChange={handleChange}
        //                     value={formState.reservation_date}
        //                     required
        //                     // min={noPastDate()}
                            
        //                     />
        //                 </div>
        //             </div>
        //             <div className="col-sm">
        //             <div>
        //                 <label htmlFor="reservation_time">
        //                     Time
        //                 </label>
        //                 <input type="time"
        //                 name = "reservation_time"
        //                 id = "reservation_time"
        //                 className = "form-control"
        //                 onChange={handleChange}
        //                 value={formState.reservation_time}
        //                 required
        //                 />
        //             </div>
        //         </div>
        //         <div className="col-sm">
        //             <div>
        //                 <label htmlFor="people">
        //                     Number of people in the party
        //                 </label>
        //                 <input type="number"
        //                 name = "people"
        //                 id = "people"
        //                 className = "form-control"
        //                 onChange={handleChange}
        //                 value={formState.people}
        //                 required
        //                 min="1"
        //                 />
        //             </div>
        //         </div>
        //         </div> 
        //     <div className="row">
        //         <div className="col-sm">
        //             <button type="button" className="btn btn-secondary" onClick={()=> history.push("/")}>Cancel</button>
        //             <button type="submit" className="btn btn-primary" value="submit">Submit</button>
        //         </div>
                
        //     </div>

        //     </div>
            
            
            
            
            
            
        // </form>
        // </>
    )
}