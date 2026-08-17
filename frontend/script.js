let stations = [];
let bookings = [];

loadStations();
loadBookings();

function showSection(sectionId) {
  document.getElementById("stationsSection").classList.add("hidden");
  document.getElementById("bookingSection").classList.add("hidden");
  document.getElementById("bookingsSection").classList.add("hidden");
  document.getElementById(sectionId).classList.remove("hidden");

  if (sectionId === "bookingsSection") loadBookings();
}

async function loadStations() {
  try {
    const response = await fetch("/api/stations");
    if (!response.ok) throw new Error("Unable to load stations");

    stations = await response.json();
    displayStations(stations);
    fillStationSelect(stations);
  } catch (error) {
    showMessage("Could not load charging stations.", "error");
  }
}

function displayStations(list) {
  const stationList = document.getElementById("stationList");
  stationList.innerHTML = "";

  if (list.length === 0) {
    stationList.innerHTML = "<p>No charging stations found.</p>";
    return;
  }

  list.forEach(station => {
    const statusClass = station.availability === "Available" ? "available" : "busy";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${station.name}</h3>
      <p><strong>Location:</strong> ${station.location}</p>
      <p><strong>Address:</strong> ${station.address}</p>
      <p><strong>Charging Type:</strong> ${station.chargingType}</p>
      <p><strong>Status:</strong> <span class="${statusClass}">${station.availability}</span></p>
      <p><strong>Operating Hours:</strong> ${station.operatingHours}</p>
      <p><strong>Contact:</strong> ${station.contact}</p>
      <button onclick="selectStation(${station.id})">Book This Station</button>
    `;
    stationList.appendChild(card);
  });
}

function fillStationSelect(list) {
  const select = document.getElementById("stationId");
  select.innerHTML = '<option value="">Select a station</option>';

  list
    .filter(station => station.availability === "Available")
    .forEach(station => {
      select.innerHTML += `<option value="${station.id}">${station.name} - ${station.location}</option>`;
    });
}

function selectStation(id) {
  showSection("bookingSection");
  document.getElementById("stationId").value = id;
}

document.getElementById("searchInput").addEventListener("input", filterStations);
document.getElementById("typeFilter").addEventListener("change", filterStations);
document.getElementById("availabilityFilter").addEventListener("change", filterStations);

function filterStations() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const type = document.getElementById("typeFilter").value;
  const availability = document.getElementById("availabilityFilter").value;

  const filtered = stations.filter(station => {
    const matchesSearch =
      station.name.toLowerCase().includes(search) ||
      station.location.toLowerCase().includes(search);
    const matchesType = type === "" || station.chargingType === type;
    const matchesAvailability = availability === "" || station.availability === availability;

    return matchesSearch && matchesType && matchesAvailability;
  });

  displayStations(filtered);
}

document.getElementById("bookingForm").addEventListener("submit", createBooking);

async function createBooking(event) {
  event.preventDefault();

  const userName = document.getElementById("userName").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const stationId = document.getElementById("stationId").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const vehicle = document.getElementById("vehicle").value.trim();
  const visitors = document.getElementById("visitors").value;

  if (!userName || !contact || !stationId || !date || !time || !vehicle) {
    showMessage("Please fill all the fields.", "error");
    return;
  }

  if (contact.length < 10) {
    showMessage("Please enter a valid contact number.", "error");
    return;
  }

  const booking = {
    userName,
    contact,
    stationId: Number(stationId),
    date,
    time,
    vehicle,
    visitors: Number(visitors)
  };

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });

    const result = await response.json();
    if (!response.ok) {
      showMessage(result.message, "error");
      return;
    }

    showMessage("Booking confirmed successfully!", "success");
    document.getElementById("bookingForm").reset();
    loadBookings();
  } catch (error) {
    showMessage("Could not connect to the server.", "error");
  }
}

async function loadBookings() {
  try {
    const response = await fetch("/api/bookings");
    bookings = await response.json();
    displayBookings(bookings);
  } catch (error) {
    showMessage("Could not load bookings.", "error");
  }
}

function displayBookings(list) {
  const bookingList = document.getElementById("bookingList");
  bookingList.innerHTML = "";

  if (list.length === 0) {
    bookingList.innerHTML = "<p>No bookings yet.</p>";
    return;
  }

  list.forEach(booking => {
    const isConfirmed = booking.status === "Confirmed";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>Booking #${booking.id}</h3>
      <p><strong>Name:</strong> ${booking.userName}</p>
      <p><strong>Station:</strong> ${booking.stationName}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Time:</strong> ${booking.time}</p>
      <p><strong>Vehicle:</strong> ${booking.vehicle}</p>
      <p><strong>Status:</strong> ${booking.status}</p>
      <div class="booking-buttons">
        <button onclick="viewBooking(${booking.id})">View Details</button>
        ${isConfirmed ? `<button onclick="updateBooking(${booking.id})">Update</button>` : ""}
        ${isConfirmed ? `<button onclick="cancelBooking(${booking.id})">Cancel</button>` : ""}
      </div>
    `;
    bookingList.appendChild(card);
  });
}

async function viewBooking(id) {
  try {
    const response = await fetch("/api/bookings/" + id);
    const booking = await response.json();

    if (!response.ok) {
      showMessage(booking.message, "error");
      return;
    }

    alert(
      `BOOKING DETAILS\n\n` +
      `Booking ID: ${booking.id}\n` +
      `Name: ${booking.userName}\n` +
      `Contact: ${booking.contact}\n` +
      `Station: ${booking.stationName}\n` +
      `Date: ${booking.date}\n` +
      `Time: ${booking.time}\n` +
      `Vehicle: ${booking.vehicle}\n` +
      `Number of Users: ${booking.visitors}\n` +
      `Status: ${booking.status}`
    );
  } catch (error) {
    showMessage("Could not load booking details.", "error");
  }
}

async function updateBooking(id) {
  try {
    const response = await fetch("/api/bookings/" + id);
    const booking = await response.json();

    if (!response.ok) {
      showMessage(booking.message, "error");
      return;
    }

    const newDate = prompt("Enter new date:", booking.date);
    if (newDate === null) return;

    const newTime = prompt("Enter new time:", booking.time);
    if (newTime === null) return;

    const newVehicle = prompt("Enter vehicle information:", booking.vehicle);
    if (newVehicle === null) return;

    const newContact = prompt("Enter contact number:", booking.contact);
    if (newContact === null) return;

    const updatedBooking = { date: newDate, time: newTime, vehicle: newVehicle, contact: newContact };

    const updateResponse = await fetch("/api/bookings/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBooking)
    });

    const result = await updateResponse.json();
    if (!updateResponse.ok) {
      showMessage(result.message, "error");
      return;
    }

    showMessage("Booking updated successfully!", "success");
    loadBookings();
  } catch (error) {
    showMessage("Could not update booking.", "error");
  }
}

async function cancelBooking(id) {
  const confirmed = confirm("Are you sure you want to cancel this booking?");
  if (!confirmed) return;

  try {
    const response = await fetch("/api/bookings/" + id, { method: "DELETE" });
    const result = await response.json();

    if (!response.ok) {
      showMessage(result.message, "error");
      return;
    }

    showMessage("Booking cancelled successfully.", "success");
    loadBookings();
  } catch (error) {
    showMessage("Could not connect to the server.", "error");
  }
}

function showMessage(text, type) {
  const message = document.getElementById("message");
  message.textContent = text;
  message.className = type;

  setTimeout(() => {
    message.textContent = "";
    message.className = "";
  }, 4000);
}
