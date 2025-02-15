import React, { useState } from 'react'
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext"
import { useAuthContext } from '../../hooks/useAuthContext'


const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext();
    const token = user && user.token;

    const [title, setTitle] = useState("");
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");
    const [errors, setError] = useState({
        title: "",
        load: "",
        reps: "",
        allErrors: "",
        logInFirst: ""
    });

    const handleSubmit = async (e)=> {
        e.preventDefault();

        if(!user){
            setError({ logInFirst: "You must log in first!" })
            return
        }

        const workout = {title, load, reps};
        const res = await fetch("http://localhost:4000/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify(workout),
        });
        const json = await res.json();

        if(!res.ok){
            setError((prev)=> {
                return {...prev, title: json.errors.title, load: json.errors.load, reps: json.errors.reps, allErrors: json.errors.reps}
            });
        }
        if(res.ok){
            setError((prev)=> {
                return {...prev, title: "", load: "", reps: "", allErrors: ""}
            });
            setTitle("")
            setLoad("")
            setReps("")
            dispatch({type: 'CREATE_WORKOUT', payload: json.workout})
        }      
    }

  return (
    <>
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new workout</h3>

        <label htmlFor="">Workout Title: </label>
        <input type="text"
        value={title}
        className={ errors.title !== '' && 'error'}
        onChange={(e)=> setTitle(e.target.value)}/>

        <label htmlFor="">Load (in kg): </label>
        <input type="number"
        value={load}
        className={ errors.load !== '' && 'error'}
        onChange={(e)=> setLoad(e.target.value)}/>

        <label htmlFor="">Reps: </label>
        <input type="number"
        value={reps}
        className={ errors.reps !== '' && 'error'}
        onChange={(e)=> setReps(e.target.value)}/>

        <button>Add Workout</button>

        { user ?
        errors.allErrors !== "" && <div className='error'>please fill in all the fields</div> :
         errors.allErrors !== "" && <div className='error'>{errors.logInFirst}</div>
         }

    </form>
    </>
  )
}

export default WorkoutForm