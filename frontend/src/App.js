import { useState, useEffect } from 'react';
import CourseView from './CourseView';
import InstructorCourses from './instructorCoursesView';
function App() {
  return (
    <div className="App">
      <InstructorCourses />
      <h2>"welcome Home"</h2>
    </div>
    
  );
}

export default App;
