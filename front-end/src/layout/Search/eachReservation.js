import React from "react"

function eachReservation({response }){
    console.log("hello")
    console.log("resposne", response)
    
    return (
        <>
            <li>Hello</li>
            <h2>{response}</h2>
        </>
    )
    

}

export default eachReservation