// load in knex connection
const knex = require("../db/connection")

function list(){
    return knex('reservations').select("*")
    
}

function listByDate(date){
    return knex('reservations').where({ reservation_date : date }).whereNot({ status: "finished"}).orderBy("reservation_time")
    
}


function create(res){
    return knex("reservations")
    .insert(res)
    .returning("*")
    .then((res)=> res[0])
}

function read(reservation_id){
    return knex("reservations")
    .select("*")
    .where({reservation_id})
    .first()
}

function changeToFinished(reservation_id){
    return knex("reservations")
    .select("*")
    .where({reservation_id})
    .update({status: "finished"})
}

function updateStatus(reservationId, newStatus){
    return knex("reservations")
    .where({reservation_id: reservationId})
    .update({status: newStatus})
}

function update(reservation_id, updatedInfo){
    return knex("reservations")
    .select("*")
    .where({reservation_id})
    .update({
        first_name: updatedInfo.first_name,
        last_name: updatedInfo.last_name,
        mobile_number: updatedInfo.mobile_number,
        reservation_date: updatedInfo.reservation_date,
        reservation_time: updatedInfo.reservation_time,
        people: updatedInfo.people,
    })
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

module.exports = {
    list,
    listByDate,
    create,
    read,
    changeToFinished,
    updateStatus,
    update,
    search
}