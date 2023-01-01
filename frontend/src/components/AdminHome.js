import React, { useState } from "react";
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
import AddUser from "./addUser";
import CourseRequest from "./courseRequest";
import Complaints from "./complaints";

export default function AdminHome() {
    const [page, setPage] = useState("Add User");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const drawerWidth = 240;
    const [materialBody, setMaterialBody] = useState(<AddUser />);
    const drawerFun = () => {
        return (
            <List>
                <ListItem key={"Add User"} disablePadding>
                    <ListItemButton
                        sx={{ textAlign: "center" }}
                        onClick={() => {
                            setPage("Add User");
                            setMaterialBody(<AddUser />);
                        }}
                    >
                        <ListItemText primary={"Add User"} />
                    </ListItemButton>
                </ListItem>

                <Divider
                    sx={{ borderBottomWidth: "2px", backgroundColor: "#111" }}
                />

                <ListItem key={"Complaints"} disablePadding>
                    <ListItemButton
                        sx={{ textAlign: "center" }}
                        onClick={() => {
                            setPage("Complaints");
                            setMaterialBody(
                                <div>
                                    <Complaints />
                                </div>
                            );
                        }}
                    >
                        <ListItemText primary={"Complaints"} />
                    </ListItemButton>
                </ListItem>

                <Divider
                    sx={{ borderBottomWidth: "2px", backgroundColor: "#111" }}
                />

                <ListItem key={"CourseRequests"} disablePadding>
                    <ListItemButton
                        sx={{ textAlign: "center" }}
                        onClick={() => {
                            setPage("Course Requests");
                            setMaterialBody(<CourseRequest />);
                        }}
                    >
                        <ListItemText primary={"Course Requests"} />
                    </ListItemButton>
                </ListItem>

                <Divider
                    sx={{ borderBottomWidth: "2px", backgroundColor: "#111" }}
                />

                <ListItem key={"RefundRequests"} disablePadding>
                    <ListItemButton
                        sx={{ textAlign: "center" }}
                        onClick={() => {
                            setPage("Refund Requests");
                            setMaterialBody(<div>under construction</div>);
                        }}
                    >
                        <ListItemText primary={"Refund Requests"} />
                    </ListItemButton>
                </ListItem>

                <Divider
                    sx={{ borderBottomWidth: "2px", backgroundColor: "#111" }}
                />

                <ListItem key={"AddDiscount"} disablePadding>
                    <ListItemButton
                        sx={{ textAlign: "center" }}
                        onClick={() => {
                            setPage("Add Discount");
                            setMaterialBody(<div>under construction</div>);
                        }}
                    >
                        <ListItemText primary={"Add Discount"} />
                    </ListItemButton>
                </ListItem>

                <Divider
                    sx={{ borderBottomWidth: "2px", backgroundColor: "#111" }}
                />
            </List>
        );
    };
    const drawer = drawerFun();

    const title = <div>{page}</div>;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                style={{ position: "fixed", marginTop: "70px", zIndex: "0" }}
                sx={{
                    width: {
                        sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
                    },
                    transition: "width 0.3s ease-in",

                    ml: { sm: `${drawerOpen ? drawerWidth : 0}px` },
                }}
            >
                <Toolbar style={{ background: "#E00018" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            setDrawerOpen((prev) => !prev);
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                style={{ zIndex: "0", marginTop: "70px" }}
                component="nav"
                sx={{
                    width: { sm: drawerOpen ? drawerWidth : 0 },
                    flexShrink: { sm: 0 },
                    transition: "width 0.3s ease-in",
                }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerOpen ? drawerWidth : 0,
                            transition: "width 0.3s ease-in",
                            marginTop: "70px",
                        },
                    }}
                    open={false}
                >
                    <div> {drawer}</div>
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: {
                        sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
                    },
                    transition: "width 0.3s ease-in",
                }}
                style={{ backgroundColor: "white", marginTop: "70px" }}
            >
                <Box>{materialBody}</Box>
            </Box>
        </Box>
    );
}
