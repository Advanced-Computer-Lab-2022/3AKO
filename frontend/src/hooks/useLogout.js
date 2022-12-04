import axios from "axios"
import { useUserContext } from "./useUserContext"
import Cookies  from "universal-cookie";
const cookies = new Cookies()
export const useLogout = () => {
    const {dispatch} = useUserContext()
    const logout = async() => {
        let success = false
        const token = cookies.get('jwt');
        console.log(token);                 /////this requist 
        await axios({method: "post",url:'http://localhost:5000/user/logout',withCredentials:true}).then(()=>{
            success = true
        })
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        return success
    }
    return {logout}
}