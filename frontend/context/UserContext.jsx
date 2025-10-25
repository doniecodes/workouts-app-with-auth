import React, { createContext, useReducer, useEffect } from 'react';

export const UserContext = createContext();

export const userReducer = (state, action)=> {
    switch(action.type) {
        case "SET_USER" :
            return { user: action.payload }
        case "LOGOUT" :
            return { user: null }

            default : return state
    }

}

export const UserContextProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer( userReducer, { user: null } );

    console.log(state.user);

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem("USER"));
        if(user){
            dispatch({ type: "SET_USER", payload: user });
        }
    }, []);

  return (
    <>
    <UserContext.Provider value={{ ...state, dispatch }}>
        {children}
    </UserContext.Provider>
    </>
  )
}