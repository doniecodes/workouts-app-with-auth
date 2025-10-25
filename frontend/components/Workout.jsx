import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrash } from "react-icons/fa";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Workout = (props) => {

    const { title, reps, load, createdAt, id, handleDelete } = props;

  return (
    <div className="workout-details">
        <h4>{title}</h4>
        <p><strong>Load (kg): </strong> {load} </p>
        <p><strong>Reps: </strong> {reps} </p>
        <p>{formatDistanceToNow(new Date(createdAt), {addSuffix: true})}</p>

        <span onClick={()=> handleDelete(id)}><FaTrash /></span>
    </div>
  )
}

export default Workout