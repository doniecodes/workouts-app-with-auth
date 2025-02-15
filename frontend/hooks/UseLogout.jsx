import React, { useState } from 'react'
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from 'react-router-dom'
import { useWorkoutsContext } from './useWorkoutsContext';

export const UseLogout = ()=> {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutsDispatch } = useWorkoutsContext();
    const navigation = useNavigate()

    const logout = ()=> {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" })
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null })
    navigation("/login");
    }

    return { logout }

}