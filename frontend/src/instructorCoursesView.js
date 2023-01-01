
import SearchAndFilter from "./components/searchAndFilter";

const InstructorCourses = () => {

    return (

        <SearchAndFilter coursesFetch={`http://localhost:5000/instructor/viewMyCourses/`} subjectsFetch={`http://localhost:5000/instructor/viewMySubjects/`} isCorporateTrainee={false} instructorFilter={false} />

    )
}

export default InstructorCourses;