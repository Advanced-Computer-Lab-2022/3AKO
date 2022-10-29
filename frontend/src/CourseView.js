import axios from "axios";
import { useState,useEffect } from "react";


const CourseView = () => {
    const [courseData, setCourseData] = useState(null)
    useEffect(()=>{    
        const start=async()=>{
            const newData = await fetch(`/course/getCourseInfo/635977a729582539eb13961e`)
            const json = await newData.json()
            console.log(json.title);
            if(newData.ok){
                setCourseData(json)
            }
        }
        start()
    },[])
    return (
        <div>
            <div className="course">
                {courseData &&
                <h1>title : {courseData.title}</h1>}
                {courseData &&<h1>outline : {courseData.outline}</h1>}
                {courseData &&<h1>summary : {courseData.summary}</h1>}
                {courseData &&<h1>subject : {courseData.subject}</h1>}
                {courseData &&<h1>rating : {courseData.rating}</h1>}
                {courseData &&<h1>price : {courseData.price}</h1>}
                {courseData &&<h1>totalHours : {courseData.totalHours}</h1>}
                {courseData &&<h1>promotion : {courseData.promotion}</h1>}
                {courseData &&<h1>numOfViews : {courseData.numOfViews}</h1>}
            </div>
        </div>
    );
}

export default CourseView;