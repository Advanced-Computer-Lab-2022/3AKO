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
const { useParams } = require("react-router-dom")



const Lol = () => {

  const { courseId } = useParams();
  const [course, setCourse] = useState("");
  const [subtitlesCount, setSubtitlesCount] = useState(0);

  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`http://localhost:5000/course/getCourseInfo/${courseId}`)
      const json = await response.json()
      setCourse(json)
      // console.log("loaded0");
      setSubtitlesCount(course.subtitles.length);
    }
    getInfo()

  }, [subtitlesCount]);


  const [open, setOpen] = React.useState(false);
  const [titleValue, setTitleValue] = React.useState("");
  const [totalHours, setTotalHours] = React.useState(0);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddSubtitle = () => {
    console.log(titleValue, totalHours);
    axios
      .patch(`http://localhost:5000/instructor/addSubtitleToCourse/00`, {
        title: titleValue,
        courseId: courseId,
        totalHours: totalHours
      })
      .then((response) => {
        console.log(response.data);
        console.log('it works');
      });
    setSubtitlesCount(subtitlesCount + 1);
    setTitleValue("");
    setTotalHours(0);
    handleClose();
  }
  const handleAddLesson = () => {

  }
  const handleAddExercise = () => {

  }
  return (
    <div className="InstructorCourseSubtitles">

      <h1> {course.title} </h1>
      <h2> {course.outlines} </h2>
      <h3> {course.summary} </h3>
      <h3> {course.subject} </h3>

      <Accordion defaultActiveKey={['0']} alwaysOpen>
        {course.subtitles && course.subtitles.map((subtitle) => (

          <Accordion.Item eventKey={subtitle._id}>
            <Accordion.Header>{subtitle.title}</Accordion.Header>
            <Accordion.Body>
              {subtitle && (subtitle.lessons.concat(subtitle.excercises).sort((a, b) => a.position - b.position)).map((lesson) => (
                <div> {lesson.title}</div>
              ))}
              <Button onClick={handleAddLesson}>Add lesson</Button>
              <Button onClick={handleAddExercise}>Add Exercise</Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>


      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add new Subtitle
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
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="totalHours"
              label="totalHours"
              type="number"
              fullWidth
              variant="standard"
              value={totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddSubtitle}>Add Subtitle</Button>
          </DialogActions>
        </Dialog>
      </div>
      {console.log(course)}



    </div>

  );
}

export default Lol;
