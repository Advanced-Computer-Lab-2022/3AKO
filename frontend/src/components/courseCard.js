import { Link } from 'react-router-dom'
import "../stylesheets/courseCard.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Overlay from 'react-overlay-component';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
const CourseCard = ({ course, isInstructor, userId, isCorporateTrainee }) => {
  let price = <p>{course.price}</p>
  console.log();
  if ((course.promotion).discount > 0) {
    price = <p className='display-10'><del>${course.price}</del> <span style={{ color: '#F92A2A' }}>Now ${course.price - course.price * ((course.promotion).discount / 100)} <span className='h6' style={{ color: '#F92A2A' }}>({course.promotion.discount}% OFF)</span></span></p>
  }
  const [promotion, setPromotion] = useState(0);
  const [endDate, setEndDate] = useState(null);

  const [isOpen, setOverlay] = useState(false);

  const closeOverlay = () => setOverlay(false);

  const configs = {
    animate: true,
    // clickDismiss: false,
    // escapeDismiss: false,
    // focusOutline: false,
  };

  const definePromotion = () => {

    //console.log(course._id + " " + promotion + " " + endDate + " " + userId)
    axios({method:'patch',url:`http://localhost:5000/instructor/addPromotion`,withCredentials:true,
      data:{
        courseId: course._id,
        discount: promotion,
        date: endDate
      }})
      .then((response) => {
        console.log(response.data);
        alert("promotion added successfully")
        setOverlay(false)
      })
      .catch((error) => {
        console.log(error);
      })

  }


  const enroll = () => {

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
          <p className='fw-bold'>Taught by: <span className='fw-normal'>{course.title}</span></p>
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
      <div className='priceEnroll'>
        {!isCorporateTrainee && <div>{price}</div>}
        <Button className='fw-normal px-4' onClick={isInstructor ? (() => setOverlay(true)) : enroll}
          style={{ backgroundColor: '#A00407', border: 'none' }}>
          {isInstructor ? "Add promotion" : "Enroll"}
        </Button>
      </div>
      <Overlay configs={configs} isOpen={isOpen} closeOverlay={closeOverlay} >
        <form onSubmit={definePromotion}>
          <input type="number" min={1} max={100} onChange={(e) => setPromotion(e.target.value)} required />
          <input type="date" onChange={(e) => setEndDate(e.target.value)} required />
          <button type="submit">apply promotion</button>
        </form>

      </Overlay>
    </Card>


  );
}

export default CourseCard;