import { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import { Select, MenuItem } from '@mui/material';

const InstructorCourses = () => {
    const [courses,setCourses] = useState([])
    const [allCourses,setAllCourses] = useState(null)

    const [subject,setSubject] = useState("All")
    
    const [subjects,setSubjects] = useState(null)

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const {id} = useParams()


useEffect(()=>{
  
    const fetchCourses =async ()=>{
      const response = await fetch(`/instructor/viewMyCourses/${id}`)
      const subjects = await fetch(`/instructor/viewMySubjects/${id}`) 
      const coursesJson = await response.json()
      const subjectsJson = await subjects.json()
      // console.log(coursesJson)
      if(response.ok){
        setCourses(coursesJson)
        setAllCourses(coursesJson)
        setSubjects(subjectsJson)
      }
    }
    fetchCourses()
  },[])



  const handleChange = (e) => {
    
    console.log(subject)
    console.log(courses)

    if(subject !== "All"){
     const newCourses = allCourses.filter(course => (course.subject===subject && course.price <= maxPrice && course.price >= minPrice))
     setCourses(newCourses)
    }
    else{
      const newCourses = allCourses.filter(course => (course.price <= maxPrice && course.price >= minPrice))
      setCourses(newCourses)
    }
     console.log(courses)

  }

    return ( 
    <div className="instructor-courses">
        <title>show courses</title>
        {courses&&courses.map((course)=>(
            <div className = "instructor-course" key={course._id}>
                <h1> {course.title}</h1>
                <h2>{course.subject}</h2>
                <h2>{course.price}</h2>

            </div>
        ))}
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={subject}
    label="subject"
    onChange={(e) => setSubject(e.target.value)}>  
    
    <MenuItem value={"All"}>All Courses</MenuItem> 
    {subjects&&subjects.map((subject)=>(
            
    <MenuItem value={`${subject}`}>{`${subject}`}</MenuItem>
        ))} 
  </Select>
            <input type="number" onChange={(e) => setMinPrice(e.target.value)} value={minPrice}/>
            <input type="number" onChange={(e) => setMaxPrice(e.target.value)} value={maxPrice}/>
            <button onClick={handleChange}>Apply</button>

    </div> 
    );
}
 
export default InstructorCourses;