import { Divider } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "./courseCard";
import RatingCard from "./RatingCard";
import Rate from "./rate";
import { useUserContext } from "../hooks/useUserContext";
const InstructorView = () => {
    const {id} = useParams()
    const {user} = useUserContext()
    const [instructorData,setInstructorData] = useState('')
    useEffect(()=>{
        const execute = async()=>{
            await axios({method:'get',url:`http://localhost:5000/instructor/getProfileInfo/${id}`}).then((response)=>{
                setInstructorData(response.data)
                console.log(response.data);
            }).catch((error)=>{
                console.log(error);
            })
        }
        execute()

    },[])

    return ( <div className="instrcutorProfileContainer">
        <Divider><img className="instrcutorProfilePicture" src="https://admissionado.com/wp-content/uploads/2016/04/college_professors_blog_post.jpg" alt="instructor image" /></Divider>
        {instructorData && <div>
            <b>{instructorData.biography}</b>
            {instructorData.courses.map((c)=>{
                    <CourseCard course={c} isInstructor={false} userId={' '} isCorporateTrainee={true} key={c._id} />
            })}
            {(user && (user.type == 'corporate trainee' || user.type === 'individual trainee'))? <Rate type={'instructor'}></Rate>: <div></div>
}        <RatingCard course={instructorData}></RatingCard>
        </div>
            }
    </div> );
}
 
export default InstructorView;