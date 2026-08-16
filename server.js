const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

function getData() {
  return JSON.parse(fs.readFileSync("data.json", "utf8"));
}

function saveData(data) {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/stations", (req, res) => {
  res.status(200).json(getData().stations);
});

app.get("/api/stations/:id", (req, res) => {
  const data = getData();
  const station = data.stations.find(s => s.id === Number(req.params.id));

  if (!station) return res.status(404).json({ message: "Charging station not found" });
  res.status(200).json(station);
});

app.post("/api/stations", (req, res) => {
  const data = getData();
  const { name, location, address, chargingType, availability, operatingHours, contact } = req.body;

  if (!name || !location || !address || !chargingType) {
    return res.status(400).json({ message: "Please fill all required station details" });
  }

  const newStation = {
    id: data.stations.length + 1,
    name,
    location,
    address,
    chargingType,
    availability: availability || "Available",
    operatingHours: operatingHours || "9:00 AM - 9:00 PM",
    contact: contact || "Not provided"
  };

  data.stations.push(newStation);
  saveData(data);

  res.status(201).json({ message: "Station added successfully", station: newStation });
});

app.put("/api/stations/:id", (req, res) => {
  const data = getData();
  const station = data.stations.find(s => s.id === Number(req.params.id));
  if (!station) return res.status(404).json({ message: "Charging station not found" });

  // Only update fields that were actually sent
  const fields = ["name", "location", "address", "chargingType", "availability", "operatingHours", "contact"];
  fields.forEach(field => {
    if (req.body[field]) station[field] = req.body[field];
  });

  saveData(data);
  res.status(200).json({ message: "Station updated successfully", station });
});

app.delete("/api/stations/:id", (req, res) => {
  const data = getData();
  const index = data.stations.findIndex(s => s.id === Number(req.params.id));

  if (index === -1) return res.status(404).json({ message: "Charging station not found" });

  data.stations.splice(index, 1);
  saveData(data);

  res.status(200).json({ message: "Station deleted successfully" });
});

// ---------- BOOKINGS ----------

app.get("/api/bookings", (req, res) => {
  res.status(200).json(getData().bookings);
});

app.get("/api/bookings/:id", (req, res) => {
  const data = getData();
  const booking = data.bookings.find(b => b.id === Number(req.params.id));

  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.status(200).json(booking);
});

app.post("/api/bookings", (req, res) => {
  const data = getData();
  const { userName, contact, stationId, date, time, vehicle, visitors } = req.body;

  if (!userName || !contact || !stationId || !date || !time || !vehicle) {
    return res.status(400).json({ message: "Please fill all booking details" });
  }

  const station = data.stations.find(s => s.id === Number(stationId));
  if (!station) return res.status(404).json({ message: "Selected charging station not found" });
  if (station.availability !== "Available") {
    return res.status(409).json({ message: "This charging station is currently not available" });
  }

  const newBooking = {
    id: data.bookings.length + 1,
    userName,
    contact,
    stationId: Number(stationId),
    stationName: station.name,
    date,
    time,
    vehicle,
    visitors: visitors || 1,
    status: "Confirmed"
  };

  data.bookings.push(newBooking);
  saveData(data);

  res.status(201).json({ message: "Booking created successfully", booking: newBooking });
});

app.put("/api/bookings/:id", (req, res) => {
  const data = getData();
  const booking = data.bookings.find(b => b.id === Number(req.params.id));
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  // Only update fields that were actually sent
  const fields = ["userName", "contact", "date", "time", "vehicle", "visitors"];
  fields.forEach(field => {
    if (req.body[field]) booking[field] = req.body[field];
  });

  saveData(data);
  res.status(200).json({ message: "Booking updated successfully", booking });
});

app.delete("/api/bookings/:id", (req, res) => {
  const data = getData();
  const booking = data.bookings.find(b => b.id === Number(req.params.id));

  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = "Cancelled";
  saveData(data);

  res.status(200).json({ message: "Booking cancelled successfully", booking });
});

app.listen(PORT, () => {
  console.log(`EV Charging App running at http://localhost:${PORT}`);
});
