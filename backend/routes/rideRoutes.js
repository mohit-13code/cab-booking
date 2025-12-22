const express = require("express");
const Driver = require("../models/Driver");
const Ride = require("../models/Ride");
const dijkstra = require("../algorithms/dijkstra");
const graph = require("../algorithms/graph");

const router = express.Router();

router.post("/request", async (req, res) => {
  const { userId, sourceNode, destinationNode } = req.body;

  // const graph = {
  //   0: { 1: 4, 2: 1 },
  //   1: { 0: 4, 3: 1 },
  //   2: { 0: 1, 3: 5, 4: 3 },
  //   3: { 1: 1, 2: 5, 4: 3 },
  //   4: { 2: 3, 3: 3 }
  // };

  const distances = dijkstra(graph, sourceNode);

  if (!distances || Object.keys(distances).length === 0 || distances[destinationNode] === undefined) {
  return res.status(400).json({ msg: "Invalid nodes" });
}

  const drivers = await Driver.find({ available: true });

  console.log(drivers); 

  let nearestDriver = null;
  let minDist = Infinity;

  drivers.forEach(driver => {
    const d = distances[driver.locationNode];
    if (d < minDist) {
      minDist = d;
      nearestDriver = driver;
    }
  });

  if (!nearestDriver)
    return res.status(400).json({ msg: "No drivers available" });

  const fare = distances[destinationNode] * 10;
  const comingFare =minDist * 10;
  const ride = new Ride({
    userId,
    driverId: nearestDriver._id,
    driver: nearestDriver.name,
    sourceNode,
    destinationNode,
    fare 
  });

  nearestDriver.available = false;
  nearestDriver.locationNode = destinationNode;
  await nearestDriver.save();
  await ride.save();

  res.json({ msg: `Ride booked with ${nearestDriver.name}`, ride });
  
  
});

module.exports = router;
