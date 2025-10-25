import React from 'react'
import { redirect } from 'react-router-dom';

export const authActivated = (request) => {

    const user = JSON.parse(localStorage.getItem("USER"));
    const pathname = "/";

        if(user){
           return redirect(`${pathname}`);
        }
}