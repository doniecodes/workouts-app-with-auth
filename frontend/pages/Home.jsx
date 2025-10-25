import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Workout from "../components/Workout"
import WorkoutForm from '../components/WorkoutForm'
import UseWorkoutsContext from "../hooks/UseWorkoutsContext";
import WorkoutsHook from "../hooks/WorkoutsHook";
import FormsHook from '../hooks/FormsHook'
import UseUserContext from '../hooks/UseUserContext'
import { authRequired } from '../utils/authRequired'

// loader
export const loader = async ({ request })=> {
  const data = await authRequired(request);
  return data
}

const Home = () => {

  // hooks and states
  const { deleteWorkout, getWorkouts, loading, error, workouts } = WorkoutsHook(); 
  const { user } = UseUserContext();


  useEffect(()=> {
    const getData = async ()=> {
    const data = await getWorkouts();
    return data;
    }

      if(user){
        getData();
      }
      
  }, [user]);

  // Handle Delete
  const handleDelete = async (id)=> {
    await deleteWorkout(id);

  }

  // Workout Elements
  const workoutElements = workouts && workouts.map((x)=> {
    return <Workout key={x._id} title={x.title}
    reps={x.reps} load={x.load} createdAt={x.createdAt} id={x._id} handleDelete={handleDelete}/>
  })


  return (
    <>
    <div className="container">

    {loading && <h2 className='loading-msg'>Loading...</h2>}
    {error !== null && <h2 className='error-msg'>Error: { error.message }</h2>}

      <section className="home">
        <div className="workouts">
          { workoutElements }
        </div>

        <WorkoutForm />
      </section>

    </div>
    </>
  )
}

export default Home