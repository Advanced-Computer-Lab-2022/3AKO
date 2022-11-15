import {Link} from 'react-router-dom'
import "./stylesheets/courseCard.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import bootStarp from 'bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
const CourseCard = ({course}) => {
    const stars=[];
    for (let i = 0; i <  Math.floor(course.rating) ; i++) {
        stars.push(<i class="bi bi-star-fill" style={{color:'#FFC700'}}></i>)
  }



    return (
    



        <Link to={`/course/${course._id}`} style={{ width: '25%' , textDecoration: 'none'}}>
        <Card >
        <Card.Img variant="top" src="https://www.educationafter12th.com/wp-content/uploads/2016/11/digital-marketing-seo-course-detail-syllabus.jpg" />
        <Card.Body className='m-1'>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>
          {course.summary.substring(0,95)+ ((course.summary).length > 95 ? '...' : '')}
          </Card.Text>
          <p className='fw-bold'>Taught by: <span className='fw-normal'>{course.title}</span></p>
    
          <div>{stars} <span>(1.5K)</span></div>
          
      
          <div style={{display:'-webkit-inline-box'}}>
          <i class="bi bi-clock p-2 "></i> <p>{course.totalHours} hours</p>
          </div>

         
          <Button style={{marginLeft:'80%'}} variant="primary">Enroll</Button>
        </Card.Body>
      </Card>
      </Link>
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