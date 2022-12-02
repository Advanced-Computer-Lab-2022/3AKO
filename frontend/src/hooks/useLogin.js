import axios from "axios";
import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useLogin = () => {
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState('')
    const [user,setUser] = useState(null)
    const {dispatch} = useUserContext()
    const login = async (username,password) =>{
        setIsLoading(true)
        setError(null)
        await axios.get(`http://localhost:5000/user/login?username=${username}&password=${password}`,{ withCredentials: true }).then(
            (res) => { 
                const user = res.data
                //console.log(user)
                setUser(user)
            }
        ).catch(error => {
            setIsLoading(false)
            setError(error)
        })
        console.log({user});
        localStorage.setItem('user',JSON.stringify(user)) 
        dispatch({type:'LOGIN',payload:user})
        setIsLoading(false)
    }
    return {login, isLoading, error}
}