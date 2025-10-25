import React from 'react'
import FormsHook from '../hooks/FormsHook';
import { authActivated } from '../utils/authActivated';

// Loader
export const loader = async ({ request })=> {
  const auth = await authActivated(request);
  return auth;
}

const Signup = () => {
  // States
  const { user, error, signup, status } = FormsHook();

  // Login
  const handleSignup = async (e)=> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    await signup({ email, password });
  }


  return (
    <>
    <div className="container">
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        <form action="" className="form-login" onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input type="text" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>

          { error && <div className="form-error">{ error }</div> }

          <button disabled={ status === "submitting" }>{ status === "idle" ? "Sign Up" : "Signing Up" }</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Signup