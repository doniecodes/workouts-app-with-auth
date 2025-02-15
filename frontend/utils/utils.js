import React from 'react'
import { useNavigate, redirect } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

  
export const authRequired = async ({ request }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
        return redirect("/login?message=You must log in first!")
    }

    return null;
}

export const userAuthorized = async ({request}) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
        return redirect("/")
    }

    return null;
}
