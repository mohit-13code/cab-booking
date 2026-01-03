const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {type: String,required: true},
  locationNode: {type: Number,default: 0},
  available: { type: Boolean, default: true },
  phone:{type: Number,required: true, match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"]}
});

module.exports = mongoose.model("Driver", driverSchema);
