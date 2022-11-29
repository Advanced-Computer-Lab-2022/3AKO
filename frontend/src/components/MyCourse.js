import { useEffect } from 'react';
import {Link} from 'react-router-dom'



const MyCourse = ({course}) => {

    var progress = 50;

    return (<Link to={`/trainee/CourseMaterials/${course.courseId}`}>
                <div className="m-4">
                    <p>{course.title}</p>
                    <p>{course.progress}</p>
                </div>
            </Link> );
}
 
export default MyCourse;