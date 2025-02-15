import { React, useState } from "react";
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from 'react-router-dom'


export const UseLogin = ()=> {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch, user } = useAuthContext();
    const navigation = useNavigate();


    const login = async (email, password)=> {
        setError(null)
        setLoading(false)

        const res = await fetch("https://workouts-auth-backend.onrender.com/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(email, password)
        })
        const json = await res.json();

        console.log(json)

        if(!res.ok){
            setLoading(false)
            setError(json.err);
        }
        if(res.ok){
            setError(null)
            setLoading(false)
            localStorage.setItem("user", JSON.stringify(json));
            navigation('/');
        }

        dispatch({ type: "LOGIN", payload: json })
    }

    return { login, error, loading }
}