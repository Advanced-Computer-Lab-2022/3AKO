import axios from "axios";
import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useSignup = () => {
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState('')
    const {dispatch} = useUserContext()
    const signup = async (fullTraineeData) =>{
        let success = null
        setIsLoading(true)
        setError(null)
        await axios({method: "post",url:`http://localhost:5000/individualTrainee/signup`,withCredentials: true,data:fullTraineeData }).then(
            (res) => { 
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
    return {signup, isLoading, error}
}