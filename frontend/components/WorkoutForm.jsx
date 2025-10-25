import React from 'react'
import { useState } from 'react';
import { useNavigation } from 'react-router-dom';
import WorkoutsHook from '../hooks/WorkoutsHook';
import UseWorkoutsContext from "../hooks/UseWorkoutsContext";
import UseUserContext from '../hooks/UseUserContext';

const WorkoutForm = () => {

    // States
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    // hooks
    const { createWorkout, err, status, emptyFields } = WorkoutsHook();
    const { user } = UseUserContext();

    // Form Data states
    const [ inputValues, setInputValues ] = useState({
        title: "",
        load: "",
        reps: ""
    });

    //Handlechange
    const handleChange = (e)=> {
        const { name, value } = e.target;
        setInputValues((prev)=> {
            return { ...prev, [name]: value };
        })
    }

    // Handle submit form
    const handleSubmit = async (e)=> {
        e.preventDefault();
        const { title, reps, load } = inputValues;

        const workout = await createWorkout({ title, load, reps});     
    }
  

  return (
    <>
    {/* Error and loading */}
    {loading && <h2 className='loading-msg'>Loading...</h2>}
    {error !== null && <h2 className='error-msg'>Error: { error.message }</h2>}

    {/* Form */}
    <form action="" className="create" onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>

        <div className="form-group">
            <label htmlFor="title">Exercise Title:</label>
            <input type="text" name="title" id="title"
            className={emptyFields.includes("title") ? "error" : ""}
            value={inputValues.title}
            onChange={handleChange} />
        </div>

        <div className="form-group">
            <label htmlFor="load">Load (in kg):</label>
            <input type="number" name="load" id="load"
            className={emptyFields.includes("load") ? "error" : ""}
            value={inputValues.load}
            onChange={handleChange} />
        </div>

        <div className="form-group">
            <label htmlFor="reps">Reps:</label>
            <input type="number" name="reps" id="reps"
            className={emptyFields.includes("reps") ? "error" : ""}
            value={inputValues.reps}
            onChange={handleChange} />
        </div>

        <button>{ status === "idle" ? "Add workout" : "Adding..." }</button>
        { err && <div className='error'>{err}</div> }

    </form>
    </>
  )
}

export default WorkoutForm