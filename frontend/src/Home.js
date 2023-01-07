import "./stylesheets/home.css";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./components/courseCard";
import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import { useUserContext } from "./hooks/useUserContext";
const Home = () => {
  const { user, loading } = useUserContext()
  const [mostPopular, setMostPopular] = useState([])
  const [mostViewed, setMostViewed] = useState([])
  const fetchCourses = async () => {
    await axios({ method: "get", url: '/course/courses', withCredentials: true }).then(
      (res) => {
        const courses = res.data
        const mPopular = [...courses].sort((a, b) => a.numOfPurchases - b.numOfPurchases)
        const mViewed = [...courses].sort((a, b) => a.numOfViews - b.numOfViews)
        setMostPopular(mPopular.slice(0, 4))
        setMostViewed(mViewed.slice(0, 4))
        console.log(courses)
        console.log(mPopular.slice(0, 4))
        console.log(mViewed.slice(0, 4))
      }
    ).catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    fetchCourses()
  }, [])


  return (
    <div>
      <div className="join">
        <h1>The sky is your limit</h1>
        <div className='content'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero illum, fugiat qui mollitia labore laudantium cupiditate reiciendis earum, praesentium suscipit fugit? Iure officia nobis pariatur, quis omnis doloremque similique qui.</p>
          {
            (!user && !loading) && <Link to={'/signUp'}><button className='style1'>JOIN NOW</button></Link>
          }        </div>
      </div>
      <div className="ourCourses">
        <div className="flex-container">
          <h1>Our Courses</h1>
        </div>
        <h3>Most Popular</h3>
        <div className="flex-container">
          {mostPopular && mostPopular.map((course) =>
            <CourseCard course={course} isInstructor={false} isCorporateTrainee={false} key={course._id} />
          )}
        </div>
        <h3>Most Viewed</h3>
        <div className="flex-container">
          {mostViewed && mostViewed.map((course) =>
            <CourseCard course={course} isInstructor={false} isCorporateTrainee={false} key={course._id} />
          )}
        </div>
        <div className="flex-container">
          <Link to={'/search'}>
            <button className="style2">View all courses</button>
          </Link>
        </div>
      </div>
      <div className="mission">
        <div className="mission-color">
          <div className="mission-text">
            <div className="flex-container">
              <h1>Our Mission</h1>
            </div>
            <div className="mission-body">
              <h3>Think</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quas, reprehenderit placeat inventore beatae error aspernatur facilis aut iure, quasi qui architecto ipsa pariatur ab accusantium nemo maiores excepturi hic?</p>
              <h3>Solve</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quas, reprehenderit placeat inventore beatae error aspernatur facilis aut iure, quasi qui architecto ipsa pariatur ab accusantium nemo maiores excepturi hic?</p>
              <h3>Create</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quas, reprehenderit placeat inventore beatae error aspernatur facilis aut iure, quasi qui architecto ipsa pariatur ab accusantium nemo maiores excepturi hic?</p>
            </div>
          </div>
        </div>
      </div>
      <div className="community">
        <div className="flex-container">
          <h1>Our Community</h1>
        </div>
        <div className="flex-container">
          <div className="community-item">
            <div className="flex-container">
              <img src={require('./images/community1.jpg')} />
            </div>
            <h3>Alissia Michael</h3>
            <h6>Individual Trainee</h6>
            <hr />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, possimus eaque. Porro harum culpa nam. Numquam distinctio eius quos cupiditate necessitatibus libero maiores dolorem. Nostrum qui dolore aperiam temporibus expedita.</p>
          </div>
          <div className="community-item">
            <div className="flex-container">
              <img src={require('./images/community2.jpg')} />
            </div>
            <h3>Jack Phillips</h3>
            <h6>Corporate Trainee</h6>
            <hr />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, possimus eaque. Porro harum culpa nam. Numquam distinctio eius quos cupiditate necessitatibus libero maiores dolorem. Nostrum qui dolore aperiam temporibus expedita.</p>
          </div>
          <div className="community-item">
            <div className="flex-container">
              <img src={require('./images/community3.jpg')} />
            </div>
            <h3>Jung Yu-mi</h3>
            <h6>Instructor</h6>
            <hr />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, possimus eaque. Porro harum culpa nam. Numquam distinctio eius quos cupiditate necessitatibus libero maiores dolorem. Nostrum qui dolore aperiam temporibus expedita.</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <img src={require('./images/logo.png')} />
        <span><AiOutlineCopyrightCircle />2022 3AKO</span>
      </div>
    </div>
  );
}

export default Home;