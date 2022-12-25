import CourseCard from './courseCard';
import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Rating } from '@mui/material';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/search.css'
import Drawer from '../utility/Drawer';
const SearchAndFilter = ({ coursesFetch, subjectsFetch, isCorporateTrainee, instrucrtorFilter }) => {
  const location = useLocation()
  const history = useHistory()

  const [courses, setCourses] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [allCourses, setAllCourses] = useState(null)
  const [searchedCourses, setSearchedCourses] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [allSubjects, setAllSubjects] = useState(null)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [rating, setRating] = useState(0)
  const userId = useParams()



  // console.log(location.state.searchValue + " " + searchValue)

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
        setAllSubjects(res.data)
      }
    ).catch(error => {
      alert('request denied')
    })
  }

  useEffect(() => {
    fetchCourses()

  }, [])

  useEffect(() => {
    if (location.state !== undefined) {
      const searchFormNav = location.state.searchValue
      setSearchValue(searchFormNav)
    }
  }, [location.state])

  useEffect(() => { search() }, [searchValue, allCourses])

  const handleFilter = (e) => {
    if (searchedCourses != null) {
      const tmp = searchedCourses.filter(course => (course.price * (course.promotion !== null ? (course.promotion).discount / 100 : 1) <= maxPrice && course.price * (course.promotion !== null ? (course.promotion).discount / 100 : 1) >= minPrice && course.rating.total >= rating))
      const newCourses = []
      tmp.map(course => {
        if (subjects.length === 0 || subjects.includes(course.subject))
          newCourses.push(course)
      })
      setCourses(newCourses)
    }

  }

  const search = () => {
    if (allCourses !== null) {
      var newCourses;
      if (instrucrtorFilter) {
        newCourses = allCourses.filter(course => (course.title.toLowerCase()).includes(searchValue.toLowerCase()) || (course.subject.toLowerCase()).includes(searchValue.toLowerCase()) || (course.instructorName.toLowerCase()).includes(searchValue.toLowerCase()));
      } else {
        newCourses = allCourses.filter(course => (course.title.toLowerCase()).includes(searchValue.toLowerCase()) || (course.subject.toLowerCase()).includes(searchValue.toLowerCase()));
      }
      setCourses(newCourses);
      setSearchedCourses(newCourses);
    }

  }

  const removeSubject = (subject) => {
    setSubjects(subjects.filter(function (value) {
      return value !== subject
    }))
  }

  const handleReset = () => {
    setSubjects([])
    setRating(0)
    setMinPrice(0)
    setMaxPrice(10000)
  }

  useEffect(() => {
    handleFilter()
  }, [rating, minPrice, maxPrice, subjects])

  const handleCheck = (e) => {
    const value = e.target.value
    const checked = e.target.checked

    if (checked) {
      setSubjects([...subjects, value])
    } else {
      removeSubject(value)
    }
  }

  useEffect(() => {
    console.log(subjects)
  }, [subjects])

  const body = <div className="courses">
    {courses && courses.map((course) => (
      <CourseCard course={course} isInstructor={!instrucrtorFilter} userId={userId} isCorporateTrainee={isCorporateTrainee} key={course._id} />
    ))}</div>

  const side = <div className='filters'>
    <div className='subject'>
      <h5>Subject</h5>
      {allSubjects && allSubjects.map((subject) => (
        <FormControlLabel className='checkbox-with-label' control={<Checkbox sx={{
          color: '#E00018',
          '&.Mui-checked': {
            color: '#E00018',
          },
          display: 'block'
        }} />} label={subject} onChange={(e) => handleCheck(e)} key={subject} value={subject} checked={subjects.includes(subject)} />
      ))}
    </div>
    {!isCorporateTrainee &&
      <div className='fiters-price'>
        <h5>Price</h5>
        <span>Min : </span><input type="number" style={{ width: '175px', marginLeft: '4px' }} onChange={(e) => setMinPrice(e.target.value)} value={minPrice} />
        <span>Max : </span><input type="number" style={{ width: '175px' }} onChange={(e) => setMaxPrice(e.target.value)} value={maxPrice} />
      </div>
    }
    <div>
      <h5>Minimum Rating</h5>
      <Rating className='rating'
        value={rating}
        onChange={(e) => setRating(e.target.value)} />
      {/* <button onClick={handleFilter}>Apply</button> */}
    </div>

    <button className='style2' onClick={handleReset}>Reset Filters</button>
  </div>

  return (
    <Drawer materialBody={body} drawer={side} placeHolderAndTitle={false}> </Drawer>

  );
}

export default SearchAndFilter;