import CourseCard from './courseCard';
import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Rating } from '@mui/material';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/search.css'
import Drawer from '../utility/Drawer';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const SearchAndFilter = ({ coursesFetch, subjectsFetch, isCorporateTrainee, instructorFilter }) => {
  const location = useLocation()
  const history = useHistory()

  const [courses, setCourses] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [instructorSearchValue, setInstructorSearchValue] = useState('')
  const [allCourses, setAllCourses] = useState(null)
  const [searchedCourses, setSearchedCourses] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [allSubjects, setAllSubjects] = useState(null)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100)
  const [price, setPrice] = useState([0, 100]);
  const [rating, setRating] = useState(0)
  const userId = useParams()

  // for the instructor courses
  const [publishedCourses, setPublishedCourses] = useState([])
  const [unpublishedCourses, setUnpublishedCourses] = useState([])
  const [closedCourses, setClosedCourses] = useState([])

  // console.log(location.state.searchValue + " " + searchValue)

  const fetchCourses = async () => {
    await axios({ method: "get", url: coursesFetch, withCredentials: true }).then(
      (res) => {
        setCourses(res.data)
        setAllCourses(res.data)
        setSearchedCourses(res.data)
        divideCourses(res.data)


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
    console.log(instructorFilter)
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
      if (!instructorFilter)
        divideCourses(newCourses)
    }

  }

  const divideCourses = (courses) => {
    setPublishedCourses(courses.filter(course => (course.status) == "published"))
    setUnpublishedCourses(courses.filter(course => (course.status) == "unpublished"))
    setClosedCourses(courses.filter(course => (course.status) == "closed"))
  }

  const search = () => {
    // console.log(searchValue)
    if (allCourses !== null) {
      var newCourses;
      if (instructorFilter) {
        newCourses = allCourses.filter(course => (course.title.toLowerCase()).includes(searchValue.toLowerCase()) || (course.subject.toLowerCase()).includes(searchValue.toLowerCase()) || (course.instructorName.toLowerCase()).includes(searchValue.toLowerCase()));
      } else {
        console.log(allCourses)
        newCourses = allCourses.filter(course => (course.title.toLowerCase()).includes(instructorSearchValue.toLowerCase()) || (course.subject.toLowerCase()).includes(instructorSearchValue.toLowerCase()));
      }
      console.log(newCourses)
      setCourses(newCourses);
      setSearchedCourses(newCourses);
      if (!instructorFilter)
        divideCourses(newCourses)
    }

  }

  const handleSearch = (e) => {
    console.log(e.key)
    if (e.key === 'Enter')
      search()
  }

  const handlePrice = (e, newValue) => {
    setPrice(newValue)
    setMinPrice(newValue[0])
    setMaxPrice(newValue[1])
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
    setMaxPrice(100)
    setPrice([0, 100])
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
      <CourseCard course={course} isInstructor={!instructorFilter} userId={userId} isCorporateTrainee={isCorporateTrainee} key={course._id} />
    ))}</div>


  // instructor Courses /////////////////////////////
  const instructorBody = <div className="instructorCourses">
    <h3>Published Courses </h3>
    <hr></hr>
    <div className='courses'>
      {publishedCourses && publishedCourses.map((course) => (

        <CourseCard course={course} isInstructor={!instructorFilter} userId={userId} isCorporateTrainee={isCorporateTrainee} key={course._id} />
      ))}
    </div>
    <h3>Unpublished Courses </h3>
    <hr></hr>
    <div className='courses'>
      {unpublishedCourses && unpublishedCourses.map((course) => (
        <CourseCard course={course} isInstructor={!instructorFilter} userId={userId} isCorporateTrainee={isCorporateTrainee} key={course._id} />
      ))}
    </div>
    <h3>Closed Courses</h3>
    <hr></hr>
    <div className='courses'>
      {closedCourses && closedCourses.map((course) => (
        <CourseCard course={course} isInstructor={!instructorFilter} userId={userId} isCorporateTrainee={isCorporateTrainee} key={course._id} />
      ))}
    </div>
  </div>
  /////////////////////////////////////



  const side = <div className='filters'>
    {!instructorFilter &&
      <div>
        <input type="text" placeholder='Search in your courses' value={instructorSearchValue} onChange={(e) => setInstructorSearchValue(e.target.value)} onKeyUp={handleSearch}
          style={{ width: '100%' }} />
      </div>
    }
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
        {/* <span>Min : </span><input type="number" style={{ width: '175px', marginLeft: '4px' }} onChange={(e) => setMinPrice(e.target.value)} value={minPrice} />
        <span>Max : </span><input type="number" style={{ width: '175px' }} onChange={(e) => setMaxPrice(e.target.value)} value={maxPrice} /> */}
        <Box sx={{ width: '80%' }}>
          <Slider
            getAriaLabel={() => 'Price'}
            value={price}
            onChange={handlePrice}
            valueLabelDisplay="auto"
          />
        </Box>
      </div>

    }
    <div>
      <h5>Minimum Rating</h5>
      <Rating className='rating'
        value={rating}
        onChange={(e) => setRating(e.target.value)} />
    </div>

    <button className='style2' onClick={handleReset}>Reset Filters</button>
  </div>

  return (
    <Drawer isSeachAndFilter={true} materialBody={instructorFilter ? body : instructorBody} drawer={side} placeHolderAndTitle={false}> </Drawer>

  );
}

export default SearchAndFilter;