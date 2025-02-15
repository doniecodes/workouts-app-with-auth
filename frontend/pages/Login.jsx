import React, { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useLoaderData, useNavigate } from 'react-router-dom'
import { UseLogin } from '../hooks/UseLogin'
import { authRequired } from '../utils/utils'

export const loader = async ({request}) => {
  await authRequired(request);
  const message = new URL(request.url).searchParams.get("message");
  return message
}


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, error, loading } = UseLogin();

    const loaderMsg = useLoaderData();
    


    const handleSubmit = async (e)=> {
        e.preventDefault();
        await login({ email, password });
    }

  return (
    <>
    <form action="" onSubmit={handleSubmit} className="login">

        { loaderMsg && <h3 className='auth-login-error'>{loaderMsg}</h3> }

        <h3>Login</h3>

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

        <button>Login</button>
        { error && <div className="form-error">{error}</div> }
    </form>
    </>
  )
}

export default Login