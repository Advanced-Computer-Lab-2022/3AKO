import axios from "axios";
import { useState } from "react";
import React from "react";
import Radio from '@mui/material/Radio';
import { RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Button, Alert } from '@mui/material';

const AddUser = () => {
    const [userType, setUserType] = useState("CorporateTrainee");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleAdd = async (e) => {
        e.preventDefault();
        const user = { username, password };
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
                setError(null);
                setSuccess(`${userType} Added Successfully`);
                console.log("SUCCESS");
            })
            .catch((error) => {
                setError(error.response.data.error)
                setSuccess(null)
                console.log(error);

            });
    };

    return (
        <div>
            <form onSubmit={handleAdd} action="">
                <FormLabel sx={{ fontSize: '25px', fontFamily: 'poppins' }} className="px-4 py-2">Add User</FormLabel>
                <br />

                <FormControl style={{ border: '1px solid lightgray', padding: '40px' }}  >
                    <FormLabel id="demo-radio-buttons-group-label">User type</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <FormControlLabel value="CorporateTrainee" control={<Radio />} label="Corporate Trainee" />
                        <FormControlLabel value="Instructor" control={<Radio />} label="Instructor" />
                        <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                    </RadioGroup>
                    <TextField pattern="\S(.*\S)?" required value={username} onChange={(e) => { setUsername(e.target.value) }} className="my-3" label="Username" variant="outlined" />
                    <TextField pattern=".*\S+.*" required value={password} onChange={(e) => { setPassword(e.target.value) }} sx={{ width: '350px' }} className="mb-4" label="Password" variant="outlined" type={'password'} />
                    {(success || error) && < Alert className="mb-3" severity={success ? "success" : 'error'}>{success}{error}</Alert>}

                    <Button type="submit" style={{ display: 'block' }} variant="contained">ADD {(userType === "CorporateTrainee") && "Corporate Trainee"} {(userType !== "CorporateTrainee") && userType}</Button>

                </FormControl>
            </form>
            {/* 
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


                    <Button type="submit">Add {userType}</Button>

                    {success && <div>{success}</div>}

                    {error && <div className="error">{error}</div>}
                </form>
            </Box> */}
        </div >
    );
};

export default AddUser;
