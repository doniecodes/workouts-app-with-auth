import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UseUserContext from "../hooks/UseUserContext";
import FormsHook from '../hooks/FormsHook';

const Header = () => {

  const { user, dispatch } = UseUserContext();
  const { logout } = FormsHook();

  const handleLogout = async ()=> {
    await logout();
  }

  return (
    <>
    <header>
      <div className="container">
        <Link to="/"><h1>Workout Buddy</h1></Link>

        <nav className="nav">
          <ul>
            { user && <li className='user-li'>{ user.email }</li> }
            { user ? 
            <li onClick={handleLogout}><NavLink>Logout</NavLink></li>
            :
            <>
            <li><NavLink to="login">Login</NavLink></li>
            <li><NavLink to="signup">signup</NavLink></li>
            </> }
          </ul>
        </nav>
      </div>
    </header>
    </>
  )
}

export default Header