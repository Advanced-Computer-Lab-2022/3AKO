import CourseCard from './courseCard';
import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Rating } from '@mui/material';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/search.css'
import Drawer from '../utility/Drawer';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Divider } from '@mui/material';
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
  const [maxPrice, setMaxPrice] = useState(0)
  const [price, setPrice] = useState(null)
  const [sliderBounds, setSliderBounds] = useState([0, 0])
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
        const fetchedCourses = res.data
        setCourses(fetchedCourses)
        setAllCourses(fetchedCourses)
        setSearchedCourses(fetchedCourses)
        divideCourses(fetchedCourses)
        const min = Math.min.apply(Math, fetchedCourses.map(function (course) {
          let discount = !course.promotion ? 0 : (new Date(course.promotion.saleEndDate) > new Date()) ? course.promotion.discount : 0
          const adminDiscount = !course.adminPromotion ? 0 : (new Date(course.adminPromotion.saleEndDate) > new Date()) ? course.adminPromotion.discount : 0
          if (discount < adminDiscount) discount = adminDiscount
          return course.price - course.price * discount / 100;
        }))
        const max = Math.max.apply(Math, fetchedCourses.map(function (course) {
          let discount = !course.promotion ? 0 : (new Date(course.promotion.saleEndDate) > new Date()) ? course.promotion.discount : 0
          const adminDiscount = !course.adminPromotion ? 0 : (new Date(course.adminPromotion.saleEndDate) > new Date()) ? course.adminPromotion.discount : 0
          if (discount < adminDiscount) discount = adminDiscount
          return course.price - course.price * discount / 100;
        }))
        setMaxPrice(max)
        setMinPrice(min)
        setPrice([min, max])
        setSliderBounds([min, max])
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
      const tmp = searchedCourses.filter(course => (
        course.price * (course.promotion && course.adminPromotion ? (100 - Math.max((course.promotion).discount, (course.adminPromotion).discount)) / 100 : course.promotion ? (100 - (course.promotion).discount) / 100 : course.adminPromotion ? (100 - (course.adminPromotion).discount) / 100 : 1) <= maxPrice
        && course.price * (course.promotion && course.adminPromotion ? (100 - Math.max((course.promotion).discount, (course.adminPromotion).discount)) / 100 : course.promotion ? (100 - (course.promotion).discount) / 100 : course.adminPromotion ? (100 - (course.adminPromotion).discount) / 100 : 1) >= minPrice
        && course.rating.total >= rating))
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

  const body = <div className="courses">
    {courses && courses.map((course) => (
      <CourseCard course={course} isInstructor={!instructorFilter} userId={userId} isCorporateTrainee={isCorporateTrainee} key={course._id} />
    ))}</div>


  // instructor Courses /////////////////////////////
  const instructorBody = <div className="instructorCourses">
    <Divider className='h3' textAlign='left'>Published Courses</Divider>

    <div className='courses'>
      {publishedCourses && publishedCourses.map((course) => (

        <CourseCard course={course} isInstructor={!instructorFilter} userId={userId} isCorporateTrainee={isCorporateTrainee} key={course._id} />
      ))}
    </div>
    <Divider className='h3' textAlign='left'>Unplublished Courses</Divider>

    <div className='courses'>
      {unpublishedCourses && unpublishedCourses.map((course) => (
        <CourseCard course={course} isInstructor={!instructorFilter} userId={userId} isCorporateTrainee={isCorporateTrainee} key={course._id} />
      ))}
    </div>
    <Divider className='h3' textAlign='left'>Closed Courses</Divider>

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
        <input type="search" placeholder='Search in your courses' value={instructorSearchValue} onChange={(e) => setInstructorSearchValue(e.target.value)} onKeyUp={handleSearch}
          style={{ width: '100%' }} />
      </div>
    }
    <div className='subject'>
      <Divider className='h5' textAlign='left'>Subject</Divider>

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
        <Divider className='h5' textAlign='left'>Price</Divider>

        {/* <span>Min : </span><input type="number" style={{ width: '175px', marginLeft: '4px' }} onChange={(e) => setMinPrice(e.target.value)} value={minPrice} />
        <span>Max : </span><input type="number" style={{ width: '175px' }} onChange={(e) => setMaxPrice(e.target.value)} value={maxPrice} /> */}
        <Box sx={{ width: '80%' }}>
          {price && <Slider
            getAriaLabel={() => 'Price'}
            value={price}
            max={sliderBounds[1]}
            min={sliderBounds[0]}
            onChange={handlePrice}
            valueLabelDisplay="auto"
            style={{ color: '#E00018', marginLeft: '10px' }}
          />}
        </Box>
      </div>

    }
    <div>
      <Divider className='h5' textAlign='left'>Minimum Rating</Divider>

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