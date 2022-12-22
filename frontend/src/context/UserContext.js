import axios from "axios";
import { createContext , useReducer, useEffect, useState } from "react";

export const UserContext = createContext()

export const userReducer = (state , action) => {
    switch (action.type){
        case 'LOGIN':
            return {user : action.payload}
        case 'RESTORE':
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
        // const user = JSON.parse(localStorage.getItem('user'))
        // if(user){
        //     dispatch({type:'LOGIN',payload: user})
        // }
        axios({method:'get',url:'http://localhost:5000/user/restoreData',withCredentials:true}).then((response)=>{
            dispatch({type:'RESTORE',payload: response.data})
            console.log(response.data);
            setLoading(false)
        }).catch((error)=>{
            setLoading(false)
        })
    },[])
    
    console.log('UserContext state: ',state);
    return (
        <UserContext.Provider value ={{...state,dispatch,loading}}>
            {children}
        </UserContext.Provider>
    )
}
