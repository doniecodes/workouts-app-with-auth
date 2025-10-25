const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// Get all workouts
const getAllWorkouts = async (req, res)=> {
    try {
        const user_id = req.user._id;
        const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
        if(!workouts){
            return res.status(400).json({error: "Could not find workouts"})
        }
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get a single workout.
const getSingleWorkout = async (req, res)=> {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({ error: "That workout was not found" });
    }
    try {
        const workout = await Workout.findById(id);
        if(!workout){
            return res.status(404).json({ error: "No such workout" });
        }
        res.status(200).json(workout);
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

// Post/ create workout
const postWorkout = async (req, res)=> {
    const { title, load, reps } = req.body;
    let emptyFields = [];

    if(!title){
        emptyFields.push("title");
    }
    if(!load){
        emptyFields.push("load");
    }
    if(!reps){
        emptyFields.push("reps");
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
    }

    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ title, load, reps, user_id });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete workout
const deleteWorkout = async (req, res)=> {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: "That workout was not found" });
    }
    try {
        const workout = await Workout.findOneAndDelete({ _id: id });
        if(!workout){
            return res.status(404).json({ error: "No such workout" });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Update workout
const updateWorkout = async (req, res)=> {
    const { id } = req.params;
    const body = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({ error: "That workout was not found" });
    }
    try {
        const workout = await Workout.findOneAndUpdate({ _id: id }, { ...body });
        if(!workout){
            return res.status(404).json({ error: "No such workout" });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getSingleWorkout,
    getAllWorkouts,
    postWorkout,
    deleteWorkout,
    updateWorkout
}