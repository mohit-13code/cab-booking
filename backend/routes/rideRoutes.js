const express = require("express");
const Driver = require("../models/Driver");
const Ride = require("../models/Ride");
const dijkstra = require("../algorithms/dijkstra");
const graph = require("../algorithms/graph");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/request", auth, async (req, res) => {
  const { sourceNode, destinationNode } = req.body;
  const userId = req.user.id;

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
    const locationNode = driver.locationNode !== undefined ? driver.locationNode : 0;
    const d = distances[locationNode];
    if (d !== undefined && typeof d === 'number' && d < minDist) {
      minDist = d;
      nearestDriver = driver;
    }
  });

  if (!nearestDriver)
    return res.status(400).json({ msg: "No drivers available" });

  const fare = distances[destinationNode] * 10;
  const comingFare = minDist * 10;
  const totalFare=fare+comingFare;
  
  const ride = new Ride({
    userId,
    user:req.user.name,
    driverId: nearestDriver._id,
    driver: nearestDriver.name,
    sourceNode,
    destinationNode,
    comingFare,
    totalFare 
  });

  nearestDriver.available = false;
  nearestDriver.locationNode = destinationNode;
  await nearestDriver.save();
  await ride.save();

  res.json({ msg: `Ride booked with ${nearestDriver.name}`, ride });
  
  
});

module.exports = router;
