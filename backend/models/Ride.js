const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  userId: String,
  user:String,
  driverId: String,
  driver:String,
  phone: Number,
  sourceNode: Number,
  destinationNode: Number,
  comingFare: Number,
  totalFare: Number
});

module.exports = mongoose.model("Ride", rideSchema);
