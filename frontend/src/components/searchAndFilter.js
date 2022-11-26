import CourseCard from '../courseCard';
import { useEffect ,useState} from "react";
import { Select, MenuItem } from '@mui/material';

const SearchAndFilter = ({coursesFetch, subjectsFetch, isCorporateTrainee,instrucrtorFilter}) => {
    const [courses,setCourses] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [allCourses,setAllCourses] = useState(null)
    const [searchedCourses,setSearchedCourses] = useState(null)
    const [subject,setSubject] = useState("All")
    const [subjects,setSubjects] = useState(null)
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000)
    const [instrucrtorName,SetInstructorName] = useState('');

useEffect(()=>{
  
    const fetchCourses =async ()=>{
      const response = await fetch(coursesFetch)
      const subjects = await fetch(subjectsFetch) 
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
    
    //console.log(subject)
    //console.log(courses)

    if(subject !== "All"){
     const newCourses = searchedCourses.filter(course => (course.subject===subject && course.price <= maxPrice && course.price >= minPrice &&
      ((course.instrucrtorName) !== undefined && (course.instrucrtorName.toLowerCase()).startsWith(instrucrtorName.toLowerCase()))))
     setCourses(newCourses)
    }
    else{
      const newCourses = searchedCourses.filter(course => (course.price <= maxPrice && course.price >= minPrice && 
        ((course.instrucrtorName) !== undefined && (course.instrucrtorName.toLowerCase()).startsWith(instrucrtorName.toLowerCase()))))
      setCourses(newCourses)
    }
    //console.log(courses)

  }

  const handleClick = (e) =>{
    if (e.key === 'Enter') {

    const newCourses = allCourses.filter(course => (course.title.toLowerCase()).startsWith(searchValue.toLowerCase()) || (course.subject.toLowerCase()).startsWith(searchValue.toLowerCase()) || ((course.instrucrtorName) !== undefined && (course.instrucrtorName.toLowerCase()).startsWith(searchValue.toLowerCase())));
    newCourses.map((course)=>{
      console.log(course.instrucrtorName)
    })
    setCourses(newCourses);
    setSearchedCourses(newCourses);
  }

  }

    return (
      <div>
        { <div className="searchBar">
          <input type="search" placeholder='search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyUp={handleClick} />
          <button onClick={handleClick}>search</button>
        </div> }
        <div className="courses">
        {courses && courses.map((course)=> (
        <CourseCard course={course} key={course._id} />
      ))}</div>
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
  {!isCorporateTrainee && 
    <div>
        <input type="number" onChange={(e) => setMinPrice(e.target.value)} value={minPrice}/>
        <input type="number" onChange={(e) => setMaxPrice(e.target.value)} value={maxPrice}/>
    </div>
  }
  {
    instrucrtorFilter && 
    <div>
        <input type="string" onChange={(e) => SetInstructorName(e.target.value)} value={instrucrtorName}/>
    </div>
  }        
      <button onClick={handleChange}>Apply</button>
    </div> 
    
    );
}
 
export default SearchAndFilter;