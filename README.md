
# EV Charging Booking

A simple EV Charging Station Booking web application built using HTML, CSS, JavaScript, Node.js and Express.

## Features

- View available EV charging stations
- View charging station details
- Book a charging slot
- View booking information
- Update booking details
- Delete bookings
- Simple REST API using Node.js and Express
- Data stored in JavaScript/JSON memory
- Beginner-friendly frontend and backend structure

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- REST API
- JSON

## How to Run

### 1. Install dependencies

Open the terminal inside the project folder:

bash
npm install

2. Start the server

node server.js

Or, if a start script is available:

npm start

You should see:

EV Charging Booking Server running on http://localhost:3000

3. Open the website

Open:

http://localhost:3000

The EV Charging Booking application should now be available.


---

API Endpoints

Base URL:

http://localhost:3000

1. GET All Charging Stations

Method: GET

URL:

http://localhost:3000/api/stations

Body: None

Expected Response:

200 OK

Returns all available charging stations.


---

2. GET Charging Station by ID

Method: GET

URL:

http://localhost:3000/api/stations/1

Body: None

Expected Response:

200 OK

Returns the details of a particular charging station.

For an invalid ID:

http://localhost:3000/api/stations/999

Expected:

404 Not Found


---

3. POST a New Charging Station

Method: POST

URL:

http://localhost:3000/api/stations

Body: JSON

{
  "name": "New EV Charging Station",
  "location": "Mangalore",
  "distance": 3.2,
  "totalChargers": 4,
  "availableChargers": 3,
  "chargingType": "AC",
  "pricePerKwh": 12,
  "status": "Available"
}

Expected Response:

201 Created


---

4. PUT / Update a Charging Station

Method: PUT

URL:

http://localhost:3000/api/stations/1

Body: JSON

{
  "availableChargers": 2,
  "status": "Busy"
}

Expected Response:

200 OK

Returns the updated charging station.


---

5. DELETE a Charging Station

Method: DELETE

URL:

http://localhost:3000/api/stations/1

Body: None

Expected Response:

200 OK

Deletes the selected charging station.


---

Booking API

6. GET All Bookings

Method: GET

URL:

http://localhost:3000/api/bookings

Body: None

Expected Response:

200 OK

Returns all charging bookings.


---

7. POST a New Booking

Method: POST

URL:

http://localhost:3000/api/bookings

Body: JSON

{
  "stationId": 1,
  "chargerNumber": 2,
  "date": "2026-08-20",
  "time": "10:30",
  "userName": "Test User"
}

Expected Response:

201 Created

Creates a new charging booking.


---

8. PUT / Update a Booking

Method: PUT

URL:

http://localhost:3000/api/bookings/1

Body: JSON

{
  "time": "12:30",
  "status": "Confirmed"
}

Expected Response:

200 OK

Updates the selected booking.


---

9. DELETE a Booking

Method: DELETE

URL:

http://localhost:3000/api/bookings/1

Body: None

Expected Response:

200 OK

Deletes the selected booking.


---

Testing in Postman

The API can be tested using Postman.

Base URL

http://localhost:3000

For GET requests, no body is required.

For POST and PUT requests, select:

Body → raw → JSON

and enter the required JSON data.


---

HTTP Status Codes Used

Code	Meaning

200	Successful GET / PUT / DELETE
201	Resource created successfully
400	Invalid input
404	Station or booking not found
500	Internal server error



---

Project Structure

EV-Charging-Booking/
│
├── data.json
├── index.html
├── script.js
├── style.css
├── server.js
├── package.json
├── package-lock.json
└── README.md

File Description

index.html
Contains the frontend structure of the EV Charging Booking application.

style.css
Contains the styling and layout of the website.

script.js
Handles frontend JavaScript functionality and communication with the backend API.

server.js
Runs the Node.js/Express server and provides the REST API.

data.json
Contains the project data used by the application.

package.json
Contains project information and required Node.js dependencies.

README.md
Contains project documentation and API usage instructions.


---

Conclusion

The EV Charging Booking project provides a simple web-based solution for viewing charging stations and managing EV charging bookings. It demonstrates frontend development, backend REST APIs, CRUD operations and basic data management using Node.js and Express.

 

 
