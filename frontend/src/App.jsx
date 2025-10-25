import React from 'react';
import { Route, createBrowserRouter,
  createRoutesFromElements, RouterProvider } from "react-router-dom";

// Pages
import Home, { loader as homeLoader } from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import Login, { loader as loginLoader } from "../pages/Login";
import Signup, { loader as SignupLoader } from "../pages/Signup";
import MainOutlet from "../components/MainOutlet";

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route pat="/" element={<MainOutlet />}>
      <Route index element={<Home />} loader={homeLoader} />

      <Route path="login" element={<Login />} loader={loginLoader} />
      <Route path="signup" element={<Signup />} loader={SignupLoader}/>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App