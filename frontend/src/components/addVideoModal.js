import { useState, useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Accordion from 'react-bootstrap/Accordion';
import SortableList from 'react-sortable-list'


const VideoModal = ({ subtitle }) => {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const handleAddVideo = () => {
        console.log("this is subtitle : ", subtitle.title);
        console.log(url, description);
        //need an axios request to set the values of the URL and the video description for the subtitle.

        // setTitleValue("");
        // setTotalHours(0);
        handleClose();
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Preview Video for the subtitle
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Video</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="url"
                        label="Preview Video Link"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Video Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddVideo}>Add Video </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default VideoModal;