import React , {useState}from "react"
import { getReservationPlusMobile } from "../../utils/api"
import ReservationDisplay from "../ReservationDisplay"




export default function Search(){
    const [searchPhone, setSearchPhone] = useState("")
    const [matchingReservations, setMatchingReservations] = useState([])
    const [errors, setErrors] = useState(null)
    
    const handleSubmitSearch = async (event) =>{
        event.preventDefault()
        const ac = new AbortController()
        try {
            const response = await getReservationPlusMobile(searchPhone, ac.signal)
            setMatchingReservations(response)
        } catch (e) {
            setErrors([...errors, e])
            console.log(e)
        }
        return () => ac.abort()
    }

    const handleChange = (event) =>{
        setSearchPhone(event.target.value)
    }


    return (
        <>
        <form onSubmit = {handleSubmitSearch}>
            <label htmlFor="mobile_number">

            </label>
            <input
                name="mobile_number"
                placeholder="Enter a customer's phone number"
                onChange={handleChange}
                >
            </input>
            <button type="submit" value="submit">Find</button>
        </form>
        

        <ReservationDisplay reservations={matchingReservations}/>
        </>

    )
}