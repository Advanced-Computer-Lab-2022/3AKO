import { Link } from 'react-router-dom'
import "../stylesheets/courseCard.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Overlay from 'react-overlay-component';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
const CourseCard = ({ course, isInstructor, userId }) => {
  const stars = [];
  for (let i = 0; i < Math.floor(course.rating); i++) {
    stars.push(<i class="bi bi-star-fill" style={{ color: '#FFC700' }}></i>)
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
    axios.patch(`http://localhost:5000/instructor/addPromotion/${userId}`,
      {
        courseId: course._id,
        discount: promotion,
        date: endDate
      })
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



    <div>

      <Card style={{ width: '25%', textDecoration: 'none', margin: 'auto' }}>
        <Link to={`/course/${course._id}`}>
          <Card.Img variant="top" src="https://www.educationafter12th.com/wp-content/uploads/2016/11/digital-marketing-seo-course-detail-syllabus.jpg" />
          <Card.Body className='m-1'>
            <Card.Title>{course.title}</Card.Title>
            <Card.Text>
              {course.summary.substring(0, 95) + ((course.summary).length > 95 ? '...' : '')}
            </Card.Text>
            <p className='fw-bold'>Taught by: <span className='fw-normal'>{course.title}</span></p>

            <div>{stars} <span>(1.5K)</span></div>


            <div style={{ display: '-webkit-inline-box' }}>
              <i class="bi bi-clock p-2 "></i> <p>{course.totalHours} hours</p>
            </div>




          </Card.Body>
        </Link>
        <Button style={{ marginLeft: '20%' }}
          onClick={isInstructor ? (() => setOverlay(true)) : enroll}
          variant="primary">{isInstructor ? "Add promotion" : "Enroll"}</Button>
      </Card>
      <Overlay configs={configs} isOpen={isOpen} closeOverlay={closeOverlay}>
        <input type='number' min={1} max={100} onChange={(e) => setPromotion(e.target.value)} value={promotion} />
        <input type='date' onChange={(e) => setEndDate(e.target.value)} value={endDate} />
        <button onClick={definePromotion}>apply promotion</button>
      </Overlay>
    </div>

  );
}

export default CourseCard;