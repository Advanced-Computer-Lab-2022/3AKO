import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { BsFillCheckCircleFill } from 'react-icons/bs'
const PaymentSuccess = () => {
    const { courseId } = useParams()
    return (

        <div className="payment-success-content">
            <BsFillCheckCircleFill style={{ width: '70px', height: '70px', color: '#4BB543' }} />
            <h1>Success!</h1>
            <h3>Your payment has been processed successfully</h3>
            <Button variant="contained" ><Link style={{ color: '#fff', textDecoration: "none" }} to={`/trainee/CourseSubtitles/${courseId}`}>Visit Course</Link></Button>
        </div>
    );
}

export default PaymentSuccess;