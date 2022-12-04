import RatingCard from "./RatingCard";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const SearchAndFilter = ({
  coursesFetch,
  subjectsFetch,
  isCorporateTrainee,
  instrucrtorFilter,
}) => {
  const [courses, setCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allCourses, setAllCourses] = useState(null);
  const [searchedCourses, setSearchedCourses] = useState(null);
  const [subject, setSubject] = useState("All");
  const [subjects, setSubjects] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [instrucrtorName, SetInstructorName] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(coursesFetch);
      const subjects = await fetch(subjectsFetch);
      const coursesJson = await response.json();
      const subjectsJson = await subjects.json();
      // console.log(coursesJson)
      if (response.ok) {
        setCourses(coursesJson);
        setAllCourses(coursesJson);
        setSearchedCourses(coursesJson);
        setSubjects(subjectsJson);
      }
    };
    fetchCourses();
  }, []);

  const handleFilter = (e) => {
    //console.log(subject)
    //console.log(courses)

    if (true) {
      const newCourses = searchedCourses.filter(
        (course) =>
          course.subject === subject &&
          course.price <= maxPrice &&
          course.price >= minPrice &&
          course.instrucrtorName !== undefined &&
          course.instrucrtorName
            .toLowerCase()
            .startsWith(instrucrtorName.toLowerCase())
      );
      setCourses(newCourses);
    } else {
      const newCourses = searchedCourses.filter(
        (course) =>
          course.price <= maxPrice &&
          course.price >= minPrice &&
          course.instrucrtorName !== undefined &&
          course.instrucrtorName
            .toLowerCase()
            .startsWith(instrucrtorName.toLowerCase())
      );
      setCourses(newCourses);
    }
    //console.log(courses)
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      var newCourses;
      if (instrucrtorFilter) {
        newCourses = allCourses.filter(
          (course) =>
            course.title.toLowerCase().startsWith(searchValue.toLowerCase()) ||
            course.subject
              .toLowerCase()
              .startsWith(searchValue.toLowerCase()) ||
            (course.instrucrtorName !== undefined &&
              course.instrucrtorName
                .toLowerCase()
                .startsWith(searchValue.toLowerCase()))
        );
      } else {
        newCourses = allCourses.filter(
          (course) =>
            course.title.toLowerCase().startsWith(searchValue.toLowerCase()) ||
            course.subject.toLowerCase().startsWith(searchValue.toLowerCase())
        );
      }
      newCourses.map((course) => {
        console.log(course.instrucrtorName);
      });
      setCourses(newCourses);
      setSearchedCourses(newCourses);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "grid",
          gap: "3rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
          padding: "3rem",
        }}
      >
        {courses &&
          courses.map((course) => (
            <RatingCard course={course} key={course._id} />
          ))}
      </Box>
    </div>
  );
};

export default SearchAndFilter;
