import { Link } from 'react-router-dom'
import "../stylesheets/courseCard.css";
import Button from 'react-bootstrap/Button';
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
import { CardHeader, Avatar } from '@mui/material'
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const CourseCard = ({ course, isInstructor, isCorporateTrainee }) => {
  const [hasPromotion, setHasPromotion] = useState(false)
  const [promotion, setPromotion] = useState(0);
  const [endDate, setEndDate] = useState(null);
  const [show, setShow] = useState(false);
  const { user, loading } = useUserContext()
  const history = useHistory()
  const [open, setOpen] = useState()
  const [processing, setProcessing] = useState(false)
  const [requsted, setRequested] = useState(false)
  const [requstedOpen, setRequestedOpen] = useState(false)
  const handleRequestedClose = () => setRequestedOpen(false)
  const handleClose = () => setOpen(false);
  const handleRequest = async () => {
    setProcessing(true)
    console.log(course, course._id);
    axios({ method: 'patch', url: 'http://localhost:5000/corporateTrainee/requestCourse', withCredentials: true, data: { courseId: course._id } }).then((response) => {
      setRequested(true)
      setRequestedOpen(true)
    }).catch((error) => {
      setProcessing(false)
    })
  }

  let price = <span>{course.price}</span>
  let discount = !course.promotion ? 0 : (new Date(course.promotion.saleEndDate) > new Date()) ? course.promotion.discount : 0
  const adminDiscount = !course.adminPromotion ? 0 : (new Date(course.adminPromotion.saleEndDate) > new Date()) ? course.adminPromotion.discount : 0
  if (discount < adminDiscount) discount = adminDiscount
  //if(courseData.promotion) price = (new Date(courseData.promotion.saleEndDate)<new Date())? courseData.price:courseData.price-courseData.promotion.discount/100*courseData.price
  if (discount > 0) {
    price = <span><del>${course.price}</del> <span style={{ color: '#F92A2A' }}>Now ${course.price - course.price * discount / 100} <span className='h6' style={{ color: '#F92A2A' }}>({discount}% OFF)</span></span></span>
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
      // removePromotion()
    }
  }, [])

  const enroll = () => {
    if (loading) return
    if (user && user.type === 'individual trainee') {
      history.push(`/checkout/${course._id}`)
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


  return (
    <div>

      <Card sx={{ maxWidth: 345, minWidth: 345 }}>
        <Link to={!user ? `/course/${course._id}` : (user.type !== 'instructor') ? `/course/${course._id}` : (course.status === 'published') ? `/course/${course._id}` : `/instructor/incompletecourse/${course._id}`} className="cardLink"  >
          <CardActionArea>
            {/* <div className='card-img' style={{ backgroundImage: `url(${course.imageURL})` }}></div> */}
            <CardMedia
              component="img"
              height="140"
              image={course.imageURL}
              alt="Course Image"
            />
            <CardContent>
              <Typography style={{ height: '60px' }} gutterBottom variant="h5" component="div">
                {course.title}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary"> */}
              <div className='card-body'>
                <p className='fw-bold'>Taught by: <span className='fw-normal'>{course.instructorName}</span></p>
                <div className='ratingAndHours'>
                  <Rating className='rating'
                    value={course.rating.total}
                    readOnly
                    precision={0.5}

                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} /> <span className='num-rating'>({course.numOfRatings})</span>
                  <i class="bi bi-clock p-2 "></i> <span>{course.totalHours} hours</span>
                </div>
                {(!user || user.type !== 'corporateTrainee') && <div className='price'>Price : {price}</div>}
              </div>
              {/* </Typography> */}
            </CardContent>
          </CardActionArea>
        </Link >
      </Card>
      {/* <div className='coursecard' >
          <div className='card-img'></div>
          <div className='card-body'>
            <h5>{course.title}</h5>
            <p className='summary'>
              {course.summary.substring(0, 75) + ((course.summary).length > 75 ? '...' : '')}
            </p>
            <p className='fw-bold'>Taught by: <span className='fw-normal'>{course.instructorName}</span></p>
            <div className='ratingAndHours'>
              <Rating className='rating'
                value={course.rating.total}
                readOnly
                precision={0.5}

                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} /> <span className='num-rating'>({course.numOfRatings})</span>
              <i class="bi bi-clock p-2 "></i> <span>{course.totalHours} hours</span>
            </div>
            {!isCorporateTrainee && <div className='price'>Price : {price}</div>}
          </div>
        </div> */}
      {/* {!isInstructor &&
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
        </Dialog>} */}
    </div >
  );
}

export default CourseCard;