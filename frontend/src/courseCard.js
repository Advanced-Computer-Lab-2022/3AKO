import {Link} from 'react-router-dom'
const CourseCard = ({course}) => {
    return (
     
        <Link className='courseCard' to={`/course/${course._id}`}>
        <p>{course.title}</p>
        <p>{course.outline}</p>
        <p>{course.summary}</p>
        </Link>
    
     );
}
 
export default CourseCard;