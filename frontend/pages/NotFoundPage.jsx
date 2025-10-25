import React from 'react'
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <>
    <div className="container">
      <div className="notfound-div">
        <FaExclamationTriangle className="triangle"/>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/">Back to homepage</Link>
      </div>
    </div>
    </>
  )
}

export default NotFoundPage