import React from 'react'
import WorkoutDetails from '../src/components/WorkoutDetails';
import WorkoutForm from '../src/components/WorkoutForm';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";
import { useAuthContext } from '../hooks/useAuthContext.js';

const Home = () => {

  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext();
  const token = user && user.token;


  // fetching data
  React.useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://workouts-auth-backend.onrender.com/api/user/login/api/workouts', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json.workouts})
      }
    }

    if(user){
      fetchWorkouts()
    }
  }, [dispatch, user])
  
  return (
    <>
    <div className="home">
      <div className="workouts">
        { workouts && workouts.map((workout)=> (
            <WorkoutDetails key={workout._id} workout={workout} />
        )) }
      </div>

      <WorkoutForm />
    </div>
    </>
  )
}

export default Home