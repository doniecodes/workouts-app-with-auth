const Workout = require("../models/workoutsModel");
const mongoose = require("mongoose");


// handleErrors
const handleErrors = (err)=> {
    let errors = { title: "", load: "", reps: "", allErrors: ""};
    if(err.message = "workout validation failed"){
        Object.values(err.errors).forEach((error)=> {
            const props = error.properties;
            errors[props.path] = `${[props.path]} is required`;
        })
    }

    return errors;
}

// Get All Workouts
const getAllWorkouts = async (req, res)=> {

    // Get only workouts for the user who's signed up
    const userId = req.user._id;

    const workouts = await Workout.find({ userId }).sort({createdAt: -1});
   
    res.status(200).json({workouts})
}
// Get a single workout
const getSingleWorkout = async (req, res)=> {
    const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).json({error: "That workout is not found."});
        }
        const workout = await Workout.findById(id);
    
        if(!workout){
            return res.status(404).json({error: "That workout is not found."});
        }
        res.status(200).json({workout})
}
// Post a new workout
const createWorkout = async (req, res)=> {
    const { title, reps, load } = req.body;
    
    try{
        const userId = req.user._id;
        const workout = await Workout.create({title, reps, load, userId});
        res.status(200).json({workout})
    } catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}
// delete a workout
const deleteWorkout = async (req, res)=> {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "That workout is not found."});
    }
    const workout = await Workout.findOneAndDelete({_id: id});
    
    if(!workout){
        return res.status(404).json({error: "That workout is not found."});
    }
    res.status(200).json(workout);

}
// Patch a workout
const updateWorkout = async (req, res)=> {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "That workout is not found."});
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error: "That workout is not found."});
    }
    res.status(200).json({workout});
}

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}