const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  userId: String,
  driverId: String,
  driver:String,
  sourceNode: Number,
  destinationNode: Number,
  fare: Number
});

module.exports = mongoose.model("Ride", rideSchema);
