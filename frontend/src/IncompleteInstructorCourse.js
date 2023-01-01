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
import { useHistory } from "react-router-dom";
const { useParams } = require("react-router-dom")



const IncompleteCourse = () => {

  const { courseId } = useParams();
  const [course, setCourse] = useState("");
  const [subtitles, setSubtitles] = useState(0);
  const [url, setUrl] = useState('');
  const [rerender, setRerender] = useState(true);
  const [id, setId] = useState("");
  const [preVid, setPreVid] = useState('')
  const history = useHistory()
  var posCount = 1;
  useEffect(() => {
    console.log("here we go again");
    const getInfo = async () => {
      await axios({ method: 'get', url: `http://localhost:5000/course/getCourseInfo/${courseId}`, withCredentials: true }).then((response) => {
        setCourse(response.data)
        setSubtitles(response.data.subtitles);
        setPreVid(response.data.previewVideo)
      })
      // console.log("loaded0");
    }
    getInfo()

  }, []);


  const [open, setOpen] = React.useState(false);
  const [openVideo, setOpenVideo] = React.useState(false);
  const [openExerciseTitle, setOpenExerciseTitle] = React.useState(false);
  const [exerciseTitle, setExerciseTitle] = React.useState("");
  const [titleValue, setTitleValue] = React.useState("");
  const [totalHours, setTotalHours] = React.useState(0);
  const [openPublish, setOpenPublish] = React.useState(false);
  const [description, setDescription] = useState('');
  const handleOpenPublish = () => setOpenPublish(true);
  const handleClosePublish = () => setOpenPublish(false);
  const handlePublish = () => {
    axios({
      method: 'post', url: `http://localhost:5000/instructor/publishCourse`, data: {
        courseId: courseId,
      }, withCredentials: true
    })
      .then((response) => {
        console.log(response.data);
        console.log('course published');
      }).catch((error) => {
        console.log(error); //Logs a string: Error: Request failed with status code 404
      });
    handleClosePublish();
    history.push(`/instructor/myCourses`);



  }

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
  const handleAddLesson = (e) => {
    setId(e.target.id);
    const index = e.target.id;
    console.log('hi');
    console.log(subtitles[index]);
    console.log(e.target.id);
    history.push(`/instructor/incompleteCourse/lesson/${courseId}/${subtitles[index]._id}`);
  }
  const handleAddExercise = (e) => {
    const index = id;
    axios({
      method: 'patch', url: `http://localhost:5000/instructor/addExercise`, data: {
        courseId: courseId,
        title: exerciseTitle,
        subtitleId: subtitles[index]._id
      }, withCredentials: true
    })
      .then((response) => {
        console.log(response.data);
        console.log('exrcise Added');
        const exerciseId = response.data._id;
        if (response)
          history.push(`/instructor/incompleteCourse/exercise/${courseId}/${subtitles[index]._id}/${exerciseId}`);
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
        let temp = course
        const reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = (url).match(reg)
        temp.previewVideo = match[1]
        setCourse(temp)
        setPreVid(match[1])

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
              <Button id={index} onClick={handleAddLesson}>Add lesson</Button>
              <Button key={index} id={index} variant="outlined" onClick={handleClickOpenExerciseTitle}>Add Exercise</Button>


              {/* <Button onClick={() => window.location.href = `/aaa/lolxd/exercise/${courseId}/${subtitle._id}`}>Add Exercise</Button> */}
              {/* <Button onClick={handleAddVideo}>Add Preview Video</Button> */}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>


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
          <Button onClick={(e) => handleAddExercise(e)}>add exercise</Button>

        </DialogActions>
      </Dialog>
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
      {preVid && <div className="video">
        <iframe width="1080" height="607.5" src={"https://www.youtube.com/embed/" + preVid} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>}

      <div>
        <Button variant="outlined" onClick={handleOpenPublish}>
          Publish Course
        </Button>
        <Dialog open={openPublish} onClose={handleClosePublish}>
          <DialogTitle>Publish Course</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to publish this course?
              published courses CANNOT be modified or deleted later.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePublish}>Cancel</Button>
            <Button onClick={handlePublish}>Publish Course</Button>

          </DialogActions>
        </Dialog>
      </div>
    </div>

  );
}

export default IncompleteCourse;