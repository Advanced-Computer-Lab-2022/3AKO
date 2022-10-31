import CourseCard from './courseCard';
import { useState, useEffect } from 'react';
const Home = () => {

    const [courses,setCourses] = useState(null);
    useEffect(()=>{
      const fetchCourses =async ()=>{
        const response = await fetch("/course/courses");
        const coursesJson = await response.json()
  
        if(response.ok){
          setCourses(coursesJson);
        }
      }

      // const handleserach = (value) =>{

      // }
  
  
      fetchCourses()
    })
    return ( 
      <div>
        {/* <div className="searchBar">
          <input type="text" placeholder='search' onSubmit={(e)=>{handleserach(e.target.value)}} />
        </div> */}
        <div className="courses">
        {courses && courses.map((course)=> (
        <CourseCard course={course} key={course._id} />
      ))}</div>
      </div>
    );
}
 
export default Home;