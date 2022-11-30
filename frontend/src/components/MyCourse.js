import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import Rate from './rate';



const MyCourse = ({ course }) => {

    const traineeId = useParams();
    return (
        <div>
            <Link to={`/trainee/CourseMaterials/${course.courseId}`}>
                <div className="m-4">
                    <p>{course.title}</p>
                    <p>{course.progress}</p>
                </div>
            </Link>
            <Rate traineeId={traineeId.id} type='course' id={course.courseId} />
        </div>
    );
}

export default MyCourse;