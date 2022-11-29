import { useState , useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const { useParams } = require("react-router-dom")



const Lol = () => {
  
  const {courseId} = useParams();
const [courseName, setCourseName] = useState("");
useEffect(()=>{
  const getInfo =async ()  =>{
    const response = await fetch(`http://localhost:5000/course/getCourseInfo/${courseId}`)
    const json =await response.json()
    setCourseName(json)
   }
   getInfo()

},[])
 
const [open, setOpen] = React.useState(false);
const handleClickOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
// const handleAddSubtitle = (title, hours) => {
//   axios
//   .post(baseURL, {
//     title: "Hello World!",
//     body: "This is a new post."
//   })
//   .then((response) => {
//     setPost(response.data);
//   });
//}
  return (
    <div className="7ambola">
     
     <h1> {courseName.title} </h1> 
     <h2> {courseName.outline} </h2> 
     <h3> {courseName.summary} </h3> 
     <h3> {courseName.subject} </h3>

     <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Subtitle</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="totalHours"
            label="totalHours"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add Subtitle</Button>
        </DialogActions>
      </Dialog>
    </div>
     {console.log(courseName)}


     
     </div>
    
  );
}

export default Lol;
