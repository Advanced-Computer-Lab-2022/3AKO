
import { useState } from "react";

const AddUser = ({fields, userType}) => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    // const [userFields, setUserFields] = useState([])
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
        if(response.ok){
            setUsername('')
            setPassword('')
            setEmail('')
            setError(null)
            setSuccess(`${userType} Added Successfully`)
        }
        if(!response.ok){
            setError(JSON.err)
            setSuccess(null)
        }
    }

    return (
        <form className="addUser" onSubmit = {handleAdd}>
            <h3>add {userType}</h3>
            {/* {fields.map((field) => (
                <>
                    <label>{field}</label>
                    <input 
                        type = 'text'
                        onChange = {(e) => setUserFields((userFields) => [userFields, e.target.value])}
                        />
                </>
            ))} */}
            <div>
                <label>Username</label>
                <input 
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)}
                    value = {username} />
            </div>
            

           <div>
            <label>Password</label>
                <input 
                    type="text" 
                    onChange={(e) => setPassword(e.target.value)}
                    value = {password} />
           </div>

            {fields === 3 && <div>
                <label>Email</label>
                <input 
                    type="text" 
                    onChange={(e) => setEmail(e.target.value)}
                    value = {email} />
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