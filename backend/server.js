const mongoose = require("mongoose");
require('dotenv').config()
const cors = require("cors");
const cookieParser = require("cookie-parser");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/userRoutes");

const express = require('express')

// express app
const app = express()

// cors congifuration
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PATCH", "PUT"]
}))

// middleware
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// workout routes
app.use("/api/workouts", workoutRoutes);
// user routes
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 4000
// Connect to db
mongoose.connect(process.env.MONGO_URI)
.then((result)=> {
  // listen for requests
  app.listen(process.env.PORT, () => {
  console.log(`Connected to db & listening on port ${PORT}`)
})
})
.then((err)=> {
  console.log(err)
})