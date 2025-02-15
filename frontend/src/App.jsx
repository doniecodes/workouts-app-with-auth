import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from "../pages/Home"
import MainLayout from "../src/components/MainLayout"
import Login, { loader as loginLoader } from "../pages/Login"
import Signup from "../pages/Signup"
import { authRequired, userAuthorized } from "../utils/utils"



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
    <Route index element={<Home/>}
    loader={authRequired} />

    <Route path="/login" element={<Login/>}
    loader={loginLoader} />

    <Route path="/signup" element={<Signup/>}/>
    </Route>
  )
)


function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
