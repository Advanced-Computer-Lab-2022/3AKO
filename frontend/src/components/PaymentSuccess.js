import { Link, useParams } from "react-router-dom";

const PaymentSuccess = () => {
    const {courseId} = useParams()
    return (
      <div className="col-md-6 mx-auto mt-5">
         <div className="payment-success">
            <div className="payment-success_header">
               <div className="payment-success-check"><svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16.5L3 13.5L10.5 21L27 4.5L30 7.5L10.5 27L0 16.5Z" fill="#4ECB71"/>
                </svg>
                </div>
            </div>
            <div className="payment-success-content">
               <h1>Payment Successful</h1>
                <Link to={`/trainee/CourseSubtitles/${courseId}`}>Visit Course</Link>
         </div>
</div>
    </div> );
}
 
export default PaymentSuccess;