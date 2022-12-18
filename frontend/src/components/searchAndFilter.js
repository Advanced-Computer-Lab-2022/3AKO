import CourseCard from './courseCard';
import { useEffect, useState } from "react";
import { Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SearchAndFilter = ({ coursesFetch, subjectsFetch, isCorporateTrainee, instrucrtorFilter }) => {
  const [courses, setCourses] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [allCourses, setAllCourses] = useState(null)
  const [searchedCourses, setSearchedCourses] = useState(null)
  const [subject, setSubject] = useState("All")
  const [subjects, setSubjects] = useState(null)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(5)
  const userId = useParams()

  useEffect(() => {

    const fetchCourses = async () => {
      await axios({ method: "get", url: coursesFetch, withCredentials: true }).then(
        (res) => {
          setCourses(res.data)
          setAllCourses(res.data)
          setSearchedCourses(res.data)
        }
      ).catch(error => {
        alert('invalid request')
      })
      await axios({ method: "get", url: subjectsFetch, withCredentials: true }).then(
        (res) => {
          setSubjects(res.data)
        }
      ).catch(error => {
        alert('request denied')
      })
    }
    fetchCourses()
  }, [])



  const handleFilter = (e) => {

    //console.log(subject)
    //console.log(courses)

    if (subject !== "All") {
      const newCourses = searchedCourses.filter(course => (course.subject === subject && course.price <= maxPrice && course.price >= minPrice))
      setCourses(newCourses)
    }
    else {
      const newCourses = searchedCourses.filter(course => (course.price <= maxPrice && course.price >= minPrice))
      setCourses(newCourses)
    }
    //console.log(courses)

  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      var newCourses;
      if (instrucrtorFilter) {
        newCourses = allCourses.filter(course => (course.title.toLowerCase()).startsWith(searchValue.toLowerCase()) || (course.subject.toLowerCase()).startsWith(searchValue.toLowerCase()) || (course.instructorName.toLowerCase()).startsWith(searchValue.toLowerCase()));
      } else {
        newCourses = allCourses.filter(course => (course.title.toLowerCase()).startsWith(searchValue.toLowerCase()) || (course.subject.toLowerCase()).startsWith(searchValue.toLowerCase()));
      }
      newCourses.map((course) => {
        console.log(course.instructorName)
      })
      setCourses(newCourses);
      setSearchedCourses(newCourses);
    }

  }

  return (
    <div>
      {<div className="searchBar">
        <input type="search" placeholder='search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyUp={handleSearch} />
        <button onClick={handleSearch}>search</button>
      </div>}
      <div className="courses">
        {courses && courses.map((course) => (
          <CourseCard course={course} isInstructor={!instrucrtorFilter} userId={userId} isCorporateTrainee={isCorporateTrainee} key={course._id} />
        ))}</div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={subject}
        label="subject"
        onChange={(e) => setSubject(e.target.value)}>

        <MenuItem value={"All"}>All Courses</MenuItem>
        {subjects && subjects.map((subject) => (

          <MenuItem value={`${subject}`}>{`${subject}`}</MenuItem>
        ))}
      </Select>
      {!isCorporateTrainee &&
        <div>
          <input type="number" onChange={(e) => setMinPrice(e.target.value)} value={minPrice} />
          <input type="number" onChange={(e) => setMaxPrice(e.target.value)} value={maxPrice} />
        </div>
      }
      <button onClick={handleFilter}>Apply</button>
    </div>

  );
}

export default SearchAndFilter;