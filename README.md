# H1 Restaurant Reservation System

# Live Link
https://restaurant-res-front.herokuapp.com/


# Screenshots of the API
![Dashboard] (/images/Dashboard.png)
![CreateReservation] (/images/CreateReservation.PNG)
![CreateTable] (/images/CreateTable.PNG)
![SearchingByPhone] (/images/Search.PNG)

# Summary of what the application does, try to frame this from the standpoint of what the user does or how the application benefits the user
This application is designed to allow restaurant staff members to manage customer reservations.
This application can:
- Create, edit, and display all reservations
- Add additional tables/seating
- Assign reservations to a table
- Keep track of which tables are free or occupied
- Free up an occupied table
- Search for a reservation by phone number

# Technologies used
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
