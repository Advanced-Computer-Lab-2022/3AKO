import { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import { Select, MenuItem } from '@mui/material';

const InstructorCourses = () => {
    const [courses,setcourses] = useState(null)
    const [allCourses,setAllCourses] = useState(null)

    const [subject,setSubject] = useState("All")
    const {id} = useParams()


useEffect(()=>{
  
    const fetchCourses =async ()=>{
      const response = await fetch(`/instructor/viewMyCourses/${id}`);
      const coursesJson = await response.json()

      if(response.ok){
        setcourses(coursesJson);
        setAllCourses(coursesJson);
      }
    }
    fetchCourses()
  },[])



  const handleChange = (e)=>{
    setSubject(e.target.value)
    console.log(subject)
    console.log(courses)

    if(e.target.value!=="All"){
     const newcourses = allCourses.filter(course=>course.subject===e.target.value)
     setcourses(newcourses)
    }
    else
    setcourses(allCourses)
     console.log(courses)

  }

    return ( 
    <div className="instructor-courses">
        <title>show courses</title>
        {courses&&courses.map((course)=>(
            <div className = "instructor-course" key={course._id}>
                <h1> {course.title}</h1>
                <h2>{course.subject}</h2>

            </div>
        ))}
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={subject}
    label="subject"
    onChange={handleChange}>    
    <MenuItem value={"All"}>All Courses</MenuItem>
    <MenuItem value={"CS"}>CS</MenuItem>
    <MenuItem value={"Chemistry"}>Chemistry</MenuItem>
    <MenuItem value={"Math"}>Math</MenuItem>
  </Select>
    </div> );
}
 
export default InstructorCourses;