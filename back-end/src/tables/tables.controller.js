const {json} = require("express")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./tables.service")

async function list(req, res){
    const data = await service.list()
    res.json({data})
}



async function create(req, res, next){
    const {data: {table_name, capacity, reservation_id} = {}} = req.body

    const newTable = {
        table_name,
        capacity,
        reservation_id
    }

    const response = await service.create(newTable)
    res.status(201).json({ data: response })
}

function validateData(req, res, next){
    const {table_name, capacity} = req.body.data
    if (table_name.length < 2){
        return next({
            status: 400,
            message: "table_name must be at least 2 characters."
        })
    }
    if(typeof capacity !== "number"){
        return next({
            status: 400,
            message: "Please enter a valid number for the capacity"
        })
    }
    if (Number(capacity) < 1){
        return next({
            status: 400,
            message: "Must be at least 1 person."
        })
    }
    next()
}

async function reservationIdExists(req, res, next){
    const reservation = await service.readReservationId(req.body.data.reservation_id)
    if(reservation){
        return next()
    }
    next({
        status: 404,
        message: `${req.body.data.reservation_id}: reservation_id not found!`
    })
}

async function validTableCapacity(req, res, next){
    const getTableInfo = await service.read(req.params.table_id)
    const getReservationInfo = await service.readReservationId(req.body.data.reservation_id)
    if (getReservationInfo.status === "seated"){
        return next({
            status: 400,
            message: "Reservation is already seated."
        })
    }
    if (getTableInfo.capacity < getReservationInfo.people){
        return next({
            status: 400,
            message: `Too many people, capacity is ${getTableInfo.capacity}`
        })
    }
    if(getTableInfo.reservation_id){
        return next({
            status: 400,
            message: `Table is already occupied`
        })
    }
    next()
}

function tableExists(req, res, next){
    service.read(req.params.table_id)
    .then((table)=>{
        if(table){
            res.locals.table = table
            return next()
        }
        next({ status: 404, message: `Table ID ${req.params.table_id} cannot be found!`})
    })
    .catch(next)
}

function tableOccupied(req, res, next){
    service.read(req.params.table_id)
    .then((table)=>{
        if(table.reservation_id == null){
            next({ status: 400, message: `Table ID ${req.params.table_id}is not occupied!`})
        }
        return next()
    })
}

function bodyHasData(propertyName){
    return function (req, res, next){
      const { data = {} } = req.body
      data[propertyName] && propertyName.length > 0 ? next() : next({ status: 400, message: `Table must have: ${propertyName}.`})
    }
  }



function read(req, res, next){
    res.json({ data: res.locals.table })
}

async function update(req, res){
    const {reservation_id} = req.body.data
    const {table_id} = req.params
    await service.update(table_id, reservation_id)
    res.status(200).json({ data: reservation_id})
}

async function destroy(req, res, next){
    const reservation_id = res.locals.table.reservation_id
    await service.removeReservation(req.params.table_id, reservation_id)
    res.status(200).json({ data: "deleted"})
}





module.exports = {
    list,
    create:[
        asyncErrorBoundary(bodyHasData("table_name")),
        asyncErrorBoundary(bodyHasData("capacity")),
        validateData,
        asyncErrorBoundary(create)
    ],
    read: [
        tableExists,
        asyncErrorBoundary(read)
    ],
    update:[
        bodyHasData("reservation_id"),
        reservationIdExists,
        tableExists,
        validTableCapacity,
        asyncErrorBoundary(update)
        
    ],
    destroy:[
        tableExists,
        tableOccupied,
        asyncErrorBoundary(destroy)
    ],
    
    
}