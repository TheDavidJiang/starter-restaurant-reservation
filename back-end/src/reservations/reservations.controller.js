const { json } = require("express");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reservations.service")
 



/**
 * List handler for reservation resources
 */
async function list(req, res) {
  // console.log("req qwuery", req.query.date)
  const {date} = req.query
  // console.log("dateasdfasdf: ", date)
  const currentDate = await service.list()
  // console.log("currentDate:", currentDate)
  res.json({ data: currentDate.filter(date ? reserv => reserv.reservation_date == date : () => true )})
}

//validate data
function validateData(payload){
  const errors = []

  //check if there are any violations
  //if (day is a tuesday) errors.push("it's a tuesday")
  // console.log(errors)
  
  //if (too early or too late) errors.push("not open yet")
  // console.log(errors)

  if (errors.length > 0){
    //return the errors as a response
  } else{
    //payload is valid, proceed to the next steps to POST to db
  }
}

function bodyHasData(propertyName){
  return function (req, res, next){
    // console.log("request: ", req.body)
    const { data = {} } = req.body
    data[propertyName] && propertyName.length > 0 ? next() : next({ status: 400, message: `Reservation must have: ${propertyName}.`})
  }
}

function reservationDayIsNotTuesday(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  let day = new Date(`${reservation_date} ${reservation_time}`);
  if (day.getDay() !== 2) {
    next();
  } else {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays, please select another day.",
    });
  }
}

async function create(req, res){
  const {data: { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = {} } = req.body

  const newReserve = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people
  }
  console.log("You did it! Great job!")
  //then push the newReserve into somewhere?
  const response = await service.create(newReserve)
  console.log("response: ", response)
  res.status(201).json({ data: newReserve })

  // res.json({ data: await service.create(req.body.data)})


  //pass data to service here
  //const data = await service.create(req.body.data)
  //return res.status(201).json({ data })


  //await service
//  .create(req.body.date)
//  .then((data )=> res.status(201).json({ data }))
//  .catch(next)
  // res.send({ data: "hello from the server"})
  
}

module.exports = {
  list: asyncErrorBoundary(list),

  create: [
    asyncErrorBoundary(bodyHasData("first_name")),
    asyncErrorBoundary(bodyHasData("last_name")),
    asyncErrorBoundary(bodyHasData("mobile_number")),
    asyncErrorBoundary(bodyHasData("reservation_date")),
    asyncErrorBoundary(bodyHasData("reservation_time")),
    asyncErrorBoundary(bodyHasData("people")),
    reservationDayIsNotTuesday,
    asyncErrorBoundary(create)
  ]
};
