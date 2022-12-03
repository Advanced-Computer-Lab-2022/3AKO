import { useEffect, useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useUserContext } from "../hooks/useUserContext";
const LogIn = ()=>{
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const {login, isLoading, error} = useLogin()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const logedIn = await login(username,password)
        console.log(logedIn);
        if(logedIn){
            if(logedIn.type ==='corporate trainee' || logedIn.type ==='individual trainee'){
                window.location.href=`/`
            }
            else if(logedIn.type ==='instructor'){
                window.location.href=`/instructor`
            }
        }  
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Sign in</h3>
            <label >UserName</label>
            <input type="text" required placeholder="user name" onChange={event => setUsername( event.target.value )} value={username} />
            <label >Password</label>
            <input type="password" required placeholder="password" onChange={event =>setPassword( event.target.value )} value={password} />
            <button disabled ={isLoading}>Sign in</button>
            {error && <div className='error'>{error.message}</div>}
        </form>
    )
}
export default LogIn