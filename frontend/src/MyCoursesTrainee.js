import axios from 'axios';
import MyCourse from './components/MyCourse';
import { useEffect, useState } from "react";
import { useUserContext } from './hooks/useUserContext';
import { useParams } from "react-router-dom"
import { UserContextProvider } from './context/UserContext';
import { useHistory } from 'react-router-dom';
import { Divider } from '@mui/material';
const MyCoursesTrainee = () => {
  const { user, loading } = useUserContext()
  const [courses, setCourses] = useState([])
  const history = useHistory()


  useEffect(() => {
    const fetchMyCourses = async () => {
      await axios({ method: "get", url: 'http://localhost:5000/trainee/myCourses', withCredentials: true }).then((response) => {
        console.log(response.data);
        setCourses(response.data)
      }).catch((error) => {
        console.log(error);
      })

    }
    console.log({ o: user });
    if (user && (user.type === 'corporate trainee' || user.type === 'individual trainee')) {
      console.log(55);
      fetchMyCourses();
    }
    // if(!user && !loading){
    //   history.push('/login')
    // }
  }, [loading])

  return (
    <div className='p-5'>
      <Divider className='h3' textAlign='left'>Active Courses</Divider>
      {courses.filter(e => e.progress < 1) && courses.filter(e => e.progress < 1).map((course) => (
        < MyCourse course={course} key={course._id} />
      ))}
      <Divider className='h3' textAlign='left'>Graduated</Divider>
      {courses.filter(e => e.progress >= 1) && courses.filter(e => e.progress >= 1).map((course) => (
        < MyCourse course={course} key={course._id} />
      ))}
    </div>
  )

}

export default MyCoursesTrainee;