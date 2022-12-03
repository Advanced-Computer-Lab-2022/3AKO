import { useEffect, useState } from 'react'
import { useUserContext } from "../hooks/useUserContext";
const TraineeProfile = ()=>{
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault()
        
    }

    return (
        <div>
            <label >UserName</label>
            <input type="text" required placeholder="user name" onChange={event => setUsername( event.target.value )} value={username} />
            <label >Password</label>
            <input type="password" required placeholder="password" onChange={event =>setPassword( event.target.value )} value={password} />
            <button disabled ={isLoading}>Sign in</button>
            {error && <div className='error'>{error.message}</div>}
        </div>
    )
}
export default TraineeProfile