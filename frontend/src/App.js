
import CourseView from "./CourseView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import CountryModal from "./components/CountryModal";
import InstructorCourses from "./instructorCoursesView";
import "bootstrap/dist/css/bootstrap.min.css";
import AddInstructor from "./addInstructor";
import AddAdmin from "./addAdmin";
import AddCorporateTrainee from "./addCorporateTrainee";

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

          <Route exact path = "/addInstructor">
            <AddInstructor />
          </Route>

          <Route exact path = "/addAdmin">
            <AddAdmin />
          </Route>

          <Route exact path = "/admin/addCorporateTrainee">
            <AddCorporateTrainee />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
