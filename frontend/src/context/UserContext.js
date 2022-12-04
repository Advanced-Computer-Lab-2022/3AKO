import { createContext , useReducer, useEffect } from "react";

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
    
    useEffect(()=>{
        const load = async () => {
            const user = await JSON.parse(localStorage.getItem('user'))
            if(user){
                dispatch({type:'LOGIN',payload: user})
            }
        }
        load()
    },[])
    
    console.log('UserContext state: ',state);
    return (
        <UserContext.Provider value ={{...state,dispatch}}>
            {children}
        </UserContext.Provider>
    )
}
