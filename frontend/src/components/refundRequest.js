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
const RefundRequest = () => {
    const [refundRequests, setRefundRequests] = useState([]);
    const fetchRefundRequests = async () => {
        await axios({
            method: "get",
            url: "http://localhost:5000/admin/getRefundRequests",
            withCredentials: true,
        })
            .then((res) => {
                setRefundRequests(res.data);
            })
            .catch((error) => {
                alert("invalid request");
            });
    };
    useEffect(() => {
        fetchRefundRequests();
    }, []);
    return (
        <Box>
            {refundRequests &&
                refundRequests.map((refundRequest) => (
                    <Card variant="outlined">
                        <Typography>
                            {refundRequest.traineeUserName}
                            {" is requesting a refund for "}
                            {refundRequest.courseTitle}
                            {" course"}
                        </Typography>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                                axios({
                                    method: "patch",
                                    url: "http://localhost:5000/admin/answerRefundRequest",
                                    data: {
                                        requestId: refundRequest._id,
                                        response: "accept",
                                    },
                                    withCredentials: true,
                                })
                                    .then((res) => {
                                        fetchRefundRequests();
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
                                    url: "http://localhost:5000/admin/answerRefundRequest",
                                    data: {
                                        requestId: refundRequest._id,
                                        response: "reject",
                                    },
                                    withCredentials: true,
                                })
                                    .then((res) => {
                                        fetchRefundRequests();
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

export default RefundRequest;
