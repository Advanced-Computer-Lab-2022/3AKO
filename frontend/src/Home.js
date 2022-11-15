import CourseCard from './courseCard';
import { useState, useEffect } from 'react';
const Home = () => {

  const [searchValue, setSearchValue] = useState('');
  const [courses,setCourses] = useState(null);
  const [allCourses,setAllCourses] = useState(null);
    
    useEffect(()=>{
      const fetchCourses =async ()=>{
        const response = await fetch("/course/courses");
        const coursesJson = await response.json()
        
  
        if(response.ok){
          setCourses(coursesJson);
          setAllCourses(coursesJson);
        }
      }

      fetchCourses()
    },[])

    const handleClick = (e) =>{
      if (e.key === 'Enter') {

      const newCourses = allCourses.filter(course => (course.title.toLowerCase()).startsWith(searchValue.toLowerCase()) || (course.subject.toLowerCase()).startsWith(searchValue.toLowerCase())  );
      console.log(courses);
      console.log(newCourses)
      console.log(allCourses)
      setCourses(newCourses);
    }

    }
    const handleChange = event => {
      setSearchValue(event.target.value);
  
      console.log('value is:', event.target.value);
    };
    return ( 
      <div>
        { <div className="searchBar">
          <input type="search" placeholder='search' value={searchValue} onChange={handleChange} onKeyUp={handleClick} />
          <button onClick={handleClick}>search</button>
        </div> }
        <div className="courses">
        {courses && courses.map((course)=> (
        <CourseCard course={course} key={course._id} />
      ))}</div>
      </div>
    );
}
 
export default Home;