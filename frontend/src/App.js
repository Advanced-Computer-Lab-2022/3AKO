import { useState, useEffect } from 'react';
import CourseView from './CourseView';
import CountryModal from "./components/CountryModal";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <CountryModal/>
      <CourseView courseId={"635977a729582539eb13961e"} currency={"$"}></CourseView>
    </div>
    
  );
}

export default App;
