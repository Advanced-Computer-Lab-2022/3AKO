import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useUserContext } from "../hooks/useUserContext";
import { useEffect } from "react";
import axios from "axios";
const PaymentSuccess = () => {
    const { courseId } = useParams()
    const { user, dispatch } = useUserContext()
    useEffect(() => {
        axios({ method: 'get', url: 'http://localhost:5000/user/restoreData', withCredentials: true }).then((response) => {
            dispatch({ type: 'RESTORE', payload: response.data })
            console.log("newdata");
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
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