
import { useState } from "react";

const AddUser = ({fields, userType}) => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const handleAdd = async (e) => {
        e.preventDefault()
        const user = {username, password, email}
        const response = await fetch(`/admin/add${userType}`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type' :'application/json'
            }
        })
        const responseJSON = await response.json()
        if(response.ok){
            setUsername('')
            setPassword('')
            setEmail('')
            setError(null)
            setSuccess(`${userType} Added Successfully`)
        } 
        else {
            setError(responseJSON.error)
            setSuccess(null)
        }
    }

    return (
        <form className="addUser" onSubmit = {handleAdd}>
            <h3>add {userType}</h3>
          
            <div>
                <label>Username</label>
                <input 
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)}
                    value = {username}
                    required />
            </div>
            

           <div>
            <label>Password</label>
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value = {password}
                    required />
                    
           </div>

            {fields === 3 && <div>
                <label>Email</label>
                <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value = {email}
                    required />
            </div>}

            <button>Add {userType}</button> 

            {success && 
                <div>
                    {success}
                </div>}
            
            {error && 
                <div className="error">
                    {error}
                </div>}
        </form>
    )
}

export default AddUser;