import React , {useState}from "react"
import useQuery from "../../utils/useQuery"
import eachReservation from "./eachReservation"
import { getReservationPlusMobile } from "../../utils/api"




export default function Search(){
    const [searchPhone, setSearchPhone] = useState("")
    const [matchingReservations, setMatchingReservations] = useState([])

    const query = useQuery()
    // console.log("query", query)

    
    const handleSubmitSearch = async (event) =>{
        event.preventDefault()
        const response = await getReservationPlusMobile(searchPhone)
        // console.log("searchPhone: ", searchPhone)
        // console.log("clicked!")
        console.log("response", response)
        for (let eachResponse of response){
            console.log("eachreesponse, ", eachResponse.mobile_number.includes(searchPhone))
            if (eachResponse.mobile_number.includes(searchPhone)){
                return (
                <eachReservation 
                response={response} 
                matchingReservations={matchingReservations}
                setMatchingReservations={setMatchingReservations}
                />
                )
                
            }
        }
    }

    const handleChange = (event) =>{
        console.log(event.target.value)
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
        <button type="submit">Find</button>
        </form>
        <div>
            Hello
        </div>
        
        <div>
            {matchingReservations.map((eachReserve)=>{
                return <h5>{eachReserve}</h5>
            })}
        </div>
        </>

    )
}