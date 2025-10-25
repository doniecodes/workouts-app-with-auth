import React from 'react'
import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";

const UseWorkoutsContext = () => {

    const context = useContext(WorkoutsContext);

    if(!context) {
        throw Error("UseWorkoutsContext must be used inside a WorkoutsContextProvider")
    }

    return context;

}

export default UseWorkoutsContext