import { useEffect } from "react";
import { useState } from "react";


const InstructorCourses = () => {
    var [count,setcount] = useState(null)

useEffect(()=>{
    const fetchCourses =async ()=>{
      const response = await fetch("/instructor/viewMyCourses/63597146bdb0ff27cdf8e2f3");
      const coursesJson = await response.json()

      if(response.ok){
        setcount(coursesJson);
      }
    }
    fetchCourses()
  })
    return ( 
    <div className="instructor-courses">
        <title>show courses</title>
        {/* <button onClick={handleClick}>show instructor courses</button> */}
        {count&&count.map((course)=>(
            <div className = "instructor-course" key={course._id}>
                <h1> {course.title}</h1>
                <h2>{course.subject}</h2>

            </div>
        ))}
        {/* <h2> {count}</h2> */}
    </div> );
}
 
export default InstructorCourses;