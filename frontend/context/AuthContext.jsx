import { createContext, useEffect, useReducer } from "react";

const initialState = {
    user: null,
    token: null
}

export const AuthContext = createContext();

export const reducer = (state, action)=> {
    switch(action.type){
        case "LOGIN":
            return {
                user: action.payload,
                token: action.payload,
            }
        case "LOGOUT":
            return {
                user: null,
            }
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children })=> {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state);


    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({ type: "LOGIN", payload: user })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )

}