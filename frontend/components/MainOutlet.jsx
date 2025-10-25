import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../components/Header";

const MainOutlet = () => {
  return (
    <>
    <Header />

    <Outlet />
    </>
  )
}

export default MainOutlet