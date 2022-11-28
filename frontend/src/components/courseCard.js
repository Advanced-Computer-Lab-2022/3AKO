import { Link } from 'react-router-dom'
import "../stylesheets/courseCard.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import bootStarp from 'bootstrap';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import "bootstrap-icons/font/bootstrap-icons.css";
const CourseCard = ({ course, isCorporateTrainee }) => {

  var price = <p>{course.price}</p>
  if ((course.promotion).percentage > 0) {
    price = <p className='display-10'><del>${course.price}</del> <span style={{ color: '#F92A2A' }}>Now ${course.price - course.price * ((course.promotion).percentage / 100)} <span className='h6' style={{ color: '#F92A2A' }}>({course.promotion.percentage}% OFF)</span></span></p>
  }


  return (

    <Card className='coursecard'>
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
          <div className='priceEnroll'>{!isCorporateTrainee && <div>{price}</div>}
          </div>
        </Card.Body>
      </Link>
      <Button className='fw-normal px-4' style={{ backgroundColor: '#A00407', border: 'none' }}>Enroll</Button>
    </Card>

    // <div className='coursecard'>
    //     <img src="https://www.educationafter12th.com/wp-content/uploads/2016/11/digital-marketing-seo-course-detail-syllabus.jpg"/>
    //     <h2>{course.title}</h2>
    //     <p>{course.summary.substring(0,150)+ ((course.summary).length > 150 ? '...' : '')}</p>
    //     <p>taught by:<span>{course.instructorName}</span> </p>
    //     <p>{course.numOfViews}</p>
    //     <p>{course.price}</p>

    // </div>






    // <Link className='courseCard' to={`/course/${course._id}`}>
    // <p>{course.title}</p>
    // <p>{course.outline}</p>
    // <p>{course.summary}</p>
    // </Link>

  );
}

export default CourseCard;