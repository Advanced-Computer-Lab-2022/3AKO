import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoremIpsum from 'react-lorem-ipsum';
import { ToggleButton } from '@mui/material'
import "../stylesheets/courseSubtitles.css"
import { useState } from 'react';
import axios from 'axios';
import { useUserContext } from "../hooks/useUserContext";
// import CourseMaterials from '../CourseSubtitles'
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material'
import CourseView from '../CourseView';



function ResponsiveDrawer(props) {

    const { user, loading } = useUserContext()
    const drawerWidth = (user && user.type == 'instructor') ? 300 : 240;
    const { window, materialBody, drawer, courseId, stateChanger, setMaterialBody } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [addSubtitleDialog, setAddSubtitleDialog] = useState(false)
    const handleAddSubtitle = () => {
        const titleValue = document.getElementById('titleValue').value
        const totalHours = document.getElementById('hoursValue').value
        axios({
            method: 'patch', url: `http://localhost:5000/instructor/addSubtitleToCourse`,
            data: {
                title: titleValue,
                courseId: courseId,
                totalHours: totalHours
            },
            withCredentials: true
        })
            .then((response) => {
                setAddSubtitleDialog(false)
                stateChanger(true)
            });
        // setSubtitles(subtitles);
        // setTitleValue("");
        // setTotalHours(0);
        // handleClose();
    }




    const container = window !== undefined ? () => window().document.body : undefined;
    const renderWelcome = () => {
        setMaterialBody(<CourseView isWelcome={true} />)

    }

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                    <Drawer
                        style={{ position: "fixed" }}
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        <Button style={{ borderRadius: "0", width: '100%' }} onClick={renderWelcome} >Welcome</Button>

                        {drawer}

                        {(user && user.type == 'instructor') &&
                            <Button style={{ borderRadius: "0", width: '100%' }} onClick={() => { setAddSubtitleDialog(true) }} >Add New Subtitle</Button>
                        }
                    </Drawer>
                </Box >
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                    style={{ backgroundColor: "white" }}
                >

                    {materialBody}
                </Box>


            </Box >

            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '40%', maxHeight: 600 } }}
                maxWidth="m"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // TransitionProps={{ onEntering: handleEntering }}
                open={addSubtitleDialog}

            >
                <DialogTitle>Add Subtitle</DialogTitle>
                <DialogContent dividers sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField className='mb-4' style={{ width: "70%" }} id="titleValue" label='Title' variant="outlined" />
                    <TextField type='number' style={{ width: "25%" }} id="hoursValue" label='Total hours' variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => { setAddSubtitleDialog(false) }}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddSubtitle}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default ResponsiveDrawer;