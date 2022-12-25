import axios from "axios";
import { useEffect, useState } from "react";
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
    Toolbar,
    Typography,
} from "@mui/material";
const CourseRequest = () => {
    const [complaints, setComplaints] = useState([]);
    const fetchComplaints = async () => {
        await axios({
            method: "get",
            url: "http://localhost:5000/admin/getPendingComplaints",
            withCredentials: true,
        })
            .then((res) => {
                setComplaints(res.data);
            })
            .catch((error) => {
                alert("invalid request");
            });
    };
    useEffect(() => {
        fetchComplaints();
    }, []);
    return (
        <Box>
            {complaints &&
                complaints.map((complaint) => (
                    <Card
                        variant="outlined"
                        sx={{
                            background:
                                complaint.status === "pending"
                                    ? "yellow"
                                    : "white",
                            padding: "0.5rem",
                        }}
                    >
                        <Typography>
                            {complaint.userId}
                            {" is complaining about "}
                            {complaint.title}
                            {" course"}
                            {" he says "}
                            {complaint.body}
                        </Typography>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={async () => {
                                const res = await axios.patch(
                                    "http://localhost:5000/admin/resolveCompalint",
                                    {
                                        complaintId: complaint._id,
                                    },
                                    { withCredentials: true }
                                );
                                fetchComplaints();
                            }}
                        >
                            resolve
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                axios({
                                    method: "patch",
                                    url: "http://localhost:5000/admin/markComplaintPending",
                                    data: {
                                        complaintId: complaint._id,
                                    },
                                    withCredentials: true,
                                })
                                    .then((res) => {
                                        fetchComplaints();
                                    })
                                    .catch((error) => {
                                        alert("invalid request");
                                    });
                            }}
                        >
                            Mark as pending
                        </Button>
                    </Card>
                ))}
        </Box>
    );
};

export default CourseRequest;
