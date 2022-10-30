import { useState, useEffect } from "react";
import CourseView from "./CourseView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import CountryModal from "./components/CountryModal";
import InstructorCourses from "./instructorCoursesView";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <div className="App">
        <CountryModal />

        <h2>welcome Home</h2>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/course/:courseId">
            <CourseView />
          </Route>

          <Route exact path = "/instructor">
            <InstructorCourses />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
