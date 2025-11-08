import React from 'react'
import FormsHook from '../hooks/FormsHook';
import { useLoaderData } from 'react-router-dom';
import { authActivated } from '../utils/authActivated';

// Loader
export const loader = async ({ request })=> {
  // Block logged in user from accessing the login page
  const user = JSON.parse(localStorage.getItem("USER"));
  if(user){
    const auth = await authActivated(request);
    return auth;
  }

  const url = new URL(request.url).searchParams.get("message");
  return { url };
}

const Login = () => {

  // States
  const { error, login, status } = FormsHook();

  // loader data
  const { url:mssg } = useLoaderData();

  // Login
  const handleLogin = async (e)=> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    await login({ email, password });
  }


  return (
    <>
    <div className="container">
      <div className="form-wrapper">
        { mssg !== undefined && <h2 className='error-url'>{ mssg }</h2> }
        <h1>Log In</h1>
        <form action="" className="form-login" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input type="text" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>

          { error && <div className="form-error">{ error }</div> }

          <button>Log In</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login