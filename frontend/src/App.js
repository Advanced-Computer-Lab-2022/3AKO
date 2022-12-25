
import CourseView from "./CourseView";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import InstructorCourses from "./instructorCoursesView";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCourse from "./AddCourse";
import AddInstructor from "./addInstructor";
import AddAdmin from "./addAdmin";
import AddCorporateTrainee from "./addCorporateTrainee";
import IncompleteCourse from "./IncompleteInstructorCourse";
import MyCoursesTrainee from "./MyCoursesTrainee";
import CourseSubtitles from "./CourseSubtitles";
import { useState } from "react";
import Rate from "./components/rate";
import PersonalInfo from "./personalInfo";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import InstructorProfile from "./components/InstructorProfile";
import TraineeProfile from "./components/TraineeProfile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SubtitleExercise from "./subtitleExercise";
import LessonView from "./components/lessonView";
import AdminHome from "./components/AdminHome";
import { useUserContext } from "./hooks/useUserContext";
import PaymentSuccess from "./components/PaymentSuccess";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import SearchPage from "./searchPage";
function App() {
  const { user, loading } = useUserContext()
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currency, setCurrency] = useState("");

  const handleExchangeRate = (value, curr) => {
    setExchangeRate(value);
    setCurrency(curr);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <Navbar handleExchangeRate={handleExchangeRate} />
        </header>
        <div style={{ 'margin-top': '70px' }}>

          <Switch >

            <Route exact path="/">
            {!user || user.type !== 'admin' ? <Home /> : <AdminHome />}
            </Route>

            <Route exact path="/search">
              <SearchPage />
            </Route>

            {/* {!user ? <SearchPage /> : (user.type == 'corporate trainee' || user.type === 'individual trainee') ? <SearchPage /> : user.type === 'instructor' ? <InstructorCourses /> : <AdminHome />} */}

            <Route exact path="/course/:courseId">
              <CourseView exchangeRate={exchangeRate} currency={currency} />
            </Route>

            <Route exact path="/instructor/addCourse">
              {(user && user.type === 'instructor') ? <AddCourse /> : user ? <Redirect to="/" /> : loading ? <AddCourse /> : <Redirect to="/login" />}
            </Route>

            <Route exact path="/instructor/myCourses">
              <InstructorCourses />
            </Route>

            <Route exact path="/admin/addInstructor">
              <AddInstructor />
            </Route>

            <Route exact path="/admin/addAdmin">
              <AddAdmin />
            </Route>

            <Route exact path="/admin/addCorporateTrainee">
              <AddCorporateTrainee />
            </Route>

            <Route exact path={"/trainee/myCourses"}>
              {(user && (user.type == 'corporate trainee' || user.type === 'individual trainee')) ? <MyCoursesTrainee /> : (!loading && !user) ? <Redirect to="/login" /> : user ? <Redirect to="/" /> : <MyCoursesTrainee />}
            </Route>
            <Route exact path="/trainee/CourseSubtitles/:courseId">
              <CourseSubtitles />
            </Route>
            <Route exact path="/instructor/incompleteCourse/exercise/:courseId/:subtitleId/:exerciseId">
              <SubtitleExercise />
            </Route>
            <Route exact path="/instructor/incompleteCourse/lesson/:courseId/:subtitleId">
              <LessonView />
            </Route>
            <Route exact path="/trainee/rateCourse/:id/:courseId/:courseId">
              <Rate />
            </Route>

            <Route exact path="/instructor/incompleteCourse/:courseId">
              <IncompleteCourse />
            </Route>
            <Route exact path="/login">
              <LogIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/instructor/profile">
              <InstructorProfile />
            </Route>
            <Route exact path="/trainee/profile">
              <TraineeProfile />
            </Route>
            <Route exact path="/forgotPassword">
              <ForgotPassword />
            </Route>
            <Route exact path="/resetpassword/:token">
              <ResetPassword />
            </Route>
            <Route exact path="/admin/home">
              <AdminHome />
            </Route>
            <Route exact path="/payment-success/:courseId">
              <PaymentSuccess />
            </Route>
            <Route exact path="/checkout/:courseId">
              <Checkout />
            </Route>
            <Route exact path="/payment/:courseId">
              <Payment />
            </Route>
          </Switch>
        </div>
      </div>
    </Router >
  );
}

export default App;
