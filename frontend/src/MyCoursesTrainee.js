import MyCourse from './components/MyCourse';
import { useEffect, useState } from "react";
const { useParams } = require("react-router-dom")

const MyCoursesTrainee = () => {
  const [courses, setCourses] = useState([])
  const { id } = useParams()
  useEffect(() => {
    const fetchMyCourses = async () => {
      const response = await fetch(`/trainee/myCourses/${id}`)
      const coursesJson = await response.json()
      if (response.ok) {
        setCourses(coursesJson)
      }
    }
    fetchMyCourses();
  }, [])

  return (
    <div>
      {courses && courses.map((course) => (
        <MyCourse course={course} key={course._id} />
      ))}
    </div>
  )

}

export default MyCoursesTrainee;