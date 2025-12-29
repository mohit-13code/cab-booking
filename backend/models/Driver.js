const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {type: String,required: true},
  locationNode: {type: Number,default: 0},
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Driver", driverSchema);
