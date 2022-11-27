import { useEffect } from 'react';
import {Link} from 'react-router-dom'



const MyCourse = ({course}) => {

    var progress = 50;

    return (<Link to={`/trainee/CourseMaterials/${course._id}`}>
                <div className="m-4">
                    <p>{course.title}</p>
                    <p>{progress}</p>
                </div>
            </Link> );
}
 
export default MyCourse;