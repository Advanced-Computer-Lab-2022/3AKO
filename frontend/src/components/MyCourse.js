import { useEffect } from 'react';
import { Link } from 'react-router-dom'



const MyCourse = ({ course }) => {

    const traineeId = useParams();
    var progress = 50;
    return (
        <div>
            <Link to={`/trainee/CourseSubtitles/${course.courseId}`}>
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