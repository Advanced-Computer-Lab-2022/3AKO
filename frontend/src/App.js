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

import SubtitleExercise from "./subtitleExercise";
import RatingAndReview from "./components/RatingAndReview";
import { Rating } from "@mui/material";

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
        {/* <CountryModal handleExchangeRate={handleExchangeRate} /> */}

        {/* <h2>welcome Home</h2> */}
        <Switch>
          <Route exact path="/">
            <CountryModal handleExchangeRate={handleExchangeRate} />
            <h2>welcome Home</h2>
            <Home />
          </Route>

          <Route exact path="/course/:courseId">
            <CourseView exchangeRate={exchangeRate} currency={currency} />
          </Route>

          <Route exact path="/instructor/addCourse/:instructorId">
            <AddCourse />
          </Route>

          <Route exact path="/instructor/:id">
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

          <Route exact path="/trainee/myCourses/:id">
            <MyCoursesTrainee />
          </Route>
          <Route exact path="/trainee/CourseSubtitles/:courseId">
            <CourseSubtitles />
          </Route>
          <Route exact path="/trainee/courseMaterials/:courseId/:subtitleId">
            <CourseMaterials />
          </Route>

          <Route exact path="/aaa/Lolxd/exercise/:courseId/:subtitleId">
            <SubtitleExercise />
          </Route>
          <Route exact path="/trainee/rateCourse/:id/:courseId/:courseId">
            <Rate />
          </Route>
          <Route exact path="/aa/Lol/:courseId">
            <Lol />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
