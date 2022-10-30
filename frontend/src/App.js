import { useState, useEffect } from 'react';
import CourseView from './CourseView';
import CourseModal from "./components/CountryModal"
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <CourseModal />
      <h2>"welcome Home"</h2>
    </div>
    
  );
}

export default App;
