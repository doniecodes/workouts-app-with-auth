import { Link } from "react-router-dom";
import { UseLogout } from "../../hooks/UseLogout";
import { useAuthContext } from "../../hooks/useAuthContext"

import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const { logout } = UseLogout()
  const { user } = useAuthContext();
  const userEmail = user && user.email;

  const handleClick = async ()=> {
    await logout();
  }


  return (
    <>
    <header>
        <div className="container">
          <Link to="/" className="heading-1">
          <h1>Workout Buddy</h1>
          </Link>
          <nav className="header-nav">
          <div className="nav-user">
            { userEmail ?
              userEmail.slice(0, userEmail.length) : null }
          </div>
            <div className="nav-btns">
            { userEmail ? <div>
              <button className="logout-btn" onClick={handleClick}>Log out</button>
            </div> :  null}

              { !userEmail &&
              <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              </> }
            </div>
          </nav>
        </div>
    </header>
    </>
  )
}

export default Navbar