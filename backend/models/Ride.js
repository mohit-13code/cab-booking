const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  userId: String,
  driverId: String,
  driver:String,
  sourceNode: Number,
  destinationNode: Number,
  comingFare: Number,
  totalFare: Number
});

module.exports = mongoose.model("Ride", rideSchema);
