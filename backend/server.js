const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/cabdb");

app.use("/api/rides", require("./routes/rideRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
