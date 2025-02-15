const express = require("express");
const Workout = require("../models/workoutsModel")
const workoutController = require("../controllers/workoutController")
const authRequired = require("../middleware/authRequired")


const router = express.Router();

// Auth required
router.use(authRequired)

// GEt all workouts
router.get("/", workoutController.getAllWorkouts);

// Get a single workout
router.get("/:id", workoutController.getSingleWorkout);

// Post a new workout
router.post("/", workoutController.createWorkout);

// Delete a workout
router.delete("/:id", workoutController.deleteWorkout);

// Update a workout
router.patch("/:id", workoutController.updateWorkout)

module.exports = router;