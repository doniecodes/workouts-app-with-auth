const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// middleware
app.use(express.json())
app.use(cors({
    target: "http://localhost:3000",
    methods: [ "GET", "POST", "DELETE", "PUT", "PATCH" ]
}))

// Workout Routes
app.use("/api/workouts", workoutRoutes);

// User Routes
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI)
.then((result)=> {
    app.listen(PORT, ()=> {
    console.log("Listening on PORT" + " " + PORT);
})
}).catch((err)=> {
    console.log(err);
})