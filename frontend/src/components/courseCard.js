import {Link} from 'react-router-dom'
import "../stylesheets/courseCard.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import bootStarp from 'bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
const CourseCard = ({course,isCorporateTrainee}) => {
    const stars=[];
    for (let i = 0; i <  Math.floor(course.rating) ; i++) {
        stars.push(<i class="bi bi-star-fill" style={{color:'#FFC700'}}></i>)
  }
  if(course.rating%1 >= 0.25 )
    stars.push(<i class="bi bi-star-half" style={{color: '#FFC700'}}></i>);

    var price = <p>{course.price}</p>

    if((course.promotion).percentage > 0){
      price = <p className='display-10'><del>${course.price}</del> <span style={{color : '#F92A2A'}}>Now ${ course.price- course.price*((course.promotion).percentage/100)} <span className='h6' style={{color:'#F92A2A'}}>({course.promotion.percentage}% OFF)</span></span></p>
    }
    



    return (
        <Link to={`/course/${course._id}`} style={{ width: '25%' , textDecoration: 'none',margin:'auto'}}>
        <Card >
        <Card.Img variant="top" src="https://www.educationafter12th.com/wp-content/uploads/2016/11/digital-marketing-seo-course-detail-syllabus.jpg" />
        <Card.Body className='m-1'>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>
          {course.summary.substring(0,95)+ ((course.summary).length > 95 ? '...' : '')}
          </Card.Text>
          <p className='fw-bold'>Taught by: <span className='fw-normal'>{course.title}</span></p>
    
          <div className='p-2'>{stars} <span>(1.5K)</span></div>
          <div className='mt-2' style={{display:'-webkit-inline-box'}}>
          <i class="bi bi-clock p-2 "></i> <p>{course.totalHours} hours</p>
          </div>
          <div className='priceEnroll'>{!isCorporateTrainee && <div>{price}</div>} <Button className='fw-normal px-4' style={{backgroundColor : '#A00407',border: 'none'}}>Enroll</Button>
</div>
         
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