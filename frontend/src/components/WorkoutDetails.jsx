import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const WorkoutDetails = ({ workout }) => {
  const { user } = useAuthContext();
  const token = user && user.token
  const { dispatch } = useWorkoutsContext()
  const [ error, setError ] = useState("");


  const handleClick = async () => {

    if(!user){
      setError("Log in first to see workouts")
      return
    }

    const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      {workout.createdAt && <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> }
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
} 

export default WorkoutDetails