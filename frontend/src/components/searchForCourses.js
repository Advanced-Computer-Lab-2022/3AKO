
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SearchForCourses = ({ }) => {
    const [courses, setCourses] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [allCourses, setAllCourses] = useState(null)
    const [searchedCourses, setSearchedCourses] = useState(null)

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
        <input type="search" placeholder='Search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyUp={handleSearch} />
    )
}
export default SearchForCourses;