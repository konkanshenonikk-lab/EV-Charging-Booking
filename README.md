# EV Charging Booking

A full-stack web app for finding EV charging stations and booking a charging slot — built with a Node.js/Express backend and a plain HTML/CSS/JS frontend.

- No authentication — no login, no JWT, no password system.
- Data lives in `data.json` on the backend, served through a REST API.
- Pure REST: GET, POST, PUT, DELETE for both stations and bookings.

## Features

- View available EV charging stations
- View charging station details
- Book a charging slot
- View booking information
- Update booking details
- Delete bookings
- Simple REST API using Node.js and Express
- Data stored in JSON
- Beginner-friendly frontend and backend structure

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- REST API
- JSON

## How to Run

**1. Start the backend**

```bash
cd backend
npm install
node server.js
```

or

```bash
npm start
```

You should see:

```
EV Charging Booking Server running on http://localhost:3000
```

**2. Open the frontend**

Open `frontend/index.html` directly in your browser (double-click it, or use VS Code's "Open with Live Server"). It calls the backend at `http://localhost:3000`, so make sure the backend is running first.

## Data Models

**Station**

```json
{
  "id": 1,
  "name": "GreenCharge Hub",
  "location": "Mangalore",
  "address": "MG Road, Mangalore",
  "chargingType": "Fast Charging",
  "availability": "Available",
  "operatingHours": "6:00 AM - 10:00 PM",
  "contact": "9876543210"
}
```

**Booking**

```json
{
  "id": 3,
  "userName": "Nidhish",
  "contact": "9876543210",
  "stationId": 1,
  "stationName": "GreenCharge Hub",
  "date": "2026-08-20",
  "time": "10:00",
  "vehicle": "Tata Nexon EV",
  "visitors": 1,
  "status": "Confirmed"
}
```

## API Endpoints

Base URL: `http://localhost:3000`

### Station API

**1. GET all stations**
- Method: `GET`
- URL: `/api/stations`
- Body: none
- Response: `200 OK` — JSON array of all stations

**2. GET station by ID**
- Method: `GET`
- URL: `/api/stations/1`
- Body: none
- Response: `200 OK` — one station object
- Invalid ID → `/api/stations/999` → `404 Not Found`

**3. POST a new station**
- Method: `POST`
- URL: `/api/stations`
- Body → raw → JSON:

```json
{
  "name": "New EV Station",
  "location": "Mangalore",
  "address": "MG Road, Mangalore",
  "chargingType": "Fast Charging",
  "availability": "Available",
  "operatingHours": "6:00 AM - 10:00 PM",
  "contact": "9876543210"
}
```

- Response: `201 Created`

**4. PUT (update) a station**
- Method: `PUT`
- URL: `/api/stations/2`
- Body → raw → JSON (send only the fields you want to change):

```json
{
  "availability": "Busy"
}
```

- Response: `200 OK`

```json
{
  "message": "Station updated successfully",
  "station": {
    "id": 2,
    "name": "EV Power Station",
    "location": "Bangalore",
    "address": "Whitefield Main Road, Bangalore",
    "chargingType": "DC Fast Charging",
    "availability": "Busy",
    "operatingHours": "24 Hours",
    "contact": "9876501234"
  }
}
```

**5. DELETE a station**
- Method: `DELETE`
- URL: `/api/stations/1`
- Body: none
- Response: `200 OK`

### Booking API

**6. GET all bookings**
- Method: `GET`
- URL: `/api/bookings`
- Body: none
- Response: `200 OK`

```json
[
  {
    "id": 1,
    "userName": "Nikhil",
    "contact": "9090798687",
    "stationId": 1,
    "stationName": "GreenCharge Hub",
    "date": "2026-08-17",
    "time": "05:30",
    "vehicle": "OLECTRA SCOOTY",
    "visitors": 1,
    "status": "Cancelled"
  },
  {
    "id": 2,
    "userName": "Nikhil",
    "contact": "9090798687",
    "stationId": 1,
    "stationName": "GreenCharge Hub",
    "date": "2026-08-17",
    "time": "06:30",
    "vehicle": "OLECTRA SCOOTY",
    "visitors": 1,
    "status": "Cancelled"
  }
]
```

**7. POST a new booking**
- Method: `POST`
- URL: `/api/bookings`
- Body → raw → JSON:

```json
{
  "userName": "Nidhish",
  "contact": "9876543210",
  "stationId": 1,
  "date": "2026-08-20",
  "time": "10:00",
  "vehicle": "Tata Nexon EV",
  "visitors": 1
}
```

- Response: `201 Created`

```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": 3,
    "userName": "Nidhish",
    "contact": "9876543210",
    "stationId": 1,
    "stationName": "GreenCharge Hub",
    "date": "2026-08-20",
    "time": "10:00",
    "vehicle": "Tata Nexon EV",
    "visitors": 1,
    "status": "Confirmed"
  }
}
```

**8. PUT (update) a booking**
- Method: `PUT`
- URL: `/api/bookings/4`
- Body → raw → JSON:

```json
{
  "userName": "Nidhish",
  "contact": "9876543259",
  "stationId": 1,
  "date": "2026-08-22",
  "time": "11:00",
  "vehicle": "Tata Punch EV",
  "visitors": 1,
  "status": "Confirmed"
}
```

- Response: `200 OK`

```json
{
  "message": "Booking updated successfully",
  "booking": {
    "id": 4,
    "userName": "Nidhish",
    "contact": "9876543259",
    "stationId": 1,
    "stationName": "GreenCharge Hub",
    "date": "2026-08-22",
    "time": "11:00",
    "vehicle": "Tata Punch EV",
    "visitors": 1,
    "status": "Confirmed"
  }
}
```

**9. DELETE a booking**
- Method: `DELETE`
- URL: `/api/bookings/3`
- Body: none
- Response: `200 OK`

```json
{
  "message": "Booking cancelled successfully",
  "booking": {
    "id": 3,
    "userName": "Nidhish",
    "contact": "9876543210",
    "stationId": 1,
    "stationName": "GreenCharge Hub",
    "date": "2026-08-20",
    "time": "10:00",
    "vehicle": "Tata Nexon EV",
    "visitors": 1,
    "status": "Cancelled"
  }
}
```

> Note: this doesn't remove the booking from `data.json` — it flips `status` to `"Cancelled"` and returns the updated record.

## Testing in Postman

Base URL: `http://localhost:3000`

- For GET requests, no body is required.
- For POST and PUT requests, select **Body → raw → JSON** and enter the required JSON data.

## HTTP Status Codes Used

| Code | Meaning |
|------|---------|
| 200  | Successful GET / PUT / DELETE |
| 201  | Resource created successfully |
| 400  | Invalid input |
| 404  | Station or booking not found |
| 409  | Charging station is currently unavailable |
| 500  | Internal server error |
 
## Project Structure

```
EV-Charging-Booking/
├── backend/
│   ├── server.js
│   ├── data.json
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

### File Description

| File | Description |
|------|--------------|
| `frontend/index.html` | Frontend structure of the EV Charging Booking application |
| `frontend/style.css` | Styling and layout of the website |
| `frontend/script.js` | Frontend JavaScript functionality and communication with the backend API |
| `backend/server.js` | Runs the Node.js/Express server and provides the REST API |
| `backend/data.json` | Project data used by the application |
| `backend/package.json` | Project information and required Node.js dependencies |
| `README.md` | Project documentation and API usage instructions |

## Conclusion

EV Charging Booking is a small full-stack project for browsing charging stations and booking a slot — built to practice a real frontend-to-backend flow, REST API design, and CRUD operations with Node.js and Express.
