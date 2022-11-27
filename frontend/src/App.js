
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
import { useEffect, useState } from "react";

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
        <CountryModal handleExchangeRate={handleExchangeRate} />

        <h2>welcome Home</h2>
        <Switch>
          <Route exact path="/">

            <Home />
          </Route>
          <Route exact path="/course/:courseId">
            <CourseView exchangeRate={exchangeRate} currency={currency}/>
          </Route>
          <Route exact path="/instructor/addCourse/:instructorId">
            <AddCourse />
          </Route>
          <Route exact path = "/instructor/:id">
            <InstructorCourses />
          </Route>

          <Route exact path = "/admin/addInstructor">
            <AddInstructor />
          </Route>

          <Route exact path = "/admin/addAdmin">
            <AddAdmin />
          </Route>

          <Route exact path = "/admin/addCorporateTrainee">
            <AddCorporateTrainee />
          </Route>

          <Route exact path = "/aa/Lol">
            <Lol />
          </Route>

          

        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
