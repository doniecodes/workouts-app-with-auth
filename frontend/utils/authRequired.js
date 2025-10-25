import React from 'react'
import UseUserContext from '../hooks/UseUserContext';
import { redirect } from 'react-router-dom';

export const authRequired = async (request) => {

    const pathname = new URL(request.url).pathname;
    console.log(pathname)

    const user = JSON.parse(localStorage.getItem("USER"));

        if(!user){
           return redirect("/login?message=You must log in first");
        }

}
