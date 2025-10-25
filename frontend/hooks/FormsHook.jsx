import React, { useState, useEffect } from 'react'
import UseUserContext from './UseUserContext';
import { useNavigate } from 'react-router-dom';
import UseWorkoutsContext from './UseWorkoutsContext';

const FormsHook = () => {

    // states
    const [ error, setError ] = useState(null);
    const [ status, setStatus ] = useState("idle");
    const navigate = useNavigate();
    const { user, dispatch } = UseUserContext();
    const { dispatch: dispatchWorkouts} = UseWorkoutsContext();

    // login
    const login = async (email, password)=> {
        setStatus("submitting");
        const res = await fetch("http://localhost:4000/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${user && user.token}`
            },
            body: JSON.stringify(email, password)
        })
        const data = await res.json();

        if(!res.ok){
            setError(data.error);
            setStatus("idle");
        }

        if(res.ok){
        setStatus("idle");
        setError(null);
        navigate("/")
        localStorage.setItem("USER", JSON.stringify(data));
        dispatch({ type: "SET_USER", payload: data })
        }

        return data
    }

    // signup
    const signup = async (email, password)=> {
        setStatus("submitting");
        const res = await fetch("http://localhost:4000/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(email, password)
        })
        const data = await res.json();

        if(!res.ok){
            setError(data.error);
            setStatus("idle");
        }

        if(res.ok){
        setStatus("idle");
        setError(null);
        navigate("/")
        dispatch({ type: "SET_USER", payload: data })
        localStorage.setItem("USER", JSON.stringify(data));
        }

        return data
    }

    // Logout
    const logout = async ()=> {
        dispatch({type: "LOGOUT"});
        localStorage.removeItem("USER");
        dispatchWorkouts({ type: "SET_WORKOUTS", payload: null })
        navigate("/login");
    }


  return { login, signup, logout, error, status, user, navigate };
}

export default FormsHook