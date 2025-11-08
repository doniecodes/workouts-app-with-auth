import { useState } from "react";
import React from 'react'
import UseWorkoutsContext from "./UseWorkoutsContext";
import UseUserContext from "./UseUserContext";

const WorkoutsHook = () => {

    // States
    const [ error, setError ] = useState(null);
    const [ err, setErr ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ status, setStatus ] = useState("idle");
    let [ emptyFields, setEmptyFields ] = useState([]);
 
    // hooks
    const { dispatch, workouts } = UseWorkoutsContext();
    const { user } = UseUserContext();

    // api
    const api = import.meta.env.VITE_API;


    // Get all workouts
const getWorkouts = async (id)=> {
    setLoading(true)
    const url = id ? `${api}/api/workouts/${id}` : `${api}/api/workouts`;
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    });
    const data = await res.json();
    if(!res.ok){
        setLoading(false);
        setError({
            message : data.error,
            status: data.status,
            statusText: res.statusText,
        })
    }
    if(res.ok){
        dispatch({ type: "SET_WORKOUTS", payload: data })
        setLoading(false);
        setError(null);
    }

    return data;
}

// Post a workout.
const createWorkout = async (json)=> {

    if(!user){
        setErr("You must be logged in first");
        return
    }

    setStatus("submitting");
    
    const res = await fetch(`${api}/api/workouts`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
         },
        body: JSON.stringify(json)
    })
    const data = await res.json();

    if(!res.ok){
        setErr(data.error);
        setStatus("idle");
        setEmptyFields(data.emptyFields);
    }
    if(res.ok){
        setErr(null)
        setStatus("idle");
        setEmptyFields([]);
        dispatch({ type: "CREATE_WORKOUT", payload: data });
    }
    return data;
}

const deleteWorkout = async (id)=> {

    if(!user){
        return;
    }

    const res = await fetch(`${api}/api/workouts/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${user.token}` }
    })
    const data = await res.json();
    if(!res.ok){
        setError(data.error);
    }
    dispatch({ type: "DELETE_WORKOUT", payload: data });
}



  return { getWorkouts, createWorkout, deleteWorkout, error, err, status, loading, emptyFields, user, workouts }
}

export default WorkoutsHook;