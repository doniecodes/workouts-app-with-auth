import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const UseUserContext = () => {
  
    const context = useContext(UserContext);

    if(!context){
        throw Error("UserContext must be used inside UserContextProvider");
    }

    return context;
}

export default UseUserContext