import { Link } from 'react-router-dom'
import "../stylesheets/courseCard.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-bootstrap/Modal";
import { useUserContext } from '../hooks/useUserContext';
import { useHistory } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const CourseCard = ({ course, isInstructor, isCorporateTrainee }) => {
  const [hasPromotion, setHasPromotion] = useState(false)
  const [promotion, setPromotion] = useState(0);
  const [endDate, setEndDate] = useState(null);
  const [show, setShow] = useState(false);
  const { user , loading } = useUserContext()
  const history = useHistory()
  const [open,setOpen] = useState()
  const [processing,setProcessing] = useState(false)
  const [requsted,setRequested] = useState(false)
  const [requstedOpen,setRequestedOpen] = useState(false)
  const handleRequestedClose = () => setRequestedOpen(false)
  const handleClose = () => setOpen(false);
  const handleRequest = async()=>{
    setProcessing(true)
    console.log(course,course._id);
    axios({method:'patch',url:'http://localhost:5000/corporateTrainee/requestCourse',withCredentials:true,data:{courseId:course._id}}).then((response)=>{
      setRequested(true)
      setRequestedOpen(true)
    }).catch((error)=>{
      setProcessing(false)
    })
  }

  let price = <p>{course.price}</p>
  if (course.promotion !== null && (course.promotion).discount > 0 && new Date(course.promotion.saleEndDate)> new Date()) {
    price = <p className='display-10'><del>${course.price}</del> <span style={{ color: '#F92A2A' }}>Now ${course.price - course.price * ((course.promotion).discount / 100)} <span className='h6' style={{ color: '#F92A2A' }}>({course.promotion.discount}% OFF)</span></span></p>
  }
  var today = new Date()
  var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const removePromotion = () => {
    axios({ method: 'patch', url: `http://localhost:5000/instructor/removePromotion`, data: { courseId: course._id } })
      .then((response) => {
        console.log(response.data)
      }).catch(error => console.log(error))
  }

  const definePromotion = () => {
    axios({
      method: 'patch', url: `http://localhost:5000/instructor/addPromotion`, withCredentials: true,
      data: {
        courseId: course._id,
        discount: promotion,
        date: endDate
      }
    })
      .then((response) => {
        console.log(response.data)
        setShow(false)
      })
      .catch((error) => {
        console.log(error);
      })

  }

  useEffect(() => {
    if (course.promotion != null && (course.promotion).discount > 0) {
      setHasPromotion(true)
    }
    if (course.promotion != null && (course.promotion).saleEndDate < currentDate) {
      removePromotion()
    }
  }, [])

  const enroll = () => {
    if(loading) return
    if(user && user.type==='individual trainee'){
      history.push(`/checkout/${course._id}`)
    }
    else{
      if(user && user.type==='corporate trainee'){
        setOpen(true)
      }
      else if(user){
        history.push('/')
      }
      else{
        history.push('/login')
      }
    }
  }


  return (
    <Card className='coursecard' >
      <Link to={`/course/${course._id}`} className="cardLink"  >
        <Card.Img variant="top" src="https://www.educationafter12th.com/wp-content/uploads/2016/11/digital-marketing-seo-course-detail-syllabus.jpg" />
        <Card.Body className='m-1'>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>
            {course.summary.substring(0, 95) + ((course.summary).length > 95 ? '...' : '')}
          </Card.Text>
          <p className='fw-bold'>Taught by: <span className='fw-normal'>{course.instructorName}</span></p>
          <div style={{ display: 'inline-flex' }}>
            <Rating className='rating'

              name="#FFC700"
              value={course.rating}
              readOnly
              precision={0.5}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} /> <Box sx={{ ml: 2 }}>15</Box>
          </div>
          <br />

          <div className='mt-2' style={{ display: '-webkit-inline-box' }}>
            <i class="bi bi-clock p-2 "></i> <p>{course.totalHours} hours</p>
          </div>


        </Card.Body>
      </Link>
      {!isCorporateTrainee && <span>{price}</span>}
      {!isInstructor &&
        <Button className='fw-normal px-4' onClick={enroll}
          style={{ backgroundColor: '#A00407', border: 'none' }}>
          Enroll
        </Button>}
      {isInstructor &&
        <Button className='fw-normal px-4' onClick={() => setShow(true)}
          style={{ backgroundColor: '#A00407', border: 'none' }}
          disabled={hasPromotion}>
          Add promotion
        </Button>}

      <Modal show={show} onHide={() => setShow(false)} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Add Promotion</Modal.Title>
        </Modal.Header>
        <form onSubmit={definePromotion}>
          <Modal.Body>
            <input type="number" min={1} max={100} onChange={(e) => setPromotion(e.target.value)} required />
            <input type="date" onChange={(e) => setEndDate(e.target.value)} min={currentDate} required />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type='submit'>apply promotion</Button>
          </Modal.Footer>
        </form>
      </Modal>

      <ToastContainer />
        {!requsted && 
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle ><b>Request this course from admins </b></DialogTitle>
          <DialogTitle>{course.title}</DialogTitle>
          <DialogTitle>By {course.instructorName}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button disabled={processing} onClick={handleRequest}>Request</Button>
            </DialogActions>
        </Dialog>}
        {requsted && 
        <Dialog open={requstedOpen} onClose={handleRequestedClose}>
          <DialogTitle>Request sent</DialogTitle>
            <DialogActions>
              <Button onClick={handleRequestedClose}>continue</Button>
            </DialogActions>
        </Dialog>}
    </Card>

  );
}

export default CourseCard;