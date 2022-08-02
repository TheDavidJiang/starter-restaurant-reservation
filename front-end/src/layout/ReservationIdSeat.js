import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom"
import { listTables, statusUpdate, getReservation } from "../utils/api";


function ReservationIdSeat(){
    const params = useParams()
    const history = useHistory()
    const [allTables, setAllTables] = useState([])
    const [tableId, setTableId] = useState(null)
    const [currentReservation, setCurrentReservation] = useState(null)






    useEffect(()=>{
        const getReserve = async () =>{
            try{
                const thisReservation = await getReservation(params.reservation_id)
                setCurrentReservation(thisReservation)
            }catch(e){
                console.log(e)
            }
        }
        getReserve()
    }, [params.reservation_id])



    useEffect(()=>{
        const ac = new AbortController()
        const getTables = async () =>{
            try{
                const getAllTables = await listTables(params.reservation_id, ac.signal)
                setAllTables(getAllTables)
            }catch(e){
                console.log(e)
            }
        }
        getTables()
    }, [params.reservation_id])


    const handleSubmit = async (event) =>{
        event.preventDefault()       
        try {
            await statusUpdate(params.reservation_id, tableId)
            setTableId(null)
            history.push("/")
        } catch (e) {
            console.log(e)
        }

    }

    const changeHandler = async (event) => {
        setTableId(event.target.value)
    }


    return(
        <>
            <h2>Seating for Reservation Number {params.reservation_id}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="table_id">
                    Table Number:
                </label>
                <select name="table_id" id="table_id" size="1" required  onChange={changeHandler}>
                    <option>Choose a table</option>
                    {allTables.map((eachTable)=>{
                        
                    return <option key={eachTable.table_id} value={eachTable.table_id}>{eachTable.table_name} - {eachTable.capacity}</option>
                })}
                </select>            

                <div className="row">
                <div className="col-sm">
                <button type="button" className="btn btn-secondary" onClick={()=> history.push("/reservations/new")}>Cancel</button>
                
                <button type="submit" className="btn btn-primary" value="submit">Submit</button>
                </div>
                
            </div>
            </form>
            
        </>
        
    )
}

export default ReservationIdSeat