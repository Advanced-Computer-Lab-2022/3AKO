import axios from 'axios';
import MyCourse from './components/MyCourse';
import { useEffect, useState } from "react";
import { useUserContext } from './hooks/useUserContext';
import {useParams} from "react-router-dom"
const MyCoursesTrainee = () => {
  const {user} = useUserContext()
  const [courses, setCourses] = useState([])
  const { id } = useParams()
  useEffect(() => {
    const fetchMyCourses = async () => {
     await axios({method: "get",url:'http://localhost:5000/trainee/myCourses',withCredentials:true}).then((response)=>{
      setCourses(response.data)
     }).catch((error) =>{
      console.log(error);
     })

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