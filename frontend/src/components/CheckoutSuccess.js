import { Link, useParams } from "react-router-dom";

const CheckoutSuccess = () => {
    const {courseId} = useParams()
    return ( <div>
        <h2>Payment Successful</h2>
        <Link to={`/trainee/CourseSubtitles/${courseId}`}>Visit Course</Link>
    </div> );
}
 
export default CheckoutSuccess;