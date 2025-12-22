Smart Cab Booking System (MERN – Backend Focused)
📌 Overview

The Smart Cab Booking System is a backend-focused MERN project that simulates the core logic of a ride-hailing platform like Uber or Ola.
The system allocates the nearest available driver to a user’s ride request using Dijkstra’s shortest path algorithm on a city graph.

This project emphasizes system design, algorithms, and backend development rather than UI complexity.

🎯 Objectives

Design a simplified cab booking backend
Implement efficient driver allocation
Demonstrate real-world use of graph algorithms
Build RESTful APIs using Node.js and Express

🛠 Tech Stack
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication (optional)
Algorithm: Dijkstra (JavaScript)

🧩 Features
User and driver data management
Static city map represented as a weighted graph
Nearest driver selection using Dijkstra’s algoithm
Fare calculation based on shortest distance
Ride booking and storage
API-based interaction (tested using Postman)

🏗 System Architecture
Client (Postman / UI)
        |
        v
Express REST APIs
        |
        v
Driver Allocation Logic (Dijkstra)
        |
        v
MongoDB Database

📂 Project Structure
cab-booking-mern/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Driver.js
│   │   └── Ride.js
│   ├── algorithms/
│   │   └── dijkstra.js
│   ├── routes/
│   │   └── rideRoutes.js
│   ├── server.js
│   └── package.json
├── README.md

⚙️ How Driver Allocation Works
The city is modeled as a weighted graph
The user submits a ride request with a source location
Dijkstra’s algorithm computes shortest distances from the source
The nearest available driver is selected
Fare is calculated based on distance
Ride details are stored in the database

🚀 How to Run the Project
Prerequisites
Node.js
MongoDB (local)

Steps
git clone <repository-url>
cd cab-booking-mern/backend
npm install
node server.js


Server runs on:

http://localhost:5000

📮 API Example (Postman)

POST /api/rides/request

{
  "userId": "12345",
  "sourceNode": 0,
  "destinationNode": 3
}


Response:

{
  "msg": "Ride booked",
  "ride": {
    "fare": 50,
    "driverId": "...",
    "sourceNode": 0,
    "destinationNode": 3
  }
}

📈 Future Enhancements

Real-time driver tracking using GPS
Frontend using React
Google Maps integration
Dynamic traffic-based pricing
WebSocket-based live ride updates

📄 Disclaimer
This project is a simplified academic implementation intended to demonstrate backend logic, algorithms, and system design principles.

👤 Author
Mohit Gupta
IT – 2nd Year