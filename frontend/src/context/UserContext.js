import { createContext , useReducer, useEffect, useState } from "react";

export const UserContext = createContext()

export const userReducer = (state , action) => {
    switch (action.type){
        case 'LOGIN':
            return {user : action.payload}
        case 'LOGOUT':
            return {user:null}
        default:
            return state
    }
}

export const UserContextProvider = ({children}) =>{
    const [state , dispatch] = useReducer(userReducer,{user:null})
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type:'LOGIN',payload: user})
        }
        setLoading(false)
    },[])
    
    console.log('UserContext state: ',state);
    return (
        <UserContext.Provider value ={{...state,dispatch,loading}}>
            {children}
        </UserContext.Provider>
    )
}
