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
import SortableList from 'react-sortable-list';
import VideoModal from './components/addVideoModal';
import SubtitleExercise from './subtitleExercise';
const { useParams } = require("react-router-dom")



const Lol = () => {

  const { courseId } = useParams();
  const [course, setCourse] = useState("");
  const [subtitles, setSubtitles] = useState(0);
  const [url, setUrl] = useState('');
  const [rerender, setRerender] = useState(true);
  const [id, setId] = useState("");
  var posCount = 1;
  useEffect(() => {
    const getInfo = async () => {
      await axios({ method: 'get', url: `http://localhost:5000/course/getCourseInfo/${courseId}`, withCredentials: true }).then((response) => {
        setCourse(response.data)
        setSubtitles(response.data.subtitles);
      })
      // console.log("loaded0");
    }
    getInfo()

  }, [rerender]);


  const [open, setOpen] = React.useState(false);
  const [openVideo, setOpenVideo] = React.useState(false);
  const [openExerciseTitle, setOpenExerciseTitle] = React.useState(false);
  const [exerciseTitle, setExerciseTitle] = React.useState("");
  const [titleValue, setTitleValue] = React.useState("");
  const [totalHours, setTotalHours] = React.useState(0);

  const [description, setDescription] = useState('');

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickOpenVideo = () => setOpenVideo(true);
  const handleClickOpenExerciseTitle = (e) => {
    setId(e.target.id);
    setOpenExerciseTitle(true);
  }
  const handleCloseExerciseTitle = () => {
    setOpenExerciseTitle(false);
  };
  const handleCloseVideo = () => {
    setRerender(!rerender);
    console.log(rerender);
    setOpenVideo(false);
  };

  const handleAddSubtitle = () => {
    console.log(titleValue, totalHours);
    axios({
      method: 'patch', url: `http://localhost:5000/instructor/addSubtitleToCourse`, data: {
        title: titleValue,
        courseId: courseId,
        totalHours: totalHours
      }, withCredentials: true
    })
      .then((response) => {
        console.log(response.data);
        console.log('it works');
      });
    setSubtitles(subtitles);
    setTitleValue("");
    setTotalHours(0);
    handleClose();
  }
  const handleAddLesson = (subtitleId) => {
    console.log('hi');
  }
  function handleAdd(subtitle) {
    console.log(subtitle.title);
  }
  const handleAddExercise = (e) => {
    const index = id;
    let pos = 0;
    axios({
      method: 'patch', url: `http://localhost:5000/instructor/addExcercise`, data: {
        courseId: courseId,
        title: exerciseTitle,
        position: pos,
        subtitleId: subtitles[index]._id
      }, withCredentials: true
    })
      .then((response) => {
        console.log(response.data);
        console.log('exrcise Added');
        const exerciseId = response.data._id;
        // if (response)
        //   window.location.href = `/aaa/lolxd/exercise/${courseId}/${subtitles[index]._id}/${exerciseId}`;
      }).catch((error) => {
        console.log(error); //Logs a string: Error: Request failed with status code 404
      });

    handleCloseExerciseTitle();
  }
  const handleAddVideo = () => {
    console.log(url, description);
    axios({
      method: "patch", url: `http://localhost:5000/instructor/addPreviewLink`, data: {
        courseId: courseId,
        vidUrl: url
      }, withCredentials: true
    })
      .then((response) => {
        console.log(response.data);
        console.log('it works');
      });
    console.log('check the course');
    console.log(course);
    handleCloseVideo();
  }
  return (
    <div className="InstructorCourseSubtitles">

      <h1> {course.title} </h1>
      <h2> {course.outlines} </h2>
      <h3> {course.summary} </h3>
      <h3> {course.subject} </h3>
      <h3> {course.previewVideo} </h3>


      <Accordion defaultActiveKey={['0']} alwaysOpen>
        {subtitles && subtitles.map((subtitle, index) => (

          <Accordion.Item eventKey={subtitle._id}>
            <Accordion.Header>{subtitle.title}</Accordion.Header>
            <Accordion.Body>
              {subtitle && (subtitle.lessons.concat(subtitle.exercises).sort((a, b) => a.position - b.position)).map((lesson) => {
                return <div> {lesson.title}</div>

              })}
              <Button onClick={() => handleAdd(subtitle)}>Add lesson</Button>
              <div>
                <Button key={index} id={index} variant="outlined" onClick={handleClickOpenExerciseTitle}>
                  Add Exercise

                </Button>
                <Dialog open={openExerciseTitle} onClose={handleCloseExerciseTitle}>
                  <DialogTitle>Add Exercise Title</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="exerciseTitle"
                      label="exercise title"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={exerciseTitle}
                      onChange={(e) => setExerciseTitle(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseExerciseTitle}>Cancel</Button>
                    <Button key={index} id={index} onClick={(e) => handleAddExercise(e)}>add exercise</Button>

                  </DialogActions>
                </Dialog>
              </div>
              {/* <Button onClick={() => window.location.href = `/aaa/lolxd/exercise/${courseId}/${subtitle._id}`}>Add Exercise</Button> */}
              {/* <Button onClick={handleAddVideo}>Add Preview Video</Button> */}
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
      <div>
        <Button variant="outlined" onClick={handleClickOpenVideo}>
          Add Preview Video for the Course
        </Button>
        <Dialog open={openVideo} onClose={handleCloseVideo}>
          <DialogTitle>Add Preview Video</DialogTitle>
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
            {/* <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Video Description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseVideo}>Cancel</Button>
            <Button onClick={handleAddVideo}>Add Video</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* {console.log(course)} */}
      <div className="video">
        <iframe width="1080" height="607.5" src={"https://www.youtube.com/embed/" + course.previewVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>

      <div>

      </div>
    </div>

  );
}

export default Lol;