import { React, useState } from "react";
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from 'react-router-dom'
    

   export const UseSignup = () => {
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
        const { dispatch, user } = useAuthContext();
        const navigate = useNavigate();

    const signup = async (email, password)=> {
        setLoading(true);
        setError(null);
        
        const res = await fetch("https://workouts-auth-backend.onrender.com/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(email, password)
        })
        const json = await res.json();
    
        if(!res.ok){
            setLoading(false)
            setError(json.err);
            return json.err
        }
        if(res.ok){
            navigate("/")
            localStorage.setItem("user", JSON.stringify(json));
        }
        // update auth context
        dispatch({ type: "LOGIN", payload: json })
        setLoading(false)
        }

        return { signup, loading, error }
    }

    
