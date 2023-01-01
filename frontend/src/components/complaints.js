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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar,
    Card,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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



const Complaint = ({ complaint }) => {
    const [reportId, setReportId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    return (
        <div>
            <Accordion style={{ margin: "10px 0" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            margin: "0 20px",
                        }}
                    >
                        <Typography style={{ fontWeight: "bold" }}>
                            {complaint.title}
                        </Typography>
                        <Typography
                            style={
                                complaint.status == "resolved"
                                    ? { color: "#4BB543" }
                                    : complaint.status == "pending"
                                    ? { color: "#FFCC00" }
                                    : { color: "red" }
                            }
                        >
                            {complaint.status}
                        </Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{complaint.body}</Typography>
                    <ul>
                        {complaint.followUps &&
                            complaint.followUps.map((followUp) => (
                                <li>{followUp}</li>
                            ))}
                    </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

    return (
        <Box>
            {complaints &&
                complaints.map((complaint) => (
                    <Card
                        variant="outlined"
                        sx={{
                            padding: "0.5rem",
                        }}
                    >
                        <Typography style={{ fontWeight: "bold" }}>
                            {complaint.username}
                            {" is complaining about "}
                            {complaint.courseTitle}
                        </Typography>
                        <Complaint complaint={complaint} key={complaint._id} />
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
