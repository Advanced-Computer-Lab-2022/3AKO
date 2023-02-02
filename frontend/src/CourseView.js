import axios from "axios";
import { useState, useEffect } from "react";
import RatingCard from './components/RatingCard';
import { useHistory, useParams, Link } from 'react-router-dom'
import RatingInfo from "./RatingInfo";
import { Button } from '@mui/material'
import { useUserContext } from "./hooks/useUserContext";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Rate from "./components/rate";

const CourseView = (props) => {
  const [addPromotionDialog, setAddPromotionDialog] = useState(false)
  const [closeCourseDialog, setCloseCourseDialog] = useState(false)

  const isWelcome = props.isWelcome
  const CourseMaterials = ({ subtitle }) => {
    const [materials, setMaterials] = useState('')
    useEffect(() => {
      const temp = subtitle.lessons.concat(subtitle.exercises)
      temp.sort((a, b) => a.position - b.position)
      setMaterials(temp);

    }, [])
    return (
      <div>
        {
          materials && materials.map((material, index) => (
            <div>{!material.videoURL ? <BorderColorOutlinedIcon /> : <PlayCircleFilledWhiteOutlinedIcon />}{material.title}</div>
          ))
        }
      </div>
    );
  }

  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [exchangeRate, setExchangeRate] = useState(props.exchangeRate);
  const [currency, setCurrency] = useState(props.currency);

  const { user, loading } = useUserContext()
  const history = useHistory()
  const [open, setOpen] = useState()
  const [processing, setProcessing] = useState(false)
  const [requsted, setRequested] = useState(false)
  const [requstedOpen, setRequestedOpen] = useState(false)
  const [promotion, setPromotion] = useState(0);
  const [endDate, setEndDate] = useState(null);
  var today = new Date()
  var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [corporateError, setCorporateError] = useState('')
  const handleRequestedClose = () => setRequestedOpen(false)
  const handleClose = () => setOpen(false);
  const handleRequest = async () => {
    setProcessing(true)
    axios({ method: 'patch', url: 'http://localhost:5000/corporateTrainee/requestCourse', withCredentials: true, data: { courseId } }).then((response) => {
      setRequested(true)
      setRequestedOpen(true)
    }).catch((error) => {
      console.log(error);
      if (error.response.data.error === 'You already requsted this course') {
        setCorporateError(error.response.data.error)
        setRequested(true)
      }
      else {
        setProcessing(false)
      }
    })
  }
  const enroll = () => {

    if (loading) return
    if (user && user.type === 'individual trainee') {
      history.push(`/checkout/${courseId}`)
    }
    else {
      if (user && user.type === 'corporate trainee') {
        setOpen(true)
      }
      else if (user) {
        history.push('/')
      }
      else {
        history.push('/login')
      }
    }
  }
  const definePromotion = () => {
    axios({
      method: 'patch', url: `http://localhost:5000/instructor/addPromotion`, withCredentials: true,
      data: {
        courseId: courseData._id,
        discount: promotion,
        date: endDate
      }
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })

  }
  const closeCourse = () => {
    axios({
      method: 'post', url: `http://localhost:5000/instructor/closeCourse`, withCredentials: true,
      data: {
        courseId: courseData._id
      }
    })
      .then((response) => {
        console.log(response.data)
        history.push(`/instructor/myCourses`);

      })
      .catch((error) => {
        console.log(error);
      })

  }

  useEffect(() => {

    console.log(user);
    setExchangeRate(props.exchangeRate)
    setCurrency(props.currency)
  }, [props.currency])
  useEffect(() => {
    const start = async () => {
      const newData = await fetch(`/course/getCourseInfo/${courseId}`)
      const json = await newData.json()
      if (newData.ok) {
        setCourseData(json)
      }
    }
    start()
  }, [])
  const [isOwned, setIsOwned] = useState(false)

  useEffect(() => {
    if (user && user.type !== 'instructor') {
      if (courseData) {
        if (user.courseList.filter(function (e) { console.log(e.courseId === courseData._id); return e.courseId === courseData._id; }).length > 0 && user.courseList.filter(function (e) { return e.courseId === courseData._id; })[0].status === 'active') {
          setIsOwned(true)
        }
        if (user && user.type === 'corporate trainee' && user.courseList.filter(function (e) { return e.courseId === courseData._id; }).length > 0)
          setIsOwned(true)

      }
    }
    console.log('isOwned' + isOwned);
  }, [loading, courseData])
  return (

    <div className="im here" >
      {courseData &&
        <div >
          <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', backgroundColor: 'black', padding: '50px  0 50px 150px', height: '300px' }}>
            <div>
              <h1 style={{ color: 'white', fontWeight: 'bold' }}>{courseData.title}</h1>
              <h4 style={{ color: 'white' }}>{courseData.subject}</h4>
              <span><span style={{ color: "white" }}>Taught by </span><Link to={`/viewInstructor/${courseData.instructorId}`} style={{ color: '#E00018' }}>{courseData.instructorName}</Link></span>


              {((user && user.type !== 'corporate trainee') && !isWelcome) ? <h2 style={{ color: 'white' }}>price: {Math.round(courseData.price * exchangeRate) + " " + currency}</h2> : <div> <br /> <br /> </div>
              }
              {(!user) ? (<Button onClick={enroll} variant="contained" size="large" style={{ backgroundColor: '#A00407' }}>Enroll</Button>) :
                (user.type == 'instructor' && courseData.status == "published" && courseData.instructorId == user._id) ?
                  (<div><Button onClick={() => { setAddPromotionDialog(true) }} variant="contained" size="large" style={{ backgroundColor: '#A00407' }}>Add Promotion</Button> <Button onClick={() => { setCloseCourseDialog(true) }} variant="contained" size="large" style={{ backgroundColor: '#A00407' }}>Close Course</Button></div>) :
                  (user.type == 'instructor' || isWelcome) ? (<div></div>) :
                    ((!isOwned) ? (<Button onClick={enroll} variant="contained" size="large" style={{ backgroundColor: '#A00407' }}>Enroll</Button>) :
                      (<Link to={`/trainee/CourseSubtitles/${courseData._id}`} style={{ textDecoration: 'none' }}><Button variant="contained" size="large" style={{ backgroundColor: '#A00407' }}>View Course</Button></Link>))}
            </div>
            <div className="video" style={{ marginTop: '58px' }}>
              <iframe width="648" height="364.5" src={"https://www.youtube.com/embed/" + courseData.previewVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>

          <div className="course-outlines"
            style={{ border: '1px gray solid', padding: '20px', margin: '40px', width: '45%' }}
          >
            <strong style={{ fontSize: '25px' }}>Course Outlines</strong>
            <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
              {courseData.outlines && courseData.outlines.map((outline) => (
                <li style={{ width: '50%' }}>{outline}</li>
              ))}
            </ul>
          </div>
          <div className="course-summary"
            style={{ border: '1px gray solid', padding: '20px', margin: '50px' }}
          >
            <strong style={{ fontSize: '25px' }}>Course Summary</strong>
            <br />
            <span>{courseData.summary}</span>
          </div>
          <div className="course-content"
            style={{ padding: '20px', margin: '50px' }}>
            <strong style={{ fontSize: '25px' }}>Course Content</strong>
            {courseData.subtitles && courseData.subtitles.map((subtitle, index) => (
              <Accordion
                style={{ margin: '0' }}
                sx={{ background: '#d1d7dc' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{subtitle.title}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ background: '#FFFFFA' }}>
                  <CourseMaterials subtitle={subtitle} />
                </AccordionDetails>
              </Accordion >
            ))}
          </div>
          {(user && (user.type == 'corporate trainee' || user.type === 'individual trainee')) ? <Rate type={'course'}></Rate> : <div></div>}  <RatingCard course={courseData} key={courseData._id} />
          <Dialog open={open} onClose={handleClose}>
            {!corporateError && <DialogTitle ><b>Request this course from admins </b></DialogTitle>

            }
            {!corporateError && <DialogTitle>{courseData.title}</DialogTitle>
            }            {corporateError && <DialogTitle><b>{corporateError}</b></DialogTitle>
            }
            <DialogTitle>By {courseData.instructorName}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button disabled={processing} onClick={handleRequest}>Request</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={requstedOpen} onClose={handleRequestedClose}>
            <DialogTitle>Request sent</DialogTitle>
            <DialogActions>
              <Button onClick={handleRequestedClose}>continue</Button>
            </DialogActions>
          </Dialog>


        </div >
      }
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '40%', maxHeight: 600 } }}
        maxWidth="m"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // TransitionProps={{ onEntering: handleEntering }}
        open={addPromotionDialog}
        onClose={() => { setAddPromotionDialog(false) }}

      >
        <DialogTitle>add promotion</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <input type="number" min={1} max={100} onChange={(e) => setPromotion(e.target.value)} />
          <input type="date" onChange={(e) => setEndDate(e.target.value)} min={currentDate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setAddPromotionDialog(false) }}>
            Cancel
          </Button>
          <Button onClick={() => { definePromotion(); setAddPromotionDialog(false); }}>
            add promotion
          </Button>

        </DialogActions>
      </Dialog>

      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '40%', maxHeight: 600 } }}
        maxWidth="m"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // TransitionProps={{ onEntering: handleEntering }}
        open={closeCourseDialog}
        onClose={() => { setCloseCourseDialog(false) }}

      >
        <DialogTitle>Close Course</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography> are you sure you want to close this course</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setCloseCourseDialog(false) }}>
            Cancel
          </Button>
          <Button onClick={() => { closeCourse(); setCloseCourseDialog(false); }}>
            close course
          </Button>

        </DialogActions>
      </Dialog>



    </div >


    // <div className="courseContainer">
    //   {!courseData &&
    //     <div class="loader"></div>
    //   }
    //   {courseData && !loading && <div className="courseView">
    //     <h1>{courseData.title}</h1>
    //     <p>{courseData.summary}</p>
    //     {user.type !== 'corporate trainee' && <h2>price: {Math.round(courseData.price * exchangeRate) + " " + currency}</h2>
    //     }                {/* {<RatingInfo rating={courseData.rating} price={courseData.price * exchangeRate} promotion={(new Date(courseData.promotion.saleEndDate) > new Date() ? courseData.promotion.saleByInstructor : 0)} views={courseData.numOfViews} hours={courseData.totalHours} currency={currency}></RatingInfo>} */}
    //     <h2>{courseData.subject}</h2>
    //     {!user.type !== 'instructor' && user.type !== 'admin' &&
    //       <Button className='fw-normal px-4' onClick={enroll} disabled={requsted}
    //         style={{ backgroundColor: '#A00407', border: 'none' }}>
    //         Enroll
    //       </Button>}
    //     <p>Subtitles :</p>
    //     <ol>{courseData.subtitles.map(sub => <li>{sub.title}</li>)}</ol>
    //     <p>Learning Outcomes :</p>
    //     <ul>{courseData.outlines.map((outline) => <li>{outline}</li>)}</ul>
    //     <div className="video">
    //       <iframe width="1080" height="607.5" src={"https://www.youtube.com/embed/" + courseData.previewVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    //     </div>

    //     <RatingCard course={courseData} key={courseData._id} />
    //     <Dialog open={open} onClose={handleClose}>
    //       {!corporateError && <DialogTitle ><b>Request this course from admins </b></DialogTitle>

    //       }
    //       {!corporateError && <DialogTitle>{courseData.title}</DialogTitle>
    //       }            {corporateError && <DialogTitle><b>{corporateError}</b></DialogTitle>
    //       }
    //       <DialogTitle>By {courseData.instructorName}</DialogTitle>
    //       <DialogActions>
    //         <Button onClick={handleClose}>Cancel</Button>
    //         <Button disabled={processing} onClick={handleRequest}>Request</Button>
    //       </DialogActions>
    //     </Dialog>
    //     <Dialog open={requstedOpen} onClose={handleRequestedClose}>
    //       <DialogTitle>Request sent</DialogTitle>
    //       <DialogActions>
    //         <Button onClick={handleRequestedClose}>continue</Button>
    //       </DialogActions>
    //     </Dialog>
    //   </div>}

    // </div>
  );
}

export default CourseView;