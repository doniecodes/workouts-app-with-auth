const express = require("express");
const router = express.Router();

const { getSingleWorkout, getAllWorkouts, postWorkout,
    deleteWorkout, updateWorkout } = require("../controllers/workoutsController");

const authRequired = require("../middleware/authRequired");


// Auth required
router.use(authRequired);
// Get all workouts
router.get("/", getAllWorkouts);
// Get single workout
router.get("/:id", getSingleWorkout);
// post workout
router.post("/", postWorkout);
// delete workout
router.delete("/:id", deleteWorkout);
// Update workout
router.patch("/:id", updateWorkout);

module.exports = router;