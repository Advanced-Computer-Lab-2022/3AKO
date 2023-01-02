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
    Card,
    CssBaseline,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
const AddUser = () => {
    const [userType, setUserType] = useState("Admin");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleAdd = async (e) => {
        e.preventDefault();
        const user = { username, password, email };
        console.log(user)
        await axios({
            method: "post",
            url: `http://localhost:5000/admin/add${userType}`,
            withCredentials: true,
            data: user,
        })
            .then((res) => {
                setUsername("");
                setPassword("");
                setEmail("");
                setError(null);
                setSuccess(`${userType} Added Successfully`);
            })
            .catch((error) => {
                setError(error);
            });
    };

    return (
        <Box>
            <form className="addUser" onSubmit={handleAdd}>
                <Typography variant="caption">Select user type</Typography>
                <Box>
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
                    <Typography>Username</Typography>
                    <TextField
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </div>

                <div>
                    <Typography>Password</Typography>
                    <TextField
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>

                {userType !== "Admin" && (
                    <div>
                        <Typography>Email</Typography>
                        <TextField
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                )}

                <Button type="submit">Add {userType}</Button>

                {success && <div>{success}</div>}

                {error && <div className="error">{error}</div>}
            </form>
        </Box>
    );
};

export default AddUser;
