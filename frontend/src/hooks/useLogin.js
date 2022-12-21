import axios from "axios";
import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useLogin = () => {
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState('')
    const {dispatch} = useUserContext()
    const login = async (username,password) =>{
        let success = null
        setIsLoading(true)
        setError(null)
        await axios({method: "post",url:`http://localhost:5000/user/login`, withCredentials: true,data:{username,password} }).then(
            (res) => { 
                //console.log(user)
                // localStorage.setItem('user',JSON.stringify(res.data)) 
                dispatch({type:'LOGIN',payload:res.data})
                setIsLoading(false)
                success = res.data
            }
        ).catch(error => {
            setIsLoading(false)
            setError(error.response.data.error)
        })
        return success
    }
    return {login, isLoading, error}
}