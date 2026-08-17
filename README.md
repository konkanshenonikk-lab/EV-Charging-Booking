# EV Charging Booking

A simple EV Charging Station Booking web app built with HTML, CSS, JavaScript, Node.js and Express.

- No authentication — no login, no JWT, no password system.
- Data stored in `data.json`, served through a REST API.
- Pure REST: GET, POST, PUT, DELETE for stations and bookings.

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

```bash
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

Then open your browser at:

```
http://localhost:3000
```

## Data Models

**Station**

```json
{
  "id": 1,
  "name": "City EV Charging Hub",
  "location": "Mangalore",
  "distance": 2.5,
  "totalChargers": 6,
  "availableChargers": 4,
  "chargingType": "DC Fast",
  "pricePerKwh": 15,
  "status": "Available"
}
```

**Booking**

```json
{
  "id": 1,
  "stationId": 1,
  "chargerNumber": 2,
  "date": "2026-08-20",
  "time": "10:30",
  "userName": "Test User",
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
  "distance": 3.2,
  "totalChargers": 4,
  "availableChargers": 3,
  "chargingType": "AC",
  "pricePerKwh": 12,
  "status": "Available"
}
```

- Response: `201 Created`

**4. PUT (update) a station**
- Method: `PUT`
- URL: `/api/stations/1`
- Body → raw → JSON:

```json
{
  "availableChargers": 2,
  "status": "Busy"
}
```

- Response: `200 OK` — the updated station

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
- Response: `200 OK` — JSON array of all bookings

**7. POST a new booking**
- Method: `POST`
- URL: `/api/bookings`
- Body → raw → JSON:

```json
{
  "stationId": 1,
  "chargerNumber": 2,
  "date": "2026-08-20",
  "time": "10:30",
  "userName": "Test User"
}
```

- Response: `201 Created`

**8. PUT (update) a booking**
- Method: `PUT`
- URL: `/api/bookings/1`
- Body → raw → JSON:

```json
{
  "time": "12:30",
  "status": "Confirmed"
}
```

- Response: `200 OK` — the updated booking

**9. DELETE a booking**
- Method: `DELETE`
- URL: `/api/bookings/1`
- Body: none
- Response: `200 OK`

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
| 500  | Internal server error |

## Project Structure

```
EV-Charging-Booking/
├── data.json
├── index.html
├── script.js
├── style.css
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

### File Description

| File | Description |
|------|--------------|
| `index.html` | Frontend structure of the EV Charging Booking application |
| `style.css` | Styling and layout of the website |
| `script.js` | Frontend JavaScript functionality and communication with the backend API |
| `server.js` | Runs the Node.js/Express server and provides the REST API |
| `data.json` | Project data used by the application |
| `package.json` | Project information and required Node.js dependencies |
| `README.md` | Project documentation and API usage instructions |

## Conclusion

The EV Charging Booking project provides a simple web-based solution for viewing charging stations and managing EV charging bookings. It demonstrates frontend development, backend REST APIs, CRUD operations, and basic data management using Node.js and Express.
