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
    const [coursesRequests, setCoursesRequests] = useState([]);
    const fetchCoursesRequests = async () => {
        await axios({
            method: "get",
            url: "http://localhost:5000/admin/getCourseRequests",
            withCredentials: true,
        })
            .then((res) => {
                setCoursesRequests(res.data);
            })
            .catch((error) => {
                alert("invalid request");
            });
    };
    useEffect(() => {
        fetchCoursesRequests();
    }, []);
    return (
        <Box>
            {coursesRequests &&
                coursesRequests.map((courseRequest) => (
                    <Card variant="outlined">
                        <Typography>
                            {courseRequest.corporateUserName}
                            {" is requesting to join "}
                            {courseRequest.courseTitle}
                            {" course"}
                        </Typography>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                                axios({
                                    method: "patch",
                                    url: "http://localhost:5000/admin/answerRequest",
                                    data: {
                                        requestId: courseRequest._id,
                                        response: "accept",
                                    },
                                    withCredentials: true,
                                })
                                    .then((res) => {
                                        fetchCoursesRequests();
                                    })
                                    .catch((error) => {
                                        alert("invalid request");
                                    });
                            }}
                        >
                            Accept
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                axios({
                                    method: "patch",
                                    url: "http://localhost:5000/admin/answerRequest",
                                    data: {
                                        requestId: courseRequest._id,
                                        response: "reject",
                                    },
                                    withCredentials: true,
                                })
                                    .then((res) => {
                                        fetchCoursesRequests();
                                    })
                                    .catch((error) => {
                                        alert("invalid request");
                                    });
                            }}
                        >
                            Reject
                        </Button>
                    </Card>
                ))}
        </Box>
    );
};

export default CourseRequest;
