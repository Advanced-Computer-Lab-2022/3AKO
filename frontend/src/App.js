
import CourseView from "./CourseView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import { CountryModal } from "./components/CountryModal";
import InstructorCourses from "./instructorCoursesView";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCourse from "./AddCourse";
import AddInstructor from "./addInstructor";
import AddAdmin from "./addAdmin";
import AddCorporateTrainee from "./addCorporateTrainee";
import Lol from "./IncompleteInstructorCourse";
import MyCoursesTrainee from "./MyCoursesTrainee";
import CourseSubtitles from "./CourseSubtitles";
import CourseMaterials from "./CourseMaterials";
import { useState } from "react";
import Rate from "./components/rate";
import PersonalInfo from "./personalInfo";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

function App() {
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
            {/* <CountryModal handleExchangeRate={handleExchangeRate} /> */}
            <Navbar/>
          </header>
        <Switch>

          <Route exact path="/">
            <h2>welcome Home</h2>
            <Home />
          </Route>

          <Route exact path="/course/:courseId">
            <CourseView exchangeRate={exchangeRate} currency={currency} />
          </Route>

          <Route exact path="/instructor/addCourse/:instructorId">
            <AddCourse />
          </Route>

          <Route exact path="/instructor">
            <InstructorCourses />
          </Route>

          <Route exact path="/instructor/personalInfo/:id">
            <PersonalInfo />
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

          <Route exact path="/trainee/myCourses">
            <MyCoursesTrainee />
          </Route>
          <Route exact path="/trainee/CourseSubtitles/:courseId">
            <CourseSubtitles />
          </Route>
          <Route exact path="/trainee/courseMaterials/:courseId/:subtitleId">
            <CourseMaterials />
          </Route>

          <Route exact path="/trainee/rateCourse/:id/:courseId/:courseId">
            <Rate />
          </Route>

          <Route exact path="/aa/Lol/:courseId">
            <Lol />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/signup">
            <SignUp></SignUp>
          </Route>
        </Switch>

      </div>
    </Router >
  );
}

export default App;
