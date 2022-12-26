import axios from "axios";
import { useState, useEffect } from "react";
import RatingCard from './components/RatingCard';
import { useHistory, useParams } from 'react-router-dom'
import RatingInfo from "./RatingInfo";
import Button from 'react-bootstrap/Button';
import { useUserContext } from "./hooks/useUserContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


const CourseView = (props) => {
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
    const [corporateError,setCorporateError] = useState('')
    const handleRequestedClose = () => setRequestedOpen(false)
    const handleClose = () => setOpen(false);
    const handleRequest = async () => {
      setProcessing(true)
      axios({ method: 'patch', url: 'http://localhost:5000/corporateTrainee/requestCourse', withCredentials: true, data: { courseId } }).then((response) => {
        setRequested(true)
        setRequestedOpen(true)
      }).catch((error) => {
        console.log(error);
        if(error.response.data.error==='You already requsted this course'){
            setCorporateError(error.response.data.error)
            setRequested(true)
        }
        else{
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

    useEffect(() => {
        console.log(props.currency);
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
    return (


        <div className="courseContainer">
            {!courseData &&
                <div class="loader"></div>
            }
            {courseData && !loading && <div className="courseView">
                <h1>{courseData.title}</h1>
                <p>{courseData.summary}</p>
                {user.type!=='corporate trainee' && <h2>price: {Math.round(courseData.price * exchangeRate) + " " + currency}</h2>
}                {/* {<RatingInfo rating={courseData.rating} price={courseData.price * exchangeRate} promotion={(new Date(courseData.promotion.saleEndDate) > new Date() ? courseData.promotion.saleByInstructor : 0)} views={courseData.numOfViews} hours={courseData.totalHours} currency={currency}></RatingInfo>} */}
                <h2>{courseData.subject}</h2>
                {!user.type !=='instructor' && user.type!=='admin' &&
            <Button className='fw-normal px-4' onClick={enroll} disabled={requsted}
            style={{ backgroundColor: '#A00407', border: 'none' }}>
            Enroll
            </Button>}
                <p>Subtitles :</p>
                <ol>{courseData.subtitles.map(sub => <li>{sub.title}</li>)}</ol>
                <p>Learning Outcomes :</p>
                <ul>{courseData.outlines.map((outline) => <li>{outline}</li>)}</ul>
                <div className="video">
                    <iframe width="1080" height="607.5" src={"https://www.youtube.com/embed/" + courseData.previewVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                
                <RatingCard course={courseData} key={courseData._id} />
        <Dialog open={open} onClose={handleClose}>
            {!corporateError&& <DialogTitle ><b>Request this course from admins </b></DialogTitle>
            
            }          
            {!corporateError &&<DialogTitle>{courseData.title}</DialogTitle>
}            {corporateError &&<DialogTitle><b>{corporateError}</b></DialogTitle>
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
            </div>}
            
        </div>
    );
}

export default CourseView;