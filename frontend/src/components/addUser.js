
import axios from "axios";
import { useState } from "react";
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
    AppBar,
    CssBaseline,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select,
    Toolbar,
    Typography,
} from "@mui/material";
const AddUser = () => {
    const [userType, setUserType] = useState("Admin");

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    
    const handleAdd = async (e) => {
        e.preventDefault()
        const user = {username, password, email}
        await axios({method: 'post',url:`http://localhost:5000/admin/add${userType}`,withCredentials:true, data: user}).then((res)=>{
            setUsername('')
            setPassword('')
            setEmail('')
            setError(null)
            setSuccess(`${userType} Added Successfully`)
        }).catch((error)=>{
            setError(error)
        })


    }

    return (
        <form className="addUser" onSubmit={handleAdd}>
            <Box>
                <Typography>Select user type</Typography>
                <Select
                    defaultValue={"Admin"}
                   
                    onChange={(e) => {
                        setUserType(e.target.value);
                    }}
                >
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"Instructor"}>Instructor</MenuItem>
                    <MenuItem value={"CorporateTrainee"}>
                        Corporate Trainee
                    </MenuItem>
                </Select>
            </Box>

            <h3>add {userType}</h3>

            <div>
                <label>Username</label>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </div>

            {userType !== "Admin" && (
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
            )}

            <button>Add {userType}</button>

            {success && <div>{success}</div>}

            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default AddUser;