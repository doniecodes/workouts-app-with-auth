import { React, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import { UseSignup } from "../hooks/UseSignUp";


const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup, error, loading } = UseSignup();


    const handleSubmit = async (e)=> {
    e.preventDefault();
    await signup({ email, password })
    }
        
        

  return (
    <>
    <form action="" onSubmit={handleSubmit} className="signup">
        <h3>Sign up</h3>

        <label htmlFor="email">Email:</label>
        <input type="email" name='email'
        id="email"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}/>

        <label htmlFor="password">Password:</label>
        <input type="password" name='password'
        id="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}/>

        <button>Sign Up</button>

        { error && <div className="form-error">{error}</div> }
    </form>
    </>
  )
}

export default Signup