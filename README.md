# Restaurant Reservation System

# Deployed Link
https://restaurant-res-front.herokuapp.com/


# Screenshots of the API
### Dashboard
![Dashboard](/front-end/src/images/Dashboard.PNG?raw=true "Dashboard")

### Creating a reservation
![CreateReservation](/front-end/src/images/CreateReservation.PNG "CreateReservation")

### Creating a table
![CreateTable](/front-end/src/images/CreateTable.PNG "CreateTable")

### Searching By Phone
![SearchingByPhone](/front-end/src/images/Search.PNG "SearchingByPhone")

# Description
This application is designed to allow restaurant staff members to manage customer reservations.
This application can:
- Create, edit, and display all reservations
- Add additional tables/seating
- Assign reservations to a table
- Keep track of which tables are free or occupied
- Free up an occupied table
- Search for a reservation by phone number

# Tech
- Node.js
- Express
- React
- Bootstrap
- PostGREsql

# Installation instructions

1. Fork and clone this repository.
1. Run `cd starter-restaurant-reservation/`
1. Run `cp ./.env.sample ./.env` in the front end and back end
1. Front end's .env file should have: `REACT_APP_API_BASE_URL=http://localhost:5001`
1. Back end's .env file should be 4 different URLs to your host (i.e. ElephantSQL)
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.
