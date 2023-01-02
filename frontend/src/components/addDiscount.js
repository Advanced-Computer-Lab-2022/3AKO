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
    Checkbox,
    CssBaseline,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
const AddDiscount = () => {
    const [courses, setCourses] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [endDate, setEndDate] = useState("");

    const fetchCourses = async () => {
        await axios({
            method: "get",
            url: "http://localhost:5000/course/courses",
            withCredentials: true,
        })
            .then((res) => {
                setCourses(
                    res.data.map((data) => ({ ...data, isSelected: false }))
                );
            })
            .catch((error) => {
                alert("invalid request");
            });
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "40%",
                    gap: "0.3rem",
                }}
            >
                <TextField
                    id="outlined-number"
                    label="Enter Discount"
                    type="number"
                    variant="outlined"
                    value={discount}
                    onChange={(e) => {
                        setDiscount(e.target.value);
                    }}
                />
                <TextField
                    id="outlined-date"
                    type="date"
                    variant="outlined"
                    onChange={(e) => {
                        setEndDate(e.target.value);
                    }}
                />
                <Button
                    variant="outlined"
                    onClick={() => {
                        axios({
                            method: "patch",
                            url: "http://localhost:5000/admin/addAdminPromotion",
                            data: {
                                courseIds: courses
                                    .filter((course) => {
                                        return course.isSelected;
                                    })
                                    .map((course) => {
                                        return course._id;
                                    }),
                                discount: discount,
                                date: endDate,
                            },
                            withCredentials: true,
                        })
                            .then((res) => {
                                fetchCourses();
                            })
                            .catch((error) => {
                                alert("invalid request");
                            });
                    }}
                >
                    Apply Discount
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => {
                        axios({
                            method: "patch",
                            url: "http://localhost:5000/admin/addAdminPromotionToAllCourses",
                            data: {
                                discount: discount,
                                date: endDate,
                            },
                            withCredentials: true,
                        })
                            .then((res) => {
                                fetchCourses();
                            })
                            .catch((error) => {
                                alert("invalid request");
                            });
                    }}
                >
                    Apply Discount to all courses
                </Button>

                <Typography style={{ color: "red" }} variant="caption">
                    Warning any existing discount will be overwritten
                </Typography>
            </Box>
            <Box
                sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}
            >
                {courses &&
                    courses.map((course) => (
                        <Card variant="outlined">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Checkbox
                                    checked={course.isSelected}
                                    onChange={(e) => {
                                        setCourses((prev) => {
                                            return prev.map((c) => {
                                                if (c._id === course._id)
                                                    return {
                                                        ...c,
                                                        isSelected:
                                                            e.target.checked,
                                                    };
                                                return c;
                                            });
                                        });
                                    }}
                                />
                                <Typography>{course.title}</Typography>
                            </Box>
                            {course.adminPromotion &&
                                course.adminPromotion.discount != 0 && (
                                    <Typography
                                        color="orange"
                                        variant="caption"
                                    >
                                        {"This course has a "}
                                        {course.adminPromotion.discount}
                                        {" percent Discount"}
                                    </Typography>
                                )}
                        </Card>
                    ))}
            </Box>
        </>
    );
};

export default AddDiscount;
